'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, Search, AlertTriangle, Home, Building2, BookOpen } from 'lucide-react';

const TABS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/chat', label: 'AI Desk', icon: MessageSquare },
  { href: '/standards', label: 'Standards', icon: BookOpen },
  { href: '/checker', label: 'Checker', icon: Search },
  { href: '/offices', label: 'Offices', icon: Building2 },
  { href: '/complaint', label: 'Grievance', icon: AlertTriangle },
];

export default function MobileTabBar() {
  const pathname = usePathname();

  // Suppress on /chat (chat has its own full mobile screen layout)
  if (pathname === '/chat') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 z-40 block lg:hidden w-full border-t border-slate-200 bg-white/95 backdrop-blur-md no-print">
      <div className="flex items-center justify-around py-1.5 px-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors ${
                isActive ? 'text-blue-950 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-blue-950 stroke-[2.4]' : 'text-slate-400'}`} />
              <span className="text-[9px] mt-0.5 font-semibold">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
