"use client";

import Sidebar from "../sidebar/Sidebar";
import { FaFileAlt, FaDownload, FaEye, FaChartBar, FaUsers, FaSeedling, FaProjectDiagram } from "react-icons/fa";

const reportCategories = [
  {
    id: "farmers",
    title: "Farmer Reports",
    description: "Comprehensive reports on farmer registration, activity, and performance",
    icon: <FaUsers className="text-2xl text-green-600" />,
    reports: [
      { name: "Farmer Registration Report", lastGenerated: "2024-04-10", status: "Available" },
      { name: "Farmer Activity Report", lastGenerated: "2024-04-12", status: "Available" },
      { name: "Farmer Performance Summary", lastGenerated: "2024-04-08", status: "Generating" }
    ]
  },
  {
    id: "livestock",
    title: "Livestock Reports",
    description: "Reports on livestock population, health, and productivity indicators",
    icon: <FaSeedling className="text-2xl text-green-600" />,
    reports: [
      { name: "Livestock Population Report", lastGenerated: "2024-04-11", status: "Available" },
      { name: "Livestock Health Report", lastGenerated: "2024-04-09", status: "Available" },
      { name: "Productivity Indicators Report", lastGenerated: "2024-04-07", status: "Available" }
    ]
  },
  {
    id: "crops",
    title: "Crop Reports",
    description: "Agricultural crop production, yield, and market analysis reports",
    icon: <FaSeedling className="text-2xl text-blue-600" />,
    reports: [
      { name: "Crop Production Report", lastGenerated: "2024-04-10", status: "Available" },
      { name: "Yield Analysis Report", lastGenerated: "2024-04-06", status: "Available" },
      { name: "Market Price Report", lastGenerated: "2024-04-12", status: "Generating" }
    ]
  },
  {
    id: "projects",
    title: "Project Reports",
    description: "Project progress, impact assessment, and evaluation reports",
    icon: <FaProjectDiagram className="text-2xl text-purple-600" />,
    reports: [
      { name: "Project Progress Report", lastGenerated: "2024-04-08", status: "Available" },
      { name: "Impact Assessment Report", lastGenerated: "2024-04-05", status: "Available" },
      { name: "Quarterly Evaluation Report", lastGenerated: "2024-03-31", status: "Available" }
    ]
  }
];

const recentReports = [
  {
    id: 1,
    name: "Monthly Farmer Activity Report",
    type: "Farmers",
    generatedDate: "2024-04-12",
    size: "2.4 MB",
    format: "PDF"
  },
  {
    id: 2,
    name: "Livestock Health Indicators",
    type: "Livestock",
    generatedDate: "2024-04-11",
    size: "1.8 MB",
    format: "Excel"
  },
  {
    id: 3,
    name: "Crop Yield Analysis Q1",
    type: "Crops",
    generatedDate: "2024-04-10",
    size: "3.1 MB",
    format: "PDF"
  },
  {
    id: 4,
    name: "Project Impact Assessment",
    type: "Projects",
    generatedDate: "2024-04-08",
    size: "4.2 MB",
    format: "PDF"
  }
];

export default function Reports() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-50 min-h-screen ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-900">Reports & Analytics</h1>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition flex items-center gap-2">
            <FaFileAlt />
            Generate New Report
          </button>
        </div>

        {/* Report Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {reportCategories.map((category) => (
            <div key={category.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4">
                {category.icon}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                {category.reports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{report.name}</p>
                      <p className="text-xs text-gray-500">Last generated: {report.lastGenerated}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        report.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {report.status}
                      </span>
                      <button className="text-green-600 hover:text-green-800 p-1">
                        <FaEye className="text-sm" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <FaDownload className="text-sm" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-4 w-full bg-green-100 text-green-700 px-4 py-2 rounded-md hover:bg-green-200 transition text-sm font-medium">
                Generate {category.title}
              </button>
            </div>
          ))}
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
            <FaChartBar className="text-green-600" />
            <h2 className="text-xl font-semibold text-green-900">Recent Reports</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Report Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Generated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Format
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{report.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(report.generatedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.format}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button className="text-green-600 hover:text-green-900 flex items-center gap-1">
                          <FaEye className="text-xs" />
                          View
                        </button>
                        <button className="text-blue-600 hover:text-blue-900 flex items-center gap-1">
                          <FaDownload className="text-xs" />
                          Download
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report Generation Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaFileAlt className="text-3xl text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Reports</h3>
            <p className="text-sm text-gray-600 mb-4">Create custom reports with specific parameters</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
              Create Custom Report
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaChartBar className="text-3xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Scheduled Reports</h3>
            <p className="text-sm text-gray-600 mb-4">Set up automated report generation</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Schedule Reports
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaDownload className="text-3xl text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Export Data</h3>
            <p className="text-sm text-gray-600 mb-4">Export raw data for external analysis</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}