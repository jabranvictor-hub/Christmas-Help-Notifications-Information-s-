import React from 'react';
import { ActiveTab } from '../types';
import { HelpCircle, Info, Bell, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { christmasAudio } from '../utils/audio';

interface LargeNavButtonsProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  notificationCount: number;
}

export const LargeNavButtons: React.FC<LargeNavButtonsProps> = ({
  activeTab,
  setActiveTab,
  notificationCount,
}) => {
  const buttons = [
    {
      id: 'help' as ActiveTab,
      label: 'HELP',
      emoji: '🤝',
      title: 'HELP 🤝',
      subtitle: 'Live Help Chat & Browser Instructions',
      description: 'Open to chat with Christmas School Help, get browser guidance, and read FAQs.',
      themeBg: 'from-emerald-950 via-[#0a2e20] to-[#082419]',
      accentColor: 'text-amber-300',
      badgeBorder: 'border-emerald-600/60 hover:border-amber-400/80',
      icon: HelpCircle,
      tag: 'Live Chat & Guides',
    },
    {
      id: 'information' as ActiveTab,
      label: 'INFORMATION',
      emoji: 'ℹ️',
      title: 'INFORMATION ℹ️',
      subtitle: 'Official Christmas School Directory',
      description: 'Accurate details: School Name, Location, Principal, Teacher, Admin, & Students.',
      themeBg: 'from-[#2b0c10] via-[#1c080b] to-[#120507]',
      accentColor: 'text-red-400',
      badgeBorder: 'border-red-700/60 hover:border-red-400/80',
      icon: Info,
      tag: 'School Directory',
    },
    {
      id: 'notifications' as ActiveTab,
      label: 'NOTIFICATIONS',
      emoji: '🔔',
      title: 'NOTIFICATIONS 🔔',
      subtitle: 'Official School Announcements',
      description: 'Displays verified notices added to the system. Never invent notices.',
      themeBg: 'from-[#2b2108] via-[#1a1405] to-[#120d03]',
      accentColor: 'text-amber-400',
      badgeBorder: 'border-amber-700/60 hover:border-amber-400/80',
      icon: Bell,
      tag: notificationCount > 0 ? `${notificationCount} Active` : '0 Active',
      statusNotice: notificationCount === 0 ? 'No current notices' : `${notificationCount} notice available`,
    },
  ];

  return (
    <section className="w-full my-6" aria-label="Main Navigation">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎄</span>
          <h2 className="text-sm font-semibold tracking-wider uppercase text-emerald-200/90">
            Main Features Navigation
          </h2>
        </div>
        <span className="text-xs text-emerald-300/60 font-mono">
          Select any feature below
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {buttons.map((btn) => {
          const isActive = activeTab === btn.id;
          const Icon = btn.icon;

          return (
            <button
              key={btn.id}
              onClick={() => {
                setActiveTab(btn.id);
                christmasAudio.playChime();
              }}
              className={`group relative text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl ${
                isActive
                  ? 'border-amber-400 ring-2 ring-amber-400/50 scale-[1.02] shadow-amber-500/20'
                  : `${btn.badgeBorder} hover:scale-[1.01] hover:shadow-2xl`
              } bg-gradient-to-br ${btn.themeBg}`}
            >
              {/* Decorative Corner Holly Accents */}
              <div className="absolute top-0 right-0 p-3 opacity-30 group-hover:opacity-80 transition-opacity pointer-events-none">
                <span className="text-2xl select-none">❄️</span>
              </div>

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl p-2 rounded-xl bg-white/10 backdrop-blur-sm shadow-inner group-hover:rotate-6 transition-transform">
                      {btn.emoji}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
                      {btn.tag}
                    </span>
                  </div>

                  <span className="text-xs px-2.5 py-1 rounded-full font-mono bg-white/10 text-emerald-100 border border-white/15">
                    {btn.label}
                  </span>
                </div>

                {/* Big Button Title */}
                <h3 className="text-xl sm:text-2xl font-bold font-christmas text-white group-hover:text-amber-200 transition-colors mb-1.5 flex items-center gap-2">
                  <span>{btn.title}</span>
                </h3>

                {/* Subtitle & Description */}
                <p className="text-sm font-medium text-emerald-200/90 mb-2 leading-snug">
                  {btn.subtitle}
                </p>
                <p className="text-xs text-slate-300/80 leading-relaxed">
                  {btn.description}
                </p>
              </div>

              {/* Action Bottom Bar */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-200 flex items-center gap-1 group-hover:text-amber-300 transition-colors">
                  <span>Open {btn.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </span>

                {btn.statusNotice && (
                  <span className="text-[11px] text-amber-300/80 font-mono">
                    {btn.statusNotice}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
