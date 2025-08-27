// types/hackathon.ts

export interface Prize {
  position: string;
  title: string;
  description?: string;
  value?: string;
}

export interface Participant {
  user: string;
  registeredAt: Date;
  participationType: 'individual' | 'team';
}

export interface HackathonTeam {
  _id: string;
  teamName: string;
  leader: string;
  members: string[];
  inviteCode: string;
  joinedAt: Date;
}

export interface Hackathon {
  _id: string;
  title: string;
  description: string;
  theme: string;
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  maxTeamSize: number;
  minTeamSize: number;
  prizes: Prize[];
  rules: string[];
  judgingCriteria: string[];
  status: 'upcoming' | 'active' | 'judging' | 'ended';
  isPublished: boolean;
  allowIndividualParticipation: boolean;
  createdBy: string;
  participants: Participant[];
  teams: HackathonTeam[];
  totalParticipants: number;
  totalTeams: number;
  bannerImage?: string;
  tags: string[];
  submissionCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface RepoStats {
  stars: number;
  forks: number;
  commits: number;
  contributors: number;
  size: number;
  language?: string;
  lastUpdated?: Date;
}

export interface Vote {
  user: string;
  votedAt: Date;
}

export interface Screenshot {
  url: string;
  caption?: string;
}

export interface HackathonSubmission {
  _id: string;
  hackathonId: string;
  submittedBy: string;
  teamId?: string;
  participationType: 'individual' | 'team';
  projectTitle: string;
  projectDescription: string;
  repositoryUrl: string;
  liveDemoUrl?: string;
  techStack: string[];
  features: string[];
  challenges?: string;
  learnings?: string;
  repoStats: RepoStats;
  readmeContent?: string;
  screenshots: Screenshot[];
  videoDemo?: string;
  votes: Vote[];
  totalVotes: number;
  judgeScore?: number;
  finalRank?: number;
  isDisqualified: boolean;
  disqualificationReason?: string;
  submittedAt: Date;
  lastUpdatedAt: Date;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateHackathonRequest {
  title: string;
  description: string;
  theme: string;
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  maxTeamSize: number;
  minTeamSize: number;
  prizes: Prize[];
  rules: string[];
  judgingCriteria: string[];
  allowIndividualParticipation: boolean;
  bannerImage?: string;
  tags: string[];
}

export interface SubmissionRequest {
  participationType: 'individual' | 'team';
  teamId?: string;
  projectTitle: string;
  projectDescription: string;
  repositoryUrl: string;
  liveDemoUrl?: string;
  techStack: string[];
  features?: string[];
  challenges?: string;
  learnings?: string;
  screenshots?: Screenshot[];
  videoDemo?: string;
}

export interface TeamCreateRequest {
  teamName: string;
}

export interface TeamJoinRequest {
  inviteCode: string;
}

export interface VoteRequest {
  submissionId: string;
}

export interface RegisterRequest {
  participationType: 'individual' | 'team';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
