import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About BIS Saathi — Architecture, Team & SIH 2026',
  description: 'Learn about the architecture, multimodal AI pipeline, vector database grounding, GIGW 3.0 accessibility, and the team behind SIH26107.',
  alternates: {
    canonical: 'https://bis-saathi-nine.vercel.app/about',
  },
  openGraph: {
    title: 'About BIS Saathi — Architecture, Team & SIH 2026 | BIS Saathi',
    description: 'Learn about the architecture, multimodal AI pipeline, vector database grounding, GIGW 3.0 accessibility, and the team behind SIH26107.',
    url: 'https://bis-saathi-nine.vercel.app/about',
    type: 'website',
    locale: 'en_IN',
    siteName: 'BIS Saathi Portal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About BIS Saathi — Architecture, Team & SIH 2026 | BIS Saathi',
    description: 'Learn about the architecture, multimodal AI pipeline, vector database grounding, GIGW 3.0 accessibility, and the team behind SIH26107.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
