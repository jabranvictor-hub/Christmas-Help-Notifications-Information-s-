import React, { useState } from 'react';
import { SchoolNotification } from '../types';
import { CHRISTMAS_SCHOOL_INFO, saveNotifications } from '../data/schoolData';
import { 
  Bell, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  Calendar, 
  User, 
  AlertCircle, 
  CheckCircle2, 
  X,
  Volume2
} from 'lucide-react';
import { christmasAudio } from '../utils/audio';

interface NotificationsViewProps {
  notifications: SchoolNotification[];
  setNotifications: React.Dispatch<React.SetStateAction<SchoolNotification[]>>;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  setNotifications,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState<string>(CHRISTMAS_SCHOOL_INFO.staff.admin);
  const [urgent, setUrgent] = useState(false);

  const handleAddNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newNotification: SchoolNotification = {
      id: `notice_${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      author: author || CHRISTMAS_SCHOOL_INFO.staff.admin,
      urgent,
    };

    const updated = [newNotification, ...notifications];
    setNotifications(updated);
    saveNotifications(updated);
    christmasAudio.playChime([1046.5, 1318.5, 1568]);

    // Reset form
    setTitle('');
    setContent('');
    setUrgent(false);
    setShowAddModal(false);
  };

  const handleDeleteNotification = (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    saveNotifications(updated);
    christmasAudio.playChime([880, 659.2]);
  };

  const handleClearAll = () => {
    setNotifications([]);
    saveNotifications([]);
    christmasAudio.playChime([659.2, 523.2]);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl border border-amber-800/60 bg-gradient-to-br from-[#1d1506] via-[#120e04] to-[#0a0702] shadow-xl relative overflow-hidden">
        {/* Subtle decorative holiday lights */}
        <div className="absolute top-0 right-0 p-4 opacity-25 pointer-events-none select-none text-4xl">
          🔔
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-2xl">🔔</span>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                Official Notice Board
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-christmas text-white">
              Christmas School Notifications
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/80 mt-1 max-w-xl">
              Verified announcements directly from Christmas School leadership. Only notifications added to the system are shown.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                setShowAddModal(true);
                christmasAudio.playChime();
              }}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-stone-950 transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Official Notice</span>
            </button>

            {notifications.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-3 py-2.5 rounded-xl text-xs font-medium bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800/80 transition-colors"
                title="Clear all notifications"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* System Rule Guarantee Banner */}
        <div className="mt-6 pt-4 border-t border-amber-800/40 flex flex-wrap items-center justify-between gap-2 text-xs text-amber-200/70">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Strict System Integrity: Notifications are never fabricated or invented.</span>
          </div>
          <span className="font-mono text-amber-300">
            System Count: {notifications.length} Notice{notifications.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {/* Notifications Display Section */}
      <div className="space-y-4">
        {notifications.length === 0 ? (
          /* Exact mandated string if there are no notifications */
          <div className="py-16 px-6 rounded-3xl border-2 border-dashed border-emerald-800/60 bg-[#091b13]/60 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-3xl mb-4 shadow-inner">
              🔔
            </div>
            
            {/* The exact requested text */}
            <h3 className="text-xl sm:text-2xl font-bold font-christmas text-emerald-100 max-w-lg mb-2">
              There are no current Christmas School notifications.
            </h3>
            
            <p className="text-xs sm:text-sm text-emerald-300/70 max-w-md mb-6 leading-relaxed">
              When the Principal (Elijah Victor), Teacher (Aroush), or Admin (Anum) posts an official announcement, it will appear here immediately.
            </p>

            <button
              onClick={() => {
                setShowAddModal(true);
                christmasAudio.playChime();
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-800 hover:bg-emerald-700 text-amber-300 border border-emerald-600/70 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post First Notification</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {notifications.map((notice) => (
              <div
                key={notice.id}
                className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  notice.urgent
                    ? 'border-red-600/80 bg-gradient-to-r from-red-950/60 via-[#1e0a0d] to-[#120507]'
                    : 'border-emerald-800/80 bg-gradient-to-r from-[#0c2419] to-[#071710]'
                } shadow-xl relative group`}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{notice.urgent ? '🚨' : '📢'}</span>
                    <h3 className="text-lg font-bold font-christmas text-white">
                      {notice.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleDeleteNotification(notice.id)}
                    className="opacity-60 hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-red-300 hover:bg-red-950/60 transition-all"
                    title="Remove notification from system"
                    aria-label="Delete notice"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-slate-200/90 leading-relaxed mb-4 pl-7">
                  {notice.content}
                </p>

                {/* Metadata Row: Zero-Pill Typography */}
                <div className="pl-7 pt-3 border-t border-white/10 flex flex-wrap items-center gap-3 text-xs text-emerald-300/70 font-mono">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>Posted by {notice.author}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{notice.date}</span>
                  </span>
                  {notice.urgent && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-red-400 font-semibold">Priority: High</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal to Add Official Notification to the System */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#0e271c] border border-emerald-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-800/80 mb-5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📝</span>
                <div>
                  <h3 className="text-lg font-bold font-christmas text-white">
                    Post Official Christmas School Notice
                  </h3>
                  <p className="text-xs text-emerald-300/70">
                    Add verified announcement to the system
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800/60 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNotification} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-1.5">
                  Notice Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Christmas School Winter Timings"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071810] border border-emerald-800 text-white placeholder-emerald-700/80 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-1.5">
                  Official Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="e.g., Classes will resume after Christmas celebrations with special workshops by Teacher Aroush..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071810] border border-emerald-800 text-white placeholder-emerald-700/80 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-1.5">
                    Authorized Signer
                  </label>
                  <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071810] border border-emerald-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value={CHRISTMAS_SCHOOL_INFO.staff.principal}>
                      {CHRISTMAS_SCHOOL_INFO.staff.principal} (Principal)
                    </option>
                    <option value={CHRISTMAS_SCHOOL_INFO.staff.teacher}>
                      {CHRISTMAS_SCHOOL_INFO.staff.teacher} (Teacher)
                    </option>
                    <option value={CHRISTMAS_SCHOOL_INFO.staff.admin}>
                      {CHRISTMAS_SCHOOL_INFO.staff.admin} (Admin)
                    </option>
                  </select>
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={urgent}
                      onChange={(e) => setUrgent(e.target.checked)}
                      className="w-4 h-4 rounded text-red-600 bg-[#071810] border-emerald-800 focus:ring-red-500"
                    />
                    <span className="text-xs font-medium text-emerald-200">
                      Mark as Urgent Notice 🚨
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-800/80 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-emerald-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold shadow-lg transition-all"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
