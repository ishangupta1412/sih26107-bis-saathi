import Link from 'next/link';
import StateEmblem from '@/components/StateEmblem';
import BISLogo from '@/components/BISLogo';
import { Home, Search, BookOpen, AlertTriangle, Building2, FlaskConical, Layers, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <div className="flex items-center justify-center gap-3 mb-6">
        <StateEmblem className="h-12 w-auto text-slate-900" />
        <div className="h-8 w-px bg-slate-300" />
        <BISLogo className="h-10 w-auto" />
      </div>

      <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 mb-4">
        <AlertTriangle className="h-3.5 w-3.5 text-amber-700" />
        <span>Error 404 — Page Not Found</span>
      </div>

      <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
        Document or Route Not Located
      </h1>
      <p className="text-sm text-slate-600 mb-8 leading-relaxed max-w-xl mx-auto">
        The Indian Standard, tool, or portal route you requested does not exist or has been relocated within the central BIS repository.
      </p>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-8 text-left">
        {[
          { href: '/standards', label: 'Standards Library', icon: BookOpen, desc: 'Search 350+ IS codes' },
          { href: '/checker', label: 'Mark Checker', icon: FlaskConical, desc: 'Verify CM/L & CRS' },
          { href: '/offices', label: 'Office Finder', icon: Building2, desc: '35 branch offices' },
          { href: '/pathway', label: 'Cert Pathways', icon: Layers, desc: 'Scheme I, II & FMCS' },
        ].map(({ href, label, icon: Icon, desc }) => (
          <Link
            key={href}
            href={href}
            className="rounded-xl border border-slate-200 bg-white p-3.5 hover:border-blue-900 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <Icon className="h-4 w-4 text-blue-950 mb-2" />
              <div className="text-xs font-bold text-slate-900">{label}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{desc}</div>
            </div>
            <div className="mt-2 text-[10px] font-bold text-blue-900 flex items-center gap-0.5">
              Open <ArrowRight className="h-2.5 w-2.5" />
            </div>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-950 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-900 shadow-2xs transition-colors"
        >
          <Home className="h-4 w-4" />
          <span>Return to Homepage</span>
        </Link>
        <Link
          href="/chat"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <Search className="h-4 w-4 text-slate-400" />
          <span>Consult AI Assistant</span>
        </Link>
      </div>
    </div>
  );
}

