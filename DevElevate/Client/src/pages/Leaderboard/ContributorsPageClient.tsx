'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Navbar is provided by the app layout; do not import/use here to avoid duplicates

interface Contributor {
  login: string;
  html_url: string;
  avatar_url: string;
  contributions: number;
  points?: number;
  prCount?: number;
  levelBreakdown?: {
    level1: number;
    level2: number;
    level3: number;
  };
}

interface ContributorStats {
  totalContributors: number;
  totalPoints: number;
  totalPRs: number;
  totalCommits: number;
}

interface GitHubStatsResponse {
  total: number;
  author: {
    login: string;
    html_url: string;
    avatar_url: string;
  };
}

type LevelKey = 'level-1' | 'level-2' | 'level-3';
const LEVEL_POINTS: Record<LevelKey, number> = {
  'level-1': 3,
  'level-2': 5,
  'level-3': 10,
};

async function fetchContributors(): Promise<Contributor[]> {
  const owner = 'abhisek2004';
  const repo = 'Dev-Elevate';

  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  };

  const token = (import.meta as any)?.env?.VITE_GITHUB_TOKEN || (import.meta as any)?.env?.REACT_APP_GITHUB_TOKEN;
  if (token) {
    (headers as any).Authorization = `token ${token}`;
  }

  try {
    const statsRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/stats/contributors`,
      {
        headers,
      }
    );

    console.log('[contributors] stats endpoint returned:', statsRes.status, statsRes.statusText);

    if (statsRes.status === 202) {
      console.warn('[contributors] stats not ready, falling back to /contributors');
      return await fetchContributorsFallback(owner, repo, headers);
    }

    if (statsRes.ok) {
      const stats: GitHubStatsResponse[] = await statsRes.json();

      const contributors: Contributor[] = stats.map((stat) => ({
        login: stat.author.login,
        html_url: stat.author.html_url,
        avatar_url: stat.author.avatar_url,
        contributions: stat.total,
      }));

      return contributors.sort((a, b) => b.contributions - a.contributions);
    }

    console.warn('[contributors] stats endpoint failed, trying fallback');
    return await fetchContributorsFallback(owner, repo, headers);
  } catch (error) {
    console.error('[contributors] Error fetching from GitHub API:', error);
    // Graceful fallback: return empty list instead of throwing to avoid error page
    return [];
  }
}

async function fetchEligiblePRPoints(): Promise<Record<string, { points: number; prCount: number; levelBreakdown: { level1: number; level2: number; level3: number } }>> {
  const owner = 'abhisek2004';
  const repo = 'Dev-Elevate';

  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  };
  const token = (import.meta as any)?.env?.VITE_GITHUB_TOKEN || (import.meta as any)?.env?.REACT_APP_GITHUB_TOKEN;
  if (token) {
    (headers as any).Authorization = `token ${token}`;
  }

  const acc: Record<string, { points: number; prCount: number; levelBreakdown: { level1: number; level2: number; level3: number } }> = {};
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls?state=closed&per_page=100&page=${page}`, { headers });
    if (!res.ok) break;
    const prs: any[] = await res.json();
    if (!prs || prs.length === 0) {
      hasMore = false;
      break;
    }
    for (const pr of prs) {
      if (!pr.merged_at || !pr.user) continue;
      const labels: string[] = Array.isArray(pr.labels) ? pr.labels.map((l: any) => String(l.name || '').toLowerCase()) : [];
      const hasGssoc = labels.some((n) => n.includes('gssoc') || n.includes('gsoc'));
      if (!hasGssoc) continue;

      let highest: LevelKey | null = null;
      if (labels.some((n) => n.replace(/\s+/g, '') === 'level3' || n.includes('level-3'))) highest = 'level-3';
      else if (labels.some((n) => n.replace(/\s+/g, '') === 'level2' || n.includes('level-2'))) highest = 'level-2';
      else if (labels.some((n) => n.replace(/\s+/g, '') === 'level1' || n.includes('level-1'))) highest = 'level-1';
      if (!highest) continue;

      const login: string = pr.user.login;
      if (!acc[login]) acc[login] = { points: 0, prCount: 0, levelBreakdown: { level1: 0, level2: 0, level3: 0 } };
      acc[login].prCount += 1;
      acc[login].points += LEVEL_POINTS[highest];
      if (highest === 'level-1') acc[login].levelBreakdown.level1 += 1;
      if (highest === 'level-2') acc[login].levelBreakdown.level2 += 1;
      if (highest === 'level-3') acc[login].levelBreakdown.level3 += 1;
    }
    page += 1;
  }
  return acc;
}

async function fetchContributorsFallback(owner: string, repo: string, headers: HeadersInit): Promise<Contributor[]> {
  const listRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`, {
    headers,
  });

  console.log('[contributors] fallback endpoint returned:', listRes.status, listRes.statusText);

  if (!listRes.ok) {
    console.warn(`[contributors] fallback fetch failed: ${listRes.status} ${listRes.statusText}`);
    // Graceful fallback
    return [];
  }

  const contributors: Contributor[] = await listRes.json();
  return contributors.sort((a, b) => b.contributions - a.contributions);
}

const getCardGradient = (ratio: number): string => {
  if (ratio <= 0.33) {
    return 'bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/20';
  } else if (ratio <= 0.66) {
    return 'bg-gradient-to-br from-purple-400/15 via-indigo-500/15 to-blue-500/15 border-indigo-500/20';
  } else {
    return 'bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/20';
  }
};

// Removed unused button gradient helper

interface ContributorCardProps {
  contributor: Contributor;
  index: number;
  totalContributors: number;
  isProjectOwner?: boolean;
}

const ContributorCard: React.FC<ContributorCardProps> = ({ contributor, index, totalContributors, isProjectOwner = false }) => {
  const ratio = index / Math.max(1, totalContributors - 1);
  const hasPoints = contributor.points !== undefined && contributor.points > 0;

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
      },
    },
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className="h-full"
      transition={{ duration: 0.2, ease: "easeOut" }} //Exit transition because after hover it took 4-5 seconds to be back to original position 
    >
      <a
        href={contributor.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <div
          className={`${getCardGradient(ratio)} rounded-xl p-6 flex flex-col items-center text-center shadow-sm border transition-all duration-300 relative group cursor-pointer h-full min-h-[280px]`}
          key={contributor.login}
        >
          {/* Hover overlay */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center transition-all duration-300 ease-in-out opacity-0 bg-white/10 backdrop-blur-sm rounded-xl group-hover:opacity-100">
            <div className="relative mb-3">
              <img
                src={contributor.avatar_url}
                alt={`${contributor.login}'s avatar`}
                width={64}
                height={64}
                className="border-2 rounded-full border-white/40"
                loading="lazy"
              />
            </div>
            <div className="px-2 mb-2 text-sm font-medium text-center text-yellow-400">
              {contributor.login}
            </div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">Click To Visit Profile</div>
          </div>

          <div className="relative mb-4 transition-opacity duration-500 ease-in-out group-hover:opacity-0">
            <img
              src={contributor.avatar_url}
              alt={`${contributor.login}'s avatar`}
              width={96}
              height={96}
              className="border-2 rounded-full border-white/10"
              loading="lazy"
            />
          </div>

          <h2 className="mb-2 text-lg font-semibold transition-opacity duration-500 ease-in-out text-foreground group-hover:opacity-0">{contributor.login}</h2>

          <div className="flex flex-col justify-start flex-grow mb-4 space-y-1 text-sm transition-opacity duration-500 ease-in-out text-foreground group-hover:opacity-0">{isProjectOwner ? (
            <>
              <div className="text-lg font-bold text-transparent bg-gradient-to-r from-emerald-400 to-yellow-400 bg-clip-text">
                👑 Project Admin
              </div>
              <div className="flex-grow mt-2 mb-4 text-xs text-gray-400"></div>
              <div className="mt-2 text-xs">
                <span className="font-medium text-blue-400">
                  {contributor.contributions} Commit{contributor.contributions === 1 ? '' : 's'}
                </span>
              </div>
            </>
          ) : hasPoints ? (
            <>
              <div className="text-lg font-bold">
                <span className="text-transparent bg-gradient-to-r from-yellow-400 to-emerald-400 bg-clip-text">
                  🏆 {contributor.points} Points
                </span>
              </div>
              <div className="text-xs text-gray-400 mt-2 space-y-1 min-h-[60px]">
                {contributor.levelBreakdown && (
                  <>
                    {contributor.levelBreakdown.level3 > 0 && (
                      <div>🥇 Level-3: {contributor.levelBreakdown.level3} (10pts each)</div>
                    )}
                    {contributor.levelBreakdown.level2 > 0 && (
                      <div>🥈 Level-2: {contributor.levelBreakdown.level2} (7pts each)</div>
                    )}
                    {contributor.levelBreakdown.level1 > 0 && (
                      <div>🥉 Level-1: {contributor.levelBreakdown.level1} (3pts each)</div>
                    )}
                  </>
                )}
              </div>
              <div className="mt-2 text-xs">
                <span className="font-medium text-red-400">
                  {contributor.prCount} PRS
                </span>
                <span className="text-gray-400"> & </span>
                <span className="font-medium text-blue-400">
                  {contributor.contributions} Commit{contributor.contributions === 1 ? '' : 's'}
                </span>
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-between h-full text-gray-400">
              <div className="flex-grow mt-1 mb-4 text-xs text-gray-500">
                Community Contributor
              </div>
              <div className="mt-2 text-xs">
                <span className="font-medium text-blue-400">
                  {contributor.contributions.toLocaleString()} commit{contributor.contributions === 1 ? '' : 's'}
                </span>
              </div>
            </div>
          )}
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default function ContributorsPageClient() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [stats, setStats] = useState<ContributorStats | null>(null);
  // Removed unused streak state
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // const res = await fetch("https://api.github.com/repos/saumyayadav25/cpp-dsa-sheet-testing/contributors");
  // const contributorsList = await res.json(); // 🔹 naam change kiya

  // // Leaderboard ke liye points fetch karo
  // const leaderboard = await fetchContributions("saumyayadav25", "cpp-dsa-sheet-testing");

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
      },
    }),
  };

  useEffect(() => {
    // Removed streak retrieval

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [baseContributors, prPointsMap] = await Promise.all([
          fetchContributors(),
          fetchEligiblePRPoints(),
        ]);

        const byLogin: Record<string, Contributor> = {};
        for (const c of baseContributors) {
          byLogin[c.login] = { ...c } as Contributor;
        }
        for (const login of Object.keys(prPointsMap)) {
          if (!byLogin[login]) {
            byLogin[login] = {
              login,
              html_url: `https://github.com/${login}`,
              avatar_url: `https://github.com/${login}.png` as string,
              contributions: 0,
            } as Contributor;
          }
          const add = prPointsMap[login];
          byLogin[login].points = add.points;
          byLogin[login].prCount = add.prCount;
          byLogin[login].levelBreakdown = add.levelBreakdown;
        }

        const mergedList = Object.values(byLogin)
          .sort((a, b) => (b.points || 0) - (a.points || 0) || b.contributions - a.contributions);

        const totals = mergedList.reduce(
          (acc, c) => {
            acc.totalPoints += c.points || 0;
            acc.totalPRs += c.prCount || 0;
            acc.totalCommits += c.contributions || 0;
            return acc;
          },
          { totalContributors: mergedList.length, totalPoints: 0, totalPRs: 0, totalCommits: 0 }
        );

        setContributors(mergedList);
        setStats(totals);
      } catch (err) {
        console.error('Error fetching contributors:', err);
        setError('Failed to load contributors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <main className="min-h-screen px-4 py-24 text-white sm:px-8 lg:px-16 bg-background">
          <div className="mx-auto text-center max-w-7xl">
            <div className="animate-pulse">
              <div className="h-12 max-w-md mx-auto mb-4 bg-gray-700 rounded-lg"></div>
              <div className="h-6 max-w-2xl mx-auto mb-8 bg-gray-700 rounded"></div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="p-6 bg-gray-700/20 rounded-xl animate-pulse">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-600 rounded-full"></div>
                    <div className="h-4 mb-2 bg-gray-600 rounded"></div>
                    <div className="w-20 h-3 mx-auto mb-4 bg-gray-600 rounded"></div>
                    <div className="h-8 bg-gray-600 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <main className="min-h-screen px-4 py-24 text-white sm:px-8 lg:px-16 bg-background">
          <div className="mx-auto text-center max-w-7xl">
            <div className="p-8 border rounded-lg bg-red-500/10 border-red-500/20">
              <h1 className="mb-4 text-2xl font-bold text-red-400">Error Loading Contributors</h1>
              <p className="mb-4 text-gray-300">{error}</p>
              <button onClick={() => window.location.reload()} className="inline-flex items-center px-4 py-2 text-sm border rounded-lg bg-red-500/20 hover:bg-red-500/30 border-red-500/30">
                Try Again
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="min-h-screen px-4 py-24 transition-colors duration-300 sm:px-8 lg:px-16 bg-background">
        <section aria-labelledby="contributors-heading" className="mx-auto max-w-7xl">

          {/* <h1 className="mb-4 text-2xl font-bold">Leaderboard</h1>
          <table className="w-full mb-8 border border-collapse border-gray-400 table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Contributor</th>
                <th className="px-4 py-2 border">Points</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(leaderboard).map(([user, points]) => (
                <tr key={user}>
                  <td className="px-4 py-2 border">{user}</td>
                  <td className="px-4 py-2 border">{points}</td>
                </tr>
              ))}
            </tbody>
          </table> */}


          {/* Header Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeInUp}
            className="mb-12 text-center"
          >
            <h1 id="contributors-heading" className="mb-4 text-3xl font-bold md:text-4xl">
              <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text">
                Our Amazing Contributors
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-sm md:text-base text-foreground">
              Every line of code, every fix, every idea — it all adds up. <br />
              <span className="font-medium text-yellow-400">Grateful to have you building with us.</span> <br />
              You all are the heart of this community! 🌟 <br />

            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-4 mt-6 mb-12 text-sm text-gray-400 md:text-base"
          >
            <div className="px-4 py-2 border rounded-full bg-purple-500/10 border-purple-500/20">
              <span className="font-semibold text-purple-400">{stats?.totalContributors || contributors.length}</span> Contributors
            </div>
            {stats?.totalPoints && stats.totalPoints > 0 && (
              <div className="px-4 py-2 border rounded-full bg-yellow-500/10 border-yellow-500/20">
                <span className="font-semibold text-yellow-400">
                  {stats.totalPoints.toLocaleString()}
                </span>{' '}
                Total Points
              </div>
            )}
            {stats?.totalPRs && stats.totalPRs > 0 && (
              <div className="px-4 py-2 border rounded-full bg-green-500/10 border-green-500/20">
                <span className="font-semibold text-green-400">
                  {stats.totalPRs.toLocaleString()}
                </span>{' '}
                Eligible PRs
              </div>
            )}
            <div className="px-4 py-2 border rounded-full bg-blue-500/10 border-blue-500/20">
              <span className="font-semibold text-blue-400">
                {stats?.totalCommits?.toLocaleString() || contributors.reduce((sum, c) => sum + c.contributions, 0).toLocaleString()}
              </span>{' '}
              Total Commits
            </div>
          </motion.div>

          {stats?.totalPoints === 0 && (
            <motion.div
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeInUp}
              className="max-w-2xl p-4 mx-auto mt-6 border rounded-lg bg-amber-500/10 border-amber-500/20"
            >
              <p className="text-sm text-amber-400">
                <strong>Note:</strong> No GSSoC'25 eligible PRs found with required labels (gssoc25 + level-1/2/3).
                Showing all contributors sorted by commits as fallback.
              </p>
            </motion.div>
          )}

          {contributors.length === 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              custom={3}
              variants={fadeInUp}
              className="py-12 text-center"
            >
              <p className="text-lg text-gray-400">No contributors found.</p>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              custom={3}
              variants={fadeInUp}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {(() => {
                const projectOwner = 'abhisek2004';

                // Separate contributors into different categories
                const ownerContributor = contributors.find(c => c.login === projectOwner);
                const gssocContributors = contributors.filter(c =>
                  c.login !== projectOwner &&
                  c.points !== undefined &&
                  c.points > 0
                ).sort((a, b) => (b.points || 0) - (a.points || 0));

                const nonGssocContributors = contributors.filter(c =>
                  c.login !== projectOwner &&
                  (c.points === undefined || c.points === 0)
                ).sort((a, b) => b.contributions - a.contributions);

                // Combine them in order: owner first, then gssoc contributors, then non-gssoc
                const sortedContributors = [
                  ...(ownerContributor ? [ownerContributor] : []),
                  ...gssocContributors,
                  ...nonGssocContributors
                ];

                return sortedContributors.map((contributor, index) => (
                  <ContributorCard
                    key={contributor.login}
                    contributor={contributor}
                    index={index}
                    totalContributors={sortedContributors.length}
                    isProjectOwner={contributor.login === projectOwner}
                  />
                ));
              })()}
            </motion.div>
          )}

          <motion.div
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeInUp}
            className="mt-16 space-y-8"
          >
            {/* Point System Explanation */}
            <div className="p-6 border bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl border-white/10">
              <h2 className="mb-4 text-xl font-bold text-center md:text-2xl">
                <span className="text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text">
                  🏆 Point System
                </span>
              </h2>
              <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-3">
                <div className="p-4 border rounded-lg bg-yellow-500/10 border-yellow-500/20">
                  <div className="mb-2 text-2xl">🥉</div>
                  <div className="text-lg font-bold text-yellow-400">Level-1</div>
                  <div className="text-sm text-gray-300">3 Points</div>
                </div>
                <div className="p-4 border rounded-lg bg-orange-500/10 border-orange-500/20">
                  <div className="mb-2 text-2xl">🥈</div>
                  <div className="text-lg font-bold text-orange-400">Level-2</div>
                  <div className="text-sm text-gray-300">7 Points</div>
                </div>
                <div className="p-4 border rounded-lg bg-purple-500/10 border-purple-500/20">
                  <div className="mb-2 text-2xl">🥇</div>
                  <div className="text-lg font-bold text-purple-400">Level-3</div>
                  <div className="text-sm text-gray-300">10 Points</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-center text-gray-400">
                Points are awarded only for <strong>merged PRs</strong> with the <strong>gssoc25</strong> label
                and appropriate <strong>level</strong> labels. Only the highest level per PR counts in case multiple assignment.
              </p>
            </div>

            {/* Call to Action */}
            <div className="p-8 text-center border bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-2xl border-white/10">
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                  Want to Contribute?
                </span>
              </h2>
              <p className="max-w-2xl mx-auto mb-6 text-foreground">
                Join our amazing community of developers! Check out our repository and start contributing today.
                Make sure to follow the contribution guidelines to earn points!
              </p>
              <div className="flex justify-center">
                <a
                  href={`https://github.com/abhisek2004/Dev-Elevate`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 text-white rounded-lg shadow bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Visit Repository
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
