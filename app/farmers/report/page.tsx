"use client";

import Sidebar from "../../sidebar/Sidebar";
import { useState } from "react";
import Link from "next/link";

const farmersList = [
  {
    id: 1,
    name: "John Kamau",
    location: "Kiambu County",
    phone: "+254 712 345 678",
    livestock: { cattle: 5, goats: 8, poultry: 20 },
    crops: ["Maize", "Beans", "Kale"],
    status: "Active",
    joinDate: "2023-01-15"
  },
  {
    id: 2,
    name: "Mary Wanjiku",
    location: "Nakuru County",
    phone: "+254 723 456 789",
    livestock: { cattle: 3, goats: 12, poultry: 15 },
    crops: ["Wheat", "Potatoes", "Tomatoes"],
    status: "Active",
    joinDate: "2023-03-22"
  },
  {
    id: 3,
    name: "Peter Kiprop",
    location: "Uasin Gishu County",
    phone: "+254 734 567 890",
    livestock: { cattle: 8, goats: 6, poultry: 25 },
    crops: ["Maize", "Sorghum", "Groundnuts"],
    status: "Active",
    joinDate: "2023-02-10"
  },
  {
    id: 4,
    name: "Grace Achieng",
    location: "Kisumu County",
    phone: "+254 745 678 901",
    livestock: { cattle: 2, goats: 15, poultry: 30 },
    crops: ["Rice", "Cassava", "Vegetables"],
    status: "Inactive",
    joinDate: "2023-04-05"
  },
  {
    id: 5,
    name: "David Mutua",
    location: "Machakos County",
    phone: "+254 756 789 012",
    livestock: { cattle: 6, goats: 4, poultry: 18 },
    crops: ["Maize", "Cowpeas", "Sweet Potatoes"],
    status: "Active",
    joinDate: "2023-01-28"
  }
];

export default function GenerateReport() {
  const [reportType, setReportType] = useState<'summary' | 'detailed' | 'performance'>('summary');
  const [dateRange, setDateRange] = useState('month');

  const totalFarmers = farmersList.length;
  const activeFarmers = farmersList.filter(f => f.status === 'Active').length;
  const inactiveFarmers = farmersList.filter(f => f.status === 'Inactive').length;
  const totalLivestock = farmersList.reduce((sum, f) => sum + f.livestock.cattle + f.livestock.goats + f.livestock.poultry, 0);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    alert('PDF download feature coming soon!');
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-50 min-h-screen ml-64">
        <div className="mb-6">
          <Link href="/farmers" className="text-green-600 hover:text-green-700 font-semibold">
            ← Back to Farmers
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm text-gray-600 font-semibold mb-2">Total Farmers</h3>
            <p className="text-3xl font-bold text-green-600">{totalFarmers}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm text-gray-600 font-semibold mb-2">Active Farmers</h3>
            <p className="text-3xl font-bold text-green-600">{activeFarmers}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm text-gray-600 font-semibold mb-2">Inactive Farmers</h3>
            <p className="text-3xl font-bold text-red-600">{inactiveFarmers}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm text-gray-600 font-semibold mb-2">Total Livestock</h3>
            <p className="text-3xl font-bold text-blue-600">{totalLivestock}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-green-900 mb-6">Generate Farmers Report</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Report Type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value as any)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              >
                <option value="summary">Summary Report</option>
                <option value="detailed">Detailed Report</option>
                <option value="performance">Performance Report</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Date Range
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              >
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="quarter">Last 3 Months</option>
                <option value="year">Last Year</option>
              </select>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
            <h3 className="font-semibold text-green-900 mb-3">Report Summary</h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li>✓ Total Registered Farmers: <strong>{totalFarmers}</strong></li>
              <li>✓ Active Farmers: <strong>{activeFarmers}</strong> ({Math.round((activeFarmers/totalFarmers)*100)}%)</li>
              <li>✓ Inactive Farmers: <strong>{inactiveFarmers}</strong></li>
              <li>✓ Total Livestock Count: <strong>{totalLivestock}</strong></li>
              <li>✓ Report Generated: <strong>{new Date().toLocaleString()}</strong></li>
            </ul>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handlePrint}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              🖨️ Print Report
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
            >
              📄 Download PDF
            </button>
            <Link href="/farmers">
              <button
                type="button"
                className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition font-semibold"
              >
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
