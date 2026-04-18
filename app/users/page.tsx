"use client";

import Sidebar from "../sidebar/Sidebar";
import { useState, useEffect } from "react";
import { getUsers, createUser, deleteUser, updateUserRole } from "./actions";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", role: "user", password: "" });
  const [formMessage, setFormMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadUsers = () => {
    setLoading(true);
    getUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormMessage(null);

    const result = await createUser(formData);
    if (result.success) {
      setFormMessage({ type: "success", text: "User created successfully!" });
      setFormData({ name: "", email: "", role: "user", password: "" });
      loadUsers();
      setTimeout(() => setShowForm(false), 1500);
    } else {
      setFormMessage({ type: "error", text: result.error || "Failed to create user." });
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      const result = await deleteUser(id);
      if (result.success) {
        loadUsers();
      } else {
        alert(result.error || "Failed to delete user");
      }
    }
  };

  const handleRoleToggle = async (id: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    if (confirm(`Change this user's role to ${newRole.toUpperCase()}?`)) {
      const result = await updateUserRole(id, newRole);
      if (result.success) {
        loadUsers();
      } else {
        alert(result.error || "Failed to update role");
      }
    }
  };

  const adminsCount = users.filter(u => u.role === "admin").length;
  const regularUsersCount = users.filter(u => u.role === "user").length;

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-50 min-h-screen ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-900">User Management</h1>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            {showForm ? "Cancel" : "+ Add New User"}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-green-600">{users.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Admins</h3>
            <p className="text-3xl font-bold text-green-600">{adminsCount}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Regular Users</h3>
            <p className="text-3xl font-bold text-green-600">{regularUsersCount}</p>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-green-200">
            <h2 className="text-xl font-semibold mb-4 text-green-900">Create New User</h2>
            
            {formMessage && (
              <div className={`mb-4 p-4 rounded-lg ${formMessage.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {formMessage.text}
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-2 border rounded focus:ring-green-500"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-2 border rounded focus:ring-green-500"
                    placeholder="name@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full p-2 border rounded focus:ring-green-500"
                    placeholder="Secure password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full p-2 border rounded focus:ring-green-500"
                  >
                    <option value="user">Regular User</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-50"
                >
                  {submitting ? "Saving..." : "Save User"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-green-900">System Users</h2>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <p className="p-6 text-gray-500">Loading users...</p>
            ) : users.length === 0 ? (
              <p className="p-6 text-gray-500">No users found. Create one above!</p>
            ) : (
            <table className="min-w-full table-auto">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">Joined Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-green-900 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                      }`}>
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleRoleToggle(user.id, user.role)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        {user.role === "admin" ? "Demote" : "Make Admin"}
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id, user.name || user.email)}
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
      </div>
    </div>
  );
}
