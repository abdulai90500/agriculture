"use client";

import Sidebar from "../../sidebar/Sidebar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "../actions";
import { 
  FaArrowLeft, 
  FaSave, 
  FaTimes, 
  FaInfoCircle, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaDollarSign 
} from "react-icons/fa";

export default function AddProject() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await createProject(formData);
      if (result.success) {
        router.push('/projects');
      } else {
        setError(result.error || "Failed to create project");
        setLoading(false);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="ml-64 flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb / Back */}
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-500 hover:text-emerald-700 transition-colors font-bold mb-8 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
          </button>

          <header className="mb-10">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Launch Initiative
            </h1>
            <p className="text-slate-600 font-medium">
              Create a new strategic agricultural project and define its operational scope
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl flex items-center gap-3">
                <FaTimes className="bg-rose-200 p-1 rounded-full" />
                <span className="font-bold">{error}</span>
              </div>
            )}

            {/* Core Details Card */}
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600"></div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <FaInfoCircle />
                </div>
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Core Mission</h2>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">
                    Project Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Sustainable Irrigation Expansion 2026"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">
                    Strategic Overview
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    placeholder="Describe the primary objectives, stakeholders, and intended impact..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                  />
                </div>
              </div>
            </div>

            {/* Operational Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Location & Budget */}
              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                    <FaMapMarkerAlt />
                  </div>
                  <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Scope</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Location</label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input
                        name="location"
                        type="text"
                        placeholder="Region, District, or Coordinates"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Investment Budget ($)</label>
                    <div className="relative">
                      <FaDollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input
                        name="budget"
                        type="number"
                        placeholder="0.00"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                    <FaCalendarAlt />
                  </div>
                  <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Timeline</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Activation Date</label>
                    <input
                      name="startDate"
                      type="date"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 outline-none transition-all font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Target Completion</label>
                    <input
                      name="endDate"
                      type="date"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 outline-none transition-all font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-10 border-t border-slate-200">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-black py-5 rounded-[24px] shadow-xl hover:shadow-emerald-200 transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <FaSave /> {loading ? "Deploying Initiative..." : "Deploy New Project"}
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-10 bg-white text-slate-500 hover:text-slate-800 border border-slate-200 font-bold rounded-[24px] transition-all hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
