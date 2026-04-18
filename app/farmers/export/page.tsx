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

export default function ExportData() {
  const [format, setFormat] = useState<'csv' | 'json' | 'xlsx'>('csv');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleExport = () => {
    try {
      let data;
      let filename;
      let type;

      if (format === 'csv') {
        const csv = convertToCSV(farmersList);
        data = new Blob([csv], { type: 'text/csv' });
        filename = `farmers_export_${new Date().toISOString().split('T')[0]}.csv`;
        type = 'text/csv';
      } else if (format === 'json') {
        data = new Blob([JSON.stringify(farmersList, null, 2)], { type: 'application/json' });
        filename = `farmers_export_${new Date().toISOString().split('T')[0]}.json`;
        type = 'application/json';
      } else {
        data = new Blob([convertToCSV(farmersList)], { type: 'application/vnd.ms-excel' });
        filename = `farmers_export_${new Date().toISOString().split('T')[0]}.xlsx`;
        type = 'application/vnd.ms-excel';
      }

      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setMessage({ type: 'success', text: `Data exported successfully as ${format.toUpperCase()}!` });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error exporting data. Please try again.' });
    }
  };

  const convertToCSV = (data: any[]) => {
    const headers = ['Name', 'Location', 'Phone', 'Cattle', 'Goats', 'Poultry', 'Crops', 'Status', 'Join Date'];
    const csv = [headers.join(',')];

    data.forEach(farmer => {
      csv.push([
        farmer.name,
        farmer.location,
        farmer.phone,
        farmer.livestock.cattle,
        farmer.livestock.goats,
        farmer.livestock.poultry,
        farmer.crops.join(';'),
        farmer.status,
        farmer.joinDate
      ].join(','));
    });

    return csv.join('\n');
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

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
          <h1 className="text-3xl font-bold text-green-900 mb-6">Export Farmers Data</h1>

          {message && (
            <div className={`mb-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message.text}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Select Export Format
              </label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="format"
                    value="csv"
                    checked={format === 'csv'}
                    onChange={(e) => setFormat(e.target.value as 'csv')}
                    className="rounded"
                  />
                  <span className="ml-3 text-gray-700">
                    CSV (.csv) - Spreadsheet format
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    name="format"
                    value="json"
                    checked={format === 'json'}
                    onChange={(e) => setFormat(e.target.value as 'json')}
                    className="rounded"
                  />
                  <span className="ml-3 text-gray-700">
                    JSON (.json) - Data interchange format
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    name="format"
                    value="xlsx"
                    checked={format === 'xlsx'}
                    onChange={(e) => setFormat(e.target.value as 'xlsx')}
                    className="rounded"
                  />
                  <span className="ml-3 text-gray-700">
                    Excel (.xlsx) - Microsoft Excel format
                  </span>
                </label>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                📊 Total records to export: <strong>{farmersList.length}</strong> farmers
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleExport}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Download Export
              </button>
              <Link href="/farmers">
                <button
                  type="button"
                  className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition font-semibold"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
