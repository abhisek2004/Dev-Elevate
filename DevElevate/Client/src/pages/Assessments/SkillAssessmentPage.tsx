import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  generateSkillAssessment,
  fetchAssessmentHistory,
  submitSkillAssessment,
} from "../../api/assessmentApi";
import {
  AssessmentHistoryItem,
  AssessmentQuestion,
  SubmittedAssessment,
} from "../../types/assessment";
import { useGlobalState } from "../../contexts/GlobalContext";
import toast from "react-hot-toast";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { format } from "date-fns";
import { ArrowRight, RefreshCw, TrendingUp } from "lucide-react";

type AssessmentPhase =
  | "idle"
  | "loading"
  | "in-progress"
  | "submitting"
  | "complete";

const TRACK_OPTIONS = [
  { value: "dsa", label: "Data Structures & Algorithms" },
  { value: "web-development", label: "Web Development" },
  { value: "machine-learning", label: "Machine Learning" },
  { value: "data-science", label: "Data Science" },
  { value: "cloud-devops", label: "Cloud & DevOps" },
];

const DIFFICULTY_OPTIONS = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
];

const QUESTION_COUNT_OPTIONS = [5, 7, 10];

const trackLabelMap = TRACK_OPTIONS.reduce<Record<string, string>>(
  (acc, option) => {
    acc[option.value] = option.label;
    return acc;
  },
  {}
);

const SkillAssessmentPage: React.FC = () => {
  const { state } = useGlobalState();
  const [phase, setPhase] = useState<AssessmentPhase>("idle");
  const [selectedTrack, setSelectedTrack] = useState<string>("dsa");
  const [questionCount, setQuestionCount] = useState<number>(7);
  const [difficulty, setDifficulty] =
    useState<"Beginner" | "Intermediate" | "Advanced">("Intermediate");
  const [assessmentQuestions, setAssessmentQuestions] = useState<
    AssessmentQuestion[]
  >([]);
  const [assessmentMetadata, setAssessmentMetadata] = useState<{
    id: string;
    trackLabel: string;
    difficulty: string;
  } | null>(null);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [submittedAssessment, setSubmittedAssessment] =
    useState<SubmittedAssessment | null>(null);
  const [history, setHistory] = useState<AssessmentHistoryItem[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState<boolean>(false);

  const unansweredCount = useMemo(() => {
    if (!assessmentQuestions.length) {
      return questionCount;
    }
    return assessmentQuestions.filter((question) => {
      const answer = responses[question.id];
      return !answer || !answer.trim();
    }).length;
  }, [assessmentQuestions, responses, questionCount]);

  const fetchHistory = useCallback(async () => {
    try {
      setIsHistoryLoading(true);
      const { assessments } = await fetchAssessmentHistory(20);
      setHistory(assessments);
    } catch (error) {
      console.error("Failed to load assessment history", error);
    } finally {
      setIsHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleGenerateAssessment = async () => {
    try {
      setPhase("loading");
      const { assessment } = await generateSkillAssessment({
        track: selectedTrack,
        difficulty,
        questionCount,
      });
      setAssessmentQuestions(assessment.questions);
      setAssessmentMetadata({
        id: assessment.id,
        trackLabel: assessment.trackLabel,
        difficulty: assessment.difficulty,
      });
      setResponses({});
      setSubmittedAssessment(null);
      setPhase("in-progress");
      toast.success("Assessment ready! Dive in when you're ready.");
    } catch (error: unknown) {
      console.error("Failed to generate assessment", error);
      toast.error(
        "Could not generate assessment. Please check your connection and try again."
      );
      setPhase("idle");
    }
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmitAssessment = async () => {
    if (!assessmentMetadata) return;
    if (unansweredCount > 0) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    try {
      setPhase("submitting");
      const payload = {
        assessmentId: assessmentMetadata.id,
        responses: assessmentQuestions.map((question) => ({
          questionId: question.id,
          answer: responses[question.id] ?? "",
        })),
      };
      const { assessment } = await submitSkillAssessment(payload);
      setSubmittedAssessment(assessment);
      setPhase("complete");
      fetchHistory();
      toast.success("Assessment submitted! Review your roadmap updates below.");
    } catch (error) {
      console.error("Failed to submit assessment", error);
      toast.error("Submission failed. Please try again.");
      setPhase("in-progress");
    }
  };

  const handleReset = () => {
    setPhase("idle");
    setAssessmentQuestions([]);
    setAssessmentMetadata(null);
    setResponses({});
    setSubmittedAssessment(null);
  };

  const chartData = useMemo(
    () =>
      history
        .slice()
        .reverse()
        .map((item) => ({
          name: format(new Date(item.completedAt), "MMM d"),
          score: item.score,
        })),
    [history]
  );

  return (
    <div
      className={`min-h-screen ${
        state.darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-6xl px-4 py-10 mx-auto space-y-10">
        <header className="space-y-3">
          <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">
            AI Skill Coach
          </p>
          <h1 className="text-4xl font-bold">
            Personalized Skill Assessment
          </h1>
          <p
            className={`text-lg ${
              state.darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Discover your current level, unlock tailored resources, and keep your
            DevElevate roadmap aligned with your growth.
          </p>
        </header>

        <section
          className={`rounded-2xl border ${
            state.darkMode ? "bg-gray-800/70 border-gray-700" : "bg-white border-gray-200"
          } p-6 shadow-sm`}
        >
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex-1 space-y-4">
              <div>
                <label className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Select Track
                </label>
                <div className="grid grid-cols-1 gap-3 mt-2 sm:grid-cols-2">
                  {TRACK_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSelectedTrack(option.value)}
                      className={`rounded-xl border px-4 py-3 text-left transition-all ${
                        selectedTrack === option.value
                          ? "border-blue-500 bg-blue-500/10 text-blue-500 shadow-sm"
                          : state.darkMode
                          ? "border-gray-700 hover:border-gray-600"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className="font-semibold">{option.label}</span>
                      <p
                        className={`text-xs mt-1 ${
                          state.darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        AI-curated questions tailored to this specialization.
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Difficulty
                  </label>
                  <div className="flex gap-2 mt-2">
                    {DIFFICULTY_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setDifficulty(option.value as typeof difficulty)
                        }
                        className={`flex-1 rounded-lg border px-3 py-2 text-sm transition ${
                          difficulty === option.value
                            ? "border-blue-500 bg-blue-500/10 text-blue-500"
                            : state.darkMode
                            ? "border-gray-700 hover:border-gray-600"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Question Count
                  </label>
                  <div className="flex gap-2 mt-2">
                    {QUESTION_COUNT_OPTIONS.map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setQuestionCount(count)}
                        className={`flex-1 rounded-lg border px-3 py-2 text-sm transition ${
                          questionCount === count
                            ? "border-blue-500 bg-blue-500/10 text-blue-500"
                            : state.darkMode
                            ? "border-gray-700 hover:border-gray-600"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {count} Questions
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`w-full max-w-sm rounded-2xl border ${
                state.darkMode
                  ? "bg-gray-900/60 border-gray-700"
                  : "bg-blue-50 border-blue-200"
              } p-5 self-start`}
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Assessment Snapshot
              </h3>
              <p
                className={`mt-2 text-sm ${
                  state.darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                GPT-4 crafts a fresh quiz every run.
                Questions adapt to your difficulty,
                and your roadmap updates automatically once you submit.
              </p>
              <button
                type="button"
                onClick={handleGenerateAssessment}
                disabled={phase === "loading" || phase === "in-progress"}
                className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold transition ${
                  phase === "loading"
                    ? "bg-blue-400 text-white cursor-wait"
                    : "bg-blue-600 text-white hover:bg-blue-500"
                }`}
              >
                {phase === "loading" ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Start Assessment
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              {phase === "in-progress" && (
                <p className="mt-3 text-xs text-blue-200">
                  Assessment in progress. Complete and submit when ready.
                </p>
              )}
              {phase === "complete" && submittedAssessment && (
                <div className="mt-3 text-xs text-blue-200 space-y-1">
                  <p>Latest score: {submittedAssessment.score}%</p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-blue-100 underline"
                  >
                    Generate a new assessment
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {phase !== "idle" && assessmentQuestions.length > 0 && (
          <section
            className={`rounded-2xl border ${
              state.darkMode
                ? "bg-gray-800/70 border-gray-700"
                : "bg-white border-gray-200"
            } p-6 shadow-sm space-y-6`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">
                  {assessmentMetadata?.trackLabel}
                </h2>
                <p
                  className={`text-sm ${
                    state.darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {assessmentQuestions.length} questions • Difficulty:{" "}
                  {assessmentMetadata?.difficulty}
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span
                  className={`px-3 py-1 rounded-full ${
                    unansweredCount === 0
                      ? "bg-green-500/10 text-green-500"
                      : "bg-yellow-500/10 text-yellow-500"
                  }`}
                >
                  {unansweredCount === 0
                    ? "All questions answered"
                    : `${unansweredCount} question${
                        unansweredCount === 1 ? "" : "s"
                      } left`}
                </span>
                <button
                  type="button"
                  onClick={handleReset}
                  className={`text-sm underline ${
                    state.darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Cancel assessment
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {assessmentQuestions.map((question, index) => (
                <div
                  key={question.id}
                  className={`rounded-xl border p-5 transition ${
                    state.darkMode
                      ? "border-gray-700 bg-gray-900/50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-blue-500 uppercase tracking-wide">
                        Question {index + 1}
                      </p>
                      <h3 className="text-lg font-semibold mt-1">
                        {question.prompt}
                      </h3>
                    </div>
                    {question.category && (
                      <span
                        className={`self-start rounded-full px-3 py-1 text-xs font-medium ${
                          state.darkMode
                            ? "bg-gray-800 text-gray-300"
                            : "bg-white text-gray-700"
                        }`}
                      >
                        {question.category}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 grid gap-3">
                    {question.options.map((option, optionIndex) => {
                      const optionLabel = `${String.fromCharCode(65 + optionIndex)}. ${option}`;
                      const isSelected =
                        responses[question.id] === option ||
                        responses[question.id] === optionLabel ||
                        responses[question.id] === String.fromCharCode(65 + optionIndex);

                      return (
                        <label
                          key={option}
                          className={`flex items-start gap-3 rounded-lg border px-3 py-2 cursor-pointer transition ${
                            isSelected
                              ? "border-blue-500 bg-blue-500/10"
                              : state.darkMode
                              ? "border-gray-700 hover:border-gray-600"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={option}
                            checked={isSelected}
                            onChange={() => handleAnswer(question.id, option)}
                            className="mt-1 text-blue-500 focus:ring-blue-500"
                          />
                          <span className="text-sm">{optionLabel}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleSubmitAssessment}
                disabled={phase === "submitting"}
                className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition ${
                  phase === "submitting"
                    ? "bg-blue-400 text-white cursor-wait"
                    : unansweredCount > 0
                    ? "bg-blue-500/40 text-blue-100 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-500"
                }`}
              >
                {phase === "submitting" ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Assessment
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </section>
        )}

        {submittedAssessment && (
          <section className="grid gap-6 md:grid-cols-2">
            <div
              className={`rounded-2xl border ${
                state.darkMode
                  ? "bg-gray-800/70 border-gray-700"
                  : "bg-white border-gray-200"
              } p-6 shadow-sm space-y-4`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-500">
                    Assessment Results
                  </p>
                  <h2 className="text-3xl font-bold">
                    {submittedAssessment.score}%
                  </h2>
                  <p
                    className={`text-sm ${
                      state.darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Skill level: {submittedAssessment.skillLevel}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    submittedAssessment.skillLevel === "Advanced"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : submittedAssessment.skillLevel === "Intermediate"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-rose-500/20 text-rose-400"
                  }`}
                >
                  {submittedAssessment.skillLevel}
                </span>
              </div>
              <p
                className={`text-sm ${
                  state.darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {submittedAssessment.summary}
              </p>
              <div className="rounded-xl border border-dashed border-blue-400/50 bg-blue-500/5 p-4 text-sm text-blue-200">
                {submittedAssessment.encouragement}
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Improvement Focus
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {submittedAssessment.improvementAreas.length > 0 ? (
                    submittedAssessment.improvementAreas.map((area) => (
                      <span
                        key={area}
                        className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400"
                      >
                        {area}
                      </span>
                    ))
                  ) : (
                    <span
                      className={`text-xs ${
                        state.darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      You aced everything — keep challenging yourself!
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div
              className={`rounded-2xl border ${
                state.darkMode
                  ? "bg-gray-800/70 border-gray-700"
                  : "bg-white border-gray-200"
              } p-6 shadow-sm space-y-4`}
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-500">
                Recommended Resources
              </p>
              <ul className="space-y-3">
                {submittedAssessment.recommendedResources.map((resource) => (
                  <li
                    key={`${resource.title}-${resource.url}`}
                    className={`rounded-xl border px-4 py-3 ${
                      state.darkMode
                        ? "border-gray-700 bg-gray-900/40"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <h4 className="text-sm font-semibold">{resource.title}</h4>
                    {resource.description && (
                      <p
                        className={`text-xs mt-1 ${
                          state.darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {resource.description}
                      </p>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wide text-blue-400">
                        {resource.type}
                      </span>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-blue-500 hover:underline"
                      >
                        Open resource
                      </a>
                    </div>
                  </li>
                ))}
              </ul>

              {submittedAssessment.roadmapRecommendations && (
                <div
                  className={`rounded-xl border ${
                    state.darkMode
                      ? "border-gray-700 bg-gray-900/40"
                      : "border-gray-200 bg-gray-50"
                  } p-4 space-y-3`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                      Roadmap Update
                    </h3>
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">
                      Focus
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-blue-500">
                    {submittedAssessment.roadmapRecommendations.focus}
                  </p>
                  <p
                    className={`text-sm ${
                      state.darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {submittedAssessment.roadmapRecommendations.summary}
                  </p>
                  <ul className="space-y-2 text-sm list-disc list-inside">
                    {submittedAssessment.roadmapRecommendations.actionItems.map(
                      (item) => (
                        <li key={item}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        <section
          className={`rounded-2xl border ${
            state.darkMode
              ? "bg-gray-800/70 border-gray-700"
              : "bg-white border-gray-200"
          } p-6 shadow-sm`}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Progress Tracker</h2>
              <p
                className={`text-sm ${
                  state.darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Monitor your improvement across recent assessments.
              </p>
            </div>
            <button
              type="button"
              onClick={fetchHistory}
              className="inline-flex items-center gap-2 rounded-lg border border-blue-500/40 px-3 py-2 text-xs font-semibold text-blue-400 hover:border-blue-500/60"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh history
            </button>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={state.darkMode ? "#374151" : "#E5E7EB"}
                  />
                  <XAxis
                    dataKey="name"
                    stroke={state.darkMode ? "#9CA3AF" : "#4B5563"}
                  />
                  <YAxis
                    domain={[0, 100]}
                    stroke={state.darkMode ? "#9CA3AF" : "#4B5563"}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: state.darkMode ? "#1F2937" : "#FFFFFF",
                      borderColor: state.darkMode ? "#374151" : "#E5E7EB",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {isHistoryLoading ? (
                <p
                  className={`text-sm ${
                    state.darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Loading recent assessments...
                </p>
              ) : history.length === 0 ? (
                <p
                  className={`text-sm ${
                    state.darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Complete your first assessment to start building your progress
                  timeline.
                </p>
              ) : (
                <ul className="space-y-3">
                  {history.slice(0, 4).map((item) => (
                    <li
                      key={item.id}
                      className={`rounded-xl border px-4 py-3 ${
                        state.darkMode
                          ? "border-gray-700 bg-gray-900/40"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold">
                            {trackLabelMap[item.track]}
                          </p>
                          <p
                            className={`text-xs ${
                              state.darkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {format(new Date(item.completedAt), "PPP")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">
                            {item.score}%
                          </p>
                          <span
                            className={`text-xs font-semibold uppercase ${
                              item.skillLevel === "Advanced"
                                ? "text-emerald-400"
                                : item.skillLevel === "Intermediate"
                                ? "text-yellow-400"
                                : "text-rose-400"
                            }`}
                          >
                            {item.skillLevel}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SkillAssessmentPage;

