/**
 * embed-kb.js – one-time script to fill the `embedding` column
 * Uses your OpenRouter API key to embed missing knowledge base entries.
 */
const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');

// Initialize Supabase client (server-side with service role key)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Initialize OpenAI client pointing to OpenRouter
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,        // your sk-or-... key
  baseURL: 'https://openrouter.ai/api/v1',   // OpenRouter endpoint
});

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

  // Embed each row
  for (const row of rows) {
    try {
      const resp = await openai.embeddings.create({
        model: 'openai/text-embedding-ada-002',
        input: row.content,
      });
      const embedding = resp.data[0].embedding;

      const { error: updateError } = await supabase
        .from('ai_knowledge_base')
        .update({ embedding })
        .eq('id', row.id);

      if (updateError) {
        console.error(`Failed to update ${row.id}:`, updateError);
      } else {
        console.log(`embedded row ${row.id}`);
      }
    } catch (err) {
      console.error(`Error embedding ${row.id}:`, err);
    }
  }

  console.log('✅ all embeddings done');
  process.exit(0);
})();
