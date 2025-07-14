// Edge-runtime proxy to OpenRouter (OpenAI-compatible response)
export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek/deepseek-r1:free',
      stream: false,
      messages,
    }),
  });

  // Parse response from OpenRouter
  const data = await r.json();

  // Patch: wrap into OpenAI-style response so most UIs work
  return new Response(
    JSON.stringify({
      id: data.id,
      object: data.object || 'chat.completion',
      created: data.created || Date.now(),
      model: data.model,
      choices: [
        {
          index: 0,
          message: data.choices?.[0]?.message || {
            role: data.role || 'assistant',
            content: data.content || '',
          },
          finish_reason:
            data.choices?.[0]?.finish_reason || data.finish_reason || 'stop',
        },
      ],
    }),
    {
      status: r.status,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
