import { generateText } from "ai";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { groq } from "@ai-sdk/groq";
import { nanoid } from "nanoid";

/* ---------- helper: compact history ---------- */
function buildHistory(
  msgs: { role: "user" | "assistant"; content: string }[],
  limit = 8
) {
  return msgs
    .slice(-limit)
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");
}

/* ---------- system prompt ---------- */
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
`.trim() + `

/* ---------- models ---------- */
const primary = openrouter("deepseek/deepseek-r1:free");  // free model
const fallback = groq("llama3-8b-8192");                  // free backup

/* ---------- POST /api/chat ---------- */
export async function POST(req) {
  try {
    const { messages } = await req.json();

    /* ---------- try primary, fall back if needed ---------- */
    let text;
    try {
      ({ text } = await generateText({
        model: primary,
        temperature: 0.2,
        system: systemPrompt,
        prompt: buildHistory(messages),
      }));
    } catch {
      ({ text } = await generateText({
        model: fallback,
        temperature: 0.2,
        system: systemPrompt,
        prompt: buildHistory(messages),
      }));
    }

    return new Response(JSON.stringify({ id: nanoid(), role: "assistant", text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("chat api error:", err);
    return new Response(JSON.stringify({ error: "failed" }), { status: 500 });
  }
}
