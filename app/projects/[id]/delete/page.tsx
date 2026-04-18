"use client";

import Sidebar from "../../../sidebar/Sidebar";
import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { deleteProject } from "../../actions";
import { 
  FaArrowLeft, 
  FaTrash, 
  FaExclamationTriangle, 
  FaTimes, 
  FaSkullCrossbones 
} from "react-icons/fa";

export default function DeleteProject({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await deleteProject(id);
      if (result.success) {
        router.push('/projects');
      } else {
        setError(result.error || "Failed to decommission project");
        setLoading(false);
      }
    } catch (err) {
      setError("An unexpected system error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="ml-64 flex-1 p-8 flex items-center justify-center">
        <div className="max-w-xl w-full">
          {/* Breadcrumb / Back */}
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors font-bold mb-8 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Cancel Decommission
          </button>

          <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-rose-100 relative overflow-hidden text-center animate-in zoom-in-95 duration-300">
            {/* Warning Background Elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-rose-600"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-50 rounded-full blur-3xl opacity-50"></div>
            
            <div className="relative z-10">
              <div className="w-24 h-24 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl animate-pulse">
                <FaExclamationTriangle />
              </div>

              <h1 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter">
                Confirm Decommission
              </h1>
              
              <p className="text-slate-500 font-medium leading-relaxed mb-10">
                You are about to permanently purge this initiative from the central registry. 
                <span className="block mt-2 text-rose-600 font-black uppercase text-xs tracking-widest">
                  Caution: All relational indicators and historical reporting data will be destroyed.
                </span>
              </p>

              {error && (
                <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex items-center gap-3">
                  <FaTimes className="bg-rose-200 p-1 rounded-full text-xs" />
                  <span className="text-sm font-bold tracking-tight uppercase">{error}</span>
                </div>
              )}

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="w-full bg-rose-600 hover:bg-rose-700 disabled:bg-rose-300 text-white font-black py-5 rounded-[24px] shadow-xl hover:shadow-rose-200 transition-all flex items-center justify-center gap-3 relative overflow-hidden group uppercase tracking-[0.2em] text-sm"
                >
                  <FaSkullCrossbones className="group-hover:rotate-12 transition-transform" /> 
                  {loading ? "Purging Registry..." : "Confirm Purge"}
                </button>
                
                <button
                  onClick={() => router.back()}
                  disabled={loading}
                  className="w-full bg-white text-slate-500 hover:text-slate-800 border-2 border-slate-100 font-bold py-5 rounded-[24px] transition-all hover:bg-slate-50 uppercase tracking-widest text-sm"
                >
                  Mission Abort
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-2 items-center text-slate-300 font-black text-[10px] uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
            Security Protocol Active
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
