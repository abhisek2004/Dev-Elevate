import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase } from "react-icons/fa";
import { Rocket, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { SiMongodb, SiExpress, SiNodedotjs, SiTypescript, SiTailwindcss } from "react-icons/si";

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Placeholder for newsletter subscription API call
      console.log('Subscribed with email:', email);
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Updated legal links to ensure they point to public routes
  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy-policy" }, // Updated to match file name
    { name: "Terms of Service", path: "/terms-of-service" }, // Updated to match file name
    { name: "About Creator", path: "/about-creator" },
    { name: "Disclaimer", path: "/disclaimer" },
    { name: "API Docs", path: "/api-docs" },
    { name: "Documentation", path: "/documentation" },
    { name: "Contributor Guide", path: "/contributor-guide" },
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
                { icon: Github, href: 'https://github.com/abhisek2004/Dev-Elevate' }, // Updated to specific repo
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
          <div className="col-span-1">
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

          {/* Newsletter Subscription Form */}
          <div className="col-span-2">
            <h4 className="mb-2 text-sm font-semibold tracking-wider text-gray-900 uppercase dark:text-gray-100">
              Subscribe to our newsletter
            </h4>
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
              Get the latest updates, learning tips, and community news from DevElevate.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 text-gray-900 bg-white rounded-md border border-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-white bg-indigo-600 rounded-md transition-colors hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col justify-between items-center pt-8 mt-12 border-t border-white/10 md:flex-row">
          <div className="mb-4 text-sm text-gray-400 md:mb-0">
            © 2025 DevElevate. All rights reserved.
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t to-transparent pointer-events-none from-purple-900/5"></div>
    </footer>
  );
};

export default Footer;