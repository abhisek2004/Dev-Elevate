import React from 'react';
import { AlertTriangle, Info, ExternalLink, Code, Coffee, Heart } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';

const Disclaimer: React.FC = () => {
  const { state } = useGlobalState();

  return (
    <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-12 h-12 text-yellow-900" />
          </div>
          <h1 className={`text-4xl font-bold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            ⚠️ Disclaimer & Acknowledgement 💻🌐
          </h1>
          <p className={`text-lg ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Important information about this project and its educational purpose
          </p>
        </div>

        {/* Creator Information */}
        <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-8 border shadow-sm mb-8`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Code className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <h2 className={`text-2xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
              👨‍💻 Website Creator
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className={`font-semibold mb-2 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Creator Details
                </h3>
                <p className={`${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong>Name:</strong> Abhisek Panda
                </p>
                <p className={`${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong>Role:</strong> Full-Stack Developer & AI Enthusiast
                </p>
              </div>
              
              <div>
                <h3 className={`font-semibold mb-2 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Contact & Links
                </h3>
                <div className="space-y-2">
                  <a
                    href="https://abhisekpanda072.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
                  >
                    <span>🌍 Portfolio:</span>
                    <span>abhisekpanda072.vercel.app</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/abhisek2004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
                  >
                    <span>🐙 GitHub:</span>
                    <span>github.com/abhisek2004</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abhisekpanda2004/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
                  >
                    <span>💼 LinkedIn:</span>
                    <span>linkedin.com/in/abhisekpanda2004</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <img
                src="https://github.com/abhisek2004.png"
                alt="Abhisek Panda"
                className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className={`${state.darkMode ? 'bg-yellow-900/20 border-yellow-800' : 'bg-yellow-50 border-yellow-200'} rounded-xl p-8 border mb-8`}>
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className={`text-xl font-bold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                🚧 Important Note
              </h3>
              <p className={`text-lg leading-relaxed ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                This website has been developed as a <strong>personal learning project</strong> to sharpen my skills 
                in full-stack web development — specifically using the <strong>MERN stack</strong>:
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className={`p-4 rounded-lg ${state.darkMode ? 'bg-gray-800' : 'bg-white'} text-center`}>
                  <div className="text-2xl mb-2">🧠</div>
                  <div className={`font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>MongoDB</div>
                  <div className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Database</div>
                </div>
                <div className={`p-4 rounded-lg ${state.darkMode ? 'bg-gray-800' : 'bg-white'} text-center`}>
                  <div className="text-2xl mb-2">🚀</div>
                  <div className={`font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>Express.js</div>
                  <div className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Backend</div>
                </div>
                <div className={`p-4 rounded-lg ${state.darkMode ? 'bg-gray-800' : 'bg-white'} text-center`}>
                  <div className="text-2xl mb-2">⚛️</div>
                  <div className={`font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>React.js</div>
                  <div className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Frontend</div>
                </div>
                <div className={`p-4 rounded-lg ${state.darkMode ? 'bg-gray-800' : 'bg-white'} text-center`}>
                  <div className="text-2xl mb-2">🛠️</div>
                  <div className={`font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>Node.js</div>
                  <div className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Runtime</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Purpose */}
        <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-8 border shadow-sm mb-8`}>
          <h3 className={`text-xl font-bold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            🎯 Purpose of this Project
          </h3>
          <p className={`mb-4 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            This is <strong>not an official educational platform</strong>. I built this project as a part of my journey 
            into professional web development. The goal was to:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ul className="space-y-3">
              <li className={`flex items-start space-x-3 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <span className="text-lg">🕷️</span>
                <span>Explore real-world data integration and API usage</span>
              </li>
              <li className={`flex items-start space-x-3 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <span className="text-lg">🧩</span>
                <span>Practice routing, dynamic UI rendering, and state management</span>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className={`flex items-start space-x-3 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <span className="text-lg">📱💻🖥️</span>
                <span>Experiment with clean UI/UX practices and responsiveness</span>
              </li>
              <li className={`flex items-start space-x-3 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <span className="text-lg">🏗️</span>
                <span>Push myself to learn by recreating complex applications</span>
              </li>
            </ul>
          </div>
        </div>

        {/* No Affiliation Notice */}
        <div className={`${state.darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'} rounded-xl p-8 border mb-8`}>
          <h3 className={`text-xl font-bold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            ❌ No Affiliation Notice
          </h3>
          <div className={`space-y-4 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <p>
              This site is <strong>not affiliated with, endorsed by, or associated with</strong> any official 
              educational institutions, certification bodies, or their partners, sponsors, or media outlets.
            </p>
            <p>
              It is a <strong>fan-made educational platform</strong> and a <strong>portfolio piece</strong> for 
              skill demonstration only.
            </p>
            <p>
              All educational content, methodologies, and resources are created for learning purposes and are not 
              being used commercially or maliciously.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`${state.darkMode ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-50 to-purple-50'} rounded-xl p-8 text-center mb-8`}>
          <h3 className={`text-xl font-bold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            🧠 Calling Developers, Learners & Recruiters!
          </h3>
          <p className={`mb-6 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            If you're someone who's into:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <ul className={`space-y-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>• Learning the MERN stack</li>
              <li>• Working with real-time data APIs</li>
              <li>• Exploring frontend or backend architecture</li>
            </ul>
            <ul className={`space-y-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>• Collaborating on open-source projects</li>
              <li>• Building educational platforms</li>
              <li>• Sharing knowledge and experiences</li>
            </ul>
          </div>
          
          <p className={`text-lg font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            📬 Feel free to reach out!
          </p>
          <p className={`${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Let's connect on LinkedIn or check out more of my work on GitHub. I'm always up for feedback, 
            collaboration, or just tech talk 🤝✨
          </p>
        </div>

        {/* Final Message */}
        <div className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-8 border shadow-sm text-center`}>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Coffee className="w-6 h-6 text-blue-500" />
            <Code className="w-6 h-6 text-green-500" />
            <Heart className="w-6 h-6 text-red-500" />
          </div>
          <h3 className={`text-xl font-bold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            🧪 This project = Code + Coffee + Curiosity ☕💡💻
          </h3>
          <p className={`text-lg ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Thanks for visiting this experimental build! Hope it inspires you to build something of your own 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;