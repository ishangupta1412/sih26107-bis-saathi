#!/usr/bin/env node
/**
 * Embed script — generates and stores embeddings for all standard_chunks
 * Run AFTER seed.ts: npm run embed
 */

import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const embeddingModel = genAI.getGenerativeModel({ model: 'gemini-embedding-001' });

async function embed() {
  console.log('🔢 Generating embeddings...\n');

  // Fetch all chunks without embeddings
  const { data: chunks, error } = await supabase
    .from('standard_chunks')
    .select('id, content')
    .is('embedding', null);

  if (error) {
    console.error('❌ Failed to fetch chunks:', error.message);
    process.exit(1);
  }

  console.log(`Found ${chunks?.length || 0} chunks to embed\n`);

  if (!chunks || chunks.length === 0) {
    console.log('No chunks to embed. Run seed.ts first.');
    return;
  }

  let success = 0;
  let failures = 0;

  for (const chunk of chunks) {
    try {
      process.stdout.write(`Embedding chunk ${chunk.id.slice(0, 8)}...`);

      const result = await embeddingModel.embedContent({
        content: { parts: [{ text: chunk.content }], role: 'user' },
        outputDimensionality: 768,
      } as any);
      const embedding = result.embedding.values;

      const { error: updateError } = await supabase
        .from('standard_chunks')
        .update({ embedding })
        .eq('id', chunk.id);

      if (updateError) {
        console.log(` ❌ ${updateError.message}`);
        failures++;
      } else {
        console.log(` ✅`);
        success++;
      }

      // Small delay to respect rate limits
      await new Promise((r) => setTimeout(r, 200));
    } catch (err) {
      console.log(` ❌ ${err instanceof Error ? err.message : 'Unknown error'}`);
      failures++;
    }
  }

  console.log(`\n🎉 Embedding complete: ${success} succeeded, ${failures} failed`);
  if (failures > 0) {
    console.log('Re-run this script to retry failed embeddings.');
  }
}

embed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
