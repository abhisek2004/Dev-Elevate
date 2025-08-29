import express from "express";
import { readRateLimit } from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

// Mock placement data - in production, this would come from database
const placementData = {
  stats: {
    totalHires: 2847,
    successRate: 94.5,
    hiringPartners: 150,
    averageSalary: "₹12.5 LPA",
  },
  alumni: [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Software Engineer",
      company: "Google",
      image:
        "https://ui-avatars.com/api/?name=Priya+Sharma&background=4285f4&color=fff",
      story:
        "DevElevate's placement prep and AI Study Buddy helped me crack Google's coding interviews. The mock interviews were incredibly helpful!",
      year: 2024,
      domain: "Software Development",
      location: "Bangalore",
      salary: "₹28 LPA",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      role: "Data Scientist",
      company: "Microsoft",
      image:
        "https://ui-avatars.com/api/?name=Rahul+Kumar&background=0078d4&color=fff",
      story:
        "The AI/ML learning path and project recommendations were game-changers. Landed my dream role at Microsoft within 6 months!",
      year: 2024,
      domain: "Data Science",
      location: "Hyderabad",
      salary: "₹25 LPA",
    },
    {
      id: 3,
      name: "Anita Patel",
      role: "Full Stack Developer",
      company: "Amazon",
      image:
        "https://ui-avatars.com/api/?name=Anita+Patel&background=ff9900&color=fff",
      story:
        "The MERN stack roadmap and hands-on projects gave me the confidence to ace technical rounds. Thank you DevElevate!",
      year: 2023,
      domain: "Full Stack Development",
      location: "Mumbai",
      salary: "₹22 LPA",
    },
    {
      id: 4,
      name: "Vikash Singh",
      role: "DevOps Engineer",
      company: "Netflix",
      image:
        "https://ui-avatars.com/api/?name=Vikash+Singh&background=e50914&color=fff",
      story:
        "The comprehensive learning resources and placement guidance helped me transition from development to DevOps successfully.",
      year: 2023,
      domain: "DevOps",
      location: "Pune",
      salary: "₹20 LPA",
    },
    {
      id: 5,
      name: "Sneha Reddy",
      role: "Product Manager",
      company: "Flipkart",
      image:
        "https://ui-avatars.com/api/?name=Sneha+Reddy&background=047bd6&color=fff",
      story:
        "DevElevate's interview prep and resume builder were instrumental in helping me land a PM role at Flipkart.",
      year: 2024,
      domain: "Product Management",
      location: "Bangalore",
      salary: "₹18 LPA",
    },
    {
      id: 6,
      name: "Arjun Gupta",
      role: "ML Engineer",
      company: "Uber",
      image:
        "https://ui-avatars.com/api/?name=Arjun+Gupta&background=000000&color=fff",
      story:
        "The AI projects and coding practice helped me build a strong portfolio. Grateful for the journey with DevElevate!",
      year: 2023,
      domain: "Machine Learning",
      location: "Delhi",
      salary: "₹24 LPA",
    },
  ],
  recruiters: [
    {
      id: 1,
      name: "Google",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
      careersLink: "https://careers.google.com",
      hiresCount: 45,
    },
    {
      id: 2,
      name: "Microsoft",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg",
      careersLink: "https://careers.microsoft.com",
      hiresCount: 38,
    },
    {
      id: 3,
      name: "Amazon",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
      careersLink: "https://amazon.jobs",
      hiresCount: 42,
    },
    {
      id: 4,
      name: "Meta",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg",
      careersLink: "https://careers.meta.com",
      hiresCount: 28,
    },
    {
      id: 5,
      name: "Netflix",
      logo: "https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69a9c3bfnbsdaa3/Netflix-Logo.jpg",
      careersLink: "https://jobs.netflix.com",
      hiresCount: 22,
    },
    {
      id: 6,
      name: "Flipkart",
      logo: "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png",
      careersLink: "https://careers.flipkart.com",
      hiresCount: 35,
    },
    {
      id: 7,
      name: "Swiggy",
      logo: "https://logos-world.net/wp-content/uploads/2020/11/Swiggy-Logo.png",
      careersLink: "https://careers.swiggy.com",
      hiresCount: 31,
    },
    {
      id: 8,
      name: "Zomato",
      logo: "https://logos-world.net/wp-content/uploads/2020/11/Zomato-Logo.png",
      careersLink: "https://careers.zomato.com",
      hiresCount: 29,
    },
  ],
};

// Get placement statistics
router.get("/stats", readRateLimit, (req, res) => {
  try {
    res.json({
      success: true,
      data: placementData.stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching placement statistics",
      error: error.message,
    });
  }
});

// Get alumni testimonials with optional filters
router.get("/alumni", readRateLimit, (req, res) => {
  try {
    const { year, domain, location, search } = req.query;
    let filteredAlumni = [...placementData.alumni];

    if (year && year !== "All Years") {
      filteredAlumni = filteredAlumni.filter(
        (alumni) => alumni.year.toString() === year
      );
    }

    if (domain && domain !== "All Domains") {
      filteredAlumni = filteredAlumni.filter(
        (alumni) => alumni.domain === domain
      );
    }

    if (location && location !== "All Locations") {
      filteredAlumni = filteredAlumni.filter(
        (alumni) => alumni.location === location
      );
    }

    if (search) {
      const searchTerm = search.toLowerCase();
      filteredAlumni = filteredAlumni.filter(
        (alumni) =>
          alumni.name.toLowerCase().includes(searchTerm) ||
          alumni.company.toLowerCase().includes(searchTerm) ||
          alumni.role.toLowerCase().includes(searchTerm)
      );
    }

    res.json({
      success: true,
      data: filteredAlumni,
      total: filteredAlumni.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching alumni data",
      error: error.message,
    });
  }
});

// Get top recruiters
router.get("/recruiters", readRateLimit, (req, res) => {
  try {
    res.json({
      success: true,
      data: placementData.recruiters,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching recruiters data",
      error: error.message,
    });
  }
});

// Get all placement data
router.get("/all", readRateLimit, (req, res) => {
  try {
    res.json({
      success: true,
      data: placementData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching placement data",
      error: error.message,
    });
  }
});

export default router;
