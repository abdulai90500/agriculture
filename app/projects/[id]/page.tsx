"use client";

import Sidebar from "../../sidebar/Sidebar";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { getProject, toggleProjectStatus, type Project } from "../actions";
import { 
  FaArrowLeft, 
  FaEdit, 
  FaTrash, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaDollarSign, 
  FaInfoCircle,
  FaCheckCircle,
  FaRegCheckCircle,
  FaHistory,
  FaChartLine,
  FaTimes
} from "react-icons/fa";

export default function ViewProject({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toggling, setToggling] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadProject = async () => {
    const data = await getProject(id);
    if (data) {
      setProject(data);
    } else {
      setError("Project not found");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProject();
  }, [id]);

  const handleToggleStatus = async () => {
    if (!project) return;
    setToggling(true);
    try {
      const result = await toggleProjectStatus(id, project.status);
      if (result.success) {
        setMessage({ 
          type: 'success', 
          text: `Project marked as ${result.newStatus === 'completed' ? 'Complete' : 'Active'}!` 
        });
        loadProject();
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Error updating status.' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Error toggling status.' });
    } finally {
      setToggling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <div className="ml-64 flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );
  }

  if (!project || error) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <div className="ml-64 flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-xl font-bold text-slate-800">{error || "Project Not Found"}</p>
          <button onClick={() => router.push('/projects')} className="bg-emerald-600 text-white px-6 py-2 rounded-xl">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "completed": 
      case "successful": return "bg-blue-100 text-blue-800 border-blue-200";
      case "planning": return "bg-amber-100 text-amber-800 border-amber-200";
      case "cancelled": return "bg-rose-100 text-rose-800 border-rose-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getStatusLabel = (status: string) => {
    if (status.toLowerCase() === 'completed') return 'Successful';
    return status;
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />

      <div className="ml-64 flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header & Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <button 
                onClick={() => router.push('/projects')}
                className="flex items-center gap-2 text-slate-400 hover:text-emerald-700 transition-colors font-bold mb-4 group"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Hub
              </button>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic underline decoration-emerald-500/30 decoration-8 underline-offset-8">
                  {project.name}
                </h1>
                <span className={`px-4 py-1.5 rounded-full border text-xs font-black uppercase tracking-[0.2em] ${getStatusStyle(project.status)}`}>
                  {getStatusLabel(project.status)}
                </span>
              </div>
              <p className="text-slate-500 font-bold flex items-center gap-2">
                <FaHistory className="text-slate-300" /> Tracked since {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleToggleStatus}
                disabled={toggling}
                className={`flex items-center gap-2 px-8 py-4 rounded-2xl transition-all shadow-xl font-black uppercase tracking-widest text-sm ${
                  project.status.toLowerCase() === 'completed'
                    ? "bg-slate-100 text-slate-600 hover:bg-emerald-600 hover:text-white shadow-emerald-200"
                    : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200"
                }`}
              >
                {project.status.toLowerCase() === 'completed' ? <FaRegCheckCircle /> : <FaCheckCircle />}
                {toggling ? "Processing..." : project.status.toLowerCase() === 'completed' ? "Set as Active" : "Set as Complete"}
              </button>
              <button
                onClick={() => router.push(`/projects/${id}/edit`)}
                className="flex items-center gap-2 bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 px-8 py-4 rounded-2xl transition-all font-black uppercase tracking-widest text-sm"
              >
                <FaEdit /> Calibrate
              </button>
              <button
                onClick={() => router.push(`/projects/${id}/delete`)}
                className="flex items-center gap-2 bg-white text-rose-600 hover:bg-rose-50 border border-rose-100 px-8 py-4 rounded-2xl transition-all font-black uppercase tracking-widest text-sm"
              >
                <FaTrash /> Decommission
              </button>
            </div>
          </div>

          {/* Toast Notification */}
          {message && (
            <div className={`fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-right-8 duration-300 p-4 rounded-2xl shadow-2xl border ${
              message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${message.type === 'success' ? 'bg-emerald-200' : 'bg-rose-200'}`}>
                  {message.type === 'success' ? <FaCheckCircle /> : <FaTimes />}
                </div>
                <p className="font-bold">{message.text}</p>
              </div>
            </div>
          )}

          {/* Key Insight Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left: Description Card */}
            <div className="lg:col-span-2 bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                    <FaInfoCircle />
                  </div>
                  <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Executive Summary</h2>
                </div>
                <p className="text-xl text-slate-600 leading-relaxed font-serif italic mb-8">
                  "{project.description || "In the absence of a defined strategic overview, this initiative continues to serve its primary operational mandates across selected agricultural territories."}"
                </p>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 pt-8 border-t border-slate-50">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Operational Area</h4>
                  <p className="font-bold text-slate-900 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-emerald-500" /> {project.location || "Central Sector"}
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Fiscal Budget</h4>
                  <p className="font-bold text-slate-900 flex items-center gap-2">
                    <FaDollarSign className="text-amber-500" /> ${project.budget?.toLocaleString() || "0"}
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Sync Code</h4>
                  <p className="font-mono text-[10px] text-slate-400">{project.id}</p>
                </div>
              </div>
            </div>

            {/* Right: Timeline & Roadmap */}
            <div className="bg-emerald-900 text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-800 rounded-full -translate-y-12 translate-x-12 opacity-50"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-emerald-800/50 text-emerald-200 rounded-2xl">
                      <FaCalendarAlt />
                    </div>
                    <h2 className="text-xl font-black uppercase tracking-tight">Mission Roadmap</h2>
                  </div>

                  <div className="space-y-8">
                    <div className="flex gap-4 relative">
                      <div className="absolute left-3 top-6 w-0.5 h-12 bg-emerald-700"></div>
                      <div className="w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center text-[10px] font-black text-emerald-900 shrink-0">1</div>
                      <div>
                        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.1em]">Activation</p>
                        <p className="font-bold text-lg">{project.startDate ? new Date(project.startDate).toLocaleDateString() : 'TBD'}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-black text-emerald-100 shrink-0">2</div>
                      <div>
                        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.1em]">Target Completion</p>
                        <p className="font-bold text-lg">{project.endDate ? new Date(project.endDate).toLocaleDateString() : 'TBD'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 bg-emerald-800/30 p-6 rounded-3xl border border-emerald-700/50">
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">Operational Health</span>
                     <span className="text-xs font-bold text-emerald-200">
                       {project.status.toLowerCase() === 'completed' ? '100%' : '65%'}
                     </span>
                   </div>
                   <div className="w-full h-1.5 bg-emerald-950 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-400 transition-all duration-1000" 
                        style={{ width: project.status.toLowerCase() === 'completed' ? '100%' : '65%' }}
                      ></div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Data Quality", value: "Verified", icon: <FaCheckCircle />, color: "text-emerald-500", bg: "bg-emerald-50" },
              { label: "Reporting Frequency", value: "Quarterly", icon: <FaChartLine />, color: "text-blue-500", bg: "bg-blue-50" },
              { label: "Stakeholders", value: "External", icon: <FaHistory />, color: "text-purple-500", bg: "bg-purple-50" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 flex items-center gap-6">
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} text-xl`}>
                  {stat.icon}
                </div>
                <div>
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</h4>
                   <p className="text-xl font-black text-slate-800 tracking-tight">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
