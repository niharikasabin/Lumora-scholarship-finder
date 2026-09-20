import React, { useState } from 'react';
import { 
  StudentProfile, 
  Scholarship, 
  MatchResult, 
  DegreeLevel 
} from '../types';
import { 
  Zap, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ArrowRight, 
  UserCheck, 
  Bot, 
  RefreshCw,
  Info,
  Layers,
  Star,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface MatchEngineViewProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
  scholarships: Scholarship[];
  matchResults: MatchResult[];
  onRunMatch: () => void;
  isMatching: boolean;
  onSelectScholarship: (scholarship: Scholarship) => void;
  onSaveToTracker: (scholarship: Scholarship) => void;
  savedIds: string[];
}

export const MatchEngineView: React.FC<MatchEngineViewProps> = ({
  profile,
  onUpdateProfile,
  scholarships,
  matchResults,
  onRunMatch,
  isMatching,
  onSelectScholarship,
  onSaveToTracker,
  savedIds,
}) => {
  const [selectedMatchExplanation, setSelectedMatchExplanation] = useState<{
    scholarship: Scholarship;
    result: MatchResult;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<'profile' | 'results'>('results');

  // Helper to handle input changes
  const handleChange = (field: keyof StudentProfile, value: any) => {
    onUpdateProfile({
      ...profile,
      [field]: value
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-purple-400 fill-current" />
              <span>Agent 1: Eligibility & Recommendation Agent</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Scholarship Eligibility & Match Engine
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Gemini evaluates your GPA, test scores, research background, and citizenship against 50,000+ global financial aid opportunities to calculate exact eligibility probabilities.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-white text-blue-900 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              Edit Profile
            </button>
            <button
              id="run-ai-match-engine-btn"
              onClick={() => {
                setActiveTab('results');
                onRunMatch();
              }}
              disabled={isMatching}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/25 cursor-pointer disabled:opacity-50"
            >
              {isMatching ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Agent Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run AI Match Engine</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('results')}
          className={`pb-3 px-1 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'results'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          Matched Opportunities ({matchResults.length})
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 px-1 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          Academic Profile Setup
        </button>
      </div>

      {/* TAB CONTENT 1: EDIT PROFILE FORM */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Academic & Financial Profile</h2>
              <p className="text-xs text-slate-500">Provide accurate details to maximize matching quality.</p>
            </div>
            <button
              onClick={() => {
                setActiveTab('results');
                onRunMatch();
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-colors cursor-pointer"
            >
              Save & Analyze Matches
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            {/* Full Name */}
            <div>
              <label htmlFor="full-name-input" className="block font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                id="full-name-input"
                type="text"
                value={profile.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            {/* Target Degree */}
            <div>
              <label htmlFor="target-degree-select" className="block font-semibold text-slate-700 mb-1">Target Degree Level</label>
              <select
                id="target-degree-select"
                value={profile.targetDegree}
                onChange={(e) => handleChange('targetDegree', e.target.value as DegreeLevel)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 focus:border-blue-500 focus:outline-hidden bg-white"
              >
                <option value="High School">High School Senior</option>
                <option value="Undergraduate">Undergraduate (B.Sc / B.A)</option>
                <option value="Postgraduate">Postgraduate (M.Sc / MBA / LLM)</option>
                <option value="PhD">PhD / Doctoral Candidate</option>
                <option value="Postdoc">Postdoctoral Research Fellow</option>
              </select>
            </div>

            {/* GPA */}
            <div>
              <label htmlFor="gpa-number-input" className="block font-semibold text-slate-700 mb-1">
                Cumulative GPA (Out of {profile.maxGpa}): <span className="text-blue-600 font-bold">{profile.gpa}</span>
              </label>
              <input
                id="gpa-number-input"
                type="number"
                step="0.01"
                min="0"
                max="4.0"
                value={profile.gpa}
                onChange={(e) => handleChange('gpa', parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            {/* Citizenship */}
            <div>
              <label htmlFor="citizenship-input" className="block font-semibold text-slate-700 mb-1">Country of Citizenship</label>
              <input
                id="citizenship-input"
                type="text"
                value={profile.citizenship}
                onChange={(e) => handleChange('citizenship', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 focus:border-blue-500 focus:outline-hidden"
                placeholder="e.g. India, Nigeria, USA, Brazil"
              />
            </div>

            {/* Current Education */}
            <div>
              <label htmlFor="current-edu-input" className="block font-semibold text-slate-700 mb-1">Current Institution & Major</label>
              <input
                id="current-edu-input"
                type="text"
                value={profile.currentEducation}
                onChange={(e) => handleChange('currentEducation', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            {/* Income Bracket */}
            <div>
              <label htmlFor="profile-income-select" className="block font-semibold text-slate-700 mb-1">Family Household Income</label>
              <select
                id="profile-income-select"
                value={profile.familyIncomeBracket}
                onChange={(e) => handleChange('familyIncomeBracket', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 focus:border-blue-500 focus:outline-hidden bg-white"
              >
                <option value="< $25,000">Under $25,000 / year (High Need)</option>
                <option value="$25k - $50k">$25,000 – $50,000 / year</option>
                <option value="$50k - $100k">$50,000 – $100,000 / year</option>
                <option value="> $100k">Above $100,000 / year</option>
              </select>
            </div>

            {/* Target Fields */}
            <div className="md:col-span-2">
              <label htmlFor="target-fields-input" className="block font-semibold text-slate-700 mb-1">Fields of Interest (Comma separated)</label>
              <input
                id="target-fields-input"
                type="text"
                value={profile.targetFields.join(', ')}
                onChange={(e) => handleChange('targetFields', e.target.value.split(',').map(s => s.trim()))}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 focus:border-blue-500 focus:outline-hidden"
                placeholder="Computer Science, AI, Public Health, Economics"
              />
            </div>

            {/* Financial Need Score */}
            <div>
              <label htmlFor="need-score-input" className="block font-semibold text-slate-700 mb-1">
                Financial Need Index (1 to 10): <span className="text-purple-600 font-bold">{profile.financialNeedScore}</span>
              </label>
              <input
                id="need-score-input"
                type="range"
                min="1"
                max="10"
                value={profile.financialNeedScore}
                onChange={(e) => handleChange('financialNeedScore', parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer mt-2"
              />
            </div>

            {/* Research Experience */}
            <div className="md:col-span-3">
              <label htmlFor="research-exp-textarea" className="block font-semibold text-slate-700 mb-1">Research Experience & Publications</label>
              <textarea
                id="research-exp-textarea"
                rows={2}
                value={profile.researchExperience}
                onChange={(e) => handleChange('researchExperience', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 focus:border-blue-500 focus:outline-hidden"
                placeholder="Detail key lab research, published papers, thesis topics, or technical projects..."
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: MATCH RESULTS */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          
          {/* Loading Radar Animation */}
          {isMatching && (
            <div className="bg-white rounded-3xl p-12 text-center border border-blue-100 shadow-md space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto animate-pulse">
                <Bot className="w-8 h-8 animate-bounce" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Gemini Agent Scanning Global Database...</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Comparing your academic transcripts, citizenship eligibility, and degree level against 50,000+ scholarship criteria.
              </p>
            </div>
          )}

          {/* Results List */}
          {!isMatching && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchResults.map((match) => {
                const scholarship = scholarships.find((s) => s.id === match.scholarshipId);
                if (!scholarship) return null;

                const isSaved = savedIds.includes(scholarship.id);

                return (
                  <div
                    key={match.scholarshipId}
                    className="bg-white rounded-2xl border border-slate-200/80 hover:border-blue-400 hover:shadow-lg transition-all p-5 flex flex-col justify-between space-y-4 relative group"
                  >
                    {/* Top Header */}
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <img
                          src={scholarship.logo}
                          alt={scholarship.organization}
                          className="w-11 h-11 rounded-xl object-cover border border-slate-200 shadow-2xs"
                        />
                        <div className="flex flex-col items-end">
                          <div className={`px-2.5 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 ${
                            match.score >= 85
                              ? 'bg-emerald-100 text-emerald-800'
                              : match.score >= 70
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            <Zap className="w-3 h-3 fill-current" />
                            {match.score}% Match
                          </div>
                          <span className="text-[11px] text-slate-400 font-medium mt-1">
                            {match.acceptanceProbability} Probability
                          </span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
                          {scholarship.providerType} • {scholarship.studyLocations.join(', ')}
                        </span>
                        <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors line-clamp-2">
                          {scholarship.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          {scholarship.organization}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Award Value:</span>
                        <span className="font-bold text-emerald-600">{scholarship.amountDisplay}</span>
                      </div>
                    </div>

                    {/* Matched Reasons Bullets */}
                    <div className="space-y-1.5 text-xs">
                      <span className="font-semibold text-slate-700 block text-[11px] uppercase tracking-wider">
                        Why You Match:
                      </span>
                      {match.matchedReasons.slice(0, 2).map((reason, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-slate-600 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{reason}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        id={`ai-explanation-btn-${scholarship.id}`}
                        onClick={() => setSelectedMatchExplanation({ scholarship, result: match })}
                        className="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                        AI Explanation
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSaveToTracker(scholarship)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                            isSaved
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {isSaved ? 'Saved' : 'Track'}
                        </button>

                        <button
                          onClick={() => onSelectScholarship(scholarship)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          View
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* AI EXPLANATION MODAL */}
      {selectedMatchExplanation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase text-purple-600 tracking-wider">
                    Gemini AI Qualification Breakdown
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    {selectedMatchExplanation.scholarship.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedMatchExplanation(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                ✕
              </button>
            </div>

            {/* Score & Competitiveness */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                <span className="text-xs text-emerald-800 font-semibold block">Match Score</span>
                <span className="text-3xl font-extrabold text-emerald-700">
                  {selectedMatchExplanation.result.score}%
                </span>
              </div>
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
                <span className="text-xs text-blue-800 font-semibold block">Competitiveness</span>
                <span className="text-sm font-bold text-blue-900">
                  {selectedMatchExplanation.result.estimatedCompetitiveness}
                </span>
              </div>
            </div>

            {/* Key Strengths */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Why You Qualify (Strengths)
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                {selectedMatchExplanation.result.matchedReasons.map((reason, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Missing Qualifications */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> Missing Items / Gap Analysis
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 bg-amber-50/50 p-3.5 rounded-2xl border border-amber-200">
                {selectedMatchExplanation.result.missingQualifications.map((gap, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actionable Tips */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> Strategic Tips to Maximize Selection
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 bg-purple-50/50 p-3.5 rounded-2xl border border-purple-200">
                {selectedMatchExplanation.result.actionableTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setSelectedMatchExplanation(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onSaveToTracker(selectedMatchExplanation.scholarship);
                  setSelectedMatchExplanation(null);
                }}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 cursor-pointer"
              >
                Save & Track Application
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
