import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BIS Nationwide Office Directory & Maps',
  description: 'Find all 35 Bureau of Indian Standards offices across India including National Headquarters, 5 Regional Offices, and 29 Branch Offices with phone, email, and directions.',
  alternates: {
    canonical: 'https://bis-saathi-nine.vercel.app/offices',
  },
  openGraph: {
    title: 'BIS Nationwide Office Directory & Maps | BIS Saathi',
    description: 'Find all 35 Bureau of Indian Standards offices across India including National Headquarters, 5 Regional Offices, and 29 Branch Offices with phone, email, and directions.',
    url: 'https://bis-saathi-nine.vercel.app/offices',
    type: 'website',
    locale: 'en_IN',
    siteName: 'BIS Saathi Portal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BIS Nationwide Office Directory & Maps | BIS Saathi',
    description: 'Find all 35 Bureau of Indian Standards offices across India including National Headquarters, 5 Regional Offices, and 29 Branch Offices with phone, email, and directions.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
