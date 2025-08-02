// import React, { useState, useEffect } from 'react';
// import { useGlobalState } from '../../contexts/GlobalContext';
// import { FileText, Download, Users, Calendar, Target, BookOpen, ExternalLink } from 'lucide-react';

// const PlacementPrep: React.FC = () => {
//   const { state } = useGlobalState();
//   const [selectedTab, setSelectedTab] = useState('opportunities');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [debouncedSearch, setDebouncedSearch] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All Categories');

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedSearch(searchTerm);
//     }, 300);
//     return () => clearTimeout(handler);
//   }, [searchTerm]);

//   const tabs = [
//     { id: 'opportunities', label: 'Job Opportunities', icon: Users },
//     { id: 'interviews', label: 'Interview Prep', icon: Target },
//     { id: 'resources', label: 'Resources', icon: BookOpen },
//     { id: 'mock', label: 'Mock Interviews', icon: Calendar }
//   ];

//   const jobOpportunities = [
//     {
//       company: 'Google',
//       position: 'Software Engineer',
//       location: 'Mountain View, CA',
//       type: 'Full-time',
//       deadline: '2024-03-15',
//       description: 'Join our team to build products that help create opportunities for everyone.',
//       requirements: ['BS/MS in Computer Science', '3+ years experience', 'Strong coding skills'],
//       salary: '$120,000 - $180,000',
//       category: 'Product Based'
//     },
//     {
//       company: 'Microsoft',
//       position: 'AI Engineer',
//       location: 'Seattle, WA',
//       type: 'Full-time',
//       deadline: '2024-03-20',
//       description: 'Work on cutting-edge AI technologies and machine learning systems.',
//       requirements: ['MS in AI/ML', 'Experience with Python/TensorFlow', 'Research background'],
//       salary: '$130,000 - $200,000',
//       category: 'Product Based'
//     },
//     {
//       company: 'Amazon',
//       position: 'SDE Intern',
//       location: 'Multiple Locations',
//       type: 'Internship',
//       deadline: '2024-02-28',
//       description: 'Summer internship program for software development engineers.',
//       requirements: ['Currently pursuing CS degree', 'Strong programming skills', 'Problem-solving ability'],
//       salary: '$8,000/month',
//       category: 'Internship'
//     },
//     {
//       company: 'TCS',
//       position: 'Software Developer',
//       location: 'Bangalore, India',
//       type: 'Full-time',
//       deadline: '2024-04-01',
//       description: 'Join our digital transformation initiatives across various industries.',
//       requirements: ['BE/BTech in any stream', 'Good communication skills', 'Aptitude for programming'],
//       salary: '₹3.5 - 7 LPA',
//       category: 'Mass Recruiter'
//     }
//   ];

//  fix-my-change
//   const interviewQuestions = [
//     {
//       category: 'Technical',
//       questions: [
//         'Explain the difference between == and === in JavaScript',
//         'What is time complexity and how do you calculate it?',
//         'Implement a binary search algorithm',
//         'Explain the concept of closures in JavaScript',
//         'What are the different types of joins in SQL?'
//       ]
//     },
//     {
//       category: 'HR',
//       questions: [
//         'Tell me about yourself',
//         'Why do you want to work here?',
//         'What are your strengths and weaknesses?',
//         'Where do you see yourself in 5 years?',
//         'Why are you leaving your current job?'
//       ]
//     },
//     {
//       category: 'Behavioral',
//       questions: [
//         'Describe a challenging project you worked on',
//         'How do you handle tight deadlines?',
//         'Tell me about a time you had to work with a difficult team member',
//         'Describe a situation where you had to learn something new quickly',
//         'How do you prioritize tasks when everything seems urgent?'
//       ]
//     }
//   ];

//   const resources = [
//     {
//       title: 'Complete Interview Preparation Guide',
//       description: 'Comprehensive guide covering technical and HR interview preparation',
//       type: 'PDF',
//       size: '2.5 MB',
//       downloads: 1250
//     },
//     {
//       title: 'System Design Interview Handbook',
//       description: 'Learn how to design scalable systems for tech interviews',
//       type: 'PDF',
//       size: '3.8 MB',
//       downloads: 980
//     },
//     {
//       title: 'DSA Cheat Sheet',
//       description: 'Quick reference for data structures and algorithms',
//       type: 'PDF',
//       size: '1.2 MB',
//       downloads: 2100
//     },
//     {
//       title: 'Behavioral Interview Questions Bank',
//       description: 'Common behavioral questions with sample answers',
//       type: 'PDF',
//       size: '1.8 MB',
//       downloads: 750
//     }
//   ];

//   const renderOpportunities = () => (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
//         <h3 className={`text-xl font-bold tracking-tight ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
//           Latest Job Opportunities
//         </h3>
//         <select className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2  ${
//           state.darkMode
//             ? 'bg-gray-800 border-gray-700 text-white focus:ring-gray-600'
//             : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-300'
//         }`}>
//           <option>All Categories</option>
//           <option>Product Based</option>
//           <option>Mass Recruiter</option>
//           <option>Internship</option>
//         </select>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {jobOpportunities.map((job, index) => (
//           <div
//             key={index}
//             className={`p-6 rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-200  ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-md transition-shadow`}
//           >
//             <div className="flex justify-between items-start mb-3">
//               <div>
//                 <h4 className={`text-lg font-semibold tracking-tight ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
//                   {job.position}
//                 </h4>
//                 <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                   {job.company} • {job.location}
//                 </p>
//               </div>
//               <span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
//                 job.type === 'Internship'
//                   ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
//                   : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
//               }`}>
//                 {job.type}
//               </span>
//             </div>

//             <p className={`text-sm leading-relaxed mb-4 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//               {job.description}
//             </p>

//             <div className="mb-4">
//               <h5 className={`text-sm font-semibold mb-2 ${state.darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
//                 Requirements:
//               </h5>
//               <ul className="text-sm space-y-1 pl-1">
//                 {job.requirements.map((req, reqIndex) => (
//                   <li key={reqIndex} className={`flex items-start space-x-2 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                     <div className="w-1 h-1 bg-current rounded-full shrink-0"></div>
//                     <span>{req}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="flex justify-between items-center mt-4">
//               <div>
//                 <span className={`text-sm font-semibold ${state.darkMode ? 'text-green-400' : 'text-green-600'}`}>
//                   {job.salary}
//                 </span>
//                 <p className={`text-xs mt-1 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                   Deadline: {job.deadline}
//                 </p>
//               </div>
//               <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors">
//                 <ExternalLink className="w-4 h-4" />
//                 <span>Apply</span>
//               </button>
//             </div>

//   const renderOpportunities = () => {
//     const filteredJobs = jobOpportunities.filter((job) => {
//       const matchesCategory =
//         selectedCategory === 'All Categories' || job.category === selectedCategory;

//       const matchesSearch =
//         job.position.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
//         job.company.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
//         job.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
//         job.requirements.some(req => req.toLowerCase().includes(debouncedSearch.toLowerCase()));

//       return matchesCategory && matchesSearch;
//     });

//     return (
//       <div className="space-y-6">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <h3 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
//             Latest Job Opportunities
//           </h3>

//           <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
//             {/* Category Filter */}
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className={`px-4 py-2 rounded-lg border ${
//                 state.darkMode
//                   ? 'bg-gray-800 border-gray-700 text-white'
//                   : 'bg-white border-gray-300 text-gray-900'
//               }`}
//             >
//               <option>All Categories</option>
//               <option>Product Based</option>
//               <option>Mass Recruiter</option>
//               <option>Internship</option>
//             </select>

//             {/* Search Input with Emoji */}
//             <div className="relative w-full sm:w-64">
//               <input
//                 type="text"
//                 placeholder="Search by role or tech stack..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className={`w-full pr-10 px-4 py-2 rounded-lg border ${
//                   state.darkMode
//                     ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
//                     : 'bg-white border-gray-300 text-gray-900'
//                 }`}
//               />
//               <span
//                 className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xl ${
//                   state.darkMode ? 'text-gray-400' : 'text-gray-500'
//                 }`}
//               >
//                 🔍
//               </span>
//             </div>
//  main
//           </div>
//         </div>

// fix-my-change
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {interviewQuestions.map((category, index) => (
//           <div
//             key={index}
//             className={`p-6 rounded-2xl shadow-sm border transition-all hover:shadow-md ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
//           >
//             <h4 className={`text-lg font-semibold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
//               {category.category} Questions
//             </h4>
//             <div className="space-y-3">
//               {category.questions.map((question, qIndex) => (
//                 <div
//                   key={qIndex}
//                   className={`p-3 rounded-lg ${state.darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-700'}`}
//                 >
//                   <p className={`text-sm leading-relaxed${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                     {question}
//                   </p>
//                 </div>
//               ))}
//             </div>
//             <button className="w-full mt-5 px-4 py-2 text-sm font-medium rounded-xl 
//     bg-blue-500 hover:bg-blue-600 text-white transition-colors 
//     focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
//               View All {category.category} Questions
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const renderResources = () => (
//     <div className="space-y-6">
//       <h3 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
//         Download Resources
//       </h3>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {resources.map((resource, index) => (
//           <div
//             key={index}
//             className={`p-6 rounded-lg border  transform transition-all duration-200  ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-lg transition-y-1`}
//           >
//             <div className="flex items-start space-x-4">
//               <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
//                 <FileText className="w-6 h-6 text-blue-600 dark:text-blue-300" />
//               </div>
//               <div className="flex-1">
//                 <h4 className={`text-lg font-semibold mb-2 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
//                   {resource.title}
//                 </h4>
//                 <p className={`text-sm mb-3 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                   {resource.description}
//                 </p>
//                 <div className="flex items-center justify-between">
//                   <div className="flex flex-wrap items-center  gap-4 text-sm">
//                     <span className={`${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                      📄 {resource.type} • {resource.size}
//                     </span>
//                     <span className={`${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                       ⬇️ {resource.downloads} downloads
//                     </span>
//                   </div>
//                   <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-all">
//                     <Download className="w-4 h-4" />
//                     <span>Download</span>
//                   </button>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {filteredJobs.map((job, index) => (
//             <div
//               key={index}
//               className={`p-6 rounded-lg border ${
//                 state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
//               } hover:shadow-md transition-shadow`}
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h4 className={`text-lg font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
//                     {job.position}
//                   </h4>
//                   <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                     {job.company} • {job.location}
//                   </p>
//                 </div>
//                 <span className={`px-2 py-1 rounded-full text-xs ${
//                   job.type === 'Internship'
//                     ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
//                     : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
//                 }`}>
//                   {job.type}
//                 </span>
//               </div>

//               <p className={`text-sm mb-3 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                 {job.description}
//               </p>

//               <div className="mb-3">
//                 <h5 className={`text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                   Requirements:
//                 </h5>
//                 <ul className="text-sm space-y-1">
//                   {job.requirements.map((req, reqIndex) => (
//                     <li key={reqIndex} className={`flex items-center space-x-2 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                       <div className="w-1 h-1 bg-current rounded-full"></div>
//                       <span>{req}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="flex justify-between items-center">
//                 <div>
//                   <span className={`text-sm font-medium ${state.darkMode ? 'text-green-400' : 'text-green-600'}`}>
//                     {job.salary}
//                   </span>
//                   <p className={`text-xs ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                     Deadline: {job.deadline}
//                   </p>
//  main
//                 </div>
//                 <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
//                   <ExternalLink className="w-4 h-4" />
//                   <span>Apply</span>
//                 </button>
//               </div>
//             </div>
//  fix-my-change
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const renderMockInterviews = () => (
//     <div className="space-y-6">
//       <h3 className={`text-xl font-semibold tracking-tight ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
//         Mock Interview Practice
//       </h3>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className={`p-6 rounded-2xl border shadow-sm transition-all duration-200 ${state.darkMode ? 'bg-gray-800 border-gray-700 hover:shadow-md' : 'bg-white border-gray-200 hover:shadow-lg'}`}>
//           <h4 className={`text-xl font-semibold mb-3 tracking-tight ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
//             🤖 AI Mock Interview
//           </h4>
//           <p className={`text-sm mb-4 leading-relaxed ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//             Practice with our AI interviewer. Get instant feedback on your answers and improve your performance.
//           </p>
//           <div className="space-y-3 mb-4">
//             <div className="flex items-center justify-between text-sm">
//               <span className={`text-sm ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Technical Questions</span>
//               <span className="text-sm text-green-500 font-medium">Available</span>
//             </div>
//             <div className="flex items-center justify-between text-sm">
//               <span className={`text-sm ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>HR Questions</span>
//               <span className="text-sm text-green-500 font-medium">Available</span>
//             </div>
//             <div className="flex items-center justify-between text-sm">
//               <span className={`text-sm ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Behavioral Questions</span>
//               <span className="text-sm text-green-500 font-medium">Available</span>
//             </div>
//           </div>
//           <button className="w-full mt-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all duration-150">
//            🚀 Start AI Mock Interview
//           </button>
//         </div>

//         <div className={`p-6 rounded-2xl border shadow-sm transition-all duration-200 ${state.darkMode ? 'bg-gray-800 border-gray-700 hover:shadow-md' : 'bg-white border-gray-200 hover:shadow-lg'}`}>
//           <h4 className={`text-sl font-semibold mb-3 tracking-tight ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
//             👥 Peer Mock Interview
//           </h4>
//           <p className={`text-sm mb-5 leading-relaxed ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//             Practice with other users. Take turns being the interviewer and interviewee.
//           </p>
//           <div className="space-y-3 mb-4">
//             <div className="flex items-center justify-between text-sm">
//               <span className={`${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Active Users</span>
//               <span className="text-blue-500 font-medium">23 online</span>
//             </div>
//             <div className="flex items-center justify-between text-sm">
//               <span className={`${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Avg. Wait Time</span>
//               <span className="text-orange-500 font-medium">2 minutes</span>
//             </div>
//             <div className="flex items-center justify-between text-sm">
//               <span className={`${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Sessions Today</span>
//               <span className="text-green-500 font-medium">156</span>
//             </div>
//           </div>
//           <button className="w-full mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-150">
//             Find Interview Partner
//           </button>

//           ))}
//  main
//         </div>
//       </div>
//     );
//   };

//   // Placeholder functions for the rest of the tabs (keep your original implementations)
//   const renderInterviews = () => <div>Interview Prep Content</div>;
//   const renderResources = () => <div>Resources Content</div>;
//   const renderMockInterviews = () => <div>Mock Interview Content</div>;

//   return (
//     <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-sky-50 to-white'} transition-colors duration-300`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="mb-10">
//           <h1 className={`text-3xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
//            Placement Preparation Arena
//           </h1>
//           <p className={`text-lg sm:text-xl ${state.darkMode ? 'text-gray-300' : 'text-gray-700'} max-w-3xl`}>
//             Everything you need to ace your job interviews and land your dream job
//           </p>
//         </div>

//         {/* Tabs */}
//         <div className="mb-8">
//           <div className="flex flex-wrap gap-3">
//             {tabs.map(tab => {
//               const Icon = tab.icon;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setSelectedTab(tab.id)}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium shadow-sm transition-all duration-200 border ${
//                     selectedTab === tab.id
//                       ? 'bg-blue-600 text-white border-blue-600 scale-105'
//                       : state.darkMode
//                       ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-700'
//                       : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
//                   }`}
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span>{tab.label}</span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Tab Content */}
// fix-my-change
//         <div className={`rounded-2xl p-6 transition-all duration-300 shadow-md border ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} `}>
//           {renderTabContent()}

//         <div className={`${state.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
//           {selectedTab === 'opportunities' && renderOpportunities()}
//           {selectedTab === 'interviews' && renderInterviews()}
//           {selectedTab === 'resources' && renderResources()}
//           {selectedTab === 'mock' && renderMockInterviews()}
//  main
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlacementPrep;



const PlacementPrep = () => {
  return (
    <div>
      {/* This component is temporarily disabled due to a build error in the main branch. */}
    </div>
  );
};

export default PlacementPrep;