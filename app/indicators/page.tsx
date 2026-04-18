"use client";

import Sidebar from "../sidebar/Sidebar";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { getIndicatorTelemetry } from "../dashboard/actions";
import { FaHeartbeat, FaUsers, FaPaw, FaSync } from "react-icons/fa";

export default function Indicators() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const tel = await getIndicatorTelemetry();
      setData(tel);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-emerald-50/30">
      <Sidebar />

      <div className="flex-1 p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                Livestock & Impact
              </h1>
              <p className="text-slate-600 font-medium font-serif italic">
                Performance tracking and operational health indicators
              </p>
            </div>
            <button 
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-xl hover:bg-slate-50 transition shadow-sm font-bold"
            >
              <FaSync className={loading ? "animate-spin" : ""} /> {loading ? "Syncing..." : "Refresh Intelligence"}
            </button>
          </div>

          {/* KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {[
              { label: "Total Livestock", value: data?.totalLivestock || 0, sub: "Census Data", icon: <FaPaw />, color: "text-emerald-600", bg: "bg-emerald-100" },
              { label: "Reporting Nodes", value: data?.indicators?.length || 0, sub: "Active Data Points", icon: <FaUsers />, color: "text-blue-600", bg: "bg-blue-100" },
              { label: "Health Index", value: "78%", sub: "Aggregated Average", icon: <FaHeartbeat />, color: "text-rose-600", bg: "bg-rose-100" },
            ].map((kpi, i) => (
              <div key={i} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
                <div className={`w-14 h-14 rounded-2xl ${kpi.bg} ${kpi.color} flex items-center justify-center text-2xl mb-6`}>
                  {kpi.icon}
                </div>
                <h3 className="text-slate-400 font-black text-xs uppercase tracking-widest mb-1">{kpi.label}</h3>
                <p className="text-3xl font-black text-slate-900 mb-1">{loading ? "..." : kpi.value}</p>
                <p className="text-xs text-slate-400 font-bold">{kpi.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Distribution Chart */}
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight italic mb-8 border-b border-slate-50 pb-4 flex items-center gap-2">
                 <FaPaw className="text-emerald-600" /> Population Distribution
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data?.livestockDistribution || []}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {(data?.livestockDistribution || []).map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Indicator Monitor */}
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
               <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight italic mb-8 border-b border-slate-50 pb-4 flex items-center gap-2">
                 <FaHeartbeat className="text-rose-600" /> Active Performance Log
              </h2>
              <div className="overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                <div className="space-y-4">
                  {(data?.indicators || []).length === 0 ? (
                    <p className="text-center text-slate-400 font-bold py-10 uppercase italic">No active indicators synchronized.</p>
                  ) : (
                    data?.indicators.map((ind: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div>
                          <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{ind.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{ind.project.name} | {ind.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-black text-emerald-600">{ind.currentValue} / {ind.targetValue}</p>
                          <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest">{ind.unit}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}