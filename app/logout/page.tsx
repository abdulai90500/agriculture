"use client";

import { useEffect } from 'react';
import { logoutUser } from '../auth/actions';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';

export default function LogoutPage() {
  useEffect(() => {
    // Execute the server action to actually destroy tokens
    // This now runs as a client-triggered mutation, which is allowed.
    logoutUser();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg transform transition-all text-center">
        <div className="flex justify-center text-green-500">
          <FaCheckCircle size={64} />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Successfully Logged Out
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Your session has been securely closed. Thank you for using the M&E Agriculture Management system.
        </p>
        <div className="mt-8">
          <Link href="/"
             className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
