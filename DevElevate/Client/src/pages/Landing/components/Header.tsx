import React, { useState, useEffect } from "react";
import { Menu, X, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Features", href: "/#features" },
    { label: "Learning", href: "/#learning" },
    // { label: "AI Assistant", href: "/#ai" },
    { label: "Placement", href: "/placements", isRoute: true },
    // { label: "About", href: "/#about" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500  bg-black ${scrolled
        ? "border-b backdrop-blur-xl bg-black/80 border-purple-500/20"
        : ""}`}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="flex justify-center items-center w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg transition-transform duration-300 rotate-12 hover:rotate-0">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                DevElevate
              </h1>
              <p className="text-xs text-gray-400">Smart Learning Hub</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            {navItems.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="relative text-gray-300 transition-colors duration-300 hover:text-white group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative text-gray-300 transition-colors duration-300 hover:text-white group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>)
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden items-center space-x-4 md:flex">
            <Link to="/dashboard">
              <button className="text-gray-300 transition-colors duration-300 hover:text-white">
                Sign In
              </button>
            </Link>
            <Link to="/dashboard">
              <button className="px-6 py-2 text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg transition-all duration-300 transform hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-white md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="py-4 border-t border-gray-800 md:hidden">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                item.isRoute ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-gray-300 transition-colors duration-300 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-gray-300 transition-colors duration-300 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>)
              ))}
              <div className="flex flex-col justify-center items-center pt-4 space-y-2 w-full">
                <div className="w-full">
                  <Link to="/dashboard">
                    <button className="px-6 py-2 w-full text-gray-900 bg-gray-300 rounded-lg transition-colors duration-300 hover:text-white">
                      Sign In
                    </button>
                  </Link>
                </div>
                <div className="w-full">
                  <Link to="/dashboard">
                    <button className="px-6 py-2 w-full text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                      Get Started
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
