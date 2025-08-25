import express from 'express';
import {
  getJobOpportunities,
  getJobById,
  applyToJob,
  getUserApplications,
  createInterviewSession,
  getInterviewSessions,
  updateInterviewSession,
  getResources,
  downloadResource,
  startAIMockInterview,
  fetchExternalJobs
} from '../controller/placementController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// ==========================
// ✅ Job Opportunities Routes
// ==========================
router.get('/jobs', getJobOpportunities);
router.get('/jobs/:id', getJobById);
router.post('/jobs/:jobId/apply', authenticateToken, applyToJob);
router.get('/users/:userId/applications', authenticateToken, getUserApplications);

// ==========================
// ✅ Interview Sessions Routes
// ==========================
router.post('/interviews', authenticateToken, createInterviewSession);
router.get('/interviews', authenticateToken, getInterviewSessions);
router.put('/interviews/:id', authenticateToken, updateInterviewSession);
router.post('/interviews/ai-mock', authenticateToken, startAIMockInterview);

// ==========================
// ✅ Resources Routes
// ==========================
router.get('/resources', getResources);
router.post('/resources/:id/download', authenticateToken, downloadResource);

// ==========================
// ✅ External Job APIs
// ==========================
router.get('/external-jobs', fetchExternalJobs);

// ==========================
// 📌 (Optional) Mock Alumni / Recruiters (to migrate later to DB)
// ==========================
const placementData = {
  stats: {
    totalHires: 2847,
    successRate: 94.5,
    hiringPartners: 150,
    averageSalary: "₹12.5 LPA",
  },
  alumni: [
    { id: 1, name: "Priya Sharma", role: "Software Engineer", company: "Google", year: 2024, domain: "Software Development", location: "Bangalore", salary: "₹28 LPA" },
    { id: 2, name: "Rahul Kumar", role: "Data Scientist", company: "Microsoft", year: 2024, domain: "Data Science", location: "Hyderabad", salary: "₹25 LPA" },
    // ... keep or move to DB later
  ],
  recruiters: [
    { id: 1, name: "Google", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", hiresCount: 45 },
    { id: 2, name: "Microsoft", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg", hiresCount: 38 },
    // ... keep or move to DB later
  ],
};

// Placement stats
router.get("/stats", (req, res) => {
  res.json({ success: true, data: placementData.stats });
});

// Alumni testimonials
router.get("/alumni", (req, res) => {
  const { year, domain, location, search } = req.query;
  let filtered = [...placementData.alumni];

  if (year && year !== "All Years") filtered = filtered.filter(a => a.year.toString() === year);
  if (domain && domain !== "All Domains") filtered = filtered.filter(a => a.domain === domain);
  if (location && location !== "All Locations") filtered = filtered.filter(a => a.location === location);
  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter(a =>
      a.name.toLowerCase().includes(term) ||
      a.company.toLowerCase().includes(term) ||
      a.role.toLowerCase().includes(term)
    );
  }

  res.json({ success: true, data: filtered, total: filtered.length });
});

// Recruiters
router.get("/recruiters", (req, res) => {
  res.json({ success: true, data: placementData.recruiters });
});

// All placement data
router.get("/all", (req, res) => {
  res.json({ success: true, data: placementData });
});

export default router;
