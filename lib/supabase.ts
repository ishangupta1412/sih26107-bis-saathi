import { createClient, SupabaseClient } from '@supabase/supabase-js';

const DEFAULT_URL = 'https://xoirwgpufamzoygelryr.supabase.co';
const DEFAULT_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvaXJ3Z3B1ZmFtem95Z2VscnlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4ODg5OTEsImV4cCI6MjEwMzQ2NDk5MX0.6-T3ymB_R2YWSwRYHxZ8Paj06B1i4ehN7Dw_i2HVoQY';
const DEFAULT_SERVICE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvaXJ3Z3B1ZmFtem95Z2VscnlyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Nzg4ODk5MSwiZXhwIjoyMTAzNDY0OTkxfQ.K2fYlYZ0cGDE0MlYNTc3Ia2ZfTByEy2yOPLmnXZtYiI';

let _supabase: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_ANON;
    _supabase = createClient(url, key);
  }
  return _supabase;
}

export function createServiceClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || DEFAULT_SERVICE;
  return createClient(url, key);
}

export const supabase = {
  get client() {
    return getSupabaseClient();
  },
};
