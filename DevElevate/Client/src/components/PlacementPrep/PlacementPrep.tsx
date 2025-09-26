import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
import { useGlobalState } from "../../contexts/GlobalContext";
import {
  FileText,
  Download,
  Users,
  Calendar,
  Target,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { Code } from "lucide-react";
import { baseUrl } from "../../config/routes";
const PlacementPrep: React.FC = () => {
  const { state } = useGlobalState();
  // const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("opportunities");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const tabs = [
    { id: "opportunities", label: "Job Opportunities", icon: Users },
    { id: "interviews", label: "Interview Prep", icon: Target },
    { id: "resources", label: "Resources", icon: BookOpen },
    { id: "practice", label: "Practice DSA", icon: Code },
  ];

  const jobOpportunities = [
    {
      company: "Google",
      position: "Software Engineer",
      location: "Mountain View, CA",
      type: "Full-time",
      deadline: "2025-12-31",
      description:
        "Join our team to build products that help create opportunities for everyone. Work on cutting-edge technologies.",
      requirements: [
        "BS/MS in Computer Science",
        "3+ years experience",
        "Strong coding skills",
        "System design experience",
      ],
      salary: "$120,000 - $180,000",
      category: "Product Based",
      applyUrl:
        "https://careers.google.com/jobs/results/?q=software%20engineer",
    },
    {
      company: "Microsoft",
      position: "Software Engineer",
      location: "Redmond, WA",
      type: "Full-time",
      deadline: "2025-11-30",
      description:
        "Build and maintain software solutions for Microsoft products. Work on Azure, Office, and other platforms.",
      requirements: [
        "BS/MS in Computer Science",
        "C#/Java experience",
        "Cloud platforms",
        "Problem-solving skills",
      ],
      salary: "$130,000 - $200,000",
      category: "Product Based",
      applyUrl:
        "https://careers.microsoft.com/us/en/search-results?keywords=software%20engineer",
    },
    {
      company: "Amazon",
      position: "Software Development Engineer",
      location: "Seattle, WA",
      type: "Full-time",
      deadline: "2025-10-31",
      description:
        "Design and build scalable software solutions for Amazon services. Work on AWS, e-commerce, and logistics.",
      requirements: [
        "BS/MS in Computer Science",
        "Java/Python experience",
        "System design",
        "Leadership skills",
      ],
      salary: "$140,000 - $220,000",
      category: "Product Based",
      applyUrl:
        "https://www.amazon.jobs/en/search?base_query=software%20development%20engineer",
    },
    {
      company: "Meta",
      position: "Software Engineer",
      location: "Menlo Park, CA",
      type: "Full-time",
      deadline: "2025-09-30",
      description:
        "Build products that connect billions of people. Work on Facebook, Instagram, WhatsApp, and VR platforms.",
      requirements: [
        "BS/MS in Computer Science",
        "C++/Python experience",
        "Large-scale systems",
        "Innovation mindset",
      ],
      salary: "$150,000 - $250,000",
      category: "Product Based",
      applyUrl: "https://www.metacareers.com/jobs/?q=software%20engineer",
    },
    {
      company: "Netflix",
      position: "Senior Software Engineer",
      location: "Los Gatos, CA",
      type: "Full-time",
      deadline: "2025-08-31",
      description:
        "Build the future of entertainment. Work on streaming platform, recommendation systems, and content delivery.",
      requirements: [
        "5+ years experience",
        "Java/Go expertise",
        "Microservices",
        "High-scale systems",
      ],
      salary: "$180,000 - $300,000",
      category: "Product Based",
      applyUrl: "https://jobs.netflix.com/jobs/search?q=software%20engineer",
    },
    {
      company: "Apple",
      position: "Software Engineer",
      location: "Cupertino, CA",
      type: "Full-time",
      deadline: "2025-11-15",
      description:
        "Create innovative software for iPhone, iPad, Mac, and Apple Watch. Work on iOS, macOS, and developer tools.",
      requirements: [
        "BS/MS in Computer Science",
        "Swift/Objective-C",
        "Apple frameworks",
        "User experience focus",
      ],
      salary: "$140,000 - $220,000",
      category: "Product Based",
      applyUrl: "https://jobs.apple.com/en-us/search?job=software%20engineer",
    },
    {
      company: "OpenAI",
      position: "Research Engineer (Applied)",
      location: "San Francisco, CA",
      type: "Full-time",
      deadline: "2025-12-31",
      description:
        "Build and deploy state-of-the-art AI systems and tooling for real-world use cases.",
      requirements: [
        "BS/MS in CS or equivalent",
        "Python",
        "Machine Learning",
        "Distributed systems",
      ],
      salary: "$180,000 - $300,000",
      category: "Product Based",
      applyUrl: "https://openai.com/careers",
    },
    {
      company: "TCS",
      position: "Software Developer",
      location: "Bangalore, India",
      type: "Full-time",
      deadline: "2025-10-15",
      description:
        "Join our digital transformation initiatives across various industries. Work on enterprise solutions and consulting.",
      requirements: [
        "BE/BTech in any stream",
        "Java/.NET experience",
        "Good communication",
        "Problem-solving skills",
      ],
      salary: "₹3.5 - 7 LPA",
      category: "Mass Recruiter",
      applyUrl: "https://www.tcs.com/careers/india",
    },
    {
      company: "Infosys",
      position: "Systems Engineer",
      location: "Bangalore, India",
      type: "Full-time",
      deadline: "2025-10-31",
      description:
        "Work on digital transformation projects for global clients. Develop and maintain software solutions.",
      requirements: [
        "BE/BTech degree",
        "Programming fundamentals",
        "Database knowledge",
        "Good communication",
      ],
      salary: "₹3.25 - 6.5 LPA",
      category: "Mass Recruiter",
      applyUrl: "https://career.infosys.com/jobdesc/jobdescription",
    },
    {
      company: "Adobe",
      position: "Software Engineer",
      location: "San Jose, CA",
      type: "Full-time",
      deadline: "2025-07-31",
      description:
        "Create innovative software solutions for creative professionals. Work on Photoshop, Illustrator, and Creative Cloud.",
      requirements: [
        "BS/MS in Computer Science",
        "C++/JavaScript experience",
        "Creative software development",
        "User experience focus",
      ],
      salary: "$130,000 - $200,000",
      category: "Product Based",
      applyUrl:
        "https://careers.adobe.com/us/en/search-results?keywords=software%20engineer",
    },
    {
      company: "Salesforce",
      position: "Software Engineer",
      location: "San Francisco, CA",
      type: "Full-time",
      deadline: "2025-09-30",
      description:
        "Build the future of CRM and cloud computing. Work on Salesforce platform and enterprise solutions.",
      requirements: [
        "BS/MS in Computer Science",
        "Java/Apex experience",
        "Cloud platforms",
        "Enterprise software",
      ],
      salary: "$140,000 - $220,000",
      category: "Product Based",
      applyUrl:
        "https://salesforce.wd1.myworkdayjobs.com/en-US/External_Career_Site?q=software%20engineer",
    },
    {
      company: "Oracle",
      position: "Software Engineer",
      location: "Austin, TX",
      type: "Full-time",
      deadline: "2025-10-15",
      description:
        "Develop enterprise software solutions and cloud infrastructure. Work on Oracle Cloud and database technologies.",
      requirements: [
        "BS/MS in Computer Science",
        "Java/Python experience",
        "Database systems",
        "Cloud architecture",
      ],
      salary: "$120,000 - $180,000",
      category: "Product Based",
      applyUrl:
        "https://careers.oracle.com/jobs/#en/sites/jobsearch/jobs?keyword=software%20engineer",
    },
    {
      company: "Intel",
      position: "Software Engineer",
      location: "Santa Clara, CA",
      type: "Full-time",
      deadline: "2025-08-31",
      description:
        "Develop software for Intel processors and hardware. Work on drivers, firmware, and system software.",
      requirements: [
        "BS/MS in Computer Science",
        "C/C++ experience",
        "System programming",
        "Hardware knowledge",
      ],
      salary: "$130,000 - $190,000",
      category: "Product Based",
      applyUrl:
        "https://jobs.intel.com/en/search-jobs?keywords=software%20engineer",
    },
    {
      company: "IBM",
      position: "Software Developer",
      location: "Armonk, NY",
      type: "Full-time",
      deadline: "2025-12-31",
      description:
        "Build enterprise solutions and AI-powered software. Work on IBM Cloud, Watson, and enterprise tools.",
      requirements: [
        "BS/MS in Computer Science",
        "Java/Python experience",
        "Cloud platforms",
        "AI/ML knowledge",
      ],
      salary: "$110,000 - $170,000",
      category: "Product Based",
      applyUrl: "https://careers.ibm.com/job-search/?q=software%20developer",
    },
    {
      company: "Cisco",
      position: "Software Engineer",
      location: "San Jose, CA",
      type: "Full-time",
      deadline: "2025-09-15",
      description:
        "Develop networking software and security solutions. Work on routers, switches, and network infrastructure.",
      requirements: [
        "BS/MS in Computer Science",
        "C/C++ experience",
        "Networking protocols",
        "System programming",
      ],
      salary: "$125,000 - $185,000",
      category: "Product Based",
      applyUrl:
        "https://jobs.cisco.com/jobs/SearchJobs/?keyword=software%20engineer",
    },
    {
      company: "Wipro",
      position: "Software Engineer",
      location: "Bangalore, India",
      type: "Full-time",
      deadline: "2025-10-31",
      description:
        "Work on digital transformation projects and consulting services. Develop enterprise solutions for global clients.",
      requirements: [
        "BE/BTech degree",
        "Java/.NET experience",
        "Good communication",
        "Problem-solving skills",
      ],
      salary: "₹3.2 - 6.8 LPA",
      category: "Mass Recruiter",
      applyUrl: "https://careers.wipro.com/careers-home/jobs",
    },
    {
      company: "Google",
      position: "Software Engineering Intern",
      location: "Bangalore, India",
      type: "Internship",
      deadline: "2025-10-01",
      description:
        "Work with Google engineers on real products. 10-12 week internship program.",
      requirements: [
        "Pursuing BS/MS",
        "Data Structures & Algorithms",
        "Coding in Java/C++/Python",
      ],
      salary: "Competitive stipend",
      category: "Internship",
      applyUrl: "https://careers.google.com/students/",
    },
    {
      company: "Microsoft",
      position: "Software Engineer Intern",
      location: "Hyderabad, India",
      type: "Internship",
      deadline: "2025-09-30",
      description:
        "Join Microsoft for a summer internship and ship production-quality features with a mentor.",
      requirements: [
        "Pursuing BE/BTech/ME/MTech",
        "Solid CS fundamentals",
        "Coding in C#/Java/C++",
      ],
      salary: "Competitive stipend",
      category: "Internship",
      applyUrl: "https://careers.microsoft.com/students/us/en",
    },

    {
      "company": "IndusAI Solutions Ltd.",
      "position": "IndusAI Geek-A-Thon",
      "location": "Online",
      "type": "Hackathon",
      "deadline": "2024-07-24",
      "description": "Participate in IndusAI Geek-A-Thon and showcase your skills in an online coding challenge to win exciting prizes and job opportunities.",
      "requirements": [
        "Engineering Students",
        "MBA Students",
        "Undergraduate",
        "Postgraduate"
      ],
      "prize": "₹50,000 (Winner), ₹30,000 (First Runner Up), ₹15,000 (Second Runner Up), ₹5,000 (Third Runner Up)",
      "category": "Coding Challenge",
      "applyUrl": "https://unstop.com/hackathons/indusai-geek-a-thon-indusai-solutions-ltd-1066739"
    },
    {
      "company": "Shri Madhwa Vadiraja Institute of Technology and Management (SMVITM)",
      "position": "Hackothsava - 2k24",
      "location": "Shankarapura, Karnataka",
      "type": "Hackathon",
      "deadline": "2024-07-21",
      "description": "Join Hackothsava - 2k24 to tackle innovation challenges in coding and designing, with opportunities to win cash prizes and certificates.",
      "requirements": [
        "Engineering Students",
        "Undergraduate",
        "Coding Skills",
        "Designing Skills"
      ],
      "prize": "₹50,000 (Winner), ₹40,000 (First Runner Up), ₹10,000 (Best Innovation Project)",
      "category": "Innovation Challenge",
      "applyUrl": "https://unstop.com/hackathons/hackothsav-2k24-shri-madhwa-vadiraja-institute-of-technology-and-management-smvitm-shankarapura-karnataka-1065624"
    },
    {
      "company": "Flipkart",
      "position": "Flipkart GRiD 6.0 - Robotics Challenge",
      "location": "Online",
      "type": "Hackathon",
      "deadline": "2024-07-31",
      "description": "Compete in Flipkart GRiD 6.0 Robotics Challenge to solve robotics-related problems and win cash prizes, certificates, and internship opportunities.",
      "requirements": [
        "Engineering Students",
        "Undergraduate",
        "Postgraduate",
        "Robotics Knowledge"
      ],
      "prize": "₹1,00,000 (Winners), ₹75,000 (First Runners-Up), Certificates and PPIs for Finalists",
      "category": "Robotics",
      "applyUrl": "https://unstop.com/hackathons/flipkart-grid-60-robotics-challenge-flipkart-grid-60-flipkart-1024253"
    },
    {
      "company": "Flipkart",
      "position": "Flipkart GRiD 6.0 - Information Security Challenge",
      "location": "Online",
      "type": "Hackathon",
      "deadline": "2024-07-31",
      "description": "Participate in Flipkart GRiD 6.0 Information Security Challenge to tackle coding and security challenges, with chances to win cash and internship opportunities.",
      "requirements": [
        "Engineering Students",
        "Undergraduate",
        "Postgraduate",
        "Coding Skills",
        "Online Quiz Participation"
      ],
      "prize": "₹1,00,000 (Winners), ₹75,000 (First Runners-Up), Certificates and PPIs for Finalists",
      "category": "Information Security",
      "applyUrl": "https://unstop.com/hackathons/flipkart-grid-60-information-security-challenge-flipkart-grid-60-flipkart-1024250"
    },
    {
      "company": "Flipkart",
      "position": "Flipkart GRiD 6.0 - Software Development Track",
      "location": "Online",
      "type": "Hackathon",
      "deadline": "2024-07-31",
      "description": "Join Flipkart GRiD 6.0 Software Development Track to compete in coding challenges and win cash prizes, certificates, and internship opportunities.",
      "requirements": [
        "Engineering Students",
        "Undergraduate",
        "Postgraduate",
        "Coding Skills"
      ],
      "prize": "₹1,00,000 (Winners), ₹75,000 (First Runners-Up), Certificates and PPIs for Finalists",
      "category": "Software Development",
      "applyUrl": "https://unstop.com/hackathons/flipkart-grid-60-software-development-track-flipkart-grid-60-flipkart-1024247"
    },
    {
      "company": "Celebal Technologies Private Limited",
      "position": "Spark-Wars 3.0",
      "location": "Online",
      "type": "Hackathon",
      "deadline": "2024-07-24",
      "description": "Showcase your coding and data analytics skills in Spark-Wars 3.0 to win exciting prizes like Play Station 5 and professional certificates.",
      "requirements": [
        "Engineering Students",
        "Undergraduate",
        "Postgraduate",
        "Experienced Professionals",
        "Coding Skills",
        "Data Analytics Skills"
      ],
      "prize": "Play Station 5 (Winner), iPad Mini (First Runner Up), Marshall Speakers (Second Runner Up), Swag Bag (Top 100)",
      "category": "Coding Challenge",
      "applyUrl": "https://unstop.com/hackathons/spark-wars-30-celebal-technologies-private-limited-1064149"
    },
    {
      "company": "Ksham Innovation Pvt. Ltd.",
      "position": "PCB Designing Hackathon",
      "location": "Online",
      "type": "Hackathon",
      "deadline": "2024-07-15",
      "description": "Compete in the PCB Designing Hackathon to showcase your designing and robotics skills, with opportunities for internships and cash prizes.",
      "requirements": [
        "Engineering Students",
        "MBA Students",
        "Undergraduate",
        "Postgraduate",
        "Designing Skills",
        "Robotics Knowledge"
      ],
      "prize": "₹30,000 as Internship Stipend (Winner)",
      "category": "PCB Designing",
      "applyUrl": "https://unstop.com/hackathons/pcb-designing-hackathon-ksham-innovation-pvt-ltd-1063477"
    },
    {
      "company": "Ksham Innovation Pvt. Ltd.",
      "position": "Embedded Development Hackathon",
      "location": "Online",
      "type": "Hackathon",
      "deadline": "2024-07-11",
      "description": "Participate in the Embedded Development Hackathon to demonstrate your coding and robotics skills, with a chance to win internship stipends.",
      "requirements": [
        "Engineering Students",
        "Undergraduate",
        "Postgraduate",
        "Coding Skills",
        "Robotics Knowledge"
      ],
      "prize": "₹50,000 as Internship Stipend (Winner)",
      "category": "Embedded Development",
      "applyUrl": "https://unstop.com/hackathons/embedded-development-hackathon-ksham-innovation-pvt-ltd-1062591"
    },
    {
      "company": "Parul University, Vadodara",
      "position": "AI/ML Hackathon 1.0",
      "location": "Vadodara, India",
      "type": "Hackathon",
      "deadline": "2024-07-14",
      "description": "Join the AI/ML Hackathon 1.0 to innovate in artificial intelligence and machine learning, with opportunities to win cash prizes and certificates.",
      "requirements": [
        "Engineering Students",
        "MBA Students",
        "Undergraduate",
        "Postgraduate",
        "Fresher",
        "Experienced Professionals"
      ],
      "prize": "₹1,00,000 (Winner), ₹50,000 (First Runner Up), ₹25,000 (Second Runner Up), ₹5,000 (Consolation Prizes)",
      "category": "AI/ML",
      "applyUrl": "https://unstop.com/hackathons/aiml-hackathon-10-parul-university-vadodara-1062897"
    },
    {
      "company": "Indian Institute of Technology (IIT), Jodhpur",
      "position": "Green Fintech Hackathon",
      "location": "Online",
      "type": "Hackathon",
      "deadline": "2024-07-12",
      "description": "Participate in the Green Fintech Hackathon to innovate in climate-focused fintech solutions, with significant cash prizes and certificates.",
      "requirements": [
        "Engineering Students",
        "MBA Students",
        "Undergraduate",
        "Postgraduate",
        "Fresher",
        "Experienced Professionals",
        "Finance Knowledge"
      ],
      "prize": "₹2,50,000 (Winner), ₹1,50,000 (First Runner Up), ₹1,00,000 (Second Runner Up)",
      "category": "Fintech",
      "applyUrl": "https://unstop.com/hackathons/green-fintech-hackathon-indian-institute-of-technology-iit-jodhpur-1061860"
    },
    {
      "company": "Cyber Scam Prevention for Senior Citizen",
      "position": "CSPSC Hacks",
      "location": "Online",
      "type": "Hackathon",
      "deadline": "2024-08-13",
      "description": "Join CSPSC Hacks to develop solutions for cyber scam prevention, focusing on social good and beginner-friendly projects.",
      "requirements": [
        "Open Ended Project Skills",
        "Social Good Focus",
        "Beginner Friendly"
      ],
      "prize": "$150",
      "category": "Social Good",
      "applyUrl": "https://cspsc-hacks.devpost.com/"
    },
    {
      "company": "Meta",
      "position": "Presence Platform Hackathon | Japan 2024",
      "location": "Toranomon Hills Business Tower, Japan",
      "type": "Hackathon",
      "deadline": "2024-07-11",
      "description": "Compete in the Presence Platform Hackathon in Japan to innovate in AR/VR technologies, open to invited participants.",
      "requirements": [
        "AR/VR Knowledge",
        "Invited Participants in Japan"
      ],
      "prize": "$25,000",
      "category": "AR/VR",
      "applyUrl": "https://presence-platform-japan-2024.devpost.com/"
    },
    {
      "company": "Cirfin",
      "position": "CirFin CREATE",
      "location": "Online",
      "type": "Hackathon",
      "deadline": "2024-08-15",
      "description": "Participate in CirFin CREATE to develop solutions in social good, design, and machine learning/AI, with attractive cash prizes.",
      "requirements": [
        "Social Good Focus",
        "Design Skills",
        "Machine Learning/AI Knowledge"
      ],
      "prize": "$2,990",
      "category": "Social Good",
      "applyUrl": "https://cirfin-solve.devpost.com/"
    },
    {
      "company": "TriVal",
      "position": "Bay Area Hacks",
      "location": "Online",
      "type": "Hackathon",
      "deadline": "2024-08-31",
      "description": "Join Bay Area Hacks to work on beginner-friendly, low/no code, and open-ended projects, with substantial cash prizes.",
      "requirements": [
        "Beginner Friendly",
        "Low/No Code Skills",
        "Open Ended Project Skills"
      ],
      "prize": "$9,250",
      "category": "Beginner Friendly",
      "applyUrl": "https://bahacks.devpost.com/"
    },
    {
      "company": "Major League Hacking",
      "position": "Global Hack Week: Season Launch",
      "location": "Online",
      "type": "Hackathon",
      "deadline": "2024-07-11",
      "description": "Participate in Global Hack Week: Season Launch to work on beginner-friendly and open-ended projects, with a focus on community engagement.",
      "requirements": [
        "Beginner Friendly",
        "Open Ended Project Skills"
      ],
      "prize": "$0",
      "category": "Beginner Friendly",
      "applyUrl": "https://global-hack-week-season-launch.devpost.com/"
    },
    {
      "company": "FinCode Hacks",
      "position": "FinCode Hacks",
      "location": "Online",
      "type": "Hackathon",
      "deadline": "2024-07-31",
      "description": "Compete in FinCode Hacks to develop innovative solutions with beginner-friendly and low/no code approaches.",
      "requirements": [
        "Beginner Friendly",
        "Low/No Code Skills",
        "Open Ended Project Skills"
      ],
      "prize": "$8,022",
      "category": "Beginner Friendly",
      "applyUrl": "https://fincode-hacks.devpost.com/"
    },
    {
      "company": "CyberAdvocate",
      "position": "CyberHacks",
      "location": "Online",
      "type": "Hackathon",
      "deadline": "2024-07-31",
      "description": "Join CyberHacks to create solutions with a focus on cybersecurity, using beginner-friendly and low/no code methods.",
      "requirements": [
        "Beginner Friendly",
        "Low/No Code Skills",
        "Open Ended Project Skills"
      ],
      "prize": "$8,900",
      "category": "Cybersecurity",
      "applyUrl": "https://cyberhacks.devpost.com/"
    },
    {
      "company": "Diversity",
      "position": "DiverseHacks",
      "location": "Online",
      "type": "Hackathon",
      "deadline": "2024-07-31",
      "description": "Participate in DiverseHacks to work on inclusive, beginner-friendly, and low/no code projects with attractive prizes.",
      "requirements": [
        "Beginner Friendly",
        "Low/No Code Skills",
        "Open Ended Project Skills"
      ],
      "prize": "$8,070",
      "category": "Beginner Friendly",
      "applyUrl": "https://diversehacks.devpost.com/"
    },
    {
      "company": "KITE",
      "position": "Kite Hacks 2.0",
      "location": "Online",
      "type": "Hackathon",
      "deadline": "2024-08-01",
      "description": "Join Kite Hacks 2.0 to innovate in e-commerce and machine learning/AI, with a beginner-friendly approach.",
      "requirements": [
        "Beginner Friendly",
        "E-commerce/Retail Knowledge",
        "Machine Learning/AI Knowledge"
      ],
      "prize": "$50",
      "category": "E-commerce/AI",
      "applyUrl": "https://kite-hacks-2-0.devpost.com/"
    },
  ];

  const interviewQuestions = [
    {
      category: "Technical",
      questions: [
        "Explain the difference between == and === in JavaScript",
        "What is time complexity and how do you calculate it?",
        "Implement a binary search algorithm",
        "Explain the concept of closures in JavaScript",
        "What are the different types of joins in SQL?",
      ],
    },
    {
      category: "HR",
      questions: [
        "Tell me about yourself",
        "Why do you want to work here?",
        "What are your strengths and weaknesses?",
        "Where do you see yourself in 5 years?",
        "Why are you leaving your current job?",
      ],
    },
    {
      category: "Behavioral",
      questions: [
        "Describe a challenging project you worked on",
        "How do you handle tight deadlines?",
        "Tell me about a time you had to work with a difficult team member",
        "Describe a situation where you had to learn something new quickly",
        "How do you prioritize tasks when everything seems urgent?",
      ],
    },
  ];

  const resources = [
    {
      title: "Complete Interview Preparation Guide",
      description:
        "Comprehensive guide covering technical and HR interview preparation",
      type: "PDF",
      size: "2.5 MB",
      downloads: 1250,
    },
    {
      title: "System Design Interview Handbook",
      description: "Learn how to design scalable systems for tech interviews",
      type: "PDF",
      size: "3.8 MB",
      downloads: 980,
    },
    {
      title: "DSA Cheat Sheet",
      description: "Quick reference for data structures and algorithms",
      type: "PDF",
      size: "1.2 MB",
      downloads: 2100,
    },
    {
      title: "Behavioral Interview Questions Bank",
      description: "Common behavioral questions with sample answers",
      type: "PDF",
      size: "1.8 MB",
      downloads: 750,
    },
    {
      title: "Resume Writing Tips",
      description: "Best practices for creating an impactful resume",
      type: "PDF",
      size: "1.5 MB",
      downloads: 1340,
    },
    {
      title: "LinkedIn Profile Optimization",
      description: "Tips to enhance your LinkedIn profile for job hunting",
      type: "PDF",
      size: "1.0 MB",
      downloads: 890,
    },
    {
      title: "Coding Interview Practice Problems",
      description: "Collection of coding problems with solutions for practice",
      type: "PDF",
      size: "4.2 MB",
      downloads: 2200,
    },
    {
      title: "Machine Learning Notes",
      description: "Introductory notes covering key machine learning concepts",
      type: "PDF",
      size: "2.7 MB",
      downloads: 670,
    },
    {
      title: "Time Management Guide",
      description: "Effective strategies to improve productivity and focus",
      type: "PDF",
      size: "1.1 MB",
      downloads: 540,
    },
    {
      title: "Career Development Strategies",
      description: "Insights and advice for planning your career growth",
      type: "PDF",
      size: "1.3 MB",
      downloads: 410,
    },
  ];

  const dsaTopics = [
    {
      name: "Arrays",
      url: "https://leetcode.com/tag/array/",
      description: "Array problems for all levels.",
      questions: [
        { name: "Two Sum", url: "https://leetcode.com/problems/two-sum/" },
        { name: "Best Time to Buy and Sell Stock", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
        { name: "Maximum Subarray (Kadane's Algo)", url: "https://leetcode.com/problems/maximum-subarray/" },
        { name: "Move Zeroes", url: "https://leetcode.com/problems/move-zeroes/" },
        { name: "Merge Intervals", url: "https://leetcode.com/problems/merge-intervals/" },
      ],
    },
    {
      name: "Strings",
      url: "https://leetcode.com/tag/string/",
      description: "String manipulation and logic.",
      questions: [
        { name: "Valid Palindrome", url: "https://leetcode.com/problems/valid-palindrome/" },
        { name: "Valid Anagram", url: "https://leetcode.com/problems/valid-anagram/" },
        { name: "Longest Substring Without Repeating Characters", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
        { name: "Group Anagrams", url: "https://leetcode.com/problems/group-anagrams/" },
      ],
    },
    {
      name: "Dynamic Programming",
      url: "https://leetcode.com/tag/dynamic-programming/",
      description: "Master optimal substructure patterns.",
      questions: [
        { name: "Climbing Stairs", url: "https://leetcode.com/problems/climbing-stairs/" },
        { name: "House Robber", url: "https://leetcode.com/problems/house-robber/" },
        { name: "Longest Increasing Subsequence", url: "https://leetcode.com/problems/longest-increasing-subsequence/" },
        { name: "Coin Change", url: "https://leetcode.com/problems/coin-change/" },
      ],
    },
    {
      name: "Trees",
      url: "https://leetcode.com/tag/tree/",
      description: "Binary trees, traversals, and more.",
      questions: [
        { name: "Invert Binary Tree", url: "https://leetcode.com/problems/invert-binary-tree/" },
        { name: "Maximum Depth of Binary Tree", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
        { name: "Diameter of Binary Tree", url: "https://leetcode.com/problems/diameter-of-binary-tree/" },
      ],
    },
    {
      name: "Graphs",
      url: "https://leetcode.com/tag/graph/",
      description: "DFS, BFS, shortest paths, etc.",
      questions: [
        { name: "Number of Islands", url: "https://leetcode.com/problems/number-of-islands/" },
        { name: "Course Schedule (Topological Sort)", url: "https://leetcode.com/problems/course-schedule/" },
        { name: "Pacific Atlantic Water Flow", url: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
      ],
    },
    {
      name: "Heaps",
      url: "https://leetcode.com/tag/heap/",
      description: "Minimum and Maximum Heaps.",
      questions: [],
    },
    {
      name: "Linked Lists",
      url: "https://leetcode.com/tag/linked-list/",
      description: "Singly and doubly linked list problems.",
      questions: [],
    },
    {
      name: "Stacks",
      url: "https://leetcode.com/tag/stack/",
      description: "Stack-based logic and applications.",
      questions: [
        { name: "Valid Parentheses", url: "https://leetcode.com/problems/valid-parentheses/" },
        { name: "Min Stack", url: "https://leetcode.com/problems/min-stack/" },
        { name: "Daily Temperatures", url: "https://leetcode.com/problems/daily-temperatures/" },
      ],
    },
    {
      name: "Queues",
      url: "https://leetcode.com/tag/queue/",
      description: "Queue problems including circular and priority queues.",
      questions: [],
    },
    {
      name: "Bit Manipulation",
      url: "https://leetcode.com/tag/bit-manipulation/",
      description: "Problems involving bits and bitmasks.",
      questions: [],
    },
    {
      name: "Greedy",
      url: "https://leetcode.com/tag/greedy/",
      description: "Optimize step-by-step with local choices.",
      questions: [],
    },
    {
      name: "Backtracking",
      url: "https://leetcode.com/tag/backtracking/",
      description: "Explore all possibilities using recursion.",
      questions: [],
    },
    {
      name: "Hashing",
      url: "https://leetcode.com/tag/hash-table/",
      description: "HashMap and HashSet based problems.",
      questions: [
        { name: "Two Sum (HashMap)", url: "https://leetcode.com/problems/two-sum/" },
        { name: "Contains Duplicate", url: "https://leetcode.com/problems/contains-duplicate/" },
        { name: "Top K Frequent Elements", url: "https://leetcode.com/problems/top-k-frequent-elements/" },
      ],
    },
    {
      name: "Sliding Window",
      url: "https://leetcode.com/tag/sliding-window/",
      description: "Problems using sliding window technique.",
      questions: [
        { name: "Max Consecutive Ones III", url: "https://leetcode.com/problems/max-consecutive-ones-iii/" },
        { name: "Longest Substring Without Repeating Characters", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
        { name: "Permutation in String", url: "https://leetcode.com/problems/permutation-in-string/" },
      ],
    },
    {
      name: "Two Pointers",
      url: "https://leetcode.com/tag/two-pointers/",
      description: "Problems using two-pointer technique.",
      questions: [
        { name: "3Sum", url: "https://leetcode.com/problems/3sum/" },
        { name: "Valid Palindrome", url: "https://leetcode.com/problems/valid-palindrome/" },
        { name: "Container With Most Water", url: "https://leetcode.com/problems/container-with-most-water/" },
      ],
    },
  ];

  // --- Tab Renderers ---
  const renderPractice = () => (
    <div className="grid gap-6 md:grid-cols-3">
      {dsaTopics.map((topic, index) => (
        <a
          key={index}
          href={topic.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-6 rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-200 ${state.darkMode
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-white border-gray-200 text-gray-900"
            }`}
        >
          <h4 className="mb-2 text-lg font-semibold">{topic.name}</h4>
          <p className="text-sm !text-black dark:text-gray-300">
            {topic.description}
          </p>
        </a>
      ))}
    </div>
  );

  const renderOpportunities = () => {
    const filteredJobs = jobOpportunities.filter((job: any) => {
      const matchesCategory =
        selectedCategory === "All Categories" ||
        job.category === selectedCategory;

      const matchesSearch =
        job.position.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        job.company.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        job.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        job.requirements.some((req: string) =>
          req.toLowerCase().includes(debouncedSearch.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });

    return (
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <h3
              className={`text-xl font-semibold ${state.darkMode ? "text-white" : "text-gray-900"
                }`}
            >
              Latest Job Opportunities
            </h3>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${state.darkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
                }`}
            >
              <option>All Categories</option>
              <option>Product Based</option>
              <option>Mass Recruiter</option>
              <option>Internship</option>
            </select>
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search by role or tech stack..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pr-10 px-4 py-2 rounded-lg border ${state.darkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900"
                  }`}
              />
              <span
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xl ${state.darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
              >
                🔍
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredJobs.map((job: any, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-200  ${state.darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
                } hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4
                    className={`text-lg font-semibold tracking-tight ${state.darkMode ? "text-white" : "text-gray-900"
                      }`}
                  >
                    {job.position}
                  </h4>
                  <p
                    className={`text-sm ${state.darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    {job.company} • {job.location}
                  </p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${job.type === "Internship"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    }`}
                >
                  {job.type}
                </span>
              </div>
              <p
                className={`text-sm leading-relaxed mb-4 ${state.darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
              >
                {job.description}
              </p>
              <div className="mb-4">
                <h5
                  className={`text-sm font-semibold mb-2 ${state.darkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                >
                  Requirements:
                </h5>
                <ul className="pl-1 space-y-1 text-sm">
                  {job.requirements.map((req: string, reqIndex: number) => (
                    <li
                      key={reqIndex}
                      className={`flex items-start space-x-2 ${state.darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                    >
                      <div className="w-1 h-1 bg-current rounded-full shrink-0"></div>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <span
                    className={`text-sm font-semibold ${state.darkMode ? "text-green-400" : "text-green-600"
                      }`}
                  >
                    {job.salary}
                  </span>
                  <p
                    className={`text-xs mt-1 ${state.darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    Deadline: {job.deadline}
                  </p>
                </div>
                <button
                  onClick={() => {
                    console.log(
                      `Applying to ${job.position} at ${job.company}`
                    );
                    if (job.applyUrl && job.applyUrl !== "#") {
                      // Open real job application URL in new tab
                      window.open(
                        job.applyUrl,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    } else {
                      // Fallback for mock data or invalid URLs
                      alert(
                        `🚧 Coming Soon!\n\nJob application feature for ${job.position} at ${job.company} will be available soon.\n\nFor now, please visit the company's career page directly.`
                      );
                    }
                  }}
                  className="flex items-center px-4 py-2 space-x-2 text-sm font-medium text-white transition-colors bg-blue-500 hover:bg-blue-600"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Apply</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderInterviews = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {interviewQuestions.map((category, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl shadow-sm border transition-all hover:shadow-md ${state.darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
              }`}
          >
            <h4
              className={`text-lg font-semibold mb-4 ${state.darkMode ? "text-white" : "text-gray-900"
                }`}
            >
              {category.category} Questions
            </h4>
            <div className="space-y-3">
              {category.questions.map((question, qIndex) => (
                <div
                  key={qIndex}
                  className={`p-3 rounded-lg ${state.darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-50 text-gray-700"
                    }`}
                >
                  <p
                    className={`text-sm leading-relaxed ${state.darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                  >
                    {question}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                console.log(`Viewing all ${category.category} questions`);
                // Open external resources with curated questions based on category
                const questionUrls = {
                  Technical:
                    "https://github.com/DopplerHQ/awesome-interview-questions#technical-questions",
                  HR: "https://www.indeed.com/career-advice/interviewing/hr-interview-questions",
                  Behavioral:
                    "https://www.indeed.com/career-advice/interviewing/behavioral-interview-questions",
                };

                const url =
                  questionUrls[category.category as keyof typeof questionUrls];
                if (url) {
                  window.open(url, "_blank", "noopener,noreferrer");
                } else {
                  // Fallback for unknown categories
                  alert(
                    `🚧 Coming Soon!\n\nDetailed ${category.category} questions page will be available soon.\n\nFor now, you can see the sample questions above.`
                  );
                }
              }}
              className="w-full px-4 py-2 mt-5 text-sm font-medium text-white transition-colors bg-blue-500 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Practice {category.category} Questions
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-6">
      <h3
        className={`text-xl font-semibold ${state.darkMode ? "text-white" : "text-gray-900"
          }`}
      >
        Download Resources
      </h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {resources.map((resource, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg border  transform transition-all duration-200  ${state.darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
              } hover:shadow-lg transition-y-1`}
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg dark:bg-blue-900">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div className="flex-1">
                <h4
                  className={`text-lg font-semibold mb-2 ${state.darkMode ? "text-white" : "text-gray-900"
                    }`}
                >
                  {resource.title}
                </h4>
                <p
                  className={`text-sm mb-3 ${state.darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                >
                  {resource.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span
                      className={`${state.darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                    >
                      📄 {resource.type} • {resource.size}
                    </span>
                    <span
                      className={`${state.darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                    >
                      ⬇️ {resource.downloads} downloads
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      console.log(`Downloading ${resource.title}`);
                      // Open actual downloadable resources based on the resource title
                      const downloadUrls = {
                        "Complete Interview Preparation Guide":
                          "https://www.csuci.edu/careerdevelopment/services/documents/interviewhandbook.pdf",
                        "System Design Interview Handbook":
                          "https://bytes.usc.edu/~saty/courses/docs/data/SystemDesignInterview.pdf",
                        "DSA Cheat Sheet": `${baseUrl}/api/pdf/dsa-cheatsheet`,
                        "Behavioral Interview Questions Bank": `${baseUrl}/api/pdf/behavioral-questions`,
                        "Resume Writing Tips":
                          "https://www.thebalancecareers.com/resume-writing-tips-2063336",
                        "LinkedIn Profile Optimization":
                          "https://www.linkedin.com/help/linkedin/answer/111663",
                        "Coding Interview Practice Problems":
                          "https://leetcode.com/problemset/all/",
                        "Machine Learning Notes":
                          "https://developers.google.com/machine-learning/crash-course/ml-intro",
                        "Time Management Guide":
                          "https://www.mindtools.com/pages/main/newMN_HTE.htm",
                        "Career Development Strategies":
                          "https://www.forbes.com/sites/forbeshumanresourcescouncil/2020/02/20/10-career-development-strategies-for-success/",
                      } as const;

                      const url =
                        downloadUrls[
                        resource.title as keyof typeof downloadUrls
                        ];
                      if (url) {
                        // Open in a new tab; server headers decide whether to download or view
                        window.open(url, "_blank", "noopener,noreferrer");
                      } else {
                        // Fallback for unknown resources
                        alert(
                          `🚧 Coming Soon!\n\nDownload feature for "${resource.title}" will be available soon.\n\nFile: ${resource.type} • ${resource.size}\nDownloads: ${resource.downloads}`
                        );
                      }
                    }}
                    className="flex items-center px-4 py-2 space-x-2 text-sm font-medium text-white transition-all bg-green-500 rounded-lg hover:bg-green-600"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- Main Render ---
  return (
    <div
      className={`min-h-screen ${state.darkMode ? "bg-gray-900" : "bg-gradient-to-b from-sky-50 to-white"
        } transition-colors duration-300`}
    >
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1
            className={`text-3xl font-bold ${state.darkMode ? "text-white" : "text-gray-900"
              } mb-2`}
          >
            Placement Preparation Arena
          </h1>
          <p
            className={`text-lg sm:text-xl ${state.darkMode ? "text-gray-300" : "text-gray-700"
              } max-w-3xl`}
          >
            Everything you need to ace your job interviews and land your dream
            job
          </p>
        </div>
        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium shadow-sm transition-all duration-200 border ${selectedTab === tab.id
                    ? "bg-blue-600 text-white border-blue-600 scale-105"
                    : state.darkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-700"
                      : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        {/* Tab Content */}
        <div
          className={`rounded-2xl p-6 transition-all duration-300 shadow-md border ${state.darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
            } `}
        >
          {selectedTab === "opportunities" && renderOpportunities()}
          {selectedTab === "interviews" && renderInterviews()}
          {selectedTab === "resources" && renderResources()}
          {selectedTab === "mock" && renderMockInterviews()}
          {selectedTab === "practice" && renderPractice()}
        </div>
      </div>
    </div>
  );
};

export default PlacementPrep;
