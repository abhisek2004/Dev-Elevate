import React from "react";
import {
  AlertTriangle,
  Info,
  ExternalLink,
  Code,
  Coffee,
  Heart,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../../contexts/GlobalContext";

const Disclaimer: React.FC = () => {
  const { state } = useGlobalState();

  return (
    <div className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-4xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-12 h-12 text-yellow-400" />
          </div>
          <h1
            className={`text-4xl font-bold mb-4 ${state.darkMode ? "text-white" : "text-gray-100"
              }`}
          >
            ⚠️ Disclaimer & Acknowledgement 💻🌐
          </h1>
          <p
            className={`text-lg ${state.darkMode ? "text-gray-300" : "text-gray-300"
              }`}
          >
            Important information about this project and its educational purpose
          </p>
        </div>

        {/* Creator Information */}
        <div className="p-8 mb-8 border border-gray-700 shadow-sm bg-gray-800/70 rounded-xl backdrop-blur-sm">
          <div className="flex items-center mb-6 space-x-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-900/30">
              <Code className="w-6 h-6 text-blue-300" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              👨‍💻 Website Creator
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="mb-2 font-semibold text-white">
                  Creator Details
                </h3>
                <p>
                  <strong>Name:</strong> Abhisek Panda
                </p>
                <p>
                  <strong>Role:</strong> Full-Stack Developer & AI Enthusiast
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-white">
                  Contact & Links
                </h3>
                <div className="space-y-2">
                  <a
                    href="https://abhisekpanda072.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300"
                  >
                    <span>🌍 Portfolio:</span>
                    <span>abhisekpanda072.vercel.app</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/abhisek2004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300"
                  >
                    <span>🐙 GitHub:</span>
                    <span>github.com/abhisek2004</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abhisekpanda2004/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300"
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
                className="w-32 h-32 border-4 border-blue-500 rounded-full shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="p-8 mb-8 border border-yellow-800 bg-yellow-900/20 rounded-xl">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="flex-shrink-0 w-6 h-6 mt-1 text-yellow-500" />
            <div>
              <h3 className="mb-4 text-xl font-bold text-white">
                🚧 Important Note
              </h3>
              <p className="text-lg leading-relaxed text-gray-300">
                This website has been developed as a{" "}
                <strong>personal learning project</strong> to sharpen my skills
                in full-stack web development — specifically using the{" "}
                <strong>MERN stack</strong>:
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6 md:grid-cols-4">
                {["MongoDB", "Express.js", "React.js", "Node.js"].map(
                  (tech, idx) => (
                    <div
                      key={idx}
                      className="p-4 text-center bg-gray-800 rounded-lg"
                    >
                      <div className="mb-2 text-2xl">
                        {tech === "MongoDB"
                          ? "🧠"
                          : tech === "Express.js"
                            ? "🚀"
                            : tech === "React.js"
                              ? "⚛️"
                              : "🛠️"}
                      </div>
                      <div className="font-semibold text-white">{tech}</div>
                      <div className="text-sm text-gray-400">
                        {tech === "MongoDB"
                          ? "Database"
                          : tech === "Express.js"
                            ? "Backend"
                            : tech === "React.js"
                              ? "Frontend"
                              : "Runtime"}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Project Purpose */}
        <div className="p-8 mb-8 text-gray-300 border border-gray-700 shadow-sm bg-gray-800/70 rounded-xl">
          <h3 className="mb-4 text-xl font-bold text-white">
            🎯 Purpose of this Project
          </h3>
          <p className="mb-4">
            This is <strong>not an official educational platform</strong>. I
            built this project as a part of my journey into professional web
            development. The goal was to:
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <span className="text-lg">🕷️</span>
                <span>Explore real-world data integration and API usage</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-lg">🧩</span>
                <span>
                  Practice routing, dynamic UI rendering, and state management
                </span>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <span className="text-lg">📱💻🖥️</span>
                <span>
                  Experiment with clean UI/UX practices and responsiveness
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-lg">🏗️</span>
                <span>
                  Push myself to learn by recreating complex applications
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* No Affiliation Notice */}
        <div className="p-8 mb-8 text-gray-300 border border-red-800 bg-red-900/20 rounded-xl">
          <h3 className="mb-4 text-xl font-bold text-white">
            ❌ No Affiliation Notice
          </h3>
          <div className="space-y-4">
            <p>
              This site is{" "}
              <strong>
                not affiliated with, endorsed by, or associated with
              </strong>{" "}
              any official educational institutions, certification bodies, or
              their partners, sponsors, or media outlets.
            </p>
            <p>
              It is a <strong>fan-made educational platform</strong> and a{" "}
              <strong>portfolio piece</strong> for skill demonstration only.
            </p>
            <p>
              All educational content, methodologies, and resources are created
              for learning purposes and are not being used commercially or
              maliciously.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="p-8 mb-8 text-center text-gray-300 bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl">
          <h3 className="mb-4 text-xl font-bold text-white">
            🧠 Calling Developers, Learners & Recruiters!
          </h3>
          <p className="mb-6">If you're someone who's into:</p>
          <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
            <ul className="space-y-2">
              <li>• Learning the MERN stack</li>
              <li>• Working with real-time data APIs</li>
              <li>• Exploring frontend or backend architecture</li>
            </ul>
            <ul className="space-y-2">
              <li>• Collaborating on open-source projects</li>
              <li>• Building educational platforms</li>
              <li>• Sharing knowledge and experiences</li>
            </ul>
          </div>
          <p className="text-lg font-semibold text-white">
            📬 Feel free to reach out!
          </p>
          <p>
            Let's connect on LinkedIn or check out more of my work on GitHub.
            I'm always up for feedback, collaboration, or just tech talk 🤝✨
          </p>
        </div>

        {/* Final Message */}
        <div className="p-8 text-center text-gray-300 border border-gray-700 shadow-sm bg-gray-800/70 rounded-xl">
          <div className="flex items-center justify-center mb-4 space-x-2">
            <Coffee className="w-6 h-6 text-blue-500" />
            <Code className="w-6 h-6 text-green-500" />
            <Heart className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="mb-4 text-xl font-bold text-white">
            🧪 This project = Code + Coffee + Curiosity ☕💡💻
          </h3>
          <p>
            Thanks for visiting this experimental build! Hope it inspires you to
            build something of your own 🚀
          </p>
        </div>

        {/* Return Button */}
        <div className="flex justify-center mt-10">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-transform shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:scale-105 hover:shadow-2xl"
          >
            <Home className="w-5 h-5" />
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;