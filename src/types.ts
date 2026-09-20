export type DegreeLevel = 'High School' | 'Undergraduate' | 'Postgraduate' | 'PhD' | 'Postdoc';

export type FundingType = 'Full Ride' | 'Tuition' | 'Stipend' | 'Research Grant' | 'Fellowship' | 'Government Scheme';

export type ProviderType = 'Government' | 'University' | 'Private' | 'NonProfit';

export type UserRole = 'student' | 'university' | 'organization' | 'admin';

export interface Scholarship {
  id: string;
  title: string;
  organization: string;
  providerType: ProviderType;
  logo: string;
  coverImage: string;
  amount: number; // e.g. 50000 USD value
  amountDisplay: string; // e.g. "$50,000 / yr" or "Full Tuition + Stipend"
  currency: string;
  fundingType: FundingType;
  degreeLevels: DegreeLevel[];
  targetFields: string[];
  eligibleCountries: string[]; // e.g. ["Global", "India", "USA", "Developing Nations"]
  studyLocations: string[]; // e.g. ["USA", "UK", "Japan"]
  citizenshipReqs: string;
  minGpa?: number;
  deadline: string; // ISO string e.g. "2026-10-15"
  description: string;
  coverageDetails: string[]; // e.g. ["Full Tuition", "Monthly $2,000 Stipend", "Airfare Allowance", "Health Insurance"]
  requiredDocs: string[]; // e.g. ["Statement of Purpose", "2 Letters of Recommendation", "Transcripts", "IELTS/TOEFL"]
  acceptanceRate: string; // e.g. "3.5%"
  applicationUrl: string;
  featured?: boolean;
  popularityCount?: number;
  tags: string[];
}

export interface StudentProfile {
  name: string;
  email: string;
  targetDegree: DegreeLevel;
  currentEducation: string; // e.g. "B.Sc in Computer Science"
  gpa: number; // e.g. 3.85
  maxGpa: number; // e.g. 4.0
  standardizedTests: {
    testName: string; // e.g. "GRE", "IELTS", "SAT"
    score: string;
  }[];
  citizenship: string; // e.g. "India", "Nigeria", "USA"
  residenceCountry: string;
  familyIncomeBracket: string; // e.g. "< $25,000", "$25k - $50k", "> $100k"
  preferredCountries: string[];
  targetFields: string[];
  skills: string[];
  researchExperience: string;
  volunteerWork: string;
  achievements: string[];
  financialNeedScore: number; // 1 to 10
  preferredUniversities?: string[];
  languages: string[];
}

export interface MatchResult {
  scholarshipId: string;
  score: number; // 0 to 100
  acceptanceProbability: 'High' | 'Medium' | 'Low';
  matchedReasons: string[];
  missingQualifications: string[];
  actionableTips: string[];
  strengths: string[];
  estimatedCompetitiveness: string; // e.g. "Highly Competitive (Top 5%)"
}

export type ApplicationStatus = 'Interested' | 'Preparing' | 'Submitted' | 'Interview' | 'Accepted' | 'Rejected';

export interface ApplicationItem {
  id: string;
  scholarshipId: string;
  scholarshipTitle: string;
  organization: string;
  amountDisplay: string;
  status: ApplicationStatus;
  deadline: string;
  progressPercent: number;
  uploadedDocs: string[];
  notes: string;
  customReminders: {
    id: string;
    text: string;
    date: string;
    completed: boolean;
  }[];
  appliedDate?: string;
}

export interface EssayFeedback {
  score: number; // 0-100
  grammarScore: number;
  storytellingScore: number;
  persuasivenessScore: number;
  alignmentScore: number;
  wordCount: number;
  targetWordLimit: number;
  keyStrengths: string[];
  areasForImprovement: string[];
  annotatedSuggestions: {
    originalText: string;
    suggestion: string;
    reason: string;
  }[];
  polishedVersion: string;
}

export interface EssayDocument {
  id: string;
  title: string;
  scholarshipId?: string;
  scholarshipTitle?: string;
  type: 'Personal Statement' | 'Statement of Purpose' | 'Essay' | 'Motivation Letter';
  content: string;
  lastUpdated: string;
  targetWordLimit: number;
  feedback?: EssayFeedback;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: 'Resume' | 'Transcript' | 'Passport' | 'Recommendation Letter' | 'Certificate' | 'ID Proof';
  uploadDate: string;
  size: string;
  extractedData?: {
    candidateName?: string;
    email?: string;
    detectedGpa?: string;
    detectedDegree?: string;
    detectedMajor?: string;
    skillsExtracted?: string[];
    keyHighlights?: string[];
  };
  resumeReview?: {
    atsScore: number;
    formattingScore: number;
    keywordScore: number;
    impactScore: number;
    strengths: string[];
    improvements: string[];
    missingKeywords: string[];
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
  groundingSources?: { title: string; url: string }[];
}

export interface WeeklyRoadmapTask {
  week: number;
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
  estimatedHours: number;
}

export interface PrepRoadmap {
  weeks: {
    weekName: string;
    tasks: string[];
  }[];
  recommendationStrategy: string;
  interviewPrepFocus: string;
}
