"use client";

import Sidebar from "../../sidebar/Sidebar";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createFarmer, getCrops, getLivestock } from "../actions";

export default function AddFarmer() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
  });

  const [availableCrops, setAvailableCrops] = useState<{id: string, name: string}[]>([]);
  const [availableLivestock, setAvailableLivestock] = useState<{id: string, type: string}[]>([]);

  const [selectedCrops, setSelectedCrops] = useState<{cropId: string, area: number}[]>([]);
  const [selectedLivestock, setSelectedLivestock] = useState<{livestockId: string, count: number}[]>([]);

  useEffect(() => {
    // Fetch available crops and livestock for the dropdowns
    getCrops().then(setCropsList => setAvailableCrops(setCropsList));
    getLivestock().then(setLivestockList => setAvailableLivestock(setLivestockList));
  }, []);

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await createFarmer({
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        crops: selectedCrops,
        livestock: selectedLivestock,
        status: "active"
      });

      if (result.success) {
        setMessage({
          type: "success",
          text: "Farmer added successfully!"
        });

        setTimeout(() => {
          router.push("/farmers");
        }, 1500);
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to add farmer"
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Error adding farmer"
      });
    } finally {
      setLoading(false);
    }
  };

  const addCrop = () => {
    if (availableCrops.length > 0) {
      setSelectedCrops([...selectedCrops, { cropId: availableCrops[0].id, area: 1 }]);
    }
  };

  const removeCrop = (index: number) => {
    const updated = [...selectedCrops];
    updated.splice(index, 1);
    setSelectedCrops(updated);
  };

  const addLivestock = () => {
    if (availableLivestock.length > 0) {
      setSelectedLivestock([...selectedLivestock, { livestockId: availableLivestock[0].id, count: 1 }]);
    }
  };

  const removeLivestock = (index: number) => {
    const updated = [...selectedLivestock];
    updated.splice(index, 1);
    setSelectedLivestock(updated);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-50 min-h-screen ml-64">

        {/* BACK BUTTON */}
        <div className="mb-6">
          <Link
            href="/farmers"
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            ← Back to Farmers
          </Link>
        </div>

        {/* FORM CONTAINER */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">

          <h1 className="text-3xl font-bold text-green-900 mb-6">
            Add New Farmer
          </h1>

          {/* MESSAGE */}
          {message && (
            <div
              className={`mb-4 p-4 rounded-lg ${message.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
                }`}
            >
              {message.text}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* NAME + PHONE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium mb-2">
                  Farmer Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter farmer name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg"
                  placeholder="+232 76 000 000"
                />
              </div>

            </div>

            {/* LOCATION */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Location *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
                placeholder="District / Community"
              />
            </div>

            {/* LIVESTOCK DYNAMIC INPUT */}
            <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-800">
                  Livestock Information
                </label>
                <button type="button" onClick={addLivestock} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">
                  + Add Livestock
                </button>
              </div>

              {selectedLivestock.length === 0 && <p className="text-sm text-gray-500 italic">No livestock added. Click above to add.</p>}
              
              {selectedLivestock.map((ls, idx) => (
                <div key={idx} className="flex gap-2 mb-2 items-center bg-white p-2 border rounded">
                  <select
                    className="flex-1 p-2 border rounded"
                    value={ls.livestockId}
                    onChange={(e) => {
                      const updated = [...selectedLivestock];
                      updated[idx].livestockId = e.target.value;
                      setSelectedLivestock(updated);
                    }}
                  >
                    {availableLivestock.map(al => (
                      <option key={al.id} value={al.id}>{al.type.charAt(0).toUpperCase() + al.type.slice(1)}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="Amount/Count"
                    className="w-24 p-2 border rounded"
                    value={ls.count === 0 ? '' : ls.count}
                    onChange={(e) => {
                      const updated = [...selectedLivestock];
                      updated[idx].count = parseInt(e.target.value) || 0;
                      setSelectedLivestock(updated);
                    }}
                  />
                  <button type="button" onClick={() => removeLivestock(idx)} className="text-red-500 hover:text-red-700 p-2">
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* CROPS DYNAMIC INPUT */}
            <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-800">
                  Crops Information
                </label>
                <button type="button" onClick={addCrop} className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200">
                  + Add Crop
                </button>
              </div>

              {selectedCrops.length === 0 && <p className="text-sm text-gray-500 italic">No crops added. Click above to add.</p>}

              {selectedCrops.map((c, idx) => (
                <div key={idx} className="flex gap-2 mb-2 items-center bg-white p-2 border rounded">
                  <select
                    className="flex-1 p-2 border rounded"
                    value={c.cropId}
                    onChange={(e) => {
                      const updated = [...selectedCrops];
                      updated[idx].cropId = e.target.value;
                      setSelectedCrops(updated);
                    }}
                  >
                    {availableCrops.map(ac => (
                      <option key={ac.id} value={ac.id}>{ac.name}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    required
                    min="0.1"
                    step="0.1"
                    placeholder="Area (hectares)"
                    className="w-32 p-2 border rounded"
                    value={c.area === 0 ? '' : c.area}
                    onChange={(e) => {
                      const updated = [...selectedCrops];
                      updated[idx].area = parseFloat(e.target.value) || 0;
                      setSelectedCrops(updated);
                    }}
                  />
                  <button type="button" onClick={() => removeCrop(idx)} className="text-red-500 hover:text-red-700 p-2">
                    Remove
                  </button>
                </div>
              ))}
            </div>


            {/* BUTTONS */}
            <div className="flex gap-4 pt-4">

              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Farmer"}
              </button>

              <Link href="/farmers" className="flex-1">
                 <button
                   type="button"
                   className="w-full bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition font-semibold"
                 >
                   Cancel
                 </button>
              </Link>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
}