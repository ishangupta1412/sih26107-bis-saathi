'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import StateEmblem from '@/components/StateEmblem';
import Breadcrumb from '@/components/Breadcrumb';
import ContactBlock from '@/components/ContactBlock';
import {
  ArrowLeft,
  Lock,
  Link2,
  Copyright,
  FileCheck2,
  Asterisk,
  ShieldCheck,
  Accessibility,
  Phone,
} from 'lucide-react';

const POLICIES = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    icon: Lock,
    summary:
      'As a general rule, this portal does not collect Personal Information about you when you visit the site. You can generally visit the site without revealing Personal Information, unless you choose to provide such information.',
    body: (
      <div className="space-y-3">
        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Site Visit Data</h4>
        <p>
          This website records your visit and logs the following information for statistical and regulatory security purposes: your server address; the name of the top-level domain from which you access the Internet (for example, .gov, .com, .in, etc.); the type of browser you use; the date and time you access the site; the pages you have accessed and the documents downloaded; and the previous Internet address from which you linked directly to the site.
        </p>
        <p>
          We will not identify users or their browsing activities, except when a law enforcement agency may exercise a warrant to inspect the service provider’s logs under the Information Technology Act, 2000.
        </p>
      </div>
    ),
  },
  {
    id: 'accessibility',
    title: 'Accessibility Statement (IS 17802:2021)',
    icon: Accessibility,
    summary:
      'Bureau of Indian Standards is committed to ensuring that its portal is accessible to all users irrespective of device, technology, or ability. It is built to comply with Indian Standard IS 17802 and W3C WCAG 2.1 Level AA.',
    body: (
      <div className="space-y-3">
        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Compliance to Indian Standard IS 17802</h4>
        <p>
          This portal incorporates the accessibility requirements defined under <strong>IS 17802 (Part 1 &amp; Part 2): Accessibility for the ICT Products and Services</strong> published by the Bureau of Indian Standards and aligned with the Rights of Persons with Disabilities (RPwD) Act, 2016.
        </p>
        <ul className="list-disc pl-4 space-y-1">
          <li><strong>Keyboard Navigation:</strong> All links, dialogs, and controls are fully operable without a mouse.</li>
          <li><strong>Screen Reader Accessibility:</strong> Form fields feature explicit descriptive labels and ARIA semantics.</li>
          <li><strong>High Contrast &amp; Font Resizing:</strong> Integrated toolbars for text enlargement and theme contrast switching.</li>
          <li><strong>No Seizure Inducing Content:</strong> Zero elements flash more than three times per second.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'hyperlinking',
    title: 'Hyperlinking Policy',
    icon: Link2,
    summary:
      'Links to external websites/portals are provided for your convenience. The Ministry is not responsible for the contents and reliability of the linked websites and does not necessarily endorse the views expressed in them.',
    body: (
      <div className="space-y-3">
        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Links to External Portals</h4>
        <p>
          We cannot guarantee that these links will work all the time and we have no control over the availability of linked pages. Official applications must be verified through <strong>manakonline.in</strong> or <strong>crsbis.in</strong>.
        </p>
        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mt-4">Links to BIS Portal by Other Websites</h4>
        <p>
          Prior permission is required before hyperlinks are directed from any website to this Portal. Permission for the same, stating the nature of the content on the pages from where the link has to be given and the exact language of the hyperlink, should be obtained by sending a request to the designated Web Information Manager.
        </p>
      </div>
    ),
  },
  {
    id: 'copyright',
    title: 'Copyright Policy',
    icon: Copyright,
    summary:
      'Material featured on this site may be reproduced free of charge in any format or media without requiring specific permission. This is subject to the material being reproduced accurately and not being used in a derogatory manner or in a misleading context.',
    body: (
      <div className="space-y-3">
        <p>
          Where the material is being published or issued to others, the source must be prominently acknowledged. However, the permission to reproduce this material does not extend to any material on this site that is identified as being the copyright of a third party. Authorization to reproduce such material must be obtained from the copyright holders concerned.
        </p>
        <p>
          The Standard Marks (ISI Logo, CRS Registration Emblem, and Hallmark symbol) are protected statutory intellectual properties under the Bureau of Indian Standards Act, 2016. Unauthorized commercial affixation is punishable under law.
        </p>
      </div>
    ),
  },
  {
    id: 'terms',
    title: 'Terms & Conditions',
    icon: FileCheck2,
    summary:
      'This portal is designed, developed, and maintained for SIH26107 under the Ministry of Consumer Affairs, Food & Public Distribution, Government of India.',
    body: (
      <div className="space-y-3">
        <p>
          Though all efforts have been made to ensure the accuracy and currency of the content on this portal, the same should not be construed as a statement of law or used for any legal purposes. In case of any ambiguity or doubts, users are advised to verify/check with the Bureau of Indian Standards and/or other source(s), and to obtain appropriate professional advice.
        </p>
        <p>
          Under no circumstances will the Ministry or Bureau of Indian Standards be liable for any expense, loss or damage including, without limitation, indirect or consequential loss or damage, arising from use, or loss of use, of data.
        </p>
      </div>
    ),
  },
  {
    id: 'contingency',
    title: 'Contingency Management Plan',
    icon: Asterisk,
    summary:
      'The Portal has a comprehensive Contingency Management Plan in place to ensure business continuity and minimize the impact of any disruptions to the services provided.',
    body: (
      <div className="space-y-3">
        <p>
          High availability, continuous backup, automated disaster recovery procedures, and secure fallback cached mechanisms ensure that the AI RAG engine remains operational during peak regulatory traffic and network fluctuations.
        </p>
      </div>
    ),
  },
  {
    id: 'contact',
    title: 'Contact Us & Nodal Officers',
    icon: Phone,
    summary:
      'Official contact channels for the Bureau of Indian Standards, CMED Grievance Redressal, and regional branch office facilitation desks.',
    body: (
      <div className="space-y-4 pt-2">
        <ContactBlock variant="card" showDirections={true} />
      </div>
    ),
  },
];

export default function PoliciesPage() {
  const [activeTab, setActiveTab] = useState('privacy');

  useEffect(() => {
    document.title = 'Policies & Accessibility Statement (IS 17802) | BIS Saathi';
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && POLICIES.some((p) => p.id === hash)) {
        setActiveTab(hash);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 py-8 sm:py-12">
      {/* Back Link */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
        <span className="text-[11px] font-semibold text-slate-500">
          GIGW 3.0 Mandatory Framework Documents
        </span>
      </div>

      {/* Header with State Emblem */}
      <div className="flex items-center gap-4 pb-6 border-b border-slate-200 mb-8">
        <StateEmblem className="h-14 w-auto text-slate-900" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Portal Policies &amp; Statements
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Ministry of Consumer Affairs, Food &amp; Public Distribution, Government of India
          </p>
        </div>
      </div>

      {/* 2-Column Layout */}
      <div className="grid md:grid-cols-4 gap-8">
        {/* Left Contents Navigation Tabs */}
        <div className="md:col-span-1 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-3 mb-2">
            Contents
          </span>
          {POLICIES.map((p) => {
            const Icon = p.icon;
            const isActive = activeTab === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`flex w-full items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-bold text-left transition-all ${
                  isActive
                    ? 'bg-blue-100/70 text-blue-950 shadow-sm border border-blue-200'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-blue-950' : 'text-slate-400'}`} />
                <span>{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Right Policy Content Cards */}
        <div className="md:col-span-3 space-y-6">
          {POLICIES.map((policy) => {
            const Icon = policy.icon;
            return (
              <div
                key={policy.id}
                id={policy.id}
                className={`rounded-2xl border bg-white p-6 shadow-sm transition-all ${
                  activeTab === policy.id ? 'border-blue-950 ring-2 ring-blue-50' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="h-4 w-4 text-blue-950" />
                  <h2 className="text-base font-bold text-slate-900">{policy.title}</h2>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4 pb-4 border-b border-slate-100 font-medium">
                  {policy.summary}
                </p>

                <div className="text-xs text-slate-600 leading-relaxed">{policy.body}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
