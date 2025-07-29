import express from 'express';
import axios from 'axios';
import User from '../../models/User.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// GitHub OAuth configuration
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_REDIRECT_URI = process.env.GITHUB_REDIRECT_URI;

// Language colors mapping (you can expand this)
const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#239120',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#fa7343',
  Kotlin: '#F18E33',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#1572B6',
  Shell: '#89e051',
  Vue: '#4FC08D',
  React: '#61DAFB'
};

/**
 * @route   GET /api/integrations/github/auth
 * @desc    Get GitHub OAuth URL
 * @access  Private
 */
router.get('/auth', async (req, res) => {
  try {
    const state = Buffer.from(JSON.stringify({ userId: req.user._id })).toString('base64');
    
    const githubAuthUrl = `https://github.com/login/oauth/authorize?` +
      `client_id=${GITHUB_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(GITHUB_REDIRECT_URI)}&` +
      `scope=user:email,public_repo,read:user&` +
      `state=${state}`;

    res.json({
      success: true,
      authUrl: githubAuthUrl
    });
  } catch (error) {
    console.error('GitHub auth URL generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate GitHub auth URL'
    });
  }
});

/**
 * @route   GET /api/integrations/github/callback
 * @desc    Handle GitHub OAuth callback
 * @access  Public (but requires valid state)
 */
router.get('/callback', async (req, res) => {
  try {
    const { code, state } = req.query;

    if (!code || !state) {
      return res.redirect(`${process.env.FRONTEND_URL}/profile?error=missing_params`);
    }

    // Decode state to get user ID
    let userId;
    try {
      const decodedState = JSON.parse(Buffer.from(state, 'base64').toString());
      userId = decodedState.userId;
    } catch (error) {
      return res.redirect(`${process.env.FRONTEND_URL}/profile?error=invalid_state`);
    }

    // Exchange code for access token
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: GITHUB_REDIRECT_URI
    }, {
      headers: {
        'Accept': 'application/json'
      }
    });

    const { access_token } = tokenResponse.data;

    if (!access_token) {
      return res.redirect(`${process.env.FRONTEND_URL}/profile?error=token_exchange_failed`);
    }

    // Get user profile from GitHub
    const profileResponse = await axios.get('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${access_token}`,
        'User-Agent': 'DevElevate-App'
      }
    });

    const githubProfile = profileResponse.data;

    // Update user in database
    const user = await User.findById(userId);
    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL}/profile?error=user_not_found`);
    }

    // Update GitHub integration data
    user.githubIntegration = {
      isConnected: true,
      username: githubProfile.login,
      accessToken: access_token,
      profile: {
        id: githubProfile.id,
        login: githubProfile.login,
        name: githubProfile.name,
        avatar_url: githubProfile.avatar_url,
        bio: githubProfile.bio,
        company: githubProfile.company,
        location: githubProfile.location,
        email: githubProfile.email,
        blog: githubProfile.blog,
        public_repos: githubProfile.public_repos,
        public_gists: githubProfile.public_gists,
        followers: githubProfile.followers,
        following: githubProfile.following,
        created_at: new Date(githubProfile.created_at),
        updated_at: new Date(githubProfile.updated_at)
      },
      repositories: [],
      stats: {
        totalCommits: 0,
        totalPRs: 0,
        totalIssues: 0,
        contributionGraph: {},
        topLanguages: [],
        recentActivity: []
      },
      lastSynced: new Date()
    };

    // Update social links if not already set
    if (!user.socialLinks.github) {
      user.socialLinks.github = githubProfile.html_url;
    }

    await user.save();

    // Redirect to frontend with success
    res.redirect(`${process.env.FRONTEND_URL}/profile?github_connected=true`);
  } catch (error) {
    console.error('GitHub callback error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/profile?error=connection_failed`);
  }
});

/**
 * @route   POST /api/integrations/github/sync
 * @desc    Sync GitHub data (repositories, stats, etc.)
 * @access  Private
 */
router.post('/sync', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('+githubIntegration.accessToken');
    
    if (!user.githubIntegration.isConnected || !user.githubIntegration.accessToken) {
      return res.status(400).json({
        success: false,
        message: 'GitHub account not connected'
      });
    }

    const accessToken = user.githubIntegration.accessToken;
    const username = user.githubIntegration.username;

    // Fetch repositories
    const reposResponse = await axios.get(`https://api.github.com/user/repos`, {
      headers: {
        'Authorization': `token ${accessToken}`,
        'User-Agent': 'DevElevate-App'
      },
      params: {
        per_page: 100,
        sort: 'updated',
        type: 'owner'
      }
    });

    const repositories = reposResponse.data;

    // Fetch language stats for each repository
    const reposWithLanguages = await Promise.all(
      repositories.slice(0, 20).map(async (repo) => { // Limit to top 20 repos
        try {
          const languagesResponse = await axios.get(repo.languages_url, {
            headers: {
              'Authorization': `token ${accessToken}`,
              'User-Agent': 'DevElevate-App'
            }
          });
          
          return {
            ...repo,
            languages: languagesResponse.data
          };
        } catch (error) {
          console.error(`Error fetching languages for ${repo.name}:`, error.message);
          return {
            ...repo,
            languages: {}
          };
        }
      })
    );

    // Calculate top languages
    const languageStats = {};
    let totalBytes = 0;

    reposWithLanguages.forEach(repo => {
      if (repo.languages) {
        Object.entries(repo.languages).forEach(([language, bytes]) => {
          languageStats[language] = (languageStats[language] || 0) + bytes;
          totalBytes += bytes;
        });
      }
    });

    const topLanguages = Object.entries(languageStats)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: ((bytes / totalBytes) * 100).toFixed(1),
        color: LANGUAGE_COLORS[name] || '#858585'
      }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 10);

    // Fetch recent activity (events)
    let recentActivity = [];
    try {
      const eventsResponse = await axios.get(`https://api.github.com/users/${username}/events/public`, {
        headers: {
          'Authorization': `token ${accessToken}`,
          'User-Agent': 'DevElevate-App'
        },
        params: {
          per_page: 20
        }
      });

      recentActivity = eventsResponse.data.slice(0, 10).map(event => ({
        type: event.type,
        repo: event.repo.name,
        action: getEventAction(event),
        created_at: new Date(event.created_at),
        url: `https://github.com/${event.repo.name}`
      }));
    } catch (error) {
      console.error('Error fetching recent activity:', error.message);
    }

    // Update user's GitHub data
    user.githubIntegration.repositories = reposWithLanguages.map(repo => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      clone_url: repo.clone_url,
      language: repo.language,
      languages: repo.languages,
      stargazers_count: repo.stargazers_count,
      watchers_count: repo.watchers_count,
      forks_count: repo.forks_count,
      open_issues_count: repo.open_issues_count,
      created_at: new Date(repo.created_at),
      updated_at: new Date(repo.updated_at),
      pushed_at: new Date(repo.pushed_at),
      size: repo.size,
      topics: repo.topics || [],
      visibility: repo.visibility || 'public',
      default_branch: repo.default_branch
    }));

    user.githubIntegration.stats = {
      totalCommits: 0, // This would require additional API calls to get accurate commit count
      totalPRs: 0,     // This would require searching across repositories
      totalIssues: 0,  // This would require searching across repositories
      contributionGraph: {}, // This would require scraping GitHub's contribution graph
      topLanguages,
      recentActivity
    };

    user.githubIntegration.lastSynced = new Date();
    
    await user.save();

    res.json({
      success: true,
      message: 'GitHub data synced successfully',
      data: {
        repositories: user.githubIntegration.repositories.length,
        topLanguages: topLanguages.length,
        recentActivity: recentActivity.length
      }
    });
  } catch (error) {
    console.error('GitHub sync error:', error);
    
    if (error.response?.status === 401) {
      // Token expired or invalid
      const user = await User.findById(req.user._id);
      user.githubIntegration.isConnected = false;
      user.githubIntegration.accessToken = null;
      await user.save();
      
      return res.status(401).json({
        success: false,
        message: 'GitHub token expired. Please reconnect your account.',
        requiresReauth: true
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to sync GitHub data'
    });
  }
});

/**
 * @route   DELETE /api/integrations/github/disconnect
 * @desc    Disconnect GitHub integration
 * @access  Private
 */
router.delete('/disconnect', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Reset GitHub integration
    user.githubIntegration = {
      isConnected: false,
      username: null,
      accessToken: null,
      profile: {},
      repositories: [],
      stats: {
        totalCommits: 0,
        totalPRs: 0,
        totalIssues: 0,
        contributionGraph: {},
        topLanguages: [],
        recentActivity: []
      },
      lastSynced: null
    };

    await user.save();

    res.json({
      success: true,
      message: 'GitHub integration disconnected successfully'
    });
  } catch (error) {
    console.error('GitHub disconnect error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to disconnect GitHub integration'
    });
  }
});

/**
 * @route   GET /api/integrations/github/status
 * @desc    Get GitHub integration status
 * @access  Private
 */
router.get('/status', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    res.json({
      success: true,
      data: {
        isConnected: user.githubIntegration.isConnected,
        username: user.githubIntegration.username,
        lastSynced: user.githubIntegration.lastSynced,
        repositoryCount: user.githubIntegration.repositories.length,
        topLanguages: user.githubIntegration.stats.topLanguages.slice(0, 5)
      }
    });
  } catch (error) {
    console.error('GitHub status check error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get GitHub status'
    });
  }
});

/**
 * @route   GET /api/integrations/github/twins
 * @desc    Find GitHub twins (users with similar coding stats)
 * @access  Private
 */
router.get('/twins', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user.githubIntegration.isConnected) {
      return res.status(400).json({
        success: false,
        message: 'GitHub account not connected'
      });
    }

    const stats = {
      topLanguages: user.githubIntegration.stats.topLanguages,
      totalRepos: user.githubIntegration.profile.public_repos,
      totalCommits: user.githubIntegration.stats.totalCommits
    };

    const twins = await User.findGitHubTwins(user._id, stats);

    res.json({
      success: true,
      data: twins
    });
  } catch (error) {
    console.error('GitHub twins search error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to find GitHub twins'
    });
  }
});

// Helper function to get human-readable action from GitHub event
function getEventAction(event) {
  switch (event.type) {
    case 'PushEvent':
      return `Pushed ${event.payload.commits?.length || 1} commit(s)`;
    case 'CreateEvent':
      return `Created ${event.payload.ref_type}`;
    case 'DeleteEvent':
      return `Deleted ${event.payload.ref_type}`;
    case 'ForkEvent':
      return 'Forked repository';
    case 'WatchEvent':
      return 'Starred repository';
    case 'IssuesEvent':
      return `${event.payload.action} issue`;
    case 'PullRequestEvent':
      return `${event.payload.action} pull request`;
    case 'ReleaseEvent':
      return `${event.payload.action} release`;
    default:
      return event.type.replace('Event', '');
  }
}

export default router;
