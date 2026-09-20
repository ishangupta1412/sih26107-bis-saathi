'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 mb-4 flex-wrap"
    >
      <Link href="/" className="flex items-center gap-1 hover:text-blue-900 transition-colors">
        <Home className="h-3 w-3" />
        <span>Home</span>
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="h-3 w-3 text-slate-400" aria-hidden="true" />
          {item.href ? (
            <Link href={item.href} className="hover:text-blue-900 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-700 font-bold" aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
