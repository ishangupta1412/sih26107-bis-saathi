'use client';

import { usePathname } from 'next/navigation';
import { Info } from 'lucide-react';

export default function GigwDisclaimer() {
  const pathname = usePathname();

  // Keep chat workspace clean & maximum height
  if (pathname === '/chat') {
    return null;
  }

  return (
    <div className="w-full border-b border-blue-100 bg-blue-50/60 px-4 py-1.5 text-[11px] text-blue-900 font-medium">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-md bg-blue-100 px-1.5 py-0.5 text-[10px] font-extrabold text-blue-950 uppercase tracking-wide">
            SIH26107 Prototype
          </span>
          <span className="text-slate-600">
            Intelligent assistant prototype for technical guidance. For statutory license grants, refer to <strong className="text-blue-950">manakonline.in</strong>.
          </span>
        </div>
        <a
          href="https://www.bis.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center text-blue-900 hover:text-blue-950 font-bold hover:underline"
        >
          Official BIS Portal &rarr;
        </a>
      </div>
    </div>
  );
}
