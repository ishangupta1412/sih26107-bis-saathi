'use client';

import { useEffect, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

// Global toast event bus
const listeners: Array<(toast: Toast) => void> = [];

export function showToast(toast: Omit<Toast, 'id'>) {
  const fullToast: Toast = { ...toast, id: Date.now().toString() };
  listeners.forEach(fn => fn(fullToast));
}

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const COLORS = {
  success: 'border-l-4 border-emerald-500 bg-white',
  error: 'border-l-4 border-red-500 bg-white',
  warning: 'border-l-4 border-amber-500 bg-white',
  info: 'border-l-4 border-blue-500 bg-white',
};

const ICON_COLORS = {
  success: 'text-emerald-600',
  error: 'text-red-600',
  warning: 'text-amber-600',
  info: 'text-blue-600',
};

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  useEffect(() => {
    const handler = (toast: Toast) => {
      setToasts(prev => [...prev.slice(-4), toast]); // max 5 toasts
      const duration = toast.duration ?? 4000;
      if (duration > 0) setTimeout(() => removeToast(toast.id), duration);
    };
    listeners.push(handler);
    return () => {
      const idx = listeners.indexOf(handler);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, [removeToast]);

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-6 right-4 sm:right-6 z-[9999] flex flex-col gap-2 w-[calc(100vw-2rem)] sm:w-80"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => {
        const Icon = ICONS[toast.type];
        return (
          <div
            key={toast.id}
            className={`toast-enter flex items-start gap-3 rounded-xl shadow-lg px-4 py-3 ${COLORS[toast.type]}`}
            role="alert"
          >
            <Icon className={`h-4 w-4 flex-shrink-0 mt-0.5 ${ICON_COLORS[toast.type]}`} aria-hidden="true" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900">{toast.title}</p>
              {toast.message && (
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{toast.message}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-slate-400 hover:text-slate-700 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
