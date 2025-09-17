import { motion } from "framer-motion";
import { useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaReddit,
  FaDiscord,
  FaLinkedin,
  FaArrowRight,
} from "react-icons/fa";
import { ArrowRight, Sparkles } from "lucide-react";

const socials = [
  {
    name: "Reddit",
    icon: <FaReddit />,
    url: "https://www.reddit.com/r/DevElevate",
    description: "Join our Reddit community to share ideas, ask questions, and connect with others – free forever!",
    gradient: "from-orange-500 via-orange-600 to-orange-700",
    color: "orange",
  },
  {
    name: "Discord",
    icon: <FaDiscord />,
    url: "https://discord.gg/KwVy6twN", // Placeholder, update with actual Discord link
    description: "Join our Discord server to connect with the DevElevate community",
    gradient: "from-indigo-500 via-purple-600 to-purple-700",
    color: "purple",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin />,
    url: "https://www.linkedin.com/in/abhisekpanda2004/", // Updated to Abhisek Panda's LinkedIn
    description: "Connect with Abhisek Panda professionally and expand your network with DevElevate",
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
    <div>
      {/* Community Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="px-4 mx-auto max-w-6xl text-center">
          <motion.h2
            variants={cardVariant}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl dark:text-gray-100"
          >
            <span className="block mb-2">Connect, collaborate, and</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-500 to-blue-500 dark:from-indigo-400 dark:via-purple-400 dark:to-blue-400">
              grow with DevElevate.
            </span>
          </motion.h2>

          <motion.p
            variants={cardVariant}
            className="mx-auto mb-12 max-w-2xl text-lg text-gray-600 dark:text-gray-400"
          >
            Join our community of developers, share best practices, and get support for your learning journey with DevElevate.
          </motion.p>

          <div className="flex flex-col flex-wrap gap-6 justify-center mb-16 sm:flex-row">
            {socials.map((social) => (
              <motion.div
                key={social.name}
                className="w-80"
                variants={cardVariant}
                initial="hidden"
                animate="show"
                whileHover="hover"
              >
                <motion.a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden h-full bg-white rounded-2xl border border-gray-200 group dark:bg-gray-800 dark:border-gray-700"
                  variants={cardHoverVariant}
                  initial="rest"
                  whileHover="hover"
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
                      <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {social.name}
                      </span>
                    </div>

                    <p className="flex-grow mb-6 text-left text-gray-600 dark:text-gray-400">
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
        </div>

        <motion.div
          className="p-8 mx-4 max-w-5xl text-center bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl dark:from-gray-700/50 dark:to-gray-800/50 sm:p-12 sm:mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.4,
              },
            },
          }}
        >
          <h3 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-100">
            Ready to transform your tech career?
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Join 50,000+ developers who are already learning, growing, and landing their dream jobs with DevElevate's AI-powered platform.
          </p>
          <div className="flex flex-col gap-4 justify-center mb-8 sm:flex-row">
            <Link to="/dashboard">
              <button className="flex justify-center items-center px-12 py-4 space-x-2 font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl transition-all duration-300 transform group hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105">
                <span>Start Learning Free</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Link>
            <a
              href="mailto:officialdevelevate@gmail.com?subject=Book%20a%20Demo&body=Hi%20Team,%0AI%20would%20like%20to%20book%20a%20demo."
              className="px-12 py-4 font-semibold text-white rounded-xl border backdrop-blur-sm transition-all duration-300 bg-white/5 border-white/10 hover:bg-white/10"
            >
              Book a Demo
            </a>
          </div>
          <div className="flex flex-col justify-center items-center space-y-4 text-sm text-gray-500 sm:flex-row sm:space-y-0 sm:space-x-8">
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
      </section>
    </div>
  );
};

export default CommunityAndCTA;