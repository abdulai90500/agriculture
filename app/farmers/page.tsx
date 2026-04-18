"use client";

import Sidebar from "../sidebar/Sidebar";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getFarmers, deleteFarmer } from "./actions";

export default function Farmers() {
  const router = useRouter();
  
  const [farmersData, setFarmersData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFarmers = () => {
    setLoading(true);
    getFarmers().then(data => {
      setFarmersData(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadFarmers();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      const result = await deleteFarmer(id);
      if (result.success) {
        loadFarmers();
      } else {
        alert(result.error || "Failed to delete farmer");
      }
    }
  };

  const totalFarmers = farmersData.length;
  const activeFarmers = farmersData.filter(farmer => farmer.status.toLowerCase() === "active").length;
  const totalLivestock = farmersData.reduce((total, farmer) => {
    const counts = farmer.livestock?.reduce((sum: number, l: any) => sum + l.count, 0) || 0;
    return total + counts;
  }, 0);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-50 min-h-screen ml-64">
        <h1 className="text-2xl font-bold text-green-900 mb-6">Farmers Management</h1>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Total Farmers</h3>
            <p className="text-3xl font-bold text-green-600">{totalFarmers}</p>
            <p className="text-sm text-gray-600">Registered farmers</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Active Farmers</h3>
            <p className="text-3xl font-bold text-green-600">{activeFarmers}</p>
            <p className="text-sm text-gray-600">
              {totalFarmers > 0 ? Math.round((activeFarmers/totalFarmers)*100) : 0}% active rate
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Total Livestock</h3>
            <p className="text-3xl font-bold text-green-600">{totalLivestock}</p>
            <p className="text-sm text-gray-600">Across all farmers</p>
          </div>
        </div>

        {/* Farmers Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-green-900">Farmer Directory</h2>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <p className="p-6 text-gray-500">Loading farmers...</p>
            ) : farmersData.length === 0 ? (
              <p className="p-6 text-gray-500">No farmers found in the database. Add one to get started!</p>
            ) : (
            <table className="min-w-full table-auto">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Farmer Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Livestock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Crops
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-green-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {farmersData.map((farmer) => (
                  <tr key={farmer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{farmer.name}</div>
                        <div className="text-sm text-gray-500">{farmer.phone || "No phone"}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{farmer.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {farmer.livestock?.length > 0 ? (
                          farmer.livestock.map((l: any, i: number) => (
                            <div key={i} className="capitalize">{l.livestock.type}: {l.count}</div>
                          ))
                        ) : (
                          <span className="text-gray-400">None</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {farmer.crops?.length > 0 ? (
                          farmer.crops.map((c: any) => c.crop.name).join(", ")
                        ) : (
                          <span className="text-gray-400">None</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        farmer.status.toLowerCase() === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {farmer.status.charAt(0).toUpperCase() + farmer.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(farmer.lastActivity).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => router.push(`/farmers/${farmer.id}/edit`)} 
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(farmer.id, farmer.name)} 
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => router.push("/farmers/add-farmer")}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Add New Farmer
          </button>
          <button
            onClick={() => router.push("/farmers/export")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Export Data
          </button>
          <button
            onClick={() => router.push("/farmers/report")}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}