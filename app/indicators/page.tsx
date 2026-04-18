"use client";

import Sidebar from "../sidebar/Sidebar";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const livestockData = [
  { month: "Jan", cattle: 120, goats: 80, poultry: 200 },
  { month: "Feb", cattle: 135, goats: 95, poultry: 220 },
  { month: "Mar", cattle: 150, goats: 110, poultry: 250 },
  { month: "Apr", cattle: 165, goats: 125, poultry: 280 },
  { month: "May", cattle: 180, goats: 140, poultry: 310 },
  { month: "Jun", cattle: 195, goats: 155, poultry: 340 },
];

const livestockTypeData = [
  { name: "Cattle", value: 195, color: "#16a34a" },
  { name: "Goats", value: 155, color: "#22c55e" },
  { name: "Poultry", value: 340, color: "#4ade80" },
  { name: "Sheep", value: 85, color: "#86efac" },
];

const healthIndicators = [
  { indicator: "Vaccination Rate", value: 85, target: 90 },
  { indicator: "Disease Incidence", value: 12, target: 10 },
  { indicator: "Mortality Rate", value: 8, target: 5 },
  { indicator: "Productivity Index", value: 78, target: 80 },
];

const farmerAdoptionData = [
  { region: "North", farmers: 45 },
  { region: "South", farmers: 62 },
  { region: "East", farmers: 38 },
  { region: "West", farmers: 55 },
];

export default function Indicators() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-50 min-h-screen ml-64">
        <h1 className="text-2xl font-bold text-green-900 mb-6">Livestock Indicators</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Total Livestock</h3>
            <p className="text-3xl font-bold text-green-600">775</p>
            <p className="text-sm text-gray-600">+12% from last month</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Active Farmers</h3>
            <p className="text-3xl font-bold text-green-600">200</p>
            <p className="text-sm text-gray-600">85% adoption rate</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Health Score</h3>
            <p className="text-3xl font-bold text-green-600">78%</p>
            <p className="text-sm text-gray-600">Above target</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-green-900">Livestock Growth Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={livestockData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cattle" stroke="#16a34a" strokeWidth={2} />
                <Line type="monotone" dataKey="goats" stroke="#22c55e" strokeWidth={2} />
                <Line type="monotone" dataKey="poultry" stroke="#4ade80" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-green-900">Livestock Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={livestockTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                >
                  {livestockTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-green-900">Health Indicators</h2>
            <div className="space-y-4">
              {healthIndicators.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.indicator}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(item.value / item.target) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-green-900">Farmer Adoption by Region</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={farmerAdoptionData}>
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="farmers" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-green-900">Key Performance Indicators</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-green-50">
                  <th className="px-4 py-2 text-left text-green-900">Indicator</th>
                  <th className="px-4 py-2 text-left text-green-900">Current Value</th>
                  <th className="px-4 py-2 text-left text-green-900">Target</th>
                  <th className="px-4 py-2 text-left text-green-900">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2">Livestock Population Growth</td>
                  <td className="px-4 py-2">+15%</td>
                  <td className="px-4 py-2">+12%</td>
                  <td className="px-4 py-2 text-green-600">✓ Exceeded</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Farmer Training Completion</td>
                  <td className="px-4 py-2">85%</td>
                  <td className="px-4 py-2">80%</td>
                  <td className="px-4 py-2 text-green-600">✓ On Track</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Disease Prevention Rate</td>
                  <td className="px-4 py-2">78%</td>
                  <td className="px-4 py-2">85%</td>
                  <td className="px-4 py-2 text-yellow-600">⚠ Below Target</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Market Access Improvement</td>
                  <td className="px-4 py-2">92%</td>
                  <td className="px-4 py-2">90%</td>
                  <td className="px-4 py-2 text-green-600">✓ Exceeded</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}