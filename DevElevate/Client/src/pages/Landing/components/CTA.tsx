import { motion } from "framer-motion";
import { useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaReddit, FaDiscord, FaLinkedin, FaArrowRight } from "react-icons/fa";

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
    url: "https://discord.gg/KwVy6twN",
    description:
      "Join our Discord server to connect with the DevElevate community",
    gradient: "from-indigo-500 via-purple-600 to-purple-700",
    color: "purple",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin />,
    url: "https://www.linkedin.com/in/abhisekpanda2004/",
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

const carouselItemVariant = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const CommunityAndCTA = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("show");
  }, [controls]);

  const partners = [
    // Indian Giants
    { name: "Airtel", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSC8tqzBDhMSRsQZ8ycU1wQeQa1-DoQ0qCjg&s" },
    { name: "Reliance Jio", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyub4CadbVak-YIyrxTmdy9U6SIhp9OoweZA&s" },
    { name: "Infosys", logo: "https://w7.pngwing.com/pngs/687/655/png-transparent-infosys-logo.png" },
    { name: "Wipro", logo: "https://img.favpng.com/13/17/18/wipro-logo-business-corporate-identity-png-favpng-eGvB3nN9rMdh7TDjzLy78qU2g.jpg" },
    { name: "HCL", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVNtV2iThrPsfWZH823aqupNL6zv0Fbdgsig&s" },
    { name: "TCS", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUQYyB3NYIta5BP3c7xDbqeyjU0Z73TSKPnA&s" },
    { name: "Mahindra", logo: "https://icon2.cleanpng.com/lnd/20250107/xo/9f7736f387374af567bc3cb51a88c4.webp" },
    { name: "Adani", logo: "https://www.vhv.rs/dpng/d/560-5604430_adani-logo-transparent-hd-png-download.png" },
    { name: "Paytm", logo: "https://www.citypng.com/public/uploads/preview/hd-paytm-logo-transparent-background-701751694706616oo59sshkej.png" },
    { name: "Flipkart", logo: "https://cdn.freebiesupply.com/logos/large/2x/flipkart-logo-png-transparent.png" },
    { name: "Swiggy", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Swiggy_Logo_2024.webp" },
    { name: "Zomato", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Zomato_Logo.svg/1200px-Zomato_Logo.svg.png" },
    // Global Tech Giants
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Logo.png" },
    { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
    { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
    { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
    { name: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg" },
    // Global Non-Tech MNCs
    { name: "Coca-Cola", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg" },
    { name: "Pepsi", logo: "https://upload.wikimedia.org/wikipedia/commons/6/68/Pepsi_2023.svg" },
    { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Nike_Swoosh_Logo_Black.svg" },
    { name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
    { name: "Toyota", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Toyota_Logo.svg" },
    { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png" },
    { name: "Uber", logo: "https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" },
    { name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" },
    { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { name: "Disney", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Disney_Logo.svg" },
  ];

  return (
    <div className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .carousel-container {
            position: relative;
            overflow: hidden;
            width: 100%;
          }
          .carousel-track {
            display: flex;
            animation: scroll 60s linear infinite;
            width: calc(200% + 1rem); /* Double the width for seamless looping */
          }
          .carousel-track:hover {
            animation-play-state: paused; /* Pause on hover */
          }
        `}
      </style>

      {/* Floating shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-3xl animate-blob top-10 left-10"></div>
        <div className="absolute bg-purple-500 rounded-full w-60 h-60 opacity-20 blur-3xl animate-blob animation-delay-2000 top-1/2 right-20"></div>
        <div className="absolute w-32 h-32 bg-pink-500 rounded-full opacity-20 blur-3xl animate-blob animation-delay-4000 bottom-20 left-1/3"></div>
      </div>

      <div className="relative z-10 max-w-6xl px-4 mx-auto text-center">
        {/* Heading */}
        <motion.h2
          variants={cardVariant}
          initial="hidden"
          animate="show"
          className="mb-8 text-4xl font-extrabold text-gray-100 sm:text-5xl"
        >
          <span className="block mb-2">Connect, collaborate, and</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400">
            grow with DevElevate.
          </span>
        </motion.h2>
        <motion.p
          variants={cardVariant}
          className="max-w-2xl mx-auto mb-12 text-lg text-gray-400"
        >
          Join our community of developers, share best practices, and get
          support for your learning journey with DevElevate.
        </motion.p>

        {/* Social Cards */}
        <div data-aos="fade-up" data-aos-delay="180" className="flex flex-wrap justify-center gap-6 mb-16">
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
                className="block h-full overflow-hidden border bg-white/10 dark:bg-gray-800/50 rounded-2xl border-gray-700/50 backdrop-blur-md group"
              >
                <div
                  className={`h-2 w-full bg-gradient-to-r ${social.gradient}`}
                ></div>

                <div className="flex flex-col h-full p-6">
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

        {/* Partner Carousel */}
        <motion.div
          className="mb-16"
          variants={cardVariant}
          initial="hidden"
          animate="show"
        >
          <h3 className="mb-6 text-2xl font-bold text-white">🌐 Global Industry Leaders</h3>
          <div className="carousel-container" data-slot="carousel-content">
            <div className="flex gap-4 -ml-4 carousel-track">
              {partners.map((partner, idx) => (
                <motion.div
                  key={idx}
                  role="group"
                  aria-roledescription="slide"
                  data-slot="carousel-item"
                  className="min-w-0 pl-4 shrink-0 grow-0 basis-1/2 sm:basis-1/3 md:basis-1/5 lg:basis-1/6"
                  aria-label={`Partner: ${partner.name}`}
                  variants={carouselItemVariant}
                >
                  <div className="p-2 border rounded-lg bg-white/10 border-gray-700/50 backdrop-blur-sm">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="object-contain w-auto h-10"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/100x40?text=Logo";
                      }}
                    />
                  </div>
                </motion.div>
              ))}
              {/* Duplicate items for seamless looping */}
              {partners.map((partner, idx) => (
                <motion.div
                  key={`duplicate-${idx}`}
                  role="group"
                  aria-roledescription="slide"
                  data-slot="carousel-item"
                  className="min-w-0 pl-4 shrink-0 grow-0 basis-1/2 sm:basis-1/3 md:basis-1/5 lg:basis-1/6"
                  aria-label={`Partner: ${partner.name}`}
                  variants={carouselItemVariant}
                >
                  <div className="inline-flex items-center justify-center border-[0.5px] rounded-md bg-white/10 border-gray-700/50 backdrop-blur-sm">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="object-contain w-auto h-10"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/100x40?text=Logo";
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call-to-Action */}
        <motion.div
          className="max-w-5xl p-8 mx-4 text-center bg-gradient-to-r rounded-2xl backdrop-blur-sm from-indigo-900/30 to-blue-900/30 sm:p-12 sm:mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <h3 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
            Ready to transform your tech career?
          </h3>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-400">
            Join 100+ developers who are already learning, growing, and
            landing their dream jobs with DevElevate's AI-powered platform.
          </p>
          <div className="flex flex-col justify-center gap-4 mb-8 sm:flex-row">
            <Link to="/dashboard">
              <button className="flex items-center justify-center px-12 py-4 space-x-2 font-semibold text-white transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl group hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105">
                <span>Start Learning Free</span>
                <FaArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Link>
            <a
              href="mailto:officialdevelevate@gmail.com?subject=Book%20a%20Demo"
              className="px-12 py-4 font-semibold text-white transition-all duration-300 border rounded-xl backdrop-blur-sm bg-white/10 border-white/10 hover:bg-white/10"
            >
              Book a Demo
            </a>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 text-sm text-gray-400 sm:flex-row sm:space-y-0 sm:space-x-8">
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
