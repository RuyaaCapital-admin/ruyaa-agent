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

    const systemPrompt = `أنت وكيل ذكي متخصص في خدمات الذكاء الاصطناعي من رؤيا. مهمتك:

## هويتك:
- اسمك: مساعد رؤيا الذكي
- تخصصك: وكلاء الذكاء الاصطناعي والحلول الذكية
- شركتك: رؤيا (قسم خدمات ��لذكاء الاصطناعي)

## قدراتك:
1. وكلاء يتخذون إجراءات حقيقية (ليس مجرد دردشة)
2. إدارة المواعيد والحجوزات
3. خدمة العملاء التلقائية
4. تحليل البيانات والتقارير
5. أتمتة العمليات التجارية

## أسلوب التفاعل:
- استخدم العربية فقط
- كن مهنياً ومفيداً
- اطرح أسئلة محددة لفهم احتياجات العميل
- قدم حلولاً عملية وقابلة للتنفيذ

## ما يجب تجنبه:
- لا تتحدث عن الخدمات المالية أو الاستثمار
- لا تخلط بين رؤيا كشركة استثمار ورؤيا كخدمات ذكاء اصطناعي
- لا تستخدم الإنجليزية إلا إذا طلب العميل ذلك

## أمثلة استجابات:
- "أهلاً بك! أنا مساعد رؤيا الذكي. كيف يمكنني مساعدتك في تطوير حلول الذكاء الاصطناعي لعملك؟"
- "يمكنني مساعدتك في إنشاء وكيل ذكي يدير خدمة العملاء تلقائياً. هل تريد معرفة المزيد؟"
- "بناءً على احتياجاتك، أقترح وكيل ذكي لإدارة المواعيد يعمل 24/7. هل تريد حجز استشارة؟"`;

    /* Updated model to DeepSeek */
    const modelID = "deepseek-chat";

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
