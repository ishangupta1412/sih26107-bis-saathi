import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Consultation Desk & Regulatory Copilot',
  description: 'Interactive multimodal AI assistant for Indian Standards, technical QCO determination, in-house lab setup requirements, and statutory legal guidance.',
  alternates: {
    canonical: 'https://bis-saathi-nine.vercel.app/chat',
  },
  openGraph: {
    title: 'AI Consultation Desk & Regulatory Copilot | BIS Saathi',
    description: 'Interactive multimodal AI assistant for Indian Standards, technical QCO determination, in-house lab setup requirements, and statutory legal guidance.',
    url: 'https://bis-saathi-nine.vercel.app/chat',
    type: 'website',
    locale: 'en_IN',
    siteName: 'BIS Saathi Portal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Consultation Desk & Regulatory Copilot | BIS Saathi',
    description: 'Interactive multimodal AI assistant for Indian Standards, technical QCO determination, in-house lab setup requirements, and statutory legal guidance.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
