import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import roadmap from "../../assets/json/rolebasedRoadmaps.json";
import skills from "../../assets/json/skillbasedRoadmaps.json";
import { useGlobalState } from "../../contexts/GlobalContext";

import {
  FaRegBookmark,
  FaBookmark,
  FaReact,
  FaVuejs,
  FaAngular,
  FaJava,
  FaPython,
  FaNodeJs,
  FaAws,
  FaDocker,
  FaLinux,
  FaGitAlt,
} from "react-icons/fa";

import {
  SiTypescript,
  SiJavascript,
  SiMongodb,
  SiKubernetes,
  SiRust,
  SiGo,
  SiSpringboot,
  SiGraphql,
  SiFlutter,
  SiRedis,
  SiDotnet,
  SiCplusplus,
} from "react-icons/si";

const skillIcons = {
  React: <FaReact className="text-sky-500" />,
  Vue: <FaVuejs className="text-green-500" />,
  Angular: <FaAngular className="text-red-600" />,
  JavaScript: <SiJavascript className="text-yellow-400" />,
  TypeScript: <SiTypescript className="text-blue-500" />,
  "Node.js": <FaNodeJs className="text-green-600" />,
  Python: <FaPython className="text-yellow-400" />,
  Java: <FaJava className="text-red-500" />,
  "C++": <SiCplusplus className="text-blue-500" />,
  "Spring Boot": <SiSpringboot className="text-green-700" />,
  Go: <SiGo className="text-cyan-500" />,
  Rust: <SiRust className="text-orange-600" />,
  GraphQL: <SiGraphql className="text-pink-500" />,
  Flutter: <SiFlutter className="text-sky-400" />,
  MongoDB: <SiMongodb className="text-green-600" />,
  AWS: <FaAws className="text-orange-400" />,
  Docker: <FaDocker className="text-blue-500" />,
  Kubernetes: <SiKubernetes className="text-blue-600" />,
  Linux: <FaLinux className="text-black dark:text-white" />,
  "Git and GitHub": <FaGitAlt className="text-orange-600" />,
  Redis: <SiRedis className="text-red-500" />,
  "ASP.NET Core": <SiDotnet className="text-purple-500" />,
};

//Define learning tiers and associated skills
const LEARNING_TIERS = {
  foundational: {
    name: "Foundational",
    description: "Core concepts every developer should master",
    icon: "🏗️",
    skills: [
      "Computer Science",
      "Data Structures & Algorithms",
      "Git and GitHub",
      "SQL",
    ],
  },
  languages: {
    name: "Programming Languages",
    description: "Master programming languages and their ecosystems",
    icon: "💻",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "C++", "Go", "Rust"],
  },
  frameworks: {
    name: "Frameworks & Libraries",
    description: "Popular frameworks for rapid development",
    icon: "🚀",
    skills: [
      "React",
      "Vue",
      "Angular",
      "Node.js",
      "Spring Boot",
      "ASP.NET Core",
      "Flutter",
      "React Native",
    ],
  },
  specialization: {
    name: "Architecture and Design",
    description: "Specialized skills for different domains",
    icon: "🎨",
    skills: [
      "System Design",
      "API Design",
      "GraphQL",
      "Design and Architecture",
      "Design System",
      "UX Design",
    ],
  },
  infrastructure: {
    name: "Infrastructure & DevOps",
    description: "Deploy, monitor, and scale applications",
    icon: "☁️",
    skills: [
      "Docker",
      "Kubernetes",
      "AWS",
      "Terraform",
      "Linux",
      "MongoDB",
      "Redis",
    ],
  },
  emerging: {
    name: "Emerging Technologies",
    description: "Latest technologies shaping the future",
    icon: "🔮",
    skills: ["Prompt Engineering", "Code Review"],
  },
};

const Roadmap = () => {
  const { state, dispatch } = useGlobalState();
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all"); // all, roles, skills, tiers
  // const [activeTier, setActiveTier] = useState("all"); // all, foundational, languages, etc.
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkSaving, setBookmarkSaving] = useState({});

  // Unique descriptions for each roadmap
  const roadmapDescriptions = {
    // Role-based descriptions
    "frontend developer":
      "Focuses on building the user interface UI and UX of web applications. Works with HTML, CSS, JavaScript, and frameworks like React, Angular, or Vue to create interactive and responsive designs.",
    "backend developer":
      "Works on the server-side logic, databases, and APIs that power applications. Common tools include Node.js, Python, Java, Ruby, SQL, and frameworks like Django, Spring, or Express.",
    "devops engineer":
      "Bridges development and operations by automating workflows, managing infrastructure, CI/CD pipelines, and ensuring scalability and reliability of systems.",
    "full stack developer":
      "Combine frontend and backend expertise to build complete web applications from start to finish.",
    "ai engineer":
      "Dive into machine learning, neural networks, and AI frameworks to create intelligent systems.",
    "data analyst":
      "Transform raw data into actionable insights using statistical analysis and visualization techniques.",
    "software architect":
      "Design scalable system architectures and make high-level technical decisions for complex projects.",
    "software design and architecture engineer":
      "Focus on design patterns, system modeling, and creating maintainable software solutions.",
    "qa engineer":
      "Ensure software quality through comprehensive testing strategies and quality assurance processes.",
    "software testing engineer":
      "Specialize in automated testing frameworks and validation techniques for reliable software.",
    "cyber security engineer":
      "Protect systems from threats through security analysis, penetration testing, and incident response.",
    "ux designer":
      "Create intuitive user experiences through research, wireframing, and user-centered design principles.",
    "computer science engineer":
      "Build a strong foundation in algorithms, data structures, and core computer science concepts.",

    // Skill-based descriptions
    "computer science":
      "Master fundamental concepts including algorithms, data structures, and computational theory.",
    react:
      "Build dynamic user interfaces with the most popular JavaScript library for modern web development.",
    vue: "Create progressive web applications with Vue.js's approachable and flexible framework architecture.",
    angular:
      "Develop enterprise-scale applications using Google's comprehensive TypeScript-based framework.",
    javascript:
      "Master the versatile language that powers modern web development, from frontend to backend.",
    "node.js":
      "Build scalable server-side applications and APIs using JavaScript's powerful runtime environment.",
    typescript:
      "Add static typing to JavaScript for more robust, maintainable, and error-free applications.",
    python:
      "Learn the versatile language used in web development, data science, AI, and automation.",
    sql: "Master database querying and management with the standard language for relational databases.",
    "system design":
      "Learn to architect scalable, reliable systems that can handle millions of users.",
    "api design":
      "Design robust, RESTful APIs that are secure, scalable, and developer-friendly.",
    "asp.net core":
      "Build high-performance web applications and APIs using Microsoft's cross-platform framework.",
    java: "Master the enterprise-grade programming language used in large-scale applications worldwide.",
    "c++":
      "Develop high-performance applications with this powerful systems programming language.",
    flutter:
      "Create beautiful, natively compiled mobile apps for iOS and Android from a single codebase.",
    "spring boot":
      "Build production-ready Java applications quickly with this powerful, convention-based framework.",
    go: "Master Google's efficient programming language designed for modern, concurrent applications.",
    rust: "Learn systems programming with memory safety, zero-cost abstractions, and blazing performance.",
    graphql:
      "Query APIs more efficiently with this powerful data query and manipulation language.",
    "design and architecture":
      "Master software design principles, patterns, and architectural best practices.",
    "design system":
      "Create consistent, scalable design systems that unify user experience across products.",
    "react native":
      "Build native mobile apps for iOS and Android using React and JavaScript.",
    aws: "Master cloud computing with Amazon's comprehensive suite of scalable web services.",
    "code review":
      "Learn best practices for reviewing code, ensuring quality, and mentoring team members.",
    docker:
      "Containerize applications for consistent deployment across different environments and platforms.",
    kubernetes:
      "Orchestrate containerized applications at scale with automated deployment and management.",
    linux:
      "Master the open-source operating system that powers servers, containers, and cloud infrastructure.",
    mongodb:
      "Work with flexible, document-based NoSQL databases for modern application development.",
    "prompt engineering":
      "Master the art of crafting effective prompts for AI models and language systems.",
    terraform:
      "Automate infrastructure provisioning and management with infrastructure-as-code principles.",
    "data structures & algorithms":
      "Master the fundamental building blocks of efficient programming and problem-solving.",
    "git and github":
      "Master version control, collaboration workflows, and open-source contribution practices.",
    redis:
      "Implement high-performance caching and data storage with this in-memory database system.",
  };

  // Function to get description for a roadmap
  const getDescription = (name, type) => {
    if (!name)
      return "Explore this comprehensive learning path to advance your skills.";

    const normalizedName = name.toLowerCase().trim();

    // Check for exact match first
    if (roadmapDescriptions[normalizedName]) {
      return roadmapDescriptions[normalizedName];
    }

    // Check for partial matches
    for (const [key, desc] of Object.entries(roadmapDescriptions)) {
      if (normalizedName.includes(key) || key.includes(normalizedName)) {
        return desc;
      }
    }

    // Default descriptions based on type
    if (type === "role") {
      return "Master the essential skills and knowledge needed to excel in this professional role.";
    } else {
      return "Develop expertise in this technology with hands-on projects and practical applications.";
    }
  };

  const getTierForSkill = (skillName) => {
    if (!skillName) return null;

    for (const [tierKey, tierData] of Object.entries(LEARNING_TIERS)) {
      if (
        tierData.skills.some(
          (skill) => skill.toLowerCase() === skillName.toLowerCase()
        )
      ) {
        return { key: tierKey, ...tierData };
      }
    }
    return null;
  };

  const groupSkillsByTier = (skills) => {
    const grouped = {};

    // Initialize all tiers
    Object.keys(LEARNING_TIERS).forEach((tierKey) => {
      grouped[tierKey] = [];
    });

    // Group skills by tier
    skills.forEach((skill) => {
      const tier = getTierForSkill(skill.name);
      if (tier) {
        grouped[tier.key].push(skill);
      } else {
        // Fallback for unclassified skills
        if (!grouped.uncategorized) grouped.uncategorized = [];
        grouped.uncategorized.push(skill);
      }
    });

    // Remove empty tiers
    Object.keys(grouped).forEach((key) => {
      if (grouped[key].length === 0) {
        delete grouped[key];
      }
    });

    return grouped;
  };

  // Handle Loading state
  const [loading, setLoading] = useState(false);
  const handleFilterChange = (filter) => {
    setLoading(true);
    setActiveFilter(filter);
    setTimeout(() => {
      setLoading(false);
    }, 400);
  };

  const filteredRoadmaps = useMemo(() => {
    // Keep the normalization part the same
    const normalizedRoadmaps = roadmap
      .filter((item) => item && (item.roadmap_name || item.name))
      .map((item) => ({
        ...item,
        name: item.roadmap_name || item.name,
        link: item.roadmap_link || item.link,
        icon: item.icon || "",
        type: "role",
      }));

    const normalizedSkills = skills
      .filter((item) => item && (item.skill_name || item.name))
      .map((item) => ({
        ...item,
        name: item.skill_name || item.name,
        link: item.skill_link || item.link,
        icon: item.icon || "",
        type: "skill",
      }));

    const allRoadmaps = [...normalizedRoadmaps, ...normalizedSkills];
    let filtered = allRoadmaps;

    // Simplify filter logic - remove the tiers condition
    if (activeFilter === "roles") {
      filtered = filtered.filter((item) => item.type === "role");
    } else if (activeFilter === "skills") {
      filtered = filtered.filter((item) => item.type === "skill");
    }

    // Keep search filtering the same
    if (searchQuery.trim()) {
      filtered = filtered.filter((item) => {
        if (!item || !item.name || typeof item.name !== "string") {
          return false;
        }
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    const roles = filtered.filter((item) => item.type === "role");
    const skillsFiltered = filtered.filter((item) => item.type === "skill");

    return {
      roles,
      skills: skillsFiltered,
      // Always include skillsByTier for skills section
      skillsByTier:
        activeFilter === "all" || activeFilter === "skills"
          ? groupSkillsByTier(skillsFiltered)
          : {},
    };
  }, [searchQuery, activeFilter]); // Remove activeTier from dependencies

  // Animation variants - all based on page load, not scroll
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const buttonVariants = {
    initial: {
      scale: 1,
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  };

  const iconVariants = {
    initial: { x: 0 },
    hover: {
      x: 4,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const backgroundVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const searchVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.8,
        ease: "easeOut",
      },
    },
  };

  const sectionHeaderVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const noResultsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Staggered section animations
  const rolesSectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      // transition: {
      //   delay: 1.2,
      //   duration: 0.4
      // }
    },
  };

  const skillsSectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      // transition: {
      //   delay: 1.8,
      //   duration: 0.4
      // }
    },
  };

  const ctaSectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 2.4,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${
        state.darkMode
          ? "bg-dark-bg-primary text-dark-text-primary"
          : "bg-light-bg-primary text-light-text-primary"
      }`}
    >
      {/* Enhanced Background with gradient overlay */}
      <motion.div
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
        className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${
          state.darkMode ? "bg-grid-pattern-dark" : "bg-grid-pattern-light"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            state.darkMode
              ? "bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50"
              : "bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50"
          }`}
        ></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20">
        {/* Enhanced Header Section */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <div className="inline-block">
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-righteous tracking-wider mb-4 ${
                state.darkMode
                  ? "text-dark-text-primary"
                  : "text-light-text-primary"
              }`}
            >
              Learning Roadmaps
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className={`h-1 rounded-full bg-gradient-to-r ${
                state.darkMode
                  ? "from-primary via-primary-dark to-primary"
                  : "from-primary via-primary-dark to-primary"
              }`}
            ></motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={`mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
              state.darkMode
                ? "text-dark-text-secondary"
                : "text-light-text-secondary"
            }`}
          >
            Discover comprehensive learning paths designed to guide your journey
            from beginner to expert in various roles and skills.
          </motion.p>
        </motion.div>

        {/* Enhanced Search Section */}
        <motion.div
          variants={searchVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          {/* Search Bar */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative w-full max-w-2xl">
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className={`relative rounded-2xl overflow-hidden ${
                  state.darkMode
                    ? "bg-dark-bg-secondary border border-dark-border"
                    : "bg-light-bg-secondary border border-light-border"
                } transition-all duration-300`}
              >
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className={`h-5 w-5 ${
                      state.darkMode
                        ? "text-dark-text-secondary"
                        : "text-light-text-secondary"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search roadmaps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 text-lg placeholder-opacity-50 bg-transparent border-none outline-none focus:ring-0 ${
                    state.darkMode
                      ? "text-dark-text-primary placeholder-dark-text-secondary"
                      : "text-light-text-primary placeholder-light-text-secondary"
                  }`}
                />
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setSearchQuery("")}
                    className={`absolute inset-y-0 right-0 pr-4 flex items-center ${
                      state.darkMode
                        ? "text-dark-text-secondary hover:text-dark-text-primary"
                        : "text-light-text-secondary hover:text-light-text-primary"
                    } transition-colors duration-200`}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                )}
              </motion.div>
            </div>

            {/* Filter Buttons */}
            <div
              className={`flex flex-wrap justify-center gap-3 p-2 rounded-xl ${
                state.darkMode
                  ? "bg-white text-black"
                  : "text-black"
              }`}
            >
              {[
                {
                  key: "all",
                  label: "All Roadmaps",
                  count: roadmap.length + skills.length,
                },
                { key: "roles", label: "Role Based", count: roadmap.length },
                { key: "skills", label: "Skill Based", count: skills.length },
              ].map((filter) => (
                <motion.button
                  key={filter.key}
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => {
                    handleFilterChange(filter.key);
                    if (filter.key !== "tiers") setActiveTier("all");
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ${
                    activeFilter === filter.key
                      ? "bg-primary text-white shadow-lg"
                      : state.darkMode
                      ? "text-dark-text-secondary hover:text-dark-text-primary hover:bg-dark-bg-primary"
                      : "text-light-text-secondary hover:text-light-text-primary hover:bg-light-bg-primary"
                  }`}
                >
                  {filter.label}
                  <span
                    className={`ml-2 text-xs px-2 py-1 rounded-full ${
                      activeFilter === filter.key
                        ? "bg-white/20"
                        : state.darkMode
                        ? "bg-dark-bg-primary text-dark-text-secondary"
                        : "bg-light-bg-primary text-light-text-secondary"
                    }`}
                  >
                    {filter.count}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Search Results Count */}
            {searchQuery && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-sm ${
                  state.darkMode
                    ? "text-dark-text-secondary"
                    : "text-light-text-secondary"
                }`}
              >
                Found{" "}
                {filteredRoadmaps.roles.length + filteredRoadmaps.skills.length}{" "}
                roadmap(s) matching "{searchQuery}"
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* No Results Message */}
        {searchQuery &&
          filteredRoadmaps.roles.length === 0 &&
          filteredRoadmaps.skills.length === 0 &&
          Object.keys(filteredRoadmaps.skillsByTier).length === 0 && (
            <motion.div
              variants={noResultsVariants}
              initial="hidden"
              animate="visible"
              className={`text-center py-16 rounded-2xl ${
                state.darkMode
                  ? "bg-dark-bg-secondary"
                  : "bg-light-bg-secondary"
              }`}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3
                className={`text-2xl font-semibold mb-2 ${
                  state.darkMode
                    ? "text-dark-text-primary"
                    : "text-light-text-primary"
                }`}
              >
                No roadmaps found
              </h3>
              <p
                className={`text-lg ${
                  state.darkMode
                    ? "text-dark-text-secondary"
                    : "text-light-text-secondary"
                } max-w-md mx-auto`}
              >
                Try adjusting your search terms or browse our available
                roadmaps.
              </p>
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("all");
                }}
                className="mt-4 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors duration-300"
              >
                Show All Roadmaps
              </motion.button>
            </motion.div>
          )}
        {loading ? (
          <div className="flex justify-center items-center py-20 h-[70vh]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <>
            {/* Enhanced Role-based Roadmaps */}
            {(activeFilter === "all" || activeFilter === "roles") &&
              filteredRoadmaps.roles.length > 0 && (
                <motion.section
                  variants={rolesSectionVariants}
                  initial="hidden"
                  animate="visible"
                  className="mb-24"
                >
                  <motion.div
                    variants={sectionHeaderVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.3 }}
                    className="flex items-center justify-center mb-12"
                  >
                    <div
                      className={`h-px flex-1 ${
                        state.darkMode ? "bg-dark-border" : "bg-light-border"
                      }`}
                    ></div>
                    <h2
                      className={`text-2xl sm:text-3xl md:text-4xl font-righteous tracking-wider px-4 sm:px-8 ${
                        state.darkMode
                          ? "text-dark-text-primary"
                          : "text-light-text-primary"
                      }`}
                    >
                      Role Based Roadmaps
                      {searchQuery && (
                        <span
                          className={`ml-2 text-base font-normal ${
                            state.darkMode
                              ? "text-dark-text-secondary"
                              : "text-light-text-secondary"
                          }`}
                        >
                          ({filteredRoadmaps.roles.length})
                        </span>
                      )}
                    </h2>
                    <div
                      className={`h-px flex-1 ${
                        state.darkMode ? "bg-dark-border" : "bg-light-border"
                      }`}
                    ></div>
                  </motion.div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.4 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
                  >
                    {filteredRoadmaps.roles.map((item, index) => (
                      <motion.div
                        key={`role-${item.name}-${index}`}
                        variants={cardVariants}
                        whileHover="hover"
                        className={`group relative p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg flex flex-col justify-between min-h-[200px] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 backdrop-blur-xl ${
                          state.darkMode
                            ? "border border-dark-border hover:border-primary/50"
                            : "bg-light-bg-secondary border border-light-border hover:border-primary/50"
                        } transition-all duration-300 overflow-hidden`}
                      >
                        {/* Bookmark Button */}
                        <button
                          onClick={() => toggleBookmark(item)}
                          className={`absolute top-4 right-4 z-20 text-primary hover:text-primary-dark ${
                            bookmarkSaving[(item.name || "").toLowerCase()]
                              ? "opacity-60 cursor-not-allowed hover:text-primary"
                              : ""
                          }`}
                          aria-busy={
                            bookmarkSaving[(item.name || "").toLowerCase()]
                          }
                          disabled={
                            !!bookmarkSaving[(item.name || "").toLowerCase()]
                          }
                        >
                          {bookmarkSaving[(item.name || "").toLowerCase()] ? (
                            <svg
                              className="animate-spin h-5 w-5 text-current"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              ></path>
                            </svg>
                          ) : bookmarks.some(
                              (b) =>
                                b &&
                                b.name &&
                                item.name &&
                                b.name.toLowerCase() === item.name.toLowerCase()
                            ) ? (
                            <FaBookmark size={22} />
                          ) : (
                            <FaRegBookmark size={22} />
                          )}
                        </button>

                        {/* Animated border on right and bottom */}
                        <motion.div
                          className="absolute top-0 right-0 w-0 h-full bg-primary rounded-r-2xl"
                          whileHover={{
                            width: "3px",
                            transition: { duration: 0.3, ease: "easeOut" },
                          }}
                        />
                        <motion.div
                          className="absolute bottom-0 left-0 w-full h-0 bg-primary rounded-b-2xl"
                          whileHover={{
                            height: "3px",
                            transition: {
                              duration: 0.3,
                              ease: "easeOut",
                              delay: 0.05,
                            },
                          }}
                        />

                        {/* Role icon with enhanced animation */}
                        <motion.div
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg mb-4 flex items-center justify-center ${
                            state.darkMode
                              ? "bg-dark-bg-primary"
                              : "bg-light-bg-primary"
                          }`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <span className="text-3xl sm:text-4xl flex items-center justify-center">
                            {skillIcons[item.name] || item.icon || "⚡"}
                          </span>
                        </motion.div>

                        <div className="flex-1 relative z-10">
                          <h3
                            className={`text-lg sm:text-xl lg:text-2xl font-semibold mb-3 leading-tight ${
                              state.darkMode
                                ? "text-dark-text-primary"
                                : "text-light-text-primary"
                            } group-hover:text-primary transition-colors duration-300`}
                          >
                            {item.name || "Untitled Roadmap"}
                          </h3>
                          <p
                            className={`text-sm ${
                              state.darkMode
                                ? "text-dark-text-secondary"
                                : "text-light-text-secondary"
                            } mb-6`}
                          >
                            {getDescription(item.name, item.type)}
                          </p>
                        </div>

                        <motion.a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          variants={buttonVariants}
                          initial="initial"
                          whileHover="hover"
                          whileTap="tap"
                           className="text-white flex items-center justify-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2"
                        >
                          Explore Path
                          <motion.svg
                            variants={iconVariants}
                            className="ml-2 w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </motion.svg>
                        </motion.a>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.section>
              )}

            {/* Enhanced Skill-based Roadmaps - show as tiers */}
            {(activeFilter === "all" || activeFilter === "skills") &&
              Object.keys(filteredRoadmaps.skillsByTier).length > 0 && (
                <motion.section
                  variants={skillsSectionVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    variants={sectionHeaderVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.9 }}
                    className="flex items-center justify-center mb-12"
                  >
                    <div
                      className={`h-px flex-1 ${
                        state.darkMode ? "bg-dark-border" : "bg-light-border"
                      }`}
                    ></div>
                    <h2
                      className={`text-2xl sm:text-3xl md:text-4xl font-righteous tracking-wider px-4 sm:px-8 ${
                        state.darkMode
                          ? "text-dark-text-primary"
                          : "text-light-text-primary"
                      }`}
                    >
                      Skill Based Roadmaps
                      {searchQuery && (
                        <span
                          className={`ml-2 text-base font-normal ${
                            state.darkMode
                              ? "text-dark-text-secondary"
                              : "text-light-text-secondary"
                          }`}
                        >
                          ({filteredRoadmaps.skills.length})
                        </span>
                      )}
                    </h2>
                    <div
                      className={`h-px flex-1 ${
                        state.darkMode ? "bg-dark-border" : "bg-light-border"
                      }`}
                    ></div>
                  </motion.div>

                  {Object.entries(filteredRoadmaps.skillsByTier).map(
                    ([tierKey, tierSkills]) => {
                      const tierData = LEARNING_TIERS[tierKey] || {
                        name: "Other Skills",
                        icon: "📚",
                        description: "Additional skills",
                      };

                      return (
                        <div key={tierKey} className="mb-16">
                          <motion.div
                            variants={sectionHeaderVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex items-center justify-center mb-8"
                          >
                            <div
                              className={`h-px flex-1 ${
                                state.darkMode
                                  ? "bg-dark-border"
                                  : "bg-light-border"
                              }`}
                            ></div>
                            <h3
                              className={`text-xl sm:text-2xl md:text-3xl font-righteous tracking-wider px-4 sm:px-6 flex items-center ${
                                state.darkMode
                                  ? "text-dark-text-primary"
                                  : "text-light-text-primary"
                              }`}
                            >
                              <span className="mr-3">{tierData.icon}</span>
                              {tierData.name}
                              <span
                                className={`ml-3 text-sm font-normal ${
                                  state.darkMode
                                    ? "text-dark-text-secondary"
                                    : "text-light-text-secondary"
                                }`}
                              >
                                ({tierSkills.length})
                              </span>
                            </h3>
                            <div
                              className={`h-px flex-1 ${
                                state.darkMode
                                  ? "bg-dark-border"
                                  : "bg-light-border"
                              }`}
                            ></div>
                          </motion.div>

                          <p
                            className={`text-center mb-8 text-base ${
                              state.darkMode
                                ? "text-dark-text-secondary"
                                : "text-light-text-secondary"
                            } max-w-2xl mx-auto`}
                          >
                            {tierData.description}
                          </p>

                          <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
                          >
                            {tierSkills.map((item, index) => (
                              <motion.div
                                key={`tier-${tierKey}-${item.name}-${index}`}
                                variants={cardVariants}
                                whileHover="hover"
                                className={`group relative p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg flex flex-col justify-between min-h-[200px] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 backdrop-blur-xl ${
                                  state.darkMode
                                    ? "border border-dark-border hover:border-primary/50"
                                    : "bg-light-bg-secondary border border-light-border hover:border-primary/50"
                                } transition-all duration-300 overflow-hidden`}
                              >
                                {/* Bookmark Button */}
                                <button
                                  onClick={() => toggleBookmark(item)}
                                  className={`absolute top-4 right-4 z-20 text-primary hover:text-primary-dark ${
                                    bookmarkSaving[
                                      (item.name || "").toLowerCase()
                                    ]
                                      ? "opacity-60 cursor-not-allowed hover:text-primary"
                                      : ""
                                  }`}
                                  aria-busy={
                                    bookmarkSaving[
                                      (item.name || "").toLowerCase()
                                    ]
                                  }
                                  disabled={
                                    !!bookmarkSaving[
                                      (item.name || "").toLowerCase()
                                    ]
                                  }
                                >
                                  {bookmarkSaving[
                                    (item.name || "").toLowerCase()
                                  ] ? (
                                    <svg
                                      className="animate-spin h-5 w-5 text-current"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                      ></path>
                                    </svg>
                                  ) : bookmarks.some(
                                      (b) =>
                                        b &&
                                        b.name &&
                                        item.name &&
                                        b.name.toLowerCase() ===
                                          item.name.toLowerCase()
                                    ) ? (
                                    <FaBookmark size={22} />
                                  ) : (
                                    <FaRegBookmark size={22} />
                                  )}
                                </button>

                                {/* Animated border on right and bottom */}
                                <motion.div
                                  className="absolute top-0 right-0 w-0 h-full bg-primary rounded-r-2xl"
                                  whileHover={{
                                    width: "3px",
                                    transition: {
                                      duration: 0.3,
                                      ease: "easeOut",
                                    },
                                  }}
                                />
                                <motion.div
                                  className="absolute bottom-0 left-0 w-full h-0 bg-primary rounded-b-2xl"
                                  whileHover={{
                                    height: "3px",
                                    transition: {
                                      duration: 0.3,
                                      ease: "easeOut",
                                      delay: 0.05,
                                    },
                                  }}
                                />

                                {/* Skill icon with enhanced animation */}
                                <motion.div
                                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg mb-4 flex items-center justify-center ${
                                    state.darkMode
                                      ? "bg-dark-bg-primary"
                                      : "bg-light-bg-primary"
                                  }`}
                                  whileHover={{ rotate: 360 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  <span className="text-3xl sm:text-4xl flex items-center justify-center">
                                    {skillIcons[item.name] || item.icon || "⚡"}
                                  </span>
                                </motion.div>

                                <div className="flex-1 relative z-10">
                                  <h3
                                    className={`text-lg sm:text-xl lg:text-2xl font-semibold mb-3 leading-tight ${
                                      state.darkMode
                                        ? "text-dark-text-primary"
                                        : "text-light-text-primary"
                                    } group-hover:text-primary transition-colors duration-300`}
                                  >
                                    {item.name || "Untitled Roadmap"}
                                  </h3>
                                  <p
                                    className={`text-sm ${
                                      state.darkMode
                                        ? "text-dark-text-secondary"
                                        : "text-light-text-secondary"
                                    } mb-6`}
                                  >
                                    {getDescription(item.name, item.type)}
                                  </p>
                                </div>


                                  <motion.a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variants={buttonVariants}
                                    initial="initial"
                                    whileHover="hover"
                                    whileTap="tap"
                                    className="text-white flex items-center justify-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2"
                                  >
                                    Explore Path
                                    <motion.svg
                                      variants={iconVariants}
                                      className="ml-2 w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                      />
                                    </motion.svg>
                                  </motion.a>


                              </motion.div>
                            ))}
                          </motion.div>
                        </div>
                      );
                    }
                  )}
                </motion.section>
              )}
          </>
        )}

        {/* Call to Action Section - Only show when not searching or when search has results */}
        {(!searchQuery ||
          filteredRoadmaps.roles.length > 0 ||
          filteredRoadmaps.skills.length > 0) && (
          <motion.section
            variants={ctaSectionVariants}
            initial="hidden"
            animate="visible"
            className={`mt-24 text-center p-8 sm:p-12 rounded-3xl ${
              state.darkMode
                ? "bg-gradient-to-r from-dark-bg-secondary to-dark-bg-secondary border border-dark-border"
                : "bg-gradient-to-r from-light-bg-secondary to-light-bg-secondary border border-light-border"
            }`}
          >
            <h3
              className={`text-xl sm:text-2xl md:text-3xl font-righteous mb-4 ${
                state.darkMode
                  ? "text-dark-text-primary"
                  : "text-light-text-primary"
              }`}
            >
              Ready to Start Your Learning Journey?
            </h3>
            <p
              className={`text-base sm:text-lg ${
                state.darkMode
                  ? "text-dark-text-secondary"
                  : "text-light-text-secondary"
              } max-w-2xl mx-auto`}
            >
              Choose a roadmap that aligns with your career goals and start
              building the skills that will define your future in tech.
            </p>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default Roadmap;
