-- Enable pgvector extension
create extension if not exists vector;

-- Drop existing policies if they exist (safe to re-run)
do $$ begin
  drop policy if exists "Public read standards" on standards;
  drop policy if exists "Public read chunks" on standard_chunks;
  drop policy if exists "Public read licenses" on licenses_mock;
  drop policy if exists "Public insert complaints" on complaints;
  drop policy if exists "Public read complaints" on complaints;
exception when others then null;
end $$;

-- Standards knowledge base
create table if not exists standards (
  id uuid primary key default gen_random_uuid(),
  is_number text not null,
  title text not null,
  category text not null,
  scheme_type text not null check (scheme_type in ('ISI', 'CRS', 'FMCS', 'Hallmarking')),
  plain_summary text not null,
  source_url text,
  created_at timestamptz default now()
);

-- Chunked content for RAG retrieval
create table if not exists standard_chunks (
  id uuid primary key default gen_random_uuid(),
  standard_id uuid references standards(id) on delete cascade,
  content text not null,
  embedding vector(768),
  created_at timestamptz default now()
);

-- Index for fast vector similarity search
create index if not exists standard_chunks_embedding_idx
  on standard_chunks using ivfflat (embedding vector_cosine_ops)
  with (lists = 10);

-- Mock license database (prototype only - not live BIS data)
create table if not exists licenses_mock (
  id uuid primary key default gen_random_uuid(),
  license_number text unique not null,
  holder_name text not null,
  product_name text not null,
  category text not null,
  scheme_type text not null,
  is_number text not null,
  status text not null check (status in ('Active', 'Suspended', 'Expired', 'Cancelled')),
  valid_till date,
  city text,
  state text,
  created_at timestamptz default now()
);

-- Consumer complaints / grievance capture
create table if not exists complaints (
  id uuid primary key default gen_random_uuid(),
  reference_id text unique not null,
  product_name text not null,
  category text not null,
  description text not null,
  photo_url text,
  contact_email text,
  status text not null default 'Submitted' check (status in ('Submitted', 'Under Review', 'Resolved', 'Closed')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS policies
alter table standards enable row level security;
alter table standard_chunks enable row level security;
alter table licenses_mock enable row level security;
alter table complaints enable row level security;

create policy "Public read standards" on standards for select using (true);
create policy "Public read chunks" on standard_chunks for select using (true);
create policy "Public read licenses" on licenses_mock for select using (true);
create policy "Public insert complaints" on complaints for insert with check (true);
create policy "Public read complaints" on complaints for select using (true);

-- Helper function for vector similarity search
create or replace function match_standard_chunks(
  query_embedding vector(768),
  match_threshold float default 0.5,
  match_count int default 5
)
returns table (
  id uuid,
  standard_id uuid,
  content text,
  is_number text,
  title text,
  category text,
  scheme_type text,
  similarity float
)
language sql stable
as $$
  select
    sc.id,
    sc.standard_id,
    sc.content,
    s.is_number,
    s.title,
    s.category,
    s.scheme_type,
    1 - (sc.embedding <=> query_embedding) as similarity
  from standard_chunks sc
  join standards s on sc.standard_id = s.id
  where 1 - (sc.embedding <=> query_embedding) > match_threshold
  order by sc.embedding <=> query_embedding
  limit match_count;
$$;
