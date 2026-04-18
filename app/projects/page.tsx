"use client";

import Sidebar from "../sidebar/Sidebar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProjects, deleteProject, toggleProjectStatus, type Project } from "./actions";
import { 
  FaProjectDiagram, 
  FaCalendarAlt, 
  FaDollarSign, 
  FaCheckCircle, 
  FaRegCheckCircle,
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaMapMarkerAlt,
  FaArrowRight
} from "react-icons/fa";

export default function Projects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDeleteProject = async (projectId: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) return;

    try {
      const result = await deleteProject(projectId);
      if (result.success) {
        setMessage({ type: 'success', text: 'Project deleted successfully!' });
        fetchProjects();
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Error deleting project.' });
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      setMessage({ type: 'error', text: 'Error deleting project.' });
    }
  };

  const handleToggleStatus = async (projectId: string, currentStatus: string) => {
    try {
      const result = await toggleProjectStatus(projectId, currentStatus);
      if (result.success) {
        setMessage({ 
          type: 'success', 
          text: `Project marked as ${result.newStatus === 'completed' ? 'Complete' : 'Active'}!` 
        });
        fetchProjects();
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Error updating status.' });
      }
    } catch (error) {
      console.error('Error toggling status:', error);
      setMessage({ type: 'error', text: 'Error toggling status.' });
    }
  };

  const getStatusColor = (status: string) => {
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

  // Metrics calculations
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status.toLowerCase() === 'active').length;
  const totalBudget = projects.reduce((sum, p) => sum + (p.budget || 0), 0);
  const successfulProjectsCount = projects.filter(p => p.status.toLowerCase() === 'completed').length;
  const completionRatePercentage = totalProjects > 0 
    ? Math.round((successfulProjectsCount / totalProjects) * 100) 
    : 0;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="ml-64 flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                Project Dashboard
              </h1>
              <p className="text-slate-600 font-medium">
                Strategic agricultural initiatives & impact monitoring
              </p>
            </div>
            <button
              onClick={() => router.push('/projects/add')}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-emerald-200 active:scale-95 font-bold"
            >
              <FaPlus /> New Project
            </button>
          </div>

          {/* Toast Notification */}
          {message && (
            <div className={`fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-right-8 duration-300 p-4 rounded-2xl shadow-2xl border ${
              message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${message.type === 'success' ? 'bg-emerald-200' : 'bg-rose-200'}`}>
                  {message.type === 'success' ? <FaCheckCircle /> : <FaTrash />}
                </div>
                <p className="font-bold">{message.text}</p>
              </div>
            </div>
          )}

          {/* Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Total Projects", value: totalProjects, icon: <FaProjectDiagram />, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Active", value: activeProjects, icon: <FaCalendarAlt />, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Total Budget", value: `$${totalBudget.toLocaleString()}`, icon: <FaDollarSign />, color: "text-amber-600", bg: "bg-amber-50" },
              { label: "Successful Projects", value: successfulProjectsCount, icon: <FaCheckCircle />, color: "text-blue-600", bg: "bg-blue-50" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} text-xl group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider mb-1">{stat.label}</h3>
                <p className="text-3xl font-black text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Project Hub Table */}
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden mb-12">
            <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
              <h2 className="text-xl font-black text-slate-800">Initiative Registry</h2>
              <div className="px-4 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-500 uppercase">
                {projects.length} Entries
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/30">
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Project Details</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Location</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Lifecycle</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Investment</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Command</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    [...Array(3)].map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan={5} className="px-8 py-10"><div className="h-4 bg-slate-100 rounded w-1/4"></div></td>
                      </tr>
                    ))
                  ) : projects.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="p-6 bg-slate-50 rounded-full text-slate-200 text-4xl"><FaProjectDiagram /></div>
                          <p className="text-slate-400 font-bold">No projects registered yet.</p>
                          <button onClick={() => router.push('/projects/add')} className="text-emerald-600 font-black hover:underline flex items-center gap-2">
                            Launch your first project <FaArrowRight />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    projects.map((project) => (
                      <tr key={project.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6">
                          <div>
                            <div className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors uppercase tracking-tight">
                              {project.name}
                            </div>
                            <div className="text-sm font-medium text-slate-400 line-clamp-1 max-w-xs lowercase">
                              {project.description || "No strategic overview provided"}
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2 text-slate-600 font-bold">
                            <FaMapMarkerAlt className="text-slate-300" /> {project.location || "Central Base"}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col gap-2">
                            <span className={`inline-flex items-center px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${getStatusColor(project.status)}`}>
                              {getStatusLabel(project.status)}
                            </span>
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                              {project.startDate ? new Date(project.startDate).getFullYear() : 'TBD'} - {project.endDate ? new Date(project.endDate).getFullYear() : 'TBD'}
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="text-lg font-black text-slate-900">
                            {project.budget ? `$${project.budget.toLocaleString()}` : "—"}
                          </div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">USD Investment</div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex justify-end gap-2 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            <button
                              onClick={() => handleToggleStatus(project.id, project.status)}
                              className={`p-3 rounded-xl shadow-sm border border-slate-100 transition-all ${
                                project.status.toLowerCase() === 'completed' 
                                  ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                                  : 'bg-white text-slate-400 hover:text-emerald-600 hover:border-emerald-200'
                              }`}
                              title={project.status.toLowerCase() === 'completed' ? "Re-open Project" : "Mark as Complete"}
                            >
                              {project.status.toLowerCase() === 'completed' ? <FaCheckCircle /> : <FaRegCheckCircle />}
                            </button>
                            <button
                              onClick={() => router.push(`/projects/${project.id}`)}
                              className="p-3 bg-white text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl shadow-sm border border-slate-100 transition-all"
                              title="Deep View"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => router.push(`/projects/${project.id}/edit`)}
                              className="p-3 bg-white text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl shadow-sm border border-slate-100 transition-all"
                              title="Calibrate"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.id, project.name)}
                              className="p-3 bg-white text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl shadow-sm border border-slate-100 transition-all"
                              title="Decommission"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}