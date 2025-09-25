// controller/atsController.js
import extractKeywords from "../utils/keywordExtractor.js";
import jobKeywords from "../utils/jobKeywords.js";
import jobSpecificKeywords from "../utils/jobSpecificKeywords.js";

/**
 * ATS Controller
 * Scans resume text for ATS compatibility, calculates score, and suggests improvements
 */
export const scanResumeATS = (req, res) => {
  try {
    const { resumeText, targetJobTitle } = req.body;
    if (!resumeText) {
      return res.status(400).json({ error: "No resume text provided" });
    }

    // ====== Build keyword list ======
    let keywordsToCheck = [...jobKeywords];
    if (targetJobTitle) {
      const jobType = Object.keys(jobSpecificKeywords).find((job) =>
        targetJobTitle.toLowerCase().includes(job)
      );
      if (jobType) {
        keywordsToCheck.push(...jobSpecificKeywords[jobType]);
        console.log(`Using specialized keywords for ${jobType} role`);
      }
    }

    // ====== Extract terms and sections ======
    const extracted = extractKeywords(resumeText);
    const allExtractedTerms = [...extracted.words, ...extracted.phrases];

    // ====== Keyword Matching ======
    const matched = allExtractedTerms.filter((term) =>
      keywordsToCheck.some((kw) => kw.toLowerCase() === term.toLowerCase())
    );

    // ====== Score Calculation ======
    let score = Math.min(
      Math.round((matched.length / Math.min(keywordsToCheck.length, 30)) * 100),
      100
    );

    // Bonus points for detected sections
    const sectionBonus =
      Object.values(extracted.sections).filter((s) => s.found).length * 3;
    score = Math.min(score + sectionBonus, 100);

    // Cap score for very short resumes
    if (resumeText.length < 500 && score > 20) {
      score = 20;
    }

    // ====== Passed Sections ======
    const passedSections = Object.entries(extracted.sections)
      .filter(([, section]) => section.found)
      .map(([key]) => {
        const map = {
          summary: "Professional Summary",
          skills: "Technical Skills",
          experience: "Experience",
          education: "Education",
          projects: "Projects",
        };
        return map[key] || key;
      });

    // ====== Suggestions ======
    const suggestions = [];

    // Keywords
    if (matched.length < keywordsToCheck.length * 0.3) {
      suggestions.push("Add more relevant technical keywords");
    }

    // Achievement-oriented language
    const achievementWords = [
      "achieved",
      "improved",
      "increased",
      "reduced",
      "optimized",
      "led",
      "managed",
      "delivered",
      "implemented",
      "developed",
    ];
    if (!achievementWords.some((word) => extracted.words.includes(word))) {
      suggestions.push("Include quantifiable achievements with metrics");
    }

    // Missing sections
    if (!extracted.sections.summary.found) {
      suggestions.push("Add a professional summary at the top of your resume");
    }
    if (!extracted.sections.skills.found) {
      suggestions.push(
        "Include a dedicated skills section with relevant technologies"
      );
    }

    // Length checks
    const wordCount = resumeText.split(/\s+/).length;
    if (wordCount > 1000) {
      suggestions.push("Resume might be too verbose - condense to 1–2 pages");
    } else if (wordCount < 300) {
      suggestions.push("Resume appears too short - expand with more details");
    }

    // ====== Response ======
    return res.status(200).json({
      score,
      totalKeywords: keywordsToCheck.length,
      matchedKeywords: matched,
      missingKeywords: keywordsToCheck
        .filter(
          (kw) => !matched.some((m) => m.toLowerCase() === kw.toLowerCase())
        )
        .slice(0, 50), // Limit to 50
      passedSections,
      suggestions,
      jobTitle: targetJobTitle || "General Tech Role",
      sections: Object.keys(extracted.sections).filter(
        (k) => extracted.sections[k].found
      ),
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to process ATS scan",
      details: error.message,
    });
  }
};
