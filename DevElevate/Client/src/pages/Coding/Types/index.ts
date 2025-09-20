export interface User {
  id: string;
  email: string;
  username: string;
  role: "user" | "admin";
  stats: {
    solved: number;
    attempted: number;
    streak: number;
    totalSubmissions: number;
    ranking: number;
  };
  createdAt: string;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  tags: string[];
  examples: Example[];
  constraints: string[];
  testCases: TestCase[];
  acceptance: number;
  submissions: number;
  starterCode: Record<string, string>;
  createdAt: string;
  contestSubmissions?: number;
  contestAcceptance?: number;
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  hidden: boolean;
}

export interface Submission {
  id: string;
  userId: string;
  problemId: string;
  code: string;
  language: string;
  status:
    | "Accepted"
    | "Wrong Answer"
    | "Time Limit Exceeded"
    | "Runtime Error"
    | "Compilation Error";
  runtime?: number;
  memory?: number;
  submittedAt: string;
}

export interface Language {
  id: string;
  name: string;
  version: string;
  extension: string;
  aceMode: string;
  monacoLanguage: string;
}

export interface AIHint {
  type: "approach" | "optimization" | "syntax" | "algorithm";
  content: string;
  difficulty: number;
}
