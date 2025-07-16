import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateText } from 'ai';
import { openrouter } from '@openrouter/ai-sdk-provider';
import { groq } from '@ai-sdk/groq';
import { generateEmbedding } from 'ai';
import { nanoid } from 'nanoid';

export const runtime = 'edge';

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* ---------- helper: compact history ---------- */
function buildHistory(
  msgs: { role: 'user' | 'assistant'; content: string }[],
  limit = 8
) {
  return msgs
    .slice(-limit)
    .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n');
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
`.trim();

/* ---------- models ---------- */
const primary = openrouter(process.env.OPENROUTER_API_KEY!)("deepseek/deepseek-r1:free");
const fallback = groq(process.env.GROQ_FALLBACK_MODEL_ID!);

/* ---------- POST /api/chat ---------- */
export async function POST(req: NextRequest) {
  try {
    // Parse body
    const { messages, sessionId } = await req.json();

    // Authenticate user via Supabase JWT
    const authHeader = req.headers.get('authorization') || '';
    const token = authHeader.replace(/^Bearer\s+/, '');
    const { data: userData } = await supabase.auth.getUser(token);
    const user = userData.user;
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Manage conversation session
    let sid = sessionId;
    if (!sid) {
      const { data: sessionData } = await supabase
        .from('conversation_sessions')
        .insert({ user_id: user.id })
        .select('id')
        .single();
      sid = sessionData.id;
    }

    // Log user message
    const userMsg = messages[messages.length - 1].content;
    await supabase.from('messages').insert([
      { session_id: sid, role: 'user', content: userMsg }
    ]);

    // Retrieve knowledge base context
    const embedding = await generateEmbedding({ model: process.env.EMBEDDING_MODEL_ID!, input: userMsg });
    const { data: kbRows } = await supabase.rpc('match_ai_kb', {
      query_embedding: embedding,
      match_count: 4
    });
    const docs = kbRows.map((r: any) => r.content).join('\n---\n');

    // Fetch recent history
    const { data: history } = await supabase
      .from('messages')
      .select('role, content')
      .eq('session_id', sid)
      .order('created_at', { ascending: true });

    // Build prompt: system + KB + history
    const prompt = [systemPrompt, docs, buildHistory(history)].join('\n\n');

    // Generate assistant response
    let text: string;
    try {
      ({ text } = await generateText({ model: primary, temperature: 0.2, system: systemPrompt, prompt }));
    } catch {
      ({ text } = await generateText({ model: fallback, temperature: 0.2, system: systemPrompt, prompt }));
    }

    // Log assistant reply
    await supabase.from('messages').insert([
      { session_id: sid, role: 'assistant', content: text }
    ]);

    // Return
    return NextResponse.json({ sessionId: sid, reply: text });
  } catch (err) {
    console.error('chat api error:', err);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}
