# 🛠️ CONTRIBUTING GUIDELINES – DevElevate

Welcome to **DevElevate**! 🚀

We’re thrilled to have you here and super excited about your interest in contributing to our open-source platform.
DevElevate is built to empower students, developers, and career seekers with intelligent tools and interactive learning experiences.

**✨ No contribution is too small – every bit helps!**

Please also make sure to read and follow our [Code of Conduct](CODE_OF_CONDUCT.md). 💖

> 🗺️ **Want an architecture overview or onboarding tips? Check out [LEARN.md](LEARN.md) for a detailed contributor roadmap!**


---

## 📌 Contribution Philosophy

Contributions are what make the **open-source community** an incredible place to learn, build, and grow. We welcome:

- 🐞 Bug Fixes
- ✨ New Features
- 🎨 UI/UX Enhancements
- 📄 Documentation Improvements
- 🧪 Test Case Additions
- 🧠 AI Prompt or Dataset Enhancements

> 💡 **First-time contributor?** Don’t worry, we got you! Just follow the step-by-step guide below.

---

## 🚀 Quick Start – How to Contribute

### 1. 🌟 Star the Repository

Give this repo a star to show your support!

### 2. 🍴 Fork This Repo

Click the `Fork` button on the top right corner of the repository.

### 3. 📥 Clone Your Fork

```bash
git clone https://github.com/<your-username>/Dev-Elevate.git
cd Dev-Elevate
```

### 4. 📦 Install Dependencies

This project has separate **Client** (frontend) and **Server** (backend) components. You need to install dependencies for both:

**📱 For the Client (Frontend - React/Vite):**
```bash
cd DevElevate/Client
npm install
```

**🖥️ For the Server (Backend - Node.js/Express):**
```bash
cd DevElevate/Server
npm install
```

### 5. 🚀 Run the Project (Dev Mode)

You need to run both the client and server in **separate terminals**:

**Terminal 1 - Start the Server (Backend):**
```bash
cd DevElevate/Server
node index.js
```

**Terminal 2 - Start the Client (Frontend):**
```bash
cd DevElevate/Client
npm run dev
```

> **💡 Platform Notes:** 
> - **Windows:** Use `cd DevElevate\Client` and `cd DevElevate\Server` (backslashes)
> - **Linux/Mac:** Use `cd DevElevate/Client` and `cd DevElevate/Server` (forward slashes)
> - The client will typically run on `http://localhost:5173` (Vite default)
> - The server will run on a port specified in the backend configuration

### 5.1. 🔧 Environment Configuration (Optional)

**For Server Setup:**
If you need to configure environment variables:
```bash
cd DevElevate/Server
# Copy the sample env file (if it exists)
cp .env.sample .env
# Edit .env file with your configuration
```

> **Note:** Initial login/register forms (user/admin) are UI-based only. Data is stored temporarily in memory/cache. Dashboard access is possible post sign-up.

Sure! Here's the updated and corrected contribution guideline, highlighting that **all commits should be made directly to the `main` branch** of the forked repository before creating a pull request:

---

### 6. 🔄 Add Remote Upstream

```bash
git remote add upstream https://github.com/abhisek2004/Dev-Elevate.git
git pull upstream main
```

---

### 7. 🌿 Always Work on Your `main` Branch

> ⚠️ **Important:** For this project, **do not create a new branch. Always make your changes directly in your forked repository’s `main` branch**.

```bash
git checkout main
```

Make sure you're on your fork's `main` branch before making changes.


### 8. 💻 Make Your Changes

Work your magic! ✨
Fix bugs, enhance UI, write logic — whatever your contribution is.

### 9. ✅ Add & Commit Changes

```bash
git add .
git commit -m "✨ Your concise commit message here"
```

### 10. 🚀 Push to Your Fork (Main Branch Only)

```bash
git push origin main
```

Or, if using a separate feature branch:

```bash
git push origin <your-branch-name>
```

### 11. 🔁 Create Pull Request (PR)

Go to your **forked repository** → Click on `Compare & Pull Request` → Submit your changes to the `main` branch of [Dev-Elevate](https://github.com/abhisek2004/Dev-Elevate.git)

---

✅ **Important**:

* Ensure your PR is from your **fork’s `main` branch** to `abhisek2004/Dev-Elevate`'s `main`.
* Do **not create PRs to any other branch**.


## 🧪 Contribution with GitHub Desktop (Alternative)

1. Clone the repo from GitHub Desktop
2. Switch/create a feature branch
3. Make your changes in your code editor
4. Commit & push via GitHub Desktop
5. Open PR on GitHub website

---

## 🧩 What Can You Work On?

- `frontend/`: UI components, responsiveness, dark mode, accessibility
- `backend/`: APIs, auth, DB models, middleware
- `AI/`: Study Buddy GPT integration, prompt improvements
- `utils/`: Tools, resume engine, file conversion, etc.
- `docs/`: Improve README, add guides, GIFs, or flowcharts

We also welcome:

- New roadmap or quiz content
- Resume templates
- AI datasets or chatbot prompts

---

## 📝 Issue Report Process

1. Go to [Issues](https://github.com/abhisek2004/Dev-Elevate/issues)
2. Describe the bug/feature clearly
3. Add appropriate labels (e.g., `bug`, `feature`, `good first issue`)
4. Wait to be assigned before starting work

---

## 🚀 Pull Request Process

1. Self-review your code ✅
2. Ensure proper formatting, variable names, and comments 💬
3. Attach screenshots/gifs if UI related 🖼️
4. Mention related issue using `Closes #issue_number`
5. Wait for review — we’ll provide feedback soon 👨‍💻👩‍💻

---

## 🧠 Need Help?

Check out these handy resources:

- [How to Fork a Repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
- [How to Create a PR](https://opensource.com/article/19/7/create-pull-request-github)
- [GitHub Docs](https://docs.github.com/en)
- Or ask in our Discussions/Discord group! 💬

You can also contact Project Owner:
**Abhisek Panda** – [abhisek2004panda@gmail.com](mailto:abhisek2004panda@gmail.com)

---

## 💖 Thank You!

Thanks a ton for being here and showing interest! Your contribution, big or small, means a lot to us.

> _Let's build something impactful together with DevElevate!_

Happy coding! ✨
