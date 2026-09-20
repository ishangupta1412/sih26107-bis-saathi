# 🇮🇳 BIS Saathi — AI-Powered Regulatory & Compliance Cockpit
### Smart India Hackathon 2026 | Problem Statement: SIH26107
**Ministry of Consumer Affairs, Food & Public Distribution | Bureau of Indian Standards (BIS)**  
**Team Name:** Team Strophoid | **National Hackathon:** Smart India Hackathon 2026

---

[![Live Demo](https://img.shields.io/badge/Live%20Demo-bis--saathi--nine.vercel.app-0070c0?style=for-the-badge&logo=vercel)](https://bis-saathi-nine.vercel.app)
[![SIH 2026](https://img.shields.io/badge/SIH%202026-Problem%20SIH26107-1e3a8a?style=for-the-badge)](https://www.sih.gov.in)
[![Next.js 16](https://img.shields.io/badge/Next.js%2016-Turbopack-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Gemini 3.6 Flash](https://img.shields.io/badge/Gemini%203.6%20Flash-Multimodal%20AI-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev)
[![IS 17802:2021](https://img.shields.io/badge/Accessibility-IS%2017802%3A2021%20%2F%20GIGW%203.0-059669?style=for-the-badge)](https://www.bis.gov.in)

---

## 📌 1. Executive Summary & Problem Context

India enforces over **350+ mandatory Quality Control Orders (QCOs)** protecting 1.4 billion citizens across critical categories (two-wheeler helmets, pressure cookers, cement, structural steel, electrical appliances, and gold hallmarking).

However, two major bottlenecks exist in the standardisation ecosystem:
1. **For MSME Manufacturers:** Navigating complex certification routes (Scheme I vs Scheme II vs FMCS), understanding statutory Scheme of Inspection & Testing (SIT) lab requirements, and compiling pre-audit records takes **weeks of manual effort and expensive consultancies**.
2. **For Consumers:** Local markets face an influx of counterfeit ISI marks and spurious goods, with zero instant regional-language verification tools.

**BIS Saathi** by **Team Strophoid** is an intelligent, bilingual (22 Scheduled Indian Languages + English), multimodal regulatory cockpit designed to bridge this gap through a **"Deterministic + Generative Duality"** architecture.

---

## 🏗️ 2. System Architecture & Tech Stack

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                 CLIENT USER INTERFACE                                    │
│  • Next.js 16 App Router + React 19 (Zero-CLS SSR Engine)                                │
│  • 22 Scheduled Indic Language Engine (Auto-sync with voice output)                      │
│  • Web Speech API (Client-Side Recognition + Indic Multi-Script Synthesis)                │
│  • GIGW 3.0 Accessible Controls: 3-State Font Zoom (A-, A, A+), Obsidian Dark Theme      │
└────────────────────────────────────────────┬─────────────────────────────────────────────┘
                                             │ HTTPS REST / Multipart Payloads
                                             ▼
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                EDGE GATEWAY & SECURITY API                               │
│  • Sliding-Window Rate Limiting: 30 req/min (Chat), 10 submissions/hr (Complaints)       │
│  • Server-Side Input Sanitizer & Length Caps (Max 4,000 chars)                           │
│  • Whistleblower Privacy Guard: Zero-PII Server Purge under DPDP Act 2023                │
│  • Search Engine Crawler Protection: `robots.ts` Disallow & noindex Isolation            │
└───────────────────────┬──────────────────────────────────────┬───────────────────────────┘
                        │                                      │
                        ▼                                      ▼
┌────────────────────────────────────────┐ ┌──────────────────────────────────────────────┐
│       MULTIMODAL INTELLIGENCE CORE     │ │         STRUCTURED STATIC & VECTOR DATA       │
│  • Gemini 3.6 Flash (Text & Vision)    │ │  • Supabase pgvector (Chunked IS Standards)   │
│  • Low-Temperature Sandbox (0.2)       │ │  • 350+ Mandatory QCO Interactive Catalog     │
│  • Unicode Indic Script Routing Engine │ │  • 35 Nationwide Branch/Regional Offices DB   │
│  • Quick Mode vs Deep Technical Mode   │ │  • Mock License & Docket Registry             │
│  • Statutory Fallback Matrix (Zero 500)│ │  • Scheme SIT Checklists & Testing Durations  │
└────────────────────────────────────────┘ └──────────────────────────────────────────────┘
```

---

## ✨ 3. Key Feature Modules

| Route | Feature Module | Core Engineering Logic |
| :--- | :--- | :--- |
| `/` | **Role-Based Onboarding & Metrics** | Dual-persona selector (`Manufacturer` vs `Consumer`), SSR-safe `useCountUp` animated counters, 5s rotating statutory safety ticker. |
| `/chat` | **22 Indian Languages AI Desk** | Multi-turn RAG cockpit, Quick vs Deep analysis modes, Unicode Indic regex script router, natural voice TTS synthesis. |
| `/checker` | **Deterministic License & Photo Scanner** | Dual regex engines (`ISI CM/L-\d{7,10}`, `CRS R-\d{8}`, Gold 6-digit HUID) + Gemini Vision photo packaging inspection. |
| `/pathway` | **MSME Pre-Audit Checklist Engine** | Scheme I, II, FMCS comparison, 8+ statutory document checklist generator with 1-click printable PDF stylesheet. |
| `/standards` | **350+ Mandatory QCO Directory** | Searchable database of mandatory Indian Standards with lead times, testing protocols, and 1-click **"Ask AI Assistant"** deep-links. |
| `/offices` | **Nationwide Office Finder** | Directory of all 35 BIS National HQ, Regional & Branch offices, state filters, normalized `tel:+91...` click-to-dial, Google Maps navigation. |
| `/complaint` | **Whistleblower Grievance Portal** | Grounded in Section 29 of the BIS Act 2016, strict Zero-PII anonymous server-side purge under DPDP Act 2023, 5-stage docket tracker. |
| `/about` | **System Architecture & Specifications** | High-level engineering blueprints, team roles, official government links (`manakonline.in`, `bis.gov.in`). |
| `/policies` | **GIGW 3.0 & IS 17802 Compliance** | Mandatory government web policies: Privacy, Hyperlinking, Copyright, Terms, and Accessibility statement. |

---

## 🔒 4. Security, Privacy & Compliance Highlights

1. **Deterministic Standard Mark Validation (Zero Hallucination):**
   - Critical license numbers are parsed with strict regular expressions (`CM/L-\d{7,10}`, `R-\d{8}`) and matched against relational databases before any generative response.
2. **Whistleblower Zero-PII Data Purge (DPDP Act 2023):**
   - When Anonymous Mode is toggled, client and server explicitly strip all name, phone, and email parameters, guaranteeing zero personal footprint in database dockets.
3. **Sliding-Window In-Memory Rate Limiting:**
   - Capped at 30 requests/minute per IP for AI chat and 10 submissions/hour for grievance filing to prevent API abuse.
4. **Indian Standard Accessibility (IS 17802:2021 & GIGW 3.0):**
   - 3-level font zoom (`A-`, `A`, `A+`), Obsidian high-contrast/dark theme (>4.5:1 ratio), screen-reader ARIA landmarks, and keyboard jump links.

---

## 🚀 5. Local Setup & Installation

### Prerequisites:
- Node.js 20+ / 24+
- npm / yarn / pnpm

```bash
# 1. Clone the repository
git clone https://github.com/ishangupta1412/sih26107-bis-saathi.git
cd sih26107-bis-saathi

# 2. Install dependencies
npm install

# 3. Configure environment variables (.env.local)
# GEMINI_API_KEY=your_gemini_api_key
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# 4. Start development server with Turbopack
npm run dev

# 5. Open http://localhost:3000 in your browser
```

---

## 👥 6. Team Strophoid (SIH 2026)

- **Problem Statement ID:** SIH26107
- **Ministry:** Ministry of Consumer Affairs, Food & Public Distribution
- **Theme:** Smart Automation / Quality Assurance & Regulatory Compliance
- **Live URL:** [https://bis-saathi-nine.vercel.app](https://bis-saathi-nine.vercel.app)

---

## 📂 7. Project Presentation

- 📊 **Official Presentation (PPTX):** [`docs/presentation/SIH2026-IDEA-Presentation Team Strophoid.pptx`](docs/presentation/SIH2026-IDEA-Presentation%20Team%20Strophoid.pptx)

---
*Built with ❤️ by **Team Strophoid** for Smart India Hackathon 2026.*
