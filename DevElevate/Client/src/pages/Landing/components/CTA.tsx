import { motion } from "framer-motion";
import { useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaReddit, FaDiscord, FaLinkedin, FaArrowRight } from "react-icons/fa";
import { ArrowRight, Sparkles } from "lucide-react";

const socials = [
  {
    name: "Reddit",
    icon: <FaReddit />,
    url: "https://www.reddit.com/r/DevElevate",
    description:
      "Join our Reddit community to share ideas, ask questions, and connect with others – free forever!",
    gradient: "from-orange-500 via-orange-600 to-orange-700",
    color: "orange",
  },
  {
    name: "Discord",
    icon: <FaDiscord />,
    url: "https://discord.gg/KwVy6twN", // Placeholder, update with actual Discord link
    description:
      "Join our Discord server to connect with the DevElevate community",
    gradient: "from-indigo-500 via-purple-600 to-purple-700",
    color: "purple",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin />,
    url: "https://www.linkedin.com/in/abhisekpanda2004/", // Updated to Abhisek Panda's LinkedIn
    description:
      "Connect with Abhisek Panda professionally and expand your network with DevElevate",
    gradient: "from-blue-700 via-blue-800 to-blue-900",
    color: "blue",
  },
];

const cardVariant = {
  hidden: { y: 15, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const iconVariant = {
  hover: {
    scale: 1.2,
    rotate: [0, 15, -15, 0],
    transition: { duration: 0.6 },
  },
  float: {
    y: [0, -5, 0],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

const cardHoverVariant = {
  rest: {
    scale: 1,
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  hover: {
    scale: 1.03,
    y: -5,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const buttonHoverVariant = {
  rest: {
    width: "auto",
  },
  hover: {
    width: "100%",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const CommunityAndCTA = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("show");
  }, [controls]);

  return (
    <div className="relative overflow-hidden py-24 bg-gradient-to-b from-gray-900 to-black min-h-screen">
      {/* Floating shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-40 h-40 bg-blue-500 opacity-20 rounded-full blur-3xl animate-blob top-10 left-10"></div>
        <div className="absolute w-60 h-60 bg-purple-500 opacity-20 rounded-full blur-3xl animate-blob animation-delay-2000 top-1/2 right-20"></div>
        <div className="absolute w-32 h-32 bg-pink-500 opacity-20 rounded-full blur-3xl animate-blob animation-delay-4000 bottom-20 left-1/3"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 text-center z-10">
        {/* Heading */}
        <motion.h2
          variants={cardVariant}
          initial="hidden"
          animate="show"
          className="mb-8 text-4xl font-extrabold sm:text-5xl text-gray-100"
        >
          <span className="block mb-2">Connect, collaborate, and</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400">
            grow with DevElevate.
          </span>
        </motion.h2>
        <motion.p
          variants={cardVariant}
          className="mx-auto mb-12 max-w-2xl text-lg text-gray-400"
        >
          Join our community of developers, share best practices, and get
          support for your learning journey with DevElevate.
        </motion.p>

        {/* Social Cards */}
        <div className="flex flex-wrap gap-6 justify-center mb-16">
          {socials.map((social, idx) => (
            <motion.div
              key={idx}
              variants={cardVariant}
              whileHover="hover"
              className="w-80"
            >
              <motion.a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden h-full bg-white/10 dark:bg-gray-800/50 rounded-2xl border border-gray-700/50 backdrop-blur-md group"
              >
                <div
                  className={`h-2 w-full bg-gradient-to-r ${social.gradient}`}
                ></div>

                <div className="flex flex-col p-6 h-full">
                  <div className="flex items-center mb-4">
                    <motion.div
                      className={`p-3 rounded-lg bg-gradient-to-r ${social.gradient} text-white`}
                      variants={iconVariant}
                      animate="float"
                      whileHover="hover"
                    >
                      {social.icon}
                    </motion.div>
                    <span className="ml-3 text-xl font-semibold text-white">
                      {social.name}
                    </span>
                  </div>
                  <p className="flex-grow mb-6 text-left text-gray-300">
                    {social.description}
                  </p>

                  <motion.div
                    className="flex items-center"
                    variants={buttonHoverVariant}
                  >
                    <span
                      className={`text-sm font-medium text-white px-4 py-2 rounded-lg bg-gradient-to-r ${social.gradient} flex items-center justify-center`}
                    >
                      Join now
                      <motion.span
                        initial={{ x: 0, opacity: 0 }}
                        whileHover={{
                          x: 5,
                          opacity: 1,
                          transition: { delay: 0.1 },
                        }}
                        className="ml-2"
                      >
                        <FaArrowRight />
                      </motion.span>
                    </span>
                  </motion.div>
                </div>
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Call-to-Action */}
        <motion.div
          className="p-8 mx-4 max-w-5xl text-center bg-gradient-to-r rounded-2xl backdrop-blur-sm from-indigo-900/30 to-blue-900/30 sm:p-12 sm:mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <h3 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
            Ready to transform your tech career?
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-400">
            Join 50,000+ developers who are already learning, growing, and
            landing their dream jobs with DevElevate's AI-powered platform.
          </p>
          <div className="flex flex-col gap-4 justify-center mb-8 sm:flex-row">
            <Link to="/dashboard">
              <button className="flex justify-center items-center px-12 py-4 space-x-2 font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl transition-all duration-300 transform group hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105">
                <span>Start Learning Free</span>
                <FaArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Link>
            <a
              href="mailto:officialdevelevate@gmail.com?subject=Book%20a%20Demo"
              className="px-12 py-4 font-semibold text-white rounded-xl border backdrop-blur-sm transition-all duration-300 bg-white/5 border-white/10 hover:bg-white/10"
            >
              Book a Demo
            </a>
          </div>
          <div className="flex flex-col justify-center items-center space-y-4 text-sm text-gray-400 sm:flex-row sm:space-y-0 sm:space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Free 7-day trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Cancel anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityAndCTA;
