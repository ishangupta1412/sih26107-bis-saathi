'use client';

import { useState, useEffect, useRef } from 'react';
import { Globe, Sun, Moon, Monitor, Eye, Volume2, ChevronDown, Check } from 'lucide-react';

const ALL_LANGUAGES = [
  { code: 'en-IN', label: 'English', native: 'English' },
  { code: 'hi-IN', label: 'Hindi', native: 'हिन्दी' },
  { code: 'bn-IN', label: 'Bengali', native: 'বাংলা' },
  { code: 'te-IN', label: 'Telugu', native: 'తెలుగు' },
  { code: 'mr-IN', label: 'Marathi', native: 'मराठी' },
  { code: 'ta-IN', label: 'Tamil', native: 'தமிழ்' },
  { code: 'gu-IN', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn-IN', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml-IN', label: 'Malayalam', native: 'മലയാളം' },
  { code: 'or-IN', label: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'pa-IN', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'ur-IN', label: 'Urdu', native: 'اردو' },
  { code: 'as-IN', label: 'Assamese', native: 'অসমীয়া' },
  { code: 'mai-IN', label: 'Maithili', native: 'मैथिली' },
  { code: 'sa-IN', label: 'Sanskrit', native: 'संस्कृतम्' },
  { code: 'kok-IN', label: 'Konkani', native: 'कोंकणी' },
  { code: 'ne-IN', label: 'Nepali', native: 'नेपाली' },
  { code: 'mni-IN', label: 'Manipuri', native: 'মৈতৈলোন্' },
  { code: 'sat-IN', label: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ' },
  { code: 'bho-IN', label: 'Bhojpuri', native: 'भोजपुरी' },
  { code: 'raj-IN', label: 'Rajasthani', native: 'राजस्थानी' },
  { code: 'doi-IN', label: 'Dogri', native: 'डोगरी' },
];

export default function GigwHeader() {
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [contrast, setContrast] = useState<'normal' | 'high'>('normal');
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState<string>('en-IN');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isAccessMenuOpen, setIsAccessMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Restore preferences from localStorage on mount & listen for global language events
  useEffect(() => {
    const savedFont = (localStorage.getItem('bis_font') as 'sm' | 'base' | 'lg') || 'base';
    const savedDark = localStorage.getItem('bis_dark') === 'true';
    const savedContrast = localStorage.getItem('bis_contrast') === 'high';
    const savedLang = localStorage.getItem('bis_lang') || 'en-IN';

    setFontSize(savedFont);
    setDarkMode(savedDark);
    setContrast(savedContrast ? 'high' : 'normal');
    setLang(savedLang);

    document.documentElement.classList.remove('text-sm-mode', 'text-base-mode', 'text-lg-mode');
    document.documentElement.classList.add(`text-${savedFont}-mode`);
    if (savedDark) document.documentElement.classList.add('dark-mode');
    if (savedContrast) document.documentElement.classList.add('high-contrast-mode');

    // Listen for language changes from chat or other components
    const handleGlobalLang = (e: any) => {
      if (e.detail && typeof e.detail === 'string') {
        setLang(e.detail);
      }
    };
    window.addEventListener('bis_lang_changed', handleGlobalLang);

    // Close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsAccessMenuOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('bis_lang_changed', handleGlobalLang);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const changeFontSize = (size: 'sm' | 'base' | 'lg') => {
    setFontSize(size);
    localStorage.setItem('bis_font', size);
    document.documentElement.classList.remove('text-sm-mode', 'text-base-mode', 'text-lg-mode');
    document.documentElement.classList.add(`text-${size}-mode`);
  };

  const toggleContrast = () => {
    const next = contrast === 'normal' ? 'high' : 'normal';
    setContrast(next);
    localStorage.setItem('bis_contrast', next);
    if (next === 'high') {
      document.documentElement.classList.add('high-contrast-mode');
    } else {
      document.documentElement.classList.remove('high-contrast-mode');
    }
  };

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('bis_dark', String(next));
    if (next) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  };

  const handleLangChange = (l: string) => {
    setLang(l);
    localStorage.setItem('bis_lang', l);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('bis_lang_changed', { detail: l }));
    }
    setIsLangMenuOpen(false);
  };

  return (
    <header
      className="w-full border-b border-slate-200 bg-white/90 backdrop-blur-xs text-slate-700 text-xs py-1.5 px-4 sm:px-8 transition-colors relative z-50"
      role="banner"
      aria-label="National Portal Header & Accessibility"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">

        {/* Left: Official Government of India Indicator & Skip Link */}
        <div className="flex items-center gap-3">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:inline-block bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded shadow-md z-50"
          >
            Skip to Main Content
          </a>
          
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-600">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            <span className="hidden sm:inline">भारत सरकार | Government of India</span>
            <span className="sm:hidden font-bold">Govt. of India</span>
          </div>
        </div>

        {/* Right: Modern Compact Accessibility & Language Toolbar */}
        <div className="flex items-center gap-2 sm:gap-3" ref={menuRef}>

          {/* 🌐 22 Scheduled Indian Languages Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors"
              title="Select National Language (22 Scheduled Languages)"
              aria-label="Select Language"
              aria-expanded={isLangMenuOpen}
            >
              <Globe className="h-3.5 w-3.5 text-blue-900" aria-hidden="true" />
              <span>{ALL_LANGUAGES.find((l) => l.code === lang)?.native || 'English'}</span>
              <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-52 rounded-2xl border border-slate-200 bg-white shadow-xl z-50 text-slate-800 overflow-hidden"
                role="dialog"
                aria-label="Language Selector"
              >
                <div className="px-3 pt-2 pb-1 border-b border-slate-100">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    22 Scheduled Languages
                  </span>
                </div>
                <div className="max-h-72 overflow-y-auto py-1">
                  {ALL_LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => handleLangChange(l.code)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors hover:bg-slate-50 ${
                        lang === l.code
                          ? 'bg-blue-50 font-bold text-blue-950'
                          : 'text-slate-700 font-medium'
                      }`}
                    >
                      <span>{l.native}</span>
                      <span className="text-[10px] text-slate-400">{l.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Dark Mode Icon */}
          <button
            type="button"
            onClick={toggleDark}
            className="rounded-lg border border-slate-200 bg-slate-50 p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Dark Mode"
            aria-pressed={darkMode}
          >
            {darkMode ? <Sun className="h-3.5 w-3.5 text-amber-500" /> : <Moon className="h-3.5 w-3.5" />}
          </button>

          {/* Modern Accessibility Preferences Popover Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsAccessMenuOpen(!isAccessMenuOpen)}
              className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50/80 px-2.5 py-1 text-[11px] font-bold text-blue-950 hover:bg-blue-100 transition-colors"
              aria-expanded={isAccessMenuOpen}
              aria-label="Display and accessibility options"
            >
              <Eye className="h-3.5 w-3.5 text-blue-900" />
              <span className="hidden md:inline">Accessibility (IS 17802)</span>
              <span className="md:hidden font-bold">A11y</span>
              <ChevronDown className={`h-3 w-3 text-blue-900 transition-transform ${isAccessMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isAccessMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl z-50 text-slate-800 animate-in fade-in slide-in-from-top-2"
                role="dialog"
                aria-label="Accessibility Settings"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5 text-blue-950" /> Display Preferences
                  </span>
                  <span className="text-[9px] font-bold uppercase bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                    GIGW 3.0
                  </span>
                </div>

                {/* Font Resizing */}
                <div className="mb-3">
                  <span className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">
                    Text Scaling
                  </span>
                  <div className="grid grid-cols-3 gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
                    {(['sm', 'base', 'lg'] as const).map((s, i) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => changeFontSize(s)}
                        className={`py-1 rounded-lg text-xs font-extrabold transition-all ${
                          fontSize === s
                            ? 'bg-blue-950 text-white shadow-xs'
                            : 'text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {['A- (Small)', 'A (Normal)', 'A+ (Large)'][i]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* High Contrast Mode */}
                <div className="mb-2">
                  <span className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">
                    Theme Contrast (IS 17802:2021)
                  </span>
                  <button
                    type="button"
                    onClick={toggleContrast}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                      contrast === 'high'
                        ? 'bg-amber-100 border-amber-300 text-amber-950'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Monitor className="h-3.5 w-3.5" /> High Contrast
                    </span>
                    {contrast === 'high' && <Check className="h-3.5 w-3.5 text-amber-900" />}
                  </button>
                </div>

                {/* Screen Reader Notice */}
                <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 flex items-center gap-1.5">
                  <Volume2 className="h-3 w-3 text-slate-400" />
                  <span>Optimized for JAWS &amp; NVDA</span>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
