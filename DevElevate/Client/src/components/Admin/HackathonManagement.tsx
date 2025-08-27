// components/Admin/HackathonManagement.tsx
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { hackathonApi, handleApiError } from '../../api/hackathonApi';
import { CreateHackathonRequest, Prize } from '../../types/hackathon';
import { Plus, X, Calendar, Trophy, Settings, FileText } from 'lucide-react';

const HackathonManagement: React.FC = () => {
  const [formData, setFormData] = useState<CreateHackathonRequest>({
    title: '',
    description: '',
    theme: '',
    startDate: new Date(),
    endDate: new Date(),
    registrationDeadline: new Date(),
    maxTeamSize: 4,
    minTeamSize: 1,
    prizes: [
      { position: '1st', title: 'First Place', description: '', value: '' },
      { position: '2nd', title: 'Second Place', description: '', value: '' },
      { position: '3rd', title: 'Third Place', description: '', value: '' }
    ],
    rules: [''],
    judgingCriteria: [''],
    allowIndividualParticipation: true,
    bannerImage: '',
    tags: []
  });

  const [currentTag, setCurrentTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const popularTags = [
    'Web Development', 'Mobile App', 'AI/ML', 'Blockchain', 'IoT',
    'Game Development', 'Data Science', 'Cybersecurity', 'DevOps',
    'React', 'Node.js', 'Python', 'JavaScript', 'Flutter'
  ];

  const handleInputChange = (field: keyof CreateHackathonRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addPrize = () => {
    setFormData(prev => ({
      ...prev,
      prizes: [...prev.prizes, { position: '', title: '', description: '', value: '' }]
    }));
  };

  const updatePrize = (index: number, field: keyof Prize, value: string) => {
    setFormData(prev => ({
      ...prev,
      prizes: prev.prizes.map((prize, i) => 
        i === index ? { ...prize, [field]: value } : prize
      )
    }));
  };

  const removePrize = (index: number) => {
    setFormData(prev => ({
      ...prev,
      prizes: prev.prizes.filter((_, i) => i !== index)
    }));
  };

  const addRule = () => {
    setFormData(prev => ({ ...prev, rules: [...prev.rules, ''] }));
  };

  const updateRule = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      rules: prev.rules.map((rule, i) => i === index ? value : rule)
    }));
  };

  const removeRule = (index: number) => {
    setFormData(prev => ({ ...prev, rules: prev.rules.filter((_, i) => i !== index) }));
  };

  const addJudgingCriteria = () => {
    setFormData(prev => ({ ...prev, judgingCriteria: [...prev.judgingCriteria, ''] }));
  };

  const updateJudgingCriteria = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      judgingCriteria: prev.judgingCriteria.map((criteria, i) => i === index ? value : criteria)
    }));
  };

  const removeJudgingCriteria = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      judgingCriteria: prev.judgingCriteria.filter((_, i) => i !== index) 
    }));
  };

  const addTag = (tag: string) => {
    const tagToAdd = tag.trim();
    if (tagToAdd && !formData.tags.includes(tagToAdd)) {
      handleInputChange('tags', [...formData.tags, tagToAdd]);
      setCurrentTag('');
    }
  };

  const removeTag = (tag: string) => {
    handleInputChange('tags', formData.tags.filter(t => t !== tag));
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().slice(0, 16);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const filteredRules = formData.rules.filter(rule => rule.trim());
    const filteredCriteria = formData.judgingCriteria.filter(criteria => criteria.trim());
    
    if (filteredRules.length === 0) {
      setError('Please add at least one rule');
      return;
    }
    
    if (filteredCriteria.length === 0) {
      setError('Please add at least one judging criteria');
      return;
    }

    if (new Date(formData.startDate) <= new Date()) {
      setError('Start date must be in the future');
      return;
    }

    if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      setError('End date must be after start date');
      return;
    }

    if (new Date(formData.registrationDeadline) >= new Date(formData.startDate)) {
      setError('Registration deadline must be before start date');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const submitData = {
        ...formData,
        rules: filteredRules,
        judgingCriteria: filteredCriteria,
        prizes: formData.prizes.filter(prize => prize.title.trim())
      };

      const response = await hackathonApi.createHackathon(submitData);
      if (response.success) {
        setSuccess('Hackathon created successfully!');
        // Reset form
        setFormData({
          title: '',
          description: '',
          theme: '',
          startDate: new Date(),
          endDate: new Date(),
          registrationDeadline: new Date(),
          maxTeamSize: 4,
          minTeamSize: 1,
          prizes: [
            { position: '1st', title: 'First Place', description: '', value: '' },
            { position: '2nd', title: 'Second Place', description: '', value: '' },
            { position: '3rd', title: 'Third Place', description: '', value: '' }
          ],
          rules: [''],
          judgingCriteria: [''],
          allowIndividualParticipation: true,
          bannerImage: '',
          tags: []
        });
      }
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
            Create New Hackathon
          </h2>
        </div>

        {/* Messages */}
        {error && (
          <div className="mx-6 mt-4 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-100 px-4 py-3 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mx-6 mt-4 bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-100 px-4 py-3 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="theme" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Theme *
                </label>
                <input
                  type="text"
                  id="theme"
                  value={formData.theme}
                  onChange={(e) => handleInputChange('theme', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="bannerImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Banner Image URL (Optional)
              </label>
              <input
                type="url"
                id="bannerImage"
                value={formData.bannerImage}
                onChange={(e) => handleInputChange('bannerImage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Timeline
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="registrationDeadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Registration Deadline *
                </label>
                <input
                  type="datetime-local"
                  id="registrationDeadline"
                  value={formatDateForInput(new Date(formData.registrationDeadline))}
                  onChange={(e) => handleInputChange('registrationDeadline', new Date(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Date *
                </label>
                <input
                  type="datetime-local"
                  id="startDate"
                  value={formatDateForInput(new Date(formData.startDate))}
                  onChange={(e) => handleInputChange('startDate', new Date(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  End Date *
                </label>
                <input
                  type="datetime-local"
                  id="endDate"
                  value={formatDateForInput(new Date(formData.endDate))}
                  onChange={(e) => handleInputChange('endDate', new Date(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* Team Settings */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Team Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="minTeamSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Min Team Size *
                </label>
                <input
                  type="number"
                  id="minTeamSize"
                  min={1}
                  max={10}
                  value={formData.minTeamSize}
                  onChange={(e) => handleInputChange('minTeamSize', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="maxTeamSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Max Team Size *
                </label>
                <input
                  type="number"
                  id="maxTeamSize"
                  min={1}
                  max={10}
                  value={formData.maxTeamSize}
                  onChange={(e) => handleInputChange('maxTeamSize', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.allowIndividualParticipation}
                    onChange={(e) => handleInputChange('allowIndividualParticipation', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Allow Individual Participation</span>
                </label>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tags
            </label>
            
            {/* Popular tags */}
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Popular tags:</p>
              <div className="flex flex-wrap gap-2">
                {popularTags.filter(tag => !formData.tags.includes(tag)).slice(0, 10).map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addTag(tag)}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom tag input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Add custom tag..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(currentTag))}
              />
              <Button type="button" onClick={() => addTag(currentTag)} variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Selected tags */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full flex items-center gap-1"
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              type="submit"
              loading={loading}
              className="w-full md:w-auto"
              variant="primary"
              size="lg"
            >
              Create Hackathon
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HackathonManagement;
