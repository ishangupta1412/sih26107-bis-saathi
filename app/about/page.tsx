import Link from 'next/link';
import type { Metadata } from 'next';
import StateEmblem from '@/components/StateEmblem';
import BISLogo from '@/components/BISLogo';
import {
  Shield, Layers, Cpu, Database, Code2, Lock,
  ExternalLink, BookOpen, AlertTriangle, Award,
  Users, Zap, Brain, Globe, CheckCircle2, ArrowRight,
  FlaskConical, MessageSquare, FileCheck, BarChart3,
  Server, GitBranch, Volume2, Building2, Languages
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'System Architecture & Technology Stack',
  description: 'Technical architecture, multimodal RAG pipeline flow, and GIGW 3.0 compliance implementation for BIS Saathi (SIH26107).',
};

const TECH_STACK = [
  { icon: Code2, label: 'Frontend', title: 'Next.js 16 / React 19', desc: '3-column cockpit workspace with Turbopack, RSC, and full GIGW 3.0 accessibility.' },
  { icon: Brain, label: 'AI Engine', title: 'Gemini 3.6 Flash', desc: 'Multimodal: text, image, and PDF ingestion for regulatory document inspection.' },
  { icon: Database, label: 'Vector Store', title: 'Supabase pgvector', desc: '768-dimensional cosine similarity over chunked IS standard documents.' },
  { icon: Lock, label: 'Compliance', title: 'BIS Act 2016', desc: 'QCO enforcement grounding, Section 29 penalty citations, IS 17802:2021 accessibility.' },
  { icon: Server, label: 'API Layer', title: 'Next.js Route Handlers', desc: 'Edge-ready API routes for chat RAG, license checks, and grievance management.' },
  { icon: GitBranch, label: 'AI Pattern', title: 'Agentic RAG Pipeline', desc: 'Retrieve → Augment → Generate with source tracing, dossier export, and tool calling.' },
];

const FEATURES = [
  { icon: MessageSquare, label: 'Multimodal RAG Chat with session history', done: true },
  { icon: Languages, label: '22 Scheduled Indian Languages Full AI Support', done: true },
  { icon: Volume2, label: 'Real-time Indian TTS with Script Auto-Detection', done: true },
  { icon: FlaskConical, label: 'AI Photo Mark Scanner (camera + upload)', done: true },
  { icon: Shield, label: 'CM/L, R-number, HUID real-time validation', done: true },
  { icon: Building2, label: 'Nationwide Branch & Regional Office Directory', done: true },
  { icon: FileCheck, label: 'Mandatory Document Checklist Generator', done: true },
  { icon: BarChart3, label: 'Application Pipeline Status Tracker', done: true },
  { icon: AlertTriangle, label: 'Grievance Filing + Evidence Upload', done: true },
  { icon: BookOpen, label: 'Standards Library with QCO Filters', done: true },
  { icon: Award, label: 'Genuine vs Counterfeit Visual Guide', done: true },
  { icon: Zap, label: 'Export Compliance Dossier (Agentic Action)', done: true },
  { icon: Globe, label: 'GIGW 3.0 + IS 17802:2021 Accessibility', done: true },
];

const TEAM_ROLES = [
  { role: 'AI / ML Engineer', skill: 'RAG Pipeline, Gemini API, Embeddings' },
  { role: 'Full-Stack Developer', skill: 'Next.js 16, TypeScript, Supabase' },
  { role: 'UX / Government Design', skill: 'GIGW 3.0, WCAG 2.1 AA, IS 17802' },
  { role: 'Domain Expert', skill: 'BIS Act 2016, QCOs, Indian Standards' },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-8 py-8 sm:py-12">

      {/* ── Hero ─────────────────────────────────────── */}
      <div className="mb-10 text-center">
        <div className="flex items-center justify-center gap-4 mb-5">
          <StateEmblem className="h-14 w-auto text-slate-900" />
          <div className="h-10 w-px bg-slate-300" />
          <BISLogo className="h-12 w-auto" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Bureau of Indian Standards
        </h1>
        <p className="mt-1 text-base text-blue-950 font-bold">
          AI-Powered Intelligent Assistant — BIS Saathi
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs font-semibold">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-950">SIH26107</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">Ministry of Consumer Affairs</span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-800">GIGW 3.0 + IS 17802 Compliant</span>
          <span className="rounded-full bg-purple-100 px-3 py-1 text-purple-800">Gemini 3.6 Flash Multimodal</span>
        </div>
      </div>

      {/* ── Statutory Disclaimer ───────────────────── */}
      <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50/80 p-5 text-xs text-amber-900 leading-relaxed">
        <div className="flex items-center gap-2 font-bold mb-1.5">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <span>Statutory Disclaimer</span>
        </div>
        <p>
          BIS Saathi is an official intelligent assistant prototype engineered under Smart India Hackathon 2026 (SIH26107) for the Ministry of Consumer Affairs, Food &amp; Public Distribution. It provides preliminary technical consultation only. Formal conformity assessment applications, audits, and statutory license grants are legally executed through <strong>manakonline.in</strong> and <strong>crsbis.in</strong>.
        </p>
      </div>

      {/* ── Problem Statement ─────────────────────── */}
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-950" /> Problem Statement SIH26107
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed mb-3">
          The Bureau of Indian Standards manages 350+ mandatory standards enforced through Quality Control Orders (QCOs) across sectors from cement to electronics. Manufacturers — especially MSMEs — face significant friction navigating complex certification pathways, understanding mandatory testing parameters, and tracking application progress. Consumers lack an accessible tool to verify genuine BIS marks and report counterfeits.
        </p>
        <p className="text-xs text-slate-600 leading-relaxed">
          <strong>BIS Saathi</strong> solves this by deploying a multimodal, RAG-augmented AI assistant grounded in the authoritative text of Indian Standards — delivering expert-level guidance to both manufacturers and consumers in real time, in plain language.
        </p>
      </div>

      {/* ── System Architecture ────────────────────── */}
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
          <Layers className="h-5 w-5 text-blue-950" /> System Architecture &amp; Technology Stack
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {TECH_STACK.map(({ icon: Icon, label, title, desc }) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:border-blue-200 transition-colors">
              <Icon className="h-5 w-5 text-blue-950 mb-2" />
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</h3>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{title}</p>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Agentic RAG Pipeline Diagram ──────────── */}
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm overflow-x-auto">
        <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-950" /> Agentic RAG Pipeline
        </h2>
        <div className="flex items-center gap-2 min-w-[480px]">
          {[
            { step: '1', label: 'User Query\n(Text / Voice / Image)', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-900' },
            { step: '→', label: '', bg: '', border: '', text: 'text-slate-400' },
            { step: '2', label: 'Embed Query\ntext-embedding-004', bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-900' },
            { step: '→', label: '', bg: '', border: '', text: 'text-slate-400' },
            { step: '3', label: 'pgvector Search\nTop-K IS Chunks', bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-900' },
            { step: '→', label: '', bg: '', border: '', text: 'text-slate-400' },
            { step: '4', label: 'Gemini 3.6 Flash\nGenerate + Cite', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-900' },
            { step: '→', label: '', bg: '', border: '', text: 'text-slate-400' },
            { step: '5', label: 'Structured Response\n+ Dossier Export', bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-900' },
          ].map(({ step, label, bg, border, text }, i) => (
            step === '→'
              ? <ArrowRight key={i} className="h-4 w-4 flex-shrink-0 text-slate-400" />
              : (
                <div key={i} className={`flex-1 rounded-xl border ${border} ${bg} p-3 text-center min-w-[80px]`}>
                  <div className={`text-[10px] font-black uppercase tracking-wider ${text} mb-1`}>Step {step}</div>
                  <div className="text-[10px] text-slate-700 font-semibold leading-snug whitespace-pre-line">{label}</div>
                </div>
              )
          ))}
        </div>
      </div>

      {/* ── Feature Checklist ─────────────────────── */}
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" /> Implemented Feature Catalog
        </h2>
        <div className="grid sm:grid-cols-2 gap-2">
          {FEATURES.map(({ icon: Icon, label, done }) => (
            <div key={label} className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
              <span className="text-xs font-semibold text-slate-700">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Team Composition ──────────────────────── */}
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-950" /> Team Composition
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {TEAM_ROLES.map(({ role, skill }) => (
            <div key={role} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100 flex-shrink-0">
                <Users className="h-4 w-4 text-blue-900" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{role}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{skill}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Official Links ────────────────────────── */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-950" /> Official Bureau of Indian Standards Links
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { title: 'Bureau of Indian Standards Official Portal', url: 'https://www.bis.gov.in', desc: 'Official website, Gazette notifications, and standard specifications' },
            { title: 'MANAK Portal (e-BIS)', url: 'https://www.manakonline.in', desc: 'Scheme-I ISI Mark & FMCS domestic licensing portal' },
            { title: 'CRS Registration Portal', url: 'https://www.crsbis.in', desc: 'Electronics & IT goods compulsory registration' },
            { title: 'National Portal of India', url: 'https://www.india.gov.in', desc: 'Government of India citizen services gateway' },
            { title: 'Guidelines for Indian Govt Websites (GIGW)', url: 'https://guidelines.india.gov.in', desc: 'NIC GIGW 3.0 web standards compliance framework' },
            { title: 'Complaints Email (CMED)', url: 'mailto:complaints@bis.gov.in', desc: 'Statutory violations: complaints@bis.gov.in' },
          ].map((item) => (
            <a
              key={item.title}
              href={item.url}
              target={item.url.startsWith('mailto') ? undefined : '_blank'}
              rel={item.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 hover:border-blue-950 hover:bg-blue-50/30 transition-all"
            >
              <div>
                <p className="text-xs font-bold text-slate-900">{item.title}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
              </div>
              <ExternalLink className="h-4 w-4 text-slate-400 flex-shrink-0 ml-2" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
