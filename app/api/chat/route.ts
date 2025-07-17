import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";

export const runtime = "edge";

// Set the correct OpenRouter model (must match docs EXACTLY!)
const OPENROUTER_MODEL = "mistralai/mistral-small";

const supabase =
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
      )
    : null;

function buildHistory(
  msgs: { role: "user" | "assistant"; content: string }[],
  limit = 4
) {
  return msgs
    .slice(-limit)
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");
}

const systemPrompt = `
# RuyaaCapital – Smart Business Agent (v4 · Jul 2025)
ROLE:
- Always act as a top-level Ruyaa business expert.
- Detect language every turn: reply in Syrian Arabic if user is Arabic, else English. Never mix languages.
- Maximum 2 sentences per reply. Be sharp, consultative, never robotic.
- If user asks about anything outside Ruyaa's services, immediately answer:
    - AR: "عذراً، هذا الطلب خارج نطاق خدمتي."
    - EN: "Sorry, that request is outside my scope."
- Never answer off-topic, personal, or unrelated questions.
- If insulted, ignore and keep to mission.
MISSION:
- Rapidly understand user's business and their pain point (slow sales, manual work, missed leads, etc).
- Give a concrete example how Ruyaa AI can solve THEIR pain.
- If user shows interest, guide them step-by-step to describe their business and collect inquiry details, conversationally, not as a form.
- Register inquiry as a note (business, need, contact info). Confirm with user: "Team will contact you to deliver your agent."
SERVICES:
- Customer Support AI, Social Media AI, Business Assistant, Trading Assistant, Productivity AI, Fraud Detection, Booking Bot.
WELCOME:
- AR: «أهلاً! كيف فيني ساعدك اليوم؟»
- EN: “Welcome! How can I help you today?”
OUT-OF-SCOPE:
- AR: «عذراً، هذا الطلب خارج نطاق خدمتي.»
- EN: “Sorry, that request is outside my scope.”
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, sessionId } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid messages array" },
        { status: 400 }
      );
    }

    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.replace(/^Bearer\s+/, "");
    let user = null;
    if (token && token !== "guest-token" && supabase) {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser(token);
        user = authUser;
      } catch (error) {
        console.log("Auth check failed, proceeding as guest:", error);
      }
    }
    let userId = user?.id || `guest-${nanoid(10)}`;
    let sid = sessionId;
    if (!sid) {
      if (user && supabase) {
        try {
          const { data } = await supabase
            .from("conversation_sessions")
            .insert({ user_id: user.id })
            .select("id")
            .single();
          sid = data?.id;
        } catch (error) {
          sid = `guest-session-${nanoid(10)}`;
        }
      } else {
        sid = `guest-session-${nanoid(10)}`;
      }
    }
    const userMsg = messages[messages.length - 1].content;
    if (user && supabase) {
      try {
        await supabase.from("messages").insert([
          {
            session_id: sid,
            role: "user",
            content: userMsg,
          },
        ]);
      } catch (error) {}
    }
    let businessType = null;
    if (user && supabase && !sid.startsWith("guest-session-")) {
      try {
        const { data: session } = await supabase
          .from("conversation_sessions")
          .select("business_type")
          .eq("id", sid)
          .single();
        businessType = session?.business_type;
        if (!businessType) {
          await supabase
            .from("conversation_sessions")
            .update({ business_type: userMsg.trim() })
            .eq("id", sid);
          const confirmationReply = `سجلت إنو شغلك هو "${userMsg.trim()}". هل بتحب خبرك شو فيني ساوي لإلك؟`;
          await supabase.from("messages").insert([
            {
              session_id: sid,
              role: "assistant",
              content: confirmationReply,
            },
          ]);
          return NextResponse.json({
            sessionId: sid,
            reply: confirmationReply,
          });
        }
      } catch (error) {}
    }
    let docs = `
• Customer Support AI: Instant replies, zero mistakes, lead capture.
• Social Media AI: Writes content, replies to messages, auto-reports.
• Business Assistant: Billing, booking, alerts.
• Trading Assistant: Watches the market, executes, controls risk.
• Productivity AI: Schedules, organizes, saves time.
• Fraud Detection: Monitors finances live, flags threats.
• Booking Bot: Schedules clients, hands off to human as needed.
`;

    let history = null;
    if (user && supabase && !sid.startsWith("guest-session-")) {
      try {
        const { data: historyData } = await supabase
          .from("messages")
          .select("role, content")
          .eq("session_id", sid)
          .order("created_at", { ascending: true });
        history = historyData;
      } catch (error) {}
    }
    const injectedPrompt = `${systemPrompt}\n\nUSER BUSINESS: ${businessType || "غير محدد"}\n`;
    const contextParts = [injectedPrompt];
    if (docs) contextParts.push(docs);
    if (history && history.length > 0) contextParts.push(buildHistory(history));
    const prompt = contextParts.join("\n\n");

    // === OpenRouter API Call ===
    const openrouterRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL, // MUST match OpenRouter doc exactly, no guesses!
        messages: [
          { role: "system", content: prompt },
          ...messages.map((m) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.content,
          })),
        ],
        max_tokens: 256,
        temperature: 0.3,
      }),
    });

    if (!openrouterRes.ok) {
      const errorText = await openrouterRes.text();
      console.error(`OpenRouter API error: ${openrouterRes.status} - ${errorText}`);
      throw new Error(`OpenRouter API error: ${openrouterRes.status} - ${errorText}`);
    }

    const openrouterData = await openrouterRes.json();
    const assistantReply =
      openrouterData?.choices?.[0]?.message?.content ||
      "عذراً، ما قدرت أرد عليك هلأ.";

    if (user && supabase) {
      try {
        await supabase.from("messages").insert([
          {
            session_id: sid,
            role: "assistant",
            content: assistantReply,
          },
        ]);
      } catch (error) {}
    }

    return NextResponse.json({ sessionId: sid, reply: assistantReply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
