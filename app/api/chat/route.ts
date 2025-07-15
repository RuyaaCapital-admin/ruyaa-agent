import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import { nanoid } from "nanoid";

/**
 * POST /api/chat
 *
 * The client (useChat) sends:
 *  { messages: Array<{ role: "user" | "assistant"; content: string }> }
 *
 * We respond with JSON:
 *  { id: string; role: "assistant"; text: string }
 * which avoids stream ports and works fine in Next.js.
 */
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

    const { text } = await generateText({
      model: groq("llama3-8b-8192"),
      prompt: messages[messages.length - 1]?.content ?? "",
      system: systemPrompt,
    });

    return Response.json({
      id: nanoid(),
      role: "assistant",
      text, // <- key changed from content to text
    });
  } catch (err) {
    console.error("chat api error:", err);
    return Response.json({ error: "failed" }, { status: 500 });
  }
}
