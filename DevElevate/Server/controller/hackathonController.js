// controllers/hackathonController.js
import Hackathon from "../model/Hackathon.js";
import HackathonSubmission from "../model/HackathonSubmission.js";
import user from "../model/UserModel.js";
import mongoose from "mongoose";
import { z } from "zod";

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
    
    // Input validation and sanitization
    const querySchema = z.object({
      status: z.enum(["upcoming", "ongoing", "completed"]).optional()
    });
    
    const validatedQuery = querySchema.safeParse({ status });
    if (!validatedQuery.success) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid query parameters",
        errors: validatedQuery.error.errors
      });
    }
    
    const query = { isPublished: true };
    if (validatedQuery.data.status) {
      query.status = validatedQuery.data.status;
    }

    const items = await Hackathon.find(query).sort({ startDate: -1 });
    return res.json({ success: true, data: items });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getHackathon = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid hackathon ID format" });
    }
    
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
    const { participationType } = req.body;
    
    // Input validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid hackathon ID format" });
    }
    
    const registrationSchema = z.object({
      participationType: z.enum(["individual", "team"])
    });
    
    const validatedData = registrationSchema.safeParse({ participationType });
    if (!validatedData.success) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid participation type",
        errors: validatedData.error.errors
      });
    }

    const hack = await Hackathon.findById(id);
    if (!hack) return res.status(404).json({ success: false, message: "Hackathon not found" });

    // prevent duplicate register
    const already = hack.participants?.some(p => p.user.toString() === userId);
    if (already) return res.status(400).json({ success: false, message: "Already registered" });

    hack.participants.push({ user: userId, participationType: validatedData.data.participationType });
    hack.totalParticipants = (hack.totalParticipants || 0) + 1;
    await hack.save();

    return res.json({ success: true, message: "Registered successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const { teamName } = req.body;
    
    // Input validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid hackathon ID format" });
    }
    
    const teamSchema = z.object({
      teamName: z.string().min(1, "Team name is required").max(100, "Team name too long")
    });
    
    const validatedData = teamSchema.safeParse({ teamName });
    if (!validatedData.success) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid team data",
        errors: validatedData.error.errors
      });
    }

    const hack = await Hackathon.findById(id);
    if (!hack) return res.status(404).json({ success: false, message: "Hackathon not found" });

    const inviteCode = generateInviteCode();
    hack.teams.push({ 
      teamName: validatedData.data.teamName, 
      leader: userId, 
      members: [userId], 
      inviteCode 
    });
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
    const { id } = req.params;
    const userId = req.user?.id;
    const { inviteCode } = req.body;
    
    // Input validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid hackathon ID format" });
    }
    
    const joinTeamSchema = z.object({
      inviteCode: z.string().min(1, "Invite code is required").max(20, "Invalid invite code")
    });
    
    const validatedData = joinTeamSchema.safeParse({ inviteCode });
    if (!validatedData.success) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid invite code",
        errors: validatedData.error.errors
      });
    }

    const hack = await Hackathon.findById(id);
    if (!hack) return res.status(404).json({ success: false, message: "Hackathon not found" });

    const team = hack.teams.find(t => t.inviteCode === validatedData.data.inviteCode);
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
    const { id } = req.params;
    const userId = req.user?.id;
    const { participationType, teamId, projectTitle, projectDescription, repositoryUrl, liveDemoUrl, techStack } = req.body;
    
    // Validate hackathon ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid hackathon ID format" });
    }
    
    // Comprehensive input validation
    const submissionSchema = z.object({
      participationType: z.enum(["individual", "team"]),
      teamId: z.string().refine(val => !val || mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid team ID format"
      }).optional(),
      projectTitle: z.string().min(1, "Project title is required").max(200, "Project title too long"),
      projectDescription: z.string().min(10, "Project description must be at least 10 characters").max(5000, "Project description too long"),
      repositoryUrl: z.string().url("Invalid repository URL").max(500, "Repository URL too long"),
      liveDemoUrl: z.string().url("Invalid demo URL").max(500, "Demo URL too long").optional().or(z.literal("")),
      techStack: z.array(z.string().max(50, "Tech stack item too long")).max(20, "Too many tech stack items").optional()
    });
    
    const validatedData = submissionSchema.safeParse({
      participationType,
      teamId,
      projectTitle,
      projectDescription,
      repositoryUrl,
      liveDemoUrl,
      techStack
    });
    
    if (!validatedData.success) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid submission data",
        errors: validatedData.error.errors
      });
    }

    // Create submission
    const submission = await HackathonSubmission.create({
      hackathonId: id,
      submittedBy: userId,
      teamId: validatedData.data.teamId || undefined,
      participationType: validatedData.data.participationType,
      projectTitle: validatedData.data.projectTitle,
      projectDescription: validatedData.data.projectDescription,
      repositoryUrl: validatedData.data.repositoryUrl,
      liveDemoUrl: validatedData.data.liveDemoUrl || undefined,
      techStack: validatedData.data.techStack,
    });

    return res.status(201).json({ success: true, data: submission });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid hackathon ID format" });
    }
    
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

    // Input validation and sanitization
    const voteSchema = z.object({
      submissionId: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid submission ID format"
      })
    });
    
    const validatedData = voteSchema.safeParse({ submissionId });
    if (!validatedData.success) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid input data",
        errors: validatedData.error.errors
      });
    }

    const submission = await HackathonSubmission.findById(validatedData.data.submissionId);
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

    // Input validation and sanitization
    const unvoteSchema = z.object({
      submissionId: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid submission ID format"
      })
    });
    
    const validatedData = unvoteSchema.safeParse({ submissionId });
    if (!validatedData.success) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid input data",
        errors: validatedData.error.errors
      });
    }

    const submission = await HackathonSubmission.findById(validatedData.data.submissionId);
    if (!submission) return res.status(404).json({ success: false, message: "Submission not found" });

    await submission.removeVote(userId);
    return res.json({ success: true, message: "Vote removed" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

