import Link from 'next/link';
import { FaTachometerAlt, FaProjectDiagram, FaUsers, FaSeedling, FaClipboardList, FaFileAlt, FaChartLine, FaCog, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-green-100 p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-green-900">M&E Agriculture</h2>
      <nav className="flex flex-col gap-3">
        <Link href="/dashboard" className="flex items-center gap-2 p-2 rounded hover:bg-green-200">
          <FaTachometerAlt /> Dashboard
        </Link>
        <Link href="/projects" className="flex items-center gap-2 p-2 rounded hover:bg-green-200">
          <FaProjectDiagram /> Projects
        </Link>
        <Link href="/farmers" className="flex items-center gap-2 p-2 rounded hover:bg-green-200">
          <FaUsers /> Farmers
        </Link>
        <Link href="/crops" className="flex items-center gap-2 p-2 rounded hover:bg-green-200">
          <FaSeedling /> Crops & Livestock
        </Link>
        <Link href="/data-collection" className="flex items-center gap-2 p-2 rounded hover:bg-green-200">
          <FaClipboardList /> Data Collection
        </Link>
        <Link href="/reports" className="flex items-center gap-2 p-2 rounded hover:bg-green-200">
          <FaFileAlt /> Reports
        </Link>
        <Link href="/indicators" className="flex items-center gap-2 p-2 rounded hover:bg-green-200">
          <FaChartLine /> Indicators
        </Link>
        <Link href="/users" className="flex items-center gap-2 p-2 rounded hover:bg-green-200">
          <FaUsers /> Users
        </Link>
        <Link href="/profile" className="flex items-center gap-2 p-2 rounded hover:bg-green-200">
          <FaUserCircle /> Profile Settings
        </Link>
        <Link href="/settings" className="flex items-center gap-2 p-2 rounded hover:bg-green-200">
          <FaCog /> Settings
        </Link>
        <Link href="/logout" className="flex items-center gap-2 p-2 rounded hover:bg-red-100 text-red-700 w-full text-left mt-4 border-t border-green-200 pt-4 cursor-pointer">
          <FaSignOutAlt /> Logout
        </Link>

      </nav>
    </aside>
  );
}