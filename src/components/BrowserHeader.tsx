import React from 'react';
import { ActiveTab } from '../types';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  HelpCircle, 
  Info, 
  Bell, 
  Home as HomeIcon,
  MessageSquare
} from 'lucide-react';
import { christmasAudio } from '../utils/audio';

interface BrowserHeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  snowEnabled: boolean;
  setSnowEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  notificationCount: number;
}

export const BrowserHeader: React.FC<BrowserHeaderProps> = ({
  activeTab,
  setActiveTab,
  snowEnabled,
  setSnowEnabled,
  soundEnabled,
  setSoundEnabled,
  notificationCount,
}) => {
  const getTabUrl = () => {
    switch (activeTab) {
      case 'home':
        return 'christmas://school.punjab.hmc/home';
      case 'help':
        return 'christmas://school.punjab.hmc/help';
      case 'information':
        return 'christmas://school.punjab.hmc/information';
      case 'notifications':
        return 'christmas://school.punjab.hmc/notifications';
      case 'assistant':
        return 'christmas://school.punjab.hmc/assistant';
    }
  };

  const handleSoundToggle = () => {
    const newState = christmasAudio.toggle();
    setSoundEnabled(newState);
    if (newState) {
      christmasAudio.playChime();
    }
  };

  const handleRefresh = () => {
    christmasAudio.playSleighBells();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0d281e]/95 backdrop-blur-md border-b border-emerald-800/80 shadow-lg">
      {/* Festive Fairy Lights Garland */}
      <div className="w-full flex justify-around items-center px-4 pt-1.5 pb-1 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => {
          const colors = [
            'bg-red-500 shadow-red-500/70',
            'bg-amber-400 shadow-amber-400/80',
            'bg-emerald-400 shadow-emerald-400/70',
            'bg-blue-400 shadow-blue-400/70',
            'bg-yellow-300 shadow-yellow-300/80',
          ];
          const colorClass = colors[i % colors.length];
          const delay = `${(i % 5) * 0.4}s`;
          return (
            <div key={i} className="flex flex-col items-center">
              <div className="w-1.5 h-1.5 bg-emerald-950 rounded-t-sm" />
              <div
                className={`w-2.5 h-3.5 rounded-full shadow-md animate-twinkle ${colorClass}`}
                style={{ animationDelay: delay }}
              />
            </div>
          );
        })}
      </div>

      {/* Browser Window Bar & Navigation Controls */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => { setActiveTab('home'); christmasAudio.playChime(); }}
              className="flex items-center gap-2 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-md"
              title="Christmas Browser Home"
            >
              <span className="text-2xl select-none transition-transform group-hover:scale-110 duration-200">🎄</span>
              <div>
                <span className="text-lg font-bold font-christmas text-amber-300 tracking-wide block leading-none">
                  Christmas Browser
                </span>
                <span className="text-[11px] text-emerald-200/80 font-sans tracking-wider uppercase">
                  Official Christmas School Portal
                </span>
              </div>
            </button>
          </div>

          {/* Quick Browser Controls for Small Devices */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={() => setSnowEnabled(!snowEnabled)}
              className={`p-2 rounded-lg text-xs transition-colors ${
                snowEnabled ? 'bg-emerald-800 text-amber-300' : 'bg-emerald-950/60 text-slate-400'
              }`}
              title={snowEnabled ? 'Disable falling snow' : 'Enable falling snow'}
              aria-label="Toggle snow"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              onClick={handleSoundToggle}
              className={`p-2 rounded-lg text-xs transition-colors ${
                soundEnabled ? 'bg-emerald-800 text-amber-300' : 'bg-emerald-950/60 text-slate-400'
              }`}
              title={soundEnabled ? 'Mute chimes' : 'Unmute chimes'}
              aria-label="Toggle chimes"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Browser URL & Action Address Bar */}
        <div className="w-full md:flex-1 max-w-xl flex items-center gap-1.5 bg-[#071912] border border-emerald-800/80 rounded-xl px-2.5 py-1.5 shadow-inner">
          <div className="flex items-center gap-1 text-emerald-400/80">
            <button
              onClick={() => { setActiveTab('home'); christmasAudio.playChime(); }}
              className="p-1 rounded hover:bg-emerald-800/40 text-emerald-300 transition-colors"
              title="Back to Home"
              aria-label="Home"
            >
              <HomeIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (activeTab === 'home') setActiveTab('help');
                else if (activeTab === 'help') setActiveTab('information');
                else if (activeTab === 'information') setActiveTab('notifications');
                else setActiveTab('home');
                christmasAudio.playChime();
              }}
              className="p-1 rounded hover:bg-emerald-800/40 text-emerald-400 transition-colors"
              title="Next Section"
              aria-label="Forward"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleRefresh}
              className="p-1 rounded hover:bg-emerald-800/40 text-emerald-400 transition-colors"
              title="Refresh Festive Page"
              aria-label="Refresh"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 px-2 py-0.5 text-xs text-emerald-200/90 font-mono flex items-center gap-1.5 truncate border-l border-emerald-800/60 pl-2.5">
            <span className="text-amber-400">🔒</span>
            <span className="truncate">{getTabUrl()}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => { setActiveTab('assistant'); christmasAudio.playChime(); }}
              className={`px-2 py-1 rounded text-xs flex items-center gap-1 font-medium transition-colors ${
                activeTab === 'assistant'
                  ? 'bg-amber-500 text-emerald-950 font-bold'
                  : 'bg-emerald-900/60 text-amber-200 hover:bg-emerald-800'
              }`}
              title="Ask Christmas School Assistant"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask School</span>
            </button>
          </div>
        </div>

        {/* Desktop Controls & Toggles */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => {
              setSnowEnabled(!snowEnabled);
              christmasAudio.playChime();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              snowEnabled
                ? 'bg-emerald-800 text-amber-300 border border-emerald-700 shadow-sm'
                : 'bg-emerald-950/80 text-emerald-300/70 border border-emerald-900/80 hover:bg-emerald-900'
            }`}
            title="Toggle falling snow animation"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Snow: {snowEnabled ? 'On' : 'Off'}</span>
          </button>

          <button
            onClick={handleSoundToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              soundEnabled
                ? 'bg-emerald-800 text-amber-300 border border-emerald-700 shadow-sm'
                : 'bg-emerald-950/80 text-emerald-300/70 border border-emerald-900/80 hover:bg-emerald-900'
            }`}
            title="Toggle holiday audio chimes"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>Chimes: {soundEnabled ? 'On' : 'Muted'}</span>
          </button>
        </div>
      </div>

      {/* Main Feature Tabs Navigation */}
      <div className="bg-[#091e16] border-t border-emerald-900/80">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center sm:justify-start gap-1 sm:gap-2 py-1.5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => { setActiveTab('home'); christmasAudio.playChime(); }}
            className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'home'
                ? 'bg-red-800 text-white shadow-sm font-semibold'
                : 'text-emerald-200/90 hover:text-white hover:bg-emerald-900/60'
            }`}
          >
            <span>🎄</span>
            <span>Home</span>
          </button>

          <button
            onClick={() => { setActiveTab('help'); christmasAudio.playChime(); }}
            className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'help'
                ? 'bg-red-800 text-white shadow-sm font-semibold'
                : 'text-emerald-200/90 hover:text-white hover:bg-emerald-900/60'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-amber-300" />
            <span>HELP 🤝</span>
          </button>

          <button
            onClick={() => { setActiveTab('information'); christmasAudio.playChime(); }}
            className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'information'
                ? 'bg-red-800 text-white shadow-sm font-semibold'
                : 'text-emerald-200/90 hover:text-white hover:bg-emerald-900/60'
            }`}
          >
            <Info className="w-4 h-4 text-emerald-300" />
            <span>INFORMATION ℹ️</span>
          </button>

          <button
            onClick={() => { setActiveTab('notifications'); christmasAudio.playChime(); }}
            className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1.5 relative ${
              activeTab === 'notifications'
                ? 'bg-red-800 text-white shadow-sm font-semibold'
                : 'text-emerald-200/90 hover:text-white hover:bg-emerald-900/60'
            }`}
          >
            <Bell className="w-4 h-4 text-amber-300" />
            <span>NOTIFICATIONS 🔔</span>
            {notificationCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-pulse" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
