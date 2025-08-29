# GitHub Workflows for DevElevate

This directory contains automated GitHub workflows that enhance collaboration and project management for the DevElevate project.

## 📋 Available Workflows

### 1. 🤖 Auto Comment on Issues (`issue-comment.yml`)

**Trigger**: When a new issue is opened

**Features**:

- Welcomes new issue creators with a personalized message
- Provides helpful resources and next steps
- Automatically analyzes issue content and adds relevant labels
- Links to project documentation, templates, and Discord community
- Special recognition for GSSoC 2025 participants

**Auto-Labels Applied**:

- `new-issue` - All new issues
- `bug` - Issues containing bug-related keywords
- `enhancement` - Feature requests and improvements
- `documentation` - Documentation-related issues
- `ui/ux` - User interface and design issues
- `backend` - Server-side and API issues
- `frontend` - Client-side and React issues
- `gssoc-2025` - GSSoC 2025 related issues

### 2. 🚀 Auto Comment on Pull Requests (`pr-comment.yml`)

**Trigger**: When a new pull request is opened

**Features**:

- Welcomes PR creators with detailed information
- Provides a checklist for review process
- Analyzes PR content and files changed
- Automatically applies relevant labels
- Categorizes PRs by size (XS, S, M, L, XL)

**Auto-Labels Applied**:

- `new-pr` - All new pull requests
- `bug-fix` - Bug fixes and corrections
- `enhancement` - New features and improvements
- `refactor` - Code refactoring
- `frontend` - Frontend-related changes
- `backend` - Backend-related changes
- `documentation` - Documentation updates
- `gssoc-2025` - GSSoC 2025 related PRs
- `size/XS`, `size/S`, `size/M`, `size/L`, `size/XL` - Based on code changes

### 3. 🌟 Welcome First-Time Contributors (`first-time-contributor.yml`)

**Trigger**: When a new pull request is opened

**Features**:

- Detects first-time contributors to the project
- Provides special welcome messages with badges
- Offers guidance for new contributors
- Links to community resources and GSSoC program
- Adds special labels for recognition

**Special Labels**:

- `first-time-contributor` - First-time contributors
- `gssoc-2025` - GSSoC 2025 participants

### 4. ⏰ Status Updates and Reminders (`status-updates.yml`)

**Trigger**: Daily at 9 AM UTC (scheduled) or manually

**Features**:

- Monitors stale issues (30+ days without updates)
- Monitors stale PRs (7+ days without updates)
- Sends automated reminders to contributors
- Creates weekly project summaries
- Helps maintain project momentum

**Weekly Summary Includes**:

- New issues and PRs count
- Merged PRs count
- Active contributors count
- Links to all recent activity
- Goals for the upcoming week

## 🎯 Benefits

### For Contributors

- **Immediate Feedback**: Get instant responses when creating issues/PRs
- **Clear Guidance**: Understand next steps and expectations
- **Recognition**: Special badges and mentions for first-time contributors
- **Community Support**: Easy access to Discord and resources
- **Transparency**: Regular updates on project status

### For Maintainers

- **Automated Organization**: Issues and PRs are automatically labeled
- **Reduced Manual Work**: Less time spent on repetitive tasks
- **Better Tracking**: Clear visibility into project activity
- **Stale Management**: Automated reminders for inactive items
- **Community Building**: Welcoming environment for new contributors

### For the Project

- **Improved Collaboration**: Clear communication channels
- **Better Organization**: Consistent labeling and categorization
- **Community Growth**: Encourages participation and retention
- **Quality Control**: Automated checks and reminders
- **GSSoC Integration**: Special support for program participants

## 🔧 Configuration

### Permissions

All workflows use minimal required permissions:

- `issues: write` - For commenting and labeling issues
- `pull-requests: write` - For commenting and labeling PRs

### Customization

You can customize these workflows by:

1. Modifying the welcome messages in the script sections
2. Adjusting the auto-labeling logic
3. Changing the scheduling for status updates
4. Adding new trigger conditions
5. Modifying the Discord links and resources

### Adding New Labels

To add new auto-labels, modify the labeling logic in the respective workflows:

1. Add new keyword detection in the script
2. Include the new label in the `labels.push()` calls
3. Ensure the label exists in your repository settings

## 📊 Workflow Statistics

These workflows help track:

- **Issue Response Time**: How quickly issues get initial responses
- **PR Review Process**: Automated guidance for contributors
- **Community Engagement**: First-time contributor recognition
- **Project Health**: Stale item management and weekly summaries
- **GSSoC Participation**: Special tracking for program participants

## 🚀 Getting Started

1. **Automatic Activation**: These workflows activate automatically when pushed to the repository
2. **Manual Testing**: You can manually trigger the status updates workflow
3. **Monitoring**: Check the Actions tab to see workflow execution
4. **Customization**: Modify the workflows as needed for your project

## 📞 Support

For questions about these workflows:

- Check the GitHub Actions documentation
- Review the workflow logs for debugging

---

_These workflows are designed to make DevElevate a welcoming and well-organized open-source project, especially for GSSoC 2025 participants! 🌟_

---

# 👋 Hey there, tech fam!

I'm _Abhisek Panda_ 👨‍🎓, currently pursuing my _Bachelor of Technology (B.Tech)_ in _Computer Science_ 💻 _Final Year_ 🎓.

💡 My tech journey is driven by a _passion_ for mastering the _✨ MERN Stack, along with strong skills in \*\*☕ Java_ and _📊 Data Structures & Algorithms (DSA)_.
I’m also an _🌍 Open Source Contributor_, always eager to learn, build, and share knowledge with the community.

---

## 💻 What I Love to Do

- 🎨 Craft _immersive user experiences_ through _Frontend Development_.
- 🚀 Build _scalable web applications_ using _MERN Stack_.
- 🧠 Solve _algorithmic challenges_ to sharpen problem-solving skills.
- 🤝 Contribute to _impactful open-source projects_.

---

## 🌟 My Mindset

> ✨ "Embrace challenges, keep learning, and grow through every experience."

💪 I thrive on _taking challenges head-on, refining my craft, and \*\*delivering meaningful solutions_.
I’m _poised_ to contribute my skills and enthusiasm to _projects that make a difference_.

---

## 📬 Let’s Connect & Collaborate

🌐 _Portfolio:_ [abhisekpanda072.vercel.app](https://abhisekpanda072.vercel.app/)
💼 _LinkedIn:_ [linkedin.com/in/abhisekpanda2004](https://www.linkedin.com/in/abhisekpanda2004/)
🐙 _GitHub:_ [github.com/abhisek2004](https://github.com/abhisek2004)

---

🔥 Let’s code, collaborate, and create something amazing together! 🚀💻

---
