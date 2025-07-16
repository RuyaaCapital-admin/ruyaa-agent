import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { OpenRouter } from 'ai/openrouter';
import { getText, getEmbedding } from 'ai';
import { nanoid } from 'nanoid';

export const runtime = 'edge';

// ✅ Supabase client (secured server-side)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ✅ Helper: short history string
function buildHistory(
  msgs: { role: 'user' | 'assistant'; content: string }[],
  limit = 8
) {
  return msgs
    .slice(-limit)
    .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n');
}

// ✅ System instructions (agent brain)
const systemPrompt = `# RuyaaCapital – Smart Assistant (v2 · Jul 2025)
LANGUAGE
- If user writes Arabic ➜ reply ONLY in Syrian Arabic (عامية سورية)
- Else ➜ reply ONLY in clear English
- NEVER mix the two languages

STYLE
- Max 2 short sentences per reply
- Be smart, calm, and friendly. Never sound robotic or technical.
- Never mention AI, bots, tech, or APIs

MISSION
1. Show how Ruyaa’s agent improves speed, quality, sales
2. Personalize to user’s business (e.g. عيادة → تذكير المواعيد)
3. Guide to next step: submit request (top button)
4. Ask clarifying question ONLY if unclear

SERVICES
• دعم العملاء ▸ يرد بسرعة وبدون أخطاء
• إدارة السوشيال ▸ يكتب ويرد ويقدّم تقارير
• تنظيم الشغل ▸ فواتير، مواعيد، تنبيهات
• مساعد التداول ▸ يراقب وينفذ أوامر
• تخطيط الحياة ▸ سفر، تذكير، مناسبات

OUT OF SCOPE
- EN: "Sorry, that request is outside my scope."
- AR: «عذراً، هذا الطلب خارج نطاق خدمتي.»
`.trim();

// ✅ Use DeepSeek model via OpenRouter
const model = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: 'https://openrouter.ai/api/v1',
  model: 'deepseek/deepseek-llm:free',
});

// ✅ Chat handler
export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId } = await req.json();

    // ✅ Get user from Supabase Auth
    const authHeader = req.headers.get('authorization') || '';
    const token = authHeader.replace(/^Bearer\s+/, '');
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

    // ✅ Start session if needed
    let sid = sessionId;
    if (!sid) {
      const { data } = await supabase
        .from('conversation_sessions')
        .insert({ user_id: user.id })
        .select('id')
        .single();
      sid = data.id;
    }

    // ✅ Log user message
    const userMsg = messages[messages.length - 1].content;
    await supabase.from('messages').insert([{ session_id: sid, role: 'user', content: userMsg }]);

    // ✅ Check + register business type
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

    // ✅ Match knowledge
    const embedding = await getEmbedding({ model: 'openai/text-embedding-ada-002', input: userMsg });
    const { data: kbRows } = await supabase.rpc('match_ai_kb', { query_embedding: embedding, match_count: 4 });
    const docs = kbRows.map((r: any) => r.content).join('\n---\n');

    // ✅ Load conversation
    const { data: history } = await supabase
      .from('messages')
      .select('role, content')
      .eq('session_id', sid)
      .order('created_at', { ascending: true });

    const finalPrompt = [
      `${systemPrompt}\n\nUSER BUSINESS: ${businessType}`,
      docs,
      buildHistory(history),
    ].join('\n\n');

    // ✅ Generate reply with DeepSeek
    const result = await getText({
      model,
      prompt: finalPrompt,
      temperature: 0.2,
    });

    const reply = result.text;
    await supabase.from('messages').insert([{ session_id: sid, role: 'assistant', content: reply }]);

    return NextResponse.json({ sessionId: sid, reply });
  } catch (err) {
    console.error('chat route error:', err);
    return NextResponse.json({ error: 'server failed' }, { status: 500 });
  }
}
