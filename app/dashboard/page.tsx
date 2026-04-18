"use client";

import Sidebar from "../sidebar/Sidebar";

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
  Legend
} from "recharts";

const farmerData = [
  { name: "Jan", farmers: 40 },
  { name: "Feb", farmers: 65 },
  { name: "Mar", farmers: 80 },
  { name: "Apr", farmers: 120 },
];

const cropData = [
  { name: "Rice", value: 400 },
  { name: "Cassava", value: 300 },
  { name: "Maize", value: 300 },
  { name: "Vegetables", value: 200 },
];

const projectData = [
  { name: "Project A", progress: 70 },
  { name: "Project B", progress: 50 },
  { name: "Project C", progress: 90 },
];

const COLORS = ["#16a34a", "#22c55e", "#4ade80", "#86efac"];

export default function Dashboard() {
  return (
    <div className="flex">
      
      {/* ✅ Sidebar */}
      <Sidebar />

      {/* ✅ Main Dashboard Content */}
      <div className="flex-1 p-6 bg-gray-50 min-h-screen ml-64">
        
        <h1 className="text-3xl font-bold mb-6 text-green-900">
          Dashboard Overview
        </h1>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-500">Total Farmers</h3>
            <p className="text-2xl font-bold text-green-700">1,200</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-500">Active Projects</h3>
            <p className="text-2xl font-bold text-green-700">15</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-500">Crops Tracked</h3>
            <p className="text-2xl font-bold text-green-700">8</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-500">Reports Submitted</h3>
            <p className="text-2xl font-bold text-green-700">320</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6">
          
          {/* Line Chart */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="mb-3 font-semibold">Farmer Growth</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={farmerData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="farmers" stroke="#16a34a" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="mb-3 font-semibold">Project Progress</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="progress" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-4 rounded shadow col-span-2">
            <h2 className="mb-3 font-semibold">Crop Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cropData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {cropData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
}