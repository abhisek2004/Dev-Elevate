import User from "../model/UserModel.js";

/**
 * Implements Elo-style rating calculations for contest participants
 */

// Constants for rating calculation
const K_FACTOR = 32; // How much a single contest can affect ratings
const EXPECTED_SCORE_FACTOR = 400; // Controls how much rating difference affects expected score

/**
 * Calculate expected score based on rating difference
 * @param {number} ratingA - Rating of player A
 * @param {number} ratingB - Rating of player B
 * @returns {number} Expected score (between 0 and 1)
 */
const calculateExpectedScore = (ratingA, ratingB) => {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / EXPECTED_SCORE_FACTOR));
};

/**
 * Calculate new rating based on old rating, actual score, and expected score
 * @param {number} oldRating - Current rating of the player
 * @param {number} actualScore - Actual score in the contest (normalized between 0 and 1)
 * @param {number} expectedScore - Expected score based on rating differences
 * @returns {number} New rating
 */
const calculateNewRating = (oldRating, actualScore, expectedScore) => {
  return Math.round(oldRating + K_FACTOR * (actualScore - expectedScore));
};

/**
 * Calculate rating changes for all participants in a contest
 * @param {Array} participants - Array of participants with current ratings and scores
 * @returns {Array} Array of participants with new ratings and rating changes
 */
const calculateContestRatings = (participants) => {
  // Sort by score (highest first)
  const sortedParticipants = [...participants].sort(
    (a, b) => b.score - a.score
  );

  // Calculate actual scores based on rank (normalize between 0 and 1)
  const totalParticipants = sortedParticipants.length;
  sortedParticipants.forEach((participant, index) => {
    participant.actualScore = (totalParticipants - index) / totalParticipants;
  });

  // Calculate expected scores for each participant
  sortedParticipants.forEach((participantA) => {
    let expectedScore = 0;
    sortedParticipants.forEach((participantB) => {
      if (participantA.userId !== participantB.userId) {
        expectedScore += calculateExpectedScore(
          participantA.rating,
          participantB.rating
        );
      }
    });
    participantA.expectedScore = expectedScore / (totalParticipants - 1);
  });

  // Calculate new ratings and rating changes
  sortedParticipants.forEach((participant) => {
    const oldRating = participant.rating;
    participant.newRating = calculateNewRating(
      oldRating,
      participant.actualScore,
      participant.expectedScore
    );
    participant.ratingChange = participant.newRating - oldRating;
  });

  return sortedParticipants;
};
// Export using ES modules syntax (since your project uses type: "module")
export { calculateContestRatings, calculateNewRating, calculateExpectedScore };
