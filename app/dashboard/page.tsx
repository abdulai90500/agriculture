"use client";

import Sidebar from "../sidebar/Sidebar";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid
} from "recharts";
import { getDashboardTelemetry, getChartTelemetry } from "./actions";
import { FaUsers, FaProjectDiagram, FaSeedling, FaFileAlt, FaSync } from "react-icons/fa";

const COLORS = ["#16a34a", "#2d6a4f", "#4ade80", "#1b4332", "#74c69d", "#b7e4c7"];

export default function Dashboard() {
  const [telemetry, setTelemetry] = useState<any>(null);
  const [charts, setCharts] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tel, ch] = await Promise.all([
        getDashboardTelemetry(),
        getChartTelemetry()
      ]);
      setTelemetry(tel);
      setCharts(ch);
    } catch (error) {
      console.error("Dashboard Sync Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                Operational Intelligence
              </h1>
              <p className="text-slate-600 font-medium font-serif italic">
                Real-time agricultural metrics and growth telemetry
              </p>
            </div>
            <button 
              onClick={fetchData}
              disabled={loading}
              className="group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-emerald-200 active:scale-95 font-bold"
            >
              <FaSync className={loading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"} /> 
              {loading ? "Synchronizing..." : "Refresh Hub"}
            </button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { label: "Total Farmers", value: telemetry?.totalFarmers || 0, icon: <FaUsers />, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
              { label: "Active Projects", value: telemetry?.activeProjects || 0, icon: <FaProjectDiagram />, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
              { label: "Crops Tracked", value: telemetry?.trackedCrops || 0, icon: <FaSeedling />, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
              { label: "Reports Generated", value: telemetry?.reportsCount || 0, icon: <FaFileAlt />, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100" },
            ].map((card, i) => (
              <div key={i} className={`bg-white p-6 rounded-[32px] shadow-sm border ${card.border} hover:shadow-md transition-shadow`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-4 rounded-2xl ${card.bg} ${card.color} text-xl`}>
                    {card.icon}
                  </div>
                </div>
                <h3 className="text-slate-500 font-black text-[10px] uppercase tracking-[0.2em] mb-1">{card.label}</h3>
                <p className="text-3xl font-black text-slate-900">
                  {loading ? "..." : card.value.toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Farmer Growth Trend */}
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-6">
                <FaUsers className="text-emerald-600" />
                <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight italic">Registration Trend</h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={charts?.farmerGrowth || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Line type="monotone" dataKey="farmers" stroke="#10b981" strokeWidth={4} dot={{r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 8}} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Project Progress */}
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-6">
                <FaProjectDiagram className="text-emerald-600" />
                <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight italic">Initiative Performance</h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={charts?.projectProgress || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="progress" fill="#10b981" radius={[8, 8, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Charts Row 2 - Distribution */}
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-6">
              <FaSeedling className="text-emerald-600" />
              <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight italic">Resource Distribution</h2>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-around gap-8">
              <div className="w-full md:w-1/2">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={charts?.cropData || []}
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {(charts?.cropData || []).map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/3 bg-slate-50 p-8 rounded-[32px] border border-slate-100">
                <h4 className="text-slate-500 font-black text-xs uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">Global Impact Summary</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-600">Active Adopters</span>
                    <span className="text-sm font-black text-emerald-600">{telemetry?.totalFarmers || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-600">Yield Success</span>
                    <span className="text-sm font-black text-blue-600">{telemetry?.successfulProjects || 0} Projects</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-600">Indicator Fidelity</span>
                    <span className="text-sm font-black text-amber-600">92%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}