import React from "react";
import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Globe,
  Mail,
  MapPin,
  Coffee,
  Code,
  Heart,
  Star,
  Trophy,
  Zap,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { useGlobalState } from "../../../contexts/GlobalContext";

const CreatorPage: React.FC = () => {
  const { state } = useGlobalState();

  const achievements = [
    {
      title: "Open Source Contributor",
      description: "50+ repositories on GitHub",
      icon: Github,
    },
    {
      title: "Full-Stack Developer",
      description: "MERN Stack Specialist",
      icon: Code,
    },
    {
      title: "AI Enthusiast",
      description: "Building intelligent applications",
      icon: Zap,
    },
    {
      title: "Community Builder",
      description: "Helping developers grow",
      icon: Heart,
    },
  ];

  const projects = [
    {
      name: "DevElevate",
      description: "AI-powered education and career advancement platform",
      tech: ["React", "TypeScript", "Node.js", "AI/ML"],
      status: "Active",
      link: "https://github.com/abhisek2004/Dev-Elevate.git",
    },
    {
      name: "Portfolio Website",
      description: "Personal portfolio showcasing projects and skills",
      tech: ["React", "Next.js", "Tailwind CSS"],
      status: "Live",
      link: "https://abhisekpanda072.vercel.app/",
    },
    {
      name: "Various Open Source",
      description: "Contributing to the developer community",
      tech: ["JavaScript", "Python", "React", "Node.js"],
      status: "Ongoing",
      link: "https://github.com/abhisek2004",
    },
  ];

  const timeline = [
    {
      year: "2025",
      title: "DevElevate Launch",
      description: "Created comprehensive AI-powered education platform",
      icon: Star,
    },
    {
      year: "2024",
      title: "Full-Stack Mastery",
      description: "Mastered MERN stack and modern web development",
      icon: Trophy,
    },
    {
      year: "2023",
      title: "Programming Journey",
      description: "Started learning web development and programming",
      icon: Code,
    },
  ];

  return (
    <div className="relative py-24 overflow-hidden transition-colors duration-200 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
        {/* Hero Section */}

        {/* Abhisek Panda Section */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className={`${state.darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
            } rounded-2xl p-8 border shadow-lg mb-12`}
        >
          <div className="flex flex-col items-center space-y-6 lg:flex-row lg:space-y-0 lg:space-x-8">
            <div className="relative" data-aos="zoom-in" data-aos-delay="200">
              <img
                src="https://github.com/abhisek2004.png"
                alt="Abhisek Panda"
                className="w-32 h-32 border-4 border-blue-500 rounded-full shadow-lg"
              />
              <div className="absolute flex items-center justify-center w-8 h-8 bg-green-500 border-4 border-white rounded-full -right-2 -bottom-2 dark:border-gray-800">
                <span className="text-xs text-white">✨</span>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <h1
                className={`text-4xl font-bold mb-2 ${state.darkMode ? "text-white" : "text-gray-900"
                  }`}
                data-aos="fade-right"
                data-aos-delay="250"
              >
                Abhisek Panda 👨‍💻
              </h1>
              <p
                className={`text-xl mb-4 ${state.darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                data-aos="fade-up"
                data-aos-delay="300"
              >
                Full-Stack Developer (Project Admin)
              </p>
              <p
                className={`text-lg mb-6 ${state.darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                data-aos="fade-up"
                data-aos-delay="350"
              >
                Passionate about creating innovative solutions that empower
                developers and students. Building the future of education
                technology, one line of code at a time. ☕💡💻
              </p>

              <div className="flex flex-wrap justify-center gap-4 lg:justify-start" data-aos="fade-left" data-aos-delay="400">
                <a
                  href="https://github.com/abhisek2004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-gray-800 rounded-lg hover:bg-gray-700"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/abhisekpanda2004/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://abhisekpanda072.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  <Globe className="w-5 h-5" />
                  <span>Portfolio</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Jay Sawant Section */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className={`${state.darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
            } rounded-2xl p-8 border shadow-lg mb-12`}
        >
          <div className="flex flex-col items-center space-y-6 lg:flex-row lg:space-y-0 lg:space-x-8">
            <div className="relative" data-aos="zoom-in" data-aos-delay="300">
              <img
                src="https://github.com/Jay2006sawant.png"
                alt="Jay Sawant"
                className="w-32 h-32 border-4 border-blue-500 rounded-full shadow-lg"
              />
              <div className="absolute flex items-center justify-center w-8 h-8 bg-green-500 border-4 border-white rounded-full -right-2 -bottom-2 dark:border-gray-800">
                <span className="text-xs text-white">✨</span>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <h1
                className={`text-4xl font-bold mb-2 ${state.darkMode ? "text-white" : "text-gray-900"
                  }`}
                data-aos="fade-right"
                data-aos-delay="350"
              >
                Jay Sawant 👨‍💻
              </h1>
              <p
                className={`text-xl mb-4 ${state.darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                data-aos="fade-up"
                data-aos-delay="400"
              >
                Full-Stack Developer (👨‍🏫 🤝 Project Mentor)
              </p>
              <p
                className={`text-lg mb-6 ${state.darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                data-aos="fade-up"
                data-aos-delay="450"
              >
                Passionate about creating innovative solutions that empower
                developers and students. Building the future of education
                technology, one line of code at a time. ☕💡💻
              </p>

              <div className="flex flex-wrap justify-center gap-4 lg:justify-start" data-aos="fade-left" data-aos-delay="500">
                <a
                  href="https://github.com/Jay2006sawant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-gray-800 rounded-lg hover:bg-gray-700"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/jay-sawant-4b59aa324/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  <Globe className="w-5 h-5" />
                  <span>Portfolio</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Avansh Yadav Section */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className={`${state.darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
            } rounded-2xl p-8 border shadow-lg mb-12`}
        >
          <div className="flex flex-col items-center space-y-6 lg:flex-row lg:space-y-0 lg:space-x-8">
            <div className="relative" data-aos="zoom-in" data-aos-delay="400">
              <img
                src="https://avatars.githubusercontent.com/u/92374411?v=4"
                alt="Avansh Yadav"
                className="w-32 h-32 border-4 border-blue-500 rounded-full shadow-lg"
              />
              <div className="absolute flex items-center justify-center w-8 h-8 bg-green-500 border-4 border-white rounded-full -right-2 -bottom-2 dark:border-gray-800">
                <span className="text-xs text-white">✨</span>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <h1
                className={`text-4xl font-bold mb-2 ${state.darkMode ? "text-white" : "text-gray-900"
                  }`}
                data-aos="fade-right"
                data-aos-delay="450"
              >
                Avansh Yadav 👨‍💻
              </h1>
              <p
                className={`text-xl mb-4 ${state.darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                data-aos="fade-up"
                data-aos-delay="500"
              >
                Full-Stack Developer (👨‍🏫 🤝 Project Mentor)
              </p>
              <p
                className={`text-lg mb-6 ${state.darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                data-aos="fade-up"
                data-aos-delay="550"
              >
                Passionate about creating innovative solutions that empower
                developers and students. Building the future of education
                technology, one line of code at a time. ☕💡💻
              </p>

              <div className="flex flex-wrap justify-center gap-4 lg:justify-start" data-aos="fade-left" data-aos-delay="600">
                <a
                  href="https://github.com/Avansh2006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-gray-800 rounded-lg hover:bg-gray-700"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/avanshyadav/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  <Globe className="w-5 h-5" />
                  <span>Portfolio</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Amisha Gupta Section */}
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className={`${state.darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
            } rounded-2xl p-8 border shadow-lg mb-12`}
        >
          <div className="flex flex-col items-center space-y-6 lg:flex-row lg:space-y-0 lg:space-x-8">
            <div className="relative" data-aos="zoom-in" data-aos-delay="500">
              <img
                src="https://avatars.githubusercontent.com/u/154073004?v=4"
                alt="Amisha Gupta"
                className="w-32 h-32 border-4 border-blue-500 rounded-full shadow-lg"
              />
              <div className="absolute flex items-center justify-center w-8 h-8 bg-green-500 border-4 border-white rounded-full -right-2 -bottom-2 dark:border-gray-800">
                <span className="text-xs text-white">✨</span>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <h1
                className={`text-4xl font-bold mb-2 ${state.darkMode ? "text-white" : "text-gray-900"
                  }`}
                data-aos="fade-right"
                data-aos-delay="550"
              >
                Amisha Gupta 👨‍💻
              </h1>
              <p
                className={`text-xl mb-4 ${state.darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                data-aos="fade-up"
                data-aos-delay="600"
              >
                MERN , Next.js Developer (👨‍🏫 🤝 Project Mentor)
              </p>
              <p
                className={`text-lg mb-6 ${state.darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                data-aos="fade-up"
                data-aos-delay="650"
              >
                Passionate about creating innovative solutions that empower
                developers and students. Building the future of education
                technology, one line of code at a time. ☕💡💻
              </p>

              <div className="flex flex-wrap justify-center gap-4 lg:justify-start" data-aos="fade-left" data-aos-delay="700">
                <a
                  href="https://github.com/amishagupta31"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-gray-800 rounded-lg hover:bg-gray-700"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/amishagupta31/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  <Globe className="w-5 h-5" />
                  <span>Portfolio</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Gobinda Gagan Dey Section */}
        <div
          data-aos="fade-up"
          data-aos-delay="500"
          className={`${state.darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
            } rounded-2xl p-8 border shadow-lg mb-12`}
        >
          <div className="flex flex-col items-center space-y-6 lg:flex-row lg:space-y-0 lg:space-x-8">
            <div className="relative" data-aos="zoom-in" data-aos-delay="600">
              <img
                src="https://avatars.githubusercontent.com/u/180097366?v=4"
                alt="Gobinda Gagan"
                className="w-32 h-32 border-4 border-blue-500 rounded-full shadow-lg"
              />
              <div className="absolute flex items-center justify-center w-8 h-8 bg-green-500 border-4 border-white rounded-full -right-2 -bottom-2 dark:border-gray-800">
                <span className="text-xs text-white">✨</span>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <h1
                className={`text-4xl font-bold mb-2 ${state.darkMode ? "text-white" : "text-gray-900"
                  }`}
                data-aos="fade-right"
                data-aos-delay="650"
              >
                Gobinda Gagan Dey👨‍💻
              </h1>
              <p
                className={`text-xl mb-4 ${state.darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                data-aos="fade-up"
                data-aos-delay="700"
              >
                Backend Developer (🤝 Major Contributor 50+ PR)
              </p>
              <p
                className={`text-lg mb-6 ${state.darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                data-aos="fade-up"
                data-aos-delay="750"
              >
                Passionate about creating innovative solutions that empower
                developers and students. Building the future of education
                technology, one line of code at a time. ☕💡💻
              </p>

              <div className="flex flex-wrap justify-center gap-4 lg:justify-start" data-aos="fade-left" data-aos-delay="800">
                <a
                  href="https://github.com/GOBINDA-GAGAN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-gray-800 rounded-lg hover:bg-gray-700"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/gobinda-gagan-dey/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://gobinda-gagan-dey.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  <Globe className="w-5 h-5" />
                  <span>Portfolio</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Acknowledgement Section */}
        <div
          data-aos="fade-up"
          data-aos-delay="600"
          className={`${state.darkMode
            ? "bg-yellow-900/20 border-yellow-800"
            : "bg-yellow-50 border-yellow-200"
            } rounded-xl p-8 border mb-8`}
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle className="flex-shrink-0 w-6 h-6 mt-1 text-yellow-500" />
            <div>
              <h2
                className={`text-2xl font-bold mb-4 ${state.darkMode ? "text-white" : "text-gray-900"
                  }`}
              >
                ⚠️ Disclaimer & Acknowledgement 💻🌐
              </h2>

              <div
                className={`space-y-4 ${state.darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
              >
                <div>
                  <p className="mb-2">
                    <strong>👨‍💻 Website Creator:</strong> Abhisek Panda
                  </p>
                  <p className="mb-2">
                    <strong>🌍 Portfolio:</strong>
                    <a
                      href="https://abhisekpanda072.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-blue-500 hover:underline"
                    >
                      https://abhisekpanda072.vercel.app/
                    </a>
                  </p>
                  <p className="mb-2">
                    <strong>🐙 GitHub:</strong>
                    <a
                      href="https://github.com/abhisek2004"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-blue-500 hover:underline"
                    >
                      https://github.com/abhisek2004
                    </a>
                  </p>
                  <p className="mb-4">
                    <strong>💼 LinkedIn:</strong>
                    <a
                      href="https://www.linkedin.com/in/abhisekpanda2004/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-blue-500 hover:underline"
                    >
                      https://www.linkedin.com/in/abhisekpanda2004/
                    </a>
                  </p>
                </div>

                <div>
                  <p className="mb-4">
                    <strong>🚧 Important Note:</strong> This website has been
                    developed as a personal learning project to sharpen my
                    skills in full-stack web development — specifically using
                    the MERN stack:
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
                    <div
                      className={`p-4 rounded-lg ${state.darkMode ? "bg-gray-800" : "bg-white"
                        } text-center`}
                    >
                      <div className="mb-2 text-2xl">🧠</div>
                      <div
                        className={`font-semibold ${state.darkMode ? "text-white" : "text-gray-900"
                          }`}
                      >
                        MongoDB
                      </div>
                      <div
                        className={`text-sm ${state.darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                      >
                        for the database
                      </div>
                    </div>
                    <div
                      className={`p-4 rounded-lg ${state.darkMode ? "bg-gray-800" : "bg-white"
                        } text-center`}
                    >
                      <div className="mb-2 text-2xl">🚀</div>
                      <div
                        className={`font-semibold ${state.darkMode ? "text-white" : "text-gray-900"
                          }`}
                      >
                        Express.js
                      </div>
                      <div
                        className={`text-sm ${state.darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                      >
                        for the backend
                      </div>
                    </div>
                    <div
                      className={`p-4 rounded-lg ${state.darkMode ? "bg-gray-800" : "bg-white"
                        } text-center`}
                    >
                      <div className="mb-2 text-2xl">⚛️</div>
                      <div
                        className={`font-semibold ${state.darkMode ? "text-white" : "text-gray-900"
                          }`}
                      >
                        React.js
                      </div>
                      <div
                        className={`text-sm ${state.darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                      >
                        for the frontend
                      </div>
                    </div>
                    <div
                      className={`p-4 rounded-lg ${state.darkMode ? "bg-gray-800" : "bg-white"
                        } text-center`}
                    >
                      <div className="mb-2 text-2xl">🛠️</div>
                      <div
                        className={`font-semibold ${state.darkMode ? "text-white" : "text-gray-900"
                          }`}
                      >
                        Node.js
                      </div>
                      <div
                        className={`text-sm ${state.darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                      >
                        as the runtime engine
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-2">
                    <strong>🎯 Purpose of this Project:</strong>
                  </p>
                  <p className="mb-4">
                    This is not an official ICC product. I built this clone
                    project as a part of my journey into professional web
                    development. The goal was to:
                  </p>
                  <ul className="mb-4 space-y-1 list-disc list-inside">
                    <li>
                      Explore real-world web scraping using Puppeteer, Axios,
                      and Cheerio 🕷️
                    </li>
                    <li>
                      Practice routing, dynamic UI rendering, and API
                      integration 🧩
                    </li>
                    <li>
                      Experiment with clean UI/UX practices and responsiveness
                      📱💻🖥️
                    </li>
                    <li>
                      Push myself to learn by recreating something from scratch
                      🏗️
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="mb-4">
                    <strong>📊 About the Content:</strong>
                  </p>
                  <p className="mb-4">
                    The data (such as rankings, players, and photos) has been
                    scraped from the official ICC website
                    (https://icc-cricket.com) purely for educational and
                    demonstration purposes.
                  </p>
                  <p className="mb-4">
                    ⚠️ I do not claim any ownership over the content, design, or
                    media. All trademarks, logos, photos, and statistics belong
                    to ICC – International Cricket Council.
                  </p>
                  <p className="mb-4">
                    📸 Player images and tournament graphics are sourced only to
                    recreate a real-time UI experience for learning purposes and
                    are not being used commercially or maliciously.
                  </p>
                </div>

                <div>
                  <p className="mb-4">
                    <strong>❌ No Affiliation Notice:</strong>
                  </p>
                  <p className="mb-4">
                    This site is not affiliated with, endorsed by, or associated
                    with ICC or any of its partners, sponsors, or media outlets.
                  </p>
                  <p className="mb-4">
                    It is a fan-made clone and a portfolio piece for skill
                    demonstration only.
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-xl font-bold">
                    🧪 This project = Code + Coffee + Curiosity ☕💡💻
                  </p>
                  <p className="mt-2">
                    Thanks for visiting this experimental build! Hope it
                    inspires you to build something of your own 🚀
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div
          data-aos="fade-up"
          data-aos-delay="700"
          className={`${state.darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
            } rounded-xl p-8 border shadow-sm mb-8`}
        >
          <h2
            className={`text-2xl font-bold mb-6 ${state.darkMode ? "text-white" : "text-gray-900"
              }`}
          >
            🏆 Achievements & Recognition
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={`${index * 120}`}
                  className={`p-6 rounded-lg border text-center ${state.darkMode
                    ? "border-gray-700 bg-gray-700/50"
                    : "border-gray-200 bg-gray-50"
                    }`}
                >
                  <Icon className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                  <h3
                    className={`font-semibold mb-2 ${state.darkMode ? "text-white" : "text-gray-900"
                      }`}
                  >
                    {achievement.title}
                  </h3>
                  <p
                    className={`text-sm ${state.darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Projects */}
        <div
          data-aos="fade-up"
          data-aos-delay="800"
          className={`${state.darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
            } rounded-xl p-8 border shadow-sm mb-8`}
        >
          <h2
            className={`text-2xl font-bold mb-6 ${state.darkMode ? "text-white" : "text-gray-900"
              }`}
          >
            💼 Featured Projects
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={`${index * 120}`}
                className={`p-6 rounded-lg border ${state.darkMode
                  ? "border-gray-700 hover:border-gray-600"
                  : "border-gray-200 hover:border-gray-300"
                  } transition-colors hover:shadow-md`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3
                    className={`font-semibold ${state.darkMode ? "text-white" : "text-gray-900"
                      }`}
                  >
                    {project.name}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${project.status === "Active"
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : project.status === "Live"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        : "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                      }`}
                  >
                    {project.status}
                  </span>
                </div>
                <p
                  className={`text-sm mb-4 ${state.darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-2 py-1 rounded text-xs ${state.darkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-700"
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
                  className="text-sm font-medium text-blue-500 hover:text-blue-600"
                >
                  View Project →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div
          data-aos="fade-up"
          data-aos-delay="900"
          className={`${state.darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
            } rounded-xl p-8 border shadow-sm mb-8`}
        >
          <h2
            className={`text-2xl font-bold mb-6 ${state.darkMode ? "text-white" : "text-gray-900"
              }`}
          >
            📅 Journey Timeline
          </h2>
          <div className="space-y-6">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              const aosType = index % 2 === 0 ? "fade-right" : "fade-left";
              return (
                <div key={index} data-aos={aosType} data-aos-delay={`${index * 120}`} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full dark:bg-blue-900">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1 space-x-2">
                      <span
                        className={`font-bold ${state.darkMode ? "text-white" : "text-gray-900"
                          }`}
                      >
                        {item.year}
                      </span>
                      <span className="text-blue-500">•</span>
                      <span
                        className={`font-semibold ${state.darkMode ? "text-white" : "text-gray-900"
                          }`}
                      >
                        {item.title}
                      </span>
                    </div>
                    <p
                      className={`${state.darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Philosophy & Quote */}
        <div
          data-aos="fade-up"
          data-aos-delay="1000"
          className={`${state.darkMode
            ? "bg-gradient-to-r from-blue-900 to-purple-900"
            : "bg-gradient-to-r from-blue-50 to-purple-50"
            } rounded-xl p-8 text-center`}
        >
          <Coffee className="w-12 h-12 mx-auto mb-4 text-blue-500" />
          <h2
            className={`text-2xl font-bold mb-4 ${state.darkMode ? "text-white" : "text-gray-900"
              }`}
          >
            My Philosophy
          </h2>
          <blockquote
            className={`text-lg italic mb-4 ${state.darkMode ? "text-gray-300" : "text-gray-700"
              }`}
          >
            "Code + Coffee + Curiosity = Innovation"
          </blockquote>
          <p
            className={`${state.darkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            I believe in the power of continuous learning, community
            collaboration, and building solutions that make a real difference in
            people's lives. Every project is an opportunity to learn something
            new and help others grow. 🚀✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatorPage;
