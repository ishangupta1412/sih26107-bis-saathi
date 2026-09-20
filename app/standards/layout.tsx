import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Standards Library & QCO Directory',
  description: 'Search 350+ mandatory Quality Control Orders (QCOs), Indian Standards (IS Codes), certification schemes (ISI, CRS), and laboratory testing lead times.',
  alternates: {
    canonical: 'https://bis-saathi-nine.vercel.app/standards',
  },
  openGraph: {
    title: 'Standards Library & QCO Directory | BIS Saathi',
    description: 'Search 350+ mandatory Quality Control Orders (QCOs), Indian Standards (IS Codes), certification schemes (ISI, CRS), and laboratory testing lead times.',
    url: 'https://bis-saathi-nine.vercel.app/standards',
    type: 'website',
    locale: 'en_IN',
    siteName: 'BIS Saathi Portal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Standards Library & QCO Directory | BIS Saathi',
    description: 'Search 350+ mandatory Quality Control Orders (QCOs), Indian Standards (IS Codes), certification schemes (ISI, CRS), and laboratory testing lead times.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
