#!/usr/bin/env node
/**
 * Seed script — inserts standards and mock licenses into Supabase
 * Run: npx ts-node --project tsconfig.scripts.json scripts/seed.ts
 */

import { createClient } from '@supabase/supabase-js';
import { STANDARDS, STANDARD_CHUNKS } from '../data/standards';
import { MOCK_LICENSES } from '../data/licenses_mock';

// Load env vars from .env.local
import { config } from 'dotenv';
config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  console.log('🌱 Starting seed...\n');

  // 1. Clear old data to avoid duplication/conflict issues
  console.log('Clearing old records...');
  await supabase.from('standard_chunks').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('standards').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('licenses_mock').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  // 2. Insert standards
  console.log(`Seeding ${STANDARDS.length} standards...`);
  const { data: insertedStandards, error: stdError } = await supabase
    .from('standards')
    .insert(STANDARDS)
    .select('id, is_number');

  if (stdError || !insertedStandards) {
    console.error('❌ Standards error:', stdError?.message);
    process.exit(1);
  }
  console.log(`✅ Standards seeded`);

  const standardIdMap = new Map(insertedStandards.map((s: { is_number: string; id: string }) => [s.is_number, s.id]));

  // 3. Insert chunks
  console.log(`\nSeeding ${STANDARD_CHUNKS.length} chunks...`);
  const chunksToInsert = STANDARD_CHUNKS.map((chunk) => ({
    standard_id: standardIdMap.get(chunk.standard_is_number),
    content: chunk.content,
  }));

  const { error: chunkError } = await supabase.from('standard_chunks').insert(chunksToInsert);
  if (chunkError) {
    console.error('❌ Chunks error:', chunkError.message);
    process.exit(1);
  }
  console.log(`✅ Chunks seeded (run embed next)`);

  // 4. Insert mock licenses
  console.log(`\nSeeding ${MOCK_LICENSES.length} mock licenses...`);
  const { error: licError } = await supabase
    .from('licenses_mock')
    .insert(MOCK_LICENSES);

  if (licError) {
    console.error('❌ Licenses error:', licError.message);
    process.exit(1);
  }
  console.log(`✅ Mock licenses seeded`);

  console.log('\n🎉 Seed complete! Now run: npm run embed');
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
