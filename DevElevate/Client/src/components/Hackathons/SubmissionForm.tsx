// components/Hackathons/SubmissionForm.tsx
import React, { useState } from 'react';
import { Hackathon, SubmissionRequest } from '../../types/hackathon';
import { Button } from '../ui/button';
import { hackathonApi, handleApiError } from '../../api/hackathonApi';
import { Github, ExternalLink, Upload, Plus, X, CheckCircle } from 'lucide-react';

interface SubmissionFormProps {
  hackathon: Hackathon;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ hackathon }) => {
  const [formData, setFormData] = useState<SubmissionRequest>({
    participationType: 'individual',
    projectTitle: '',
    projectDescription: '',
    repositoryUrl: '',
    liveDemoUrl: '',
    techStack: [],
    features: [],
    challenges: '',
    learnings: '',
  });

  const [currentTech, setCurrentTech] = useState('');
  const [currentFeature, setCurrentFeature] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [repoValidation, setRepoValidation] = useState<{ valid: boolean; message: string } | null>(null);

  const popularTech = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Express', 'FastAPI', 'Django', 'Flask',
    'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'Go', 'Rust',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase',
    'AWS', 'Docker', 'Kubernetes', 'TensorFlow', 'PyTorch',
    'Next.js', 'Nuxt.js', 'Svelte', 'Flutter', 'React Native'
  ];

  const handleInputChange = (field: keyof SubmissionRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateGitHubUrl = (url: string) => {
    const githubRegex = /^https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+\/?$/;
    if (!url) {
      setRepoValidation(null);
      return;
    }
    
    if (githubRegex.test(url)) {
      setRepoValidation({ valid: true, message: 'Valid GitHub repository URL' });
    } else {
      setRepoValidation({ valid: false, message: 'Please enter a valid GitHub repository URL (https://github.com/username/repo)' });
    }
  };

  const addTechStack = (tech: string) => {
    const techToAdd = tech.trim();
    if (techToAdd && !formData.techStack.includes(techToAdd)) {
      handleInputChange('techStack', [...formData.techStack, techToAdd]);
      setCurrentTech('');
    }
  };

  const removeTechStack = (tech: string) => {
    handleInputChange('techStack', formData.techStack.filter(t => t !== tech));
  };

  const addFeature = () => {
    const feature = currentFeature.trim();
    if (feature && !formData.features?.includes(feature)) {
      handleInputChange('features', [...(formData.features || []), feature]);
      setCurrentFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    handleInputChange('features', formData.features?.filter(f => f !== feature) || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!repoValidation?.valid) {
      setError('Please enter a valid GitHub repository URL');
      return;
    }

    if (formData.techStack.length === 0) {
      setError('Please add at least one technology to your tech stack');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await hackathonApi.submitProject(hackathon._id, formData);
      if (response.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          participationType: 'individual',
          projectTitle: '',
          projectDescription: '',
          repositoryUrl: '',
          liveDemoUrl: '',
          techStack: [],
          features: [],
          challenges: '',
          learnings: '',
        });
      }
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Submission Successful! 🎉
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Your project has been submitted to the hackathon. Good luck!
        </p>
        <Button onClick={() => setSuccess(false)} variant="outline">
          Submit Another Project
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Submission Guidelines */}
      <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Submission Guidelines</h3>
        <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <p>• Your repository must be public and contain a comprehensive README</p>
          <p>• Include setup instructions and project documentation</p>
          <p>• Make sure your code is well-commented and organized</p>
          <p>• Optional: Include a live demo link if your project is deployed</p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-100 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-6">
        {/* Participation Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Participation Type
          </label>
          <div className="flex gap-4">
            {hackathon.allowIndividualParticipation && (
              <label className="flex items-center">
                <input
                  type="radio"
                  name="participationType"
                  value="individual"
                  checked={formData.participationType === 'individual'}
                  onChange={(e) => handleInputChange('participationType', e.target.value)}
                  className="mr-2"
                />
                Individual
              </label>
            )}
            <label className="flex items-center">
              <input
                type="radio"
                name="participationType"
                value="team"
                checked={formData.participationType === 'team'}
                onChange={(e) => handleInputChange('participationType', e.target.value)}
                className="mr-2"
              />
              Team
            </label>
          </div>
        </div>

        {/* Project Title */}
        <div>
          <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Project Title *
          </label>
          <input
            type="text"
            id="projectTitle"
            value={formData.projectTitle}
            onChange={(e) => handleInputChange('projectTitle', e.target.value)}
            placeholder="Enter your project title..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
            maxLength={100}
          />
        </div>

        {/* Project Description */}
        <div>
          <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Project Description *
          </label>
          <textarea
            id="projectDescription"
            value={formData.projectDescription}
            onChange={(e) => handleInputChange('projectDescription', e.target.value)}
            placeholder="Describe what your project does, its main features, and what problem it solves..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
            maxLength={1000}
          />
          <p className="text-xs text-gray-500 mt-1">{formData.projectDescription.length}/1000 characters</p>
        </div>

        {/* Repository URL */}
        <div>
          <label htmlFor="repositoryUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            GitHub Repository URL *
          </label>
          <div className="relative">
            <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="url"
              id="repositoryUrl"
              value={formData.repositoryUrl}
              onChange={(e) => {
                handleInputChange('repositoryUrl', e.target.value);
                validateGitHubUrl(e.target.value);
              }}
              placeholder="https://github.com/username/repository"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>
          {repoValidation && (
            <p className={`text-xs mt-1 ${repoValidation.valid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {repoValidation.message}
            </p>
          )}
        </div>

        {/* Live Demo URL */}
        <div>
          <label htmlFor="liveDemoUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Live Demo URL (Optional)
          </label>
          <div className="relative">
            <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="url"
              id="liveDemoUrl"
              value={formData.liveDemoUrl}
              onChange={(e) => handleInputChange('liveDemoUrl', e.target.value)}
              placeholder="https://your-project-demo.com"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tech Stack *
          </label>
          
          {/* Popular tech quick-add buttons */}
          <div className="mb-3">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Popular technologies:</p>
            <div className="flex flex-wrap gap-2">
              {popularTech.filter(tech => !formData.techStack.includes(tech)).slice(0, 10).map(tech => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => addTechStack(tech)}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  + {tech}
                </button>
              ))}
            </div>
          </div>

          {/* Custom tech input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={currentTech}
              onChange={(e) => setCurrentTech(e.target.value)}
              placeholder="Add technology..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechStack(currentTech))}
            />
            <Button
              type="button"
              onClick={() => addTechStack(currentTech)}
              variant="outline"
              size="sm"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Selected tech stack */}
          {formData.techStack.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.techStack.map(tech => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full flex items-center gap-1"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechStack(tech)}
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Key Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Key Features (Optional)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={currentFeature}
              onChange={(e) => setCurrentFeature(e.target.value)}
              placeholder="Add a key feature..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
            />
            <Button
              type="button"
              onClick={addFeature}
              variant="outline"
              size="sm"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {formData.features && formData.features.length > 0 && (
            <div className="mt-3 space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="flex-1">{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(feature)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Challenges */}
        <div>
          <label htmlFor="challenges" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Challenges Faced (Optional)
          </label>
          <textarea
            id="challenges"
            value={formData.challenges}
            onChange={(e) => handleInputChange('challenges', e.target.value)}
            placeholder="What challenges did you face while building this project?"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            maxLength={500}
          />
          <p className="text-xs text-gray-500 mt-1">{(formData.challenges || '').length}/500 characters</p>
        </div>

        {/* Learnings */}
        <div>
          <label htmlFor="learnings" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            What Did You Learn? (Optional)
          </label>
          <textarea
            id="learnings"
            value={formData.learnings}
            onChange={(e) => handleInputChange('learnings', e.target.value)}
            placeholder="What new technologies or concepts did you learn while building this project?"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            maxLength={500}
          />
          <p className="text-xs text-gray-500 mt-1">{(formData.learnings || '').length}/500 characters</p>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            loading={loading}
            className="w-full"
            variant="primary"
            disabled={!repoValidation?.valid || formData.techStack.length === 0}
          >
            <Upload className="h-4 w-4 mr-2" />
            Submit Project
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SubmissionForm;
