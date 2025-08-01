import type { ProjectRecommendation } from '../components/ProjectRecommender/ProjectRecommender';

const STORAGE_KEY = 'develevate_saved_projects';

export interface SavedProject extends ProjectRecommendation {
  savedAt: string;
  lastUpdated: string;
}

// Get all saved projects from localStorage
export const getSavedProjects = (): SavedProject[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading saved projects:', error);
    return [];
  }
};

// Save a project to localStorage
export const saveProject = (project: ProjectRecommendation): SavedProject => {
  const savedProject: SavedProject = {
    ...project,
    savedAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    status: 'saved'
  };

  const existingProjects = getSavedProjects();
  const updatedProjects = [...existingProjects, savedProject];
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
    return savedProject;
  } catch (error) {
    console.error('Error saving project:', error);
    throw new Error('Failed to save project');
  }
};

// Update project status
export const updateProjectStatus = (
  projectId: string, 
  status: ProjectRecommendation['status']
): SavedProject | null => {
  const savedProjects = getSavedProjects();
  const projectIndex = savedProjects.findIndex(p => p.id === projectId);
  
  if (projectIndex === -1) {
    return null;
  }

  savedProjects[projectIndex] = {
    ...savedProjects[projectIndex],
    status,
    lastUpdated: new Date().toISOString()
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedProjects));
    return savedProjects[projectIndex];
  } catch (error) {
    console.error('Error updating project status:', error);
    throw new Error('Failed to update project status');
  }
};

// Remove a project from saved list
export const removeProject = (projectId: string): void => {
  const savedProjects = getSavedProjects();
  const updatedProjects = savedProjects.filter(p => p.id !== projectId);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
  } catch (error) {
    console.error('Error removing project:', error);
    throw new Error('Failed to remove project');
  }
};

// Check if a project is already saved
export const isProjectSaved = (projectId: string): boolean => {
  const savedProjects = getSavedProjects();
  return savedProjects.some(p => p.id === projectId);
};

// Get project statistics
export const getProjectStats = () => {
  const savedProjects = getSavedProjects();
  
  return {
    total: savedProjects.length,
    saved: savedProjects.filter(p => p.status === 'saved').length,
    inProgress: savedProjects.filter(p => p.status === 'in_progress').length,
    completed: savedProjects.filter(p => p.status === 'completed').length
  };
};

// Export all project data (for backup/sharing)
export const exportProjectData = (): string => {
  const savedProjects = getSavedProjects();
  return JSON.stringify(savedProjects, null, 2);
};

// Import project data (from backup)
export const importProjectData = (jsonData: string): void => {
  try {
    const projects = JSON.parse(jsonData);
    if (Array.isArray(projects)) {
      localStorage.setItem(STORAGE_KEY, jsonData);
    } else {
      throw new Error('Invalid project data format');
    }
  } catch (error) {
    console.error('Error importing project data:', error);
    throw new Error('Failed to import project data');
  }
};
