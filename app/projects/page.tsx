"use client";

import Sidebar from "../sidebar/Sidebar";
import { useState, useEffect } from "react";
import { getProjects, createProject, updateProject, deleteProject, type Project } from "./actions";

interface ProjectFormData {
  name: string;
  description: string;
  location: string;
  budget: number;
  startDate: string;
  endDate: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [viewingProject, setViewingProject] = useState<Project | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    location: '',
    budget: 0,
    startDate: '',
    endDate: ''
  });

  // Fetch projects from local database
  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-200 text-green-800";
      case "completed":
        return "bg-blue-200 text-blue-800";
      case "planning":
        return "bg-yellow-200 text-yellow-800";
      case "cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200";
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      location: '',
      budget: 0,
      startDate: '',
      endDate: ''
    });
    setEditingProject(null);
    setShowAddForm(false);
  };

  const handleAddProject = () => {
    resetForm();
    setShowAddForm(true);
  };

  const handleEditProject = (project: Project) => {
    setFormData({
      name: project.name,
      description: project.description || '',
      location: project.location || '',
      budget: project.budget || 0,
      startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
      endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : ''
    });
    setEditingProject(project);
    setShowAddForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('location', formData.location);
    if (formData.budget > 0) {
      formDataToSend.append('budget', formData.budget.toString());
    }
    if (formData.startDate) {
      formDataToSend.append('startDate', formData.startDate);
    }
    if (formData.endDate) {
      formDataToSend.append('endDate', formData.endDate);
    }

    try {
      let result;
      if (editingProject) {
        // Update existing project
        formDataToSend.append('id', editingProject.id);
        result = await updateProject(formDataToSend);
      } else {
        // Create new project
        result = await createProject(formDataToSend);
      }

      if (result.success) {
        setMessage({ type: 'success', text: editingProject ? 'Project updated successfully!' : 'Project created successfully!' });
        resetForm();
        fetchProjects(); // Refresh the list
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Error saving project. Please try again.' });
      }
    } catch (error) {
      console.error('Error saving project:', error);
      setMessage({ type: 'error', text: 'Error saving project. Please try again.' });
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const result = await deleteProject(projectId);
      if (result.success) {
        setMessage({ type: 'success', text: 'Project deleted successfully!' });
        fetchProjects(); // Refresh the list
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Error deleting project. Please try again.' });
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      setMessage({ type: 'error', text: 'Error deleting project. Please try again.' });
    }
  };

  const handleViewProject = (project: Project) => {
    setViewingProject(project);
  };

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="ml-56 flex-1 p-6 bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-xl">Loading projects...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-56 flex-1 p-6 bg-gray-50 min-h-screen">
        {/* Success/Error Messages */}
        {message && (
          <div className={`mb-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-900">Projects Management</h1>
          <button
            onClick={handleAddProject}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            + Add New Project
          </button>
        </div>

        {/* Add/Edit Project Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-green-900">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter project name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter location"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  rows={3}
                  placeholder="Enter project description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget ($)
                  </label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  {editingProject ? 'Update Project' : 'Create Project'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-green-900">Projects List</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Project Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{project.name}</div>
                        <div className="text-sm text-gray-500">{project.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {project.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(project.status)}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {project.budget ? `$${project.budget.toLocaleString()}` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {project.startDate && project.endDate
                        ? `${new Date(project.startDate).toLocaleDateString()} - ${new Date(project.endDate).toLocaleDateString()}`
                        : 'N/A'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleViewProject(project)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEditProject(project)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {projects.length === 0 && (
            <div className="px-6 py-8 text-center text-gray-500">
              No projects found. Click "Add Project" to create your first project.
            </div>
          )}
        </div>

        {/* View Project Modal */}
        {viewingProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-green-900">{viewingProject.name}</h2>
                <button
                  onClick={() => setViewingProject(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Description:</label>
                  <p className="text-gray-600">{viewingProject.description || 'N/A'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Location:</label>
                    <p className="text-gray-600">{viewingProject.location || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Status:</label>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusStyle(viewingProject.status)}`}>
                      {viewingProject.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Budget:</label>
                    <p className="text-gray-600">${viewingProject.budget ? viewingProject.budget.toLocaleString() : '0'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Duration:</label>
                    <p className="text-gray-600">
                      {viewingProject.startDate && viewingProject.endDate
                        ? `${new Date(viewingProject.startDate).toLocaleDateString()} - ${new Date(viewingProject.endDate).toLocaleDateString()}`
                        : 'N/A'
                      }
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Created:</label>
                  <p className="text-gray-600">{new Date(viewingProject.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    handleEditProject(viewingProject);
                    setViewingProject(null);
                  }}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Edit Project
                </button>
                <button
                  onClick={() => setViewingProject(null)}
                  className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}