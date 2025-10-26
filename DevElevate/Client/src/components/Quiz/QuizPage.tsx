import React, { useState, useEffect } from "react";
import { Clock, BookOpen, Trophy, Play, Sparkles, History, AlertCircle, Trash2 } from "lucide-react";
import axiosInstance from "../../api/axiosinstance";
import QuizAttempt from "./QuizAttempt";
import QuizResults from "./QuizResults";
import AIQuizGenerator from "./AIQuizGenerator";
import { baseUrl } from "../../config/routes";
import { useGlobalState } from "../../contexts/GlobalContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"
export interface Quiz {
  _id: string;
  title: string;
  topic?: string;
  difficulty: "Easy" | "Medium" | "Hard";
  type: "MCQ" | "Code";
  questionCount: number;
  createdAt: string;
  isAIGenerated?: boolean;
}

interface QuizAttempt {
  _id: string;
  quizId: Quiz;
  score: number;
  totalQuestions: number;
  timeTaken: number;
  createdAt: string;
}

interface AuthData {
  user: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
  sessionToken: string;
}

export interface QuizResultsData {
  score: number;
  totalQuestions: number;
  percentage: number;
  timeTaken: number;
}

const QuizPage: React.FC = () => {
  const { state } = useGlobalState();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [attemptedQuizzes, setAttemptedQuizzes] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResultsData | null>(null);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [activeTab, setActiveTab] = useState("available");
  const [lastAttemptedQuiz, setLastAttemptedQuiz] = useState<Quiz | null>(null);
  const stored = localStorage.getItem("devElevateAuth");
  const authData: AuthData | null = stored ? JSON.parse(stored) : null;
  const [deleteQuizId, setDeleteQuizId] = useState<string | null>(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      await Promise.all([fetchQuizzes(), fetchAttemptedQuizzes()]);
    } catch (error: unknown) {
      console.error("Error fetching data:", error);
      const err = error as { response?: { data?: { message?: string } } };
      const errorMessage = err.response?.data?.message || "Failed to load quizzes. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizzes = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/user-quiz");
      setQuizzes(response.data as Quiz[]);
    } catch (error: unknown) {
      console.error("Error fetching quizzes:", error);
      throw error;
    }
  };

  const getLatestAttempts = (attempts: QuizAttempt[]): QuizAttempt[] => {
    const attemptMap = new Map<string, QuizAttempt>();

    attempts.forEach(attempt => {
      const quizId = attempt.quizId._id;
      const existing = attemptMap.get(quizId);

      if (!existing || new Date(attempt.createdAt) > new Date(existing.createdAt)) {
        attemptMap.set(quizId, attempt);
      }
    });

    return Array.from(attemptMap.values());
  };

  const fetchAttemptedQuizzes = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/user-quiz/attempts");
      setAttemptedQuizzes(response.data as QuizAttempt[]);
    } catch (error: unknown) {
      console.error("Error fetching attempted quizzes:", error);
    }
  };

  const handleQuizComplete = async (results: unknown) => {
    const quizResults = results as QuizResultsData;
    setQuizResults(quizResults);
    setLastAttemptedQuiz(selectedQuiz);

    setSelectedQuiz(null);
    setShowResults(true);

    await fetchAttemptedQuizzes();

    if (!authData) {
      console.warn("No auth data found, cannot log quiz completion");
      return;
    }

    try {
      const logData = {
        action: "quiz_complete",
        performedBy: authData.user.id,
        timestamp: new Date().toISOString(),
        details: `User ${authData.user.name} completed quiz`,
      };

      await fetch(`${baseUrl}/api/v1/admin/system-log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.sessionToken}`,
        },
        credentials: "include",
        body: JSON.stringify(logData),
      });
    } catch (error) {
      console.error("Failed to log quiz completion:", error);
    }
  };

  const handleDeleteQuiz = async (quizId: string) => {
    setDeleteQuizId(quizId);
  };
  
  const confirmDelete = async () => {
    if (!deleteQuizId) return;
  
    try {
      await axiosInstance.delete(`/api/v1/user-quiz/${deleteQuizId}`);
      
      toast.success("Quiz deleted successfully!");
      
      await fetchData();
    } catch (error: unknown) {
      console.error('Error deleting quiz:', error);
      const err = error as { response?: { data?: { message?: string } } };
      const errorMessage = err.response?.data?.message || 'Failed to delete quiz';
      setError(errorMessage);
      
      toast.error(errorMessage);
    } finally {
      setDeleteQuizId(null);
    }
  };

  const handleAIQuizGenerated = async (generatedQuiz?: Quiz) => {
    await fetchData();
  
    if (generatedQuiz && generatedQuiz._id) {
      toast.success("AI Quiz generated successfully!");
      
      setSelectedQuiz(generatedQuiz);
      setActiveTab("ai-generated");
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return state.darkMode
          ? "bg-green-900/30 text-green-400"
          : "bg-green-100 text-green-700";
      case "Medium":
        return state.darkMode
          ? "bg-yellow-900/30 text-yellow-400"
          : "bg-yellow-100 text-yellow-700";
      case "Hard":
        return state.darkMode
          ? "bg-red-900/30 text-red-400"
          : "bg-red-100 text-red-700";
      default:
        return state.darkMode
          ? "bg-gray-800 text-gray-300"
          : "bg-gray-100 text-gray-700";
    }
  };

  const renderQuizCard = (quiz: Quiz, showAttemptButton = true) => (
    <Card
      key={quiz._id}
      className={`hover:shadow-lg transition-all duration-200 ${state.darkMode
        ? 'border-gray-700 bg-gray-800'
        : 'border-gray-200 bg-white'
        }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <BookOpen className={`h-5 w-5 ${state.darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <Badge variant={quiz.type === "MCQ" ? "default" : "secondary"} className="text-xs">
              {quiz.type}
            </Badge>
            {quiz.isAIGenerated && (
              <Badge
                variant="outline"
                className={`text-xs ${state.darkMode
                  ? 'bg-purple-900/30 text-purple-300 border-purple-700'
                  : 'bg-purple-50 text-purple-700 border-purple-200'
                  }`}
              >
                <Sparkles className="h-3 w-3 mr-1" />
                AI
              </Badge>
            )}
          </div>
          <Badge className={`${getDifficultyColor(quiz.difficulty)} text-xs`}>
            {quiz.difficulty}
          </Badge>
        </div>

        <h3 className={`text-lg font-semibold line-clamp-2 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
          {quiz.title}
        </h3>

        {quiz.topic && (
          <p className={`text-sm mt-1 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {quiz.topic}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className={`flex items-center gap-4 text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <span className="flex items-center gap-1.5">
            <Trophy className="h-4 w-4" />
            <span>{quiz.questionCount} Questions</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>~{quiz.questionCount * 2} min</span>
          </span>
        </div>

        {showAttemptButton && (
          <Button
            onClick={() => setSelectedQuiz(quiz)}
            className="w-full"
          >
            <Play className="h-4 w-4 mr-2" />
            Start Quiz
          </Button>
        )}
      </CardContent>
    </Card>
  );

  const renderAttemptCard = (attempt: QuizAttempt) => {
    const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
    const minutes = Math.floor(attempt.timeTaken / 60);
    const seconds = attempt.timeTaken % 60;

    return (
      <Card
        key={attempt._id}
        className={`hover:shadow-lg transition-all duration-200 ${state.darkMode
          ? 'border-gray-700 bg-gray-800'
          : 'border-gray-200 bg-white'
          }`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <History className={`h-5 w-5 ${state.darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <Badge
                variant={attempt.quizId.type === "MCQ" ? "default" : "secondary"}
                className={`text-xs ${state.darkMode
                  ? 'bg-blue-900/30 text-blue-300 border border-blue-700'
                  : ''
                  }`}
              >
                {attempt.quizId.type}
              </Badge>
              {attempt.quizId.isAIGenerated && (
                <Badge
                  variant="outline"
                  className={`text-xs ${state.darkMode
                    ? 'bg-purple-900/30 text-purple-300 border-purple-700'
                    : 'bg-purple-50 text-purple-700 border-purple-200'
                    }`}
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI
                </Badge>
              )}
            </div>
            <Badge className={`${getDifficultyColor(attempt.quizId.difficulty)} text-xs`}>
              {attempt.quizId.difficulty}
            </Badge>
          </div>

          <h3 className={`text-lg font-semibold line-clamp-2 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            {attempt.quizId.title}
          </h3>

          {attempt.quizId.topic && (
            <p className={`text-sm mt-1 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {attempt.quizId.topic}
            </p>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Score:
              </span>
              <span className={`font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                {attempt.score}/{attempt.totalQuestions} ({percentage}%)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Time Taken:
              </span>
              <span className={`font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                {minutes}m {seconds}s
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Attempted:
              </span>
              <span className={`font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                {new Date(attempt.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setSelectedQuiz(attempt.quizId)}
              variant="outline"
              className={`flex-1 ${state.darkMode
                  ? 'border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
            >
              <Play className="h-4 w-4 mr-2" />
              {attempt.score === 0 && attempt.timeTaken === 0 ? 'Take Quiz' : 'Retake Quiz'}
            </Button>
            {attempt.quizId.isAIGenerated && (
              <Button
                onClick={() => handleDeleteQuiz(attempt.quizId._id)}
                variant="destructive"
                size="icon"
                className={`shrink-0 ${state.darkMode
                    ? 'bg-red-900/30 hover:bg-red-900/50 border border-red-700 text-red-400'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };
  if (selectedQuiz) {
    return (
      <QuizAttempt
        quiz={selectedQuiz}
        onComplete={handleQuizComplete}
        onBack={() => setSelectedQuiz(null)}
      />
    );
  }

  if (showResults && quizResults) {
    return (
      <QuizResults
        results={quizResults}
        onBack={() => {
          setShowResults(false);
          setLastAttemptedQuiz(null);
        }}
        onRetakeQuiz={() => {
          if (lastAttemptedQuiz) {
            setShowResults(false);
            setSelectedQuiz(lastAttemptedQuiz);
          }
        }}
      />
    );
  }

  const latestAttempts = getLatestAttempts(attemptedQuizzes);

  const aiGeneratedAttempted = latestAttempts.filter(
    (attempt) => attempt.quizId.isAIGenerated
  );
  const availableQuizzes = quizzes.filter((quiz) => !quiz.isAIGenerated);
  const attemptedAvailableQuizzes = latestAttempts.filter(
    (attempt) => !attempt.quizId.isAIGenerated
  );

  return (
    <div className={`min-h-screen p-6 ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
              Quiz Center
            </h1>
            <p className={`text-lg ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Test your knowledge with our interactive quizzes
            </p>
          </div>
          <Button
            onClick={() => setShowAIGenerator(true)}
            className={`text-white ${state.darkMode
              ? 'bg-purple-500 hover:bg-purple-600'
              : 'bg-purple-600 hover:bg-purple-700'
              }`}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Generate AI Quiz
          </Button>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full grid-cols-3 ${state.darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <TabsTrigger
              value="available"
              className={`${state.darkMode
                ? 'text-gray-300 data-[state=active]:bg-gray-700'
                : 'data-[state=active]:bg-white'
                }`}
            >
              Available Quizzes
              <Badge
                variant="secondary"
                className={`ml-2 ${state.darkMode
                  ? 'bg-gray-600 text-gray-200'
                  : 'bg-gray-300 text-gray-700'
                  }`}
              >
                {availableQuizzes.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="attempted"
              className={`${state.darkMode
                ? 'text-gray-300 data-[state=active]:bg-gray-700'
                : 'data-[state=active]:bg-white'
                }`}
            >
              Attempted
              <Badge
                variant="secondary"
                className={`ml-2 ${state.darkMode
                  ? 'bg-gray-600 text-gray-200'
                  : 'bg-gray-300 text-gray-700'
                  }`}
              >
                {attemptedAvailableQuizzes.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="ai-generated"
              className={`${state.darkMode
                ? 'text-gray-300 data-[state=active]:bg-gray-700'
                : 'data-[state=active]:bg-white'
                }`}
            >
              AI Generated
              <Badge
                variant="secondary"
                className={`ml-2 ${state.darkMode
                  ? 'bg-gray-600 text-gray-200'
                  : 'bg-gray-300 text-gray-700'
                  }`}
              >
                {aiGeneratedAttempted.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Available Quizzes Tab */}
          <TabsContent value="available" className="mt-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${state.darkMode ? 'border-blue-400' : 'border-blue-600'
                  }`}></div>
              </div>
            ) : availableQuizzes.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className={`h-16 w-16 mx-auto mb-4 opacity-50 ${state.darkMode ? 'text-gray-600' : 'text-gray-400'
                  }`} />
                <h3 className={`text-xl font-medium mb-2 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                  No Quizzes Available
                </h3>
                <p className={state.darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Check back later for new quizzes!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableQuizzes.map((quiz) => renderQuizCard(quiz))}
              </div>
            )}
          </TabsContent>

          {/* Attempted Tab */}
          <TabsContent value="attempted" className="mt-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${state.darkMode ? 'border-blue-400' : 'border-blue-600'
                  }`}></div>
              </div>
            ) : attemptedAvailableQuizzes.length === 0 ? (
              <div className="text-center py-12">
                <History className={`h-16 w-16 mx-auto mb-4 opacity-50 ${state.darkMode ? 'text-gray-600' : 'text-gray-400'
                  }`} />
                <h3 className={`text-xl font-medium mb-2 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                  No Attempts Yet
                </h3>
                <p className={state.darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Start attempting quizzes to see your history here!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {attemptedAvailableQuizzes.map((attempt) =>
                  renderAttemptCard(attempt)
                )}
              </div>
            )}
          </TabsContent>

          {/* AI Generated Tab */}
          <TabsContent value="ai-generated" className="mt-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${state.darkMode ? 'border-blue-400' : 'border-blue-600'
                  }`}></div>
              </div>
            ) : aiGeneratedAttempted.length === 0 ? (
              <div className="text-center py-12">
                <Sparkles className={`h-16 w-16 mx-auto mb-4 opacity-50 ${state.darkMode ? 'text-purple-400' : 'text-purple-500'
                  }`} />
                <h3 className={`text-xl font-medium mb-2 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                  No AI Generated Quizzes
                </h3>
                <p className={`mb-4 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Generate your first AI quiz to get started!
                </p>
                <Button
                  onClick={() => setShowAIGenerator(true)}
                  className={`text-white ${state.darkMode
                    ? 'bg-purple-500 hover:bg-purple-600'
                    : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate AI Quiz
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aiGeneratedAttempted.map((attempt) => renderAttemptCard(attempt))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Quiz Generator Dialog */}
      {/* AI Quiz Generator Dialog */}
      <AIQuizGenerator
        open={showAIGenerator}
        onClose={() => setShowAIGenerator(false)}
        onGenerated={handleAIQuizGenerated}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteQuizId !== null} onOpenChange={(open) => !open && setDeleteQuizId(null)}>
        <AlertDialogContent className={`${
          state.darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <AlertDialogHeader>
            <AlertDialogTitle className={state.darkMode ? 'text-white' : 'text-gray-900'}>
              Delete AI Quiz
            </AlertDialogTitle>
            <AlertDialogDescription className={state.darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Are you sure you want to delete this AI-generated quiz? This will delete the quiz and all your attempts. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className={`${
                state.darkMode 
                  ? 'border-gray-600 text-gray-200 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className={`${
                state.darkMode 
                  ? 'bg-red-900/30 hover:bg-red-900/50 border border-red-700 text-red-400' 
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuizPage;