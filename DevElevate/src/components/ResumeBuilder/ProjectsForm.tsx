import React, { useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';

const ProjectsForm: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    technologies: [] as string[],
    url: '' as string
  });
  const [newTech, setNewTech] = useState('');

  const addProject = () => {
    if (state.resume && formData.name && formData.description) {
      const updatedResume = {
        ...state.resume,
        projects: [...state.resume.projects, formData]
      };
      dispatch({ type: 'UPDATE_RESUME', payload: updatedResume });
      setFormData({ name: '', description: '', technologies: [], url: '' });
    }
  };

  const updateProject = (index: number) => {
    if (state.resume) {
      const updatedProjects = [...state.resume.projects];
      updatedProjects[index] = formData;
      const updatedResume = {
        ...state.resume,
        projects: updatedProjects
      };
      dispatch({ type: 'UPDATE_RESUME', payload: updatedResume });
      setEditingIndex(null);
      setFormData({ name: '', description: '', technologies: [], url: '' });
    }
  };

  const deleteProject = (index: number) => {
    if (state.resume) {
      const updatedProjects = state.resume.projects.filter((_, i) => i !== index);
      const updatedResume = {
        ...state.resume,
        projects: updatedProjects
      };
      dispatch({ type: 'UPDATE_RESUME', payload: updatedResume });
    }
  };

  const startEdit = (index: number) => {
    if (state.resume && state.resume.projects && state.resume.projects[index]) {
      setEditingIndex(index);
      const project = state.resume.projects[index];
      setFormData({
        name: project.name,
        description: project.description,
        technologies: project.technologies,
        url: project.url || ''
      });
    }
  };

  const addTechnology = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTech.trim()]
      });
      setNewTech('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech)
    });
  };

  if (!state.resume) return null;

  return (
    <div>
      <h2 className={`text-2xl font-bold mb-6 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
        Projects
      </h2>

      {/* Project Form */}
      <div className={`p-6 rounded-lg border ${state.darkMode ? 'border-gray-700' : 'border-gray-200'} mb-6`}>
        <h3 className={`text-lg font-semibold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
          {editingIndex !== null ? 'Edit Project' : 'Add New Project'}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Project Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${
                state.darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="E-commerce Web Application"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className={`w-full px-3 py-2 rounded-lg border ${
                state.darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Built a full-stack e-commerce platform with user authentication, payment integration, and admin dashboard..."
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Technologies Used
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTechnology()}
                className={`flex-1 px-3 py-2 rounded-lg border ${
                  state.darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="React, Node.js, MongoDB..."
              />
              <button
                onClick={addTechnology}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm flex items-center space-x-2 ${
                    state.darkMode
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <span>{tech}</span>
                  <button
                    onClick={() => removeTechnology(tech)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Project URL (Optional)
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${
                state.darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="https://github.com/username/project"
            />
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={editingIndex !== null ? () => updateProject(editingIndex) : addProject}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            {editingIndex !== null ? 'Update Project' : 'Add Project'}
          </button>
          {editingIndex !== null && (
            <button
              onClick={() => {
                setEditingIndex(null);
                setFormData({ name: '', description: '', technologies: [], url: '' });
              }}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {state.resume.projects.map((project, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${state.darkMode ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className={`font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {project.name}
                </h4>
                <p className={`text-sm ${state.darkMode ? 'text-gray-300' : 'text-gray-700'} mt-1`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-2 py-1 rounded-full text-xs ${
                        state.darkMode
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 text-sm mt-2 inline-block"
                  >
                    View Project
                  </a>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => startEdit(index)}
                  className="p-2 text-blue-500 hover:text-blue-600"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteProject(index)}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsForm;