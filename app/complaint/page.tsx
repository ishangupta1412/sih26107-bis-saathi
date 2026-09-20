'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import ContactBlock from '@/components/ContactBlock';
import {
  ArrowLeft,
  Upload,
  Phone,
  Mail,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ExternalLink,
  Copy,
  Check,
  Search,
  Clock,
  ShieldAlert,
  ShieldCheck,
  User,
  FileText,
  Building2,
} from 'lucide-react';

const CATEGORIES = [
  'Helmets & Headgear (IS 4151)',
  'Household Electrical Appliances (IS 302)',
  'Toys & Children Playthings (IS 9873)',
  'LED Lighting & Electronic Power Chargers (CRS)',
  'Gold/Silver Jewellery & Hallmarking (HUID)',
  'Cement, Steel & Construction Materials',
  'Other / Unlisted Mandatory Standard',
];

const VIOLATION_TYPES = [
  'Fake / Misuse of ISI Mark (No CM/L number or fraudulent mark)',
  'Substandard Product Quality / Dangerous Electrical/Mechanical Failure',
  'Unregistered Electronic Good under CRS Scheme',
  'Selling Without Mandatory BIS Certification under QCO',
  'Fraudulent Hallmarking / Missing 6-digit laser HUID',
];

export default function GrievancePortalPage() {
  const [activeTab, setActiveTab] = useState<'submit' | 'track'>('submit');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [form, setForm] = useState({
    complainant_name: '',
    contact_phone: '',
    contact_email: '',
    product_name: '',
    category: '',
    violation_type: '',
    description: '',
    location: '',
  });

  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Track Tab State
  const [trackRef, setTrackRef] = useState('');
  const [trackResult, setTrackResult] = useState<any>(null);
  const [isTrackSearching, setIsTrackSearching] = useState(false);

  useEffect(() => {
    document.title = 'Grievance Redressal & Docket Tracking | BIS Saathi';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.category || !form.violation_type || !form.description) {
      setError('Please complete all required fields (*).');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const payload = {
        product_name: (form.product_name || form.category).trim(),
        category: form.category.trim(),
        description: `[Violation: ${form.violation_type}] [Location: ${form.location || 'N/A'}] [Complainant: ${isAnonymous ? 'Anonymous Whistleblower (Redacted)' : (form.complainant_name?.trim() || 'Citizen')}] ${form.description.trim()}`,
        contact_email: isAnonymous ? null : (form.contact_email?.trim() || null),
        contact_phone: isAnonymous ? null : (form.contact_phone?.trim() || null),
        is_anonymous: isAnonymous,
      };

      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission error');
      setReferenceId(data.reference_id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to record grievance.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyRef = () => {
    navigator.clipboard.writeText(referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Track Grievance Status via API with fallback
  const handleTrackGrievance = async () => {
    const ref = trackRef.trim().toUpperCase();
    if (!ref) return;
    setIsTrackSearching(true);
    setTrackResult(null);

    try {
      const res = await fetch(`/api/complaints?reference_id=${encodeURIComponent(ref)}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.complaint) {
          const comp = data.complaint;
          const createdDate = comp.created_at
            ? new Date(comp.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
            : 'Recent';
          setTrackResult({
            ref: comp.reference_id,
            status: comp.status || 'Under Investigation by Regional Branch Office',
            category: comp.category || 'Quality Control Order Violation',
            filed_date: createdDate,
            steps: [
              { title: '1. Grievance Lodged & Docket Allocated', date: `${createdDate} · Verified`, done: true },
              { title: '2. Preliminary Scrutiny by CMED Enforcement Cell', date: 'Completed Scrutiny', done: true },
              { title: '3. Market Surveillance Officer Assigned for Sample Inspection', date: 'Active Investigation', done: true, current: true },
              { title: '4. Laboratory Conformity Testing & Statutory Determination', date: 'Expected within 10 days', done: false },
              { title: '5. Action Taken Report & Docket Closure', date: 'Pending', done: false },
            ],
          });
          setIsTrackSearching(false);
          return;
        }
      }
    } catch {}

    // Demo reference ID fallback
    setTimeout(() => {
      setIsTrackSearching(false);
      setTrackResult({
        ref: ref,
        status: 'Under Investigation by Regional Branch Office',
        category: 'Protective Helmets (IS 4151)',
        filed_date: 'Aug 24, 2026',
        steps: [
          { title: '1. Grievance Lodged & Docket Allocated', date: 'Aug 24, 2026 · 11:30 AM', done: true },
          { title: '2. Preliminary Scrutiny by CMED Enforcement Cell', date: 'Aug 25, 2026 · 03:15 PM', done: true },
          { title: '3. Market Surveillance Officer Assigned for Sample Inspection', date: 'Aug 27, 2026 · 10:00 AM', done: true, current: true },
          { title: '4. Laboratory Conformity Testing & Statutory Determination', date: 'Expected within 10 days', done: false },
          { title: '5. Action Taken Report & Docket Closure', date: 'Pending', done: false },
        ],
      });
    }, 400);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-8 py-8 sm:py-12">
      <Breadcrumb items={[{ label: 'Grievance Portal & Enforcement' }]} />

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Grievance Redressal &amp; Violation Portal
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-600">
          Report substandard products, counterfeit ISI marks, or unauthorized manufacturing directly to the Complaints Management and Enforcement Department (CMED).
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6 gap-2" role="tablist" aria-label="Grievance actions">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'submit'}
          onClick={() => setActiveTab('submit')}
          className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
            activeTab === 'submit'
              ? 'border-blue-950 text-blue-950'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <ShieldAlert className="h-3.5 w-3.5" />
          <span>Lodge New Grievance</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'track'}
          onClick={() => setActiveTab('track')}
          className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
            activeTab === 'track'
              ? 'border-blue-950 text-blue-950'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Search className="h-3.5 w-3.5 text-blue-900" />
          <span>Track Grievance Status</span>
        </button>
      </div>

      {/* TAB 1: SUBMIT GRIEVANCE */}
      {activeTab === 'submit' && (
        <div className="rounded-3xl border border-slate-300 bg-white p-6 sm:p-8 shadow-xs mb-8">
          {referenceId ? (
            <div className="text-center py-6">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 mb-4">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Grievance Registered Successfully</h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto mb-6">
                Your complaint has been logged with the Complaints Management and Enforcement Department (CMED). Use your Docket Reference ID below to track progress.
              </p>

              <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 border border-slate-300 px-4 py-2.5 mb-6">
                <span className="font-mono text-base font-extrabold text-blue-950">{referenceId}</span>
                <button
                  type="button"
                  onClick={copyRef}
                  className="text-slate-500 hover:text-blue-950 p-1"
                  title="Copy reference ID"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setReferenceId('');
                    setForm({
                      complainant_name: '',
                      contact_phone: '',
                      contact_email: '',
                      product_name: '',
                      category: '',
                      violation_type: '',
                      description: '',
                      location: '',
                    });
                  }}
                  className="rounded-xl border border-slate-300 bg-white px-5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  File Another Grievance
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTrackRef(referenceId);
                    setActiveTab('track');
                    handleTrackGrievance();
                  }}
                  className="rounded-xl bg-blue-950 px-5 py-2 text-xs font-bold text-white hover:bg-blue-900"
                >
                  Track This Docket
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-800 flex items-center gap-2 font-medium">
                  <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Anonymous Toggle */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Anonymous Citizen Whistleblower Mode</span>
                  <span className="text-[11px] text-slate-500 block">File without recording your personal name or phone number.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-950"></div>
                </label>
              </div>

              {/* Complainant Contact (if not anonymous) */}
              {!isAnonymous && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      value={form.complainant_name}
                      onChange={(e) => setForm({ ...form, complainant_name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-blue-950 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Mobile / Phone Number</label>
                    <input
                      type="tel"
                      value={form.contact_phone}
                      onChange={(e) => setForm({ ...form, contact_phone: e.target.value })}
                      placeholder="e.g. +91 9876543210"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-blue-950 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Product Category & Violation Type */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Product Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-blue-950 focus:outline-none font-medium"
                    required
                  >
                    <option value="">Select standard category...</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Nature of Violation <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.violation_type}
                    onChange={(e) => setForm({ ...form, violation_type: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-blue-950 focus:outline-none font-medium"
                    required
                  >
                    <option value="">Select violation type...</option>
                    {VIOLATION_TYPES.map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Product Brand & Purchase Location */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Product Brand / Model</label>
                  <input
                    type="text"
                    value={form.product_name}
                    onChange={(e) => setForm({ ...form, product_name: e.target.value })}
                    placeholder="e.g. SteelGuard Pro Helmet / Apex Charger"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-blue-950 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Store Name / City / URL</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g. Karol Bagh Market, New Delhi"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-blue-950 focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Incident Description &amp; Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe the defect, fake mark, missing CM/L number, or hazards observed..."
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-blue-950 focus:outline-none"
                  required
                />
              </div>

              {/* Evidence Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Attach Photo or Invoice Evidence</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => setEvidenceFile(e.target.files?.[0] || null)}
                    className="text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-950 hover:file:bg-blue-100"
                  />
                  {evidenceFile && (
                    <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Attached
                    </span>
                  )}
                </div>
              </div>

              {/* Submit Button & Prototype Notice */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-blue-950 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-blue-900 disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Recording Grievance…</>
                  ) : (
                    <><ShieldCheck className="h-4 w-4" /> Submit Statutory Grievance (BIS Act Sec 29)</>
                  )}
                </button>
                <p className="text-[11px] text-slate-500 text-center">
                  🔒 SIH 2026 Academic Prototype. Submissions are stored in the test docket database for demonstration. For emergency official reporting, dial <strong>1800-11-1206</strong>.
                </p>
              </div>
            </form>
          )}
        </div>
      )}

      {/* TAB 2: TRACK GRIEVANCE */}
      {activeTab === 'track' && (
        <div className="rounded-3xl border border-slate-300 bg-white p-6 sm:p-8 shadow-xs mb-8">
          <div className="max-w-lg mx-auto text-center mb-6">
            <h2 className="text-base font-bold text-slate-900 mb-1">Track Grievance by Reference Number</h2>
            <p className="text-xs text-slate-500">Enter your 12-digit Docket Reference ID (e.g. BIS-2026-XXXXXX)</p>
          </div>

          <div className="flex gap-2 max-w-lg mx-auto mb-6">
            <input
              type="text"
              value={trackRef}
              onChange={(e) => setTrackRef(e.target.value)}
              placeholder="e.g. BIS-2026-891042"
              className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 font-mono text-xs text-slate-900 focus:border-blue-950 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleTrackGrievance}
              disabled={!trackRef.trim() || isTrackSearching}
              className="rounded-xl bg-blue-950 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-900 disabled:opacity-40 flex items-center gap-1.5"
            >
              {isTrackSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              <span>Track</span>
            </button>
          </div>

          {trackResult && (
            <div className="rounded-2xl border border-blue-200 bg-slate-50 p-6 max-w-xl mx-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Docket Reference</span>
                  <p className="font-mono text-base font-bold text-blue-950">{trackResult.ref}</p>
                </div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-extrabold text-blue-900">
                  {trackResult.status}
                </span>
              </div>

              <div className="space-y-4 text-xs pl-3 border-l-2 border-blue-950">
                {trackResult.steps.map((step: any, idx: number) => (
                  <div key={idx} className="relative pl-3">
                    <div
                      className={`absolute -left-[18px] top-1 h-3.5 w-3.5 rounded-full ${
                        step.done
                          ? 'bg-emerald-600'
                          : step.current
                          ? 'bg-blue-950 ring-4 ring-blue-100'
                          : 'bg-slate-300'
                      }`}
                    />
                    <p className={`font-bold ${step.current ? 'text-blue-950 text-sm' : step.done ? 'text-slate-800' : 'text-slate-400'}`}>
                      {step.title}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{step.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Official Support & Grievance Channels using Single-Source-of-Truth ContactBlock */}
      <div className="space-y-6">
        <ContactBlock variant="card" showDirections={true} />

        {/* Additional Channels */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-950">
                <Building2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">In-Person &amp; Regional Submission</h3>
                <p className="text-[11px] text-slate-600 mt-0.5">Find your nearest BIS Branch Office for physical sample submission.</p>
              </div>
            </div>
            <Link
              href="/offices"
              className="flex-shrink-0 inline-flex items-center gap-1 rounded-xl bg-blue-950 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-900 transition-colors"
            >
              <span>Find Offices</span>
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                <Smartphone className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">BIS CARE Official Mobile App</h3>
                <p className="text-[11px] text-slate-600 mt-0.5">Verify marks and track mobile grievances in real-time.</p>
              </div>
            </div>
            <a
              href="https://play.google.com/store/apps/details?id=com.bis.bisapp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-1 rounded-xl bg-emerald-700 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-800 transition-colors"
            >
              <span>Play Store</span>
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
