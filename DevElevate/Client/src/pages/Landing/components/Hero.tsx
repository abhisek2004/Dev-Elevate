import React, { useRef, useEffect, useState } from "react";
import { ArrowRight, Play, Sparkles, ChevronDown, X } from "lucide-react";
import AnimatedCube from "./AnimatedCube";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [contributors, setContributors] = useState<any[]>([]);
  const [showVideo, setShowVideo] = useState(false);

  // Observer animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
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

  // Fetch contributors (Top 5)
  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/repos/abhisek2004/Dev-Elevate/contributors?per_page=5"
        );
        if (!res.ok) throw new Error("Failed to fetch contributors");
        const data = await res.json();
        setContributors(data);
      } catch (error) {
        console.error("Error fetching contributors:", error);
      }
    };

    fetchContributors();
  }, []);

  return (
    <section
      ref={heroRef}
      data-aos="fade-up"
      data-aos-delay="100"
      className="relative flex items-center justify-center min-h-screen px-4 pt-20 sm:px-6 lg:px-8"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      <div className="grid items-center w-full grid-cols-1 gap-12 mx-auto max-w-7xl lg:grid-cols-2">
        {/* Left Content */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 space-x-2 border rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">
              AI-Powered Learning Platform
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>

          {/* Headings */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text">
                Master Your
              </span>
              <br />
              <span className="text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text animate-gradient">
                Tech Journey
              </span>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg md:text-xl">
              Your personalized smart learning & placement hub powered by AI.
              Master DSA, MERN, AI/ML, and land your dream job with our
              comprehensive platform.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {[
              { label: "Active Learners", value: "50K+", color: "text-purple-400" },
              { label: "Success Stories", value: "1000+", color: "text-blue-400" },
              { label: "AI Support", value: "24/7", color: "text-cyan-400" },
            ].map((item, i) => (
              <div className="text-center" key={i}>
                <div className={`text-3xl font-bold ${item.color}`}>
                  {item.value}
                </div>
                <div className="text-sm text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link to="/dashboard">
              <button className="flex items-center justify-center px-8 py-4 space-x-2 font-semibold text-white transition-all duration-300 transform group bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105">
                <span>Start Learning Now</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Link>

            {!showVideo && (
              <button
                onClick={() => setShowVideo(true)}
                className="flex items-center justify-center px-8 py-4 space-x-2 font-semibold text-white transition-all duration-300 border group bg-white/5 backdrop-blur-sm border-white/10 rounded-xl hover:bg-white/10"
              >
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            )}
          </div>

          {/* Video Embed */}
          {showVideo && (
            <div className="relative w-full max-w-3xl mt-6 overflow-hidden shadow-lg aspect-video rounded-xl">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/zCUTFe8gQEA?si=Ww6NjvtI1R5RKaDW&autoplay=1"
                title="DevElevate Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {/* Close button */}
              <button
                onClick={() => setShowVideo(false)}
                className="absolute p-2 text-white transition bg-black rounded-full top-2 right-2 hover:bg-red-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Trust Indicators */}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="flex -space-x-2">
                {contributors.length > 0 ? (
                  contributors.map((c) => (
                    <a
                      key={c.id}
                      href={c.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={c.avatar_url}
                        alt={c.login}
                        title={c.login}
                        className="w-8 h-8 transition-transform duration-200 border-2 border-black rounded-full hover:scale-110"
                      />
                    </a>
                  ))
                ) : (
                  [1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 border-2 border-black rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                    ></div>
                  ))
                )}
              </div>
              <span>Trusted by developers worldwide</span>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="relative flex items-center justify-center mt-10 lg:mt-0">
          <AnimatedCube />

          {/* Floating Effects */}
          <div className="absolute hidden w-20 h-20 rounded-full sm:block -top-10 -right-10 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl animate-pulse"></div>
          <div className="absolute hidden w-32 h-32 delay-1000 rounded-full sm:block -bottom-10 -left-10 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl animate-pulse"></div>

          {/* Code Snippets */}
          <div className="absolute hidden p-3 border rounded-lg md:block top-1/4 -left-16 bg-black/50 backdrop-blur-sm border-purple-500/20 animate-float">
            <code className="text-xs text-green-400">
              {'{ "status": "learning" }'}
            </code>
          </div>
          <div className="absolute hidden p-3 delay-500 border rounded-lg md:block bottom-1/4 -right-16 bg-black/50 backdrop-blur-sm border-blue-500/20 animate-float">
            <code className="text-xs text-blue-400">{"AI.solve(problem)"}</code>
          </div>
          {/* 🔥 New floating snippets */}
          <div className="absolute hidden p-3 delay-700 border rounded-lg md:block top-10 right-1/4 bg-black/50 backdrop-blur-sm border-pink-500/20 animate-float">
            <code className="text-xs text-pink-400">{"const dev = Elevate();"}</code>
          </div>

          <div className="absolute hidden p-3 delay-1000 border rounded-lg md:block bottom-10 left-1/4 bg-black/50 backdrop-blur-sm border-yellow-500/20 animate-float">
            <code className="text-xs text-yellow-400">{"// 🚀 Keep Building"}</code>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute transform -translate-x-1/2 cursor-pointer bottom-8 left-1/2 animate-bounce"
        onClick={() => {
          document
            .getElementById("features")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <ChevronDown className="w-6 h-6 text-gray-400" />
      </div>
    </section>
  );
};

export default Hero;
