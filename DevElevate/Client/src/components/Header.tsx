import React from "react";

function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-transparent">
      <h1 className="text-2xl font-bold">🚀 DevElevate</h1>
      <nav className="space-x-6">
        <a href="#features" className="hover:text-purple-400">Features</a>
        <a href="#tech" className="hover:text-purple-400">Tech Stack</a>
        <a href="#testimonials" className="hover:text-purple-400">Testimonials</a>
        <a href="#cta" className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700">
          Get Started
        </a>
      </nav>
    </header>
  );
}

export default Header;
