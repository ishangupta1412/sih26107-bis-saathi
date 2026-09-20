'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import ContactBlock from '@/components/ContactBlock';
import { BIS_OFFICES, getUniqueStates, formatPhoneForDialing, BisOffice } from '@/data/bisOffices';
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Navigation,
  Building2,
  Filter,
  ExternalLink,
  ShieldCheck,
  Globe2,
  X,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

const UNIQUE_STATES = getUniqueStates();

export default function OfficesDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedType, setSelectedType] = useState<'ALL' | 'HQ' | 'Regional' | 'Branch'>('ALL');

  useEffect(() => {
    document.title = 'BIS Directory: Branch & Regional Offices | BIS Saathi';
  }, []);

  const filteredOffices = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return BIS_OFFICES.filter((office) => {
      // Type Filter
      if (selectedType !== 'ALL' && office.type !== selectedType) {
        return false;
      }
      // State Filter
      if (selectedState !== 'ALL' && office.state !== selectedState) {
        return false;
      }
      // Search Query filter (matches name, city, state, address)
      if (!q) return true;
      return (
        office.name.toLowerCase().includes(q) ||
        office.city.toLowerCase().includes(q) ||
        office.state.toLowerCase().includes(q) ||
        office.address.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedState, selectedType]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedState('ALL');
    setSelectedType('ALL');
  };

  const counts = useMemo(() => {
    return {
      all: BIS_OFFICES.length,
      hq: BIS_OFFICES.filter((o) => o.type === 'HQ').length,
      regional: BIS_OFFICES.filter((o) => o.type === 'Regional').length,
      branch: BIS_OFFICES.filter((o) => o.type === 'Branch').length,
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Breadcrumb Navigation (GIGW 3.0 Requirement) */}
      <Breadcrumb
        items={[
          { label: 'Offices Directory' },
        ]}
      />

      {/* Hero Header */}
      <header className="border-b border-slate-200 bg-white py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-blue-950">
                <Building2 className="h-3.5 w-3.5 text-blue-900" aria-hidden="true" />
                <span>Nationwide Regulatory Presence</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                BIS Branch &amp; Regional Office Finder
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                Locate your nearest Bureau of Indian Standards (BIS) office for factory pre-audits, consumer grievance lodgement, sample submission, and hallmarking center verification across all Indian States &amp; UTs.
              </p>
            </div>

            {/* Quick Contact Badge */}
            <div className="flex-shrink-0 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-1.5 max-w-xs">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block">National Facilitation</span>
              <p className="font-bold text-slate-900 flex items-center gap-1.5">
                <PhoneCall className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                <span>Toll-Free Helpline:</span>
              </p>
              <a
                href="tel:+911800111206"
                aria-label="Call BIS toll-free helpline, 1800 11 1206"
                className="inline-block font-mono text-sm font-extrabold text-blue-950 hover:underline"
              >
                1800-11-1206
              </a>
              <p className="text-[10px] text-slate-500">9 AM – 6 PM, Mon–Sun</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 sm:px-8 pt-8 space-y-8">
        
        {/* Unified Contact Us Block */}
        <ContactBlock variant="card" showDirections={true} />

        {/* Search & Filter Controls */}
        <section aria-labelledby="filter-section-heading" className="rounded-3xl border border-slate-300 bg-white p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
            <h2 id="filter-section-heading" className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Filter className="h-4 w-4 text-blue-950" aria-hidden="true" />
              <span>Search &amp; Filter Offices</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Showing <strong>{filteredOffices.length}</strong> of <strong>{BIS_OFFICES.length}</strong> offices
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input with Explicit Label */}
            <div className="md:col-span-6 space-y-1.5">
              <label htmlFor="office-search" className="block text-xs font-bold text-slate-700">
                Search by Office Name, City or Address
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden="true" />
                <input
                  id="office-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Mumbai, Ghaziabad, Bengaluru, Salt Lake..."
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-9 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-blue-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-950/10 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                    aria-label="Clear search query"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* State Filter with Accessible Native Select */}
            <div className="md:col-span-6 space-y-1.5">
              <label htmlFor="state-select" className="block text-xs font-bold text-slate-700">
                Filter by State / Union Territory
              </label>
              <div className="relative">
                <select
                  id="state-select"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  aria-label="Filter by State or Union Territory"
                  className="w-full appearance-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:border-blue-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-950/10 transition-all cursor-pointer"
                >
                  <option value="ALL">All States &amp; UTs (All India)</option>
                  {UNIQUE_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">
                  ▼
                </div>
              </div>
            </div>

          </div>

          {/* Type Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-[11px] font-bold uppercase text-slate-400 mr-1">Office Tier:</span>
            {[
              { key: 'ALL', label: `All Offices (${counts.all})` },
              { key: 'HQ', label: `National HQ (${counts.hq})` },
              { key: 'Regional', label: `Regional Offices (${counts.regional})` },
              { key: 'Branch', label: `Branch Offices (${counts.branch})` },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedType(tab.key as any)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  selectedType === tab.key
                    ? 'bg-blue-950 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}

            {(searchQuery || selectedState !== 'ALL' || selectedType !== 'ALL') && (
              <button
                type="button"
                onClick={clearFilters}
                className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-800 hover:underline px-2 py-1"
              >
                <X className="h-3.5 w-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </section>

        {/* Results Section */}
        <section aria-labelledby="results-section-heading">
          <h2 id="results-section-heading" className="sr-only">
            Directory Results List
          </h2>

          {filteredOffices.length === 0 ? (
            /* Empty State */
            <div className="rounded-3xl border border-slate-300 bg-white p-12 text-center shadow-xs space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <MapPin className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                No BIS Office found for &quot;{searchQuery || selectedState}&quot;
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Try searching by state name (e.g. <em>Maharashtra, Gujarat, Tamil Nadu</em>), city name, or call our national facilitation centre at{' '}
                <a
                  href="tel:+911800111206"
                  aria-label="Call BIS toll-free helpline, 1800 11 1206"
                  className="font-bold text-blue-950 hover:underline"
                >
                  1800-11-1206
                </a>{' '}
                for regional jurisdictional assistance.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-xl bg-blue-950 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-900"
                >
                  Clear Filters &amp; View All 35 Offices
                </button>
              </div>
            </div>
          ) : (
            /* Office Cards Grid */
            <div
              role="list"
              aria-label="List of BIS Offices"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredOffices.map((office, idx) => {
                const dialUrl = formatPhoneForDialing(office.phone);
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`;

                return (
                  <article
                    key={idx}
                    role="listitem"
                    className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-xs hover:border-blue-950 hover:shadow-md transition-all group"
                  >
                    <div className="space-y-3">
                      {/* Badge & Location Pills */}
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide border ${
                            office.type === 'HQ'
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : office.type === 'Regional'
                              ? 'bg-blue-100 text-blue-900 border-blue-300'
                              : 'bg-emerald-50 text-emerald-900 border-emerald-200'
                          }`}
                        >
                          {office.type === 'HQ' ? 'National HQ' : `${office.type} Office`}
                        </span>

                        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          {office.city}, {office.state}
                        </span>
                      </div>

                      {/* Office Name */}
                      <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-950 transition-colors leading-snug">
                        {office.name}
                      </h3>

                      {/* Address */}
                      <div className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed pt-1">
                        <MapPin className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{office.address}</span>
                      </div>
                    </div>

                    {/* Contact Details & Actions */}
                    <div className="border-t border-slate-100 pt-3.5 mt-4 space-y-2 text-xs">
                      {/* Phone */}
                      {office.phone ? (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 text-[11px]">Phone:</span>
                          <a
                            href={dialUrl}
                            aria-label={`Call ${office.name}, ${office.phone}`}
                            className="font-mono font-bold text-blue-950 hover:underline flex items-center gap-1"
                          >
                            <Phone className="h-3 w-3 text-emerald-600" aria-hidden="true" />
                            <span>{office.phone}</span>
                          </a>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-slate-400 text-[11px]">
                          <span>Phone:</span>
                          <span>Contact via Regional Desk</span>
                        </div>
                      )}

                      {/* Email */}
                      {office.email && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 text-[11px]">Official Email:</span>
                          <a
                            href={`mailto:${office.email}`}
                            aria-label={`Send email to ${office.email}`}
                            className="font-mono font-bold text-blue-950 hover:underline truncate max-w-[180px]"
                            title={office.email}
                          >
                            {office.email}
                          </a>
                        </div>
                      )}

                      {/* Get Directions Link */}
                      <div className="pt-2">
                        <a
                          href={mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Get directions to ${office.name} on Google Maps`}
                          className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-800 hover:bg-blue-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-950 transition-all shadow-2xs"
                        >
                          <Navigation className="h-3.5 w-3.5 text-blue-900 group-hover:text-white" aria-hidden="true" />
                          <span>Get Directions on Google Maps</span>
                          <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
