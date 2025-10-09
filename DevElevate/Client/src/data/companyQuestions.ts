import type { Company } from "../types/dsa";

export const companies: Company[] = [
  {
    id: "google",
    name: "Google",
    description: "High-quality algorithmic challenges focusing on problem solving and scalability.",
    totalQuestions: 12,
    difficulty: { easy: 3, medium: 6, hard: 3 },
    popularTags: ["Arrays", "Graphs", "DP"],
  },
  {
    id: "microsoft",
    name: "Microsoft",
    description: "Data structures and system thinking with coding implementation questions.",
    totalQuestions: 10,
    difficulty: { easy: 3, medium: 5, hard: 2 },
    popularTags: ["Trees", "Strings", "Bit Manipulation"],
  },
  {
    id: "amazon",
    name: "Amazon",
    description: "Customer-obsessed problem solving with frequent arrays, hashing, and graphs.",
    totalQuestions: 11,
    difficulty: { easy: 4, medium: 5, hard: 2 },
    popularTags: ["Hashing", "Greedy", "Graphs"],
  },
];

export type { Company };


