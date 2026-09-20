import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Statutory Grievance Redressal & Whistleblower Portal',
  description: 'File consumer complaints on fake ISI marks, sub-standard products, and hallmarking violations with live tracking and anonymous whistleblower protection.',
  alternates: {
    canonical: 'https://bis-saathi-nine.vercel.app/complaint',
  },
  openGraph: {
    title: 'Statutory Grievance Redressal & Whistleblower Portal | BIS Saathi',
    description: 'File consumer complaints on fake ISI marks, sub-standard products, and hallmarking violations with live tracking and anonymous whistleblower protection.',
    url: 'https://bis-saathi-nine.vercel.app/complaint',
    type: 'website',
    locale: 'en_IN',
    siteName: 'BIS Saathi Portal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Statutory Grievance Redressal & Whistleblower Portal | BIS Saathi',
    description: 'File consumer complaints on fake ISI marks, sub-standard products, and hallmarking violations with live tracking and anonymous whistleblower protection.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
