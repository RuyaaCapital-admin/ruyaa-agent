// ========== /app/api/chat/route.ts (modern consultative agent, lead gen, no DB KB, ready for real sales) ==========
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";

export const runtime = "edge";

const supabase =
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
      )
    : null;

function buildHistory(
  msgs: { role: "user" | "assistant"; content: string }[],
  limit = 8,
) {
  return msgs
    .slice(-limit)
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");
}

const systemPrompt = `
# RuyaaCapital – Consultative Smart Agent (v3 · Jul 2025)

LANGUAGE
- Detect user’s language every turn.
- If Arabic: reply ONLY in clear Syrian Arabic (عامية سورية).
- If English: reply ONLY in concise, confident English.
- NEVER mix both in one reply.

STYLE
- Max 2 sharp sentences per reply (~25 words). Never robotic, always sound like a pro business consultant.
- Only apologize if user complains, otherwise always positive, friendly, confident.
- Never mention being an AI, bot, or tech details. Always act as a real Ruyaa business expert.

MISSION
1. Instantly read user's business and main pain point (slow sales, manual work, missed leads, etc).
2. Explain with a real, tailored example how a Ruyaa AI agent will solve THEIR pain (not generic, never pushy).
3. When user shows any interest, smoothly offer to co-build their agent: “Describe your work, I’ll handle the rest.”
4. Collect inquiry details step-by-step, conversationally (business type, pain, language, name, email, phone). Don’t use a form—act like a smart expert gathering notes.
5. Always register user’s inquiry in notes, and confirm: “Team will contact you to deliver your agent.”
6. If user is skeptical, educate with short facts/stats or story, but never hype.
7. If question is unclear, ask ONE sharp clarifying question—no spam.

VALUE (paraphrase freely)
• Arabic ▸ سرعة الخدمة ▸ بدون أخطاء ▸ زيادة المبيعات
• English ▸ Faster service ▸ Zero mistakes ▸ Higher revenue

SERVICES
• Customer Support AI — يرد فوراً ويحسم ٩٠٪ من الأسئلة المتكررة
• Social Media AI — يكتب المحتوى، يرد على الرسائل، ويقدّم تقارير
• Business Assistant — فواتير، حجوزات، وتنبيهات بلا أخطاء
• Trading Assistant — يراقب السوق وينفّذ أوامر بضبط مخاطرة
• Productivity AI — يرتّب المواعيد وينظّم المهام ويوفّر الوقت
• Fraud Detection AI — يحمي العمليات المالية لحظياً
• Booking Bot — يحجز للعملاء ويربط مع الدعم البشري تلقائياً

WELCOME
- AR: «أهلاً! كيف فيني ساعدك اليوم؟»
- EN: “Welcome! How can I help you today?”

OUT-OF-SCOPE
- AR: «عذراً، هذا الطلب خارج نطاق خدمتي.»
- EN: “Sorry, that request is outside my scope.”

PROFANITY
- If user insults, ignore and continue politely with the mission.

---
# SALES/LEAD LOGIC
- If user wants a solution, gathers info in chat (business type, need, contact info). Never show a form.
- Register inquiry as a "note" (with all info) and confirm to user.
- Always make user feel guided, never sold.
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, sessionId } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid messages array" },
        { status: 400 },
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
    // === HARDCODED KB BLOCK ===
    let docs = `
• Customer Support AI: Instant, error-free replies and lead capture.
• Social Media AI: Writes content, replies to messages, auto-reports.
• Business Assistant: Billing, booking, alerts.
• Trading Assistant: Watches the market, executes, controls risk.
• Productivity AI: Schedules, organizes, saves hours daily.
• Fraud Detection: Monitors financial ops live, flags threats.
• Booking Bot: Schedules clients, hands off to human when needed.
`;
    // ==========================
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

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: prompt + "\nUser: " + userMsg }] },
          ],
          generationConfig: { temperature: 0.25, maxOutputTokens: 256 },
        }),
      }
    );
    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      console.error(`Gemini API error: ${geminiRes.status} - ${errorText}`);
      throw new Error(
        `Gemini API error: ${geminiRes.status} - ${errorText}`,
      );
    }
    const geminiData = await geminiRes.json();
    const assistantReply =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ||
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
      { status: 500 },
    );
  }
}
// =================== END ===================
