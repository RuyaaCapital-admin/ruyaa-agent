const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

(async () => {
  const { data: rows, error } = await supabase
    .from('ai_knowledge_base')
    .select('id, content')
    .is('embedding', null);

  if (error) throw error;

  for (const row of rows) {
    const resp = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: row.content
    });

    await supabase
      .from('ai_knowledge_base')
      .update({ embedding: resp.data[0].embedding })
      .eq('id', row.id);

    console.log('embedded', row.id);
  }

  console.log('✅ done');
  process.exit(0);
})();
