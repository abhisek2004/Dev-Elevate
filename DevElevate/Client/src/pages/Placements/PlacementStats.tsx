
import React, { useState, useEffect, useRef } from 'react';
import { useGlobalState } from '../../contexts/GlobalContext';
import {
  Users,
  TrendingUp,
  Building2,
  MapPin,
  Calendar,
  Briefcase,
  Star,
  ExternalLink,
  Filter,
  Search,
  ArrowRight,
  Trophy,
  Target,
  ChevronDown,
  Clock,
  Medal,
  Award,
  BarChart3,
  PieChart,
  LineChart,
  Crown,
} from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  Pie
} from 'recharts';
import Header from '../Landing/components/Header';
import Footer from '../Landing/components/Footer';
import CTA from '../Landing/components/CTA';

interface PlacementData {
  totalHires: number;
  successRate: number;
  hiringPartners: number;
  averageSalary: string;
}

interface AlumniTestimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  story: string;
  year: number;
  domain: string;
  location: string;
  salary?: string;
}

interface Recruiter {
  id: number;
  name: string;
  logo: string;
  careersLink: string;
  hiresCount: number;
}

interface LeaderboardEntry {
  id: number;
  name: string;
  package: string;
  company: string;
  image: string;
  offers: number;
  rank: number;
  domain: string;
  year: number;
}

interface UpcomingEvent {
  id: number;
  title: string;
  company: string;
  date: string;
  type: 'drive' | 'test' | 'interview';
  daysLeft: number;
  eligibility: string[];
}

const AnimatedCounter: React.FC<{
  value: number;
  suffix?: string;
  duration?: number;
  isVisible: boolean;
}> = ({ value, suffix = '', duration = 2000, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    // const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const currentCount = Math.floor(progress * value);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration, isVisible]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const PlacementStats: React.FC = () => {
  const { state } = useGlobalState();
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [searchTerm, setSearchTerm] = useState('');
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [activeChart, setActiveChart] = useState('trend');
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsStatsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Mock data - in real app, this would come from API
  const placementData: PlacementData = {
    totalHires: 2847,
    successRate: 94.5,
    hiringPartners: 150,
    averageSalary: '₹12.5 LPA'
  };

  const leaderboardData: LeaderboardEntry[] = [
    {
      id: 1,
      name: 'Arjun Mehta',
      package: '₹45 LPA',
      company: 'Google',
      image: 'https://ui-avatars.com/api/?name=Arjun+Mehta&background=4285f4&color=fff',
      offers: 5,
      rank: 1,
      domain: 'Software Engineering',
      year: 2024
    },
    {
      id: 2,
      name: 'Priya Singh',
      package: '₹42 LPA',
      company: 'Microsoft',
      image: 'https://ui-avatars.com/api/?name=Priya+Singh&background=0078d4&color=fff',
      offers: 4,
      rank: 2,
      domain: 'Data Science',
      year: 2024
    },
    {
      id: 3,
      name: 'Rohit Kumar',
      package: '₹38 LPA',
      company: 'Amazon',
      image: 'https://ui-avatars.com/api/?name=Rohit+Kumar&background=ff9900&color=fff',
      offers: 3,
      rank: 3,
      domain: 'Full Stack',
      year: 2024
    },
    {
      id: 4,
      name: 'Sneha Patel',
      package: '₹35 LPA',
      company: 'Meta',
      image: 'https://ui-avatars.com/api/?name=Sneha+Patel&background=1877f2&color=fff',
      offers: 4,
      rank: 4,
      domain: 'Frontend',
      year: 2024
    },
    {
      id: 5,
      name: 'Vikash Sharma',
      package: '₹32 LPA',
      company: 'Netflix',
      image: 'https://ui-avatars.com/api/?name=Vikash+Sharma&background=e50914&color=fff',
      offers: 2,
      rank: 5,
      domain: 'DevOps',
      year: 2024
    }
  ];

  const upcomingEvents: UpcomingEvent[] = [
    {
      id: 1,
      title: 'On-Campus Drive',
      company: 'TCS',
      date: '2024-02-15',
      type: 'drive',
      daysLeft: 3,
      eligibility: ['CSE', 'IT', 'ECE']
    },
    {
      id: 2,
      title: 'Aptitude Test',
      company: 'Infosys',
      date: '2024-02-18',
      type: 'test',
      daysLeft: 6,
      eligibility: ['All Branches']
    },
    {
      id: 3,
      title: 'Technical Interview',
      company: 'Wipro',
      date: '2024-02-20',
      type: 'interview',
      daysLeft: 8,
      eligibility: ['CSE', 'IT']
    },
    {
      id: 4,
      title: 'Pool Campus Drive',
      company: 'Accenture',
      date: '2024-02-25',
      type: 'drive',
      daysLeft: 13,
      eligibility: ['All Branches']
    }
  ];

  const yearWiseTrend = [
    { year: '2020', placements: 1250, packages: 8.5 },
    { year: '2021', placements: 1580, packages: 9.2 },
    { year: '2022', placements: 2100, packages: 10.8 },
    { year: '2023', placements: 2450, packages: 11.5 },
    { year: '2024', placements: 2847, packages: 12.5 }
  ];

  const departmentWise = [
    { department: 'CSE', placements: 850, color: '#8b5cf6' },
    { department: 'IT', placements: 720, color: '#3b82f6' },
    { department: 'ECE', placements: 650, color: '#10b981' },
    { department: 'ME', placements: 420, color: '#f59e0b' },
    { department: 'EE', placements: 207, color: '#ef4444' }
  ];

  const salaryDistribution = [
    { range: '5-10 LPA', count: 1200, color: '#8b5cf6' },
    { range: '10-15 LPA', count: 950, color: '#3b82f6' },
    { range: '15-20 LPA', count: 420, color: '#10b981' },
    { range: '20-30 LPA', count: 207, color: '#f59e0b' },
    { range: '30+ LPA', count: 70, color: '#ef4444' }
  ];

  const alumniTestimonials: AlumniTestimonial[] = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Software Engineer',
      company: 'Google',
      image: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=4285f4&color=fff',
      story: 'DevElevate\'s placement prep and AI Study Buddy helped me crack Google\'s coding interviews. The mock interviews were incredibly helpful!',
      year: 2024,
      domain: 'Software Development',
      location: 'Bangalore',
      salary: '₹28 LPA'
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      role: 'Data Scientist',
      company: 'Microsoft',
      image: 'https://ui-avatars.com/api/?name=Rahul+Kumar&background=0078d4&color=fff',
      story: 'The AI/ML learning path and project recommendations were game-changers. Landed my dream role at Microsoft within 6 months!',
      year: 2024,
      domain: 'Data Science',
      location: 'Hyderabad',
      salary: '₹25 LPA'
    },
    {
      id: 3,
      name: 'Anita Patel',
      role: 'Full Stack Developer',
      company: 'Amazon',
      image: 'https://ui-avatars.com/api/?name=Anita+Patel&background=ff9900&color=fff',
      story: 'The MERN stack roadmap and hands-on projects gave me the confidence to ace technical rounds. Thank you DevElevate!',
      year: 2023,
      domain: 'Full Stack Development',
      location: 'Mumbai',
      salary: '₹22 LPA'
    },
    {
      id: 4,
      name: 'Vikash Singh',
      role: 'DevOps Engineer',
      company: 'Netflix',
      image: 'https://ui-avatars.com/api/?name=Vikash+Singh&background=e50914&color=fff',
      story: 'The comprehensive learning resources and placement guidance helped me transition from development to DevOps successfully.',
      year: 2023,
      domain: 'DevOps',
      location: 'Pune',
      salary: '₹20 LPA'
    },
    {
      id: 5,
      name: 'Sneha Reddy',
      role: 'Product Manager',
      company: 'Flipkart',
      image: 'https://ui-avatars.com/api/?name=Sneha+Reddy&background=047bd6&color=fff',
      story: 'DevElevate\'s interview prep and resume builder were instrumental in helping me land a PM role at Flipkart.',
      year: 2024,
      domain: 'Product Management',
      location: 'Bangalore',
      salary: '₹18 LPA'
    },
    {
      id: 6,
      name: 'Arjun Gupta',
      role: 'ML Engineer',
      company: 'Uber',
      image: 'https://ui-avatars.com/api/?name=Arjun+Gupta&background=000000&color=fff',
      story: 'The AI projects and coding practice helped me build a strong portfolio. Grateful for the journey with DevElevate!',
      year: 2023,
      domain: 'Machine Learning',
      location: 'Delhi',
      salary: '₹24 LPA'
    }
  ];

  const topRecruiters: Recruiter[] = [
    { id: 1, name: 'Google', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg', careersLink: 'https://careers.google.com', hiresCount: 45 },
    { id: 2, name: 'Microsoft', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg', careersLink: 'https://careers.microsoft.com', hiresCount: 38 },
    { id: 3, name: 'Amazon', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', careersLink: 'https://amazon.jobs', hiresCount: 42 },
    { id: 4, name: 'Meta', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg', careersLink: 'https://careers.meta.com', hiresCount: 28 },
    { id: 5, name: 'Netflix', logo: 'https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69a9c3bfnbsdaa3/Netflix-Logo.jpg', careersLink: 'https://jobs.netflix.com', hiresCount: 22 },
    { id: 6, name: 'Flipkart', logo: 'https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png', careersLink: 'https://careers.flipkart.com', hiresCount: 35 },
    { id: 7, name: 'Swiggy', logo: 'https://logos-world.net/wp-content/uploads/2020/11/Swiggy-Logo.png', careersLink: 'https://careers.swiggy.com', hiresCount: 31 },
    { id: 8, name: 'Zomato', logo: 'https://logos-world.net/wp-content/uploads/2020/11/Zomato-Logo.png', careersLink: 'https://careers.zomato.com', hiresCount: 29 }
  ];

  const years = ['All Years', '2024', '2023', '2022', '2021'];
  const domains = ['All Domains', 'Software Development', 'Data Science', 'Full Stack Development', 'DevOps', 'Machine Learning', 'Product Management'];
  const locations = ['All Locations', 'Bangalore', 'Hyderabad', 'Mumbai', 'Pune', 'Delhi', 'Chennai'];

  // Filter testimonials based on selected filters
  const filteredTestimonials = alumniTestimonials.filter(testimonial => {
    const matchesYear = selectedYear === 'All Years' || testimonial.year.toString() === selectedYear;
    const matchesDomain = selectedDomain === 'All Domains' || testimonial.domain === selectedDomain;
    const matchesLocation = selectedLocation === 'All Locations' || testimonial.location === selectedLocation;
    const matchesSearch = searchTerm === '' ||
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.role.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesYear && matchesDomain && matchesLocation && matchesSearch;
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-400" />;
      default:
        return <Trophy className="w-5 h-5 text-purple-400" />;
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'drive':
        return <Briefcase className="w-5 h-5" />;
      case 'test':
        return <Target className="w-5 h-5" />;
      case 'interview':
        return <Users className="w-5 h-5" />;
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'drive':
        return 'from-green-500 to-emerald-500';
      case 'test':
        return 'from-blue-500 to-cyan-500';
      case 'interview':
        return 'from-purple-500 to-pink-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header Section */}
      <section>
        <Header />
      </section>
      {/* Animated Background - Same as Landing Page */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8">
          {/* Background Grid */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          </div>

          <div className="max-w-7xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full px-6 py-3 mb-8">
              <Trophy className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-gray-300">Industry-Leading Placement Success</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>

            {/* Main Heading */}
            <div className="space-y-6 mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Placement
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                  Success Stories
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Discover how DevElevate has transformed careers and helped students land their dream jobs at top companies worldwide
              </p>
            </div>

            {/* Scroll Indicator */}
            <div
              className="animate-bounce cursor-pointer"
              onClick={() => statsRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ChevronDown className="w-6 h-6 text-gray-400 mx-auto" />
            </div>
          </div>
        </section>

        {/* Stats Section with Animated Counters */}
        <section ref={statsRef} className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Total Hires */}
              <div className="group text-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-500"></div>
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    <AnimatedCounter value={placementData.totalHires} suffix="+" isVisible={isStatsVisible} />
                  </span>
                </div>
                <div className="text-gray-400 font-medium text-lg">Total Hires</div>
                <div className="mt-4 w-full bg-gray-800 rounded-full h-1 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000 ease-out w-full"></div>
                </div>
              </div>

              {/* Success Rate */}
              <div className="group text-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-500"></div>
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-green-500/25 transition-all duration-300">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    <AnimatedCounter value={placementData.successRate} suffix="%" isVisible={isStatsVisible} />
                  </span>
                </div>
                <div className="text-gray-400 font-medium text-lg">Success Rate</div>
                <div className="mt-4 w-full bg-gray-800 rounded-full h-1 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000 ease-out w-full" style={{ transitionDelay: '200ms' }}></div>
                </div>
              </div>

              {/* Hiring Partners */}
              <div className="group text-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-500"></div>
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    <AnimatedCounter value={placementData.hiringPartners} suffix="+" isVisible={isStatsVisible} />
                  </span>
                </div>
                <div className="text-gray-400 font-medium text-lg">Hiring Partners</div>
                <div className="mt-4 w-full bg-gray-800 rounded-full h-1 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-1000 ease-out w-full" style={{ transitionDelay: '400ms' }}></div>
                </div>
              </div>

              {/* Average Package */}
              <div className="group text-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-500"></div>
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-yellow-500/25 transition-all duration-300">
                  <Briefcase className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    {placementData.averageSalary}
                  </span>
                </div>
                <div className="text-gray-400 font-medium text-lg">Avg. Package</div>
                <div className="mt-4 w-full bg-gray-800 rounded-full h-1 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-1000 ease-out w-full" style={{ transitionDelay: '600ms' }}></div>
                </div>
              </div>
            </div>

            <div className="text-center mt-16">
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Join thousands of developers who have transformed their careers with DevElevate
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Leaderboard Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-full px-6 py-3 mb-6">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-gray-300">Top Performers</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  Placement Leaderboard
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Celebrating our highest achievers who landed dream packages and multiple offers
              </p>
            </div>

            <div className="bg-black/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top 3 Podium */}
                <div className="flex justify-center items-end space-x-4">
                  {/* 2nd Place */}
                  <div className="text-center">
                    <div className="relative mb-4">
                      <img
                        src={leaderboardData[1].image}
                        alt={leaderboardData[1].name}
                        className="w-20 h-20 rounded-full border-4 border-silver mx-auto"
                      />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                        <Medal className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-t from-gray-600 to-gray-500 rounded-t-lg p-4 h-24 flex flex-col justify-center">
                      <div className="text-white font-bold text-lg">#2</div>
                      <div className="text-gray-200 text-sm">{leaderboardData[1].name}</div>
                      <div className="text-gray-300 text-xs">{leaderboardData[1].package}</div>
                    </div>
                  </div>

                  {/* 1st Place */}
                  <div className="text-center">
                    <div className="relative mb-4">
                      <img
                        src={leaderboardData[0].image}
                        alt={leaderboardData[0].name}
                        className="w-24 h-24 rounded-full border-4 border-yellow-400 mx-auto"
                      />
                      <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                        <Crown className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-t from-yellow-600 to-yellow-500 rounded-t-lg p-4 h-32 flex flex-col justify-center">
                      <div className="text-white font-bold text-2xl">#1</div>
                      <div className="text-yellow-100 text-sm font-semibold">{leaderboardData[0].name}</div>
                      <div className="text-yellow-200 text-xs">{leaderboardData[0].package}</div>
                      <div className="text-yellow-300 text-xs">{leaderboardData[0].offers} offers</div>
                    </div>
                  </div>

                  {/* 3rd Place */}
                  <div className="text-center">
                    <div className="relative mb-4">
                      <img
                        src={leaderboardData[2].image}
                        alt={leaderboardData[2].name}
                        className="w-20 h-20 rounded-full border-4 border-orange-400 mx-auto"
                      />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-t from-orange-600 to-orange-500 rounded-t-lg p-4 h-20 flex flex-col justify-center">
                      <div className="text-white font-bold text-lg">#3</div>
                      <div className="text-orange-200 text-sm">{leaderboardData[2].name}</div>
                      <div className="text-orange-300 text-xs">{leaderboardData[2].package}</div>
                    </div>
                  </div>
                </div>

                {/* Leaderboard List */}
                <div className="space-y-4">
                  {leaderboardData.map((student,) => (
                    <div
                      key={student.id}
                      className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-purple-500/30 transition-all duration-300 hover:bg-gray-700/50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                          {getRankIcon(student.rank)}
                        </div>
                        <img
                          src={student.image}
                          alt={student.name}
                          className="w-12 h-12 rounded-full border-2 border-purple-500/30"
                        />
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{student.name}</h3>
                          <p className="text-gray-400 text-sm">{student.domain}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-bold">{student.package}</div>
                          <div className="text-gray-400 text-sm">{student.company}</div>
                          <div className="text-purple-400 text-xs">{student.offers} offers</div>
                        </div>
                        <div className="text-purple-400 font-bold text-lg">#{student.rank}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Placement Statistics Dashboard */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-6 py-3 mb-6">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-gray-300">Analytics Dashboard</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                  Placement Analytics
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Comprehensive insights into placement trends, department-wise statistics, and salary distributions
              </p>
            </div>

            {/* Chart Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-black/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-2 inline-flex space-x-2">
                <button
                  onClick={() => setActiveChart('trend')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${activeChart === 'trend'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                >
                  <LineChart className="w-4 h-4" />
                  <span>Year-wise Trend</span>
                </button>
                <button
                  onClick={() => setActiveChart('department')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${activeChart === 'department'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Department-wise</span>
                </button>
                <button
                  onClick={() => setActiveChart('salary')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${activeChart === 'salary'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                >
                  <PieChart className="w-4 h-4" />
                  <span>Salary Distribution</span>
                </button>
              </div>
            </div>

            {/* Charts Container */}
            <div className="bg-black/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 shadow-2xl">
              {/* Year-wise Trend Chart */}
              {activeChart === 'trend' && (
                <div className="h-96">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                    <span>Year-wise Placement Trend</span>
                  </h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={yearWiseTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="year" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '1px solid #6b7280',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="placements"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, fill: '#a855f7' }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Department-wise Chart */}
              {activeChart === 'department' && (
                <div className="h-96">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                    <BarChart3 className="w-6 h-6 text-blue-400" />
                    <span>Department-wise Placements</span>
                  </h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={departmentWise}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="department" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '1px solid #6b7280',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Bar dataKey="placements" radius={[4, 4, 0, 0]}>
                        {departmentWise.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Salary Distribution Chart */}
              {activeChart === 'salary' && (
                <div className="h-96">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                    <PieChart className="w-6 h-6 text-yellow-400" />
                    <span>Salary Range Distribution</span>
                  </h3>
                  <div className="flex items-center justify-center h-full">
                    <ResponsiveContainer width="60%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={salaryDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="count"
                        >
                          {salaryDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1f2937',
                            border: '1px solid #6b7280',
                            borderRadius: '8px',
                            color: '#fff'
                          }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                    <div className="space-y-3 ml-8">
                      {salaryDistribution.map((entry, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          ></div>
                          <span className="text-gray-300">{entry.range}</span>
                          <span className="text-white font-semibold">({entry.count})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-black/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Filter className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Filter Success Stories</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by name, company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-600 bg-gray-800/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Year Filter */}
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-600 bg-gray-800/50 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>

                {/* Domain Filter */}
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-600 bg-gray-800/50 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                >
                  {domains.map(domain => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </select>

                {/* Location Filter */}
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-600 bg-gray-800/50 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                >
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Alumni Testimonials */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full px-6 py-3 mb-6">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-gray-300">Success Stories</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Alumni Achievements
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Real stories from real people who transformed their careers with DevElevate
              </p>
            </div>

            {filteredTestimonials.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No alumni found</h3>
                <p className="text-gray-400">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTestimonials.map((alumni, index) => (
                  <div
                    key={alumni.id}
                    className="group bg-black/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="relative">
                        <img
                          src={alumni.image}
                          alt={alumni.name}
                          className="w-16 h-16 rounded-full border-4 border-gradient-to-r from-purple-500 to-blue-500"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-black"></div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-white">{alumni.name}</h3>
                        <p className="text-gray-400">{alumni.role}</p>
                        <p className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                          {alumni.company}
                        </p>
                        {alumni.salary && (
                          <p className="text-sm text-green-400 font-medium">{alumni.salary}</p>
                        )}
                      </div>
                    </div>

                    <blockquote className="text-gray-300 mb-6 italic leading-relaxed">
                      "{alumni.story}"
                    </blockquote>

                    <div className="flex flex-wrap gap-2">
                      <span className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                        <Calendar className="w-3 h-3" />
                        {alumni.year}
                      </span>
                      <span className="flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
                        <Briefcase className="w-3 h-3" />
                        {alumni.domain}
                      </span>
                      <span className="flex items-center gap-1 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                        <MapPin className="w-3 h-3" />
                        {alumni.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Top Recruiters */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-6 py-3 mb-6">
                <Building2 className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-300">Industry Partners</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Top Hiring Partners
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Trusted by the world's leading companies for top talent acquisition
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {topRecruiters.map((recruiter, index) => (
                <div
                  key={recruiter.id}
                  className="group bg-black/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105 hover:border-blue-500/30"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gray-800/50 rounded-xl group-hover:bg-gradient-to-r group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300">
                      <img
                        src={recruiter.logo}
                        alt={recruiter.name}
                        className="w-12 h-12 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.setAttribute('style', 'display: flex');
                        }}
                      />
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center text-white font-bold text-lg hidden">
                        {recruiter.name.charAt(0)}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{recruiter.name}</h3>
                    <p className="text-gray-400 mb-4">{recruiter.hiresCount} hires</p>
                    <a
                      href={recruiter.careersLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                    >
                      View Careers
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events Timeline */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-full px-6 py-3 mb-6">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-300">Upcoming Events</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Placement Calendar
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Stay updated with upcoming placement drives, tests, and interview schedules
              </p>
            </div>

            <div className="bg-black/50 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-8 shadow-2xl">
              <div className="space-y-6">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 hover:bg-gray-700/50"
                  >
                    <div className="flex items-center space-x-6">
                      {/* Event Icon */}
                      <div className={`w-16 h-16 bg-gradient-to-r ${getEventColor(event.type)} rounded-xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}>
                        {getEventIcon(event.type)}
                      </div>

                      {/* Event Details */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{event.title}</h3>
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                            {event.company}
                          </span>
                        </div>
                        <p className="text-gray-400 mb-2">
                          Eligibility: {event.eligibility.join(', ')}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Registration Open</span>
                          </div>
                        </div>
                      </div>

                      {/* Countdown Badge */}
                      <div className="text-center">
                        <div className={`px-4 py-2 bg-gradient-to-r ${getEventColor(event.type)} rounded-xl text-white font-bold text-lg mb-1`}>
                          {event.daysLeft}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {event.daysLeft === 1 ? 'day left' : 'days left'}
                        </div>
                      </div>
                    </div>

                    {/* Progress Line */}
                    <div className="absolute left-8 top-20 w-0.5 h-6 bg-gradient-to-b from-blue-500 to-transparent"
                      style={{ display: index === upcomingEvents.length - 1 ? 'none' : 'block' }}>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button className="group bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-semibold flex items-center space-x-2 mx-auto hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                  <Calendar className="w-5 h-5" />
                  <span>View Full Calendar</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section>
          <CTA />
        </section>
      </div>
      {/* Footer Section */}
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default PlacementStats;
