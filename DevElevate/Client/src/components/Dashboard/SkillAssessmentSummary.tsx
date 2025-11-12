import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../contexts/GlobalContext";
import {
  fetchLatestAssessmentSummary,
} from "../../api/assessmentApi";
import { LatestAssessmentSummaryResponse } from "../../types/assessment";
import { ArrowRight, RefreshCw, Sparkles } from "lucide-react";

const SkillAssessmentSummary: React.FC = () => {
  const { state } = useGlobalState();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] =
    useState<LatestAssessmentSummaryResponse["assessment"]>(null);

  const loadSummary = async () => {
    try {
      setLoading(true);
      const { assessment } = await fetchLatestAssessmentSummary();
      setSummary(assessment);
      setError(null);
    } catch (err) {
      console.error("Failed to load assessment summary", err);
      setError("Unable to fetch latest assessment. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSummary();
  }, []);

  const cardClasses = state.darkMode
    ? "bg-gray-800 border-gray-700 text-gray-100"
    : "bg-white border-gray-200 text-gray-900";

  return (
    <div className={`rounded-xl border p-6 shadow-sm ${cardClasses}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">
            Skill Assessment
          </p>
          <h3 className="mt-1 text-xl font-semibold">
            Personalized Roadmap Snapshot
          </h3>
        </div>
        <button
          type="button"
          onClick={loadSummary}
          className="rounded-full border border-blue-500/30 bg-blue-500/10 p-2 text-blue-400 transition hover:border-blue-500/60"
          aria-label="Refresh assessment summary"
        >
          {loading ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
        </button>
      </div>

      {loading ? (
        <div className="mt-6 space-y-3">
          <div
            className={`h-4 w-32 animate-pulse rounded ${
              state.darkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          />
          <div
            className={`h-4 w-48 animate-pulse rounded ${
              state.darkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          />
          <div
            className={`h-12 w-full animate-pulse rounded ${
              state.darkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          />
        </div>
      ) : summary ? (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-400">
                {summary.trackLabel}
              </p>
              <p className="text-3xl font-bold">{summary.score}%</p>
              <p
                className={`text-xs ${
                  state.darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Skill level: {summary.skillLevel}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                summary.skillLevel === "Advanced"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : summary.skillLevel === "Intermediate"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-rose-500/20 text-rose-400"
              }`}
            >
              {summary.skillLevel}
            </span>
          </div>

          {summary.improvementAreas.length > 0 ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Focus Areas
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {summary.improvementAreas.slice(0, 3).map((area) => (
                  <span
                    key={area}
                    className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-blue-500/10 px-3 py-2 text-xs text-blue-300 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>Excellent performance — roadmap locked in!</span>
            </div>
          )}

          {summary.roadmapRecommendations ? (
            <div
              className={`rounded-lg border px-4 py-3 text-sm ${
                state.darkMode
                  ? "border-gray-700 bg-gray-900/50"
                  : "border-gray-200 bg-blue-50"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Next Focus
              </p>
              <p className="mt-1 font-semibold text-blue-500">
                {summary.roadmapRecommendations.focus}
              </p>
              <p
                className={`mt-1 text-xs ${
                  state.darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {summary.roadmapRecommendations.summary}
              </p>
            </div>
          ) : null}

          {summary.recommendedResources.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Suggested Resource
              </p>
              <a
                href={summary.recommendedResources[0].url}
                target="_blank"
                rel="noreferrer"
                className="group mt-2 block rounded-lg border border-blue-500/40 bg-blue-500/5 px-4 py-3 text-sm text-blue-400 transition hover:border-blue-500 hover:bg-blue-500/10"
              >
                <span className="font-semibold">
                  {summary.recommendedResources[0].title}
                </span>
                {summary.recommendedResources[0].description && (
                  <p className="text-xs text-blue-200 group-hover:text-blue-100">
                    {summary.recommendedResources[0].description}
                  </p>
                )}
              </a>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {error ? (
            <p
              className={`text-sm ${
                state.darkMode ? "text-red-300" : "text-red-500"
              }`}
            >
              {error}
            </p>
          ) : (
            <p
              className={`text-sm ${
                state.darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              You haven’t completed an assessment yet. Kick off your personalized
              journey below.
            </p>
          )}
        </div>
      )}

      <Link
        to="/skill-assessment"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300"
      >
        {summary ? "Retake Assessment" : "Begin Assessment"}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
};

export default SkillAssessmentSummary;

