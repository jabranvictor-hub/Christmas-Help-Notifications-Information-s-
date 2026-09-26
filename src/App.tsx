import React, { useState, useEffect } from 'react';
import { ActiveTab, SchoolNotification } from './types';
import { CHRISTMAS_SCHOOL_INFO, getStoredNotifications } from './data/schoolData';
import { BrowserHeader } from './components/BrowserHeader';
import { LargeNavButtons } from './components/LargeNavButtons';
import { HelpView } from './components/HelpView';
import { InformationView } from './components/InformationView';
import { NotificationsView } from './components/NotificationsView';
import { AssistantView } from './components/AssistantView';
import { SnowEffect } from './components/SnowEffect';
import { christmasAudio } from './utils/audio';
import { 
  TreePine, 
  MapPin, 
  ShieldCheck, 
  Bell, 
  HelpCircle, 
  Info, 
  Sparkles, 
  GraduationCap, 
  ArrowRight,
  MessageSquare
} from 'lucide-react';

import schoolBannerImg from './assets/images/christmas_school_banner_1790403842871.jpg';
import schoolTreeImg from './assets/images/christmas_school_tree_1790403856416.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [notifications, setNotifications] = useState<SchoolNotification[]>([]);
  const [snowEnabled, setSnowEnabled] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Initialize notifications from local storage on mount
  useEffect(() => {
    const stored = getStoredNotifications();
    setNotifications(stored);
    setSoundEnabled(christmasAudio.isEnabled());
  }, []);

  return (
    <div className="min-h-screen bg-[#071610] text-slate-100 flex flex-col relative selection:bg-red-700 selection:text-white">
      {/* Falling Snow Canvas */}
      <SnowEffect enabled={snowEnabled} />

      {/* Top Browser Navigation & URL Bar */}
      <BrowserHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        snowEnabled={snowEnabled}
        setSnowEnabled={setSnowEnabled}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        notificationCount={notifications.length}
      />

      {/* Main App Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Large Navigation Buttons for the 3 Key Features (Always readily accessible) */}
        <LargeNavButtons
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          notificationCount={notifications.length}
        />

        {/* Tab Specific Views */}
        {activeTab === 'home' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Hero Portal Banner */}
            <div className="relative rounded-3xl overflow-hidden border border-emerald-700/70 bg-gradient-to-br from-[#0c261b] via-[#081e14] to-[#04100b] shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-10">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl select-none">🎄</span>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300 px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-700/80">
                      Welcome to Christmas Browser
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-extrabold font-christmas text-white tracking-tight leading-tight">
                    Christmas School 🎄
                  </h1>

                  <p className="text-sm sm:text-base text-emerald-200/90 leading-relaxed">
                    A simple, friendly, holiday-themed web app providing verified school help, accurate faculty and student information, and official notifications.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-emerald-300 font-mono">
                    <span className="flex items-center gap-1.5 bg-[#06170f] px-3 py-1.5 rounded-xl border border-emerald-800">
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      <span>{CHRISTMAS_SCHOOL_INFO.location}</span>
                    </span>
                    <span className="flex items-center gap-1.5 bg-[#06170f] px-3 py-1.5 rounded-xl border border-emerald-800">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>Official Web App · No WhatsApp Required</span>
                    </span>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => {
                        setActiveTab('information');
                        christmasAudio.playChime();
                      }}
                      className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-red-700 hover:bg-red-600 text-white transition-all shadow-lg hover:shadow-red-600/30 flex items-center gap-2"
                    >
                      <Info className="w-4 h-4 text-amber-300" />
                      <span>View School Information ℹ️</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('notifications');
                        christmasAudio.playChime();
                      }}
                      className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-emerald-800 hover:bg-emerald-700 text-amber-200 border border-emerald-600/70 transition-all flex items-center gap-2"
                    >
                      <Bell className="w-4 h-4 text-amber-300" />
                      <span>View Notifications ({notifications.length}) 🔔</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('help');
                        christmasAudio.playChime();
                      }}
                      className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all flex items-center gap-2"
                    >
                      <HelpCircle className="w-4 h-4 text-amber-300" />
                      <span>Help & Chat 🤝</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-600/60 group">
                    <img
                      src={schoolBannerImg}
                      alt="Christmas School building with glowing lights and winter snow"
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                      <div>
                        <span className="text-xs font-mono text-amber-300 uppercase tracking-wider block">
                          Punjab, HMC, Street Number 1
                        </span>
                        <span className="text-sm font-bold text-white font-christmas">
                          Christmas School Campus 🎄
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Status & Directory Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quick Official Information Card */}
              <div className="p-6 rounded-3xl border border-emerald-800/80 bg-[#0a1e16] shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-emerald-800/60 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">ℹ️</span>
                      <h3 className="text-lg font-bold font-christmas text-white">
                        Christmas School Directory
                      </h3>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('information');
                        christmasAudio.playChime();
                      }}
                      className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 font-semibold"
                    >
                      <span>Full Directory</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-200">
                    <div className="flex justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                      <span className="text-emerald-300 font-mono">School Name:</span>
                      <strong className="text-white">{CHRISTMAS_SCHOOL_INFO.name}</strong>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                      <span className="text-emerald-300 font-mono">Location:</span>
                      <strong className="text-white text-right">{CHRISTMAS_SCHOOL_INFO.location}</strong>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                      <span className="text-emerald-300 font-mono">Principal:</span>
                      <strong className="text-white">{CHRISTMAS_SCHOOL_INFO.staff.principal}</strong>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                      <span className="text-emerald-300 font-mono">Teacher:</span>
                      <strong className="text-white">{CHRISTMAS_SCHOOL_INFO.staff.teacher}</strong>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                      <span className="text-emerald-300 font-mono">Admin:</span>
                      <strong className="text-white">{CHRISTMAS_SCHOOL_INFO.staff.admin}</strong>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                      <span className="text-emerald-300 font-mono">Students:</span>
                      <strong className="text-amber-300">{CHRISTMAS_SCHOOL_INFO.students.join(', ')}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-800/60 flex items-center justify-between text-xs text-emerald-300/70">
                  <span>100% Certified School Records</span>
                  <span className="text-amber-400">🎄 Verified</span>
                </div>
              </div>

              {/* Quick Notifications Status Card */}
              <div className="p-6 rounded-3xl border border-amber-800/80 bg-[#161206] shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-amber-800/60 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🔔</span>
                      <h3 className="text-lg font-bold font-christmas text-white">
                        Current Notifications
                      </h3>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('notifications');
                        christmasAudio.playChime();
                      }}
                      className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 font-semibold"
                    >
                      <span>Open Board</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {notifications.length === 0 ? (
                    <div className="p-6 rounded-2xl bg-amber-950/30 border border-amber-900/60 text-center space-y-2">
                      <span className="text-2xl block">🔕</span>
                      <p className="text-sm font-bold text-amber-200">
                        There are no current Christmas School notifications.
                      </p>
                      <p className="text-xs text-amber-300/60">
                        Only verified notices explicitly added to the system will appear.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {notifications.slice(0, 2).map((n) => (
                        <div key={n.id} className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/50">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <strong className="text-white truncate">{n.title}</strong>
                            <span className="text-[11px] text-amber-400 font-mono">{n.date}</span>
                          </div>
                          <p className="text-xs text-slate-300 line-clamp-2">{n.content}</p>
                        </div>
                      ))}
                      {notifications.length > 2 && (
                        <span className="text-xs text-amber-300/70 block text-center pt-1 font-mono">
                          +{notifications.length - 2} more notification(s) on board
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-amber-800/60 flex items-center justify-between text-xs text-amber-300/70">
                  <span>System Rule: Never invent notifications</span>
                  <span className="font-mono text-amber-400">{notifications.length} active</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'help' && (
          <div className="animate-in fade-in duration-300">
            <HelpView setActiveTab={setActiveTab} notifications={notifications} />
          </div>
        )}

        {activeTab === 'information' && (
          <div className="animate-in fade-in duration-300">
            <InformationView />
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="animate-in fade-in duration-300">
            <NotificationsView
              notifications={notifications}
              setNotifications={setNotifications}
            />
          </div>
        )}

        {activeTab === 'assistant' && (
          <div className="animate-in fade-in duration-300">
            <AssistantView
              notifications={notifications}
              setActiveTab={setActiveTab}
            />
          </div>
        )}
      </main>

      {/* Clean Footer adhering to Universal Design Constitution */}
      <footer className="mt-12 border-t border-emerald-900/80 bg-[#05110c] py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-300/70">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎄</span>
            <span className="font-bold text-white font-christmas tracking-wider">
              Christmas Browser
            </span>
            <span aria-hidden="true">·</span>
            <span>Christmas School, Punjab, HMC, Street Number 1</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>Principal: Elijah Victor</span>
            <span aria-hidden="true">·</span>
            <span>Teacher: Aroush</span>
            <span aria-hidden="true">·</span>
            <span>Admin: Anum</span>
            <span aria-hidden="true">·</span>
            <span>Students: Arnan, Balaj, Eliab</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
