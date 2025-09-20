import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  GitFork,
  AlertCircle,
  Users,
  Clock,
  Code2,
  ExternalLink,
  GitPullRequest,
  Scale,
  Eye,
  Languages,
} from "lucide-react";

const GITHUB_USER = "abhisek2004";
const GITHUB_REPO = "Dev-Elevate";

const TechStackAndStats: React.FC = () => {
  const [stats, setStats] = useState({
    stars: 0,
    forks: 0,
    issues: 0,
    contributors: 0,
    lastCommit: "N/A",
    size: 0,
    pullRequests: 0,
    releases: 0,
    license: "N/A",
    watchers: 0,
    languages: {},
  });

  useEffect(() => {
    async function fetchGitHubStats() {
      const headers = { 'Accept': 'application/vnd.github+json' };
      try {
        const repoRes = await fetch(
          `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}`,
          { headers }
        );
        if (!repoRes.ok) throw new Error(`HTTP error! status: ${repoRes.status}`);
        const repoData = await repoRes.json();

        const contributorsRes = await fetch(
          `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contributors?per_page=100`,
          { headers }
        );
        if (!contributorsRes.ok) throw new Error(`HTTP error! status: ${contributorsRes.status}`);
        const contributorsData = await contributorsRes.json();

        const pullsRes = await fetch(
          `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/pulls?state=open`,
          { headers }
        );
        if (!pullsRes.ok) throw new Error(`HTTP error! status: ${pullsRes.status}`);
        const pullsData = await pullsRes.json();

        const releasesRes = await fetch(
          `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/releases`,
          { headers }
        );
        if (!releasesRes.ok) throw new Error(`HTTP error! status: ${releasesRes.status}`);
        const releasesData = await releasesRes.json();

        const languagesRes = await fetch(
          `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/languages`,
          { headers }
        );
        if (!languagesRes.ok) throw new Error(`HTTP error! status: ${languagesRes.status}`);
        const languagesData = await languagesRes.json();

        setStats({
          stars: repoData.stargazers_count || 0,
          forks: repoData.forks_count || 0,
          issues: repoData.open_issues_count || 0,
          contributors: Array.isArray(contributorsData)
            ? contributorsData.length
            : 0,
          lastCommit: repoData.pushed_at
            ? new Date(repoData.pushed_at).toLocaleDateString("en-GB")
            : "N/A",
          size: repoData.size || 0,
          pullRequests: Array.isArray(pullsData) ? pullsData.length : 0,
          releases: Array.isArray(releasesData) ? releasesData.length : 0,
          license: repoData.license?.spdx_id || "N/A",
          watchers: repoData.subscribers_count || 0,
          languages: languagesData || {},
        });
      } catch (err) {
        console.error("Error fetching GitHub stats:", err);
      }
    }

    fetchGitHubStats();
  }, []);

  // Updated technologies based on README
  const technologies = [
    { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Tailwind CSS', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1280px-Tailwind_CSS_Logo.svg.png' },
    { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'JWT', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg' }, // Proxy for JWT
    { name: 'GPT-4 API', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' }, // Proxy for AI
    { name: 'Axios', logo: 'https://axios-http.com/assets/logo.svg' }, // Custom if devicon doesn't have
    { name: 'Shadcn UI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' }, // Proxy
    { name: 'Vercel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
    { name: 'Render', logo: 'https://media.licdn.com/dms/image/v2/D4E0BAQGGDoFoqHtOvA/company-logo_200_200/company-logo_200_200/0/1702595267620/renderco_logo?e=2147483647&v=beta&t=ZYrxKUyruOEupgw5Lr5amgwgBCJq8VXH8r05Qr5CeQc' },
  ];

  const learningPaths = [
    { title: 'DSA Mastery', skills: ['Arrays', 'Trees', 'Graphs', 'DP'], color: 'purple' },
    { title: 'Java Fundamentals', skills: ['OOP', 'Multithreading', 'JDBC'], color: 'blue' },
    { title: 'MERN Stack', skills: ['React', 'Node', 'MongoDB', 'Express'], color: 'cyan' },
    { title: 'AI/ML Essentials', skills: ['Regression', 'Classification', 'Clustering'], color: 'green' },
    { title: 'Data Science', skills: ['Pandas', 'Numpy', 'Scikit-Learn'], color: 'indigo' },
  ];

  // Calculate language percentages dynamically
  let languageString = "N/A";
  if (Object.keys(stats.languages).length > 0) {
    const total = Object.values(stats.languages).reduce((a, b) => a + (b as number), 0);
    const sorted = Object.entries(stats.languages).sort((a, b) => (b[1] as number) - (a[1] as number));
    let other = 0;
    const mainLangs: string[] = [];
    for (const [lang, bytes] of sorted) {
      const perc = ((bytes as number) / total * 100).toFixed(1);
      if (parseFloat(perc) < 1) {
        other += parseFloat(perc);
      } else {
        mainLangs.push(`${lang} ${perc}%`);
      }
    }
    if (other > 0) {
      mainLangs.push(`Other ${other.toFixed(1)}%`);
    }
    languageString = mainLangs.join(", ");
  }

  const statCards = [
    {
      label: "Stars",
      value: stats.stars,
      icon: <Star className="text-yellow-500" size={40} />,
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/stargazers`,
    },
    {
      label: "Forks",
      value: stats.forks,
      icon: <GitFork className="text-blue-500" size={40} />,
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/network/members`,
    },
    {
      label: "Issues",
      value: stats.issues,
      icon: <AlertCircle className="text-red-500" size={40} />,
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/issues`,
    },
    {
      label: "Pull Requests",
      value: stats.pullRequests,
      icon: <GitPullRequest className="text-pink-500" size={40} />,
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/pulls`,
    },
    {
      label: "Contributors",
      value: stats.contributors,
      icon: <Users className="text-indigo-500" size={40} />,
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/graphs/contributors`,
    },
    {
      label: "Watchers",
      value: stats.watchers,
      icon: <Eye className="text-cyan-500" size={40} />,
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/watchers`,
    },
    {
      label: "License",
      value: stats.license,
      icon: <Scale className="text-gray-600 dark:text-gray-400" size={40} />,
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/blob/main/LICENSE`,
    },
    {
      label: "Last Update",
      value: stats.lastCommit,
      icon: <Clock className="text-purple-500" size={40} />,
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/commits`,
    },
    {
      label: "Code Size",
      value: `${(stats.size / 1024).toFixed(1)} MB`,
      icon: <Code2 className="text-green-500" size={40} />,
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}`,
    },
    {
      label: "Languages",
      value: languageString,
      icon: <Languages className="text-amber-600" size={40} />,
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}`,
    },
  ];

  return (
    <section
      id="learning"
      className="overflow-hidden relative py-24 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-4xl font-bold text-gray-100 md:text-5xl"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Technologies We Cover & Project Stats
            </span>
          </motion.h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            Master the most in-demand technologies with our comprehensive curriculum
            and track our open-source progress
          </p>
        </div>

        {/* Tech Logos Centered - Updated with README tech */}
        <div className="flex flex-wrap gap-8 justify-center mb-20">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center p-6 space-y-4 rounded-xl border backdrop-blur-sm transition-all duration-300 group bg-white/80 dark:bg-gray-800/80 border-gray-200/50 dark:border-gray-600/50 hover:border-indigo-500/50 hover:transform hover:scale-110"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-center items-center w-16 h-16">
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="object-contain w-full h-full filter brightness-100 transition-all duration-300 group-hover:brightness-110"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 transition-colors duration-300 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Learning Paths - Updated with README paths */}
        <div className="grid gap-6 mb-20 md:grid-cols-2 lg:grid-cols-5">
          {learningPaths.map((path, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 bg-white/60 dark:bg-gray-800/60 border-gray-200/50 dark:border-gray-600/50 hover:border-indigo-500/50"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
                {path.title}
              </h3>
              <div className="space-y-2">
                {path.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 bg-${path.color}-500 rounded-full`}
                    ></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Stats Integrated Below */}
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-10 text-3xl font-extrabold text-center text-gray-100"
        >
          Dev-Elevate Project Statistics
        </motion.h3>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            show: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="flex flex-wrap gap-6 justify-center"
        >
          {statCards.map(({ label, value, icon, link }, index) => (
            <motion.a
              key={label}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="flex overflow-hidden relative flex-col justify-center items-center px-8 py-6 w-52 bg-white rounded-2xl border border-gray-100 shadow-lg transition-all duration-300 group dark:bg-gray-800 hover:shadow-2xl dark:border-gray-700"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 via-transparent to-indigo-100 opacity-0 blur-2xl transition duration-500 dark:from-indigo-900/50 dark:via-transparent dark:to-indigo-900/50 group-hover:opacity-100"></div>

              <div className="flex z-10 flex-col items-center space-y-3">
                <div className="p-4 bg-gray-50 rounded-full shadow-inner dark:bg-gray-700">
                  {icon}
                </div>
                <p className="text-xl font-bold text-center text-gray-900 break-words dark:text-gray-100">
                  {value}
                </p>
                <p className="text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                  {label}
                </p>
              </div>

              <ExternalLink
                size={16}
                className="absolute top-3 right-3 text-gray-400 opacity-0 transition duration-300 dark:text-gray-500 group-hover:opacity-100"
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>

  );
};

export default TechStackAndStats;