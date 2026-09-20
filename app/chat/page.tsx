'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BISLogo from '@/components/BISLogo';
import StateEmblem from '@/components/StateEmblem';
import SourceChip from '@/components/SourceChip';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  FileCheck,
  User,
  Search,
  Send,
  Paperclip,
  Mic,
  MicOff,
  Loader2,
  CheckCircle2,
  ExternalLink,
  Upload,
  AlertTriangle,
  ChevronRight,
  FileText,
  X,
  Volume2,
  Download,
  BookOpen,
  Plus,
  MessageSquare,
  Trash2,
  Sparkles,
  Camera,
  Building2,
  Users,
  Copy,
  Check,
  Zap,
  Brain,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: { is_number: string; title: string; category: string }[];
  attachment?: {
    name: string;
    type: string;
    url?: string;
  };
}

interface ChatSession {
  id: string;
  title: string;
  role: 'manufacturer' | 'consumer';
  createdAt: string;
  messages: Message[];
}

// All 22 Scheduled Indian Languages + Hinglish
const INDIAN_LANGUAGES = [
  { code: 'en-IN', label: 'English (India)', native: 'English', flag: '🇮🇳' },
  { code: 'hi-IN', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn-IN', label: 'Bengali', native: 'বাংলা', flag: '🇮🇳' },
  { code: 'te-IN', label: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr-IN', label: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
  { code: 'ta-IN', label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'gu-IN', label: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn-IN', label: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml-IN', label: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
  { code: 'or-IN', label: 'Odia', native: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'pa-IN', label: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'ur-IN', label: 'Urdu', native: 'اردو', flag: '🇮🇳' },
  { code: 'as-IN', label: 'Assamese', native: 'অসমীয়া', flag: '🇮🇳' },
  { code: 'mai-IN', label: 'Maithili', native: 'मैथिली', flag: '🇮🇳' },
  { code: 'sa-IN', label: 'Sanskrit', native: 'संस्कृतम्', flag: '🇮🇳' },
  { code: 'kok-IN', label: 'Konkani', native: 'कोंकणी', flag: '🇮🇳' },
  { code: 'ne-IN', label: 'Nepali', native: 'नेपाली', flag: '🇮🇳' },
  { code: 'mni-IN', label: 'Manipuri', native: 'মৈতৈলোন্', flag: '🇮🇳' },
  { code: 'sat-IN', label: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ', flag: '🇮🇳' },
  { code: 'bho-IN', label: 'Bhojpuri', native: 'भोजपुरी', flag: '🇮🇳' },
  { code: 'raj-IN', label: 'Rajasthani', native: 'राजस्थानी', flag: '🇮🇳' },
  { code: 'doi-IN', label: 'Dogri', native: 'डोगरी', flag: '🇮🇳' },
] as const;

type IndianLangCode = typeof INDIAN_LANGUAGES[number]['code'];

interface LicenseCheckResult {
  found: boolean;
  status: string;
  holder_name: string;
  product_name: string;
  is_number: string;
  valid_till: string;
}

// Web API type shim for SpeechRecognition (not in standard TS lib)
interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionEvent {
  results: { [index: number]: { [index: number]: { transcript: string } } };
}

export default function ChatWorkspacePage() {
  const router = useRouter();
  const [role, setRole] = useState<'manufacturer' | 'consumer'>('consumer');
  const [analysisMode, setAnalysisMode] = useState<'quick' | 'deep'>('quick');
  const [selectedLang, setSelectedLang] = useState<IndianLangCode>('en-IN');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  // Attachment state
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    mimeType: string;
    base64: string;
    previewUrl?: string;
  } | null>(null);

  // Live Right-side Widget State for Consumer
  const [licenseInput, setLicenseInput] = useState('CM/L-7654321');
  const [licenseResult, setLicenseResult] = useState<LicenseCheckResult>({
    found: true,
    status: 'Valid License',
    holder_name: 'Bharat Safety Products Pvt Ltd',
    product_name: 'Two-Wheeler Protective Helmet',
    is_number: 'IS 4151:2015',
    valid_till: 'Dec 31, 2027',
  });
  const [isCheckingLicense, setIsCheckingLicense] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);


  const createNewSession = (activeRole: 'manufacturer' | 'consumer', initialList?: ChatSession[]) => {
    const newId = 'session_' + Date.now();
    const defaultWelcome: Message = {
      id: 'welcome_' + Date.now(),
      role: 'assistant',
      content:
        activeRole === 'manufacturer'
          ? `Namaste! 🙏 Welcome to **BIS Saathi Technical Consultation Desk**.

I am your official AI Assistant for Indian Standards and BIS Conformity Assessment. Here is how I can assist you:

| Service Area | Applicable Scheme | Official Portal |
| :--- | :--- | :--- |
| **ISI Mark Certification** | Scheme-I (Domestic) | \`manakonline.in\` |
| **Electronics & IT Registration** | Scheme-II (CRS) | \`crsbis.in\` |
| **Foreign Manufacturer Certification** | FMCS (Overseas) | \`manakonline.in\` |
| **In-House Testing Setup (SIT)** | Lab Verification | Physical Audit |

What product are you manufacturing or planning to certify? *(e.g. helmets, electric kettles, chargers, toys, pressure cookers)*`
          : `Namaste! 🙏 Welcome to **BIS Saathi**.

I am your official Standards and Consumer Advisory Assistant from the **Bureau of Indian Standards**. Here is what I can do for you:

| Consumer Protection Area | Verification Standard | Key Verification Number |
| :--- | :--- | :--- |
| **ISI Mark on Consumer Goods** | IS 4151, IS 302, IS 2347 | 7 to 10 digit \`CM/L-XXXXXXXXXX\` |
| **Mobile Chargers & Electronics** | IS 16333, IS 13252 | 8-digit \`R-XXXXXXXX\` |
| **Gold Jewellery Hallmarking** | IS 1417 | 6-digit laser \`HUID\` |
| **AI Photo Inspection** | Multimodal Vision | Instant Counterfeit Detection |

How can I help you today? You can ask in English, Hindi, or Hinglish!`,
    };

    const newSession: ChatSession = {
      id: newId,
      title: activeRole === 'manufacturer' ? 'New Technical Consultation' : 'New Consumer Inquiry',
      role: activeRole,
      createdAt: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      messages: [defaultWelcome],
    };

    const updatedSessions = [newSession, ...(initialList || sessions)];
    setSessions(updatedSessions);
    setCurrentSessionId(newId);
    setMessages([defaultWelcome]);
    try {
      localStorage.setItem('bis_chat_sessions', JSON.stringify(updatedSessions));
    } catch {}
  };

  // Load sessions & language on mount
  useEffect(() => {
    document.title = 'AI Consultation Desk | BIS Saathi';
    const storedRole = (sessionStorage.getItem('bis_role') as 'manufacturer' | 'consumer') || 'consumer';
    setRole(storedRole);

    // Restore language preference
    const savedLang = localStorage.getItem('bis_lang');
    if (savedLang && INDIAN_LANGUAGES.some((l) => l.code === savedLang)) {
      setSelectedLang(savedLang as IndianLangCode);
    }

    // Listen for global language changes
    const handleLangSync = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail && INDIAN_LANGUAGES.some((l) => l.code === detail)) {
        setSelectedLang(detail as IndianLangCode);
      }
    };
    window.addEventListener('bis_lang_changed', handleLangSync);

    // Check for query param from Standards Library or external links
    if (typeof window !== 'undefined') {
      const urlQuery = new URLSearchParams(window.location.search).get('query');
      if (urlQuery) {
        setInput(urlQuery);
      }
    }

    try {
      const raw = localStorage.getItem('bis_chat_sessions');
      if (raw) {
        const parsed: ChatSession[] = JSON.parse(raw);
        if (parsed.length > 0) {
          setSessions(parsed);
          setCurrentSessionId(parsed[0].id);
          setMessages(parsed[0].messages);
          setRole(parsed[0].role);
          return () => window.removeEventListener('bis_lang_changed', handleLangSync);
        }
      }
    } catch {}

    createNewSession(storedRole, []);
    return () => window.removeEventListener('bis_lang_changed', handleLangSync);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update speech recognition when selectedLang changes
  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognitionCtor = (
        (window as Window & { SpeechRecognition?: new () => SpeechRecognitionInstance; webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).SpeechRecognition ||
        (window as Window & { SpeechRecognition?: new () => SpeechRecognitionInstance; webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).webkitSpeechRecognition
      );
      if (!SpeechRecognitionCtor) return;
      const rec = new SpeechRecognitionCtor();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = selectedLang;
      rec.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsRecording(false);
      };
      rec.onerror = () => setIsRecording(false);
      rec.onend = () => setIsRecording(false);
      recognitionRef.current = rec;
    }
  }, [selectedLang]);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const persistSession = (updatedMessages: Message[], updatedTitle?: string) => {
    setSessions((prev) => {
      const updated = prev.map((s) => {
        if (s.id === currentSessionId) {
          return {
            ...s,
            title: updatedTitle || s.title,
            messages: updatedMessages,
          };
        }
        return s;
      });
      try {
        localStorage.setItem('bis_chat_sessions', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const selectSession = (session: ChatSession) => {
    setCurrentSessionId(session.id);
    setMessages(session.messages);
    setRole(session.role);
    sessionStorage.setItem('bis_role', session.role);
  };

  const deleteSession = (e: React.MouseEvent, idToDelete: string) => {
    e.stopPropagation();
    const remaining = sessions.filter((s) => s.id !== idToDelete);
    setSessions(remaining);
    try {
      localStorage.setItem('bis_chat_sessions', JSON.stringify(remaining));
    } catch {}

    if (currentSessionId === idToDelete) {
      if (remaining.length > 0) {
        selectSession(remaining[0]);
      } else {
        createNewSession(role, []);
      }
    }
  };

  const handleRoleChange = (newRole: 'manufacturer' | 'consumer') => {
    setRole(newRole);
    sessionStorage.setItem('bis_role', newRole);
    createNewSession(newRole);
  };

  const toggleVoiceRecording = () => {
    if (!recognitionRef.current) {
      alert('Voice recognition is not supported in this browser. Please type your query.');
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.lang = selectedLang;
        recognitionRef.current.start();
        setIsRecording(true);
      } catch {
        setIsRecording(false);
      }
    }
  };

  // Natural Indian Voice TTS — Smart Script Auto-Detection for Hindi, Bengali, Tamil, etc.
  const speakMessage = (id: string, text: string) => {
    if (typeof window === 'undefined') return;
    const synth: SpeechSynthesis | undefined = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
    if (!synth) return;

    if (speakingMsgId === id) {
      synth.cancel();
      setSpeakingMsgId(null);
      return;
    }
    synth.cancel();

    // 1. Detect actual script from content to guarantee non-English words are read correctly
    let targetLang = selectedLang && selectedLang !== 'en-IN' ? selectedLang : 'en-IN';
    if (targetLang === 'en-IN') {
      if (/(साठी|कोणता|कोणती|कोणते|आहे|नाही|मराठी|झाले|करावे)/i.test(text)) targetLang = 'mr-IN';
      else if (/[\u0900-\u097F]/.test(text)) targetLang = 'hi-IN';
      else if (/[\u0980-\u09FF]/.test(text)) targetLang = 'bn-IN';
      else if (/[\u0B80-\u0BFF]/.test(text)) targetLang = 'ta-IN';
      else if (/[\u0C00-\u0C7F]/.test(text)) targetLang = 'te-IN';
      else if (/[\u0A80-\u0AFF]/.test(text)) targetLang = 'gu-IN';
      else if (/[\u0C80-\u0CFF]/.test(text)) targetLang = 'kn-IN';
      else if (/[\u0D00-\u0D7F]/.test(text)) targetLang = 'ml-IN';
      else if (/[\u0A00-\u0A7F]/.test(text)) targetLang = 'pa-IN';
      else if (/[\u0B00-\u0B7F]/.test(text)) targetLang = 'or-IN';
      else if (/[\u0600-\u06FF]/.test(text)) targetLang = 'ur-IN';
    }

    // 2. Clean markdown, URLs, tables, and raw code for smooth speech
    const cleanText = text
      .replace(/```[\s\S]*?```/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\|[ \t]*[-:]+[-| :]*\|/g, '')
      .replace(/\|/g, ', ')
      .replace(/[*_#`~>]/g, '')
      .replace(/═+/g, '')
      .replace(/\n+/g, '. ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = targetLang;
    utterance.rate = 0.92;
    utterance.pitch = 1.05;
    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    // 3. Async-safe voice selection — voices load asynchronously in browsers
    const selectAndSpeak = () => {
      const voices: SpeechSynthesisVoice[] = synth.getVoices() || [];
      const langPrefix = targetLang.split('-')[0].toLowerCase();

      // Priority A: Exact lang match with female / Indian voice name
      const femaleVoice = voices.find(
        (v) =>
          (v.lang.toLowerCase().replace('_', '-').startsWith(langPrefix)) &&
          (v.name.includes('Female') || v.name.includes('Neerja') || v.name.includes('Heera') ||
           v.name.includes('Swara') || v.name.includes('Google') || v.name.includes('Natural'))
      );
      // Priority B: Any voice matching targetLang prefix
      const anyMatchVoice = voices.find((v) =>
        v.lang.toLowerCase().replace('_', '-').startsWith(langPrefix) ||
        (targetLang === 'mr-IN' && (v.name.toLowerCase().includes('marathi') || v.lang.toLowerCase().includes('mr'))) ||
        (targetLang === 'hi-IN' && (v.name.includes('Hindi') || v.name.toLowerCase().includes('hindi'))) ||
        (targetLang === 'bn-IN' && (v.name.includes('Bangla') || v.name.includes('Bengali'))) ||
        (targetLang === 'ta-IN' && (v.name.includes('Tamil') || v.name.toLowerCase().includes('tamil'))) ||
        (targetLang === 'te-IN' && (v.name.includes('Telugu') || v.name.toLowerCase().includes('telugu'))) ||
        (targetLang === 'gu-IN' && (v.name.includes('Gujarati') || v.name.toLowerCase().includes('gujarati')))
      );

      const chosenVoice = femaleVoice || anyMatchVoice || null;
      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }
      setSpeakingMsgId(id);
      synth.speak(utterance);
    };

    // Voices may not be loaded yet — use addEventListener or immediate if already available
    const existingVoices = synth.getVoices();
    if (existingVoices && existingVoices.length > 0) {
      selectAndSpeak();
    } else {
      const onVoicesReady = () => {
        synth.removeEventListener('voiceschanged', onVoicesReady);
        selectAndSpeak();
      };
      synth.addEventListener('voiceschanged', onVoicesReady);
      // Fallback: speak without specific voice after 300ms if voices still don't load
      setTimeout(() => {
        if (speakingMsgId !== id) {
          setSpeakingMsgId(id);
          synth.speak(utterance);
        }
      }, 300);
    }
  };

  const copyMessageText = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const downloadDossier = (msg: Message) => {
    const reportContent = `# BUREAU OF INDIAN STANDARDS — CONFORMITY ASSESSMENT DOSSIER\nGenerated via BIS Saathi Intelligent Regulatory Assistant (SIH26107)\nMinistry of Consumer Affairs, Food & Public Distribution, Govt. of India\nDate: ${new Date().toLocaleString('en-IN')}\n\n---\n\n## REGULATORY DETERMINATION & TECHNICAL ADVISORY\n\n${msg.content}\n\n---\n\n## CITED INDIAN STANDARDS & REGULATORY MANDATES\n${msg.sources?.map((s) => `* **${s.is_number}**: ${s.title} (${s.category})`).join('\n') || '* Standard Quality Control Orders (QCOs) issued under BIS Act, 2016.'}\n\n---\n\n## NEXT STATUTORY ACTION ITEMS FOR APPLICANT:\n1. Establish in-house testing equipment complying with BIS Scheme of Inspection and Testing (SIT).\n2. Submit formal application with test reports via official portal (manakonline.in for ISI Mark / crsbis.in for CRS).\n3. Prepare factory premises for physical pre-sampling verification audit by designated BIS Technical Officer.\n\nDisclaimer: This advisory dossier is generated for technical planning and audit preparation. Formal statutory licenses are granted solely by the Bureau of Indian Standards.`;

    const blob = new Blob([reportContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BIS_Conformity_Dossier_${Date.now()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWidgetLicenseCheck = async () => {
    if (!licenseInput.trim()) return;
    setIsCheckingLicense(true);
    try {
      const res = await fetch('/api/license-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseNumber: licenseInput }),
      });
      const data = await res.json();
      if (data.found && data.license) {
        setLicenseResult({
          found: true,
          status: 'Valid License',
          holder_name: data.license.holder_name,
          product_name: data.license.product_name,
          is_number: data.license.is_number,
          valid_till: data.license.valid_till,
        });
      } else {
        setLicenseResult({
          found: false,
          status: 'License Not Found / Invalid Syntax',
          holder_name: 'Unknown Licensee',
          product_name: 'Unverified Product Category',
          is_number: 'N/A',
          valid_till: 'N/A',
        });
      }
    } catch {
      setLicenseResult({
        found: false,
        status: 'Verification Error',
        holder_name: 'Service Unavailable',
        product_name: 'N/A',
        is_number: 'N/A',
        valid_till: 'N/A',
      });
    } finally {
      setIsCheckingLicense(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      const previewUrl = file.type.startsWith('image/') ? base64 : undefined;
      setSelectedFile({
        name: file.name,
        mimeType: file.type || 'application/octet-stream',
        base64,
        previewUrl,
      });
    };
    reader.readAsDataURL(file);
  };

  const sendMessage = async (overrideText?: string) => {
    const text = (overrideText || input).trim();
    if (!text && !selectedFile) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      attachment: selectedFile
        ? {
            name: selectedFile.name,
            type: selectedFile.mimeType,
            url: selectedFile.previewUrl,
          }
        : undefined,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    const isFirstUserMessage = messages.filter((m) => m.role === 'user').length === 0;
    const sessionTitle = isFirstUserMessage
      ? text.slice(0, 32) + (text.length > 32 ? '…' : '')
      : undefined;

    persistSession(newMessages, sessionTitle);

    setInput('');
    const fileToSend = selectedFile;
    setSelectedFile(null);
    setIsLoading(true);

    try {
      const history = newMessages
        .filter((m) => !m.id.startsWith('welcome'))
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          role,
          analysisMode,
          lang: selectedLang,
          history,
          file: fileToSend ? { base64: fileToSend.base64, mimeType: fileToSend.mimeType } : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to retrieve compliance records.');

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.answer,
        sources: data.sources,
      };

      const finalMessages = [...newMessages, assistantMessage];
      setMessages(finalMessages);
      persistSession(finalMessages);
    } catch (err) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          `Ek choti si technical problem aa gayi! 🙏 Lekin main yahan hoon.\n\nAap mujhse puchh sakte hain:\n- **ISI mark verification** — kisi bhi product ki authenticity check karo\n- **Certification process** — apna product BIS certified kaise karo\n- **Gold hallmarking** — HUID verify karo\n- **Consumer rights** — fake products ki report kaise karein\n\nYa simply product ka photo upload karo — main turant analyze kar deta hoon! 📸`,
      };
      const finalMessages = [...newMessages, errorMsg];
      setMessages(finalMessages);
      persistSession(finalMessages);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-4.5rem)] w-full overflow-hidden bg-slate-100">
      
      {/* ── 1. LEFT SIDEBAR: SESSION HISTORY & QUICK NAV ── */}
      <aside className="hidden lg:flex w-72 flex-col justify-between border-r border-slate-200 bg-white p-3 select-none">
        <div className="flex flex-col h-full overflow-hidden">
          
          {/* Top Identity: State Emblem of India + BIS Emblem */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 px-1">
            <div className="flex items-center gap-2">
              <StateEmblem className="h-9 w-auto text-slate-900" />
              <div className="h-6 w-px bg-slate-200" />
              <BISLogo className="h-8 w-auto" />
            </div>
            <div className="text-right">
              <span className="font-extrabold text-[11px] text-blue-950 block leading-tight">
                BIS Saathi
              </span>
              <span className="text-[9px] text-slate-600 font-bold block uppercase tracking-wider">
                SIH26107 AI
              </span>
            </div>
          </div>

          {/* New Chat Button */}
          <div className="pt-3 pb-2">
            <button
              type="button"
              onClick={() => createNewSession(role)}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-950 px-3 py-2.5 text-xs font-bold text-white hover:bg-blue-900 shadow-sm transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>+ New Consultation</span>
            </button>
          </div>

          {/* Session List */}
          <div className="flex-1 overflow-y-auto space-y-1 pr-1 mt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 px-2 block mb-1">
              Recent Consultations
            </span>
            {sessions.map((s) => {
              const isActive = s.id === currentSessionId;
              return (
                <div
                  key={s.id}
                  onClick={() => selectSession(s)}
                  className={`group flex items-center justify-between rounded-xl px-2.5 py-2 text-xs cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-950 font-bold border border-blue-200'
                      : 'text-slate-600 hover:bg-slate-100 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate pr-1">
                    <MessageSquare className={`h-3.5 w-3.5 flex-shrink-0 ${isActive ? 'text-blue-900' : 'text-slate-400'}`} />
                    <span className="truncate">{s.title}</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => deleteSession(e, s.id)}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-600 p-1 transition-opacity"
                    title="Delete session"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Quick Links */}
          <div className="border-t border-slate-100 pt-3 space-y-1">
            <Link
              href="/checker"
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
            >
              <Camera className="h-3.5 w-3.5 text-emerald-600" />
              <span>AI Photo Mark Scanner</span>
            </Link>
            <Link
              href="/pathway"
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
            >
              <FileCheck className="h-3.5 w-3.5 text-blue-900" />
              <span>Document Checklist</span>
            </Link>
            <Link
              href="/standards"
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
            >
              <BookOpen className="h-3.5 w-3.5 text-purple-600" />
              <span>Standards Directory</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* ── 2. CENTER: MAIN INTERACTIVE CHAT COCKPIT ── */}
      <main className="flex flex-1 flex-col overflow-hidden bg-white">
        
        {/* Cockpit Mode Controls Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-200 bg-slate-50/90 px-4 py-2.5 gap-2">
          
          {/* Role Segmented Switcher */}
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-xl bg-slate-200/90 p-0.5 border border-slate-300">
              <button
                type="button"
                onClick={() => handleRoleChange('consumer')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-extrabold transition-all ${
                  role === 'consumer'
                    ? 'bg-white text-blue-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="h-3.5 w-3.5 text-emerald-600" />
                <span>Citizen / Consumer</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('manufacturer')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-extrabold transition-all ${
                  role === 'manufacturer'
                    ? 'bg-white text-blue-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="h-3.5 w-3.5 text-blue-900" />
                <span>Industry / MSME</span>
              </button>
            </div>
          </div>

          {/* Deep Analysis Mode & Voice Language Toggles */}
          <div className="flex items-center gap-2">
            
            {/* Analysis Depth Pill Toggle */}
            <div className="inline-flex rounded-xl bg-slate-200/90 p-0.5 border border-slate-300">
              <button
                type="button"
                onClick={() => setAnalysisMode('quick')}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
                  analysisMode === 'quick'
                    ? 'bg-white text-blue-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Concise direct answers"
              >
                <Zap className="h-3 w-3 text-amber-500" />
                <span className="hidden sm:inline">Quick</span>
              </button>
              <button
                type="button"
                onClick={() => setAnalysisMode('deep')}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
                  analysisMode === 'deep'
                    ? 'bg-blue-950 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Deep regulatory audit with comparison tables & testing matrices"
              >
                <Brain className="h-3 w-3 text-purple-300" />
                <span>Deep Audit</span>
              </button>
            </div>

            {/* 🌐 Indian Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowLangDropdown((v) => !v)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-extrabold text-slate-700 hover:bg-slate-50 transition-colors"
                title="Select Indian language for voice & AI responses"
              >
                <span>🌐</span>
                <span>{INDIAN_LANGUAGES.find((l) => l.code === selectedLang)?.native || 'English'}</span>
                <ChevronRight className={`h-3 w-3 text-slate-400 transition-transform ${showLangDropdown ? 'rotate-90' : ''}`} />
              </button>

              {showLangDropdown && (
                <div className="absolute right-0 top-full mt-1 z-50 w-52 rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
                  <div className="px-3 pt-2 pb-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      22 Scheduled Indian Languages
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto py-1">
                    {INDIAN_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          const code = lang.code as IndianLangCode;
                          setSelectedLang(code);
                          setShowLangDropdown(false);
                          localStorage.setItem('bis_lang', code);
                          if (typeof window !== 'undefined') {
                            window.dispatchEvent(new CustomEvent('bis_lang_changed', { detail: code }));
                          }
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors hover:bg-slate-50 ${
                          selectedLang === lang.code
                            ? 'bg-blue-50 font-bold text-blue-950'
                            : 'text-slate-700 font-medium'
                        }`}
                      >
                        <span>{lang.native}</span>
                        <span className="text-[10px] text-slate-400">{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Model Badge */}
            <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
              <span className="live-dot" /> BIS AI Engine Online
            </span>

          </div>

        </div>

        {/* Messages Scroll Area */}
        <div
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"
          aria-live="polite"
          aria-relevant="additions"
          role="log"
          aria-label="Conversation with BIS Saathi"
        >
          <div className="mx-auto max-w-3xl space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-950 text-white flex-shrink-0 mt-0.5 shadow-xs">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                  </div>
                )}

                <div
                  className={`relative max-w-[92%] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-950 text-white shadow-xs rounded-tr-none'
                      : 'bg-slate-50 border border-slate-200 text-slate-800 shadow-xs rounded-tl-none'
                  }`}
                >
                  {/* Attachment Thumbnail Preview */}
                  {msg.attachment && (
                    <div className="mb-3 rounded-xl border border-white/20 bg-black/10 p-2 text-xs">
                      {msg.attachment.url ? (
                        <img
                          src={msg.attachment.url}
                          alt={msg.attachment.name}
                          className="max-h-48 rounded-lg object-contain mb-1"
                        />
                      ) : (
                        <div className="flex items-center gap-1.5 font-bold">
                          <FileText className="h-4 w-4" /> {msg.attachment.name}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Markdown Answer Text with Guaranteed Rich Table Rendering */}
                  <div className={`prose prose-xs sm:prose-sm max-w-none ${msg.role === 'user' ? 'text-white prose-invert' : 'text-slate-800'}`}>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        table: ({ node, ...props }) => (
                          <div className="my-3 overflow-x-auto rounded-xl border border-slate-300 shadow-xs">
                            <table className="w-full min-w-full divide-y divide-slate-200 text-xs border-collapse" {...props} />
                          </div>
                        ),
                        thead: ({ node, ...props }) => (
                          <thead className="bg-slate-900 text-white font-bold" {...props} />
                        ),
                        th: ({ node, ...props }) => (
                          <th className="px-3.5 py-2.5 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-100 border-r border-slate-700/50 last:border-r-0" {...props} />
                        ),
                        tbody: ({ node, ...props }) => (
                          <tbody className="divide-y divide-slate-200 bg-white" {...props} />
                        ),
                        tr: ({ node, ...props }) => (
                          <tr className="even:bg-slate-50/80 hover:bg-blue-50/50 transition-colors" {...props} />
                        ),
                        td: ({ node, ...props }) => (
                          <td className="px-3.5 py-2 text-xs text-slate-800 border-r border-slate-100 last:border-r-0 leading-relaxed align-top" {...props} />
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>

                  {/* Sources Grounding Chips */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-wrap gap-1.5 items-center">
                      <span className="text-[10px] font-bold uppercase text-slate-400 mr-1">Cited Standards:</span>
                      {msg.sources.map((s, idx) => (
                        <SourceChip key={idx} source={s} />
                      ))}
                    </div>
                  )}

                  {/* Assistant Actions: Audio Readout, Copy Markdown & Export Dossier */}
                  {msg.role === 'assistant' && !msg.id.startsWith('welcome') && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/50 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                      
                      {/* Left: Indian Voice Audio Readout */}
                      <button
                        type="button"
                        onClick={() => speakMessage(msg.id, msg.content)}
                        className={`flex items-center gap-1.5 font-bold px-2.5 py-1 rounded-lg border transition-colors ${
                          speakingMsgId === msg.id
                            ? 'bg-rose-50 border-rose-200 text-rose-700'
                            : 'bg-white border-slate-200 text-slate-700 hover:text-blue-950 hover:bg-slate-50'
                        }`}
                        title="Listen with natural Indian voice"
                      >
                        {speakingMsgId === msg.id ? (
                          <>
                            <div className="flex items-center gap-0.5 h-3">
                              <span className="w-0.5 bg-rose-600 rounded-full audio-bar-1" />
                              <span className="w-0.5 bg-rose-600 rounded-full audio-bar-2" />
                              <span className="w-0.5 bg-rose-600 rounded-full audio-bar-3" />
                              <span className="w-0.5 bg-rose-600 rounded-full audio-bar-4" />
                            </div>
                            <span>Speaking… (Stop)</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="h-3.5 w-3.5 text-blue-900" />
                            <span>Read Aloud (Indian Accent)</span>
                          </>
                        )}
                      </button>

                      {/* Right: Copy & Export */}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => copyMessageText(msg.id, msg.content)}
                          className="flex items-center gap-1 font-bold text-slate-700 hover:text-blue-950 bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-2xs hover:bg-slate-50 transition-colors"
                          title="Copy message & tables to clipboard"
                        >
                          {copiedMsgId === msg.id ? (
                            <><Check className="h-3.5 w-3.5 text-emerald-600" /> <span>Copied!</span></>
                          ) : (
                            <><Copy className="h-3.5 w-3.5 text-slate-500" /> <span>Copy</span></>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => downloadDossier(msg)}
                          className="flex items-center gap-1 font-bold text-blue-950 hover:underline bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-2xs hover:bg-slate-50 transition-colors"
                          title="Download Formal Conformity Dossier (.md)"
                        >
                          <Download className="h-3.5 w-3.5 text-blue-900" />
                          <span>Export Dossier</span>
                        </button>
                      </div>

                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-950 text-white flex-shrink-0 mt-0.5">
                  <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs font-semibold text-slate-600">
                  <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                  <span className="ml-2">
                    {analysisMode === 'deep'
                      ? 'Generating multi-step regulatory audit & comparison tables…'
                      : 'Analyzing against Bureau of Indian Standards repository…'}
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Interactive Starter Prompt Chips */}
        <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-2">
          <div className="mx-auto max-w-3xl flex flex-wrap gap-1.5 items-center">
            <span className="text-[10px] font-extrabold uppercase text-slate-600 mr-1 hidden sm:inline">Try asking:</span>
            {(role === 'manufacturer'
              ? [
                  '🪖 Scheme-I vs Scheme-II Comparison Table',
                  '⚡ Electric Kettle IS 302 testing setup table',
                  '📱 Mobile Charger CRS registration steps',
                  '📋 Complete SIT Lab Equipment Checklist',
                ]
              : [
                  '🪖 Helmet ISI mark genuine vs fake table',
                  '🍲 Pressure Cooker ISI verification',
                  '🥇 What is 6-digit Gold HUID code?',
                  '🚨 Statutory penalties under BIS Act Sec 29',
                ]
            ).map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendMessage(prompt)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-700 hover:border-blue-950 hover:bg-blue-50/50 transition-colors shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input Bar with Prominent Attachment & Voice Controls */}
        <div className="border-t border-slate-200 bg-white p-3 sm:p-4">
          <div className="mx-auto max-w-3xl">
            
            {selectedFile && (
              <div className="mb-2 flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-950">
                <span className="truncate font-bold flex items-center gap-2">
                  <Paperclip className="h-4 w-4 text-blue-900" /> {selectedFile.name}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-blue-100 hover:text-slate-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            <div className="flex items-end gap-2 rounded-2xl border border-slate-300 bg-slate-50 p-2 focus-within:border-blue-950 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-950/10 transition-all">
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="file-attachment"
              />

              {/* Prominent Attachment Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1 rounded-xl bg-slate-200/80 px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-blue-100 hover:text-blue-950 transition-colors"
                title="Attach photo of ISI mark or test document"
                aria-label="Attach file or photo"
              >
                <Paperclip className="h-4 w-4 text-blue-900" />
                <span className="hidden sm:inline">Attach</span>
              </button>

              {/* Voice Speech-to-Text Button */}
              <button
                type="button"
                onClick={toggleVoiceRecording}
                className={`rounded-xl p-2 transition-colors ${
                  isRecording
                    ? 'bg-rose-100 text-rose-700 animate-pulse ring-2 ring-rose-400'
                    : 'text-slate-500 hover:bg-slate-200 hover:text-slate-800'
                }`}
                title={isRecording ? 'Listening... Click to stop' : `Voice Input (${INDIAN_LANGUAGES.find((l) => l.code === selectedLang)?.native || selectedLang})`}
                aria-label="Voice input"
              >
                {isRecording ? <MicOff className="h-4 w-4 text-rose-600" /> : <Mic className="h-4 w-4" />}
              </button>

              {/* Input Textarea */}
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isRecording
                    ? `Listening in ${INDIAN_LANGUAGES.find((l) => l.code === selectedLang)?.native || 'English'}… Speak now!`
                    : role === 'manufacturer'
                    ? 'Ask for scheme comparisons, testing equipment tables, or IS codes...'
                    : 'Ask any question in English, Hindi or Hinglish, or enter a CM/L number...'
                }
                rows={1}
                className="max-h-28 flex-1 resize-none bg-transparent py-1.5 text-xs sm:text-sm text-slate-900 placeholder-slate-500 focus:outline-none"
                aria-label="Consultation input"
              />

              {/* Send Button */}
              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={(!input.trim() && !selectedFile) || isLoading}
                className="rounded-xl bg-blue-950 p-2.5 text-white hover:bg-blue-900 disabled:opacity-30 transition-all shadow-sm flex-shrink-0"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>

            </div>

            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-600 px-1 font-medium">
              <span>Grounded in Indian Standards &amp; QCOs</span>
              <span>Mode: {analysisMode === 'deep' ? '🔬 Deep Audit Active' : '⚡ Quick Mode'}</span>
            </div>

          </div>
        </div>

      </main>

      {/* ── 3. RIGHT CONTEXTUAL WIDGET PANEL ── */}
      <aside className="hidden xl:flex w-80 flex-col overflow-y-auto border-l border-slate-200 bg-slate-50/60 p-4 space-y-4">
        {role === 'consumer' ? (
          <>
            {/* Widget 1: Quick Verify ISI Mark */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Verify ISI Mark (CM/L)</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-3 leading-snug">
                Enter the 7 to 10 digit CM/L number printed under the ISI logo.
              </p>

              <div className="flex gap-1.5 mb-3">
                <input
                  type="text"
                  value={licenseInput}
                  onChange={(e) => setLicenseInput(e.target.value)}
                  placeholder="e.g. CM/L-7654321"
                  className="flex-1 rounded-lg border border-slate-200 px-2.5 py-1.5 font-mono text-xs text-slate-900 focus:border-blue-900 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleWidgetLicenseCheck}
                  disabled={isCheckingLicense}
                  className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                  {isCheckingLicense ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Check'}
                </button>
              </div>

              {licenseResult && (
                <div
                  className={`rounded-xl border p-3 text-xs ${
                    licenseResult.found
                      ? 'border-emerald-200 bg-emerald-50/60 text-emerald-950'
                      : 'border-red-200 bg-red-50/60 text-red-950'
                  }`}
                >
                  <div className="font-extrabold flex items-center gap-1.5 mb-1.5">
                    {licenseResult.found ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    )}
                    <span>{licenseResult.status}</span>
                  </div>
                  <div className="space-y-1 text-[11px]">
                    <div><span className="text-slate-500">Licensee:</span> <strong>{licenseResult.holder_name}</strong></div>
                    <div><span className="text-slate-500">Product:</span> {licenseResult.product_name}</div>
                    <div><span className="text-slate-500">Standard:</span> <strong>{licenseResult.is_number}</strong></div>
                    <div><span className="text-slate-500">Valid Till:</span> {licenseResult.valid_till}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Widget 2: Helpful Tip */}
            <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4">
              <span className="text-[10px] font-extrabold uppercase tracking-wide text-blue-900 block mb-1">
                💡 Did you know?
              </span>
              <p className="text-xs text-slate-700 leading-snug">
                An authentic ISI mark <strong>MUST always</strong> carry the <code>IS:XXXX</code> standard code on top and the <code>CM/L-XXXXXXXXXX</code> license number below. If either is missing, it is counterfeit!
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Manufacturer Widget: Compliance Fast Facts */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-2">
                <Building2 className="h-4 w-4 text-blue-900" />
                <span>Industry Application Links</span>
              </div>
              <div className="space-y-2 text-xs">
                <a
                  href="https://www.manakonline.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:border-blue-900 hover:bg-blue-50/50 transition-colors font-bold text-slate-800"
                >
                  <span>e-BIS (MANAK Portal)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                </a>
                <a
                  href="https://www.crsbis.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:border-blue-900 hover:bg-blue-50/50 transition-colors font-bold text-slate-800"
                >
                  <span>CRS Registration Portal</span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                </a>
              </div>
            </div>
          </>
        )}
      </aside>

    </div>
  );
}
