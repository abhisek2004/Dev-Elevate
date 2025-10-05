"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FiCode } from "react-icons/fi";
import { IoTriangleSharp, IoFilter } from "react-icons/io5";
import { Search, BookOpen, Brain, MessageSquare, FileText, Trophy, BarChart3, Star } from "lucide-react";

const HomePage = () => {
  // GlobeComponent Animation Logic
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
              Find Developer Around the World
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
                  { icon: Search, text: "Global Dev Challenges.", delay: 6 },
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
          {/* Section Header */}
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

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
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
    </div>
  );
};

export default HomePage;
