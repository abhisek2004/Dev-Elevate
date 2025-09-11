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
    },
    {
      name: "Strings",
      url: "https://leetcode.com/tag/string/",
      description: "String manipulation and logic.",
    },
    {
      name: "Dynamic Programming",
      url: "https://leetcode.com/tag/dynamic-programming/",
      description: "Master optimal substructure patterns.",
    },
    {
      name: "Trees",
      url: "https://leetcode.com/tag/tree/",
      description: "Binary trees, traversals, and more.",
    },
    {
      name: "Graphs",
      url: "https://leetcode.com/tag/graph/",
      description: "DFS, BFS, shortest paths, etc.",
    },
    {
      name: "Heaps",
      url: "https://leetcode.com/tag/heap/",
      description: "Minimum and Maximum Heaps.",
    },
    {
      name: "Linked Lists",
      url: "https://leetcode.com/tag/linked-list/",
      description: "Singly and doubly linked list problems.",
    },
    {
      name: "Stacks",
      url: "https://leetcode.com/tag/stack/",
      description: "Stack-based logic and applications.",
    },
    {
      name: "Queues",
      url: "https://leetcode.com/tag/queue/",
      description: "Queue problems including circular and priority queues.",
    },
    {
      name: "Bit Manipulation",
      url: "https://leetcode.com/tag/bit-manipulation/",
      description: "Problems involving bits and bitmasks.",
    },
    {
      name: "Greedy",
      url: "https://leetcode.com/tag/greedy/",
      description: "Optimize step-by-step with local choices.",
    },
    {
      name: "Backtracking",
      url: "https://leetcode.com/tag/backtracking/",
      description: "Explore all possibilities using recursion.",
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
          className={`p-6 rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-200 ${
            state.darkMode
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
        <div className="flex flex-col gap-4 justify-between sm:flex-row sm:items-center">
          <div className="flex gap-3 items-center">
            <h3
              className={`text-xl font-semibold ${
                state.darkMode ? "text-white" : "text-gray-900"
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
              className={`px-4 py-2 rounded-lg border ${
                state.darkMode
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
                className={`w-full pr-10 px-4 py-2 rounded-lg border ${
                  state.darkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
              <span
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xl ${
                  state.darkMode ? "text-gray-400" : "text-gray-500"
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
              className={`p-6 rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-200  ${
                state.darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } hover:shadow-md transition-shadow`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4
                    className={`text-lg font-semibold tracking-tight ${
                      state.darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {job.position}
                  </h4>
                  <p
                    className={`text-sm ${
                      state.darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {job.company} • {job.location}
                  </p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    job.type === "Internship"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  }`}
                >
                  {job.type}
                </span>
              </div>
              <p
                className={`text-sm leading-relaxed mb-4 ${
                  state.darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {job.description}
              </p>
              <div className="mb-4">
                <h5
                  className={`text-sm font-semibold mb-2 ${
                    state.darkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Requirements:
                </h5>
                <ul className="pl-1 space-y-1 text-sm">
                  {job.requirements.map((req: string, reqIndex: number) => (
                    <li
                      key={reqIndex}
                      className={`flex items-start space-x-2 ${
                        state.darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <div className="w-1 h-1 bg-current rounded-full shrink-0"></div>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <span
                    className={`text-sm font-semibold ${
                      state.darkMode ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    {job.salary}
                  </span>
                  <p
                    className={`text-xs mt-1 ${
                      state.darkMode ? "text-gray-400" : "text-gray-600"
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
                  className="flex items-center px-4 py-2 space-x-2 text-sm font-medium text-white bg-blue-500 transition-colors hover:bg-blue-600"
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
            className={`p-6 rounded-2xl shadow-sm border transition-all hover:shadow-md ${
              state.darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <h4
              className={`text-lg font-semibold mb-4 ${
                state.darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {category.category} Questions
            </h4>
            <div className="space-y-3">
              {category.questions.map((question, qIndex) => (
                <div
                  key={qIndex}
                  className={`p-3 rounded-lg ${
                    state.darkMode
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-50 text-gray-700"
                  }`}
                >
                  <p
                    className={`text-sm leading-relaxed ${
                      state.darkMode ? "text-gray-300" : "text-gray-700"
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
              className="px-4 py-2 mt-5 w-full text-sm font-medium text-white bg-blue-500 rounded-xl transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
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
        className={`text-xl font-semibold ${
          state.darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Download Resources
      </h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {resources.map((resource, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg border  transform transition-all duration-200  ${
              state.darkMode
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
                  className={`text-lg font-semibold mb-2 ${
                    state.darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {resource.title}
                </h4>
                <p
                  className={`text-sm mb-3 ${
                    state.darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {resource.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-4 items-center text-sm">
                    <span
                      className={`${
                        state.darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      📄 {resource.type} • {resource.size}
                    </span>
                    <span
                      className={`${
                        state.darkMode ? "text-gray-400" : "text-gray-600"
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
                    className="flex items-center px-4 py-2 space-x-2 text-sm font-medium text-white bg-green-500 rounded-lg transition-all hover:bg-green-600"
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
      className={`min-h-screen ${
        state.darkMode ? "bg-gray-900" : "bg-gradient-to-b from-sky-50 to-white"
      } transition-colors duration-300`}
    >
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1
            className={`text-3xl font-bold ${
              state.darkMode ? "text-white" : "text-gray-900"
            } mb-2`}
          >
            Placement Preparation Arena
          </h1>
          <p
            className={`text-lg sm:text-xl ${
              state.darkMode ? "text-gray-300" : "text-gray-700"
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium shadow-sm transition-all duration-200 border ${
                    selectedTab === tab.id
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
          className={`rounded-2xl p-6 transition-all duration-300 shadow-md border ${
            state.darkMode
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
