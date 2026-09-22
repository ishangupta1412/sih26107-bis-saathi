'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import {
  ArrowLeft,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Loader2,
  Copy,
  Check,
  Building,
  Calendar,
  MapPin,
  FileCheck,
  Camera,
  Upload,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Eye,
  Smartphone,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface LicenseResult {
  found: boolean;
  formatValid: boolean;
  licenseType?: 'ISI' | 'CRS' | null;
  message?: string;
  officialLink?: string;
  license?: {
    license_number: string;
    holder_name: string;
    product_name: string;
    category: string;
    scheme_type: string;
    is_number: string;
    status: 'Active' | 'Suspended' | 'Expired' | 'Cancelled';
    valid_till: string;
    city: string;
    state: string;
  };
}

const SAMPLE_NUMBERS = [
  { number: 'CM/L-7654321', label: 'Helmets (ISI 7-Digit)', status: 'Active' },
  { number: 'CM/L-8400129384', label: 'Appliances (ISI 10-Digit Standard)', status: 'Active' },
  { number: 'CM/L-3391827', label: 'Helmets (ISI)', status: 'Suspended' },
  { number: 'R-41012345', label: 'LED Bulbs (CRS 8-Digit)', status: 'Active' },
  { number: 'R-41045678', label: 'Chargers (CRS)', status: 'Suspended' },
  { number: 'AZ78K2', label: 'Gold Jewellery (HUID 6-Digit)', status: 'Active' },
];

export default function CheckerPage() {
  const [activeTab, setActiveTab] = useState<'number' | 'photo' | 'guide'>('number');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<LicenseResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Photo Scan State
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  const [photoAnalysis, setPhotoAnalysis] = useState<string | null>(null);
  const [isAnalyzingPhoto, setIsAnalyzingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = 'AI Mark Checker & License Verification | BIS Saathi';
  }, []);

  const check = async (licenseNumber?: string) => {
    const number = (licenseNumber || input).trim();
    if (!number) return;

    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/license-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseNumber: number }),
      });
      const data: LicenseResult = await res.json();
      setResult(data);
    } catch {
      setResult({
        found: false,
        formatValid: false,
        message: 'System connectivity error. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyNumber = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Photo / QR Scan Handler
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setScannedImage(base64);
      setIsAnalyzingPhoto(true);
      setPhotoAnalysis(null);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message:
              'Perform an official BIS Mark & Packaging Authentication Inspection on this uploaded product image. Identify: 1. Is there an ISI Mark, CRS Logo, or Hallmark? 2. Is the Standard Number (IS Code) visible? 3. Is there a valid CM/L (7-10 digit) or R-Number (8 digit) or HUID (6 alphanumeric)? 4. Identify any visual counterfeiting flags or tampering.',
            role: 'consumer',
            file: { base64, mimeType: file.type || 'image/jpeg' },
          }),
        });

        const data = await res.json();
        setPhotoAnalysis(data.answer || 'Analysis complete.');
      } catch {
        setPhotoAnalysis(
          `### 📸 BIS Mark Inspection — Manual Verification Guide

The AI Vision scanner is temporarily in limited mode. Please verify your product manually using the checklist below:

---

#### ✅ Step 1: Check for ISI Mark (Mandatory Products)
Look for the **ISI logo** (3 interlocked arcs) printed or embossed on the product or packaging.
- Below the ISI logo → **IS XXXX** (Indian Standard number)
- Below the IS number → **CM/L-XXXXXXX** (7–10 digit license)

#### ✅ Step 2: Verify the CM/L or R-Number
- **ISI Products:** Switch to the **Number Lookup** tab and enter the CM/L number
- **Electronics/Chargers:** Look for the CRS symbol + R-XXXXXXXX number → check crsbis.in

#### ✅ Step 3: Gold Jewellery (HUID)
Look for the 6-character alphanumeric **HUID** laser engraved on the jewellery.
Enter it in the **Number Lookup** tab to verify.

#### 🚨 Signs of a Fake Product
- No IS code or license number visible
- Blurry, smudged, or handwritten marks
- No BIS Triangle (mandatory since 2023 for hallmarked gold)

---

> **Tip:** Use the official **BIS CARE App** for instant mark scanning using your phone camera.`
        );
      } finally {
        setIsAnalyzingPhoto(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-8 py-8 sm:py-12">
      <Breadcrumb items={[{ label: 'Mark & License Checker' }]} />

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Mark &amp; License Authentication Checker
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-600">
          Verify 7–10 digit ISI Mark (CM/L), CRS Registration (R-number), Gold HUID, or scan product packaging via AI Vision.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6 gap-2" role="tablist" aria-label="Mark verification methods">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'number'}
          onClick={() => setActiveTab('number')}
          className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
            activeTab === 'number'
              ? 'border-blue-950 text-blue-950'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Search className="h-3.5 w-3.5" />
          <span>Number Lookup</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'photo'}
          onClick={() => setActiveTab('photo')}
          className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
            activeTab === 'photo'
              ? 'border-blue-950 text-blue-950'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Camera className="h-3.5 w-3.5 text-blue-900" />
          <span>Photo / AI Mark Scanner</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'guide'}
          onClick={() => setActiveTab('guide')}
          className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
            activeTab === 'guide'
              ? 'border-blue-950 text-blue-950'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Eye className="h-3.5 w-3.5 text-emerald-700" />
          <span>Genuine vs Fake Guide</span>
        </button>
      </div>

      {/* TAB 1: NUMBER LOOKUP */}
      {activeTab === 'number' && (
        <>
          <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-xs mb-6">
            <div className="mb-2">
              <label htmlFor="license-input" className="block text-xs font-bold text-slate-800 mb-1">
                Enter License or Registration Number (7 to 10 Digits)
              </label>
              <span className="text-[11px] text-slate-500 block">
                Standard 10-digit format (e.g. <code>CM/L-8400129384</code>) and legacy 7-digit numbers are both accepted.
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" aria-hidden="true" />
                <input
                  id="license-input"
                  name="license-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && check()}
                  placeholder="e.g. CM/L-7654321 (ISI) or R-41012345 (CRS)"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-4 py-3 font-mono text-xs sm:text-sm text-slate-900 placeholder-slate-500 focus:border-blue-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
                  aria-label="Enter license number"
                />
              </div>
              <button
                type="button"
                onClick={() => check()}
                disabled={!input.trim() || isLoading}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-950 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-blue-900 disabled:opacity-40 transition-colors focus:ring-2 focus:ring-blue-900"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Search className="h-4 w-4" aria-hidden="true" />}
                <span>Validate Number</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 mb-4 flex items-center gap-1.5">
              <span>🔒 <em>Prototype demonstration: Validates against BIS regex standards and local mock registry. For legal statutory grant verification, use BIS CARE App.</em></span>
            </p>

            {/* Benchmark Chips */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Sample Benchmark Numbers:
              </span>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_NUMBERS.map((s) => (
                  <button
                    key={s.number}
                    type="button"
                    onClick={() => {
                      setInput(s.number);
                      check(s.number);
                    }}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700 hover:bg-blue-50 hover:border-blue-950 transition-colors"
                  >
                    <span className="font-mono font-bold text-blue-950">{s.number}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-[11px] text-slate-500">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Display */}
          {result && (
            <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-xs mb-6 animate-fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-2">
                  {result.found ? (
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="h-6 w-6 text-amber-600" />
                  )}
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      {result.found ? 'Valid BIS License Record' : 'Record Not in Demonstration Index'}
                    </h2>
                    <p className="text-[11px] text-slate-500 font-mono">{input}</p>
                  </div>
                </div>

                {result.license && (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-extrabold ${
                      result.license.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {result.license.status}
                  </span>
                )}
              </div>

              {result.license && (
                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 font-semibold block">Licensee Organization</span>
                    <strong className="text-slate-900 text-sm block mt-0.5">{result.license.holder_name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">Certified Product</span>
                    <strong className="text-slate-900 text-sm block mt-0.5">{result.license.product_name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">Indian Standard (IS)</span>
                    <span className="font-mono font-bold text-blue-950 block mt-0.5">{result.license.is_number}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">Validity Expiration</span>
                    <strong className="text-slate-900 block mt-0.5">{result.license.valid_till}</strong>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 font-semibold block">Manufacturing Location</span>
                    <span className="text-slate-700 block mt-0.5">{result.license.city}, {result.license.state}</span>
                  </div>
                </div>
              )}

              {result.message && !result.found && (
                <p className="text-xs text-slate-600 leading-relaxed">{result.message}</p>
              )}
            </div>
          )}
        </>
      )}

      {/* TAB 2: PHOTO / AI SCANNER */}
      {activeTab === 'photo' && (
        <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-xs mb-6">
          <div className="text-center max-w-md mx-auto mb-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-950 mb-3">
              <Camera className="h-6 w-6" />
            </div>
            <h2 className="text-base font-bold text-slate-900 mb-1">Multimodal Mark &amp; Label Scanner</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Upload a clear photo of any product mark, packaging box, rating label, or jewelry hallmark for automated inspection.
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />

          <div className="flex justify-center mb-6">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isAnalyzingPhoto}
              className="flex items-center gap-2 rounded-xl bg-blue-950 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-blue-900 disabled:opacity-50 transition-all"
            >
              {isAnalyzingPhoto ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              <span>Upload Photo / Capture Label</span>
            </button>
          </div>

          {scannedImage && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 mb-4 text-center">
              <img
                src={scannedImage}
                alt="Scanned product mark"
                className="max-h-60 rounded-lg mx-auto object-contain border border-slate-300 mb-3"
              />
              {isAnalyzingPhoto && (
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-blue-950">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>BIS AI Vision Engine inspecting geometry, typography, and license validity…</span>
                </div>
              )}
            </div>
          )}

          {photoAnalysis && (
            <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-5 prose prose-xs max-w-none text-slate-800">
              <div className="flex items-center gap-2 font-bold text-blue-950 mb-2 not-prose text-xs">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>AI Vision Inspection Diagnostic</span>
              </div>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-3 rounded-xl border border-slate-200 shadow-2xs">
                      <table className="min-w-full divide-y divide-slate-200 text-xs text-left" {...props} />
                    </div>
                  ),
                  thead: ({ node, ...props }) => (
                    <thead className="bg-slate-100/90 text-slate-900 font-extrabold uppercase text-[10px] tracking-wider" {...props} />
                  ),
                  tbody: ({ node, ...props }) => (
                    <tbody className="divide-y divide-slate-100 bg-white" {...props} />
                  ),
                  tr: ({ node, ...props }) => (
                    <tr className="hover:bg-blue-50/40 transition-colors" {...props} />
                  ),
                  th: ({ node, ...props }) => (
                    <th className="px-3 py-2 font-bold text-slate-800 border-r border-slate-200 last:border-r-0" {...props} />
                  ),
                  td: ({ node, ...props }) => (
                    <td className="px-3 py-2 text-slate-700 border-r border-slate-100 last:border-r-0 leading-relaxed" {...props} />
                  ),
                }}
              >
                {photoAnalysis}
              </ReactMarkdown>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: GENUINE VS FAKE GUIDE */}
      {activeTab === 'guide' && (
        <div className="space-y-6">
          {/* Guide 1: ISI */}
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" /> Domestic ISI Mark (Scheme I)
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
                <span className="font-bold text-emerald-950 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Genuine ISI Mark Structure
                </span>
                <ul className="space-y-1.5 text-slate-700 list-disc pl-4">
                  <li><strong>Standard Number on Top:</strong> e.g. <code>IS 4151</code> or <code>IS 302-1</code>.</li>
                  <li><strong>7 to 10 Digit License Below:</strong> <code>CM/L-XXXXXXX</code> or <code>CM/L-XXXXXXXXXX</code>.</li>
                  <li><strong>Geometry:</strong> Rectangular standard frame with clear inner loop.</li>
                </ul>
              </div>

              <div className="rounded-xl bg-rose-50 border border-rose-200 p-4">
                <span className="font-bold text-rose-900 flex items-center gap-1.5 mb-2">
                  <XCircle className="h-4 w-4 text-rose-700" /> Fake / Counterfeit Signs
                </span>
                <ul className="space-y-1.5 text-slate-700 list-disc pl-4">
                  <li><strong>Missing CM/L:</strong> Just "ISI" printed without any license number below.</li>
                  <li><strong>Fake Code:</strong> Generic phrases like "IS 100% Quality" instead of official IS code.</li>
                  <li><strong>Fuzzy Print:</strong> Distorted logo without manufacturer identification.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Guide 2: CRS */}
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-blue-900" /> Compulsory Registration Scheme (CRS)
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
                <span className="font-bold text-blue-950 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-900" /> Genuine CRS Format
                </span>
                <ul className="space-y-1.5 text-slate-700 list-disc pl-4">
                  <li>Self-declaration text: <code>Self Declaration - Conforming to IS...</code></li>
                  <li>8-digit Registration Number: <code>R-XXXXXXXX</code> (e.g. <code>R-41012345</code>).</li>
                  <li>Official dual-loop infinity link symbol.</li>
                </ul>
              </div>

              <div className="rounded-xl bg-rose-50 border border-rose-200 p-4">
                <span className="font-bold text-rose-900 flex items-center gap-1.5 mb-2">
                  <XCircle className="h-4 w-4 text-rose-700" /> Common CRS Counterfeits
                </span>
                <ul className="space-y-1.5 text-slate-700 list-disc pl-4">
                  <li>No <code>R-</code> number printed on mobile chargers or LED adapters.</li>
                  <li>Number starts with wrong prefix or fewer than 8 digits.</li>
                  <li>Unregistered brand name differing from the test laboratory report.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Guide 3: Hallmarking */}
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-amber-700" /> Gold Hallmarking (HUID System)
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                <span className="font-bold text-amber-950 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-700" /> Current 3-Symbol Hallmark
                </span>
                <ul className="space-y-1.5 text-slate-700 list-disc pl-4">
                  <li>1. <strong>BIS Triangular Emblem</strong></li>
                  <li>2. <strong>Purity Mark:</strong> <code>22K916</code> (91.6% pure) or <code>18K750</code> (75% pure).</li>
                  <li>3. <strong>6-digit Alphanumeric HUID:</strong> Laser-etched unique ID (e.g. <code>AB1234</code>).</li>
                </ul>
              </div>

              <div className="rounded-xl bg-rose-50 border border-rose-200 p-4">
                <span className="font-bold text-rose-900 flex items-center gap-1.5 mb-2">
                  <XCircle className="h-4 w-4 text-rose-700" /> Outdated / Fraudulent Hallmarks
                </span>
                <ul className="space-y-1.5 text-slate-700 list-disc pl-4">
                  <li>Old 4-mark system (discontinued and non-compliant for new sale).</li>
                  <li>Missing the 6-digit laser HUID code.</li>
                  <li>Jeweller stamp claiming "KDM 916" without BIS statutory mark.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Official App Callout */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <Smartphone className="h-5 w-5 text-blue-950 flex-shrink-0" />
          <span>For statutory verification, download the official <strong>BIS CARE Mobile App</strong>.</span>
        </div>
        <a
          href="https://play.google.com/store/apps/details?id=com.bis.bisapp"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-blue-950 px-3.5 py-1.5 font-bold text-white hover:bg-blue-900 flex items-center gap-1 flex-shrink-0"
        >
          <span>Google Play Store</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
