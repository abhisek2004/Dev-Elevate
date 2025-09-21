import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosinstance";
import { Problem } from "../Types";
import ProblemDescription from "../Components/ProblemDetail/ProblemDescription";
import CodeEditor from "../Components/CodeEditor/CodeEditor";
import { toast } from "sonner";
import TestResults from "../Components/CodeEditor/TestResults";
import { ArrowLeft } from "lucide-react";
import Countdown from "react-countdown";

// Define the ApiResponse interface that was missing
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface TestResult {
  testCaseId: string;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  executionTime?: number;
  memory?: number;
  status?: string;
  error?: string;
}

const ContestProblemPage: React.FC = () => {
  const { contestId, problemId } = useParams<{
    contestId: string;
    problemId: string;
  }>();
  const navigate = useNavigate();

  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [contestInfo, setContestInfo] = useState<{
    startTime: string;
    endTime: string;
  } | null>(null);

  useEffect(() => {
    fetchProblemDetails();
  }, [contestId, problemId]);

  useEffect(() => {
    if (problem && contestId) {
      const saved = localStorage.getItem(
        `contest_${contestId}_problem_${problem.id}_lang_${selectedLanguage}`
      );
      if (saved !== null) {
        setCode(saved);
      } else if (problem.starterCode && problem.starterCode[selectedLanguage]) {
        setCode(problem.starterCode[selectedLanguage]);
      }
    }
    // eslint-disable-next-line
  }, [problem, contestId, selectedLanguage]);

  useEffect(() => {
    if (problem && contestId) {
      localStorage.setItem(
        `contest_${contestId}_problem_${problem.id}_lang_${selectedLanguage}`,
        code
      );
    }
  }, [code, problem, contestId, selectedLanguage]);

  useEffect(() => {
    const fetchContestInfo = async () => {
      try {
        const response = await axiosInstance.get<ApiResponse<any>>(
          `/api/v1/contests/${contestId}`
        );
        if (response.data.success) {
          setContestInfo({
            startTime: response.data.data.startTime,
            endTime: response.data.data.endTime,
          });
        }
      } catch (e) {
        // handle error
      }
    };
    if (contestId) fetchContestInfo();
  }, [contestId]);

  const fetchProblemDetails = async () => {
    setLoading(true);
    try {
      // First try to fetch from contest-specific endpoint
      const response = await axiosInstance.get<ApiResponse<Problem>>(
        `/api/v1/contests/${contestId}/problems/${problemId}`
      );

      if (response.data && response.data.success) {
        const problemData = response.data.data;

        // Store the string ID for submission
        setProblem(problemData);
      }
    } catch (error) {
      console.error("Error fetching problem:", error);
      toast.error("Failed to load problem details");
      navigate(`/coding/contests/${contestId}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRun = async (codeToRun: string, language: string) => {
    setIsRunning(true);
    toast.loading("Running code...", { id: "run-code" });

    try {
      // If you have a contest-specific run API:
      const response = await axiosInstance.post<
        ApiResponse<{ testResults: TestResult[] }>
      >(`/api/v1/contests/${contestId}/problems/${problemId}/run`, {
        code: codeToRun,
        language,
      });

      if (response.data && response.data.success) {
        const results = response.data.data.testResults || [];
        setTestResults(results);
        setShowResults(true);

        const passedCount = results.filter((r) => r.passed).length;
        if (passedCount === results.length) {
          toast.success(`All ${passedCount} test cases passed!`, {
            id: "run-code",
          });
        } else {
          toast.error(`${passedCount}/${results.length} test cases passed`, {
            id: "run-code",
          });
        }
      } else {
        toast.error(
          (response.data && response.data.message) || "Failed to run code",
          { id: "run-code" }
        );
      }
    } catch (error) {
      console.error("Run error:", error);
      toast.error("Execution failed", { id: "run-code" });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async (codeToSubmit: string, language: string) => {
    setIsSubmitting(true);
    toast.loading("Submitting solution...", { id: "submit-code" });

    try {
      // Make sure to use the problem's string ID here, not the MongoDB ObjectId
      const response = await axiosInstance.post<
        ApiResponse<{
          submission: {
            id: string;
            status: string;
            points: number;
            testResults: TestResult[];
          };
        }>
      >(`/api/v1/contests/${contestId}/submit`, {
        problemId: problem?.id, // Use the string ID from the problem
        code: codeToSubmit,
        language,
      });

      if (response?.data?.success && response?.data?.data?.submission) {
        const submissionResult = response.data.data.submission;

        if (submissionResult.status === "Accepted") {
          toast.success("Solution accepted! All test cases passed.", {
            id: "submit-code",
          });
        } else {
          toast.error(`${submissionResult.status}. Please try again.`, {
            id: "submit-code",
          });
        }

        // Show test results if available
        if (submissionResult.testResults) {
          setTestResults(submissionResult.testResults);
          setShowResults(true);
        }
      } else {
        toast.error(response?.data?.message || "Submission failed", {
          id: "submit-code",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Submission failed", { id: "submit-code" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(`/coding/contests/${contestId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric-400"></div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-900 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Problem not found
          </h1>
          <p className="text-gray-400 mb-8">
            The problem you're looking for doesn't exist or is not available.
          </p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Contest
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-300 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Contest
          </button>
          <span className="text-white font-medium">
            {contestInfo && contestInfo.endTime ? (
              <>
                Ends in:{" "}
                <Countdown
                  date={new Date(contestInfo.endTime)}
                  renderer={({ hours, minutes, seconds, completed }) =>
                    completed ? (
                      <span>Contest Ended</span>
                    ) : (
                      <span>
                        {hours}h {minutes}m {seconds}s
                      </span>
                    )
                  }
                />
              </>
            ) : (
              "Loading..."
            )}
          </span>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <div className="flex h-full">
          {/* Problem Description Panel */}
          <div className="overflow-y-auto p-4 w-2/5">
            <ProblemDescription problem={problem} isContestProblem={true} />
          </div>

          {/* Code Editor and Test Results Panel */}
          <div className="flex flex-col p-4 w-3/5 overflow-y-auto">
            <div className="flex-1 mb-4">
              <CodeEditor
                initialCode={
                  problem.starterCode && problem.starterCode[selectedLanguage]
                    ? problem.starterCode[selectedLanguage]
                    : "// Write your code here"
                }
                language={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
                onCodeChange={setCode}
                onRun={handleRun}
                onSubmit={handleSubmit}
                isRunning={isRunning}
                isSubmitting={isSubmitting}
              />
            </div>

            {/* Test Results */}
            <TestResults
              results={testResults.map((tr, idx) => ({
                id: tr.testCaseId || String(idx),
                input: tr.input,
                expectedOutput: tr.expectedOutput,
                actualOutput: tr.actualOutput,
                passed: tr.passed,
                runtime: tr.executionTime,
                memory: tr.memory,
                error: tr.error,
              }))}
              isVisible={showResults}
              onClose={() => setShowResults(false)}
              onRunAgain={() => handleRun(code, selectedLanguage)}
              totalPassed={testResults.filter((r) => r.passed).length}
              totalTests={testResults.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestProblemPage;
