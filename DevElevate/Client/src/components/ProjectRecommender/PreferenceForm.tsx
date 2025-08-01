import React, { useState } from 'react';
import { Check, ChevronDown, Sparkles, Code, Target, Brain, Star, Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGlobalState } from '../../contexts/GlobalContext';

interface PreferenceFormProps {
  onSubmit: (preferences: {
    techStack: string[];
    careerFocus: string;
    skillLevel: string;
    interestArea: string[];
  }) => void;
}

const PreferenceForm: React.FC<PreferenceFormProps> = ({ onSubmit }) => {
  const { state } = useGlobalState();
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
  const [careerFocus, setCareerFocus] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [selectedInterestAreas, setSelectedInterestAreas] = useState<string[]>([]);
  const [showTechDropdown, setShowTechDropdown] = useState(false);
  const [techSearchTerm, setTechSearchTerm] = useState('');

  const techStackOptions = [
    // Frontend
    'HTML', 'CSS', 'JavaScript', 'TypeScript',
    'React.js', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js',
    'Tailwind CSS', 'Bootstrap', 'Material-UI', 'Chakra UI',
    'jQuery', 'Alpine.js', 'Sass/SCSS', 'Less',

    // Backend
    'Node.js', 'Express.js', 'Python', 'Django', 'Flask', 'FastAPI',
    'Java', 'Spring Boot', 'PHP', 'Laravel', 'Symfony',
    'Ruby', 'Ruby on Rails', 'Go', 'Rust', 'C#', '.NET Core',
    'Scala', 'Elixir', 'Phoenix',

    // Databases
    'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis',
    'Firebase', 'Supabase', 'DynamoDB', 'Cassandra', 'Neo4j',

    // Cloud & DevOps
    'AWS', 'Google Cloud', 'Azure', 'Digital Ocean', 'Heroku',
    'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'GitLab CI',
    'Terraform', 'Ansible', 'Nginx', 'Apache',

    // Mobile
    'React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic',
    'Xamarin', 'Cordova/PhoneGap', 'Expo',

    // Data Science & AI
    'TensorFlow', 'PyTorch', 'scikit-learn', 'Pandas', 'NumPy',
    'Jupyter', 'R', 'MATLAB', 'Tableau', 'Power BI',
    'Apache Spark', 'Hadoop', 'Keras', 'OpenCV',

    // Tools & Others
    'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Webpack', 'Vite',
    'Babel', 'ESLint', 'Prettier', 'Jest', 'Cypress', 'Selenium',
    'Figma', 'Adobe XD', 'Sketch', 'GraphQL', 'REST APIs',
    'Socket.io', 'WebRTC', 'Stripe', 'PayPal', 'Shopify'
  ];

  const careerFocusOptions = [
    { value: 'Frontend Development', icon: '🎨', description: 'User interfaces & experiences' },
    { value: 'Backend Development', icon: '⚙️', description: 'Server-side & APIs' },
    { value: 'Full Stack Development', icon: '🔄', description: 'Frontend + Backend' },
    { value: 'Mobile Development', icon: '📱', description: 'iOS & Android apps' },
    { value: 'AI/Machine Learning', icon: '🧠', description: 'Artificial intelligence' },
    { value: 'Data Science', icon: '📊', description: 'Data analysis & insights' },
    { value: 'DevOps/Cloud', icon: '☁️', description: 'Infrastructure & deployment' },
    { value: 'Game Development', icon: '🎮', description: 'Gaming & interactive media' },
    { value: 'Cybersecurity', icon: '🔒', description: 'Security & protection' },
    { value: 'Blockchain', icon: '⛓️', description: 'Decentralized applications' }
  ];

  const skillLevelOptions = [
    { value: 'Beginner', icon: '🌱', description: 'Just starting my coding journey', color: 'green' },
    { value: 'Intermediate', icon: '🚀', description: 'Building projects & learning', color: 'blue' },
    { value: 'Advanced', icon: '⚡', description: 'Experienced & ready for complex challenges', color: 'purple' }
  ];

  const interestAreaOptions = [
    { value: 'Productivity', icon: '📈', description: 'Task management & efficiency tools' },
    { value: 'Healthcare', icon: '🏥', description: 'Medical & wellness applications' },
    { value: 'Education', icon: '📚', description: 'Learning & knowledge platforms' },
    { value: 'Finance', icon: '💰', description: 'Banking & investment tools' },
    { value: 'E-commerce', icon: '🛒', description: 'Online shopping & marketplaces' },
    { value: 'Social Media', icon: '💬', description: 'Community & networking platforms' },
    { value: 'Entertainment', icon: '🎭', description: 'Games & media applications' },
    { value: 'Travel', icon: '✈️', description: 'Tourism & location services' },
    { value: 'Food & Dining', icon: '🍕', description: 'Restaurant & recipe apps' },
    { value: 'Fitness', icon: '💪', description: 'Health & workout tracking' },
    { value: 'Real Estate', icon: '🏠', description: 'Property & housing platforms' },
    { value: 'Transportation', icon: '🚗', description: 'Mobility & logistics' },
    { value: 'Environmental', icon: '🌱', description: 'Sustainability & green tech' },
    { value: 'AI Tools', icon: '🤖', description: 'Artificial intelligence utilities' },
    { value: 'Developer Tools', icon: '���', description: 'Programming & development aids' },
    { value: 'Open Source', icon: '🌍', description: 'Community-driven projects' }
  ];

  const handleTechStackToggle = (tech: string) => {
    setSelectedTechStack(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const handleInterestAreaToggle = (interest: string) => {
    setSelectedInterestAreas(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTechStack.length > 0 && careerFocus && skillLevel && selectedInterestAreas.length > 0) {
      onSubmit({
        techStack: selectedTechStack,
        careerFocus,
        skillLevel,
        interestArea: selectedInterestAreas
      });
    }
  };

  const isFormValid = selectedTechStack.length > 0 && careerFocus && skillLevel && selectedInterestAreas.length > 0;

  const filteredTechOptions = techStackOptions.filter(tech =>
    tech.toLowerCase().includes(techSearchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`max-w-4xl mx-auto rounded-2xl shadow-xl p-8 border ${
        state.darkMode
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="text-center mb-10">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Sparkles className="w-10 h-10 text-white animate-pulse" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <h2 className={`text-4xl font-bold mb-4 ${
          state.darkMode
            ? 'text-white'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
        }`}>
          Let's Build Something Amazing
        </h2>
        <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${
          state.darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Share your skills and interests so our AI can recommend personalized projects that will accelerate your growth
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Tech Stack Selection */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <Code className="w-5 h-5 text-white" />
            </div>
            <div>
              <label className={`text-xl font-bold ${
                state.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Tech Stack & Tools
              </label>
              <p className={`text-sm ${
                state.darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Select technologies you know or want to learn
              </p>
            </div>
            <span className="text-red-500 text-lg">*</span>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowTechDropdown(!showTechDropdown)}
              className={`w-full flex items-center justify-between p-5 border-2 rounded-2xl transition-all duration-300 hover:shadow-lg ${
                selectedTechStack.length > 0
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                  : state.darkMode
                  ? 'bg-gray-800 border-gray-600 text-white hover:border-gray-500'
                  : 'bg-white border-gray-300 text-gray-900 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Search className="w-5 h-5 text-gray-400" />
                <span className="font-medium">
                  {selectedTechStack.length > 0
                    ? `${selectedTechStack.length} technologies selected`
                    : 'Search and select your technologies'
                  }
                </span>
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${
                showTechDropdown ? 'rotate-180 text-blue-500' : 'text-gray-400'
              }`} />
            </button>

            {showTechDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className={`absolute z-20 w-full mt-2 border-2 rounded-2xl shadow-2xl ${
                  state.darkMode
                    ? 'bg-gray-800 border-gray-600'
                    : 'bg-white border-gray-200'
                }`}
              >
                {/* Search Input */}
                <div className={`p-4 border-b ${
                  state.darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search technologies..."
                      value={techSearchTerm}
                      onChange={(e) => setTechSearchTerm(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        state.darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Tech Options */}
                <div className="max-h-64 overflow-y-auto p-2">
                  <div className="grid grid-cols-1 gap-1">
                    {filteredTechOptions.length > 0 ? (
                      filteredTechOptions.map((tech) => (
                        <button
                          key={tech}
                          type="button"
                          onClick={() => handleTechStackToggle(tech)}
                          className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                            selectedTechStack.includes(tech)
                              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
                              : state.darkMode
                              ? 'text-gray-300 hover:bg-gray-700'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <div className={`w-5 h-5 border-2 rounded-md flex items-center justify-center ${
                            selectedTechStack.includes(tech)
                              ? 'border-white bg-white/20'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}>
                            {selectedTechStack.includes(tech) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="font-medium">{tech}</span>
                        </button>
                      ))
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        No technologies found matching "{techSearchTerm}"
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Selected Tech Stack Tags */}
          {selectedTechStack.length > 0 && (
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  state.darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Selected Technologies ({selectedTechStack.length})
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedTechStack([])}
                  className="text-sm text-red-500 hover:text-red-600 font-medium"
                >
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedTechStack.map((tech) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleTechStackToggle(tech)}
                      className="ml-2 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Career Focus */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <label className={`text-xl font-bold ${
                state.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Career Focus
              </label>
              <p className={`text-sm ${
                state.darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                What's your primary development interest?
              </p>
            </div>
            <span className="text-red-500 text-lg">*</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {careerFocusOptions.map((focus) => (
              <motion.button
                key={focus.value}
                type="button"
                onClick={() => setCareerFocus(focus.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left relative overflow-hidden ${
                  careerFocus === focus.value
                    ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 shadow-lg'
                    : state.darkMode
                    ? 'border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700'
                    : 'border-gray-300 bg-white hover:border-gray-400 hover:shadow-md'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{focus.icon}</span>
                  <div className="flex-1">
                    <div className={`font-bold text-lg mb-1 ${
                      careerFocus === focus.value
                        ? 'text-green-700 dark:text-green-300'
                        : state.darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {focus.value}
                    </div>
                    <div className={`text-sm ${
                      careerFocus === focus.value
                        ? 'text-green-600 dark:text-green-400'
                        : state.darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {focus.description}
                    </div>
                  </div>
                </div>
                {careerFocus === focus.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Skill Level */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <label className={`text-xl font-bold ${
                state.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Skill Level
              </label>
              <p className={`text-sm ${
                state.darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Where are you in your coding journey?
              </p>
            </div>
            <span className="text-red-500 text-lg">*</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {skillLevelOptions.map((level) => (
              <motion.button
                key={level.value}
                type="button"
                onClick={() => setSkillLevel(level.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-8 rounded-2xl border-2 transition-all duration-300 text-center relative ${
                  skillLevel === level.value
                    ? level.color === 'green'
                      ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 shadow-lg'
                      : level.color === 'blue'
                      ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 shadow-lg'
                      : 'border-purple-500 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 shadow-lg'
                    : state.darkMode
                    ? 'border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700'
                    : 'border-gray-300 bg-white hover:border-gray-400 hover:shadow-md'
                }`}
              >
                <div className="text-4xl mb-4">{level.icon}</div>
                <div className={`font-bold text-xl mb-2 ${
                  skillLevel === level.value
                    ? level.color === 'green'
                      ? 'text-green-700 dark:text-green-300'
                      : level.color === 'blue'
                      ? 'text-blue-700 dark:text-blue-300'
                      : 'text-purple-700 dark:text-purple-300'
                    : state.darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {level.value}
                </div>
                <div className={`text-sm leading-relaxed ${
                  skillLevel === level.value
                    ? level.color === 'green'
                      ? 'text-green-600 dark:text-green-400'
                      : level.color === 'blue'
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-purple-600 dark:text-purple-400'
                    : state.darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {level.description}
                </div>
                {skillLevel === level.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center ${
                      level.color === 'green'
                        ? 'bg-green-500'
                        : level.color === 'blue'
                        ? 'bg-blue-500'
                        : 'bg-purple-500'
                    }`}
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Interest Areas */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <label className={`text-xl font-bold ${
                state.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Interest Areas
              </label>
              <p className={`text-sm ${
                state.darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Choose multiple areas that excite you (select 1-5)
              </p>
            </div>
            <span className="text-red-500 text-lg">*</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {interestAreaOptions.map((interest) => (
              <motion.button
                key={interest.value}
                type="button"
                onClick={() => handleInterestAreaToggle(interest.value)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`p-5 rounded-2xl border-2 transition-all duration-300 text-left relative overflow-hidden ${
                  selectedInterestAreas.includes(interest.value)
                    ? 'border-yellow-500 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 shadow-lg'
                    : state.darkMode
                    ? 'border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700'
                    : 'border-gray-300 bg-white hover:border-gray-400 hover:shadow-md'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{interest.icon}</span>
                  <div className="flex-1">
                    <div className={`font-bold text-base mb-1 ${
                      selectedInterestAreas.includes(interest.value)
                        ? 'text-yellow-700 dark:text-yellow-300'
                        : state.darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {interest.value}
                    </div>
                    <div className={`text-xs leading-relaxed ${
                      selectedInterestAreas.includes(interest.value)
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : state.darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {interest.description}
                    </div>
                  </div>
                </div>
                {selectedInterestAreas.includes(interest.value) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Selected Interest Areas */}
          {selectedInterestAreas.length > 0 && (
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  state.darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Selected Interest Areas ({selectedInterestAreas.length}/5)
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedInterestAreas([])}
                  className="text-sm text-red-500 hover:text-red-600 font-medium"
                >
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedInterestAreas.map((interest) => (
                  <motion.span
                    key={interest}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={() => handleInterestAreaToggle(interest)}
                      className="ml-2 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div
          className="pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            type="submit"
            disabled={!isFormValid}
            whileHover={isFormValid ? { scale: 1.02 } : {}}
            whileTap={isFormValid ? { scale: 0.98 } : {}}
            className={`w-full py-6 px-8 rounded-2xl font-bold text-xl transition-all duration-300 relative overflow-hidden ${
              isFormValid
                ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-2xl hover:shadow-3xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
            }`}
          >
            <div className="flex items-center justify-center space-x-3 relative z-10">
              <motion.div
                animate={isFormValid ? { rotate: 360 } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
              <span>Generate AI Project Recommendations</span>
            </div>
            {isFormValid && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            )}
          </motion.button>

          {/* Form Progress Indicator */}
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center space-x-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${
                selectedTechStack.length > 0 ? 'bg-blue-500' : 'bg-gray-300'
              }`} />
              <div className={`w-2 h-2 rounded-full ${
                careerFocus ? 'bg-green-500' : 'bg-gray-300'
              }`} />
              <div className={`w-2 h-2 rounded-full ${
                skillLevel ? 'bg-purple-500' : 'bg-gray-300'
              }`} />
              <div className={`w-2 h-2 rounded-full ${
                selectedInterestAreas.length > 0 ? 'bg-yellow-500' : 'bg-gray-300'
              }`} />
            </div>
            <p className={`mt-2 text-sm ${
              state.darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {isFormValid ? 'Ready to generate recommendations!' : 'Please complete all sections'}
            </p>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default PreferenceForm;
