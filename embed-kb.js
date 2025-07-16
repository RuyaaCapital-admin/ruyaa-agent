/**
 * embed-kb.js – one-time script to fill the `embedding` column
 * Uses your OpenRouter API key and direct HTTP call to embed missing entries via OpenRouter.
 */
const { createClient } = require('@supabase/supabase-js');

// Supabase (service role)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Free DeepSeek embedding endpoint
const EMBEDDING_MODEL = 'deepseek/deepseek-r1:free';
// Correct OpenRouter endpoint if needed; default embedding endpoint
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/embeddings';

(async () => {
  const { data: rows, error } = await supabase
    .from('ai_knowledge_base')
    .select('id, content')
    .is('embedding', null);
  if (error) throw error;

  for (const { id, content } of rows) {
    try {
      const res = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
        },
        body: JSON.stringify({ model: EMBEDDING_MODEL, input: content })
      });
      const json = await res.json();
      if (!res.ok) throw json;
      const embedding = json.data[0].embedding;

      await supabase
        .from('ai_knowledge_base')
        .update({ embedding })
        .eq('id', id);

      console.log(`embedded ${id}`);
    } catch (err) {
      console.error(`error ${id}:`, err);
    }
  }

  console.log('✅ done');
  process.exit(0);
})();
