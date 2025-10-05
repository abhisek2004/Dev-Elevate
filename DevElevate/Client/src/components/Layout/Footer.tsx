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
          setContributors(data.slice(0, 6)); // Limit to 6 contributors
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

  // Updated quick links to match page structure
  const quickLinks = [
    { name: "Learning Hub", path: "/learning" },
    { name: "Study Buddy", path: "/chatbot" },
    { name: "Tech Feed", path: "/news" },
    { name: "Resume Builder", path: "/resume" },
    { name: "Placement Prep", path: "/placement" },
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
      className={`${state.darkMode ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"}  border-opacity-40 transition-colors duration-200`}
    >
      <div className="px-4 pt-6 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div
          className={`border-t w-full ${state.darkMode ? "border-gray-800" : "border-gray-200"}`}
        >
          <div className="grid grid-cols-1 gap-8 pt-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4 space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className={`text-xl font-bold ${state.darkMode ? "text-white" : "text-gray-900"}`}>
                  DevElevate
                </span>
              </div>
              <p className={`text-sm mb-4 ${state.darkMode ? "text-gray-400" : "text-gray-600"}`}>
                AI-powered education and career advancement platform for developers and students.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-4 text-sm">
                <div className="flex items-center gap-x-0.5 text-purple-600">
                  <a
                    href="https://github.com/abhisek2004/Dev-Elevate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full transition-colors ${state.darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"}`}
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abhisekpanda2004/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full transition-colors ${state.darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"}`}
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="https://abhisekpanda072.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full transition-colors ${state.darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"}`}
                  >
                    <Globe className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-center">
              <h3 className={`text-lg font-semibold mb-4 ${state.darkMode ? "text-white" : "text-gray-900"}`}>
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`text-sm hover:text-blue-500 transition-colors ${state.darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>



            {/* Tech Stack */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${state.darkMode ? "text-white" : "text-gray-900"}`}>
                Built With
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className={`flex items-center space-x-2 p-2 rounded-lg ${state.darkMode ? "bg-gray-800" : "bg-white"}`}
                  >
                    <tech.icon className="w-4 h-4" style={{ color: tech.color }} />
                    <span className={`text-xs ${state.darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center pt-8 mt-12 border-t border-white/10">
          <div className="text-sm text-yellow-400 flex items-center gap-2 
                  transition duration-300 hover:text-pink-400 hover:drop-shadow-[0_0_12px_rgba(255,20,147,0.9)]">
            © 2025 <span className="font-semibold">DevElevate</span>. All rights reserved. | Made with ❤️ by
            <a
              href="https://www.linkedin.com/in/abhisekpanda2004/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 font-semibold text-yellow-400 transition duration-300 hover:text-pink-400"
            >
              Team DevElevate
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;