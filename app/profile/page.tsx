"use client";

import Sidebar from "../sidebar/Sidebar";
import { useState } from "react";
import { 
  FaUser, 
  FaEnvelope, 
  FaShieldAlt, 
  FaBell, 
  FaLock, 
  FaCamera,
  FaCheckCircle,
  FaSave
} from "react-icons/fa";

export default function ProfileSettings() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 p-8 ml-64">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Account Calibration</h1>
            <p className="text-slate-500 font-medium font-serif italic">Manage your organizational identity and security protocols</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column: Avatar & Quick Info */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative mb-6">
                  <div className="w-32 h-32 bg-emerald-100 rounded-full mx-auto flex items-center justify-center text-5xl text-emerald-600 font-black border-4 border-white shadow-xl relative mt-4">
                    A
                  </div>
                  <button className="absolute bottom-0 right-1/4 bg-white p-2 rounded-full shadow-lg border border-slate-100 text-slate-600 hover:text-emerald-600 transition">
                    <FaCamera size={14} />
                  </button>
                </div>
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Admin User</h3>
                <p className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em] mb-4">System Commander</p>
                <div className="pt-4 border-t border-slate-50 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Active since April 2024
                </div>
              </div>

              <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 space-y-4">
                <button className="w-full flex items-center gap-3 p-4 bg-emerald-50 text-emerald-700 rounded-2xl font-black text-xs uppercase tracking-widest transition">
                  <FaUser className="opacity-50" /> Personal Identity
                </button>
                <button className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 text-slate-400 hover:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest transition">
                  <FaShieldAlt className="opacity-50" /> Security Matrix
                </button>
                <button className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 text-slate-400 hover:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest transition">
                  <FaBell className="opacity-50" /> Frequency Config
                </button>
              </div>
            </div>

            {/* Right Column: Settings Form */}
            <div className="md:col-span-2">
              <div className="bg-white p-10 rounded-[48px] shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter italic">Identity Management</h2>
                  {saved && (
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs bg-emerald-50 px-3 py-1.5 rounded-full animate-bounce">
                      <FaCheckCircle /> Synchronized
                    </div>
                  )}
                </div>

                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Displayed Name</label>
                      <div className="relative">
                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                        <input 
                          type="text" 
                          defaultValue="Admin"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Operational Rank</label>
                      <div className="relative">
                        <FaShieldAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                        <input 
                          type="text" 
                          disabled
                          defaultValue="Administrator"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-50 rounded-2xl text-slate-400 font-bold cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Communication Channel (Email)</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input 
                        type="email" 
                        defaultValue="admin@agriculture.me"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-50">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <FaLock className="text-amber-500" /> Security Pulse
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-amber-50/30 rounded-2xl border border-amber-100/50">
                        <div>
                          <p className="text-xs font-black text-amber-900 uppercase">Two-Factor Authentication</p>
                          <p className="text-[10px] text-amber-700/70 font-bold">Standard protocol requires biometric sync</p>
                        </div>
                        <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer shadow-inner">
                           <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 shadow-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleSave}
                    disabled={loading}
                    className="w-full bg-slate-900 hover:bg-black text-white py-5 rounded-2xl font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {loading ? (
                      <FaSync className="animate-spin" />
                    ) : (
                      <>
                        <FaSave /> Commit Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
