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

const cropData = [
  {
    id: 1,
    name: "Maize",
    variety: "Hybrid 614",
    area: 250,
    yield: 4.2,
    status: "Harvesting",
    farmerCount: 45,
    marketPrice: 35
  },
  {
    id: 2,
    name: "Rice",
    variety: "NERICA 1",
    area: 180,
    yield: 5.1,
    status: "Growing",
    farmerCount: 32,
    marketPrice: 42
  },
  {
    id: 3,
    name: "Cassava",
    variety: "TMS 419",
    area: 320,
    yield: 18.5,
    status: "Mature",
    farmerCount: 58,
    marketPrice: 25
  },
  {
    id: 4,
    name: "Beans",
    variety: "Rosecoco",
    area: 150,
    yield: 1.8,
    status: "Flowering",
    farmerCount: 28,
    marketPrice: 65
  },
  {
    id: 5,
    name: "Tomatoes",
    variety: "Rio Grande",
    area: 95,
    yield: 22.3,
    status: "Fruiting",
    farmerCount: 22,
    marketPrice: 18
  }
];

const livestockData = [
  {
    id: 1,
    type: "Cattle",
    breed: "Friesian",
    count: 195,
    healthStatus: "Good",
    productivity: 85,
    farmerCount: 38,
    avgWeight: 450
  },
  {
    id: 2,
    type: "Goats",
    breed: "Galla",
    count: 155,
    healthStatus: "Excellent",
    productivity: 92,
    farmerCount: 42,
    avgWeight: 35
  },
  {
    id: 3,
    type: "Poultry",
    breed: "Broiler",
    count: 340,
    healthStatus: "Good",
    productivity: 78,
    farmerCount: 55,
    avgWeight: 2.2
  },
  {
    id: 4,
    type: "Sheep",
    breed: "Dorper",
    count: 85,
    healthStatus: "Good",
    productivity: 88,
    farmerCount: 25,
    avgWeight: 45
  }
];

const cropYieldData = [
  { month: "Jan", maize: 3.8, rice: 4.5, cassava: 15.2 },
  { month: "Feb", maize: 4.1, rice: 4.8, cassava: 16.8 },
  { month: "Mar", maize: 4.5, rice: 5.2, cassava: 18.1 },
  { month: "Apr", maize: 4.2, rice: 5.1, cassava: 17.5 },
];

const livestockHealthData = [
  { name: "Cattle", healthy: 180, sick: 15 },
  { name: "Goats", healthy: 148, sick: 7 },
  { name: "Poultry", healthy: 312, sick: 28 },
  { name: "Sheep", healthy: 82, sick: 3 },
];

const COLORS = ["#16a34a", "#22c55e", "#4ade80", "#86efac"];

export default function Crops() {
  const totalCropArea = cropData.reduce((total, crop) => total + crop.area, 0);
  const totalLivestock = livestockData.reduce((total, livestock) => total + livestock.count, 0);
  const avgYield = cropData.reduce((total, crop) => total + crop.yield, 0) / cropData.length;

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-50 min-h-screen ml-64">
        <h1 className="text-2xl font-bold text-green-900 mb-6">Crops & Livestock Management</h1>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Total Crop Area</h3>
            <p className="text-3xl font-bold text-green-600">{totalCropArea} ha</p>
            <p className="text-sm text-gray-600">Under cultivation</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Total Livestock</h3>
            <p className="text-3xl font-bold text-green-600">{totalLivestock}</p>
            <p className="text-sm text-gray-600">Across all types</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Average Yield</h3>
            <p className="text-3xl font-bold text-green-600">{avgYield.toFixed(1)} t/ha</p>
            <p className="text-sm text-gray-600">Per hectare</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Active Farmers</h3>
            <p className="text-3xl font-bold text-green-600">185</p>
            <p className="text-sm text-gray-600">Growing crops/livestock</p>
          </div>
        </div>

        {/* Crop Yield Trends */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-green-900">Crop Yield Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cropYieldData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="maize" stroke="#16a34a" strokeWidth={2} name="Maize (t/ha)" />
              <Line type="monotone" dataKey="rice" stroke="#22c55e" strokeWidth={2} name="Rice (t/ha)" />
              <Line type="monotone" dataKey="cassava" stroke="#4ade80" strokeWidth={2} name="Cassava (t/ha)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Crops Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-green-900">Crop Management</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Crop Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Area (ha)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Yield (t/ha)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Farmers
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Market Price (KSh/kg)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cropData.map((crop) => (
                  <tr key={crop.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{crop.name}</div>
                        <div className="text-sm text-gray-500">{crop.variety}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {crop.area}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {crop.yield}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {crop.farmerCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {crop.marketPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        crop.status === "Harvesting"
                          ? "bg-yellow-100 text-yellow-800"
                          : crop.status === "Growing"
                          ? "bg-blue-100 text-blue-800"
                          : crop.status === "Mature"
                          ? "bg-green-100 text-green-800"
                          : "bg-purple-100 text-purple-800"
                      }`}>
                        {crop.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Livestock Health Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-green-900">Livestock Health Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={livestockHealthData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="healthy" stackId="a" fill="#16a34a" name="Healthy" />
              <Bar dataKey="sick" stackId="a" fill="#dc2626" name="Sick" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Livestock Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-green-900">Livestock Management</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Livestock Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Health Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Productivity (%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Farmers
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Avg Weight (kg)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {livestockData.map((livestock) => (
                  <tr key={livestock.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{livestock.type}</div>
                        <div className="text-sm text-gray-500">{livestock.breed}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {livestock.count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        livestock.healthStatus === "Excellent"
                          ? "bg-green-100 text-green-800"
                          : livestock.healthStatus === "Good"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {livestock.healthStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {livestock.productivity}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {livestock.farmerCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {livestock.avgWeight}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
            Add New Crop
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Add Livestock
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition">
            Update Market Prices
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}