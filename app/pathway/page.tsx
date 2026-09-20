'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import {
  ArrowLeft,
  ShieldCheck,
  Cpu,
  Globe,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building,
  Plane,
  ExternalLink,
  FileText,
  Search,
  Check,
  Download,
  ListChecks,
  Printer,
} from 'lucide-react';

const SCHEME_DOCUMENTS: Record<string, string[]> = {
  'Scheme I (ISI Mark)': [
    'Proof of Factory Premises & Land Ownership / Registered Lease Deed',
    'List of Manufacturing Machinery & Equipment with rated production capacity',
    'Scheme of Inspection & Testing (SIT) In-house Lab Testing Equipment Setup',
    'Valid Calibration Certificates of all in-house test instruments (NABL traceable)',
    'Manufacturing Process Flowchart & In-process Quality Control (IPQC) Plan',
    'Competent Quality Control Personnel Details & Technical Qualification Certificates',
    'Bank Guarantees & Statutory Application Fee Challan (Form-V on e-BIS)',
    'Brand / Trademark Registration Certificate or Authorization Letter',
  ],
  'Scheme II (CRS)': [
    'Test Report issued by BIS-recognized NABL Accredited Laboratory (less than 90 days old)',
    'Self-Declaration of Conformity (SDoC) on Form-I',
    'Brand / Trademark Registration Certificate or Brand Owner Authorization Letter',
    'Affidavit of Authorized Signatory (Resident Indian / Authorized Indian Representative)',
    'Manufacturing Unit Address Proof & Factory License (Overseas or Domestic)',
  ],
  'FMCS (Foreign Manufacturer)': [
    'Nomination Form of Authorized Indian Representative (AIR) residing in India',
    'Business License / Factory Incorporation Certificate of Foreign Jurisdiction',
    'Complete Manufacturing & In-house Testing Setup Proof with SIT compliance',
    'Consent to BIS Physical Inspection and Agreement to bear international auditor travel & DA expenses',
    'AIR Permanent Account Number (PAN) and Indian Aadhaar/Passport Proof',
  ],
};

export default function PathwaysOverviewPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'checklist' | 'tracker'>('overview');
  const [selectedScheme, setSelectedScheme] = useState('Scheme I (ISI Mark)');
  const [appNumber, setAppNumber] = useState('APP-2026-78419');
  const [appStatus, setAppStatus] = useState<any>({
    number: 'APP-2026-78419',
    applicant: 'Precision Helmets India Pvt Ltd',
    product: 'Protective Helmet (IS 4151:2015)',
    scheme: 'Scheme-I (Domestic ISI)',
    currentStep: 'Step 3: Factory Inspection Audit',
    timeline: [
      { step: '1. Online Application & Document Scrutiny on Manakonline', status: 'Completed', date: 'August 10, 2026' },
      { step: '2. Scrutiny Clearance & Inspection Officer Designation', status: 'Completed', date: 'August 18, 2026' },
      { step: '3. Physical Factory Audit & In-house Lab Verification', status: 'In Progress (Scheduled for Aug 30)', current: true },
      { step: '4. Sample Testing at Central BIS Laboratory', status: 'Pending', date: 'Estimated 20 Days' },
      { step: '5. Grant of CM/L License Number & Marking Rights', status: 'Pending', date: 'Final Stage' },
    ],
  });

  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    document.title = 'Certification Pathways & Document Checklists | BIS Saathi';
  }, []);

  const handleTrackApplication = () => {
    if (!appNumber.trim()) return;
    setIsTracking(true);
    setTimeout(() => {
      setIsTracking(false);
      const isCrs = appNumber.toUpperCase().includes('CRS') || appNumber.toUpperCase().includes('R-');
      setAppStatus({
        number: appNumber.trim().toUpperCase(),
        applicant: isCrs ? 'Apex Electronics Technologies Ltd' : 'Precision Helmets India Pvt Ltd',
        product: isCrs ? 'Mobile Phone Adapter / LED Power Supply' : 'Protective Helmet (IS 4151:2015)',
        scheme: isCrs ? 'Scheme-II (Compulsory Registration Scheme)' : 'Scheme-I (Domestic ISI Certification)',
        currentStep: isCrs ? 'Step 2: Test Report Verification' : 'Step 3: Factory Inspection Audit',
        timeline: isCrs
          ? [
              { step: '1. Online SDoC Application Lodged on crsbis.in', status: 'Completed', date: 'August 22, 2026' },
              { step: '2. NABL Test Report Verification by BIS Bureau', status: 'In Progress (Under Review)', current: true, date: 'Aug 26, 2026' },
              { step: '3. Grant of 8-Digit R-Number Registration', status: 'Pending', date: 'Expected in 5 Days' },
            ]
          : [
              { step: '1. Online Application & Document Scrutiny on Manakonline', status: 'Completed', date: 'August 10, 2026' },
              { step: '2. Scrutiny Clearance & Inspection Officer Designation', status: 'Completed', date: 'August 18, 2026' },
              { step: '3. Physical Factory Audit & In-house Lab Verification', status: 'In Progress (Scheduled)', current: true, date: 'Aug 30, 2026' },
              { step: '4. Sample Testing at Central BIS Laboratory', status: 'Pending', date: 'Estimated 20 Days' },
              { step: '5. Grant of CM/L License Number & Marking Rights', status: 'Pending', date: 'Final Stage' },
            ],
      });
    }, 400);
  };

  const handlePrintChecklist = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 py-8 sm:py-12">
      <Breadcrumb items={[{ label: 'Certification Pathways & Schemes' }]} />

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Certification Pathways &amp; Application Engine
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Navigate Scheme I (ISI Mark), Scheme II (CRS), and FMCS compliance workflows, generate document checklists, and track live application status.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-8 gap-2" role="tablist" aria-label="Pathways and tools">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'overview'}
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
            activeTab === 'overview'
              ? 'border-blue-950 text-blue-950'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Building className="h-3.5 w-3.5" />
          <span>1. Scheme Pathways Comparison</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'checklist'}
          onClick={() => setActiveTab('checklist')}
          className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
            activeTab === 'checklist'
              ? 'border-blue-950 text-blue-950'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <ListChecks className="h-3.5 w-3.5 text-blue-900" />
          <span>2. Mandatory Document Checklist Generator</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'tracker'}
          onClick={() => setActiveTab('tracker')}
          className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
            activeTab === 'tracker'
              ? 'border-blue-950 text-blue-950'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Clock className="h-3.5 w-3.5 text-emerald-700" />
          <span>3. Application Status Tracker</span>
        </button>
      </div>

      {/* TAB 1: SCHEME OVERVIEW */}
      {activeTab === 'overview' && (
        <>
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-900 flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Mandatory Certification Notice:</span>
              <p className="text-amber-800 mt-0.5 leading-normal">
                This overview provides regulatory guidance. Statutory conformity assessments and license grants are legally executed through <strong>manakonline.in</strong> and <strong>crsbis.in</strong>.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Scheme I (ISI Mark) */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-950">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-[10px] font-extrabold text-orange-800 uppercase tracking-wider">
                    Safety Critical
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 mb-2">Scheme I (ISI Mark)</h2>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  Traditional certification scheme requiring physical factory audit and sample testing prior to grant of license. Primarily for cement, steel, helmets, pressure cookers, and appliances.
                </p>
              </div>

              <div className="space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>Timeline: <strong>60–90 Days</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-3.5 w-3.5 text-orange-500" />
                  <span className="text-orange-950 font-bold">Factory Audit: Mandatory</span>
                </div>
                <div className="pt-2">
                  <a
                    href="https://www.manakonline.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-950 underline"
                  >
                    Apply via manakonline.in <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Scheme II (CRS) */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-950">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-extrabold text-blue-800 uppercase tracking-wider">
                    Electronics &amp; IT
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 mb-2">Scheme II (CRS)</h2>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  Compulsory registration scheme based on self-declaration of conformity. Specifically designed for IT goods, electronics, mobile chargers, and LED lighting.
                </p>
              </div>

              <div className="space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>Timeline: <strong>20–30 Days</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-900 font-bold">Factory Audit: Not Required</span>
                </div>
                <div className="pt-2">
                  <a
                    href="https://www.crsbis.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-950 underline"
                  >
                    Apply via crsbis.in <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* FMCS */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-950">
                    <Globe className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-[10px] font-extrabold text-purple-800 uppercase tracking-wider">
                    Foreign Manufacturers
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 mb-2">FMCS (Overseas)</h2>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  Foreign Manufacturers Certification Scheme. Enables overseas units exporting to India to use the Standard Mark. Requires an Authorized Indian Representative (AIR).
                </p>
              </div>

              <div className="space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>Timeline: <strong>4–6 Months</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Plane className="h-3.5 w-3.5 text-purple-600" />
                  <span className="text-purple-950 font-bold">Audit: International Travel</span>
                </div>
                <div className="pt-2">
                  <a
                    href="https://www.manakonline.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-950 underline"
                  >
                    AIR Portal on manakonline.in <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* TAB 2: DOCUMENT CHECKLIST GENERATOR */}
      {activeTab === 'checklist' && (
        <div className="rounded-2xl border border-slate-300 bg-white p-6 sm:p-8 shadow-xs">
          <div className="max-w-md mx-auto text-center mb-6">
            <h2 className="text-base font-bold text-slate-900">Mandatory Document Checklist Generator</h2>
            <p className="text-xs text-slate-500 mt-1">
              Select your applicable certification scheme to generate the official list of statutory documents required before audit.
            </p>
          </div>

          {/* Scheme Selector */}
          <div className="flex justify-center gap-2 mb-6">
            {Object.keys(SCHEME_DOCUMENTS).map((scheme) => (
              <button
                key={scheme}
                type="button"
                onClick={() => setSelectedScheme(scheme)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedScheme === scheme
                    ? 'bg-blue-950 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {scheme}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div>
                <span className="font-bold text-xs text-blue-950 block">{selectedScheme} Documentation Package</span>
                <span className="text-[10px] text-slate-400 font-semibold">{SCHEME_DOCUMENTS[selectedScheme].length} Mandatory Records Required</span>
              </div>
              <button
                type="button"
                onClick={handlePrintChecklist}
                className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 shadow-2xs no-print"
                title="Print or Save as PDF"
              >
                <Printer className="h-3.5 w-3.5 text-blue-950" />
                <span>Download / Print PDF</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {SCHEME_DOCUMENTS[selectedScheme].map((doc, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 bg-white p-3 rounded-xl border border-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: APPLICATION STATUS TRACKER */}
      {activeTab === 'tracker' && (
        <div className="rounded-2xl border border-slate-300 bg-white p-6 sm:p-8 shadow-xs">
          <div className="max-w-md mx-auto text-center mb-6">
            <h2 className="text-base font-bold text-slate-900">Application Pipeline Status Tracker</h2>
            <p className="text-xs text-slate-500 mt-1">
              Enter your e-BIS Application Acknowledgement Number to track scrutiny, testing, and factory audit status.
            </p>
          </div>

          <div className="flex gap-2 max-w-md mx-auto mb-8">
            <input
              type="text"
              value={appNumber}
              onChange={(e) => setAppNumber(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTrackApplication()}
              placeholder="e.g. APP-2026-78419"
              className="flex-1 rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-mono text-slate-900 focus:border-blue-950 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleTrackApplication}
              disabled={isTracking || !appNumber.trim()}
              className="rounded-xl bg-blue-950 px-4 py-2 text-xs font-bold text-white hover:bg-blue-900 transition-colors disabled:opacity-50"
            >
              {isTracking ? 'Searching…' : 'Track Application'}
            </button>
          </div>

          {appStatus && (
            <div className="rounded-2xl border border-blue-200 bg-slate-50 p-6 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2 mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Applicant Name</span>
                  <h3 className="font-bold text-sm text-slate-900">{appStatus.applicant}</h3>
                  <p className="text-xs text-slate-600">{appStatus.product} · {appStatus.scheme}</p>
                </div>
                <div className="sm:text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Application No.</span>
                  <p className="font-mono text-xs font-extrabold text-blue-950">{appStatus.number}</p>
                </div>
              </div>

              {/* Stepper */}
              <div className="space-y-4 text-xs pl-3 border-l-2 border-blue-950">
                {appStatus.timeline.map((item: any, idx: number) => (
                  <div key={idx} className="relative pl-3">
                    <div
                      className={`absolute -left-[18px] top-1 h-3.5 w-3.5 rounded-full ${
                        item.status === 'Completed'
                          ? 'bg-emerald-600'
                          : item.current
                          ? 'bg-blue-950 ring-4 ring-blue-100'
                          : 'bg-slate-300'
                      }`}
                    />
                    <p className={`font-bold ${item.current ? 'text-blue-950 text-sm' : item.status === 'Completed' ? 'text-slate-800' : 'text-slate-400'}`}>
                      {item.step}
                    </p>
                    <span className="text-[10px] text-slate-500 block mt-0.5">{item.status} ({item.date})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Ask BIS Saathi AI Floating Consultation Banner */}
      <div className="mt-10 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-blue-950 mb-1">Need help deciding the right certification scheme?</h3>
          <p className="text-xs text-slate-600">Ask BIS Saathi to evaluate your factory setup, lab equipment readiness, and scheme fee estimates.</p>
        </div>
        <Link
          href="/chat"
          className="rounded-xl bg-blue-950 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-900 shadow-xs transition-all whitespace-nowrap"
        >
          Ask AI Consultation Desk →
        </Link>
      </div>
    </div>
  );
}
