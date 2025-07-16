// ========== /app/api/chat/route.ts (final version, no DB KB fetch, optimized) ==========
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
    // === HARDCODED KB BLOCK: ONLY THIS! ===
    let docs = `
• مساعد دعم العملاء الذكي: يقدّم دعمًا فوريًا وفعّالاً 24/7، ويقلّل من زمن الانتظار ويزيد من رضا العملاء.
• مساعد الإنتاجية وإدارة الأعمال: ينظّم المواعيد، يدير العمليات، ويرفع الكفاءة.
• إدارة وسائل التواصل: ينشئ محتوى تلقائيًا، يرد على العملاء، ويراقب الاتجاهات.
• مساعد مالي للتداول: تحليل صفقات، تحذيرات مخاطر، وتوصيات تداول فورية.
• نظام كشف الاحتيال: يراقب العمليات المالية لحظياً ويكشف الأنشطة المشبوهة.
• تقارير تداول ذكية: تقارير دورية عن الأداء وتحليل النشاط مع توصيات.
• تنبيهات سوق مباشرة: إشعارات فورية بفرص التداول والأخبار الاقتصادية.
• بوت حجز مواعيد ودعم شامل: يرد على العملاء، يحجز تلقائياً، ويربط مع الدعم البشري عند الحاجة.
`;
    // =============
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
