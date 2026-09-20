import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Official Website Policies & Compliance',
  description: 'Privacy Policy, Accessibility Statement (IS 17802:2021), Terms of Use, Copyright, Hyperlinking Policy, and Contingency Management.',
  alternates: {
    canonical: 'https://bis-saathi-nine.vercel.app/policies',
  },
  openGraph: {
    title: 'Official Website Policies & Compliance | BIS Saathi',
    description: 'Privacy Policy, Accessibility Statement (IS 17802:2021), Terms of Use, Copyright, Hyperlinking Policy, and Contingency Management.',
    url: 'https://bis-saathi-nine.vercel.app/policies',
    type: 'website',
    locale: 'en_IN',
    siteName: 'BIS Saathi Portal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Official Website Policies & Compliance | BIS Saathi',
    description: 'Privacy Policy, Accessibility Statement (IS 17802:2021), Terms of Use, Copyright, Hyperlinking Policy, and Contingency Management.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
