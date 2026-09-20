'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StateEmblem from '@/components/StateEmblem';
import {
  Cpu, ShieldCheck, ArrowRight, Layers, FlaskConical,
  AlertTriangle, BookOpen, Menu, X, ChevronRight,
  BarChart3, Globe, MessageSquare, Shield, Star, Building2, Award
} from 'lucide-react';

/* ── Progressive Animated Counter Hook (SSR-safe + Reduced Motion) ──── */
function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(target); // Initialize with target for instant SSR/non-JS rendering
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    if (!start || hasAnimated) return;
    setHasAnimated(true);
    setValue(0);
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration, hasAnimated]);

  return value;
}

const STATS = [
  { label: 'Mandatory QCOs in Force', value: 169, suffix: '+', icon: Shield, color: 'blue' },
  { label: 'Indian Standards Covered', value: 350, suffix: '+', icon: BookOpen, color: 'emerald' },
  { label: 'BIS Offices Nationwide', value: 35, suffix: '+', icon: Globe, color: 'purple' },
  { label: 'Product Categories', value: 120, suffix: '+', icon: BarChart3, color: 'orange' },
];

const DID_YOU_KNOW = [
  'Cement bags sold without ISI mark are illegal under the Cement (Quality Control) Order, 2003 (S.O. 191(E)).',
  'Every gold jewellery sold in India must carry a 6-digit laser HUID hallmark (IS 1417).',
  'Selling non-ISI certified goods under mandatory QCOs is punishable under Section 29 of BIS Act 2016.',
  'India has 350+ mandatory standards covering helmets, LPG cylinders, toys, and electrical appliances.',
  'CRS registration for electronics (Scheme II) requires lab testing only and typically takes 20–30 days.',
  'BIS operates 35 branch and regional offices, 8 central testing laboratories, and 5 regional institutes across India.',
];

export default function RoleSelectionPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'BIS Saathi — Bureau of Indian Standards AI Assistant';
  }, []);

  // Intersection observer to trigger stat counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Rotate "Did You Know" tip every 5s
  useEffect(() => {
    const id = setInterval(() => setTipIndex(i => (i + 1) % DID_YOU_KNOW.length), 5000);
    return () => clearInterval(id);
  }, []);

  const handleRoleSelect = (role: 'manufacturer' | 'consumer') => {
    sessionStorage.setItem('bis_role', role);
  };

  const c0 = useCountUp(STATS[0].value, 1600, statsVisible);
  const c1 = useCountUp(STATS[1].value, 1800, statsVisible);
  const c2 = useCountUp(STATS[2].value, 1400, statsVisible);
  const c3 = useCountUp(STATS[3].value, 1700, statsVisible);
  const counts = [c0, c1, c2, c3];

  return (
    <div className="w-full flex flex-col items-center">

      {/* ── Top Navigation Bar ─────────────────────────── */}
      <header className="w-full border-b border-slate-200 bg-white px-4 sm:px-8 py-3 sticky top-0 z-40 shadow-xs no-print">
        <div className="mx-auto flex max-w-7xl items-center justify-between">

          {/* Logo + Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <StateEmblem className="h-10 w-auto text-slate-900" />
            <div className="border-l border-slate-300 pl-3">
              <span className="font-extrabold text-base tracking-tight text-blue-950 block leading-tight">BIS Saathi</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Govt. of India Portal</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-700" aria-label="Main navigation">
            <Link href="/standards" className="hover:text-blue-900 transition-colors flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-slate-400" /> Standards Library
            </Link>
            <Link href="/pathway" className="hover:text-blue-900 transition-colors flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-slate-400" /> Certification Pathways
            </Link>
            <Link href="/checker" className="hover:text-blue-900 transition-colors flex items-center gap-1.5">
              <FlaskConical className="h-3.5 w-3.5 text-slate-400" /> Mark Checker
            </Link>
            <Link href="/offices" className="hover:text-blue-900 transition-colors flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-slate-400" /> Office Finder
            </Link>
            <Link href="/complaint" className="hover:text-blue-900 transition-colors flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-slate-400" /> Grievance Portal
            </Link>
            <Link href="/about" className="hover:text-blue-900 transition-colors flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-slate-400" /> About
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/chat"
              onClick={() => handleRoleSelect('consumer')}
              className="rounded-lg bg-blue-950 px-4 py-2 text-xs font-bold text-white hover:bg-blue-900 transition-colors shadow-xs"
            >
              Enter AI Desk →
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 mt-3 pt-3 pb-2 space-y-1 animate-fade-in">
            {[
              { href: '/standards', label: 'Standards Library', Icon: BookOpen },
              { href: '/pathway', label: 'Certification Pathways', Icon: Layers },
              { href: '/checker', label: 'Mark Checker', Icon: FlaskConical },
              { href: '/offices', label: 'Office Finder', Icon: Building2 },
              { href: '/complaint', label: 'Grievance Portal', Icon: AlertTriangle },
              { href: '/about', label: 'About', Icon: Cpu },
            ].map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                <Icon className="h-4 w-4 text-slate-400" />
                {label}
                <ChevronRight className="h-3.5 w-3.5 ml-auto text-slate-400" />
              </Link>
            ))}
            <div className="pt-2 px-3">
              <Link
                href="/chat"
                onClick={() => { setMobileMenuOpen(false); handleRoleSelect('consumer'); }}
                className="w-full block text-center rounded-lg bg-blue-950 py-2.5 text-sm font-bold text-white"
              >
                Enter Portal →
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero Section ───────────────────────────────── */}
      <section className="w-full max-w-6xl px-4 py-14 sm:py-20 text-center">

        {/* Badge with Hackathon Problem Statement */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-[11px] font-bold text-blue-900 mb-6 shadow-2xs">
          <span className="relative live-dot h-2 w-2 rounded-full bg-emerald-500 inline-block" />
          <span>Smart India Hackathon 2026 · SIH26107 Prototype</span>
        </div>

        {/* Title */}
        <h1 className="animate-fade-in-up text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">
          Bureau of Indian Standards
        </h1>
        <h2 className="animate-fade-in-up text-2xl sm:text-3xl font-bold text-blue-950 mb-5">
          AI-Powered Intelligent Assistant
        </h2>
        <p className="animate-fade-in-up mx-auto max-w-2xl text-sm text-slate-600 mb-4 leading-relaxed">
          Your authoritative AI guide to Indian Quality Standards, BIS Certification Pathways, Mark Verification, and Grievance Filing — powered by Gemini multimodal AI and a live vector knowledge base of Indian Standards.
        </p>

        {/* Did You Know Ticker */}
        <div className="animate-fade-in-up mx-auto max-w-xl mb-10 rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-2.5 flex items-start gap-2">
          <Star className="h-3.5 w-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-900 font-semibold text-left leading-snug transition-all">
            <span className="font-bold text-amber-700">Did you know? </span>
            {DID_YOU_KNOW[tipIndex]}
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid gap-5 sm:grid-cols-2 max-w-3xl mx-auto text-left stagger mb-12">

          {/* Manufacturer Card (Semantic Link) */}
          <Link
            href="/chat"
            onClick={() => handleRoleSelect('manufacturer')}
            aria-label="Enter portal as Manufacturer or Industry"
            className="animate-fade-in-up group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-blue-900 hover:shadow-lg transition-all cursor-pointer card-hover"
          >
            <div>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-900 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">I am a Manufacturer / Industry</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Navigate certification pathways (Scheme I, II, FMCS), access mandatory standards with testing parameters, generate document checklists, and track application status.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {['ISI Mark', 'CRS', 'FMCS', 'QCO Lookup', 'Checklist Generator'].map(t => (
                  <span key={t} className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-800">{t}</span>
                ))}
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 group-hover:underline">
              <span>ENTER AS MANUFACTURER</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Consumer Card (Semantic Link) */}
          <Link
            href="/chat"
            onClick={() => handleRoleSelect('consumer')}
            aria-label="Enter portal as Consumer or Citizen"
            className="animate-fade-in-up group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-emerald-700 hover:shadow-lg transition-all cursor-pointer card-hover"
          >
            <div>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">I am a Consumer / Citizen</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Verify ISI marks and gold hallmarks, detect counterfeits with AI photo scanning, understand your rights under BIS Act 2016, and file product safety grievances.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {['Mark Verification', 'Photo Scanner', 'Genuine vs Fake', 'Grievance Filing', 'Consumer Rights'].map(t => (
                  <span key={t} className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">{t}</span>
                ))}
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 group-hover:underline">
              <span>ENTER AS CONSUMER</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>

        {/* Quick Access Strip */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {[
            { href: '/checker', label: '🔍 Verify a Mark', color: 'bg-slate-100 text-slate-800 hover:bg-slate-200' },
            { href: '/offices', label: '📍 Find BIS Office', color: 'bg-purple-50 text-purple-800 hover:bg-purple-100' },
            { href: '/complaint', label: '🚨 File a Grievance', color: 'bg-red-50 text-red-800 hover:bg-red-100' },
            { href: '/standards', label: '📚 Browse Standards', color: 'bg-blue-50 text-blue-800 hover:bg-blue-100' },
            { href: '/pathway', label: '🗺️ Get Certified', color: 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100' },
          ].map(({ href, label, color }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${color}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Live Stats Section ─────────────────────────── */}
      <section
        ref={statsRef}
        className="w-full bg-blue-950 py-12 px-4 sm:px-8"
        aria-label="BIS Portal Statistics"
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-xs font-bold uppercase tracking-widest text-blue-300 mb-8">
            Bureau of Indian Standards — At a Glance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 stagger">
            {STATS.map(({ label, suffix, icon: Icon }, i) => (
              <div key={label} className="animate-fade-in-up text-center">
                <Icon className="h-5 w-5 text-blue-300 mx-auto mb-2" aria-hidden="true" />
                <div className="text-3xl sm:text-4xl font-black text-white tabular-nums">
                  {counts[i]}{suffix}
                </div>
                <div className="text-[11px] text-blue-300 font-semibold mt-1 leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature Highlights ─────────────────────────── */}
      <section className="w-full max-w-6xl px-4 py-14 sm:py-20">
        <h2 className="text-center text-2xl font-extrabold text-slate-900 mb-2">
          Everything You Need, In One Portal
        </h2>
        <p className="text-center text-xs text-slate-500 mb-10 max-w-xl mx-auto">
          From first-time certification queries to enforcement complaints — the BIS AI Assistant covers the full lifecycle.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
          {[
            {
              icon: MessageSquare, color: 'blue',
              title: 'Multimodal RAG Chat',
              desc: 'Ask complex regulatory questions. Gemini 3.6 Flash retrieves answers from a live vector index of Indian Standards with citations.',
              href: '/chat',
            },
            {
              icon: FlaskConical, color: 'emerald',
              title: 'AI Mark Verification',
              desc: 'Validate 7–10 digit CM/L numbers, R-numbers, and HUIDs in real time. Upload a product photo for AI-powered counterfeit detection.',
              href: '/checker',
            },
            {
              icon: Layers, color: 'purple',
              title: 'Certification Pathways',
              desc: 'Understand Scheme I, Scheme II, and FMCS with document checklists and live application pipeline tracking.',
              href: '/pathway',
            },
            {
              icon: BookOpen, color: 'orange',
              title: 'Standards Library',
              desc: 'Search 350+ mandatory QCO standards. Filter by scheme, category, and testing lead times with direct AI consultation.',
              href: '/standards',
            },
            {
              icon: AlertTriangle, color: 'red',
              title: 'Grievance Portal',
              desc: 'Lodge product safety violations with evidence upload. Track complaint status by reference ID through enforcement stages.',
              href: '/complaint',
            },
            {
              icon: Award, color: 'teal',
              title: 'GIGW 3.0 & IS 17802',
              desc: 'Fully accessible per Indian Web Accessibility Standard IS 17802:2021 and WCAG 2.1 Level AA. High contrast, font resizing, dark mode.',
              href: '/policies',
            },
          ].map(({ icon: Icon, color, title, desc, href }) => (
            <Link
              key={title}
              href={href}
              className="animate-fade-in-up group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all card-hover"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1.5">{title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed flex-1">{desc}</p>
              <span className="mt-4 text-xs font-bold text-blue-900 group-hover:underline flex items-center gap-1">
                Explore <ChevronRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Official Links Banner ───────────────────────── */}
      <section className="w-full border-t border-slate-200 bg-slate-50 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Official Government Portals</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'bis.gov.in', href: 'https://www.bis.gov.in' },
              { label: 'manakonline.in', href: 'https://www.manakonline.in' },
              { label: 'crsbis.in', href: 'https://www.crsbis.in' },
              { label: 'india.gov.in', href: 'https://www.india.gov.in' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs font-bold text-slate-700 hover:border-blue-900 hover:text-blue-900 transition-all"
              >
                {label} ↗
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
