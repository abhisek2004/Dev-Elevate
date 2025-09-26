import React, { useState, useEffect, useCallback, Fragment } from "react";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCodeBranch,
  FaMapMarkerAlt,
  FaBuilding,
  FaUserFriends,
  FaMedal,
  FaCode,
  FaStar,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Menu, Transition } from "@headlessui/react";
import confetti from "canvas-confetti";

// GitHub repo
const GITHUB_REPO = "abhisek2004/Dev-Elevate";
const TOKEN = process.env.REACT_APP_GITHUB_TOKEN || "";
const STORAGE_KEY = "github_contributors";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hr

// Points for leaderboard
const POINTS: Record<string, number> = {
  "level-1": 3,
  "level-2": 7,
  level3: 10,
};

// Role assignment
const getRoleByGitHubActivity = (contributor: any) => {
  const { contributions, followers = 0, login } = contributor;

  if (login === "abhisek2004") return "Admin, Project Lead";
  if (contributions > 100 && followers > 50) return "Core Maintainer";
  if (contributions > 50 && followers > 20) return "Senior Dev";
  if (contributions > 20) return "Active Contributor";
  if (contributions > 10) return "Regular Contributor";

  return "New Contributor";
};


// Local storage helpers
const getCachedContributors = () => {
  try {
    const cachedData = localStorage.getItem(STORAGE_KEY);
    if (!cachedData) return null;
    const { data, timestamp } = JSON.parse(cachedData);
    return Date.now() - timestamp > CACHE_DURATION ? null : data;
  } catch {
    return null;
  }
};
const cacheContributors = (data: any) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch { }
};

interface Contributor {
  username: string;
  name: string;
  avatar: string;
  profile: string;
  points: number;
  prs: number;
  contributions: number;
  followers: number;
  public_repos: number;
  bio: string;
  company: string | null;
  location: string | null;
  role: string;
  avatar_url: string;
  html_url: string;
  id: number;
}

interface GitHubContributorAPI {
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  contributions: number;
}

interface GitHubPR {
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  merged_at: string | null;
  labels: { name: string }[];
}

export default function Leaderboard() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"points" | "prs" | "username">("points");
  const CONTRIBUTORS_PER_PAGE = 10;

  // Fetch GitHub profile details
  const fetchGitHubProfile = useCallback(async (username: string) => {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`, {
        headers: TOKEN ? { Authorization: `token ${TOKEN}` } : undefined,
      });
      if (!res.ok) throw new Error("Profile fetch failed");
      const profile = await res.json();
      return {
        followers: profile.followers || 0,
        public_repos: profile.public_repos || 0,
        name: profile.name || username,
        bio: profile.bio || "Open source contributor",
        company: profile.company,
        location: profile.location,
      };
    } catch {
      return {
        followers: 0,
        public_repos: 0,
        name: username,
        bio: "Open source contributor",
        company: null,
        location: null,
      };
    }
  }, []);

  // Fetch contributors
  const fetchContributors = useCallback(async () => {
    setLoading(true);
    const cached = getCachedContributors();
    if (cached) {
      setContributors(cached);
      setLastUpdated(
        `Last updated: ${new Date(Date.now() - CACHE_DURATION).toLocaleString()} (cached)`
      );
      setLoading(false);
      return;
    }

    try {
      let contributorsMap: Record<string, Contributor> = {};
      let page = 1;
      let hasMore = true;

      // Fetch contributors
      let allContributors: GitHubContributorAPI[] = [];
      let contributorPage = 1;
      let hasMoreContributors = true;

      while (hasMoreContributors) {
        const contributorsRes = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}/contributors?per_page=100&page=${contributorPage}`,
          {
            headers: TOKEN ? { Authorization: `token ${TOKEN}` } : undefined,
          }
        );
        if (!contributorsRes.ok) throw new Error("Failed to fetch contributors");
        const contributorsData: GitHubContributorAPI[] = await contributorsRes.json();
        if (contributorsData.length === 0) {
          hasMoreContributors = false;
          break;
        }
        allContributors = [...allContributors, ...contributorsData];
        contributorPage++;
      }

      const contributorsInfo: Record<
        string,
        { name: string; avatar: string; profile: string }
      > = {};

      allContributors.forEach((contributor) => {
        contributorsInfo[contributor.login] = {
          name: contributor.name || contributor.login,
          avatar: contributor.avatar_url,
          profile: contributor.html_url,
        };
      });

      // Fetch PRs
      while (hasMore) {
        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}/pulls?state=closed&per_page=100&page=${page}`,
          {
            headers: TOKEN ? { Authorization: `token ${TOKEN}` } : undefined,
          }
        );
        const prs: GitHubPR[] = await res.json();
        if (prs.length === 0) {
          hasMore = false;
          break;
        }

        prs.forEach((pr) => {
          if (!pr.merged_at) return;
          const labels = pr.labels.map((l) => l.name.toLowerCase());
          const hasGsocLabel = labels.some(
            (label) => label.includes("gssoc") || label.includes("gsoc")
          );
          if (!hasGsocLabel) return;

          const author = pr.user.login;
          let points = 0;
          labels.forEach((label) => {
            const normalized = label.replace(/\s+/g, "").toLowerCase();
            if (POINTS[normalized]) points += POINTS[normalized];
          });

          if (!contributorsMap[author]) {
            const contributorInfo = contributorsInfo[author] || {
              name: author,
              avatar: pr.user.avatar_url,
              profile: pr.user.html_url,
            };
            contributorsMap[author] = {
              username: author,
              name: contributorInfo.name,
              avatar: contributorInfo.avatar,
              profile: contributorInfo.profile,
              points: 0,
              prs: 0,
              contributions: 0,
              followers: 0,
              public_repos: 0,
              bio: "Open source contributor",
              company: null,
              location: null,
              role: "",
              avatar_url: contributorInfo.avatar,
              html_url: contributorInfo.profile,
              id: Math.random() * 1000000,
            };
          }
          contributorsMap[author].points += points;
          contributorsMap[author].prs += 1;
        });
        page++;
      }

      // Enhance contributors with profile data
      const enhanced = await Promise.all(
        Object.values(contributorsMap).map(async (c) => {
          const profile = await fetchGitHubProfile(c.username);
          const contributorData = allContributors.find(
            (contributor) => contributor.login === c.username
          );
          return {
            ...c,
            ...profile,
            contributions: contributorData?.contributions || 0,
            role: getRoleByGitHubActivity({
              ...c,
              ...profile,
              contributions: contributorData?.contributions || 0,
              login: c.username,
            }),
          };
        })
      );

      // Sort by points, then contributions
      enhanced.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        return b.contributions - a.contributions;
      });

      setContributors(enhanced);
      cacheContributors(enhanced);
      setLastUpdated(new Date().toLocaleString());
      localStorage.setItem(
        "leaderboardData",
        JSON.stringify({ data: enhanced, timestamp: Date.now() })
      );
    } catch (err) {
      console.error("Error fetching contributors:", err);
      setContributors([]);
    } finally {
      setLoading(false);
    }
  }, [fetchGitHubProfile]);

  useEffect(() => {
    fetchContributors();
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { x: 0.5, y: 0.6 },
      startVelocity: 45,
      gravity: 0.9,
      scalar: 1.2,
    });
  }, [fetchContributors]);

  const filteredContributors = contributors.filter((c) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      c.username.toLowerCase().includes(q) ||
      (c.name && c.name.toLowerCase().includes(q))
    );
  });

  const sortedContributors = [...filteredContributors].sort((a, b) => {
    if (sortBy === "points") {
      if (b.points !== a.points) return b.points - a.points;
      return b.contributions - a.contributions;
    }
    if (sortBy === "prs") return b.prs - a.prs;
    if (sortBy === "username") return a.username.localeCompare(b.username);
    return 0;
  });

  const indexOfLast = currentPage * CONTRIBUTORS_PER_PAGE;
  const indexOfFirst = indexOfLast - CONTRIBUTORS_PER_PAGE;
  const currentContributors = sortedContributors.slice(
    indexOfFirst,
    indexOfLast
  );
  const totalPages = Math.ceil(
    sortedContributors.length / CONTRIBUTORS_PER_PAGE
  );

  const ranksMap: Record<string, number> = {};
  sortedContributors.forEach((c, i) => {
    ranksMap[c.username] = i + 1;
  });

  const sortOptions = [
    { label: "Points", value: "points" },
    { label: "PRs", value: "prs" },
    { label: "Username", value: "username" },
  ];

  return (
    <div className="py-12 bg-white dark:bg-black sm:py-16">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Leaderboard Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl dark:text-gray-100">
            <span className="block text-indigo-700 dark:text-indigo-400">GSSoC'25</span>
            <span className="text-gray-800 dark:text-gray-200">Contributor Leaderboard</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Recognizing the amazing contributions from our open source community
          </p>
        </div>

        {/* Search + Sort Dropdown */}
        <div className="flex items-center justify-center mb-6 space-x-4">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search contributors..."
            className="w-full max-w-xs px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 dark:bg-gray-800 dark:text-gray-100"
          />
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex justify-center w-48 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400">
              Sort by: {sortOptions.find((opt) => opt.value === sortBy)?.label}
              <FaChevronDown className="w-4 h-4 ml-2" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-50 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:divide-gray-700 focus:outline-none">
                {sortOptions.map((option) => (
                  <Menu.Item key={option.value}>
                    {({ active }) => (
                      <button
                        onClick={() => setSortBy(option.value as "points" | "prs" | "username")}
                        className={`${active ? "text-white bg-indigo-500" : "text-gray-700 dark:text-gray-300"
                          } group flex w-full items-center px-4 py-2 text-sm`}
                      >
                        {option.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        {/* Leaderboard Table */}
        <div className="mb-12 overflow-hidden shadow-lg bg-gray-50 rounded-2xl dark:bg-gray-800">
          {loading ? (
            <div className="p-6 text-center text-gray-600 dark:text-gray-400">
              Loading contributors...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                      Rank
                    </th>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                      Contributor
                    </th>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                      Points
                    </th>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                      PRs
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100 dark:bg-gray-800 dark:divide-gray-700">
                  {currentContributors.map((c) => {
                    const rank = ranksMap[c.username];
                    return (
                      <tr
                        key={c.username}
                        className="transition-colors duration-150 border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50 dark:border-gray-700"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-medium ${rank === 1
                              ? "bg-yellow-500 text-white"
                              : rank === 2
                                ? "bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                                : rank === 3
                                  ? "bg-amber-800 text-white"
                                  : "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300"
                              }`}
                          >
                            {rank}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img
                                className="w-10 h-10 border-2 border-indigo-200 rounded-full dark:border-gray-600"
                                src={c.avatar}
                                alt={c.username}
                              />
                            </div>
                            <div className="ml-4">
                              <a
                                href={c.profile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-gray-900 transition-colors dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400"
                              >
                                {c.username}
                              </a>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {c.name && c.name !== c.username ? c.name : ""}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaStar className="mr-1 text-yellow-400" />
                            <span className="font-medium">{c.points}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaCode className="mr-1 text-indigo-500" />
                            <span className="font-medium">{c.prs}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {totalPages > 1 && (
                <div className="flex items-center justify-center py-4 space-x-2 bg-white dark:bg-gray-800">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg dark:border-gray-600 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300"
                  >
                    <FaChevronLeft />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 text-sm rounded-lg border ${currentPage === i + 1
                        ? "bg-indigo-500 text-white border-indigo-500"
                        : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg dark:border-gray-600 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </div>
          )}
          <div className="px-6 py-2 text-right border-t border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            {lastUpdated && (
              <span className="text-xs text-gray-500 dark:text-gray-400">{lastUpdated}</span>
            )}
          </div>
        </div>

        {/* Contributors Grid Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-black">
          <div className="px-6 mx-auto max-w-7xl">
            <motion.h2
              className="mb-16 text-5xl font-extrabold tracking-tight text-center text-gray-800 dark:text-gray-100"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              🌟 Our Amazing{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 animate-pulse dark:from-indigo-400 dark:via-purple-500 dark:to-pink-500">
                Contributors
              </span>
            </motion.h2>

            {currentContributors.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-400">
                No contributors found yet. Be the first to contribute! 🚀
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {currentContributors.map((c, i) => (
                  <motion.div
                    key={c.id}
                    className="relative flex flex-col items-center p-6 text-center transition-all duration-300 ease-out border border-gray-100 shadow-lg bg-gradient-to-br rounded-2xl backdrop-blur-xl from-white/90 to-indigo-50/80 dark:from-gray-700/80 dark:to-gray-800/70 dark:border-gray-700"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{
                      scale: 1.02,
                      y: -4,
                      boxShadow: "0px 8px 25px rgba(99,102,241,0.25)",
                    }}
                  >
                    <div className="absolute -translate-x-1/2 -top-8 left-1/2">
                      <div className="relative">
                        <img
                          src={c.avatar_url}
                          alt={c.username}
                          className="w-20 h-20 border-4 border-indigo-500 rounded-full shadow-xl"
                        />
                        <div className="absolute inset-0 rounded-full blur-md animate-pulse bg-indigo-400/20"></div>
                      </div>
                    </div>

                    <div className="mt-16">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                        {c.name}
                      </h3>
                      <p className="flex items-center justify-center gap-1 mb-3 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                        <FaMedal className="text-yellow-500 animate-bounce" />{" "}
                        {c.role}
                      </p>
                      {i === 0 && (
                        <span className="px-3 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full dark:bg-yellow-900/50 dark:text-yellow-300">
                          🥇 Gold Contributor
                        </span>
                      )}
                      {i === 1 && (
                        <span className="px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full dark:bg-gray-600 dark:text-gray-300">
                          🥈 Silver Contributor
                        </span>
                      )}
                      {i === 2 && (
                        <span className="px-3 py-1 text-xs font-semibold text-orange-700 bg-orange-100 rounded-full dark:bg-orange-900/50 dark:text-orange-300">
                          🥉 Bronze Contributor
                        </span>
                      )}
                    </div>

                    <div className="grid w-full grid-cols-3 gap-3 my-5 text-sm text-gray-700 dark:text-gray-300">
                      <div className="flex flex-col items-center p-2 rounded-lg shadow-sm backdrop-blur-md bg-white/60 dark:bg-gray-600/50">
                        <FaCodeBranch className="mb-1 text-indigo-600 dark:text-indigo-400" />
                        <span className="font-semibold">{c.public_repos}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Repos
                        </span>
                      </div>
                      <div className="flex flex-col items-center p-2 rounded-lg shadow-sm backdrop-blur-md bg-white/60 dark:bg-gray-600/50">
                        <FaUserFriends className="mb-1 text-indigo-600 dark:text-indigo-400" />
                        <span className="font-semibold">{c.followers}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Followers
                        </span>
                      </div>
                      <div className="flex flex-col items-center p-2 rounded-lg shadow-sm backdrop-blur-md bg-white/60 dark:bg-gray-600/50">
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">
                          🔥
                        </span>
                        <span className="font-semibold">{c.contributions}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Contribs
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-2 mb-4 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600">
                      <div
                        className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500"
                        style={{
                          width: `${contributors[0]?.contributions
                            ? (c.contributions / contributors[0].contributions) * 100
                            : 0
                            }%`,
                        }}
                      ></div>
                    </div>

                    <div className="flex flex-col gap-1 mb-4 text-xs text-gray-500 dark:text-gray-400">
                      {c.company && (
                        <span className="flex items-center justify-center gap-1">
                          <FaBuilding /> {c.company}
                        </span>
                      )}
                      {c.location && (
                        <span className="flex items-center justify-center gap-1">
                          <FaMapMarkerAlt /> {c.location}
                        </span>
                      )}
                    </div>

                    <div className="w-full mt-auto">
                      <a
                        href={c.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 ease-out transform hover:scale-105 relative overflow-hidden"
                      >
                        <FaGithub className="text-lg transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:text-blue-200" />
                        <span>Profile</span>
                        <FaExternalLinkAlt className="text-xs transition-transform duration-300 opacity-80 group-hover:translate-x-1" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}