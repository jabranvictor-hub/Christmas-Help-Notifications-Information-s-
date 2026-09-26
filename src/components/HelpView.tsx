import React, { useState } from 'react';
import { ActiveTab, SchoolNotification } from '../types';
import { CHRISTMAS_SCHOOL_INFO } from '../data/schoolData';
import { askChristmasSchoolAssistant } from '../utils/aiRulesEngine';
import { 
  HelpCircle, 
  MessageSquare, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Info, 
  Bell, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  UserCheck,
  MapPin
} from 'lucide-react';
import { christmasAudio } from '../utils/audio';

interface HelpViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  notifications: SchoolNotification[];
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  relatedAction?: 'help' | 'information' | 'notifications';
}

export const HelpView: React.FC<HelpViewProps> = ({ setActiveTab, notifications }) => {
  // Chat state directly inside Help
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Merry Christmas! 🎄 I am the Christmas School Help Assistant. Ask me how to use the browser, or ask about our Principal (Elijah Victor), Teacher (Aroush), Admin (Anum), students, location, or notifications!",
    }
  ]);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const quickQuestions = [
    "How do I use Christmas Browser?",
    "Who is the Principal?",
    "Where is the school located?",
    "Are there any notifications?",
    "Who are the students?",
    "Who is Teacher & Admin?",
  ];

  const handleSendChat = (textToSend?: string) => {
    const query = textToSend || chatInput;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: query.trim(),
    };

    const response = askChristmasSchoolAssistant(query.trim(), notifications);
    const assistantMsg: ChatMessage = {
      id: `a_${Date.now()}`,
      sender: 'assistant',
      text: response.answer,
      relatedAction: response.relatedAction,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setChatInput('');
    christmasAudio.playChime([1046.5, 1318.5]);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
    christmasAudio.playChime();
  };

  const faqs = [
    {
      q: "What is Christmas Browser 🎄?",
      a: "Christmas Browser is a simple, friendly, holiday-themed web app designed for Christmas School. It gives you instant access to school help, accurate official information, and verified notifications directly inside your web browser.",
    },
    {
      q: "Do I need WhatsApp or a separate Android app?",
      a: "No! Christmas Browser runs entirely as a browser web app on any modern web browser. You do not need WhatsApp, and you do not need to download or install a separate Android app. It works seamlessly across phones, tablets, and computers.",
    },
    {
      q: "How do I find official Christmas School information?",
      a: `Click the large "INFORMATION ℹ️" button. You will see verified records: School Name (Christmas School 🎄), Location (${CHRISTMAS_SCHOOL_INFO.location}), Principal (${CHRISTMAS_SCHOOL_INFO.staff.principal}), Teacher (${CHRISTMAS_SCHOOL_INFO.staff.teacher}), Admin (${CHRISTMAS_SCHOOL_INFO.staff.admin}), and Students (${CHRISTMAS_SCHOOL_INFO.students.join(', ')}).`,
    },
    {
      q: "How do Christmas School notifications work?",
      a: "The system only displays notifications that have actually been added by authorized school staff. Notifications are never invented or assumed. If there are no active notices, the system explicitly displays: 'There are no current Christmas School notifications.'",
    },
    {
      q: "How can I toggle the falling snow and holiday chimes?",
      a: "Use the 'Snow' and 'Chimes' buttons in the top browser bar. The falling snow animation can be turned on or off anytime. Holiday bell chimes provide gentle audio feedback on your actions and can be muted with one click.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Help Header */}
      <div className="p-6 sm:p-8 rounded-3xl border border-emerald-700/80 bg-gradient-to-br from-[#0c261a] via-[#081f14] to-[#04110b] shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🤝</span>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-semibold">
                Interactive Help & Live Support
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-christmas text-white">
              Help & Christmas School Chat 💬
            </h1>
            <p className="text-sm text-emerald-200/90 mt-1 max-w-2xl leading-relaxed">
              Have questions about Christmas School or how to use the browser? Chat with our friendly assistant below or explore the guides!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-3xl sm:text-4xl animate-sway inline-block select-none">
              🎄
            </span>
          </div>
        </div>

        {/* Quick Nav Indicators */}
        <div className="mt-5 pt-4 border-t border-emerald-800/60 flex flex-wrap items-center gap-4 text-xs text-emerald-300/80">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Interactive Chat Available Below</span>
          </div>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>No WhatsApp or Android App Needed</span>
          </div>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Only Verified School Information</span>
          </div>
        </div>
      </div>

      {/* FEATURED: Live Christmas School Help Chat */}
      <div className="rounded-3xl border-2 border-amber-600/70 bg-[#081b12] shadow-2xl overflow-hidden">
        {/* Chat Header Bar */}
        <div className="bg-[#0b2419] px-6 py-4 border-b border-emerald-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl text-amber-300 shadow-inner">
              🤝
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-christmas text-white">
                  Christmas School Help Chat
                </h2>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-900 text-emerald-200 border border-emerald-700">
                  Online & Ready
                </span>
              </div>
              <p className="text-xs text-emerald-300/70">
                Ask about school staff, students, location, notifications, or browser usage
              </p>
            </div>
          </div>

          <span className="text-xs text-amber-300/80 font-mono flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Rules: Never invents data</span>
          </span>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-6 py-3 bg-[#06170f] border-b border-emerald-900/80">
          <span className="text-[11px] text-emerald-300/70 font-mono block mb-1.5">
            Click any question to ask instantly:
          </span>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSendChat(q)}
                className="px-3 py-1 rounded-xl bg-emerald-950/80 hover:bg-emerald-800 text-emerald-100 hover:text-white border border-emerald-800/80 text-xs transition-all text-left shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Thread Messages */}
        <div className="p-4 sm:p-6 space-y-4 h-[380px] overflow-y-auto scrollbar-thin bg-gradient-to-b from-[#081b12] to-[#05130d]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-lg ${
                  msg.sender === 'user'
                    ? 'bg-red-800 text-white rounded-br-none'
                    : 'bg-[#0f2d20] border border-emerald-700/70 text-emerald-50 rounded-bl-none'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 opacity-70 text-[11px] font-mono">
                  <span>{msg.sender === 'user' ? 'You' : 'Christmas School Help 🎄'}</span>
                </div>
                <div className="whitespace-pre-line">{msg.text}</div>

                {msg.relatedAction && (
                  <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between">
                    <span className="text-[11px] text-amber-300">
                      Open related section:
                    </span>
                    <button
                      onClick={() => {
                        setActiveTab(msg.relatedAction!);
                        christmasAudio.playChime();
                      }}
                      className="px-2.5 py-1 rounded bg-amber-400 text-stone-950 text-xs font-bold hover:bg-amber-300 transition-colors flex items-center gap-1 shadow-sm"
                    >
                      <span>Open {msg.relatedAction.toUpperCase()}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendChat();
          }}
          className="p-3 sm:p-4 bg-[#0a2016] border-t border-emerald-800/80 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Type your question (e.g., 'Who is the principal?', 'How do I use this browser?')..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#05130d] border border-emerald-800 text-white placeholder-emerald-700/80 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button
            type="submit"
            disabled={!chatInput.trim()}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Explanatory 3-Step Guides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1 */}
        <div className="p-6 rounded-2xl border border-emerald-800/80 bg-[#0a1e16] shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">🤝</span>
              <span className="text-xs font-mono text-amber-400 font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                Feature 01
              </span>
            </div>
            <h3 className="text-base font-bold font-christmas text-white mb-1.5">
              1. HELP & Guides 🤝
            </h3>
            <p className="text-xs text-slate-300/85 leading-relaxed">
              Provides complete assistance with Christmas School operations, live help chat, and step-by-step browser usage.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-900/60 text-xs font-semibold text-emerald-400 flex items-center justify-between">
            <span>Currently Active</span>
            <span>✓</span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-6 rounded-2xl border border-red-900/60 bg-[#16080a] shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">ℹ️</span>
              <span className="text-xs font-mono text-red-300 font-bold px-2 py-0.5 rounded bg-red-950 border border-red-800">
                Feature 02
              </span>
            </div>
            <h3 className="text-base font-bold font-christmas text-white mb-1.5">
              2. INFORMATION ℹ️
            </h3>
            <p className="text-xs text-slate-300/85 leading-relaxed">
              Review verified school records: School Name, Campus Location, Principal Elijah Victor, Teacher Aroush, Admin Anum, and students.
            </p>
          </div>

          <button
            onClick={() => { setActiveTab('information'); christmasAudio.playChime(); }}
            className="mt-4 pt-3 border-t border-red-950/60 text-xs font-semibold text-red-300 hover:text-red-200 flex items-center justify-between text-left"
          >
            <span>Open Information Directory</span>
            <span>→</span>
          </button>
        </div>

        {/* Step 3 */}
        <div className="p-6 rounded-2xl border border-amber-900/60 bg-[#171206] shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">🔔</span>
              <span className="text-xs font-mono text-amber-300 font-bold px-2 py-0.5 rounded bg-amber-950 border border-amber-800">
                Feature 03
              </span>
            </div>
            <h3 className="text-base font-bold font-christmas text-white mb-1.5">
              3. NOTIFICATIONS 🔔
            </h3>
            <p className="text-xs text-slate-300/85 leading-relaxed">
              Read authentic notices added to the system. Never invent notifications; if none exist, it displays the official system message.
            </p>
          </div>

          <button
            onClick={() => { setActiveTab('notifications'); christmasAudio.playChime(); }}
            className="mt-4 pt-3 border-t border-amber-950/60 text-xs font-semibold text-amber-300 hover:text-amber-200 flex items-center justify-between text-left"
          >
            <span>Check Notifications Board</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Official School Contacts & Support Details */}
      <div className="p-6 sm:p-7 rounded-3xl border border-emerald-800/80 bg-[#0a1e16] shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-emerald-800/60 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏫</span>
            <div>
              <h3 className="text-lg font-bold font-christmas text-white">
                Christmas School Support Contacts
              </h3>
              <p className="text-xs text-emerald-300/70">
                Official contacts at Punjab, HMC, Street Number 1
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#06140e] border border-emerald-900">
            <span className="text-xs text-amber-400 font-mono block">Principal</span>
            <span className="text-base font-bold text-white mt-0.5 block">{CHRISTMAS_SCHOOL_INFO.staff.principal}</span>
            <p className="text-xs text-slate-400 mt-1">General inquiries, school vision, and leadership</p>
          </div>
          <div className="p-4 rounded-xl bg-[#06140e] border border-emerald-900">
            <span className="text-xs text-emerald-400 font-mono block">Teacher</span>
            <span className="text-base font-bold text-white mt-0.5 block">{CHRISTMAS_SCHOOL_INFO.staff.teacher}</span>
            <p className="text-xs text-slate-400 mt-1">Curriculum, class activities, and student learning</p>
          </div>
          <div className="p-4 rounded-xl bg-[#06140e] border border-emerald-900">
            <span className="text-xs text-red-400 font-mono block">Admin</span>
            <span className="text-base font-bold text-white mt-0.5 block">{CHRISTMAS_SCHOOL_INFO.staff.admin}</span>
            <p className="text-xs text-slate-400 mt-1">Admissions, notifications, and campus records</p>
          </div>
        </div>
      </div>

      {/* FAQs Accordion */}
      <div className="p-6 sm:p-7 rounded-3xl border border-emerald-800/80 bg-[#0a1e16] shadow-xl">
        <div className="flex items-center gap-2 mb-5">
          <span className="text-2xl">❓</span>
          <div>
            <h3 className="text-lg font-bold font-christmas text-white">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-emerald-300/70">
              Clear answers to help you navigate Christmas School and the browser
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-emerald-800/70 bg-[#081811] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-emerald-900/30 transition-colors"
                >
                  <span className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="text-amber-400 font-mono">Q:</span>
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-300 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 border-t border-emerald-900/60 text-xs text-emerald-100/90 leading-relaxed pl-8">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
