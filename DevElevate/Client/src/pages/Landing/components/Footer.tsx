import React from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase } from "react-icons/fa";
import { Rocket, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { SiMongodb, SiExpress, SiNodedotjs, SiTypescript, SiTailwindcss } from "react-icons/si";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  ];

  return (
    <footer className="relative bg-black border-t border-white/10">
      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center mb-6 space-x-3">
              <div className="flex justify-center items-center w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  DevElevate
                </h3>
                <p className="text-xs text-gray-500">Smart Learning Hub</p>
              </div>
            </div>
            <p className="mb-6 leading-relaxed text-gray-400">
              Empowering developers worldwide with AI-powered learning, personalized guidance, and comprehensive career support.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: 'https://github.com/abhisek2004' },
                { icon: FaBriefcase, href: 'https://abhisekpanda072.vercel.app/' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/abhisekpanda2004/' },
                { icon: Mail, href: 'mailto:officialdevelevate@gmail.com' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center w-10 h-10 rounded-lg border transition-all duration-300 bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/30"
                >
                  <social.icon className="w-4 h-4 text-gray-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 transition-colors duration-300 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="col-span-1">
            <h4 className="mb-4 font-semibold text-white">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 transition-colors duration-300 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="col-span-2">
            <h4 className="mb-4 font-semibold text-white">Tech Stack</h4>
            <ul className="space-y-3">
              {techStack.map((tech) => {
                const IconComponent = tech.icon;
                return (
                  <li key={tech.name} className="flex items-center space-x-2">
                    <IconComponent 
                      className="w-4 h-4" 
                      style={{ color: tech.color }}
                    />
                    <span className="text-gray-400">{tech.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col justify-between items-center pt-8 mt-12 border-t border-white/10 md:flex-row">
          <div className="mb-4 text-sm text-gray-400 md:mb-0">
            © 2025 DevElevate. All rights reserved.
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-gray-400 transition-colors duration-300 group hover:text-white"
          >
            <span className="text-sm">Back to top</span>
            <div className="flex justify-center items-center w-8 h-8 rounded-lg border transition-all duration-300 bg-white/5 border-white/10 group-hover:bg-white/10 group-hover:border-purple-500/30">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t to-transparent pointer-events-none from-purple-900/5"></div>
    </footer>
  );
};

export default Footer;
