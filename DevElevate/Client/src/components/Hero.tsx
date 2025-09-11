import React from "react";

function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[80vh] px-6">
      <h1 className="text-5xl md:text-7xl font-bold mb-6">
        Welcome to <span className="text-purple-500">DevElevate</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
        Learn, build, and grow with cutting-edge tools and guidance.  
        Your journey to becoming a better developer starts here 🚀
      </p>
      <div className="flex gap-4">
        <a
          href="#features"
          className="px-6 py-3 bg-purple-600 rounded-xl hover:bg-purple-700 transition"
        >
          Explore Features
        </a>
        <a
          href="#cta"
          className="px-6 py-3 bg-gray-800 border border-gray-600 rounded-xl hover:bg-gray-700 transition"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}

export default Hero;
