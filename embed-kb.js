/**
 * embed-kb.js  – one‑time script to fill the `embedding` column
 * Uses your OpenRouter key (sk‑or‑…) instead of the OpenAI default endpoint.
 */
const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');

// ---------- init clients ----------
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,        // your sk‑or‑… key
  baseURL: 'https://openrouter.ai/api/v1',   // OpenRouter endpoint
  defaultHeaders: {
    'HTTP-Referer': 'https://agent.ruyaacapital.com', // any public URL you own
    'X-Title': 'Ruyaa KB embed'
  }
});

// ---------- embed missing rows ----------
(async () => {
  const { data: rows, error } = await supabase
    .from('ai_knowledge_base')
    .select('id, content')
    .is('embedding', null);

  if (error) throw error;

  for (const row of rows) {
    const { data } = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: row.content
    });

    await supabase
      .from('ai_knowledge_base')
      .update({ embedding: data[0].embedding })
      .eq('id', row.id);

    console.log('embedded', row.id);
  }

  console.log('✅ done');
  process.exit(0);
})();
