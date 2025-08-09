import React from 'react';
import { Rocket, Github, Twitter, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    Product: ['Features', 'Pricing', 'API', 'Integrations', 'Changelog'],
    Resources: ['Documentation', 'Tutorials', 'Blog', 'Community', 'Help Center'],
    Company: ['About', 'Careers', 'Contact', 'Privacy', 'Terms'],
    Support: ['Help Center', 'Status', 'Contact Us', 'Bug Report', 'Feature Request']
  };

  return (
    <footer className="relative bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  DevElevate
                </h3>
                <p className="text-xs text-gray-500">Smart Learning Hub</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering developers worldwide with AI-powered learning, personalized guidance, and comprehensive career support.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Mail, href: '#' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4 text-gray-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1">
              <h4 className="text-white font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 DevElevate. All rights reserved.
          </div>
          
          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <span className="text-sm">Back to top</span>
            <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/10 group-hover:border-purple-500/30 transition-all duration-300">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/5 to-transparent pointer-events-none"></div>
    </footer>
  );
};

export default Footer;