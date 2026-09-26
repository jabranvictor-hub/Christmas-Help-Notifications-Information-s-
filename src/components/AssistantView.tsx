import React, { useState } from 'react';
import { ActiveTab, SchoolNotification } from '../types';
import { askChristmasSchoolAssistant } from '../utils/aiRulesEngine';
import { Send, Sparkles, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import { christmasAudio } from '../utils/audio';

interface AssistantViewProps {
  notifications: SchoolNotification[];
  setActiveTab: (tab: ActiveTab) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  relatedAction?: 'help' | 'information' | 'notifications';
}

export const AssistantView: React.FC<AssistantViewProps> = ({
  notifications,
  setActiveTab,
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Merry Christmas! 🎄 I am the Christmas School Assistant. I provide friendly, concise help using only verified Christmas School system information. How can I assist you today?",
    }
  ]);

  const quickPrompts = [
    "Who is the Principal?",
    "Where is Christmas School located?",
    "Are there any notifications?",
    "Who are the students?",
    "Who is the Teacher & Admin?",
    "How do I use Christmas Browser?",
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}_u`,
      sender: 'user',
      text: query.trim(),
    };

    const response = askChristmasSchoolAssistant(query.trim(), notifications);
    const assistantMsg: ChatMessage = {
      id: `msg_${Date.now()}_a`,
      sender: 'assistant',
      text: response.answer,
      relatedAction: response.relatedAction,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput('');
    christmasAudio.playChime([1046.5, 1318.5]);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-7 rounded-3xl border border-amber-700/80 bg-gradient-to-br from-[#1c1808] via-[#120f04] to-[#0a0802] shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl text-amber-300">
              🎄
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-christmas text-white">
                  Christmas School Assistant
                </h1>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                  Strictly Grounded
                </span>
              </div>
              <p className="text-xs text-amber-200/80 mt-0.5">
                Friendly & concise answers strictly from official Christmas School records.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-300/80">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Never invents information or notices</span>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="mt-5 pt-4 border-t border-amber-800/40">
          <span className="text-xs text-amber-300/70 block mb-2 font-mono">Suggested Questions:</span>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-emerald-100 hover:text-white transition-all text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Thread Container */}
      <div className="rounded-3xl border border-emerald-800/80 bg-[#091b13] p-4 sm:p-6 shadow-xl flex flex-col h-[460px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-red-800 text-white rounded-br-none'
                    : 'bg-[#0f2d20] border border-emerald-700/60 text-emerald-50 rounded-bl-none'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 opacity-70 text-[11px] font-mono">
                  <span>{msg.sender === 'user' ? 'You' : 'Christmas School Assistant 🎄'}</span>
                </div>
                <div className="whitespace-pre-line">{msg.text}</div>

                {msg.relatedAction && (
                  <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between">
                    <span className="text-[11px] text-amber-300">
                      Jump to official page:
                    </span>
                    <button
                      onClick={() => {
                        setActiveTab(msg.relatedAction!);
                        christmasAudio.playChime();
                      }}
                      className="px-2.5 py-1 rounded bg-amber-400 text-stone-950 text-xs font-bold hover:bg-amber-300 transition-colors flex items-center gap-1"
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

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="mt-4 pt-3 border-t border-emerald-800/80 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask about Principal, Teacher, Admin, Students, Location, Notifications, or Help..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#06140e] border border-emerald-800 text-white placeholder-emerald-700/80 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-emerald-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
