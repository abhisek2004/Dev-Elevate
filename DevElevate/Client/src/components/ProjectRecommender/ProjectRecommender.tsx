import React, { useState, useEffect, useRef } from 'react';
import { Lightbulb, Sparkles, RefreshCw, BookOpen, Github, Tag, Clock, Save, Play, Users } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import PreferenceForm from './PreferenceForm';
import ProjectCard from './ProjectCard';
import CommunityShowcase from './CommunityShowcase';
import { generateProjectRecommendations, generateFallbackRecommendations } from '../../utils/groqAPI';
import { useGlobalState } from '../../contexts/GlobalContext';
import {
  getSavedProjects,
  saveProject,
  updateProjectStatus,
  isProjectSaved,
  type SavedProject
} from '../../utils/projectStorage';

export interface ProjectRecommendation {
  id: string;
  title: string;
  description: string;
  features: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  techStack: string[];
  tags: string[];
  estimatedTime: string;
  starterTutorials?: string[];
  githubBoilerplates?: string[];
  status?: 'saved' | 'in_progress' | 'completed';
}

export interface UserPreferences {
  techStack: string[];
  careerFocus: string;
  skillLevel: string;
  interestArea: string[];
}

const ProjectRecommender: React.FC = () => {
  const { state } = useGlobalState();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [recommendations, setRecommendations] = useState<ProjectRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [activeTab, setActiveTab] = useState<'form' | 'recommendations' | 'saved' | 'community'>('form');

  // Load saved projects on component mount
  useEffect(() => {
    setSavedProjects(getSavedProjects());
  }, []);

  // for dyanmic page title
      useEffect(()=>{
        document.title='DevElevate-AI Recommendations'
      },[])

  // for animations
  const ref=useRef(null)
  const inView=useInView(ref, {once:true})
  const heading='AI Project Recommender'
  const para=` Get personalized project recommendations powered by AI to accelerate your skill growth 
  and build an impressive portfolio`

  const containerVariants={
    hidden:{},
    visible:{
      transition:{staggerChildren:0.03}
    }
  }

  const textVariant={
    hidden:{opacity:0, x:-20},
    visible:{opacity:1, x:0},
    transition:{
      type:'spring',
      stiffness:100,
      damping:12
    }
  }


  const categoryContainerVar={
    hidden:{},
    visible:{transition:{staggerChildren:0.2, delayChildren:0.2}}
  }

  const categoryVariants={
    hidden:{opacity:0, y:-12, scale:0.5},
    visible:{opacity:1, y:0, scale:1},
    transition:{type:'spring', stiffness:50, damping:5}
  }

  const handlePreferencesSubmit = async (prefs: UserPreferences) => {
    setPreferences(prefs);
    setIsLoading(true);
    setActiveTab('recommendations');

    try {
      const projects = await generateProjectRecommendations(prefs);
      setRecommendations(projects);
    } catch (error) {
      console.error('Error generating recommendations:', error);
      // Fallback to example recommendations if API fails
      setRecommendations(generateFallbackRecommendations(prefs));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerateRecommendations = async () => {
    if (!preferences) return;
    setIsLoading(true);
    
    try {
      const projects = await generateProjectRecommendations(preferences);
      setRecommendations(projects);
    } catch (error) {
      console.error('Error regenerating recommendations:', error);
      setRecommendations(generateFallbackRecommendations(preferences));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProject = (project: ProjectRecommendation) => {
    try {
      const savedProject = saveProject(project);
      setSavedProjects(prev => [...prev, savedProject]);
    } catch (error) {
      console.error('Failed to save project:', error);
      // Could add toast notification here
    }
  };

  const handleProjectStatusChange = (projectId: string, status: ProjectRecommendation['status']) => {
    try {
      const updatedProject = updateProjectStatus(projectId, status);
      if (updatedProject) {
        setSavedProjects(prev =>
          prev.map(project =>
            project.id === projectId ? updatedProject : project
          )
        );
      }
    } catch (error) {
      console.error('Failed to update project status:', error);
      // Could add toast notification here
    }
  };

  const getExampleRecommendations = (prefs: UserPreferences): ProjectRecommendation[] => {
    // Fallback recommendations based on preferences
    const examples: ProjectRecommendation[] = [
      {
        id: '1',
        title: 'Smart Appointment Booking System',
        description: 'A comprehensive booking platform with role-based dashboards, calendar integration, and automated email notifications.',
        features: ['Role-based dashboard', 'Calendar view', 'Email alerts', 'Payment integration', 'SMS notifications'],
        difficulty: 'Intermediate',
        techStack: ['React', 'Node.js', 'MongoDB', 'Express.js'],
        tags: ['#fullstack', '#productivity', '#mern', '#calendar'],
        estimatedTime: '3-4 weeks',
        starterTutorials: ['Building a MERN Stack Application', 'Calendar Integration Guide'],
        githubBoilerplates: ['https://github.com/example/booking-system']
      },
      {
        id: '2',
        title: 'Personal Finance Tracker',
        description: 'Track expenses, income, and financial goals with beautiful charts and insights.',
        features: ['Expense tracking', 'Budget planning', 'Financial goals', 'Data visualization', 'Export reports'],
        difficulty: prefs.skillLevel === 'Beginner' ? 'Beginner' : 'Intermediate',
        techStack: prefs.techStack.includes('React') ? ['React', 'JavaScript'] : ['HTML', 'CSS', 'JavaScript'],
        tags: ['#finance', '#productivity', '#charts', '#budgeting'],
        estimatedTime: '2-3 weeks',
        starterTutorials: ['Chart.js Basics', 'Local Storage in JavaScript'],
        githubBoilerplates: ['https://github.com/example/finance-tracker']
      },
      {
        id: '3',
        title: 'AI-Powered Study Assistant',
        description: 'An intelligent study companion that creates quizzes, tracks progress, and provides personalized learning paths.',
        features: ['AI quiz generation', 'Progress tracking', 'Study reminders', 'Performance analytics', 'Study groups'],
        difficulty: 'Advanced',
        techStack: ['React', 'Node.js', 'Python', 'MongoDB'],
        tags: ['#ai', '#education', '#machine-learning', '#study'],
        estimatedTime: '4-6 weeks',
        starterTutorials: ['Introduction to AI APIs', 'Building Educational Apps'],
        githubBoilerplates: ['https://github.com/example/ai-study-assistant']
      }
    ];

    return examples.filter(project => {
      // Filter by skill level
      if (prefs.skillLevel === 'Beginner' && project.difficulty === 'Advanced') return false;
      if (prefs.skillLevel === 'Advanced' && project.difficulty === 'Beginner') return false;

      // Filter by interest areas (check if any interest area matches project themes)
      const hasMatchingInterest = prefs.interestArea.some(interest => {
        const projectText = (project.title + ' ' + project.description + ' ' + project.tags.join(' ')).toLowerCase();
        return projectText.includes(interest.toLowerCase());
      });

      return hasMatchingInterest || prefs.interestArea.length === 0;
    });
  };

  return (
    <motion.div
    initial={{opacity:0, y:20}}
     animate={{opacity:1, y:0}}
     transition={{type:'spring', stiffness:50, damping:5}}
    className={`min-h-screen transition-colors duration-200 ${
      state.darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <motion.div
              initial={{rotate:0}}
              animate={{rotate:360}}
              transition={{delay:0.2, duration:0.5}}
              className="w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Lightbulb className="w-8 h-8 text-white" />
              </motion.div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 rounded-full animate-bounce"></div>
            </div>
          </div>
          <motion.h1 
          ref={ref}
           variants={containerVariants}
           initial='hidden'
           animate={inView? 'visible':'hidden'}
          className={`text-5xl font-bold mb-6 ${
            state.darkMode
              ? 'text-white'
              : 'bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent'
          }`}>
            {heading.split('').map((charItem, i)=>(
                          <motion.span
                           variants={textVariant}
                          key={i}
                          >
                            {charItem}
                          </motion.span>
                        ))}
          </motion.h1>
          <motion.p
           ref={ref}
           variants={containerVariants}
           initial='hidden'
           animate={inView? 'visible':'hidden'}
          className={`text-xl max-w-4xl mx-auto leading-relaxed ${
            state.darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
           {para.split('').map((charItem, i)=>(
                          <motion.span
                           variants={textVariant}
                          key={i}
                          >
                            {charItem}
                          </motion.span>
                        ))}
          </motion.p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-10">
          <motion.div 
           ref={ref}
         variants={categoryContainerVar}
         initial='hidden'
         animate={inView? 'visible':'hidden'}
          className={`flex rounded-2xl p-1.5 border shadow-lg ${
            state.darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white/80 backdrop-blur-sm border-gray-200/50'
          }`}>
            {[
              { id: 'form', label: 'Preferences', icon: Sparkles },
              { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
              { id: 'saved', label: 'Saved Projects', icon: BookOpen },
              { id: 'community', label: 'Community', icon: Users }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                 variants={categoryVariants}
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                      : state.darkMode
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-blue-50 hover:shadow-md'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PreferenceForm onSubmit={handlePreferencesSubmit} />
            </motion.div>
          )}

          {activeTab === 'recommendations' && (
            <motion.div
              key="recommendations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                {/* Regenerate Button */}
                {recommendations.length > 0 && (
                  <div className="flex justify-center">
                    <button
                      onClick={handleRegenerateRecommendations}
                      disabled={isLoading}
                      className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-2xl hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl font-semibold"
                    >
                      <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                      <span>Generate New Recommendations</span>
                    </button>
                  </div>
                )}

                {/* Loading State */}
                {isLoading && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                    <p className={`text-lg ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      AI is generating personalized recommendations...
                    </p>
                  </div>
                )}

                {/* Recommendations Grid */}
                {!isLoading && recommendations.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendations.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <ProjectCard
                          project={project}
                          onSave={() => handleSaveProject(project)}
                          isSaved={isProjectSaved(project.id)}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Empty State */}
                {!isLoading && recommendations.length === 0 && (
                  <div className={`text-center py-16 rounded-2xl border-2 border-dashed ${
                    state.darkMode ? 'border-gray-600 bg-gray-800/50' : 'border-gray-300 bg-white/50'
                  }`}>
                    <div className="relative">
                      <Lightbulb className={`w-20 h-20 mx-auto mb-6 ${
                        state.darkMode ? 'text-gray-600' : 'text-blue-400'
                      }`} />
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-yellow-300 rounded-full animate-ping opacity-30"></div>
                    </div>
                    <h3 className={`text-2xl font-bold mb-3 ${
                      state.darkMode
                        ? 'text-gray-300'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                    }`}>
                      Ready to discover amazing projects?
                    </h3>
                    <p className={`text-lg ${
                      state.darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Fill out your preferences to get personalized AI recommendations
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'saved' && (
            <motion.div
              key="saved"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {savedProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <ProjectCard
                        project={project}
                        onSave={() => {}}
                        isSaved={true}
                        onStatusChange={(status) => handleProjectStatusChange(project.id, status)}
                        showStatusControls={true}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className={`text-center py-16 rounded-2xl border-2 border-dashed ${
                  state.darkMode ? 'border-gray-600 bg-gray-800/50' : 'border-gray-300 bg-white/50'
                }`}>
                  <div className="relative">
                    <BookOpen className={`w-20 h-20 mx-auto mb-6 ${
                      state.darkMode ? 'text-gray-600' : 'text-indigo-400'
                    }`} />
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-indigo-300 rounded-full animate-pulse opacity-40"></div>
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 ${
                    state.darkMode
                      ? 'text-gray-300'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'
                  }`}>
                    No saved projects yet
                  </h3>
                  <p className={`text-lg ${
                    state.darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Save projects from your recommendations to track your progress
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'community' && (
            <motion.div
              key="community"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CommunityShowcase />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProjectRecommender;
