import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ShieldCheck, ExternalLink, Headphones } from 'lucide-react';

interface ContactBlockProps {
  variant?: 'card' | 'banner' | 'compact';
  showDirections?: boolean;
}

export default function ContactBlock({ variant = 'card', showDirections = true }: ContactBlockProps) {
  if (variant === 'compact') {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs shadow-xs">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
              <Phone className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <p className="font-bold text-slate-900">BIS National Helpline</p>
              <p className="text-[11px] text-slate-500">9 AM – 6 PM, Mon–Sun (Excl. Gazetted Holidays)</p>
            </div>
          </div>
          <div className="text-right">
            <a
              href="tel:+911800111206"
              aria-label="Call BIS toll-free helpline, 1800 11 1206"
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 font-bold text-white shadow-xs hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              <span>1800-11-1206</span>
            </a>
            <span className="block text-[10px] text-slate-400 mt-0.5">Toll-Free National Access</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section aria-labelledby="contact-us-heading" className="rounded-3xl border border-slate-300 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-blue-950 mb-2">
            <Headphones className="h-3.5 w-3.5 text-blue-900" aria-hidden="true" />
            <span>Official Facilitation &amp; Consumer Assistance</span>
          </div>
          <h2 id="contact-us-heading" className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            Contact Bureau of Indian Standards (BIS)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Direct statutory grievance redressal, standards enquiry desk, and manufacturer conformity facilitation.
          </p>
        </div>

        {/* Primary Click-to-Call Helpline CTA */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-2 bg-slate-50 border border-slate-200 p-4 rounded-2xl">
          <div className="text-left sm:text-right">
            <span className="text-[11px] font-extrabold uppercase tracking-wide text-slate-500 block">
              National Toll-Free Helpline
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <Clock className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
              <span>9 AM – 6 PM, all days except national holidays</span>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end">
            <a
              href="tel:+911800111206"
              aria-label="Call BIS toll-free helpline, 1800 11 1206"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-950 px-5 py-2.5 text-sm font-extrabold text-white shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 transition-all group"
            >
              <Phone className="h-4 w-4 text-amber-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span>1800-11-1206</span>
            </a>
            <span className="text-[10px] text-slate-400 mt-1 font-semibold">
              Tap to dial or call 1800-11-1206
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-xs">
        {/* HQ Address */}
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <MapPin className="h-4 w-4 text-blue-950" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-xs">National Headquarters</h3>
            <p className="text-slate-600 mt-0.5 leading-relaxed">
              Bureau of Indian Standards, 9 Bahadur Shah Zafar Marg, New Delhi-110002
            </p>
            {showDirections && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Bureau of Indian Standards, 9 Bahadur Shah Zafar Marg, New Delhi-110002")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-blue-950 hover:underline mt-1.5 text-[11px]"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        {/* CMED Grievance Redressal */}
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <Mail className="h-4 w-4 text-blue-950" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-xs">CMED Grievance Email</h3>
            <p className="text-slate-600 mt-0.5 leading-relaxed">
              Central Monitoring &amp; Enforcement Department (CMED)
            </p>
            <a
              href="mailto:complaints@bis.gov.in"
              className="inline-flex items-center gap-1 font-mono font-bold text-blue-950 hover:underline mt-1.5 text-xs"
            >
              complaints@bis.gov.in
            </a>
          </div>
        </div>

        {/* Regional & Branch Directory Link */}
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-xs">Nearby Branch Offices</h3>
            <p className="text-slate-600 mt-0.5 leading-relaxed">
              5 Regional Offices &amp; 29 Branch Offices across all Indian States &amp; UTs.
            </p>
            <Link
              href="/offices"
              className="inline-flex items-center gap-1 font-extrabold text-blue-950 hover:underline mt-1.5 text-xs"
            >
              <span>Explore Office Directory</span>
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
