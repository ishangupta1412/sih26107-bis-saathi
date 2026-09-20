# BIS Saathi — Setup Guide
## SIH26107 · Smart India Hackathon 2026

---

## Prerequisites

- Node.js 18+ installed
- A free [Supabase](https://supabase.com) account
- A [Google AI Studio](https://aistudio.google.com) account (free Gemini API key)

---

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) → New Project
2. Choose a name (e.g. `bisassist`) and a strong database password
3. Choose a region close to India (e.g. Singapore or Mumbai)
4. Wait for provisioning (~2 minutes)

### Enable pgvector extension

In the Supabase SQL Editor, run:
```sql
create extension if not exists vector;
```

### Run the migration

Copy the entire contents of `supabase/migrations/001_init.sql` and run it in the SQL Editor. This creates all 4 tables and the vector search function.

---

## Step 2: Get API Keys

### Supabase keys
In your Supabase project → Settings → API:
- Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- Copy **anon (public) key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Copy **service_role (secret) key** → `SUPABASE_SERVICE_ROLE_KEY`

### Gemini API key
1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Click **Get API key** → Create API key
3. Copy it → `GEMINI_API_KEY`

---

## Step 3: Configure Environment

```bash
# Copy the example file
cp .env.local.example .env.local
```

Edit `.env.local` and fill in your 4 keys:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
GEMINI_API_KEY=AIza...
```

---

## Step 4: Install Dependencies

```bash
npm install
```

---

## Step 5: Seed the Database

```bash
# Insert standards and mock licenses
npm run seed

# Generate and store embeddings (takes ~30s)
npm run embed
```

Expected output from `seed`:
```
✅ Standards seeded
✅ Chunks seeded
✅ Mock licenses seeded
🎉 Seed complete! Now run embed.ts
```

Expected output from `embed`:
```
Found 17 chunks to embed
Embedding chunk abcd1234... ✅
...
🎉 Embedding complete: 17 succeeded, 0 failed
```

---

## Step 6: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Demo Flow (for judges)

### Manufacturer flow
1. Land on home → click **Manufacturer**
2. Ask: *"I make electric kettles. What standard applies to me?"*
   - Expected: IS 302-1:2024, ISI Mark, with source chip
3. Ask: *"What's the difference between ISI Mark and CRS?"*
   - Expected: clear comparison, scheme routing explanation
4. Click **Pathway Guide** in header → see step-by-step ISI process

### Consumer flow
1. Land on home → click **Consumer**
2. Ask: *"What does IS 4151:2015 on my helmet mean?"*
   - Expected: plain-language explanation
3. Navigate to **Mark Checker** → enter `CM/L-7654321`
   - Expected: match card showing Bharat Safety Products, Active status
4. Try `R-41045678` → shows Suspended CRS license

### Complaint flow
1. Navigate to **Report** → fill out form → submit
2. Copy reference ID → switch to **Track** tab → paste → shows Submitted status

---

## Build for Production

```bash
npm run build
npm start
```

---

## NPM Scripts Reference

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run seed` | Seed standards + licenses into Supabase |
| `npm run embed` | Generate + store embeddings for RAG |

---

## Architecture

```
User → Next.js (App Router)
         │
   ┌─────┴─────┐
   ▼           ▼
 API routes  Frontend
   │
   ├── /api/chat
   │     embed query → pgvector search → Gemini Flash → cited answer
   ├── /api/license-check
   │     format validate → licenses_mock → result + disclaimer
   └── /api/complaints
         POST create (returns ref ID) / GET lookup by ref ID
         │
       Supabase (Postgres + pgvector + Storage)
```

---

## Troubleshooting

**"Cannot read properties of undefined" on chat page**
→ Make sure you selected a role on the home page. Session storage must have `bis_role` set.

**Chat returns "outside the current demo database scope"**
→ The query didn't match any standard chunks above the 0.4 similarity threshold. Try rephrasing with product keywords (helmet, toy, kettle, LED, charger).

**License check returns "not found" for demo numbers**
→ Make sure you ran `npm run seed`. Check Supabase → Table Editor → licenses_mock has rows.

**Embeddings not working**
→ Verify `GEMINI_API_KEY` is set in `.env.local`. Check Gemini API quota at aistudio.google.com.
