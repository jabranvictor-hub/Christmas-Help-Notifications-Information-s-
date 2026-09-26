import React, { useState } from 'react';
import { CHRISTMAS_SCHOOL_INFO } from '../data/schoolData';
import { 
  MapPin, 
  UserCheck, 
  GraduationCap, 
  Award, 
  Check, 
  Copy, 
  ShieldCheck, 
  BookOpen, 
  Sparkles,
  TreePine
} from 'lucide-react';
import { christmasAudio } from '../utils/audio';

// Visual assets generated
import schoolBannerImg from '../assets/images/christmas_school_banner_1790403842871.jpg';
import schoolTreeImg from '../assets/images/christmas_school_tree_1790403856416.jpg';

export const InformationView: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(CHRISTMAS_SCHOOL_INFO.location);
    setCopied(true);
    christmasAudio.playChime();
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="space-y-6">
      {/* Hero Showcase with Verified Information */}
      <div className="relative rounded-3xl overflow-hidden border border-emerald-700/60 bg-gradient-to-br from-[#0c2419] via-[#091b13] to-[#040e0a] shadow-2xl">
        {/* Banner Backdrop with Measured Scrim */}
        <div className="relative h-48 sm:h-64 w-full overflow-hidden">
          <img
            src={schoolBannerImg}
            alt="Christmas School building with winter garlands and festive lights"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#091b13] via-[#091b13]/60 to-transparent" />
          
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Verified Official Information</span>
          </div>
        </div>

        {/* School Overview Header */}
        <div className="p-6 sm:p-8 -mt-12 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-6 border-b border-emerald-800/80">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-3xl">🎄</span>
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-300 font-mono">
                  Official Institution
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-christmas text-white tracking-wide">
                {CHRISTMAS_SCHOOL_INFO.name}
              </h1>
              <p className="text-sm text-emerald-200/90 mt-1 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                <span>{CHRISTMAS_SCHOOL_INFO.location}</span>
              </p>
            </div>

            <button
              onClick={handleCopyAddress}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-800/90 hover:bg-emerald-700 text-amber-200 border border-emerald-600/70 transition-all flex items-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98]"
              title="Copy official school address"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Address Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-amber-300" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-xs text-emerald-300/80 block uppercase tracking-wider font-mono">Principal</span>
              <span className="text-base font-bold text-white mt-0.5 block">{CHRISTMAS_SCHOOL_INFO.staff.principal}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-xs text-emerald-300/80 block uppercase tracking-wider font-mono">Teacher</span>
              <span className="text-base font-bold text-white mt-0.5 block">{CHRISTMAS_SCHOOL_INFO.staff.teacher}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-xs text-emerald-300/80 block uppercase tracking-wider font-mono">Admin</span>
              <span className="text-base font-bold text-white mt-0.5 block">{CHRISTMAS_SCHOOL_INFO.staff.admin}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-xs text-emerald-300/80 block uppercase tracking-wider font-mono">Students</span>
              <span className="text-base font-bold text-amber-300 mt-0.5 block">{CHRISTMAS_SCHOOL_INFO.students.length} Enrolled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Faculty & Students */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Faculty & Administration */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-7 rounded-3xl border border-emerald-800/80 bg-[#0d2218]/90 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-800/60 mb-5">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🎅</span>
                <div>
                  <h2 className="text-xl font-bold font-christmas text-white">
                    School Leadership & Faculty
                  </h2>
                  <span className="text-xs text-emerald-300/70">
                    Official faculty roster for Christmas School
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-200 border border-emerald-700/60">
                Staff Roster
              </span>
            </div>

            <div className="space-y-4">
              {/* Principal Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-950/40 via-[#18090b]/60 to-transparent border border-red-800/40 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-red-900/60 border border-red-700/60 text-amber-300 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-red-300 font-semibold">
                      Principal
                    </span>
                    <span className="text-[11px] text-emerald-300/70 font-mono">Head of School</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {CHRISTMAS_SCHOOL_INFO.staff.principal}
                  </h3>
                  <p className="text-xs text-slate-300/80 mt-1">
                    Leading Christmas School with festive holiday spirit, educational excellence, and community care.
                  </p>
                </div>
              </div>

              {/* Teacher Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-[#0a2217]/60 to-transparent border border-emerald-700/50 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-semibold">
                      Teacher
                    </span>
                    <span className="text-[11px] text-emerald-300/70 font-mono">Class Instructor</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {CHRISTMAS_SCHOOL_INFO.staff.teacher}
                  </h3>
                  <p className="text-xs text-slate-300/80 mt-1">
                    Guiding students through lessons, holiday projects, reading, and creative learning activities.
                  </p>
                </div>
              </div>

              {/* Admin Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#1e1708]/60 to-transparent border border-amber-700/50 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-900/60 border border-amber-700/60 text-amber-300 shrink-0">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold">
                      Admin
                    </span>
                    <span className="text-[11px] text-amber-300/70 font-mono">School Administration</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {CHRISTMAS_SCHOOL_INFO.staff.admin}
                  </h3>
                  <p className="text-xs text-slate-300/80 mt-1">
                    Managing official school records, admissions, notifications, and operational logistics.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Details Card */}
          <div className="p-6 rounded-3xl border border-emerald-800/80 bg-[#0a1e16] shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-red-900/40 border border-red-700/50 text-red-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-christmas text-white">Campus Location</h3>
                <span className="text-xs text-emerald-300/70 font-mono">Punjab, Pakistan</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#06140e] border border-emerald-900/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-emerald-400 font-mono uppercase tracking-wider block">Official Address</span>
                <p className="text-base font-semibold text-white mt-0.5">
                  {CHRISTMAS_SCHOOL_INFO.location}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Easily accessible in Street Number 1, HMC, Punjab.
                </p>
              </div>

              <button
                onClick={handleCopyAddress}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-800 hover:bg-emerald-700 text-emerald-100 transition-colors whitespace-nowrap self-end sm:self-center"
              >
                {copied ? 'Copied!' : 'Copy Location'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Enrolled Students & Festive Tree Showcase */}
        <div className="lg:col-span-5 space-y-6">
          {/* Enrolled Students Card */}
          <div className="p-6 sm:p-7 rounded-3xl border border-emerald-800/80 bg-[#0d2218]/90 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-800/60 mb-5">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🎓</span>
                <div>
                  <h2 className="text-xl font-bold font-christmas text-white">
                    Enrolled Students
                  </h2>
                  <span className="text-xs text-emerald-300/70">
                    Active student roll at Christmas School
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-950 text-amber-300 border border-amber-600/40 font-bold">
                {CHRISTMAS_SCHOOL_INFO.students.length} Students
              </span>
            </div>

            <div className="space-y-3">
              {CHRISTMAS_SCHOOL_INFO.students.map((student, index) => (
                <div
                  key={student}
                  className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900/30 to-[#0a1e16] border border-emerald-800/60 hover:border-amber-400/50 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-700/60 flex items-center justify-center font-bold text-amber-300 group-hover:scale-105 transition-transform">
                      {student.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                        {student}
                      </h4>
                      <span className="text-xs text-emerald-300/70 font-mono">
                        Student #{index + 1} · Active Learner
                      </span>
                    </div>
                  </div>

                  <span className="text-lg">⭐</span>
                </div>
              ))}
            </div>

            <div className="mt-5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-center">
              <p className="text-xs text-emerald-200/80">
                Official records certified by <strong>{CHRISTMAS_SCHOOL_INFO.staff.principal}</strong> (Principal).
              </p>
            </div>
          </div>

          {/* Festive Christmas Tree Card */}
          <div className="p-6 rounded-3xl border border-emerald-800/80 bg-gradient-to-b from-[#0f291e] to-[#071710] shadow-xl text-center relative overflow-hidden">
            <div className="w-36 h-36 mx-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/60 mb-4 relative">
              <img
                src={schoolTreeImg}
                alt="Decorated Christmas tree with glowing ornaments"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/50 backdrop-blur-sm text-xs">
                ✨
              </div>
            </div>

            <h3 className="text-lg font-bold font-christmas text-amber-300 mb-1">
              Christmas Tree 🎄
            </h3>
            <p className="text-xs text-emerald-200/80 max-w-xs mx-auto">
              Our festive Christmas tree decorated with holiday lights and ornaments, symbolizing hope, warmth, and joy at Christmas School.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
