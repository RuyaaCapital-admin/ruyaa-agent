import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { groq } from '@ai-sdk/groq';
import { generateText, generateEmbedding } from 'ai';
import { nanoid } from 'nanoid';

export const runtime = 'edge';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function buildHistory(
  msgs: { role: 'user' | 'assistant'; content: string }[],
  limit = 8
) {
  return msgs
    .slice(-limit)
    .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n');
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

const primaryModel = groq(process.env.GROQ_MODEL_ID!);
const fallbackModel = groq(process.env.GROQ_FALLBACK_MODEL_ID!);

export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId } = await req.json();

    const authHeader = req.headers.get('authorization') || '';
    const token = authHeader.replace(/^Bearer\\s+/, '');
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

    let sid = sessionId;
    if (!sid) {
      const { data } = await supabase
        .from('conversation_sessions')
        .insert({ user_id: user.id })
        .select('id')
        .single();
      sid = data.id;
    }

    const userMsg = messages[messages.length - 1].content;
    await supabase.from('messages').insert([{ session_id: sid, role: 'user', content: userMsg }]);

    const { data: session } = await supabase
      .from('conversation_sessions')
      .select('business_type')
      .eq('id', sid)
      .single();

    let businessType = session?.business_type;

    if (!businessType) {
      await supabase
        .from('conversation_sessions')
        .update({ business_type: userMsg.trim() })
        .eq('id', sid);

      const confirmationReply = `سجلت إنو شغلك هو "${userMsg.trim()}". هل بتحب خبرك شو فيني ساوي لإلك؟`;
      await supabase.from('messages').insert([{ session_id: sid, role: 'assistant', content: confirmationReply }]);
      return NextResponse.json({ sessionId: sid, reply: confirmationReply });
    }

    const embedding = await generateEmbedding({ model: process.env.EMBEDDING_MODEL_ID!, input: userMsg });
    const { data: kbRows } = await supabase.rpc('match_ai_kb', { query_embedding: embedding, match_count: 4 });
    const docs = kbRows.map((r: any) => r.content).join('\n---\n');

    const { data: history } = await supabase
      .from('messages')
      .select('role, content')
      .eq('session_id', sid)
      .order('created_at', { ascending: true });

    const injectedPrompt = `${systemPrompt}\n\nUSER BUSINESS: ${businessType || 'غير محدد'}\n`;
    const prompt = [injectedPrompt, docs, buildHistory(history)].join('\n\n');

    let text: string;
    try {
      ({ text } = await generateText({ model: primaryModel, temperature: 0.2, system: systemPrompt, prompt }));
    } catch {
      ({ text } = await generateText({ model: fallbackModel, temperature: 0.2, system: systemPrompt, prompt }));
    }

    await supabase.from('messages').insert([{ session_id: sid, role: 'assistant', content: text }]);

    return NextResponse.json({ sessionId: sid, reply: text });
  } catch (err) {
    console.error('chat api error:', err);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}
