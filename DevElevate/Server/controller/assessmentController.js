import dotenv from "dotenv";
import OpenAI from "openai";
import mongoose from "mongoose";
import SkillAssessment from "../model/SkillAssessment.js";

dotenv.config();

const MODEL = process.env.OPENAI_ASSESSMENT_MODEL?.trim() || "gpt-4o-mini";

const openaiClient =
  process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== ""
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null;

const TRACK_CONFIG = {
  dsa: {
    displayName: "Data Structures & Algorithms",
    slug: "dsa",
    categories: [
      "Arrays & Strings",
      "Linked Lists",
      "Stacks & Queues",
      "Trees & Graphs",
      "Dynamic Programming",
    ],
    generationContext:
      "Focus on algorithmic reasoning, time complexity, and data structure trade-offs.",
    resources: {
      Beginner: [
        {
          title: "NeetCode Roadmap",
          url: "https://neetcode.io/roadmap",
          description:
            "Curated path that covers arrays, hash maps, and foundational problem patterns.",
          type: "course",
          focusAreas: ["Arrays & Strings", "Linked Lists"],
        },
        {
          title: "Big-O Cheat Sheet",
          url: "https://www.bigocheatsheet.com/",
          description:
            "Reference for time and space complexity to strengthen analytical skills.",
          type: "documentation",
          focusAreas: ["Arrays & Strings", "Stacks & Queues"],
        },
        {
          title: "LeetCode Explore: Data Structures",
          url: "https://leetcode.com/explore/learn/card/data-structure-tree/",
          description:
            "Interactive lessons and practice problems tailored for beginners.",
          type: "course",
          focusAreas: ["Trees & Graphs"],
        },
      ],
      Intermediate: [
        {
          title: "AlgoExpert Patterns",
          url: "https://algoexpert.io/product",
          description:
            "Pattern-based explanations and coding walkthroughs to sharpen problem solving.",
          type: "course",
          focusAreas: ["Trees & Graphs", "Dynamic Programming"],
        },
        {
          title: "CS50’s Introduction to Algorithms (edX)",
          url: "https://cs50.harvard.edu/x/2023/weeks/5/",
          description:
            "Deep dive into searching, sorting, and graph algorithms with visual aids.",
          type: "course",
          focusAreas: ["Trees & Graphs", "Dynamic Programming"],
        },
        {
          title: "LeetCode Weekly Contests",
          url: "https://leetcode.com/contest/",
          description:
            "Timed practice to build accuracy and speed under moderate pressure.",
          type: "project",
          focusAreas: ["Dynamic Programming", "Arrays & Strings"],
        },
      ],
      Advanced: [
        {
          title: "MIT 6.851: Advanced Data Structures",
          url: "https://ocw.mit.edu/courses/6-851-advanced-data-structures-spring-2012/",
          description:
            "Graduate-level treatment of advanced tree, graph, and amortized analysis.",
          type: "course",
          focusAreas: ["Trees & Graphs", "Dynamic Programming"],
        },
        {
          title: "USACO Guide - Gold & Platinum",
          url: "https://usaco.guide/",
          description:
            "High-level competitive programming topics with rigorous practice sets.",
          type: "course",
          focusAreas: ["Dynamic Programming"],
        },
        {
          title: "Codeforces Div.1 Practice",
          url: "https://codeforces.com/problemset",
          description:
            "Challenging problems that stress optimization and unique algorithmic insights.",
          type: "project",
          focusAreas: ["Dynamic Programming", "Trees & Graphs"],
        },
      ],
    },
    roadmap: {
      Beginner: {
        focus: "Master core data structures and asymptotic analysis.",
        summary:
          "Solidify fundamentals in arrays, linked lists, and stack/queue mechanics before tackling graph or DP problems.",
        actionItems: [
          "Review array operations, hashing, and two-pointer strategies.",
          "Implement linked lists, stacks, and queues from scratch in your preferred language.",
          "Solve 30 foundational LeetCode problems covering easy and easy-medium difficulty.",
          "Track time complexity for each solution to build an intuition for Big-O.",
        ],
      },
      Intermediate: {
        focus:
          "Strengthen graph reasoning and introduce dynamic programming patterns.",
        summary:
          "Build consistency on medium-level problems while closing knowledge gaps in recursion and state modeling.",
        actionItems: [
          "Practice tree traversals (BFS, DFS, recursion) and graph algorithms (Topological Sort, Dijkstra).",
          "Master at least four dynamic programming templates (knapsack, longest subsequence, grid paths, interval).",
          "Join weekly contests to benchmark progress and analyze failed attempts critically.",
          "Document solution patterns in a personal knowledge base to reuse for tougher problems.",
        ],
      },
      Advanced: {
        focus:
          "Optimize for performance and tackle hard-level problem variants.",
        summary:
          "Transition from pattern recognition to creative problem construction and optimization under constraints.",
        actionItems: [
          "Study advanced topics such as segment trees, binary indexed trees, heavy-light decomposition.",
          "Solve at least 15 hard problems focusing on graph theory, DP optimization, and combinatorics.",
          "Perform post-mortems on contest problems to understand editorial solutions you missed.",
          "Teach or document tough problems to others to cement depth of understanding.",
        ],
      },
    },
  },
  "web-development": {
    displayName: "Full-Stack Web Development",
    slug: "web-development",
    categories: [
      "HTML & CSS",
      "JavaScript Fundamentals",
      "Frontend Frameworks",
      "Backend APIs",
      "DevOps & Deployment",
    ],
    generationContext:
      "Balance questions across client-side foundations, modern frameworks, backend services, and deployment best practices.",
    resources: {
      Beginner: [
        {
          title: "MDN Web Docs: Learning Area",
          url: "https://developer.mozilla.org/en-US/docs/Learn",
          description:
            "Comprehensive tutorials on HTML, CSS, and core JavaScript concepts.",
          type: "documentation",
          focusAreas: ["HTML & CSS", "JavaScript Fundamentals"],
        },
        {
          title: "Frontend Mentor Newbie Challenges",
          url: "https://www.frontendmentor.io/challenges?filters=free",
          description:
            "Practical UI implementation tasks to build hands-on confidence.",
          type: "project",
          focusAreas: ["HTML & CSS"],
        },
        {
          title: "Net Ninja JavaScript Playlist",
          url: "https://youtube.com/playlist?list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp",
          description:
            "Beginner-friendly video series covering fundamentals and DOM manipulation.",
          type: "video",
          focusAreas: ["JavaScript Fundamentals"],
        },
      ],
      Intermediate: [
        {
          title: "Full Stack Open",
          url: "https://fullstackopen.com/en/",
          description:
            "Deep dive into React, Node.js, GraphQL, and testing with real projects.",
          type: "course",
          focusAreas: ["Frontend Frameworks", "Backend APIs"],
        },
        {
          title: "Testing Next.js Applications",
          url: "https://testing-library.com/docs/example-react",
          description:
            "Learn to write resilient frontend tests using Testing Library and Jest.",
          type: "documentation",
          focusAreas: ["Frontend Frameworks"],
        },
        {
          title: "Build a REST API with Express & Prisma",
          url: "https://www.prisma.io/docs/getting-started/quickstart",
          description:
            "Modern backend patterns with relational data modeling and type safety.",
          type: "course",
          focusAreas: ["Backend APIs"],
        },
      ],
      Advanced: [
        {
          title: "Architecting Scalable Web Apps (Frontend Masters)",
          url: "https://frontendmasters.com/courses/scalable-architecture/",
          description:
            "Advanced patterns for performance, state management, and maintainability.",
          type: "course",
          focusAreas: ["Frontend Frameworks", "DevOps & Deployment"],
        },
        {
          title: "TypeScript Deep Dive",
          url: "https://basarat.gitbook.io/typescript/",
          description:
            "In-depth guide to advanced TypeScript patterns for large codebases.",
          type: "documentation",
          focusAreas: ["Frontend Frameworks", "Backend APIs"],
        },
        {
          title: "Production-Ready Next.js & Vercel",
          url: "https://nextjs.org/learn/dashboard-app",
          description:
            "Official guide to building, securing, and deploying full-stack Next.js apps.",
          type: "course",
          focusAreas: ["DevOps & Deployment"],
        },
      ],
    },
    roadmap: {
      Beginner: {
        focus: "Build strong UI foundations and JavaScript fluency.",
        summary:
          "Prioritize semantic HTML, responsive CSS, and DOM manipulation before layering frameworks.",
        actionItems: [
          "Recreate three responsive layouts (landing page, dashboard, blog) in pure HTML/CSS.",
          "Implement common UI components (modals, tabs, accordions) using vanilla JavaScript.",
          "Complete at least two Frontend Mentor newbie challenges and publish them.",
          "Document learning notes on accessibility and responsive design patterns.",
        ],
      },
      Intermediate: {
        focus: "Design maintainable frontend architecture and robust APIs.",
        summary:
          "Combine framework best practices with secure backend design and testing coverage.",
        actionItems: [
          "Build a full-stack app with authentication, CRUD APIs, and database integration.",
          "Introduce automated testing (unit + integration) for critical components.",
          "Explore server-side rendering and API caching strategies.",
          "Deploy projects using CI/CD pipelines (GitHub Actions + Vercel/Render).",
        ],
      },
      Advanced: {
        focus: "Optimize for scale, reliability, and developer experience.",
        summary:
          "Elevate system design, observability, and performance tuning across the stack.",
        actionItems: [
          "Implement advanced state management (Redux Toolkit Query, React Query, Zustand).",
          "Experiment with micro frontends or module federation in a controlled project.",
          "Add observability (logging, metrics, tracing) to an existing backend service.",
          "Conduct performance audits (Lighthouse, Web Vitals) and optimize build pipelines.",
        ],
      },
    },
  },
  "machine-learning": {
    displayName: "Machine Learning Engineering",
    slug: "machine-learning",
    categories: [
      "ML Fundamentals",
      "Feature Engineering",
      "Model Evaluation",
      "Deep Learning",
      "MLOps",
    ],
    generationContext:
      "Include conceptual understanding, workflow design, and interpretation of model performance.",
    resources: {
      Beginner: [
        {
          title: "Andrew Ng’s Machine Learning (Coursera)",
          url: "https://www.coursera.org/learn/machine-learning",
          description:
            "Classic introduction covering supervised learning, logistic regression, and regularization.",
          type: "course",
          focusAreas: ["ML Fundamentals"],
        },
        {
          title: "Hands-On Machine Learning with Scikit-Learn",
          url: "https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/",
          description:
            "Book with practical notebooks for building intuition and feature engineering.",
          type: "documentation",
          focusAreas: ["Feature Engineering"],
        },
        {
          title: "Kaggle Micro-Courses",
          url: "https://www.kaggle.com/learn",
          description:
            "Short lessons with hands-on notebooks to fast-track core ML skills.",
          type: "course",
          focusAreas: ["ML Fundamentals", "Model Evaluation"],
        },
      ],
      Intermediate: [
        {
          title: "Fast.ai Practical Deep Learning",
          url: "https://course.fast.ai/",
          description:
            "Project-based curriculum emphasizing experimentation and deployment.",
          type: "course",
          focusAreas: ["Deep Learning", "Model Evaluation"],
        },
        {
          title: "Made With ML (Goku Mohandas)",
          url: "https://madewithml.com/",
          description:
            "End-to-end ML engineering tutorials with production considerations.",
          type: "course",
          focusAreas: ["Feature Engineering", "MLOps"],
        },
        {
          title: "Interpretable ML Guide",
          url: "https://christophm.github.io/interpretable-ml-book/",
          description:
            "Techniques for explainability, SHAP, and responsible model evaluation.",
          type: "documentation",
          focusAreas: ["Model Evaluation"],
        },
      ],
      Advanced: [
        {
          title: "Full Stack Deep Learning",
          url: "https://fullstackdeeplearning.com/",
          description:
            "Covers data pipelines, experiment tracking, deployment, and monitoring.",
          type: "course",
          focusAreas: ["Deep Learning", "MLOps"],
        },
        {
          title: "Stanford CS229 Lecture Notes",
          url: "https://cs229.stanford.edu/syllabus.html",
          description:
            "Mathematical depth on optimization, probabilistic models, and inference.",
          type: "documentation",
          focusAreas: ["ML Fundamentals", "Model Evaluation"],
        },
        {
          title: "Kubeflow Pipelines",
          url: "https://www.kubeflow.org/docs/components/pipelines/v1/introduction/",
          description:
            "Hands-on MLOps tooling for reproducible workflows and scalable deployment.",
          type: "documentation",
          focusAreas: ["MLOps"],
        },
      ],
    },
    roadmap: {
      Beginner: {
        focus:
          "Develop intuition for supervised learning and evaluation metrics.",
        summary:
          "Focus on translating problem statements into ML tasks with appropriate baseline models.",
        actionItems: [
          "Re-implement linear and logistic regression using NumPy to internalize math foundations.",
          "Experiment with feature scaling, encoding, and cross-validation on tabular datasets.",
          "Use Kaggle competitions to practice exploratory data analysis and baseline modeling.",
          "Summarize learnings in a project portfolio with visualizations and metric interpretation.",
        ],
      },
      Intermediate: {
        focus: "Ship robust models with reliable experimentation workflows.",
        summary:
          "Bridge research and production by tracking experiments, evaluating drift, and automating pipelines.",
        actionItems: [
          "Implement experiment tracking with Weights & Biases or MLflow.",
          "Build and deploy a REST inference service (FastAPI) with automated evaluation.",
          "Apply model interpretability techniques (SHAP, LIME) to ensure responsible outcomes.",
          "Refine data versioning and validation checks using Great Expectations or similar tooling.",
        ],
      },
      Advanced: {
        focus:
          "Scale deep learning systems and streamline MLOps infrastructure.",
        summary:
          "Optimize performance across distributed training, CI/CD for ML, and continuous monitoring.",
        actionItems: [
          "Optimize training using mixed precision and distributed strategies (DDP, Horovod).",
          "Set up automated retraining triggered by data drift detection.",
          "Integrate model monitoring dashboards for latency, accuracy, and fairness indicators.",
          "Lead a project retro to codify best practices for your ML lifecycle.",
        ],
      },
    },
  },
  "data-science": {
    displayName: "Data Science & Analytics",
    slug: "data-science",
    categories: [
      "Statistics & Probability",
      "Data Wrangling",
      "Visualization",
      "Predictive Modeling",
      "Business Insights",
    ],
    generationContext:
      "Blend quantitative reasoning, storytelling with data, and practical tool usage.",
    resources: {
      Beginner: [
        {
          title: "IBM Data Analyst Professional Certificate",
          url: "https://www.coursera.org/professional-certificates/ibm-data-analyst",
          description:
            "Foundational tools including Excel, SQL, and Python for analytics workflows.",
          type: "course",
          focusAreas: ["Data Wrangling", "Visualization"],
        },
        {
          title: "Practical Statistics for Data Scientists",
          url: "https://www.oreilly.com/library/view/practical-statistics-for/9781492072935/",
          description:
            "Book covering must-know statistical tests and interpretations for DS.",
          type: "documentation",
          focusAreas: ["Statistics & Probability"],
        },
        {
          title: "Storytelling with Data Blog",
          url: "https://www.storytellingwithdata.com/blog",
          description:
            "Practical tips to transform analysis into clear, actionable visuals.",
          type: "article",
          focusAreas: ["Visualization", "Business Insights"],
        },
      ],
      Intermediate: [
        {
          title: "Kaggle Data Visualization & Advanced SQL Tracks",
          url: "https://www.kaggle.com/learn",
          description:
            "Hands-on notebooks for complex joins, window functions, and charting.",
          type: "course",
          focusAreas: ["Data Wrangling", "Visualization"],
        },
        {
          title: "Mode Analytics SQL Tutorial",
          url: "https://mode.com/sql-tutorial/",
          description: "Applied SQL cases with business scenario walkthroughs.",
          type: "documentation",
          focusAreas: ["Business Insights", "Data Wrangling"],
        },
        {
          title: "Forecasting Principles & Practice",
          url: "https://otexts.com/fpp3/",
          description:
            "Comprehensive guide for time series forecasting using R and Python equivalents.",
          type: "documentation",
          focusAreas: ["Predictive Modeling"],
        },
      ],
      Advanced: [
        {
          title: "Uber Ludwig & MLflow Stack",
          url: "https://ludwig.ai/latest/",
          description:
            "Low-code yet extensible toolkit for production-ready modeling.",
          type: "documentation",
          focusAreas: ["Predictive Modeling"],
        },
        {
          title: "dbt Labs Analytics Engineering",
          url: "https://docs.getdbt.com/docs/introduction",
          description:
            "Modern data transformation and testing workflows for analytics teams.",
          type: "documentation",
          focusAreas: ["Data Wrangling"],
        },
        {
          title: "Mode Analytics Dashboards Gallery",
          url: "https://mode.com/gallery",
          description:
            "Example dashboards showcasing polished storytelling and stakeholder reporting.",
          type: "project",
          focusAreas: ["Visualization", "Business Insights"],
        },
      ],
    },
    roadmap: {
      Beginner: {
        focus: "Build statistical literacy and data cleaning proficiency.",
        summary:
          "Focus on exploring datasets end-to-end with attention to quality, bias, and descriptive statistics.",
        actionItems: [
          "Complete at least three Kaggle notebooks focusing on exploratory data analysis.",
          "Practice SQL joins, aggregations, and window functions on sample business datasets.",
          "Create visual summaries (Tableau/PowerBI/Matplotlib) and narrate key findings.",
          "Summarize statistical concepts (confidence intervals, hypothesis testing) in a study guide.",
        ],
      },
      Intermediate: {
        focus: "Translate analysis to insights with reproducible workflows.",
        summary:
          "Lean into automation, versioning, and stakeholder communication across analytics projects.",
        actionItems: [
          "Adopt a notebook-to-production workflow using modular Python scripts.",
          "Implement automated data quality checks and alerting on a pipeline.",
          "Deliver a storytelling deck that links visualizations to business outcomes.",
          "Experiment with predictive models and compare metrics (RMSE, AUC, F1).",
        ],
      },
      Advanced: {
        focus:
          "Scale analytics strategy and predictive solutions across teams.",
        summary:
          "Lead robust analytics initiatives, covering governance, experimentation, and advanced modeling.",
        actionItems: [
          "Implement A/B testing frameworks and analyze uplift with statistical rigor.",
          "Deploy dashboards with role-based views and alerting for business stakeholders.",
          "Productionize a predictive model and monitor drift, data quality, and ROI.",
          "Mentor others by formalizing best practices documentation and code reviews.",
        ],
      },
    },
  },
  "cloud-devops": {
    displayName: "Cloud & DevOps Engineering",
    slug: "cloud-devops",
    categories: [
      "Cloud Foundations",
      "Infrastructure as Code",
      "CI/CD Automation",
      "Monitoring & Observability",
      "Security & Reliability",
    ],
    generationContext:
      "Blend cloud architecture, automation strategies, and operational excellence concepts.",
    resources: {
      Beginner: [
        {
          title: "AWS Cloud Practitioner Essentials",
          url: "https://www.aws.training/Details/Curriculum?id=20685",
          description:
            "Entry-level overview of AWS services, billing, and shared responsibility.",
          type: "course",
          focusAreas: ["Cloud Foundations"],
        },
        {
          title: "Terraform Getting Started Guide",
          url: "https://developer.hashicorp.com/terraform/tutorials",
          description:
            "Hands-on tutorials to codify infrastructure using Terraform basics.",
          type: "documentation",
          focusAreas: ["Infrastructure as Code"],
        },
        {
          title: "GitHub Actions Starter Workflows",
          url: "https://github.com/actions/starter-workflows",
          description:
            "Templates to create CI pipelines quickly for multiple ecosystems.",
          type: "documentation",
          focusAreas: ["CI/CD Automation"],
        },
      ],
      Intermediate: [
        {
          title: "Kubernetes the Hard Way",
          url: "https://github.com/kelseyhightower/kubernetes-the-hard-way",
          description:
            "Build a Kubernetes cluster from scratch to master core primitives.",
          type: "project",
          focusAreas: ["Cloud Foundations", "Infrastructure as Code"],
        },
        {
          title: "Designing CI/CD Pipelines with GitHub Actions",
          url: "https://learn.microsoft.com/en-us/training/paths/ci-cd-github-actions/",
          description:
            "Structured path covering approval gates, environments, and secrets management.",
          type: "course",
          focusAreas: ["CI/CD Automation"],
        },
        {
          title: "Grafana Observability Stack",
          url: "https://grafana.com/oss/grafana/",
          description:
            "Set up metrics, logs, and traces dashboards with Grafana, Prometheus, and Loki.",
          type: "documentation",
          focusAreas: ["Monitoring & Observability"],
        },
      ],
      Advanced: [
        {
          title: "AWS Well-Architected Labs",
          url: "https://wellarchitectedlabs.com/",
          description:
            "Hands-on labs to implement cost, reliability, and security best practices.",
          type: "course",
          focusAreas: ["Security & Reliability"],
        },
        {
          title: "Google SRE Workbook",
          url: "https://sre.google/workbook/",
          description:
            "Practical exercises covering SLIs, SLOs, error budgets, and incident response.",
          type: "documentation",
          focusAreas: ["Monitoring & Observability", "Security & Reliability"],
        },
        {
          title: "Spacelift Terraform Advanced Workshops",
          url: "https://spacelift.io/",
          description:
            "Advanced infrastructure automation scenarios with policy-as-code.",
          type: "course",
          focusAreas: ["Infrastructure as Code", "Security & Reliability"],
        },
      ],
    },
    roadmap: {
      Beginner: {
        focus: "Understand core cloud services and foundational automation.",
        summary:
          "Develop fluency in essential cloud concepts while codifying infrastructure safely.",
        actionItems: [
          "Complete cloud provider free-tier labs (AWS, Azure, or GCP) focusing on compute, storage, networking.",
          "Automate provisioning of a simple web app using Terraform or Pulumi.",
          "Configure CI/CD for a sample app with automated tests and environment promotions.",
          "Document shared responsibility model and basic IAM practices.",
        ],
      },
      Intermediate: {
        focus:
          "Operationalize container orchestration and resilient CI/CD pipelines.",
        summary:
          "Lean into orchestration, observability, and secure delivery workflows.",
        actionItems: [
          "Deploy containerized services to Kubernetes with autoscaling and secrets management.",
          "Integrate automated security scanning and linting into CI pipelines.",
          "Implement centralized logging and metrics dashboards with alerting.",
          "Conduct a game day exercise to improve incident response readiness.",
        ],
      },
      Advanced: {
        focus:
          "Optimize reliability, security posture, and platform scalability.",
        summary:
          "Drive platform strategy with governance, automation at scale, and proactive resilience.",
        actionItems: [
          "Design multi-region or hybrid-cloud architecture with failover strategies.",
          "Implement policy-as-code and guardrails for infrastructure provisioning.",
          "Establish SLOs, SLIs, and runbooks for critical services.",
          "Introduce chaos engineering experiments to validate resilience assumptions.",
        ],
      },
    },
  },
};

const TRACK_ALIASES = {
  dsa: "dsa",
  "data-structures": "dsa",
  "data structures": "dsa",
  "data structures & algorithms": "dsa",
  "web development": "web-development",
  "web-development": "web-development",
  frontend: "web-development",
  "full stack": "web-development",
  "full-stack": "web-development",
  "machine learning": "machine-learning",
  "machine-learning": "machine-learning",
  ml: "machine-learning",
  ai: "machine-learning",
  "data science": "data-science",
  "data-science": "data-science",
  analytics: "data-science",
  cloud: "cloud-devops",
  "cloud-devops": "cloud-devops",
  devops: "cloud-devops",
  "cloud & devops": "cloud-devops",
};

const LETTERS = ["A", "B", "C", "D", "E", "F"];

const normalizeTrack = (track) => {
  if (!track) return null;
  const normalized = track.trim().toLowerCase();
  return (
    TRACK_ALIASES[normalized] ||
    TRACK_ALIASES[normalized.replace(/\s+/g, " ")] ||
    null
  );
};

const ensureOpenAIClient = () => {
  if (!openaiClient) {
    const error = new Error(
      "OpenAI API key is not configured. Set OPENAI_API_KEY in the environment."
    );
    error.statusCode = 500;
    throw error;
  }
  return openaiClient;
};

const determineSkillLevel = (score) => {
  if (score >= 76) return "Advanced";
  if (score >= 41) return "Intermediate";
  return "Beginner";
};

const sanitizeAnswerAgainstOptions = (answer, options = []) => {
  if (!answer) return "";
  const trimmed = answer.trim();
  if (!options.length) return trimmed;

  if (trimmed.length === 1) {
    const index = LETTERS.indexOf(trimmed.toUpperCase());
    if (index >= 0 && index < options.length) {
      return options[index];
    }
  }

  const normalizedOptions = options.map((opt) => opt.trim().toLowerCase());
  const optionIndex = normalizedOptions.indexOf(trimmed.toLowerCase());
  if (optionIndex >= 0) {
    return options[optionIndex];
  }
  return trimmed;
};

const pickResources = (track, skillLevel, improvementAreas = []) => {
  const config = TRACK_CONFIG[track];
  if (!config) return [];
  const pool = config.resources[skillLevel] || [];
  if (!improvementAreas.length) {
    return pool.slice(0, 3);
  }

  const prioritized = [];
  const usedIndexes = new Set();

  improvementAreas.forEach((area) => {
    const matchIndex = pool.findIndex(
      (resource, idx) =>
        !usedIndexes.has(idx) &&
        resource.focusAreas?.some(
          (focus) =>
            focus.toLowerCase() === area.toLowerCase() ||
            area.toLowerCase().includes(focus.toLowerCase()) ||
            focus.toLowerCase().includes(area.toLowerCase())
        )
    );
    if (matchIndex >= 0) {
      prioritized.push(pool[matchIndex]);
      usedIndexes.add(matchIndex);
    }
  });

  if (prioritized.length < 3) {
    for (let i = 0; i < pool.length && prioritized.length < 3; i += 1) {
      if (!usedIndexes.has(i)) {
        prioritized.push(pool[i]);
        usedIndexes.add(i);
      }
    }
  }

  return prioritized.slice(0, 3);
};

const buildRoadmap = (track, skillLevel, improvementAreas = []) => {
  const config = TRACK_CONFIG[track];
  if (!config) return null;
  const base = config.roadmap[skillLevel];
  if (!base) return null;

  const uniqueAreas = improvementAreas
    .filter(Boolean)
    .map((area) => area.trim())
    .filter((value, index, arr) => value && arr.indexOf(value) === index)
    .slice(0, 4);

  return {
    ...base,
    focus: base.focus,
    summary:
      uniqueAreas.length > 0
        ? `${base.summary} Prioritize closing gaps in ${uniqueAreas.join(
            ", "
          )}.`
        : base.summary,
    actionItems: base.actionItems,
  };
};

const callOpenAIForQuestions = async (track, questionCount, difficulty) => {
  const client = ensureOpenAIClient();
  const config = TRACK_CONFIG[track];
  if (!config) {
    const error = new Error("Unsupported track requested for assessment.");
    error.statusCode = 400;
    throw error;
  }

  const prompt = `
Create ${questionCount} multiple choice questions for the ${
    config.displayName
  } track.

Context:
- Difficulty: ${difficulty}
- Focus areas: ${config.categories.join(", ")}
- ${config.generationContext}

Requirements:
- Each question must be challenging yet fair for the specified difficulty.
- Provide exactly 4 options per question.
- The correct answer must match one of the options exactly.
- Include a one sentence explanation.
- Tag each question with a category chosen from: ${config.categories.join(
    ", "
  )}.

Output JSON schema:
{
  "questions": [
    {
      "prompt": "Question text",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": "Exact option text",
      "explanation": "Brief explanation",
      "category": "One category from the provided list"
    }
  ]
}

Return ONLY valid JSON.`;

  const response = await client.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content:
          "You are an experienced technical interviewer. Always return clean JSON following the requested schema.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: { type: "json_object" },
  });

  if (
    !response.choices ||
    !response.choices[0] ||
    !response.choices[0].message
  ) {
    throw new Error("OpenAI did not return any content for the assessment.");
  }

  const parsed = JSON.parse(response.choices[0].message.content);
  if (!parsed?.questions || !Array.isArray(parsed.questions)) {
    throw new Error("OpenAI response missing questions array.");
  }

  return parsed.questions;
};

const callOpenAIForFeedback = async ({
  track,
  score,
  skillLevel,
  totalQuestions,
  correctCount,
  incorrectDetails,
}) => {
  if (!openaiClient) return null;

  const config = TRACK_CONFIG[track];
  if (!config) return null;

  const prompt = `
Analyze the following skill assessment results and produce concise improvement guidance.

Track: ${config.displayName}
Score: ${score}%
Skill Level: ${skillLevel}
Correct Questions: ${correctCount} / ${totalQuestions}
Incorrect Question Topics: ${incorrectDetails
    .map(
      (detail) => `{
  "category": "${detail.category}",
  "prompt": "${detail.prompt.replace(/"/g, '\\"')}",
  "correctAnswer": "${detail.correctAnswer.replace(/"/g, '\\"')}"
}`
    )
    .join(",\n")}

Return JSON with this structure:
{
  "summary": "1-2 sentence learner-friendly summary",
  "improvementAreas": ["Category A", "Category B"],
  "encouragement": "One short encouraging sentence"
}

If there are no incorrect questions, provide an empty array for improvementAreas.`;

  try {
    const response = await openaiClient.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a friendly career mentor who gives constructive, specific feedback. Always return valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    if (
      !response.choices ||
      !response.choices[0] ||
      !response.choices[0].message
    )
      return null;
    const parsed = JSON.parse(response.choices[0].message.content);

    if (!parsed.summary || !parsed.improvementAreas) return null;
    return parsed;
  } catch (error) {
    console.error("OpenAI feedback generation failed:", error.message);
    return null;
  }
};

export const generateAssessment = async (req, res) => {
  try {
    const { track, questionCount = 7, difficulty = "Intermediate" } = req.body;

    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required to generate assessments.",
      });
    }

    const normalizedTrack = normalizeTrack(track);
    if (!normalizedTrack || !TRACK_CONFIG[normalizedTrack]) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid track. Choose from DSA, Web Development, Machine Learning, Data Science, or Cloud / DevOps.",
      });
    }

    if (questionCount < 5 || questionCount > 10) {
      return res.status(400).json({
        success: false,
        message: "questionCount must be between 5 and 10.",
      });
    }

    const cappedDifficulty = ["Beginner", "Intermediate", "Advanced"].includes(
      difficulty
    )
      ? difficulty
      : "Intermediate";

    const questions = await callOpenAIForQuestions(
      normalizedTrack,
      questionCount,
      cappedDifficulty
    );

    const assessment = await SkillAssessment.create({
      userId: req.user._id,
      track: normalizedTrack,
      questionCount,
      difficulty: cappedDifficulty,
      questions: questions.map((question) => ({
        prompt: question.prompt,
        options: question.options,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        category: question.category,
      })),
    });

    const responseQuestions = assessment.questions.map((q) => ({
      id: q._id,
      prompt: q.prompt,
      options: q.options,
      type: q.type,
      category: q.category,
    }));

    return res.status(201).json({
      success: true,
      assessment: {
        id: assessment._id,
        track: normalizedTrack,
        trackLabel: TRACK_CONFIG[normalizedTrack].displayName,
        questionCount: assessment.questionCount,
        difficulty: assessment.difficulty,
        status: assessment.status,
        generatedAt: assessment.generatedAt,
        questions: responseQuestions,
      },
    });
  } catch (error) {
    console.error("Error generating assessment:", error);
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Failed to generate assessment. Please try again later."
          : error.message,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const submitAssessment = async (req, res) => {
  try {
    const { assessmentId, responses, timeTakenInSeconds } = req.body;

    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    if (
      !assessmentId ||
      !mongoose.Types.ObjectId.isValid(assessmentId) ||
      !Array.isArray(responses) ||
      responses.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "assessmentId and responses array are required to submit assessment.",
      });
    }

    const assessment = await SkillAssessment.findOne({
      _id: assessmentId,
      userId: req.user._id,
    });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found.",
      });
    }

    if (assessment.status === "completed") {
      return res.status(400).json({
        success: false,
        message:
          "Assessment already submitted. Please generate a new assessment.",
      });
    }

    let correctCount = 0;
    const evaluatedResponses = assessment.questions.map((question) => {
      const response = responses.find(
        (r) =>
          r.questionId &&
          new mongoose.Types.ObjectId(r.questionId).equals(question._id)
      );

      if (!response) {
        return {
          questionId: question._id,
          userAnswer: "",
          isCorrect: false,
          feedback: "No answer provided.",
          scoreAwarded: 0,
        };
      }

      const userAnswer = sanitizeAnswerAgainstOptions(
        response.answer,
        question.options
      );
      const correctAnswer = sanitizeAnswerAgainstOptions(
        question.correctAnswer,
        question.options
      );

      const isCorrect =
        userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();

      if (isCorrect) {
        correctCount += 1;
      }

      return {
        questionId: question._id,
        userAnswer,
        isCorrect,
        feedback: isCorrect
          ? "Great job! You nailed it."
          : `Review this concept. Correct answer: ${correctAnswer}.`,
        scoreAwarded: isCorrect ? 1 : 0,
      };
    });

    const totalQuestions = assessment.questionCount;
    const score = Math.round((correctCount / totalQuestions) * 100);
    const accuracy = score;
    const skillLevel = determineSkillLevel(score);

    const incorrectDetails = assessment.questions
      .map((question) => {
        const entry = evaluatedResponses.find((r) =>
          new mongoose.Types.ObjectId(r.questionId).equals(question._id)
        );
        if (!entry?.isCorrect) {
          return {
            questionId: question._id,
            category: question.category,
            prompt: question.prompt,
            correctAnswer: question.correctAnswer,
          };
        }
        return null;
      })
      .filter(Boolean);

    const fallbackImprovementAreas = incorrectDetails
      .map((detail) => detail.category)
      .filter(Boolean)
      .map((area) => area.trim())
      .filter((value, index, arr) => value && arr.indexOf(value) === index)
      .slice(0, 4);

    const feedback = (await callOpenAIForFeedback({
      track: assessment.track,
      score,
      skillLevel,
      totalQuestions,
      correctCount,
      incorrectDetails,
    })) || {
      summary:
        score === 100
          ? "Phenomenal work! You demonstrated complete mastery on this challenge."
          : "Solid effort. Let’s focus on the categories where you missed a few questions.",
      improvementAreas: fallbackImprovementAreas,
      encouragement:
        score >= 75
          ? "Keep pushing — you’re on the brink of mastery!"
          : "Consistency will pay off. Keep practicing!",
    };

    const improvementAreas =
      feedback.improvementAreas && feedback.improvementAreas.length
        ? feedback.improvementAreas.slice(0, 4)
        : fallbackImprovementAreas;

    const recommendedResources = pickResources(
      assessment.track,
      skillLevel,
      improvementAreas
    );

    const roadmapRecommendations = buildRoadmap(
      assessment.track,
      skillLevel,
      improvementAreas
    );

    assessment.responses = evaluatedResponses;
    assessment.score = score;
    assessment.accuracy = accuracy;
    assessment.skillLevel = skillLevel;
    assessment.improvementAreas = improvementAreas;
    assessment.recommendedResources = recommendedResources;
    assessment.roadmapRecommendations = roadmapRecommendations;
    assessment.status = "completed";
    assessment.completedAt = new Date();
    if (typeof timeTakenInSeconds === "number") {
      assessment.timeTaken = timeTakenInSeconds;
    }

    await assessment.save();

    return res.status(200).json({
      success: true,
      assessment: {
        id: assessment._id,
        track: assessment.track,
        trackLabel: TRACK_CONFIG[assessment.track]?.displayName,
        score,
        accuracy,
        skillLevel,
        improvementAreas,
        summary: feedback.summary,
        encouragement: feedback.encouragement,
        totalQuestions,
        correctCount,
        responses: evaluatedResponses.map((r) => ({
          questionId: r.questionId,
          userAnswer: r.userAnswer,
          isCorrect: r.isCorrect,
          feedback: r.feedback,
        })),
        recommendedResources,
        roadmapRecommendations,
        completedAt: assessment.completedAt,
      },
    });
  } catch (error) {
    console.error("Error submitting assessment:", error);
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Failed to evaluate assessment. Please try again."
          : error.message,
    });
  }
};

export const getAssessmentHistory = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const { limit = 10 } = req.query;
    const history = await SkillAssessment.find({
      userId: req.user._id,
      status: "completed",
    })
      .sort({ completedAt: -1 })
      .limit(Number(limit))
      .lean();

    return res.status(200).json({
      success: true,
      assessments: history.map((entry) => ({
        id: entry._id,
        track: entry.track,
        trackLabel: TRACK_CONFIG[entry.track]?.displayName,
        score: entry.score,
        skillLevel: entry.skillLevel,
        accuracy: entry.accuracy,
        improvementAreas: entry.improvementAreas,
        completedAt: entry.completedAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching assessment history:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to retrieve assessment history.",
    });
  }
};

export const getLatestAssessmentSummary = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const latest = await SkillAssessment.findOne({
      userId: req.user._id,
      status: "completed",
    })
      .sort({ completedAt: -1 })
      .lean();

    if (!latest) {
      return res.status(200).json({
        success: true,
        assessment: null,
      });
    }

    return res.status(200).json({
      success: true,
      assessment: {
        id: latest._id,
        track: latest.track,
        trackLabel: TRACK_CONFIG[latest.track]?.displayName,
        score: latest.score,
        accuracy: latest.accuracy,
        skillLevel: latest.skillLevel,
        improvementAreas: latest.improvementAreas,
        recommendedResources: latest.recommendedResources || [],
        roadmapRecommendations: latest.roadmapRecommendations || null,
        completedAt: latest.completedAt,
      },
    });
  } catch (error) {
    console.error("Error fetching latest assessment summary:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch latest assessment.",
    });
  }
};
