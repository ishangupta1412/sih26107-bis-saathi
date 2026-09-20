import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Mark & Packaging Inspector',
  description: 'AI-powered multimodal vision verification for ISI Marks, CRS registration numbers (R-XXXXXXXX), and Gold Hallmarking 6-digit HUID laser codes.',
  alternates: {
    canonical: 'https://bis-saathi-nine.vercel.app/checker',
  },
  openGraph: {
    title: 'AI Mark & Packaging Inspector | BIS Saathi',
    description: 'AI-powered multimodal vision verification for ISI Marks, CRS registration numbers (R-XXXXXXXX), and Gold Hallmarking 6-digit HUID laser codes.',
    url: 'https://bis-saathi-nine.vercel.app/checker',
    type: 'website',
    locale: 'en_IN',
    siteName: 'BIS Saathi Portal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Mark & Packaging Inspector | BIS Saathi',
    description: 'AI-powered multimodal vision verification for ISI Marks, CRS registration numbers (R-XXXXXXXX), and Gold Hallmarking 6-digit HUID laser codes.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
