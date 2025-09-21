import React from "react";
import { useGlobalState } from "../../../contexts/GlobalContext";

const gitVersionControl = [
  {
    id: 1,
    title: "Introduction to Git",
    content:
      "Git is a distributed version control system that helps developers track and manage changes in source code during software development.",
  },
  {
    id: 2,
    title: "Why Use Version Control?",
    content: [
      "Keeps history of all code changes",
      "Enables collaboration without overwriting work",
      "Provides backup in case of mistakes",
      "Helps in reverting to previous versions",
    ],
  },
  {
    id: 3,
    title: "Installing Git",
    code: `# Ubuntu/Debian\nsudo apt install git\n\n# Fedora\nsudo dnf install git\n\n# MacOS (Homebrew)\nbrew install git\n\n# Windows\nDownload from: https://git-scm.com/downloads`,
  },
  {
    id: 4,
    title: "Git Configuration",
    code: `git config --global user.name \"Your Name\"\ngit config --global user.email \"you@example.com\"\ngit config --list`,
  },
  {
    id: 5,
    title: "Creating a Git Repository",
    code: `# Initialize a new repository\ngit init\n\n# Clone an existing repository\ngit clone <repository-url>`,
  },
  {
    id: 6,
    title: "Checking Repository Status",
    code: `git status\ngit log\ngit show`,
  },
  {
    id: 7,
    title: "Staging and Committing Changes",
    code: `# Stage changes\ngit add <filename>\ngit add .   # stage all changes\n\n# Commit changes\ngit commit -m \"Your commit message\"`,
  },
  {
    id: 8,
    title: "Viewing Changes",
    code: `git diff          # view unstaged changes\ngit diff --staged  # view staged changes`,
  },
  {
    id: 9,
    title: "Branching",
    code: `# Create a branch\ngit branch feature-branch\n\n# Switch branch\ngit checkout feature-branch\n\n# Create & switch\ngit checkout -b feature-branch\n\n# List branches\ngit branch`,
  },
  {
    id: 10,
    title: "Merging Branches",
    code: `# Merge branch into current branch\ngit merge feature-branch\n\n# Abort merge\ngit merge --abort`,
  },
  {
    id: 11,
    title: "Resolving Conflicts",
    content:
      "Conflicts occur when multiple people edit the same lines of a file. Git marks conflicts in the file, and you must manually edit and resolve them before committing.",
  },
  {
    id: 12,
    title: "Undoing Changes",
    code: `git restore <filename>     # discard changes in working directory\ngit reset HEAD <filename>  # unstage file\ngit revert <commit>        # create a new commit to undo previous one`,
  },
  {
    id: 13,
    title: "Remote Repositories",
    code: `# Add a remote\ngit remote add origin <repository-url>\n\n# View remotes\ngit remote -v`,
  },
  {
    id: 14,
    title: "Pushing and Pulling",
    code: `# Push changes to remote\ngit push origin main\n\n# Pull latest changes\ngit pull origin main\n\n# Fetch without merging\ngit fetch origin`,
  },
  {
    id: 15,
    title: "Working with GitHub",
    content: [
      "Create a repository on GitHub",
      "Connect it to local repo using `git remote add`",
      "Push your local commits to GitHub",
      "Collaborate via Pull Requests",
    ],
  },
  {
    id: 16,
    title: "Tags",
    code: `# Create a lightweight tag\ngit tag v1.0\n\n# Annotated tag\ngit tag -a v1.0 -m \"Version 1.0 release\"\n\n# Push tags\ngit push origin --tags`,
  },
  {
    id: 17,
    title: "Stashing Changes",
    code: `git stash        # save uncommitted changes\ngit stash list   # view stashed changes\ngit stash pop    # apply latest stash and remove it`,
  },
  {
    id: 18,
    title: "Rebasing",
    code: `# Rebase feature branch onto main\ngit checkout feature-branch\ngit rebase main`,
  },
  {
    id: 19,
    title: "Best Practices",
    content: [
      "Commit small, meaningful changes",
      "Write clear commit messages",
      "Use branches for new features",
      "Pull before you push to avoid conflicts",
      "Avoid committing sensitive files (use .gitignore)",
    ],
  },
  {
    id: 20,
    title: "Git Aliases",
    content: "Shortcuts for common commands:",
    code: `git config --global alias.st status\ngit config --global alias.co checkout\ngit config --global alias.br branch\ngit config --global alias.cm \"commit -m\"`,
  },
  {
    id: 21,
    title: "Git Ignore",
    content: [
      "To avoid committing unwanted files:",
      "Create .gitignore file in project root.",
      "Example:",
    ],
    code: `node_modules/\n*.log\n.env`,
  },
  {
    id: 22,
    title: "Git Hooks",
    content: [
      "Automate tasks at different stages of Git workflow.",
      "Examples:",
      "pre-commit → run linting/tests before commit",
      "pre-push → run CI/CD scripts before pushing",
      "Stored in .git/hooks/.",
    ],
  },
  {
    id: 23,
    title: "Git Cherry-Pick",
    content: "Apply a specific commit from one branch to another:",
    code: `git checkout main\ngit cherry-pick <commit-hash>`,
  },
  {
    id: 24,
    title: "Git Worktrees",
    content: "Work on multiple branches simultaneously without cloning:",
    code: `git worktree add ../feature-branch feature-branch`,
  },
  {
    id: 25,
    title: "Summary",
    content:
      "Git is an essential tool for developers. It ensures efficient collaboration, keeps history of changes, and integrates with platforms like GitHub/GitLab/Bitbucket for team-based workflows.",
  },
];

const GitNotes = () => {
  const { state, dispatch } = useGlobalState()
  return (
    <div
      className={`relative min-h-screen py-12 px-4 z-10 ${
        state.darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Background grid and gradient overlay */}
      <div
        className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${
          state.darkMode ? "bg-grid-pattern-dark" : "bg-grid-pattern-light"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            state.darkMode
              ? "bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50"
              : "bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50"
          }`}
        ></div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-righteous tracking-wider mb-4 transition-colors duration-300 ${
              state.darkMode ? "text-dark-text-primary" : "text-light-text-primary"
            }`}
          >
            Git & Version Control
          </h1>
          <div
            className={`h-1 w-32 mx-auto rounded-full bg-gradient-to-r ${
              state.darkMode
                ? "from-primary via-primary-dark to-primary"
                : "from-primary via-primary-dark to-primary"
            } mb-4`}
          ></div>
          <p
            className={`mt-2 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
              state.darkMode ? "text-dark-text-secondary" : "text-light-text-secondary"
            }`}
          >
            Access curated notes, study materials, and resources for Git to
            enhance your learning journey.
          </p>
        </div>
        <div className="gitnotes-vertical-stack">
          {gitVersionControl.map((note) => (
            <div
              key={note.id}
              className={`gitnotes-card group relative p-6 rounded-2xl shadow-lg flex flex-col justify-between w-full max-w-2xl mx-auto mb-8 hover:border-b-2 hover:border-r-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl ${
                state.darkMode
                  ? "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl"
                  : "bg-light-bg-secondary border border-light-border hover:border-primary/50"
              } transition-all duration-300 overflow-hidden`}
            >
              <h2 className="text-xl font-semibold mb-4 text-primary">
                {note.title}
              </h2>
              {note.content && Array.isArray(note.content) ? (
                <ul className="list-disc pl-5 mb-2">
                  {note.content.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : note.content ? (
                <p className="mb-2">{note.content}</p>
              ) : null}
              {note.code && (
                <pre className="bg-gray-950 text-blue-200 text-sm rounded-lg p-4 mt-2 overflow-x-auto border border-blue-800 font-mono">
                  <code>{note.code}</code>
                </pre>
              )}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .font-righteous {
          font-family: 'Righteous', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .gitnotes-vertical-stack {
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .gitnotes-card {
          width: 100%;
          margin-bottom: 2rem;
        }
        @media (max-width: 600px) {
          .gitnotes-card {
            min-width: 95vw;
            max-width: 99vw;
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default GitNotes;
