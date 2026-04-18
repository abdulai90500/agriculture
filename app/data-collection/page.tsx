"use client";

import Sidebar from "../sidebar/Sidebar";

export default function DataCollection() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50 min-h-screen ml-64">
        <h1 className="text-2xl font-bold text-green-900 mb-6">Data Collection</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Collect Agricultural Data</h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Farmer Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                placeholder="Enter farmer's name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                placeholder="Enter location"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Crop Type
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
                <option value="">Select crop type</option>
                <option value="rice">Rice</option>
                <option value="cassava">Cassava</option>
                <option value="maize">Maize</option>
                <option value="vegetables">Vegetables</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity (kg)
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                placeholder="Enter quantity"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                rows={4}
                placeholder="Additional notes"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              Submit Data
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}