// controllers/hackathonController.js
import Hackathon from "../model/Hackathon.js";
import HackathonSubmission from "../model/HackathonSubmission.js";
import user from "../model/UserModel.js";

// Utility to generate a simple invite code
const generateInviteCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

export const createHackathon = async (req, res) => {
  try {
    const adminId = req.user?.id; // from auth middleware
    if (!adminId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const hackathon = await Hackathon.create({
      ...req.body,
      createdBy: adminId,
    });
    return res.status(201).json({ success: true, data: hackathon });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const listHackathons = async (req, res) => {
  try {
    const { status } = req.query;
    const query = { isPublished: true };
    if (status) query.status = status;

    const items = await Hackathon.find(query).sort({ startDate: -1 });
    return res.json({ success: true, data: items });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getHackathon = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Hackathon.findById(id);
    if (!item) return res.status(404).json({ success: false, message: "Not found" });
    return res.json({ success: true, data: item });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const registerToHackathon = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const { participationType } = req.body; // "individual" | "team"

    const hack = await Hackathon.findById(id);
    if (!hack) return res.status(404).json({ success: false, message: "Hackathon not found" });

    // prevent duplicate register
    const already = hack.participants?.some(p => p.user.toString() === userId);
    if (already) return res.status(400).json({ success: false, message: "Already registered" });

    hack.participants.push({ user: userId, participationType });
    hack.totalParticipants = (hack.totalParticipants || 0) + 1;
    await hack.save();

    return res.json({ success: true, message: "Registered successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createTeam = async (req, res) => {
  try {
    const { id } = req.params; // hackathon id
    const userId = req.user?.id;
    const { teamName } = req.body;

    const hack = await Hackathon.findById(id);
    if (!hack) return res.status(404).json({ success: false, message: "Hackathon not found" });

    const inviteCode = generateInviteCode();
    hack.teams.push({ teamName, leader: userId, members: [userId], inviteCode });
    hack.totalTeams = (hack.totalTeams || 0) + 1;

    await hack.save();
    const team = hack.teams[hack.teams.length - 1];
    return res.status(201).json({ success: true, data: team });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const joinTeam = async (req, res) => {
  try {
    const { id } = req.params; // hackathon id
    const userId = req.user?.id;
    const { inviteCode } = req.body;

    const hack = await Hackathon.findById(id);
    if (!hack) return res.status(404).json({ success: false, message: "Hackathon not found" });

    const team = hack.teams.find(t => t.inviteCode === inviteCode);
    if (!team) return res.status(404).json({ success: false, message: "Invalid invite code" });

    if (team.members.some(m => m.toString() === userId)) {
      return res.status(400).json({ success: false, message: "Already in team" });
    }

    if (team.members.length >= hack.maxTeamSize) {
      return res.status(400).json({ success: false, message: "Team is full" });
    }

    team.members.push(userId);
    await hack.save();
    return res.json({ success: true, message: "Joined team" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const submitProject = async (req, res) => {
  try {
    const { id } = req.params; // hackathon id
    const userId = req.user?.id;
    const { participationType, teamId, projectTitle, projectDescription, repositoryUrl, liveDemoUrl, techStack } = req.body;

    // Basic validation
    if (!projectTitle || !projectDescription || !repositoryUrl) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Create submission
    const submission = await HackathonSubmission.create({
      hackathonId: id,
      submittedBy: userId,
      teamId: teamId || undefined,
      participationType,
      projectTitle,
      projectDescription,
      repositoryUrl,
      liveDemoUrl,
      techStack,
    });

    return res.status(201).json({ success: true, data: submission });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const { id } = req.params; // hackathon id
    const list = await HackathonSubmission.find({ hackathonId: id, isDisqualified: { $ne: true } })
      .sort({ totalVotes: -1, judgeScore: -1, submittedAt: 1 })
      .limit(100)
      .lean();

    return res.json({ success: true, data: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const voteSubmission = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { submissionId } = req.body;

    const submission = await HackathonSubmission.findById(submissionId);
    if (!submission) return res.status(404).json({ success: false, message: "Submission not found" });

    // Prevent self voting
    if (submission.submittedBy.toString() === userId) {
      return res.status(400).json({ success: false, message: "You cannot vote your own submission" });
    }

    await submission.addVote(userId);
    return res.json({ success: true, message: "Voted" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const unvoteSubmission = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { submissionId } = req.body;

    const submission = await HackathonSubmission.findById(submissionId);
    if (!submission) return res.status(404).json({ success: false, message: "Submission not found" });

    await submission.removeVote(userId);
    return res.json({ success: true, message: "Vote removed" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

