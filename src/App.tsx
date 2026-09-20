import React, { useState } from 'react';
import { 
  StudentProfile, 
  Scholarship, 
  MatchResult, 
  ApplicationItem, 
  DocumentItem,
  UserRole
} from './types';
import { INITIAL_SCHOLARSHIPS } from './data/scholarships';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { MatchEngineView } from './components/MatchEngineView';
import { ScholarshipSearch } from './components/ScholarshipSearch';
import { StudentDashboard } from './components/StudentDashboard';
import { ApplicationTracker } from './components/ApplicationTracker';
import { EssayWorkspace } from './components/EssayWorkspace';
import { DocumentsCenter } from './components/DocumentsCenter';
import { UniversityPortal } from './components/UniversityPortal';
import { AdminConsole } from './components/AdminConsole';
import { PrepRoadmapModal } from './components/PrepRoadmapModal';

export function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState<string>('landing');

  // Core Student Profile State
  const [profile, setProfile] = useState<StudentProfile>({
    name: 'Aria Chen',
    targetDegree: 'Postgraduate',
    currentEducation: 'B.Sc Computer Science, Stanford University',
    gpa: 3.88,
    maxGpa: 4.0,
    citizenship: 'United States',
    familyIncomeBracket: '$25k - $50k',
    targetFields: ['Computer Science', 'Artificial Intelligence', 'Data Science'],
    preferredLocations: ['United States', 'United Kingdom', 'Germany'],
    skills: ['Machine Learning', 'Python', 'PyTorch', 'Data Structures', 'Technical Writing'],
    researchExperience: '2 years as Undergraduate Research Assistant in Computer Vision & Robotics Lab.',
    volunteerWork: 'STEM Mentor for high school underrepresented youth.',
    financialNeedScore: 8,
  });

  // Scholarships State
  const [scholarships, setScholarships] = useState<Scholarship[]>(INITIAL_SCHOLARSHIPS);

  // Match Results State
  const [matchResults, setMatchResults] = useState<MatchResult[]>([
    {
      scholarshipId: 'sch-rhodes-2026',
      score: 95,
      matchedReasons: [
        'Exceptional GPA (3.88) meets Rhodes Academic Excellence requirement',
        'Demonstrated leadership & research in Artificial Intelligence',
        'Strong alignment with Oxford University postgraduate degree offerings'
      ],
      missingQualifications: [
        'Requires 4 strong institutional letters of recommendation'
      ],
      actionableTips: [
        'Highlight non-profit STEM mentorship work in section 3 of your personal statement',
        'Schedule preliminary interview practice for Oxford committee screening'
      ],
      estimatedCompetitiveness: 'Ultra Competitive (< 1.5% acceptance)',
      acceptanceProbability: 'High'
    },
    {
      scholarshipId: 'sch-knight-hennessy-2026',
      score: 92,
      matchedReasons: [
        'Current Stanford affiliation & strong undergraduate research background',
        'Interest in multidisciplinary AI and climate impact leadership'
      ],
      missingQualifications: [
        'Video submission requirement due 2 weeks before main deadline'
      ],
      actionableTips: [
        'Record video prompt highlighting your problem-solving philosophy'
      ],
      estimatedCompetitiveness: 'Ultra Competitive (~2.0% acceptance)',
      acceptanceProbability: 'Medium-High'
    },
    {
      scholarshipId: 'sch-daad-2026',
      score: 88,
      matchedReasons: [
        'Full tuition and stipend coverage for German M.Sc Artificial Intelligence programs',
        'Open to US citizens and international graduates'
      ],
      missingQualifications: [
        'Basic German language proficiency recommended for local housing'
      ],
      actionableTips: [
        'Obtain English medium of instruction certificate from Stanford registrar'
      ],
      estimatedCompetitiveness: 'Highly Competitive',
      acceptanceProbability: 'High'
    }
  ]);

  const [isMatching, setIsMatching] = useState(false);

  // Application Pipeline Kanban Tracker State
  const [applications, setApplications] = useState<ApplicationItem[]>([
    {
      id: 'app-rhodes',
      scholarshipId: 'sch-rhodes-2026',
      scholarshipTitle: 'Rhodes Scholarship at Oxford University',
      organization: 'The Rhodes Trust',
      amountDisplay: '£55,000 / year (Full Ride)',
      deadline: '2026-10-01',
      status: 'Preparing',
      progressPercent: 45,
      notes: 'Requested LORs from Dr. Vance and Dr. Smith.',
      customReminders: [
        { id: 'rem-1', text: 'Draft Personal Statement V2', date: '2026-08-15', completed: false }
      ]
    },
    {
      id: 'app-kh',
      scholarshipId: 'sch-knight-hennessy-2026',
      scholarshipTitle: 'Knight-Hennessy Scholars Program',
      organization: 'Stanford University',
      amountDisplay: '$90,000 / year (Full Ride)',
      deadline: '2026-10-09',
      status: 'Interested',
      progressPercent: 20,
      notes: 'Reviewing video submission guidelines.',
      customReminders: []
    }
  ]);

  // Documents Center State
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: 'doc-resume',
      name: 'Aria_Chen_CV_Academic.pdf',
      type: 'Resume',
      uploadDate: '2026-07-20',
      size: '142 KB',
      extractedData: {
        candidateName: 'Aria Chen',
        detectedGpa: '3.88',
        detectedDegree: 'Bachelor of Science',
        detectedMajor: 'Computer Science',
        skillsExtracted: ['Machine Learning', 'Python', 'PyTorch', 'Data Structures']
      },
      resumeReview: {
        atsScore: 92,
        formattingScore: 95,
        keywordScore: 88,
        impactScore: 93,
        improvements: [
          'Quantify lab research outcomes (e.g. "Improved model accuracy by 14%")',
          'Include standard ATS section heading "Academic Grants & Fellowships"'
        ],
        missingKeywords: ['Deep Learning', 'Grant Writing', 'Peer-Reviewed']
      }
    }
  ]);

  // Roadmap Modal State
  const [roadmapScholarship, setRoadmapScholarship] = useState<Scholarship | null>(null);

  // Save scholarship to tracker
  const handleSaveToTracker = (scholarship: Scholarship) => {
    if (applications.some(a => a.scholarshipId === scholarship.id)) return;
    const newApp: ApplicationItem = {
      id: 'app-' + Date.now(),
      scholarshipId: scholarship.id,
      scholarshipTitle: scholarship.title,
      organization: scholarship.organization,
      amountDisplay: scholarship.amountDisplay,
      deadline: scholarship.deadline,
      status: 'Interested',
      progressPercent: 10,
      notes: 'Saved from search directory.',
      uploadedDocs: [],
      customReminders: []
    };
    setApplications([newApp, ...applications]);
  };

  // Run AI Match Engine (Server Side Gemini)
  const handleRunMatch = async () => {
    setIsMatching(true);
    try {
      const res = await fetch('/api/ai/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentProfile: profile,
          scholarships: scholarships
        })
      });
      const data = await res.json();
      if (data.matches && Array.isArray(data.matches)) {
        setMatchResults(data.matches);
      } else if (data.results && Array.isArray(data.results)) {
        setMatchResults(data.results);
      }
    } catch (err) {
      console.error('Error running AI match:', err);
    } finally {
      setIsMatching(false);
    }
  };

  // Calculate profile completion score
  const profileCompletion = Math.min(
    100,
    (profile.name ? 15 : 0) +
    (profile.gpa ? 20 : 0) +
    (profile.citizenship ? 15 : 0) +
    (profile.targetFields.length > 0 ? 20 : 0) +
    (profile.researchExperience ? 15 : 0) +
    (profile.skills.length > 0 ? 15 : 0)
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        userRole={currentRole}
        setUserRole={(role) => {
          setCurrentRole(role);
          if (role === 'university') setActiveTab('university');
          else if (role === 'admin') setActiveTab('admin');
          else setActiveTab('dashboard');
        }}
        savedCount={applications.length}
        profileCompletion={profileCompletion}
        onOpenChat={() => {
          setActiveTab('match');
        }}
      />

      {/* Main Container */}
      <main className="pb-16">
        {currentRole === 'university' ? (
          <UniversityPortal
            scholarships={scholarships}
            onAddScholarship={(newSch) => setScholarships([newSch, ...scholarships])}
          />
        ) : currentRole === 'admin' ? (
          <AdminConsole
            scholarships={scholarships}
            onToggleFeatured={(id) => {
              setScholarships(scholarships.map(s => s.id === id ? { ...s, featured: !s.featured } : s));
            }}
          />
        ) : (
          <>
            {activeTab === 'landing' && (
              <LandingPage
                onNavigateToMatch={() => setActiveTab('match')}
                onNavigateToSearch={() => setActiveTab('search')}
              />
            )}

            {activeTab === 'dashboard' && (
              <StudentDashboard
                profile={profile}
                scholarships={scholarships}
                applications={applications}
                onNavigate={setActiveTab}
                onSelectScholarship={(s) => setRoadmapScholarship(s)}
                profileCompletion={profileCompletion}
              />
            )}

            {activeTab === 'match' && (
              <MatchEngineView
                profile={profile}
                onUpdateProfile={setProfile}
                scholarships={scholarships}
                matchResults={matchResults}
                onRunMatch={handleRunMatch}
                isMatching={isMatching}
                onSelectScholarship={(s) => setRoadmapScholarship(s)}
                onSaveToTracker={handleSaveToTracker}
                savedIds={applications.map((a) => a.scholarshipId)}
              />
            )}

            {activeTab === 'search' && (
              <ScholarshipSearch
                scholarships={scholarships}
                savedIds={applications.map((a) => a.scholarshipId)}
                onSaveToTracker={handleSaveToTracker}
                onSelectScholarship={(s) => setRoadmapScholarship(s)}
                onGenerateRoadmap={(s) => setRoadmapScholarship(s)}
              />
            )}

            {activeTab === 'tracker' && (
              <ApplicationTracker
                applications={applications}
                onUpdateApplication={(updated) => {
                  setApplications(applications.map(a => a.id === updated.id ? updated : a));
                }}
                onRemoveApplication={(id) => {
                  setApplications(applications.filter(a => a.id !== id));
                }}
                scholarships={scholarships}
              />
            )}

            {activeTab === 'essays' && (
              <EssayWorkspace
                scholarships={scholarships}
                profile={profile}
              />
            )}

            {activeTab === 'docs' && (
              <DocumentsCenter
                documents={documents}
                onAddDocument={(doc) => setDocuments([doc, ...documents])}
                onRemoveDocument={(id) => setDocuments(documents.filter(d => d.id !== id))}
                profile={profile}
                onUpdateProfile={setProfile}
              />
            )}
          </>
        )}
      </main>

      {/* AI Prep Roadmap Modal */}
      <PrepRoadmapModal
        scholarship={roadmapScholarship}
        profile={profile}
        onClose={() => setRoadmapScholarship(null)}
      />

    </div>
  );
}

export default App;
