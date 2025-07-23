import React from 'react';
import { Github, Linkedin, Globe, Mail, MapPin, Coffee, Code, Heart, Star, Trophy, Zap, AlertTriangle, ExternalLink } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';

const CreatorPage: React.FC = () => {
  const { state } = useGlobalState();

  const achievements = [
    { title: 'Open Source Contributor', description: '50+ repositories on GitHub', icon: Github },
    { title: 'Full-Stack Developer', description: 'MERN Stack Specialist', icon: Code },
    { title: 'AI Enthusiast', description: 'Building intelligent applications', icon: Zap },
    { title: 'Community Builder', description: 'Helping developers grow', icon: Heart }
  ];

  const projects = [
    {
      name: 'DevElevate',
      description: 'AI-powered education and career advancement platform',
      tech: ['React', 'TypeScript', 'Node.js', 'AI/ML'],
      status: 'Active',
      link: 'https://github.com/abhisek2004/Dev-Elevate.git'
    },
    {
      name: 'Portfolio Website',
      description: 'Personal portfolio showcasing projects and skills',
      tech: ['React', 'Next.js', 'Tailwind CSS'],
      status: 'Live',
      link: 'https://abhisekpanda072.vercel.app/'
    },
    {
      name: 'Various Open Source',
      description: 'Contributing to the developer community',
      tech: ['JavaScript', 'Python', 'React', 'Node.js'],
      status: 'Ongoing',
      link: 'https://github.com/abhisek2004'
    }
  ];

  const timeline = [
    {
      year: '2025',
      title: 'DevElevate Launch',
      description: 'Created comprehensive AI-powered education platform',
      icon: Star
    },
    {
      year: '2024',
      title: 'Full-Stack Mastery',
      description: 'Mastered MERN stack and modern web development',
      icon: Trophy
    },
    {
      year: '2023',
      title: 'Programming Journey',
      description: 'Started learning web development and programming',
      icon: Code
    }
  ];

  return (
    <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200 pt-20`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl p-8 border shadow-lg mb-12`}>
          <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="relative">
              <img
                src="https://github.com/abhisek2004.png"
                alt="Abhisek Panda"
                className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                <span className="text-white text-xs">✨</span>
              </div>
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              <h1 className={`text-4xl font-bold mb-2 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                Abhisek Panda 👨‍💻
              </h1>
              <p className={`text-xl mb-4 ${state.darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                Full-Stack Developer & AI Enthusiast
              </p>
              <p className={`text-lg mb-6 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Passionate about creating innovative solutions that empower developers and students. 
                Building the future of education technology, one line of code at a time. ☕💡💻
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <a
                  href="https://github.com/abhisek2004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/abhisekpanda2004/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://abhisekpanda072.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span>Portfolio</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Acknowledgement Section */}
        <div className={`${state.darkMode ? 'bg-yellow-900/20 border-yellow-800' : 'bg-yellow-50 border-yellow-200'} rounded-xl p-8 border mb-8`}>
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className={`text-2xl font-bold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                ⚠️ Disclaimer & Acknowledgement 💻🌐
              </h2>
              
              <div className={`space-y-4 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <div>
                  <p className="mb-2">
                    <strong>👨‍💻 Website Creator:</strong> Abhisek Panda
                  </p>
                  <p className="mb-2">
                    <strong>🌍 Portfolio:</strong> 
                    <a href="https://abhisekpanda072.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-1">
                      https://abhisekpanda072.vercel.app/
                    </a>
                  </p>
                  <p className="mb-2">
                    <strong>🐙 GitHub:</strong> 
                    <a href="https://github.com/abhisek2004" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-1">
                      https://github.com/abhisek2004
                    </a>
                  </p>
                  <p className="mb-4">
                    <strong>💼 LinkedIn:</strong> 
                    <a href="https://www.linkedin.com/in/abhisekpanda2004/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-1">
                      https://www.linkedin.com/in/abhisekpanda2004/
                    </a>
                  </p>
                </div>

                <div>
                  <p className="mb-4">
                    <strong>🚧 Important Note:</strong> This website has been developed as a personal learning project to sharpen my skills in full-stack web development — specifically using the MERN stack:
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className={`p-4 rounded-lg ${state.darkMode ? 'bg-gray-800' : 'bg-white'} text-center`}>
                      <div className="text-2xl mb-2">🧠</div>
                      <div className={`font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>MongoDB</div>
                      <div className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>for the database</div>
                    </div>
                    <div className={`p-4 rounded-lg ${state.darkMode ? 'bg-gray-800' : 'bg-white'} text-center`}>
                      <div className="text-2xl mb-2">🚀</div>
                      <div className={`font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>Express.js</div>
                      <div className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>for the backend</div>
                    </div>
                    <div className={`p-4 rounded-lg ${state.darkMode ? 'bg-gray-800' : 'bg-white'} text-center`}>
                      <div className="text-2xl mb-2">⚛️</div>
                      <div className={`font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>React.js</div>
                      <div className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>for the frontend</div>
                    </div>
                    <div className={`p-4 rounded-lg ${state.darkMode ? 'bg-gray-800' : 'bg-white'} text-center`}>
                      <div className="text-2xl mb-2">🛠️</div>
                      <div className={`font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>Node.js</div>
                      <div className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>as the runtime engine</div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-2"><strong>🎯 Purpose of this Project:</strong></p>
                  <p className="mb-4">This is not an official ICC product. I built this clone project as a part of my journey into professional web development. The goal was to:</p>
                  <ul className="list-disc list-inside space-y-1 mb-4">
                    <li>Explore real-world web scraping using Puppeteer, Axios, and Cheerio 🕷️</li>
                    <li>Practice routing, dynamic UI rendering, and API integration 🧩</li>
                    <li>Experiment with clean UI/UX practices and responsiveness 📱💻🖥️</li>
                    <li>Push myself to learn by recreating something from scratch 🏗️</li>
                  </ul>
                </div>

                <div>
                  <p className="mb-2"><strong>📊 About the Content:</strong></p>
                  <p className="mb-4">The data (such as rankings, players, and photos) has been scraped from the official ICC website (https://icc-cricket.com) purely for educational and demonstration purposes.</p>
                  <p className="mb-4">⚠️ I do not claim any ownership over the content, design, or media. All trademarks, logos, photos, and statistics belong to ICC – International Cricket Council.</p>
                  <p className="mb-4">📸 Player images and tournament graphics are sourced only to recreate a real-time UI experience for learning purposes and are not being used commercially or maliciously.</p>
                </div>

                <div>
                  <p className="mb-4"><strong>❌ No Affiliation Notice:</strong></p>
                  <p className="mb-4">This site is not affiliated with, endorsed by, or associated with ICC or any of its partners, sponsors, or media outlets.</p>
                  <p className="mb-4">It is a fan-made clone and a portfolio piece for skill demonstration only.</p>
                </div>

                <div>
                  <p className="mb-4"><strong>🧠 Calling Developers, Learners & Recruiters!</strong></p>
                  <p className="mb-2">If you're someone who's into:</p>
                  <ul className="list-disc list-inside space-y-1 mb-4">
                    <li>Learning the MERN stack</li>
                    <li>Working with real-time data APIs and scraping</li>
                    <li>Exploring frontend or backend architecture</li>
                    <li>Collaborating on open-source projects</li>
                  </ul>
                  <p className="mb-4">📬 Feel free to reach out!</p>
                  <p className="mb-4">Let's connect on LinkedIn or check out more of my work on GitHub. I'm always up for feedback, collaboration, or just tech talk 🤝✨</p>
                </div>

                <div className="text-center">
                  <p className="text-xl font-bold">🧪 This project = Code + Coffee + Curiosity ☕💡💻</p>
                  <p className="mt-2">Thanks for visiting this experimental build! Hope it inspires you to build something of your own 🚀</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-8 border shadow-sm mb-8`}>
          <h2 className={`text-2xl font-bold mb-6 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            🏆 Achievements & Recognition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className={`p-6 rounded-lg border text-center ${
                    state.darkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <Icon className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                  <h3 className={`font-semibold mb-2 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Projects */}
        <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-8 border shadow-sm mb-8`}>
          <h2 className={`text-2xl font-bold mb-6 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            💼 Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg border ${
                  state.darkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'
                } transition-colors hover:shadow-md`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className={`font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {project.name}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    project.status === 'Active' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : project.status === 'Live'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className={`text-sm mb-4 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-2 py-1 rounded text-xs ${
                        state.darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                >
                  View Project →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-8 border shadow-sm mb-8`}>
          <h2 className={`text-2xl font-bold mb-6 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            📅 Journey Timeline
          </h2>
          <div className="space-y-6">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.year}
                      </span>
                      <span className="text-blue-500">•</span>
                      <span className={`font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.title}
                      </span>
                    </div>
                    <p className={`${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Philosophy & Quote */}
        <div className={`${state.darkMode ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-50 to-purple-50'} rounded-xl p-8 text-center`}>
          <Coffee className="w-12 h-12 mx-auto mb-4 text-blue-500" />
          <h2 className={`text-2xl font-bold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            My Philosophy
          </h2>
          <blockquote className={`text-lg italic mb-4 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            "Code + Coffee + Curiosity = Innovation"
          </blockquote>
          <p className={`${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            I believe in the power of continuous learning, community collaboration, and building solutions 
            that make a real difference in people's lives. Every project is an opportunity to learn something new 
            and help others grow. 🚀✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatorPage;