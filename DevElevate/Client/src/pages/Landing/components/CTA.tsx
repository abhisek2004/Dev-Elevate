/* CommunityAndCTA.jsx */
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
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";

const socials = [
  {
    name: "Reddit",
    icon: <FaReddit className="w-6 h-6" />,
    url: "https://www.reddit.com/r/DevElevate",
    description:
      "Join our Reddit community to share ideas, ask questions, and connect with others – free forever!",
    gradient: "from-orange-500 via-orange-600 to-orange-700",
  },
  {
    name: "Discord",
    icon: <FaDiscord className="w-6 h-6" />,
    url: "https://discord.gg/KwVy6twN",
    description:
      "Join our Discord server to connect with the DevElevate community",
    gradient: "from-indigo-500 via-purple-600 to-purple-700",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin className="w-6 h-6" />,
    url: "https://www.linkedin.com/in/abhisekpanda2004/",
    description:
      "Connect with Abhisek Panda professionally and expand your network with DevElevate",
    gradient: "from-blue-700 via-blue-800 to-blue-900",
  },
];

const cardVariant = {
  hidden: { y: 15, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const iconVariant = {
  hover: { scale: 1.2, rotate: [0, 15, -15, 0] },
  float: { y: [0, -5, 0], transition: { repeat: Infinity, duration: 2 } },
};

/* ---------- HIGH-QUALITY LOGOS (official SVGs) ---------- */
const partners = [
  // Indian
  { name: "Airtel", logo: "https://cdn.bitrefill.com/content/cn/b_rgb%3AFFFFFF%2Cc_pad%2Ch_720%2Cw_1280/v1557745925/airtel.webp" },
  { name: "Reliance Jio", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSohZW0W9TJymIUxUO7wDwLLWzxdugPz5FiRw&s" },
  { name: "Infosys", logo: "https://mma.prnewswire.com/media/633365/5460444/Infosys_Logo.jpg?p=facebook" },
  { name: "Wipro", logo: "https://mms.businesswire.com/media/20200528005916/en/594194/4/Wiprologo1.jpg" },
  { name: "HCL", logo: "https://pathfinderstraining.com/wp-content/uploads/2022/10/HCLTech-logo.png" },
  { name: "TCS", logo: "https://pathfinderstraining.com/wp-content/uploads/2022/10/TCS_Logo.jpg" },
  { name: "Mahindra", logo: "https://images.seeklogo.com/logo-png/61/1/mahindra-auto-logo-png_seeklogo-613492.png" },
  { name: "Adani", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Adani_2012_logo.png" },
  { name: "Paytm", logo: "https://play-lh.googleusercontent.com/vYnuetu-oxu95vRuQWokFveq7f_Qn3Pf-eGCfclgBTO9f4qwABZl4XrCA40YIolOb1SkynCto2drVd6wwnVl" },
  { name: "Flipkart", logo: "https://yt3.googleusercontent.com/V5SG8qholmM1Gyxapc3wLUniFKEnaQnbgACfR4ujMjfZsnRk92i9WHEwuhWJI51oJPpVq3rVRQ=s900-c-k-c0x00ffffff-no-rj" },
  { name: "Swiggy", logo: "https://bsmedia.business-standard.com/_media/bs/img/article/2023-07/17/full/1689574606-2001.png" },
  { name: "Zomato", logo: "https://play-lh.googleusercontent.com/Zqv3j3gWCWrxuHW1VkRKNWso3beRsrwPCj58kG_Ile6iGGSf1YfkPYhKExXKY7_L0lU" },

  // Global Tech
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Meta", logo: "https://mma.prnewswire.com/media/1673006/Meta_Logo.jpg?p=facebook" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
  { name: "Samsung", logo: "https://images.samsung.com/is/image/samsung/assets/us/about-us/brand/logo/mo/360_197_1.png?$720_N_PNG$" },
  { name: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg" },

  // Global Non-Tech
  { name: "Coca-Cola", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg" },
  { name: "Pepsi", logo: "https://upload.wikimedia.org/wikipedia/commons/6/68/Pepsi_2023.svg" },
  { name: "Nike", logo: "https://media.about.nike.com/image-downloads/cf68f541-fc92-4373-91cb-086ae0fe2f88/002-nike-logos-swoosh-white.jpg" },
  { name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
  { name: "Toyota", logo: "https://cdn.mos.cms.futurecdn.net/wVmECNmaJchCfoNNDegSnE.jpg" },
  { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png" },
  { name: "Uber", logo: "https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" },
  { name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { name: "Disney", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/1200px-Disney%2B_logo.svg.png" },
  { name: "JioHotstar", logo: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202502/jiohotstar-launched-140046549-16x9_0.png?VersionId=0U7rFe.vOOUpofc.p7pkcG1sPwFy_khw" },
];

const CommunityAndCTA = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("show");
  }, [controls]);

  /* ---------- EMBLA CAROUSEL (auto-scroll) ---------- */
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      slidesToScroll: 3,
      dragFree: false,
      containScroll: "trimSnaps",
    },
    [
      AutoPlay({
        delay: 1500,               // 1.5 s per step
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true,
      }),
    ]
  );

  return (
    <>
      {/* ---------- Tailwind blob animation (add to globals.css or <style> tag) ---------- */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25%      { transform: translate(30px, -30px) rotate(5deg); }
          50%      { transform: translate(-20px, 20px) rotate(-5deg); }
          75%      { transform: translate(20px, 30px) rotate(3deg); }
        }
        .animate-blob {
          animation: blob 12s infinite;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      <div className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-3xl animate-blob top-10 left-10"></div>
          <div className="absolute bg-purple-500 rounded-full w-60 h-60 opacity-20 blur-3xl animate-blob animation-delay-2000 top-1/2 right-20"></div>
          <div className="absolute w-32 h-32 bg-pink-500 rounded-full opacity-20 blur-3xl animate-blob animation-delay-4000 bottom-20 left-1/3"></div>
        </div>

        <div className="relative z-10 px-4 mx-auto text-center max-w-7xl">
          {/* Heading */}
          <motion.h2
            variants={cardVariant}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8 text-4xl font-extrabold text-gray-100 sm:text-5xl lg:text-6xl"
          >
            <span className="block mb-2">Connect, collaborate, and</span>
            <span className="block leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400">
              grow with DevElevate.
            </span>
          </motion.h2>

          <motion.p
            variants={cardVariant}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="max-w-2xl mx-auto mb-12 text-lg text-gray-400"
          >
            Join our community of developers, share best practices, and get support for your learning journey with DevElevate.
          </motion.p>

          {/* Social Cards */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {socials.map((social, idx) => (
              <motion.div
                key={idx}
                variants={cardVariant}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className="w-full sm:w-80"
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full overflow-hidden transition-all duration-300 border bg-white/5 backdrop-blur-md rounded-2xl border-gray-700/50 hover:shadow-xl hover:shadow-purple-500/10"
                >
                  <div className={`h-2 w-full bg-gradient-to-r ${social.gradient}`}></div>

                  <div className="flex flex-col h-full p-6">
                    <div className="flex items-center mb-4">
                      <motion.div
                        className={`p-3 rounded-lg bg-gradient-to-r ${social.gradient} text-white shadow-lg`}
                        variants={iconVariant}
                        animate="float"
                        whileHover="hover"
                        transition={{ duration: 0.6 }}
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
                      className="flex items-center justify-center"
                      initial={{ width: "auto" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    >
                      <span
                        className={`text-sm font-medium text-white px-5 py-2.5 rounded-lg bg-gradient-to-r ${social.gradient} flex items-center space-x-2 shadow-md`}
                      >
                        <span>Join now</span>
                        <motion.span
                          initial={{ x: -5, opacity: 0 }}
                          whileHover={{ x: 5, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <FaArrowRight className="w-4 h-4" />
                        </motion.span>
                      </span>
                    </motion.div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>

          {/* ---------- Partner Carousel ---------- */}
          <motion.div
            variants={cardVariant}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <h3 className="mb-10 text-3xl font-bold text-white sm:text-4xl">
              Global Industry Leaders
            </h3>

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex items-center gap-8 py-4 md:gap-12">
                {/* Duplicate twice for seamless infinite loop */}
                {[...partners, ...partners, ...partners].map((partner, idx) => (
                  <div
                    key={`${partner.name}-${idx}`}
                    className="flex items-center justify-center flex-none w-40 md:w-52"
                  >
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      width={180}
                      height={60}
                      className="object-contain w-auto h-16 max-w-full transition-opacity duration-300 opacity-80 hover:opacity-100"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = `https://via.placeholder.com/180x60/1a1a1a/ffffff?text=${partner.name}`;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Call-to-Action */}
          <motion.div
            className="max-w-5xl p-8 mx-auto text-center border sm:p-12 bg-gradient-to-r from-indigo-900/30 via-purple-900/20 to-blue-900/30 rounded-2xl backdrop-blur-sm border-white/10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <h3 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
              Ready to transform your tech career?
            </h3>
            <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-300">
              Join 100+ developers who are already learning, growing, and landing their dream jobs with DevElevate's AI-powered platform.
            </p>

            <div className="flex flex-col justify-center gap-4 mb-8 sm:flex-row">
              <Link to="/dashboard">
                <button className="flex items-center justify-center px-10 py-4 space-x-2 font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:shadow-2xl hover:shadow-purple-600/30 hover:scale-105">
                  <span>Start Learning Free</span>
                  <FaArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>

              <a
                href="mailto:officialdevelevate@gmail.com?subject=Book%20a%20Demo"
                className="px-10 py-4 font-semibold text-white transition-all duration-300 border border-white/20 rounded-xl backdrop-blur-sm bg-white/5 hover:bg-white/10"
              >
                Book a Demo
              </a>
            </div>

            <div className="flex flex-col items-center justify-center gap-6 text-sm text-gray-400 sm:flex-row">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Free 7-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CommunityAndCTA;