import React, { useState, useEffect } from "react";
import { Github, ExternalLink, Code, Globe, Linkedin, Heart } from "lucide-react";
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiTypescript, SiTailwindcss } from "react-icons/si";
import { useGlobalState } from "../../contexts/GlobalContext";
import { Link } from "react-router-dom";

type Contributor = {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
};

const Footer: React.FC = () => {
  const { state } = useGlobalState();
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/abhisek2004/Dev-Elevate/contributors"
        );
        if (response.ok) {
          const data = await response.json();
          setContributors(data.slice(0, 6));
        } else {
          setContributors([]);
        }
      } catch (error) {
        console.error("Error fetching contributors:", error);
        setContributors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  const quickLinks = [
    { name: "Learning Hub", path: "/learning" },
    { name: "Study Buddy", path: "/chatbot" },
    { name: "Tech Feed", path: "/news" },
    { name: "Resume Builder", path: "/resume" },
    { name: "Placement Prep", path: "/placement" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "About Creator", path: "/creator" },
    { name: "Disclaimer", path: "/disclaimer" },
  ];

  const techStack = [
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "Express.js", icon: SiExpress, color: "#000000" },
    { name: "React.js", icon: SiReact, color: "#61DAFB" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  ];

  return (
    <footer
      className={`${
        state.darkMode
          ? "bg-gray-900 border-gray-700"
          : "bg-gray-50 border-gray-200"
      } border-t border-opacity-40 transition-colors duration-200`}
    >
      <div className="px-4 pt-6 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Contributors Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3
              className={`text-xl font-bold ${
                state.darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              🚀 Contributors & Open Source Heroes
            </h3>
            <a
              href="https://github.com/abhisek2004/Dev-Elevate.git"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-gray-800 rounded-lg hover:bg-gray-700"
            >
              <Github className="w-4 h-4" />
              <span>View on GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              {contributors.map((contributor, index) => (
                <a
                  key={index}
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  title={`${contributor.login} - ${contributor.contributions} contributions`}
                >
                  <img
                    src={contributor.avatar_url}
                    alt={contributor.login}
                    className="w-12 h-12 transition-all duration-200 border-2 border-blue-500 rounded-full shadow-lg hover:border-blue-400 hover:scale-110"
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold ${
                      state.darkMode
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-900"
                    } border-2 border-blue-500`}
                  >
                    {contributor.contributions > 99
                      ? "99+"
                      : contributor.contributions}
                  </div>

                  {/* Tooltip */}
                  <div
                    className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${
                      state.darkMode
                        ? "bg-gray-800 text-white"
                        : "bg-gray-900 text-white"
                    }`}
                  >
                    {contributor.login}
                    <div className="absolute w-0 h-0 transform -translate-x-1/2 border-t-4 border-l-4 border-r-4 border-transparent top-full left-1/2 border-t-gray-900"></div>
                  </div>
                </a>
              ))}

              {contributors.length > 0 && (
                <a
                  href="https://github.com/abhisek2004/Dev-Elevate.git/graphs/contributors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center hover:border-blue-500 transition-colors ${
                    state.darkMode
                      ? "text-gray-400 hover:text-blue-400"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                  title="View all contributors"
                >
                  <span className="text-lg">+</span>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Main Footer Content */}
        <div
          className={`border-t w-full ${
            state.darkMode ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <div className="grid grid-cols-1 gap-8 pt-6 mb-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4 space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span
                  className={`text-xl font-bold ${
                    state.darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  DevElevate
                </span>
              </div>
              <p
                className={`text-sm mb-4 ${
                  state.darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                AI-powered education and career advancement platform for
                developers and students.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-4 text-sm">
                {/* Social/Profile Links */}
                <div className="flex items-center gap-x-0.5 text-purple-600">
                  <a
                    href="https://github.com/abhisek2004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full transition-colors ${
                      state.darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
                    }`}
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abhisekpanda2004/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full transition-colors ${
                      state.darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
                    }`}
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="https://abhisekpanda072.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full transition-colors ${
                      state.darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
                    }`}
                  >
                    <Globe className="w-6 h-6" />
                  </a>

                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3
                className={`text-lg font-semibold mb-4 ${
                  state.darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`text-sm hover:text-blue-500 transition-colors ${
                        state.darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Support */}
            <div>
              <h3
                className={`text-lg font-semibold mb-4 ${
                  state.darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Legal & Support
              </h3>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`text-sm hover:text-blue-500 transition-colors ${
                        state.darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h3
                className={`text-lg font-semibold mb-4 ${
                  state.darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Built With
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className={`flex items-center space-x-2 p-2 rounded-lg ${
                      state.darkMode ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <tech.icon className="w-4 h-4" style={{ color: tech.color }} />
                    <span
                      className={`text-xs ${
                        state.darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`border-t w-full ${
            state.darkMode ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <p
            className={`text-center text-sm mt-3 mb-1 ${
              state.darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            © 2025 DevElevate. Built with{" "}
            <Heart className="inline w-4 h-4 text-red-500" /> for the developer
            community.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
