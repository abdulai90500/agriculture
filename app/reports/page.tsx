"use client";

import Sidebar from "../sidebar/Sidebar";
import { useState, useEffect } from "react";
import { 
  FaFileAlt, 
  FaDownload, 
  FaEye, 
  FaChartBar, 
  FaUsers, 
  FaSeedling, 
  FaProjectDiagram, 
  FaSync, 
  FaTable 
} from "react-icons/fa";
import { getReportSummaries, getRecentActivities, exportDataToCSV } from "./actions";

export default function Reports() {
  const [summaries, setSummaries] = useState<any>(null);
  const [recentReports, setRecentReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [sumData, recentData] = await Promise.all([
        getReportSummaries(),
        getRecentActivities()
      ]);
      setSummaries(sumData);
      setRecentReports(recentData);
    } catch (error) {
      console.error("Error loading reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDownloadCSV = async (category: string) => {
    setExporting(category);
    try {
      const csvData = await exportDataToCSV(category);
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', `${category}_report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setExporting(null);
    }
  };

  const reportCategories = summaries ? [
    {
      id: "farmers",
      title: "Farmer Reports",
      description: "Data on farmer registration, status, and demographics",
      icon: <FaUsers className="text-2xl text-emerald-600" />,
      stats: [
        { name: "Total Registered", value: summaries.farmers.total },
        { name: "Currently Active", value: summaries.farmers.active },
        { name: "System Inactive", value: summaries.farmers.inactive }
      ]
    },
    {
      id: "projects",
      title: "Project Reports",
      description: "Mission progress, status, and fiscal summaries",
      icon: <FaProjectDiagram className="text-2xl text-blue-600" />,
      stats: [
        { name: "Active Initiatives", value: summaries.projects.active },
        { name: "Successful Missions", value: summaries.projects.successful },
        { name: "Fiscal Budget", value: `$${summaries.projects.budget.toLocaleString()}` }
      ]
    },
    {
      id: "livestock",
      title: "Livestock Reports",
      description: "Population health and productivity analytics",
      icon: <FaSeedling className="text-2xl text-amber-600" />,
      stats: [
        { name: "Total Population", value: summaries.livestock.population },
        { name: "Registry Entries", value: summaries.livestock.totalEntries },
        { name: "Health Index", value: "Verified" }
      ]
    },
    {
      id: "crops",
      title: "Crop Reports",
      description: "Production cycles, yield analysis, and area coverage",
      icon: <FaSeedling className="text-2xl text-rose-600" />,
      stats: [
        { name: "Cultivation Entries", value: summaries.crops.totalEntries },
        { name: "Coverage Status", value: "Tracking" },
        { name: "Yield Estimate", value: "Q2 Pending" }
      ]
    }
  ] : [];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                Intelligence & Reports
              </h1>
              <p className="text-slate-600 font-medium">
                Live database synchronization and agricultural impact analytics
              </p>
            </div>
            <button 
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-xl hover:bg-slate-50 transition shadow-sm font-bold"
            >
              <FaSync className={loading ? "animate-spin" : ""} /> {loading ? "Syncing..." : "Refresh Data"}
            </button>
          </div>

          {/* Report Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 animate-pulse h-64"></div>
              ))
            ) : (
              reportCategories.map((category) => (
                <div key={category.id} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">{category.title}</h3>
                      <p className="text-sm text-slate-400 font-medium">{category.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {category.stats.map((stat, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-50">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.name}</p>
                        <p className="text-lg font-black text-slate-900">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleDownloadCSV(category.id)}
                      disabled={exporting === category.id}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-xl transition shadow-lg shadow-emerald-200 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                    >
                      <FaDownload /> {exporting === category.id ? "Generating..." : `Download ${category.id}`}
                    </button>
                    <button className="bg-white text-slate-400 hover:text-slate-900 p-3 rounded-xl border border-slate-100 transition">
                      <FaEye />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Recent Logs Table */}
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden mb-12">
            <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FaTable className="text-emerald-600" />
                <h2 className="text-xl font-black text-slate-800 italic uppercase">Operational Log</h2>
              </div>
              <span className="px-4 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-400 uppercase">
                Last 10 Activities
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/30">
                  <tr>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Event Description</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Collected At</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Metadata</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Protocol</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentReports.length === 0 && !loading ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-bold uppercase italic">
                        No recent operational logs detected.
                      </td>
                    </tr>
                  ) : (
                    recentReports.map((report) => (
                      <tr key={report.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6">
                           <p className="text-sm font-black text-slate-800 group-hover:text-emerald-700 transition-colors uppercase tracking-tight">{report.name}</p>
                        </td>
                        <td className="px-8 py-6">
                           <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100">
                             {report.type}
                           </span>
                        </td>
                        <td className="px-8 py-6">
                           <p className="text-xs font-bold text-slate-500">{new Date(report.generatedDate).toLocaleString()}</p>
                        </td>
                        <td className="px-8 py-6">
                           <p className="text-xs font-bold text-slate-400">{report.size} / {report.format}</p>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex gap-2">
                             <button className="text-emerald-600 hover:text-emerald-800 font-black text-[10px] uppercase tracking-widest flex items-center gap-1">
                               <FaEye /> View
                             </button>
                             <button className="text-blue-600 hover:text-blue-800 font-black text-[10px] uppercase tracking-widest flex items-center gap-1">
                               <FaDownload /> Get
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

          {/* Quick Action Tools */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Custom Reports", desc: "Build tailored intelligence parameters", icon: <FaFileAlt />, color: "bg-emerald-50 text-emerald-600" },
              { title: "Automated Sync", desc: "Schedule background report generation", icon: <FaChartBar />, color: "bg-blue-50 text-blue-600" },
              { title: "Batch Export", desc: "Securely move raw records to CSV/Excel", icon: <FaDownload />, color: "bg-purple-50 text-purple-600" },
            ].map((tool, i) => (
              <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 text-center group hover:-translate-y-2 transition-transform cursor-pointer">
                <div className={`w-16 h-16 rounded-2xl ${tool.color} flex items-center justify-center text-2xl mx-auto mb-6 group-hover:rotate-12 transition-transform`}>
                  {tool.icon}
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tight">{tool.title}</h3>
                <p className="text-sm text-slate-400 font-medium mb-6">{tool.desc}</p>
                <div className="text-emerald-600 font-black text-xs uppercase tracking-[0.2em] group-hover:underline">Initialize Interface →</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}