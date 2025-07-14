// Edge-runtime proxy to OpenRouter
export const runtime = 'edge';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek/deepseek-r1:free',
      stream: false,
      messages,
    }),
  });

  return new Response(r.body, {
    status: r.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
