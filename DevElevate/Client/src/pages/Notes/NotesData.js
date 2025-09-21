import { FileText, Atom, Paintbrush, Code2, Database, Server, GitBranch, Box, Cloud, Layout, Type, Braces, Network, TestTube2, Shield, Zap, GitPullRequestArrow } from 'lucide-react';

const notesData = [
    {
        "name": "JavaScript Fundamentals",
        "content": "Core concepts, syntax, and best practices for JavaScript development including ES6+ features",
        "icon": FileText,
        "link": "/notes/javascript",
        "customDocs": true
    },
    {
        "name": "Git & Version Control",
        "content": "Version control workflows, branching strategies, and collaborative development practices",
        "icon": GitBranch,
        "link": "/notes/git",
        "customDocs": true
    },
    {
        "name": "CSS Mastery",
        "content": "Advanced CSS techniques, flexbox, grid, and responsive design principles",
        "icon": Paintbrush,
        "link": "/notes/css",
        "customDocs": false
    },
    {
        "name": "Python Basics",
        "content": "Fundamental Python programming concepts, data structures, and syntax overview",
        "icon": Code2,
        "link": "/notes/python",
        "customDocs": true
    },
    {
        "name": "UI/UX Design Principles",
        "content": "User interface design concepts, prototyping, and design system implementation",
        "icon": Layout,
        "link": "/notes/design",
        "customDocs": false
    },
    {
        "name": "React Patterns",
        "content": "Advanced React patterns and techniques for building scalable applications with hooks",
        "icon": Atom,
        "link": "/notes/react",
        "customDocs": true
    },
    {
        "name": "TypeScript Essentials",
        "content": "Static typing for JavaScript, interfaces, generics, and advanced type system features",
        "icon": Type,
        "link": "/notes/typescript",
        "customDocs": false
    },
    {
        "name": "Database Systems",
        "content": "SQL queries, database design, normalization, and performance optimization techniques",
        "icon": Database,
        "link": "/notes/databases",
        "customDocs": false
    },
    {
        "name": "Node.js Development",
        "content": "Server-side JavaScript runtime, Express framework, and REST API development",
        "icon": Server,
        "link": "/notes/nodejs",
        "customDocs": false
    },
    {
        "name": "API Design & REST",
        "content": "RESTful API principles, HTTP methods, authentication, and API documentation best practices",
        "icon": Network,
        "link": "/notes/api-design",
        "customDocs": false
    },
    {
        "name": "Testing Strategies",
        "content": "Unit testing, integration testing, TDD/BDD approaches, and testing frameworks overview",
        "icon": TestTube2,
        "link": "/notes/testing",
        "customDocs": false
    },
    {
        "name": "Docker Containers",
        "content": "Containerization concepts, Docker commands, and deployment strategies with containers",
        "icon": Box,
        "link": "/notes/docker",
        "customDocs": false
    },
    {
        "name": "Data Structures & Algorithms",
        "content": "Common algorithms, time complexity, arrays, trees, graphs, and problem-solving patterns",
        "icon": Braces,
        "link": "/notes/algorithms",
        "customDocs": false
    },
    {
        "name": "Web Security",
        "content": "OWASP guidelines, authentication, authorization, XSS prevention, and secure coding practices",
        "icon": Shield,
        "link": "/notes/security",
        "customDocs": false
    },
    {
        "name": "Performance Optimization",
        "content": "Web performance metrics, code splitting, caching strategies, and frontend optimization techniques",
        "icon": Zap,
        "link": "/notes/performance",
        "customDocs": false
    },
    {
        "name": "AWS Cloud Services",
        "content": "Amazon Web Services overview, EC2, S3, Lambda, and cloud architecture patterns",
        "icon": Cloud,
        "link": "/notes/aws",
        "customDocs": false
    },
    {
        "name": "Microservices Architecture",
        "content": "Service decomposition, communication patterns, API gateways, and distributed system concepts",
        "icon": Network,
        "link": "/notes/microservices",
        "customDocs": false
    },
    {
        "name": "DevOps & CI/CD",
        "content": "Continuous integration, deployment pipelines, infrastructure as code, and automation practices",
        "icon": GitPullRequestArrow,
        "link": "/notes/devops",
        "customDocs": false
    }
];

export default notesData;