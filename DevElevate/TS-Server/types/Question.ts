interface Question {
  _id?: string;
  questionText?: string;
  options?: string[];
  correctAnswer?: string;
  [key: string]: any; // For extensibility
}