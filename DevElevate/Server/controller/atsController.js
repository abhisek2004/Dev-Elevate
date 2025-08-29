import extractKeywords from "../utils/keywordExtractor.js";
import jobKeywords from "../utils/jobKeywords.js";
import jobSpecificKeywords from "../utils/jobSpecificKeywords.js";

/**
 * ATS stands for Applicant Tracking System.
 * Controller for ATS resume scanning functionality
 * Analyzes resume text for ATS compatibility and provides score and suggestions
 */
export const scanResumeATS = (req, res) => {
  try {
    const { resumeText, targetJobTitle } = req.body;
    if (!resumeText) return res.status(400).json({ error: "No resume text provided" });

    // Get relevant keywords based on job title if specified
    let keywordsToCheck = [...jobKeywords]; // Start with general keywords
    
    if (targetJobTitle) {
      // Try to match job title with our specific roles
      const jobType = Object.keys(jobSpecificKeywords).find(job => 
        targetJobTitle.toLowerCase().includes(job)
      );
      
      if (jobType) {
        // Add job-specific keywords to our checking list
        keywordsToCheck = [...keywordsToCheck, ...jobSpecificKeywords[jobType]];
        console.log(`Using specialized keywords for ${jobType} role`);
      }
    }

    // Extract keywords with our enhanced extractor
    const extracted = extractKeywords(resumeText);
    const allExtractedTerms = [...extracted.words, ...extracted.phrases];
    
    // Match against our keywords list
    const matched = allExtractedTerms.filter(term => 
      keywordsToCheck.some(jobKw => jobKw.toLowerCase() === term.toLowerCase())
    );

    // Calculate ATS score based on keyword matching and section detection
    // Base score from keyword matching
    let score = Math.min(Math.round((matched.length / Math.min(keywordsToCheck.length, 30)) * 100), 100);
    
    // Bonus points for having proper sections
    const sectionBonus = Object.values(extracted.sections)
      .filter(section => section.found)
      .length * 3; // 3 points per detected section
    
    // Adjust score with bonuses, capped at 100
    score = Math.min(score + sectionBonus, 100);
    
    // Check if the score is unrealistically high for a very short resume
    if (resumeText.length < 500 && score > 20) {
      score = 20; // Cap score for very short resumes
    }
    
    // Determine which sections likely passed ATS based on our section detection
    const passedSections = [];
    
    if (extracted.sections.summary.found) {
      passedSections.push('Professional Summary');
    }
    
    if (extracted.sections.skills.found) {
      passedSections.push('Technical Skills');
    }
    
    if (extracted.sections.experience.found) {
      passedSections.push('Experience');
    }
    
    if (extracted.sections.education.found) {
      passedSections.push('Education');
    }
    
    if (extracted.sections.projects.found) {
      passedSections.push('Projects');
    }
    
    // Generate improvement suggestions based on missing keywords and sections
    const suggestions = [];
    
    // Keyword-based suggestions
    if (matched.length < keywordsToCheck.length * 0.3) {
      suggestions.push("Add more relevant technical keywords");
    }
    
    // Check for achievement-oriented language
    const achievementWords = ['achieved', 'improved', 'increased', 'reduced', 'optimized', 
      'led', 'managed', 'delivered', 'implemented', 'developed'];
    
    if (!achievementWords.some(word => extracted.words.includes(word))) {
      suggestions.push("Include quantifiable achievements with metrics");
    }
    
    // Check for section-based suggestions
    if (!extracted.sections.summary.found) {
      suggestions.push("Add a professional summary at the top of your resume");
    }
    
    if (!extracted.sections.skills.found) {
      suggestions.push("Include a dedicated skills section with relevant technologies");
    }
    
    // Check resume length
    const wordCount = resumeText.split(/\s+/).length;
    if (wordCount > 1000) {
      suggestions.push("Resume might be too verbose - consider condensing to 1-2 pages");
    } else if (wordCount < 300) {
      suggestions.push("Resume appears too short - expand with more details about your experience");
    }
    
    res.status(200).json({
      score,
      totalKeywords: keywordsToCheck.length,
      matchedKeywords: matched,
      missingKeywords: keywordsToCheck.filter(kw => 
        !matched.some(m => m.toLowerCase() === kw.toLowerCase())
      ).slice(0, 50), // Limit to 50 missing keywords
      passedSections,
      suggestions,
      jobTitle: targetJobTitle || "General Tech Role",
      sections: Object.keys(extracted.sections).filter(key => extracted.sections[key].found)
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to process ATS scan", details: err.message });
  }
};
