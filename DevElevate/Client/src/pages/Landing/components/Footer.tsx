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
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cxgenie.ai/widget.js";
    script.async = true;
    script.setAttribute("data-aid", "57a742e1-0804-479d-bddb-9934f738f932");
    script.setAttribute("data-lang", "en");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="text-white bg-black">
      {/* Globe Section */}
      <section className="w-full min-h-[250px] grid place-items-center mb-10 py-20">
        <div className="sm:max-w-[80%] w-full h-full grid lg:grid-cols-2 gap-6 p-4">
          <div ref={ref} className="flex z-10 flex-col gap-5 items-center text-center lg:text-left justify-normal lg:items-start">
            <motion.h1
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={animationVariants}
              transition={{ duration: 1.5 }}
              className="text-3xl font-bold lg:text-6xl text-wrap"
            >
              Find Teammates Around the World
            </motion.h1>
            <motion.p
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={animationVariants}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="text-base font-medium text-transparent bg-clip-text bg-gradient-to-tl from-gray-900 via-gray-800 to-gray-800 dark:from-gray-100 dark:via-gray-200 dark:to-gray-500 sm:text-lg md:text-xl text-wrap"
            >
              Discover like-minded developers across different time zones, experience levels, and tech stacks.
            </motion.p>
            <div className="flex justify-center items-center mt-5 w-full lg:justify-start">
              <div className="flex flex-wrap gap-2 justify-center items-center w-full text-sm font-light leading-tight text-center lg:justify-normal">
                {[
                  { icon: FiCode, text: "Match teammates by skills.", delay: 1 },
                  { icon: IoTriangleSharp, text: "Seamless global collaboration.", delay: 4 },
                  { icon: IoFilter, text: "Filter by role, experience, and tech stack.", delay: 6 },
                  { icon: Search, text: "Explore worldwide hackathons.", delay: 6 },
                ].map((item, index) => (
                  <motion.span
                    key={index}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={spanVariants}
                    transition={{ duration: 1, delay: item.delay }}
                    className="flex gap-2 justify-center items-center px-4 py-2 text-white rounded-full border divide-x divide-gray-600 border-purple-500/30"
                  >
                    <item.icon className="text-[rgb(0,255,255)]" />
                    <span>{item.text}</span>
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
          <div className="grid place-items-center w-full min-h-[16rem] sm:min-h-[20rem] md:min-h-[24rem] lg:h-fit z-0">
            <img
              src="/globe-img.gif"
              alt="globe"
              width={400}
              height={400}
              className="object-contain max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 sm:py-24 bg-black/90">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center sm:mb-20">
            <div className="inline-flex items-center px-4 py-2 mb-6 space-x-2 bg-gradient-to-r rounded-full border from-purple-500/10 to-blue-500/10 border-purple-500/20">
              <Star className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">Powerful Features</span>
            </div>
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl md:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Everything You Need to
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Excel in Tech
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-base text-gray-400 sm:text-lg md:text-xl">
              Our comprehensive platform combines AI-powered learning, personalized guidance, and industry-standard tools to accelerate your tech career journey.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500 group bg-black/50 border-white/10 sm:p-8 hover:border-purple-500/30 hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
                <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-5`}>
                  <feature.icon className="w-7 h-7 text-white sm:w-8 sm:h-8" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white transition-all duration-300 sm:text-2xl sm:mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-400 group-hover:to-blue-400">
                  {feature.title}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-gray-400 sm:text-base">
                  {feature.description}
                </p>
                <div className="space-y-2">
                  {feature.details.map((detail, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className={`w-2 h-2 bg-gradient-to-r ${feature.gradient} rounded-full`}></div>
                      <span className="text-sm text-gray-500">{detail}</span>
                    </div>
                  ))}
                </div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative bg-black border-t border-white/10">
        <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
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
                    className="flex justify-center items-center w-10 h-10 rounded-lg border transition-all duration-300 bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/30"
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
          <div className="flex flex-col justify-between items-center pt-8 mt-12 border-t border-white/10 md:flex-row">
            <div className="mb-4 text-sm text-gray-400 md:mb-0">
              © 2025 DevElevate. All rights reserved.
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t to-transparent pointer-events-none from-purple-900/5"></div>
      </footer>
    </div>
  );
};

export default HomePage;