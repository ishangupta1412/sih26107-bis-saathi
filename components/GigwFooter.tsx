import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function GigwFooter() {
  return (
    <footer className="w-full border-t border-slate-300 bg-slate-100 text-slate-700 py-8 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-6">
        {/* Mandatory GIGW 3.0 Policy Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-semibold text-slate-800 border-b border-slate-200 pb-5">
          <Link href="/policies" className="hover:text-blue-900 hover:underline transition-colors">
            Website Policies
          </Link>
          <span className="text-slate-400">|</span>
          <Link href="/policies#privacy" className="hover:text-blue-900 hover:underline transition-colors">
            Privacy Policy
          </Link>
          <span className="text-slate-400">|</span>
          <Link href="/policies#hyperlinking" className="hover:text-blue-900 hover:underline transition-colors">
            Hyperlinking Policy
          </Link>
          <span className="text-slate-400">|</span>
          <Link href="/policies#copyright" className="hover:text-blue-900 hover:underline transition-colors">
            Copyright Policy
          </Link>
          <span className="text-slate-400">|</span>
          <Link href="/policies#accessibility" className="hover:text-blue-900 hover:underline transition-colors">
            Accessibility Statement (IS 17802)
          </Link>
          <span className="text-slate-400">|</span>
          <Link href="/policies#terms" className="hover:text-blue-900 hover:underline transition-colors">
            Terms &amp; Conditions
          </Link>
          <span className="text-slate-400">|</span>
          <Link href="/policies#contingency" className="hover:text-blue-900 hover:underline transition-colors">
            Contingency Plan
          </Link>
          <span className="text-slate-400">|</span>
          <Link href="/offices" className="hover:text-blue-900 hover:underline transition-colors text-blue-950 font-bold">
            Contact Us &amp; Helplines
          </Link>
          <span className="text-slate-400">|</span>
          <Link href="/offices" className="hover:text-blue-900 hover:underline transition-colors">
            Directory of Offices
          </Link>
          <span className="text-slate-400">|</span>
          <a
            href="https://www.india.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-900 hover:underline inline-flex items-center gap-1 font-bold text-blue-950"
          >
            National Portal of India (india.gov.in) <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Ownership & Official Government Statement with IS 17802 citation */}
        <div className="text-center space-y-1.5 text-[11px] text-slate-600">
          <p className="font-bold text-slate-900 text-xs">
            Bureau of Indian Standards · Intelligent Assistant Portal
          </p>
          <p>
            Ministry of Consumer Affairs, Food &amp; Public Distribution, Government of India
          </p>
          <p className="text-[11px] text-slate-700 max-w-3xl mx-auto leading-relaxed pt-1">
            Engineered for SIH26107 adhering strictly to the Guidelines for Indian Government Websites (GIGW 3.0) and Indian Standard <strong>IS 17802:2021</strong> (W3C WCAG 2.1 Level AA Accessibility).
          </p>
        </div>
      </div>
    </footer>
  );
}
