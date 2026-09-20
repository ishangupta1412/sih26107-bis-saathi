'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application Error Boundary Caught:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 mb-4">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-extrabold text-slate-900 mb-2">
          Temporary Service Notice
        </h1>
        <p className="text-xs text-slate-600 mb-6 leading-relaxed">
          An unexpected issue occurred while rendering this page. Our automated diagnostic system has logged this incident.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-950 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-900 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
