"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaUsers,
  FaSeedling,
  FaClipboardList,
  FaFileAlt,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaUserCircle
} from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const adminMenu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Projects", path: "/projects", icon: <FaProjectDiagram /> },
    { name: "Farmers", path: "/farmers", icon: <FaUsers /> },
    { name: "Crops & Livestock", path: "/crops", icon: <FaSeedling /> },
    { name: "Data Collection", path: "/data-collection", icon: <FaClipboardList /> },
    { name: "Reports", path: "/reports", icon: <FaFileAlt /> },
    { name: "Indicators", path: "/indicators", icon: <FaChartLine /> },
    { name: "Users", path: "/users", icon: <FaUsers /> },
    { name: "Profile Settings", path: "/profile", icon: <FaUserCircle /> },
  ];

  return (
    <aside 
      suppressHydrationWarning 
      className={`w-64 h-screen bg-green-100 p-4 shadow-lg flex flex-col fixed left-0 top-0 ${mounted ? "overflow-hidden" : ""}`}
    >
      <div 
        suppressHydrationWarning
        className={`flex-1 ${mounted ? "overflow-y-auto custom-scrollbar" : ""}`}
      >
        <h2 className="text-xl font-bold mb-6 text-green-900 border-b border-green-200 pb-4">
          M&E Agriculture
        </h2>

        <nav className="flex flex-col gap-2 text-sm">
          {adminMenu.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition font-medium
                ${
                  pathname === item.path
                    ? "bg-green-600 text-white shadow-md"
                    : "text-green-900 hover:bg-green-200"
                }`}
            >
              <span className={pathname === item.path ? "text-green-50" : "text-green-700"}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="pt-4 border-t border-green-200">
        <div className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 bg-green-300 rounded-full flex items-center justify-center text-green-800 font-bold">
            A
          </div>
          <div className="text-sm">
            <p className="font-semibold text-green-900 capitalize">Admin</p>
            <p className="text-xs text-green-700">Active Session</p>
          </div>
        </div>

        <Link
          href="/logout"
          className="w-full flex items-center justify-center gap-2 p-3 mt-4 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition font-medium border border-red-100"
        >
          <FaSignOutAlt />
          Logout
        </Link>
      </div>
    </aside>
  );
}