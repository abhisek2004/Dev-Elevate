import React, { useRef, useEffect } from 'react';
import { ArrowRight, Play, Sparkles, ChevronDown } from 'lucide-react';
import AnimatedCube from './AnimatedCube';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left Content */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full px-4 py-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">AI-Powered Learning Platform</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>

          {/* Headings */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Master Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                Tech Journey
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
              Your personalized smart learning & placement hub powered by AI. Master DSA, MERN, AI/ML, 
              and land your dream job with our comprehensive platform.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {[
              { label: 'Active Learners', value: '50K+', color: 'text-purple-400' },
              { label: 'Success Stories', value: '1000+', color: 'text-blue-400' },
              { label: 'AI Support', value: '24/7', color: 'text-cyan-400' },
            ].map((item, i) => (
              <div className="text-center" key={i}>
                <div className={`text-3xl font-bold ${item.color}`}>{item.value}</div>
                <div className="text-sm text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/dashboard">
              <button className="group bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                <span>Start Learning Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
            <button className="group bg-white/5 backdrop-blur-sm border border-white/10 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-white/10 transition-all duration-300">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center space-x-4 text-gray-500 text-sm">
            <div className="flex items-center space-x-1">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full border-2 border-black"
                  ></div>
                ))}
              </div>
              <span>Trusted by developers worldwide</span>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="relative flex justify-center items-center mt-10 lg:mt-0">
          <AnimatedCube />

          {/* Floating Effects */}
          <div className="hidden sm:block absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="hidden sm:block absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>

          {/* Code Snippets */}
          <div className="hidden md:block absolute top-1/4 -left-16 bg-black/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-3 animate-float">
            <code className="text-green-400 text-xs">
              {'{ "status": "learning" }'}
            </code>
          </div>
          <div className="hidden md:block absolute bottom-1/4 -right-16 bg-black/50 backdrop-blur-sm border border-blue-500/20 rounded-lg p-3 animate-float delay-500">
            <code className="text-blue-400 text-xs">
              {'AI.solve(problem)'}
            </code>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-gray-400" />
      </div>
    </section>
  );
};

export default Hero;
