interface QuizBody {
  title: string;
  topic: string;
  difficulty: string;
  type: string;
  questions: Question[];
  createdBy: string;
}
interface UpdateQuizBody {
  title?: string;
  topic?: string;
  difficulty?: string;
  // type?: string; // Uncomment if you want to update type here
}