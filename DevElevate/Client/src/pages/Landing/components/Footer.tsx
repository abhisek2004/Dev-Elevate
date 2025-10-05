"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { FiCode } from "react-icons/fi";
import { IoTriangleSharp, IoFilter } from "react-icons/io5";
import { Search, BookOpen, Brain, MessageSquare, FileText, Trophy, BarChart3, Star, Rocket, Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { FaBriefcase } from "react-icons/fa";
import { SiMongodb, SiExpress, SiNodedotjs, SiTypescript, SiTailwindcss } from "react-icons/si";

const HomePage = () => {
  // Globe Section Animation Logic
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const spanVariants = {
    hidden: { opacity: 0, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 1 },
    },
  };

  // Features Data
  const features = [
    {
      icon: BookOpen,
      title: "Learning Hub",
      description: "Structured learning paths for DSA, Java, MERN Stack, AI/ML, and Data Science with progress tracking.",
      gradient: "from-purple-500 to-blue-500",
      details: ["Interactive Roadmaps", "Video Tutorials", "Practice Problems", "Progress Analytics"],
    },
    {
      icon: Brain,
      title: "AI Study Buddy",
      description: "24/7 AI chatbot powered by GPT-4 for doubt solving, resource suggestions, and career advice.",
      gradient: "from-blue-500 to-cyan-500",
      details: ["Instant Doubt Resolution", "Personalized Learning", "Multilingual Support", "Smart Recommendations"],
    },
    {
      icon: MessageSquare,
      title: "Tech Feed",
      description: "Latest tech news, internship updates, hackathons, and career opportunities in one place.",
      gradient: "from-cyan-500 to-green-500",
      details: ["Daily Tech News", "Job Alerts", "Event Calendar", "Weekly Newsletter"],
    },
    {
      icon: FileText,
      title: "Resume Builder",
      description: "ATS-compliant resume templates with AI-powered suggestions for better job applications.",
      gradient: "from-green-500 to-yellow-500",
      details: ["ATS Templates", "AI Suggestions", "Cover Letter Builder", "LinkedIn Optimizer"],
    },
    {
      icon: Trophy,
      title: "Placement Prep",
      description: "Comprehensive placement preparation with mock interviews, coding challenges, and job listings.",
      gradient: "from-yellow-500 to-orange-500",
      details: ["Mock Interviews", "Coding Challenges", "Job Listings", "HR Interview Q&A"],
    },
    {
      icon: BarChart3,
      title: "Smart Dashboard",
      description: "Personalized dashboard with daily planners, progress tracking, and productivity tools.",
      gradient: "from-orange-500 to-red-500",
      details: ["Daily Planner", "Progress Graphs", "Study Streaks", "Goal Tracking"],
    },
  ];

  // Footer Newsletter Form State
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log("Subscribed with email:", email);
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Footer Legal Links
  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms of Service", path: "/terms-of-service" },
    { name: "About Creator", path: "/about-creator" },
    { name: "Disclaimer", path: "/disclaimer" },
    { name: "API Docs", path: "/api-docs" },
    { name: "Documentation", path: "/documentation" },
    { name: "Contributor Guide", path: "/contributor-guide" },
  ];

  // Footer Tech Stack
  const techStack = [
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  ];

  // Load Chatbot Script
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://widget.cxgenie.ai/widget.js";
  //   script.async = true;
  //   script.setAttribute("data-aid", "57a742e1-0804-479d-bddb-9934f738f932");
  //   script.setAttribute("data-lang", "en");
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  return (
    <div className="text-white bg-black">
      {/* Footer Section */}
      <footer data-aos="fade-up" data-aos-delay="120" className="relative bg-black border-t border-white/10">
        <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
            <div className="col-span-2 md:col-span-2">
              <div className="flex items-center mb-6 space-x-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
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
                  { icon: Github, href: "https://github.com/abhisek2004/Dev-Elevate" },
                  { icon: FaBriefcase, href: "https://abhisekpanda072.vercel.app/" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/abhisekpanda2004/" },
                  { icon: Mail, href: "mailto:officialdevelevate@gmail.com" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 transition-all duration-300 border rounded-lg bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/30"
                  >
                    <social.icon className="w-4 h-4 text-gray-400" />
                  </a>
                ))}
              </div>
            </div>
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
            <div className="col-span-1">
              <h4 className="mb-4 font-semibold text-white">Tech Stack</h4>
              <ul className="space-y-3">
                {techStack.map((tech) => {
                  const IconComponent = tech.icon;
                  return (
                    <li key={tech.name} className="flex items-center space-x-2">
                      <IconComponent className="w-4 h-4" style={{ color: tech.color }} />
                      <span className="text-gray-400">{tech.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-span-2">
              <h4 className="mb-2 text-sm font-semibold tracking-wider text-gray-900 uppercase dark:text-gray-100">
                Subscribe to our newsletter
              </h4>
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                Get the latest updates, learning tips, and community news from DevElevate.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-white transition-colors bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                We respect your privacy. Unsubscribe at any time.
              </p>
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
                Abhisek Panda
              </a>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t to-transparent from-purple-900/5"></div>
      </footer>
    </div>
  );
};

export default HomePage;
