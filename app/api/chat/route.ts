import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";

export const runtime = "edge";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

function buildHistory(
  msgs: { role: "user" | "assistant"; content: string }[],
  limit = 8,
) {
  return msgs
    .slice(-limit)
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");
}

async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/embeddings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/text-embedding-3-small",
        input: text,
      }),
    });

    if (!response.ok) {
      console.error("Embedding API error:", response.status);
      return [];
    }

    const data = await response.json();
    return data.data?.[0]?.embedding || [];
  } catch (error) {
    console.error("Error generating embedding:", error);
    return [];
  }
}

const systemPrompt = `
# RuyaaCapital – Smart Assistant (v2 · Jul 2025)

LANGUAGE
- Detect language each turn.
- If the user writes Arabic ➜ reply ONLY in clear Syrian Arabic (عامية سورية).
- Else ➜ reply ONLY in concise English.
- NEVER mix the two languages within one sentence.

STYLE
- Max 2 short sentences per reply (≈ 25 words total).
- Confident, friendly; no filler. Apologise only if the user complains.
- Never mention that you are an AI, a bot, or any tech detail.

MISSION
1. Explain how Ruyaa's AI agent helps: faster replies, zero mistakes, higher revenue.
2. Tailor examples to the user's business (e.g. mobile shop → عروض ورسائل تلقائية).
3. Show next step: request their own agent via WhatsApp / Facebook / Instagram.
4. Ask ONE brief clarifying question if the request is vague.

VALUE (paraphrase freely)
• Arabic ▸ سرعة الخدمة ▸ بدون أخطاء ▸ زيادة المبيعات  
• English ▸ Faster service ▸ Zero mistakes ▸ Higher revenue

SERVICES (adapt wording)
• Customer‑Support Agent — يرد فوراً ويحسم ٩٠٪ من الأسئلة المتكررة  
• Social‑Media Agent — يكتب المحتوى، يرد على الرسائل، ويقدّم تقارير  
• Business Assistant — فواتير، حجوزات، وتنبيهات بلا أخطاء  
• Trading Assistant — يراقب السوق وينفّذ أوامر بضبط مخاطرة  
• Lifestyle Planner — يخطط السفر ويرتّب التذكيرات

CLARIFY (use only when needed)
- AR: «شو الخدمة يلي بتهمك أكتر؟»
- EN: "Which service matters to you most?"

WELCOME (first assistant message only)
- AR: «أهلاً! كيف فيني ساعدك اليوم؟»
- EN: "Welcome! How can I help you today?"

OUT‑OF‑SCOPE
- AR: «عذراً، هذا الطلب خارج نطاق خدمتي.»
- EN: "Sorry, that request is outside my scope."

PROFANITY
- If the user insults, ignore the insult and continue politely with the mission.
`.trim();

export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId } = await req.json();

    // Handle authentication - allow guest users
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.replace(/^Bearer\s+/, "");

    let user = null;
    if (token && token !== "guest-token") {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser(token);
      user = authUser;
    }

    // For guest users, create a temporary session ID
    let userId = user?.id || `guest-${nanoid(10)}`;

    console.log("Processing chat request for user:", userId);

    // Handle session
    let sid = sessionId;
    if (!sid) {
      const { data } = await supabase
        .from("conversation_sessions")
        .insert({ user_id: user.id })
        .select("id")
        .single();
      sid = data?.id;
    }

    // Save user message
    const userMsg = messages[messages.length - 1].content;
    await supabase.from("messages").insert([
      {
        session_id: sid,
        role: "user",
        content: userMsg,
      },
    ]);

    // Get session business type
    const { data: session } = await supabase
      .from("conversation_sessions")
      .select("business_type")
      .eq("id", sid)
      .single();

    let businessType = session?.business_type;

    // Handle first time business type capture
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
      return NextResponse.json({ sessionId: sid, reply: confirmationReply });
    }

    // Generate embedding for knowledge base search
    const embedding = await generateEmbedding(userMsg);
    let docs = "";

    if (embedding.length > 0) {
      try {
        const { data: kbRows } = await supabase.rpc("match_ai_kb", {
          query_embedding: embedding,
          match_count: 4,
        });
        docs = kbRows?.map((r: any) => r.content).join("\n---\n") || "";
      } catch (error) {
        console.error("Knowledge base search error:", error);
      }
    }

    // Get conversation history
    const { data: history } = await supabase
      .from("messages")
      .select("role, content")
      .eq("session_id", sid)
      .order("created_at", { ascending: true });

    // Build context prompt
    const injectedPrompt = `${systemPrompt}\n\nUSER BUSINESS: ${businessType || "غير محدد"}\n`;
    const contextParts = [injectedPrompt];
    if (docs) contextParts.push(docs);
    if (history && history.length > 0) contextParts.push(buildHistory(history));
    const prompt = contextParts.join("\n\n");

    // Call OpenRouter API with DeepSeek model
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "https://ruyaa-agent.vercel.app",
          "X-Title": "Ruyaa Smart Agent",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat",
          messages: [
            { role: "system", content: prompt },
            { role: "user", content: userMsg },
          ],
          temperature: 0.2,
          max_tokens: 150,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const json = await response.json();
    const assistantReply =
      json.choices?.[0]?.message?.content || "عذراً، ما قدرت أرد عليك هلأ.";

    // Save assistant message
    await supabase.from("messages").insert([
      {
        session_id: sid,
        role: "assistant",
        content: assistantReply,
      },
    ]);

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
