export type Company = {
  id: string;
  name: string;
  description: string;
  totalQuestions: number;
  difficulty: { easy: number; medium: number; hard: number };
  popularTags: string[];
};


