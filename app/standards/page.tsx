'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import {
  ArrowLeft,
  Search,
  FileCheck,
  Building,
  Cpu,
  Award,
  Globe,
  ExternalLink,
  ShieldAlert,
  Download,
  Filter,
  Sparkles,
  Layers,
} from 'lucide-react';

const STANDARDS_CATALOG = [
  {
    is_number: 'IS 4151:2015',
    title: 'Protective Helmets for Two-Wheeler Motor Vehicle Riders',
    category: 'Helmets & Headgear',
    scheme: 'Scheme I (ISI Mark)',
    schemeBadge: 'ISI',
    qcoMandatory: 'Mandatory (MoRTH QCO)',
    auditRequired: 'Yes (Factory Audit)',
    testingDuration: '30–45 Days',
    scope: 'Impact attenuation, penetration resistance, chin strap retention test.',
    portal: 'manakonline.in',
  },
  {
    is_number: 'IS 302-1:2024 / IS 302-2-15',
    title: 'Safety of Household Electrical Appliances — Electric Kettles & Heaters',
    category: 'Household Electrical',
    scheme: 'Scheme I (ISI Mark)',
    schemeBadge: 'ISI',
    qcoMandatory: 'Mandatory (DPIIT QCO)',
    auditRequired: 'Yes (Factory Audit)',
    testingDuration: '45–60 Days',
    scope: 'Protection against electric shock, moisture resistance, leakage current test.',
    portal: 'manakonline.in',
  },
  {
    is_number: 'IS 302-2-3:2021',
    title: 'Safety of Household Electrical Appliances — Electric Dry and Steam Irons',
    category: 'Household Electrical',
    scheme: 'Scheme I (ISI Mark)',
    schemeBadge: 'ISI',
    qcoMandatory: 'Mandatory (DPIIT QCO)',
    auditRequired: 'Yes (Factory Audit)',
    testingDuration: '30–45 Days',
    scope: 'Temperature limits, electrical insulation, mechanical stability tests.',
    portal: 'manakonline.in',
  },
  {
    is_number: 'IS 9873-1:2019 / IS 15644',
    title: 'Safety of Toys — Mechanical, Physical & Electrical Safety',
    category: 'Toys & Playthings',
    scheme: 'Scheme I (ISI Mark)',
    schemeBadge: 'ISI',
    qcoMandatory: 'Mandatory (DPIIT QCO 2020)',
    auditRequired: 'Yes (Factory Audit)',
    testingDuration: '30–45 Days',
    scope: 'Choking hazard test, heavy metal migration (non-toxic), electrical insulation.',
    portal: 'manakonline.in',
  },
  {
    is_number: 'IS 2347:2017',
    title: 'Domestic Pressure Cookers — Specification',
    category: 'Cookware & Pressure Vessels',
    scheme: 'Scheme I (ISI Mark)',
    schemeBadge: 'ISI',
    qcoMandatory: 'Mandatory (DPIIT QCO)',
    auditRequired: 'Yes (Factory Audit)',
    testingDuration: '30–40 Days',
    scope: 'Bursting pressure test, safety valve release pressure, gasket material test.',
    portal: 'manakonline.in',
  },
  {
    is_number: 'IS 1489 (Part 1 & 2) / IS 12269',
    title: 'Portland Pozzolana Cement & 53 Grade Ordinary Portland Cement',
    category: 'Cement & Construction',
    scheme: 'Scheme I (ISI Mark)',
    schemeBadge: 'ISI',
    qcoMandatory: 'Mandatory (Cement QCO 2003)',
    auditRequired: 'Yes (Factory Audit)',
    testingDuration: '28 Days (Curing)',
    scope: 'Compressive strength at 3/7/28 days, fineness, initial/final setting time.',
    portal: 'manakonline.in',
  },
  {
    is_number: 'IS 1786:2008',
    title: 'High Strength Deformed Steel Bars and Wires for Concrete Reinforcement (TMT)',
    category: 'Steel & Metals',
    scheme: 'Scheme I (ISI Mark)',
    schemeBadge: 'ISI',
    qcoMandatory: 'Mandatory (Steel QCO)',
    auditRequired: 'Yes (Factory Audit)',
    testingDuration: '15–20 Days',
    scope: 'Yield stress, tensile strength, elongation percentage, bend/rebend test.',
    portal: 'manakonline.in',
  },
  {
    is_number: 'IS 14543:2024',
    title: 'Packaged Drinking Water (Other than Packaged Natural Mineral Water)',
    category: 'Food & Beverages',
    scheme: 'Scheme I (ISI Mark)',
    schemeBadge: 'ISI',
    qcoMandatory: 'Mandatory (FSSAI/BIS)',
    auditRequired: 'Yes (Factory Audit)',
    testingDuration: '15–25 Days',
    scope: 'Microbiological safety (E. coli, coliform), pesticide residues, heavy metals.',
    portal: 'manakonline.in',
  },
  {
    is_number: 'IS 15844 (Part 1 & 2):2023',
    title: 'Sports Footwear and Casual Footwear — General Requirements',
    category: 'Footwear & Leather',
    scheme: 'Scheme I (ISI Mark)',
    schemeBadge: 'ISI',
    qcoMandatory: 'Mandatory (Footwear QCO)',
    auditRequired: 'Yes (Factory Audit)',
    testingDuration: '20–30 Days',
    scope: 'Sole adhesion strength, flex resistance, abrasion resistance, toxicity.',
    portal: 'manakonline.in',
  },
  {
    is_number: 'IS 16333 (Part 3) / IS 13252',
    title: 'Mobile Phone Power Adapters & Electronic Chargers',
    category: 'Electronics & IT (CRS)',
    scheme: 'Scheme II (CRS)',
    schemeBadge: 'CRS',
    qcoMandatory: 'Mandatory (MeitY)',
    auditRequired: 'No (Lab Test Only)',
    testingDuration: '15–25 Days',
    scope: 'Electrical surge protection, flammability test, thermal endurance.',
    portal: 'crsbis.in',
  },
  {
    is_number: 'IS 16102 (Part 1 & 2)',
    title: 'Self-Ballasted LED Lamps for General Lighting Services',
    category: 'LED & Lighting (CRS)',
    scheme: 'Scheme II (CRS)',
    schemeBadge: 'CRS',
    qcoMandatory: 'Mandatory (MeitY)',
    auditRequired: 'No (Lab Test Only)',
    testingDuration: '15–20 Days',
    scope: 'Photometric performance, high voltage breakdown, lumen maintenance.',
    portal: 'crsbis.in',
  },
  {
    is_number: 'IS 1417:2016',
    title: 'Gold and Gold Alloys, Jewellery/Artefacts — Fineness & Hallmarking',
    category: 'Precious Metals',
    scheme: 'Hallmarking (HUID)',
    schemeBadge: 'Hallmark',
    qcoMandatory: 'Mandatory (256+ Districts)',
    auditRequired: 'AHC Assaying Verification',
    testingDuration: '1–2 Days',
    scope: 'XRF spectrometer purity check, Fire assay test, 6-digit laser HUID marking.',
    portal: 'manakonline.in',
  },
];

export default function StandardsCatalogPage() {
  const [search, setSearch] = useState('');
  const [filterScheme, setFilterScheme] = useState('ALL');

  useEffect(() => {
    document.title = 'Standards Library & Mandatory QCOs | BIS Saathi';
  }, []);

  const filtered = STANDARDS_CATALOG.filter((item) => {
    const matchesSearch =
      item.is_number.toLowerCase().includes(search.toLowerCase()) ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    const matchesScheme = filterScheme === 'ALL' || item.schemeBadge === filterScheme;
    return matchesSearch && matchesScheme;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 py-8 sm:py-12">
      <Breadcrumb items={[{ label: 'Standards Library & QCO Directory' }]} />

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Standards Library &amp; QCO Directory
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-3xl">
          Search mandatory Quality Control Orders (QCOs), Indian Standards (IS), scheme classifications, in-house lab mandates, and testing lead times.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="rounded-2xl border border-slate-300 bg-white p-4 shadow-xs mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by IS code (e.g. IS 4151), product (cement, helmet, charger), or category..."
            className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 focus:border-blue-950 focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <Filter className="h-4 w-4 text-slate-400 hidden sm:block" />
          {['ALL', 'ISI', 'CRS', 'Hallmark'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterScheme(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                filterScheme === tab
                  ? 'bg-blue-950 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.is_number}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs font-black text-blue-950 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                  {item.is_number}
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                      item.schemeBadge === 'ISI'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.schemeBadge === 'CRS'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.scheme}
                  </span>
                </div>
              </div>

              <h2 className="text-sm font-bold text-slate-900 mb-1 leading-snug">{item.title}</h2>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">{item.scope}</p>
            </div>

            <div className="space-y-2 border-t border-slate-100 pt-3 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">QCO Mandate:</span>
                <span className="font-semibold text-slate-800">{item.qcoMandatory}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Testing Duration:</span>
                <span className="font-semibold text-slate-800">{item.testingDuration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Audit Protocol:</span>
                <span className="font-semibold text-slate-800">{item.auditRequired}</span>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Link
                  href={`/chat?query=${encodeURIComponent(`Tell me about standard ${item.is_number}`)}`}
                  className="text-xs font-bold text-blue-950 hover:underline flex items-center gap-1"
                >
                  <Sparkles className="h-3 w-3 text-amber-500" />
                  <span>Ask AI Assistant</span>
                </Link>

                <a
                  href={`https://www.${item.portal}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-slate-500 hover:text-blue-950 font-semibold inline-flex items-center gap-0.5"
                >
                  <span>{item.portal}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ask BIS Saathi AI Floating Consultation Banner */}
      <div className="mt-10 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-blue-950 mb-1">Looking for a standard not listed in this preview?</h3>
          <p className="text-xs text-slate-600">BIS Saathi has a live vector knowledge base of Indian Standards. Ask about testing parameters, clause details, or applicable QCOs.</p>
        </div>
        <Link
          href="/chat"
          className="rounded-xl bg-blue-950 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-900 shadow-xs transition-all whitespace-nowrap"
        >
          Consult Standards AI Desk →
        </Link>
      </div>
    </div>
  );
}
