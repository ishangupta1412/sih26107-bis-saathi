import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Certification Pathways & Compliance Matrix',
  description: 'Step-by-step guidance for Scheme-I (ISI Mark), Scheme-II (CRS for electronics), and FMCS for foreign manufacturers with official portal links and document checklists.',
  alternates: {
    canonical: 'https://bis-saathi-nine.vercel.app/pathway',
  },
  openGraph: {
    title: 'Certification Pathways & Compliance Matrix | BIS Saathi',
    description: 'Step-by-step guidance for Scheme-I (ISI Mark), Scheme-II (CRS for electronics), and FMCS for foreign manufacturers with official portal links and document checklists.',
    url: 'https://bis-saathi-nine.vercel.app/pathway',
    type: 'website',
    locale: 'en_IN',
    siteName: 'BIS Saathi Portal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Certification Pathways & Compliance Matrix | BIS Saathi',
    description: 'Step-by-step guidance for Scheme-I (ISI Mark), Scheme-II (CRS for electronics), and FMCS for foreign manufacturers with official portal links and document checklists.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
