'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import StateEmblem from '@/components/StateEmblem';
import { Shield, MessageSquare, Compass, Search, AlertTriangle, Info, Building2, BookOpen } from 'lucide-react';

const NAV_LINKS = [
  { href: '/chat', label: 'AI Assistant', icon: MessageSquare },
  { href: '/standards', label: 'Standards', icon: BookOpen },
  { href: '/pathway', label: 'Pathways', icon: Compass },
  { href: '/checker', label: 'Mark Checker', icon: Search },
  { href: '/offices', label: 'Office Finder', icon: Building2 },
  { href: '/complaint', label: 'Grievance', icon: AlertTriangle },
  { href: '/about', label: 'About', icon: Info },
];

export default function Navbar() {
  const pathname = usePathname();

  // Suppress on /chat (chat has its own 3-column cockpit navigation)
  if (pathname === '/chat') {
    return null;
  }

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md no-print">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8 py-2.5">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <StateEmblem className="h-8 w-auto text-slate-900" />
          <div className="border-l border-slate-300 pl-2.5">
            <div className="flex items-center gap-1.5 font-extrabold text-sm text-blue-950 leading-tight">
              <span>BIS Saathi</span>
              <span className="rounded bg-blue-100 px-1.5 py-0.2 text-[9px] font-extrabold text-blue-950 uppercase tracking-wide">
                SIH26107
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-semibold">National Standards Assistant</p>
          </div>
        </Link>

        {/* Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-blue-950 text-white shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-blue-950'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-blue-200' : 'text-slate-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Status Pill & CTA */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>BIS AI Engine Online</span>
          </div>
          <Link
            href="/chat"
            className="rounded-lg bg-blue-950 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-blue-900 transition-colors shadow-2xs"
          >
            Enter AI Desk →
          </Link>
        </div>
      </div>
    </header>
  );
}
