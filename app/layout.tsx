import type { Metadata } from 'next';
import './globals.css';
import GigwHeader from '@/components/GigwHeader';
import GigwDisclaimer from '@/components/GigwDisclaimer';
import GigwFooter from '@/components/GigwFooter';
import MobileTabBar from '@/components/MobileTabBar';
import ToastContainer from '@/components/ToastContainer';

export const metadata: Metadata = {
  metadataBase: new URL('https://bis-saathi-nine.vercel.app'),
  title: {
    default: 'BIS Saathi — AI Intelligent Assistant (Bureau of Indian Standards)',
    template: '%s | BIS Saathi',
  },
  description:
    'Official AI-Powered Intelligent Assistant for Indian Standards (IS), BIS Certification Schemes (ISI Mark, CRS, FMCS), and Mark Authentication. Ministry of Consumer Affairs, Food & Public Distribution. SIH26107.',
  keywords: [
    'Bureau of Indian Standards',
    'BIS',
    'BIS Saathi',
    'ISI Mark',
    'Quality Control Orders',
    'QCO',
    'Indian Standards',
    'IS 4151',
    'IS 302',
    'Hallmarking',
    'HUID',
    'SIH 2026',
    'Smart India Hackathon',
  ],
  authors: [{ name: 'Bureau of Indian Standards AI Taskforce' }],
  creator: 'Ministry of Consumer Affairs, Food & Public Distribution',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://bis-saathi-nine.vercel.app',
    title: 'BIS Saathi — AI-Powered Intelligent Assistant for Indian Standards',
    description:
      'Grounded AI guidance on 350+ mandatory Quality Control Orders (QCOs), genuine ISI mark verification, and certification pathways.',
    siteName: 'BIS Saathi Portal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BIS Saathi — AI Assistant for Indian Standards',
    description:
      'Official AI prototype for Indian Standards, QCOs, and ISI Mark Verification. Ministry of Consumer Affairs.',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="text-base-mode">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-900 selection:text-white flex flex-col justify-between">
        <div id="main-content" className="w-full flex flex-col flex-1">
          <GigwHeader />
          <GigwDisclaimer />
          <main className="flex-1 w-full">{children}</main>
        </div>
        <GigwFooter />
        <MobileTabBar />
        <ToastContainer />
      </body>
    </html>
  );
}
