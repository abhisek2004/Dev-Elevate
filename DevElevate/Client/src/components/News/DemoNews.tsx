import { Post } from "./Types";

export const demoNewsItems: Post[] = [
  {
    id: "1",
    title: "React 18.3 Released with New Features",
    summary:
      "Latest React version brings performance improvements and new hooks",
    url: "#",
    publishDate: new Date().toISOString(),
    category: "tech",
  },
  {
    id: "2",
    title: "Google Summer Internship 2024",
    summary: "Applications open for software engineering internships",
    url: "#",
    publishDate: new Date().toISOString(),
    category: "internships",
  },
  {
    id: "3",
    title: "AI/ML Engineer Positions at Microsoft",
    summary: "Multiple openings for machine learning specialists",
    url: "#",
    publishDate: new Date().toISOString(),
    category: "jobs",
  },
      {
      id: '4',
      title: 'DevFest 2024 - Global Developer Conference',
      summary: 'Join developers worldwide for the biggest tech conference of the year. Virtual and in-person options available.',
      url: '#',
      publishDate: new Date(Date.now() - 259200000).toISOString(),
      category: 'events' as const
    },
    {
      id: '5',
      title: 'OpenAI Introduces GPT-4 Turbo with Vision',
      summary: 'New multimodal capabilities allow GPT-4 to understand and generate content from images and text.',
      url: '#',
      publishDate: new Date(Date.now() - 345600000).toISOString(),
      category: 'tech' as const
    },
    {
      id: '6',
      title: 'Amazon SDE Positions - Multiple Locations',
      summary: 'Amazon is hiring software development engineers across Seattle, Austin, and remote positions.',
      url: '#',
      publishDate: new Date(Date.now() - 432000000).toISOString(),
      category: 'jobs' as const
    }
];
