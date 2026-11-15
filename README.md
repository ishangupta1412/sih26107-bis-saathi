<div align="center">

<img src="./docs/assets/hero_motion.svg" width="100%" alt="BIS-AI Saathi Header" />

# BIS-AI Saathi

### Intelligent Multimodal Regulatory Cockpit & Indian Standards Guidance Platform

**Smart India Hackathon 2026** • Problem Statement **SIH26107**  
*Ministry of Consumer Affairs, Food & Public Distribution — Bureau of Indian Standards (BIS)*

<br/>

[**Live Production Portal**](https://bis-saathi-nine.vercel.app/) &nbsp;•&nbsp; 
[**Source Code**](https://github.com/ishangupta1412/BIS-AI-Saathi) &nbsp;•&nbsp; 
[**MIT License**](./LICENSE)

<br/>

`Next.js 16 (App Router)` &nbsp;•&nbsp; 
`React 19` &nbsp;•&nbsp; 
`Google Gemini 3.8 Flash (Vision + Text)` &nbsp;•&nbsp; 
`Supabase pgvector RAG` &nbsp;•&nbsp; 
`GIGW 3.0 & IS 17802:2021 (WCAG 2.1 AA)`

</div>

<br/>

---

## Executive Overview

India's standards ecosystem encompasses over 20,000 Indian Standards (IS codes) and hundreds of mandatory Quality Control Orders (QCOs). Small and medium manufacturers (MSMEs) struggle with fragmented certification roadmaps, opaque testing lead times, and manual document verification. Concurrently, consumers face counterfeit ISI marks, unverified CRS registrations, and tampered gold hallmarking.

**BIS-AI Saathi** addresses both sides of this ecosystem through a dual-persona architecture:

1. **For Citizens & Consumers**: Instant multimodal verification of physical product packaging using Gemini Vision, deterministic statutory license validation (ISI, CRS, HUID), and voice-enabled advisory across 22 Scheduled Indic languages.
2. **For MSME Manufacturers**: End-to-end certification pathway mapping (Scheme I, Scheme II, FMCS), automated document checklist generation, and clause-grounded regulatory retrieval over Indian Standards.

---

## System Architecture

```mermaid
flowchart TD
    subgraph Client ["Client Presentation Layer (Next.js 16 + React 19)"]
        A["Citizen / Consumer Flow"] --> C["Accessible UI (GIGW 3.0 & IS 17802 AA)"]
        B["MSME / Industry Flow"] --> C
        C --> D["Web Speech API (22 Indic Languages)"]
        C --> E["Camera & Photo Upload Pipeline"]
    end

    subgraph Edge ["Next.js App Router Edge & API Gateways"]
        C --> F["/api/chat (Streaming Copilot)"]
        C --> G["/api/checker (Vision Analysis)"]
        C --> H["/api/pathway (Standards Matrix)"]
    end

    subgraph Intelligence ["AI & Knowledge Retrieval Core"]
        F --> I["Gemini 3.8 Flash (Clause Grounding)"]
        G --> J["Gemini 3.8 Vision (Packaging Forensics)"]
        I <--> K["Supabase pgvector (Vector Embeddings)"]
        K --> L[("Indian Standards (IS Codes) & QCO Registry")]
    end

    subgraph Validation ["Deterministic Statutory Validators"]
        G --> M["ISI CM/L Regex Engine (^CM/L-[0-9]{7,10}$)"]
        G --> N["CRS R-Registration Engine (^R-[0-9]{8}$)"]
        G --> O["Hallmark HUID Verifier (6-char Checksum)"]
    end
```

---

## Core Capabilities

| Capability | Engineering Implementation | Practical Value |
| :--- | :--- | :--- |
| **Multimodal Label Forensics** | Gemini 3.8 Vision + Bounding Isolation | Identifies counterfeit ISI marks, missing CM/L numbers, and non-compliant typography directly from packaging photos. |
| **Regulatory Vector RAG** | Supabase pgvector + Gemini Context Grounding | Provides clause-grounded regulatory guidance over thousands of Indian Standards and statutory QCO mandates. |
| **Dual-Persona Workflows** | Next.js 16 App Router Dynamic Layouts | Separates citizen verification flows from multi-step MSME industrial certification pathways. |
| **Indic Language Voice Copilot** | Native Web Speech API Integration | Delivers voice-first access across all 22 Eighth Schedule Indian languages. |
| **GovTech Accessibility** | GIGW 3.0 & IS 17802:2021 Certification | Fully compliant with Indian Government Web Guidelines and W3C WCAG 2.1 Level AA accessibility. |
| **National Branch Directory** | Geolocation + Static Map Engine | Real-time directory and routing for all 35 regional BIS branch offices across India. |

---

## Production Interface & Verified Workflows

All views captured directly from the live production portal in standardized 16:9 widescreen desktop format:

### 1. Dual-Persona Onboarding Portal
<div align="center">
  <img src="./docs/assets/feat_home_portal_landscape.png" width="100%" alt="Home Portal" style="border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);" />
  <p><sub>Bifurcated gateway routing consumers toward instant mark protection and MSMEs toward statutory certification roadmaps.</sub></p>
</div>

<br/>

### 2. Multimodal Mark & License Authentication Checker
<div align="center">
  <img src="./docs/assets/feat_vision_scanner_landscape.png" width="100%" alt="Vision Scanner" style="border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);" />
  <p><sub>Camera and photo forensics verifying 7–10 digit ISI CM/L numbers, CRS registrations, and gold HUID checksums against statutory standards.</sub></p>
</div>

<br/>

### 3. AI Regulatory Copilot with Clause Grounding
<div align="center">
  <img src="./docs/assets/feat_regulatory_copilot_landscape.png" width="100%" alt="AI Regulatory Copilot" style="border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);" />
  <p><sub>Real-time copilot grounded in 20,000+ Indian Standards (IS codes) supporting English, Hindi, and Hinglish with zero hallucination guardrails.</sub></p>
</div>

<br/>

### 4. Certification Pathways & Schemes Matrix
<div align="center">
  <img src="./docs/assets/feat_pathway_matrix_landscape.png" width="100%" alt="Certification Pathways" style="border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);" />
  <p><sub>Interactive comparative analysis of Scheme I (ISI Mark), Scheme II (Compulsory Registration), and FMCS compliance paths.</sub></p>
</div>

<br/>

### 5. Mandatory Document Checklist Generator
<div align="center">
  <img src="./docs/assets/feat_document_checklist_landscape.png" width="100%" alt="Document Checklist Generator" style="border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);" />
  <p><sub>Automated statutory documentation package compiler with single-click PDF export for factory premises, lab equipment, and test certificates.</sub></p>
</div>

---

## Deterministic Statutory Validation Engine

Rather than relying purely on probabilistic LLM responses, **BIS-AI Saathi** executes deterministic validation rules to ensure statutory integrity:

```
┌─────────────────────────┬──────────────────────────────┬─────────────────────────┬──────────────────┐
│ Certification Mark      │ Statutory Pattern Specification │ Normalization Protocol  │ Compliance Check │
├─────────────────────────┼──────────────────────────────┼─────────────────────────┼──────────────────┤
│ ISI Standard Mark       │ ^CM/L-[0-9]{7,10}$           │ Strict uppercase prefix │ Pass / Reject    │
│ Compulsory Registration │ ^R-[0-9]{8}$                 │ 8-digit deterministic   │ Pass / Reject    │
│ Gold Hallmarking (HUID) │ ^[A-Z0-9]{6}$                │ 6-char alphanumeric     │ Checksum Match   │
│ Packaging Typography    │ Centralized IS Code Placement│ Aspect ratio > 1:1.4    │ Dimension Audit  │
└─────────────────────────┴──────────────────────────────┴─────────────────────────┴──────────────────┘
```

- **ISI Certification Mark**: Validated against `^CM/L-[0-9]{7,10}$` to counter fraudulent 5-digit stamps.
- **CRS Registration**: Enforces `^R-[0-9]{8}$` for electronic goods mandated under MeitY QCO orders.
- **Gold Hallmarking (HUID)**: 6-character alphanumeric checksum validation countering fake laser-engraved hallmarks.
- **Proportion Analysis**: Verifies that standard IS code is placed centrally above the mark and CM/L license number is positioned below according to official BIS drafting guidelines.

---

## Central Operations & Command Center

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212750147-854a394f-fee9-4080-9770-78a4b7ece53f.gif" width="75%" alt="Command Center" style="border-radius: 8px;" />
  <p><sub>Continuous regulatory sync monitoring changes in BIS Quality Control Orders (QCOs) and Gazette notifications.</sub></p>
</div>

---

## Compliance & Governance

| Standard | Scope | Implementation |
| :--- | :--- | :--- |
| **GIGW 3.0** | National Portal Compliance | Strict adherence to Indian Government Web Guidelines. |
| **IS 17802:2021** | Digital Accessibility | Fully certified under W3C WCAG 2.1 Level AA. |
| **DPDP Act 2023** | Data Protection & Privacy | Zero PII retention on image audits; anonymous whistleblower grievance routing. |
| **BIS Act 2016** | Legal Framework | Direct mapping of statutory penalties under Section 29 into AI advisory logic. |

---

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript (Strict), Tailwind CSS v4, Radix UI
- **AI & Retrieval**: Google Gemini 3.8 Flash (Multimodal Vision + Text), Supabase pgvector
- **Voice & Accessibility**: Web Speech API (22 Scheduled Indic languages), Skip Links, ARIA 1.2
- **Testing & Quality**: Vitest (Unit Tests), Playwright (E2E Accessibility Audits)
- **Deployment**: Vercel Serverless Edge Runtime

---

## Local Development

```bash
# Clone repository
git clone https://github.com/ishangupta1412/BIS-AI-Saathi.git
cd BIS-AI-Saathi

# Install dependencies
pnpm install

# Environment setup
cp .env.example .env.local

# Start development server
pnpm dev
```

---

## Project Context & Attribution

- **Competition**: Smart India Hackathon 2026 (Problem Statement: SIH26107)
- **Team**: Team Strophoid (Certificate of Participation awarded to Ishan Gupta)
- **Lead Developer**: [Ishan Gupta](https://github.com/ishangupta1412) ([LinkedIn](https://www.linkedin.com/in/ishan-gupta-976192419))
- **Authority**: Bureau of Indian Standards (BIS), Ministry of Consumer Affairs, Food & Public Distribution
- **License**: [MIT License](./LICENSE)
