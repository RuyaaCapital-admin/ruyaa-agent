/**
 * embed-kb.js – one-time script to fill the `embedding` column
 * Uses your OpenRouter API key to embed missing knowledge base entries via the OpenRouter SDK.
 */
const { createClient } = require('@supabase/supabase-js');
const { openrouter } = require('@openrouter/ai-sdk-provider');

// Initialize Supabase client (server-only with service role key)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Initialize OpenRouter client for embeddings
const router = openrouter(process.env.OPENROUTER_API_KEY);

(async () => {
  // Fetch rows missing embeddings
  const { data: rows, error: fetchError } = await supabase
    .from('ai_knowledge_base')
    .select('id, content')
    .is('embedding', null);

  if (fetchError) {
    console.error('Error fetching KB rows:', fetchError);
    process.exit(1);
  }

  // Embed each row using OpenRouter
  for (const row of rows) {
    try {
      const resp = await router.embeddings.create({
        model: process.env.EMBEDDING_MODEL_ID,  // e.g. 'openai/text-embedding-3-small'
        input: row.content
      });
      const embedding = resp.data[0].embedding;

      const { error: updateError } = await supabase
        .from('ai_knowledge_base')
        .update({ embedding })
        .eq('id', row.id);

      if (updateError) console.error(`Failed to update ${row.id}:`, updateError);
      else console.log(`embedded row ${row.id}`);
    } catch (err) {
      console.error(`Error embedding ${row.id}:`, err);
    }
  }

  console.log('✅ all embeddings done');
  process.exit(0);
})();
