import React, { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import axiosInstance from "../../api/axiosinstance";
import { useGlobalState } from "../../contexts/GlobalContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Quiz } from "./QuizPage";
import { Input } from "../ui/Input";

interface AIQuizGeneratorProps {
  open: boolean;
  onClose: () => void;
  onGenerated: (quiz?: Quiz) => void | Promise<void>;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const AIQuizGenerator: React.FC<AIQuizGeneratorProps> = ({
  open,
  onClose,
  onGenerated,
}) => {
  const { state } = useGlobalState();
  const [formData, setFormData] = useState({
    topic: "",
    difficulty: "Medium",
    type: "MCQ",
    questionCount: 5,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/api/v1/ai/generate-quiz", formData);
      
      onGenerated(response.data as Quiz);
      onClose();
      
      // Reset form
      setFormData({
        topic: "",
        difficulty: "Medium",
        type: "MCQ",
        questionCount: 5,
      });
    } catch (err) {
      const error = err as ApiError;
      console.error("Error generating AI quiz:", error);
      setError(
        error.response?.data?.message || "Failed to generate quiz. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setError("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={`sm:max-w-[500px] ${
        state.darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <DialogHeader>
          <DialogTitle className={`flex items-center gap-2 ${
            state.darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <Sparkles className={`h-5 w-5 ${
              state.darkMode ? 'text-purple-400' : 'text-purple-600'
            }`} />
            Generate AI Quiz
          </DialogTitle>
          <DialogDescription className={state.darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Create a custom quiz using AI based on your preferences
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-5">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="topic" className={state.darkMode ? 'text-gray-200' : 'text-gray-900'}>
              Topic <span className="text-red-500">*</span>
            </Label>
            <Input
              id="topic"
              required
              value={formData.topic}
              onChange={(e) =>
                setFormData({ ...formData, topic: e.target.value })
              }
              placeholder="e.g., React Hooks, Binary Search Trees"
              disabled={loading}
              className={`${
                state.darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
              }`}
            />
            <p className={`text-xs ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Enter a specific topic you want to be quizzed on
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty" className={state.darkMode ? 'text-gray-200' : 'text-gray-900'}>
              Difficulty
            </Label>
            <Select
              value={formData.difficulty}
              onValueChange={(value) =>
                setFormData({ ...formData, difficulty: value })
              }
              disabled={loading}
            >
              <SelectTrigger 
                id="difficulty" 
                className={`${
                  state.darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={`${
                state.darkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-200'
              }`}>
                <SelectItem 
                  value="Easy" 
                  className={`${
                    state.darkMode 
                      ? 'text-white hover:bg-gray-600' 
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Easy
                </SelectItem>
                <SelectItem 
                  value="Medium" 
                  className={`${
                    state.darkMode 
                      ? 'text-white hover:bg-gray-600' 
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Medium
                </SelectItem>
                <SelectItem 
                  value="Hard" 
                  className={`${
                    state.darkMode 
                      ? 'text-white hover:bg-gray-600' 
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Hard
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className={state.darkMode ? 'text-gray-200' : 'text-gray-900'}>
              Quiz Type
            </Label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData({ ...formData, type: value })
              }
              disabled={loading}
            >
              <SelectTrigger 
                id="type" 
                className={`${
                  state.darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={`${
                state.darkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-200'
              }`}>
                <SelectItem 
                  value="MCQ" 
                  className={`${
                    state.darkMode 
                      ? 'text-white hover:bg-gray-600' 
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Multiple Choice (MCQ)
                </SelectItem>
                <SelectItem 
                  value="Code" 
                  className={`${
                    state.darkMode 
                      ? 'text-white hover:bg-gray-600' 
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Code-based
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="questionCount" className={state.darkMode ? 'text-gray-200' : 'text-gray-900'}>
              Number of Questions
            </Label>
            <Select
              value={formData.questionCount.toString()}
              onValueChange={(value) =>
                setFormData({ ...formData, questionCount: parseInt(value) })
              }
              disabled={loading}
            >
              <SelectTrigger 
                id="questionCount" 
                className={`${
                  state.darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={`${
                state.darkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-200'
              }`}>
                <SelectItem 
                  value="3" 
                  className={`${
                    state.darkMode 
                      ? 'text-white hover:bg-gray-600' 
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  3 Questions
                </SelectItem>
                <SelectItem 
                  value="5" 
                  className={`${
                    state.darkMode 
                      ? 'text-white hover:bg-gray-600' 
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  5 Questions
                </SelectItem>
                <SelectItem 
                  value="8" 
                  className={`${
                    state.darkMode 
                      ? 'text-white hover:bg-gray-600' 
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  8 Questions
                </SelectItem>
                <SelectItem 
                  value="10" 
                  className={`${
                    state.darkMode 
                      ? 'text-white hover:bg-gray-600' 
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  10 Questions
                </SelectItem>
              </SelectContent>
            </Select>
            <p className={`text-xs ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              More questions will take longer to generate
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
              className={`flex-1 ${
                state.darkMode 
                  ? 'border-gray-600 text-gray-200 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className={`flex-1 text-white ${
                state.darkMode 
                  ? 'bg-purple-600 hover:bg-purple-700' 
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Quiz
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AIQuizGenerator;