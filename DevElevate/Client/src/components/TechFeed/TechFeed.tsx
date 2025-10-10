import React, { useState, useEffect } from 'react';
import { Calendar, ExternalLink, Filter, Search, Bookmark, BookmarkCheck } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { format } from 'date-fns';

const TechFeed: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'tech' | 'jobs' | 'internships' | 'events'>('all');

  const categories = [
    { id: 'all', label: 'All Updates', count: state.newsItems.length },
    { id: 'tech', label: 'Tech News', count: state.newsItems.filter(item => item.category === 'tech').length },
    { id: 'jobs', label: 'Job Opportunities', count: state.newsItems.filter(item => item.category === 'jobs').length },
    { id: 'internships', label: 'Internships', count: state.newsItems.filter(item => item.category === 'internships').length },
    { id: 'events', label: 'Events', count: state.newsItems.filter(item => item.category === 'events').length }
  ];

  const sampleNewsItems = [
    {
      id: '1',
      title: 'React 19 Beta Released with Enhanced Hooks',
      summary: 'React team announces beta for version 19, featuring new hooks for better state management and performance optimizations.',
      url: 'https://react.dev/blog/2025/10/05/react-19-beta',
      publishDate: new Date('2025-10-05').toISOString(),
      category: 'tech' as const
    },
    {
      id: '2',
      title: 'Google AI Internship Program - Winter 2026',
      summary: 'Google opens applications for AI-focused internships, offering hands-on experience in machine learning projects.',
      url: 'https://careers.google.com/internships',
      publishDate: new Date('2025-10-08').toISOString(),
      category: 'internships' as const
    },
    {
      id: '3',
      title: 'Apple Hiring Senior ML Engineers in Cupertino',
      summary: 'Apple seeks experienced machine learning engineers to work on next-gen Siri and AI features.',
      url: 'https://jobs.apple.com/en-us/details/200564789/senior-machine-learning-engineer',
      publishDate: new Date('2025-10-09').toISOString(),
      category: 'jobs' as const
    },
    {
      id: '4',
      title: 'CES 2026 Preview Event in Las Vegas',
      summary: 'Annual Consumer Electronics Show announces preview sessions for emerging tech trends in 2026.',
      url: 'https://www.ces.tech/',
      publishDate: new Date('2025-10-07').toISOString(),
      category: 'events' as const
    },
    {
      id: '5',
      title: 'Nvidia Unveils RTX 50 Series GPUs',
      summary: 'Nvidia launches new GPU lineup with advanced ray tracing and AI acceleration capabilities.',
      url: 'https://www.nvidia.com/en-us/geforce/news/rtx-50-series/',
      publishDate: new Date('2025-10-10').toISOString(),
      category: 'tech' as const
    },
    {
      id: '6',
      title: 'Meta Software Engineering Internship - Summer 2026',
      summary: 'Meta invites applications for internships in AR/VR development and social platform engineering.',
      url: 'https://www.metacareers.com/jobs/internships/',
      publishDate: new Date('2025-10-06').toISOString(),
      category: 'internships' as const
    },
    {
      id: '7',
      title: 'Amazon Web Services Cloud Architect Positions Open',
      summary: 'AWS is recruiting cloud architects for remote and on-site roles across multiple regions.',
      url: 'https://www.amazon.jobs/en/teams/aws',
      publishDate: new Date('2025-10-04').toISOString(),
      category: 'jobs' as const
    },
    {
      id: '8',
      title: 'Web Summit 2025 in Lisbon',
      summary: 'World\'s largest tech conference gathers innovators for discussions on future technologies.',
      url: 'https://websummit.com/',
      publishDate: new Date('2025-10-03').toISOString(),
      category: 'events' as const
    },
    {
      id: '9',
      title: 'Microsoft Azure Updates with New AI Tools',
      summary: 'Microsoft rolls out AI-enhanced tools for Azure, improving cloud computing efficiency.',
      url: 'https://azure.microsoft.com/en-us/blog/',
      publishDate: new Date('2025-10-02').toISOString(),
      category: 'tech' as const
    },
    {
      id: '10',
      title: 'Tesla Engineering Internship Opportunities',
      summary: 'Tesla offers internships in autonomous driving and battery technology for students.',
      url: 'https://www.tesla.com/careers/internships',
      publishDate: new Date('2025-10-01').toISOString(),
      category: 'internships' as const
    },
    {
      id: '11',
      title: 'IBM Data Scientist Roles Available Worldwide',
      summary: 'IBM is hiring data scientists with expertise in quantum computing and AI analytics.',
      url: 'https://www.ibm.com/careers/',
      publishDate: new Date('2025-10-09').toISOString(),
      category: 'jobs' as const
    },
    {
      id: '12',
      title: 'TechCrunch Disrupt 2025 Conference',
      summary: 'Startup battlefield and tech talks at the annual Disrupt event in San Francisco.',
      url: 'https://techcrunch.com/events/disrupt-2025/',
      publishDate: new Date('2025-10-08').toISOString(),
      category: 'events' as const
    },
    {
      id: '13',
      title: 'OpenAI Releases GPT-5 Preview',
      summary: 'Early access to GPT-5 showcases improved reasoning and multimodal capabilities.',
      url: 'https://openai.com/blog/gpt-5-preview',
      publishDate: new Date('2025-10-07').toISOString(),
      category: 'tech' as const
    },
    {
      id: '14',
      title: 'Adobe Design Internship Program',
      summary: 'Adobe seeks creative interns for UI/UX design projects in digital media tools.',
      url: 'https://www.adobe.com/careers/internships.html',
      publishDate: new Date('2025-10-06').toISOString(),
      category: 'internships' as const
    },
    {
      id: '15',
      title: 'Cisco Network Engineer Jobs in Research Triangle',
      summary: 'Cisco expands team with network engineering positions focusing on cybersecurity.',
      url: 'https://jobs.cisco.com/',
      publishDate: new Date('2025-10-05').toISOString(),
      category: 'jobs' as const
    },
    {
      id: '16',
      title: 'GDC 2026 Game Developers Conference',
      summary: 'Annual gathering for game devs with workshops on VR and AI in gaming.',
      url: 'https://gdconf.com/',
      publishDate: new Date('2025-10-04').toISOString(),
      category: 'events' as const
    },
    {
      id: '17',
      title: 'Samsung Galaxy S26 Leaks Emerge',
      summary: 'Rumors suggest advanced camera AI and foldable innovations in upcoming flagship.',
      url: 'https://www.samsung.com/us/smartphones/galaxy-s/',
      publishDate: new Date('2025-10-03').toISOString(),
      category: 'tech' as const
    },
    {
      id: '18',
      title: 'Netflix Content Engineering Internships',
      summary: 'Internships available in streaming tech and recommendation algorithms at Netflix.',
      url: 'https://jobs.netflix.com/internships',
      publishDate: new Date('2025-10-02').toISOString(),
      category: 'internships' as const
    },
    {
      id: '19',
      title: 'Oracle Database Administrator Positions',
      summary: 'Oracle hiring DBAs for cloud database management and optimization roles.',
      url: 'https://www.oracle.com/careers/',
      publishDate: new Date('2025-10-01').toISOString(),
      category: 'jobs' as const
    },
    {
      id: '20',
      title: 'SXSW 2026 Interactive Festival',
      summary: 'Tech and culture fusion event with panels on emerging digital trends.',
      url: 'https://www.sxsw.com/',
      publishDate: new Date('2025-10-10').toISOString(),
      category: 'events' as const
    },
    {
      id: '21',
      title: 'AMD Ryzen 9000 Series Processors Announced',
      summary: 'New CPUs promise better performance for gaming and AI workloads.',
      url: 'https://www.amd.com/en/products/processors/desktops/ryzen.html',
      publishDate: new Date('2025-10-09').toISOString(),
      category: 'tech' as const
    },
    {
      id: '22',
      title: 'Spotify Data Analyst Internships',
      summary: 'Intern positions in music data analytics and user behavior studies at Spotify.',
      url: 'https://www.lifeatspotify.com/students',
      publishDate: new Date('2025-10-08').toISOString(),
      category: 'internships' as const
    },
    {
      id: '23',
      title: 'Salesforce CRM Developer Jobs',
      summary: 'Salesforce seeks developers for custom CRM solutions and integrations.',
      url: 'https://www.salesforce.com/company/careers/',
      publishDate: new Date('2025-10-07').toISOString(),
      category: 'jobs' as const
    },
    {
      id: '24',
      title: 'Mobile World Congress 2026',
      summary: 'Global mobile industry event showcasing 6G and IoT advancements.',
      url: 'https://www.mwcbarcelona.com/',
      publishDate: new Date('2025-10-06').toISOString(),
      category: 'events' as const
    },
    {
      id: '25',
      title: 'Huawei Mate 70 Pro Launch',
      summary: 'Huawei unveils flagship with HarmonyOS Next and advanced photography.',
      url: 'https://consumer.huawei.com/en/phones/mate70/',
      publishDate: new Date('2025-10-05').toISOString(),
      category: 'tech' as const
    },
    {
      id: '26',
      title: 'Airbnb Product Management Internships',
      summary: 'Internships in product strategy and user experience design at Airbnb.',
      url: 'https://careers.airbnb.com/university/',
      publishDate: new Date('2025-10-04').toISOString(),
      category: 'internships' as const
    },
    {
      id: '27',
      title: 'Intel Foundry Services Expansion Hiring',
      summary: 'Intel recruits for semiconductor manufacturing and design roles.',
      url: 'https://jobs.intel.com/',
      publishDate: new Date('2025-10-03').toISOString(),
      category: 'jobs' as const
    },
    {
      id: '28',
      title: 'Defcon 33 Hacking Conference',
      summary: 'Annual cybersecurity event with talks on ethical hacking and defense.',
      url: 'https://defcon.org/',
      publishDate: new Date('2025-10-02').toISOString(),
      category: 'events' as const
    },
    {
      id: '29',
      title: 'Sony PlayStation 6 Rumors',
      summary: 'Speculations on next-gen console with enhanced VR and cloud gaming.',
      url: 'https://www.playstation.com/en-us/ps6/',
      publishDate: new Date('2025-10-01').toISOString(),
      category: 'tech' as const
    },
    {
      id: '30',
      title: 'Uber Autonomous Vehicle Internships',
      summary: 'Intern opportunities in self-driving tech and mapping at Uber.',
      url: 'https://www.uber.com/us/en/careers/list/?team=University',
      publishDate: new Date('2025-10-10').toISOString(),
      category: 'internships' as const
    },
    {
      id: '31',
      title: 'VMware Virtualization Specialist Jobs',
      summary: 'VMware hiring for cloud virtualization and hybrid infrastructure roles.',
      url: 'https://careers.vmware.com/',
      publishDate: new Date('2025-10-09').toISOString(),
      category: 'jobs' as const
    },
    {
      id: '32',
      title: 'Adobe Summit 2026',
      summary: 'Digital experience conference with AI in marketing sessions.',
      url: 'https://summit.adobe.com/',
      publishDate: new Date('2025-10-08').toISOString(),
      category: 'events' as const
    },
    {
      id: '33',
      title: 'Qualcomm Snapdragon 8 Gen 4 Chipset',
      summary: 'New mobile processor boosts AI performance in smartphones.',
      url: 'https://www.qualcomm.com/products/mobile/snapdragon',
      publishDate: new Date('2025-10-07').toISOString(),
      category: 'tech' as const
    },
    {
      id: '34',
      title: 'LinkedIn Marketing Internships',
      summary: 'Internships in social media marketing and B2B strategies at LinkedIn.',
      url: 'https://careers.linkedin.com/students',
      publishDate: new Date('2025-10-06').toISOString(),
      category: 'internships' as const
    },
    {
      id: '35',
      title: 'SAP ERP Consultant Positions',
      summary: 'SAP seeks consultants for enterprise resource planning implementations.',
      url: 'https://jobs.sap.com/',
      publishDate: new Date('2025-10-05').toISOString(),
      category: 'jobs' as const
    },
    {
      id: '36',
      title: 'Dreamforce 2025 Salesforce Event',
      summary: 'Annual Salesforce conference with CRM and AI innovations.',
      url: 'https://www.salesforce.com/dreamforce/',
      publishDate: new Date('2025-10-04').toISOString(),
      category: 'events' as const
    },
    {
      id: '37',
      title: 'TSMC 2nm Process Node Advances',
      summary: 'TSMC announces progress in 2nm chip manufacturing technology.',
      url: 'https://www.tsmc.com/english/news-events',
      publishDate: new Date('2025-10-03').toISOString(),
      category: 'tech' as const
    },
    {
      id: '38',
      title: 'PayPal Fintech Internships',
      summary: 'Intern positions in payment systems and blockchain at PayPal.',
      url: 'https://www.paypal.com/us/webapps/mpp/jobs/internships',
      publishDate: new Date('2025-10-02').toISOString(),
      category: 'internships' as const
    },
    {
      id: '39',
      title: 'Red Hat Linux Administrator Jobs',
      summary: 'Red Hat hiring for open-source OS administration and support roles.',
      url: 'https://www.redhat.com/en/jobs',
      publishDate: new Date('2025-10-01').toISOString(),
      category: 'jobs' as const
    },
    {
      id: '40',
      title: 'Black Hat USA 2026',
      summary: 'Cybersecurity training and briefings event in Las Vegas.',
      url: 'https://www.blackhat.com/',
      publishDate: new Date('2025-10-10').toISOString(),
      category: 'events' as const
    },
    {
      id: '41',
      title: 'Arm Neoverse V3 CPU Cores',
      summary: 'Arm launches new CPU cores for high-performance computing and servers.',
      url: 'https://www.arm.com/products/cpu/neoverse',
      publishDate: new Date('2025-10-09').toISOString(),
      category: 'tech' as const
    },
    {
      id: '42',
      title: 'Square Payment Processing Internships',
      summary: 'Internships in fintech and merchant services at Square.',
      url: 'https://squareup.com/us/en/careers',
      publishDate: new Date('2025-10-08').toISOString(),
      category: 'internships' as const
    },
    {
      id: '43',
      title: 'ServiceNow IT Service Management Jobs',
      summary: 'ServiceNow recruits for ITSM platform development and support.',
      url: 'https://careers.servicenow.com/',
      publishDate: new Date('2025-10-07').toISOString(),
      category: 'jobs' as const
    },
    {
      id: '44',
      title: 'Google I/O 2026 Developer Conference',
      summary: 'Annual event showcasing Android and AI developments.',
      url: 'https://io.google/2026/',
      publishDate: new Date('2025-10-06').toISOString(),
      category: 'events' as const
    },
    {
      id: '45',
      title: 'Broadcom Ethernet Switch Innovations',
      summary: 'Broadcom introduces new switches for data center networking.',
      url: 'https://www.broadcom.com/products/ethernet-connectivity',
      publishDate: new Date('2025-10-05').toISOString(),
      category: 'tech' as const
    },
    {
      id: '46',
      title: 'Zoom Video Communications Internships',
      summary: 'Intern opportunities in video tech and collaboration tools at Zoom.',
      url: 'https://explore.zoom.us/en/careers/',
      publishDate: new Date('2025-10-04').toISOString(),
      category: 'internships' as const
    },
    {
      id: '47',
      title: 'Splunk Security Analyst Positions',
      summary: 'Splunk hiring for SIEM and threat detection roles.',
      url: 'https://www.splunk.com/en_us/careers.html',
      publishDate: new Date('2025-10-03').toISOString(),
      category: 'jobs' as const
    },
    {
      id: '48',
      title: 'Apple WWDC 2026',
      summary: 'Worldwide Developers Conference with iOS and macOS updates.',
      url: 'https://developer.apple.com/wwdc/',
      publishDate: new Date('2025-10-02').toISOString(),
      category: 'events' as const
    },
    {
      id: '49',
      title: 'MediaTek Dimensity 9400 SoC',
      summary: 'New chipset for premium smartphones with enhanced 5G and AI.',
      url: 'https://www.mediatek.com/products/smartphones/dimensity-9400',
      publishDate: new Date('2025-10-01').toISOString(),
      category: 'tech' as const
    },
    {
      id: '50',
      title: 'Dropbox File Sync Engineering Internships',
      summary: 'Internships in cloud storage and collaboration at Dropbox.',
      url: 'https://www.dropbox.com/jobs/internships',
      publishDate: new Date('2025-10-10').toISOString(),
      category: 'internships' as const
    }
  ];

  useEffect(() => {
    if (state.newsItems.length === 0) {
      fetch("/api/techfeed/latest")
        .then((res) => res.json())
        .then((data) => {
          const formatted = data.map(
            (a: any, index: number) => ({
              id: String(index + 1),
              title: a.title,
              summary: a.description || "",
              url: a.url,
              publishDate: a.publishedAt,
              category: a.category.toLowerCase(),
            }));
          dispatch({ type: 'UPDATE_NEWS', payload: formatted });
        })
        .catch((err) => {
          console.error("Error fetching tech feed:", err);
          dispatch({ type: 'UPDATE_NEWS', payload: sampleNewsItems });
        });
    }
  }, [state.newsItems.length, dispatch]);

  const filteredItems = state.newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tech':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'jobs':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'internships':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'events':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const toggleBookmark = (itemId: string) => {
    if (state.bookmarks.includes(itemId)) {
      dispatch({ type: 'REMOVE_BOOKMARK', payload: itemId });
    } else {
      dispatch({ type: 'ADD_BOOKMARK', payload: itemId });
    }
  };

  return (
    <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className={`text-4xl font-bold  tracking-tight leading-tight mb-3 transition-colors duration-200 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            Tech Feed & Career Updates
          </h1>
          <p className={`text-lg font-medium transition-colors duration-200 ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Stay updated with the latest in tech news, jobs, and opportunities
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col items-stretch gap-4 mb-8 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search news and updates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg shadow-sm border transition-colors duration-200 ${state.darkMode
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className={`px-4 py-2 rounded-lg shadow-sm border transition-colors duration-200 ${state.darkMode
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label} ({category.count})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedCategory === category.id
                ? 'bg-blue-500 text-white'
                : state.darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>

        {/* News Items */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className={`${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(item.category)}`}>
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{format(new Date(item.publishDate), 'MMM dd')}</span>
                  </div>
                  <button
                    onClick={() => toggleBookmark(item.id)}
                    className={`p-1 rounded-full transition-colors ${state.bookmarks.includes(item.id)
                      ? 'text-yellow-500 hover:text-yellow-600'
                      : 'text-gray-400 hover:text-gray-600'
                      }`}
                  >
                    {state.bookmarks.includes(item.id) ? (
                      <BookmarkCheck className="w-4 h-4" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <h3 className={`text-lg font-semibold mb-3 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                {item.title}
              </h3>

              <p className={`text-sm mb-4 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {item.summary}
              </p>

              <div className="flex items-center justify-between">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 font-medium text-blue-500 hover:text-blue-600"
                >
                  <span>Read More</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <div className="flex items-center space-x-2">
                  <button className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${state.darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-12 text-center">
            <Search className={`w-12 h-12 mx-auto mb-4 ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <h3 className={`text-lg font-medium mb-2 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
              No items found
            </h3>
            <p className={`${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Try adjusting your search terms or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechFeed;