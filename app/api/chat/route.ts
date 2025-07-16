import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import { nanoid } from "nanoid";

/* ---------- helper: build compact history ---------- */
function buildHistory(
  msgs: { role: "user" | "assistant"; content: string }[],
  limit = 8,
) {
  return msgs
    .slice(-limit)
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");
}

/* ---------- POST /api/chat ---------- */
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `
# RuyaaCapital – Smart Agent (Production Rules)

LANGUAGE
- Detect user language each turn.
- If Arabic → reply only in Syrian Arabic (عامية سورية).
- If English → reply only in English.
- Never mix.

STYLE
- Max 3 short sentences.
- Friendly, confident, zero apologies, zero tech talk.

VALUE
- Faster service, zero mistakes, higher sales.
- 24/7 instant support, one place for WhatsApp / FB / IG.
- Automates scheduling, docs, notifications—stress‑free.

SERVICES (paraphrase naturally)
• Customer‑Support Agent: يرد فوراً ويحسم ٩٠٪ من المشاكل.
• Social‑Media Agent: يكتب وجدول ويجاوب الرسائل مع تقارير أداء.
• Business Assistant: فواتير، حجوزات، جداول، وتنبيهات بلا أخطاء.
• Trading Assistant: يراقب السوق وينفذ أوامر بضبط مخاطرة.
• Lifestyle Planner: يخطط رحلاتك ويذكرك بكل التفاصيل.

CLARIFY ONCE
- AR: وضّح لي أكتر كيف أقدر أخدمك.
- EN: Please clarify what you need so I can help.

WELCOME once/ session
- AR: أهلاً! كيف فيني ساعدك اليوم؟
- EN: Welcome! How can I help you today?

FORBIDDEN
- Never mention AI, bot, backend, or tech details.
- No profanity / personal‑data requests.

OUT‑OF‑SCOPE
- AR: عذراً، هاد الطلب خارج نطاق خدمتي.
- EN: Sorry, that request is outside my scope.
`;

    /* pick a model – using Groq with llama3 as primary */
    const modelID = "llama3-8b-8192";

    const { text } = await generateText({
      model: groq(modelID),
      temperature: 0.2,
      system: systemPrompt,
      prompt: buildHistory(messages), // full context
    });

    return Response.json({
      id: nanoid(),
      role: "assistant",
      text,
    });
  } catch (err) {
    console.error("chat api error:", err);
    return Response.json({ error: "failed" }, { status: 500 });
  }
}
