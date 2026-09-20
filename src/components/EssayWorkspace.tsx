import React, { useState } from 'react';
import { EssayDocument, Scholarship, StudentProfile, EssayFeedback } from '../types';
import { 
  FileText, 
  Sparkles, 
  Bot, 
  CheckCircle2, 
  RefreshCw, 
  Globe, 
  Zap, 
  Copy, 
  Check, 
  Wand2, 
  Award, 
  TrendingUp,
  Sliders,
  History,
  Download
} from 'lucide-react';

interface EssayWorkspaceProps {
  scholarships: Scholarship[];
  profile: StudentProfile;
}

export const EssayWorkspace: React.FC<EssayWorkspaceProps> = ({ scholarships, profile }) => {
  const [selectedScholarshipId, setSelectedScholarshipId] = useState<string>(scholarships[0]?.id || '');
  const [essayType, setEssayType] = useState<EssayDocument['type']>('Statement of Purpose');
  const [targetWordLimit, setTargetWordLimit] = useState<number>(500);
  const [content, setContent] = useState<string>(
    `I am writing to express my eager candidacy for this prestigious fellowship. Having completed my undergraduate degree in Computer Science with a GPA of ${profile.gpa}, my research has focused on artificial intelligence applications in climate modeling.

Through this opportunity, I aim to combine technical rigor with global leadership to drive impactful solutions...`
  );

  const [feedback, setFeedback] = useState<EssayFeedback | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('German');
  const [translatedText, setTranslatedText] = useState('');
  const [copied, setCopied] = useState(false);

  const currentScholarship = scholarships.find((s) => s.id === selectedScholarshipId);

  // Calculate current word count
  const wordCount = content.split(/\s+/).filter(Boolean).length;

  // 1. AI Generate Draft
  const handleGenerateDraft = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/essay-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: essayType,
          studentProfile: profile,
          scholarshipTitle: currentScholarship?.title || 'Scholarship',
          wordLimit: targetWordLimit
        })
      });
      const data = await res.json();
      if (data.content) {
        setContent(data.content);
      }
    } catch (err) {
      console.error('Error generating essay:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // 2. AI Essay Audit & Score
  const handleReviewEssay = async () => {
    setIsReviewing(true);
    try {
      const res = await fetch('/api/ai/essay-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          essayContent: content,
          scholarshipTitle: currentScholarship?.title,
          promptRequirements: `Standard ${essayType} for ${currentScholarship?.organization}`,
          targetWordLimit: targetWordLimit
        })
      });
      const data = await res.json();
      if (data.feedback) {
        setFeedback(data.feedback);
      }
    } catch (err) {
      console.error('Error reviewing essay:', err);
    } finally {
      setIsReviewing(false);
    }
  };

  // 3. AI Translation
  const handleTranslate = async () => {
    setIsTranslating(true);
    try {
      const res = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: content,
          targetLanguage: targetLanguage
        })
      });
      const data = await res.json();
      if (data.translatedText) {
        setTranslatedText(data.translatedText);
      }
    } catch (err) {
      console.error('Error translating:', err);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold">
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              <span>Agents 2 & 4: Essay Generator & Quality Auditor</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Essay Studio & Statement Polish
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Craft compelling Statements of Purpose, evaluate storytelling and scholarship alignment, and generate polished revisions with Gemini AI.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="essay-generate-draft-btn"
              onClick={handleGenerateDraft}
              disabled={isGenerating}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              <span>Draft with AI</span>
            </button>

            <button
              id="essay-review-audit-btn"
              onClick={handleReviewEssay}
              disabled={isReviewing}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/25 cursor-pointer disabled:opacity-50"
            >
              {isReviewing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Review & Score Essay</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control Bar: Scholarship Target & Document Type */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        
        {/* Scholarship Target */}
        <div>
          <label htmlFor="target-scholarship-select" className="block font-semibold text-slate-700 mb-1">Target Scholarship Program</label>
          <select
            id="target-scholarship-select"
            value={selectedScholarshipId}
            onChange={(e) => setSelectedScholarshipId(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-blue-500 focus:outline-hidden bg-white"
          >
            {scholarships.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title} ({s.organization})
              </option>
            ))}
          </select>
        </div>

        {/* Essay Type */}
        <div>
          <label htmlFor="essay-type-select" className="block font-semibold text-slate-700 mb-1">Document Type</label>
          <select
            id="essay-type-select"
            value={essayType}
            onChange={(e) => setEssayType(e.target.value as any)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-blue-500 focus:outline-hidden bg-white"
          >
            <option value="Statement of Purpose">Statement of Purpose (SOP)</option>
            <option value="Personal Statement">Personal Statement</option>
            <option value="Essay">Scholarship Specific Essay</option>
            <option value="Motivation Letter">Motivation Letter</option>
          </select>
        </div>

        {/* Word Limit */}
        <div>
          <label htmlFor="word-limit-input" className="block font-semibold text-slate-700 mb-1">
            Target Word Limit: <span className="text-blue-600 font-bold">{targetWordLimit} words</span>
          </label>
          <input
            id="word-limit-input"
            type="number"
            step="50"
            value={targetWordLimit}
            onChange={(e) => setTargetWordLimit(parseInt(e.target.value) || 500)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-blue-500 focus:outline-hidden"
          />
        </div>

      </div>

      {/* Main Workspace Grid: Left Editor & Right Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Rich Text Area Editor */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-slate-900 text-sm">{essayType} Editor</span>
              </div>
              <div className="text-xs font-semibold text-slate-500">
                Word Count: <span className={wordCount > targetWordLimit ? 'text-rose-600 font-bold' : 'text-blue-600 font-bold'}>{wordCount}</span> / {targetWordLimit}
              </div>
            </div>

            <textarea
              id="essay-content-textarea"
              rows={16}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 rounded-2xl border border-slate-200 text-sm leading-relaxed text-slate-900 font-sans focus:border-purple-500 focus:outline-hidden resize-y"
              placeholder="Type or paste your application essay here..."
            />

            {/* Translation Action Row */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-600" />
                <span className="font-semibold text-slate-700">Translate to:</span>
                <select
                  id="translate-lang-select"
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-800 bg-slate-50 font-medium cursor-pointer"
                >
                  <option value="German">German</option>
                  <option value="French">French</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Mandarin">Mandarin Chinese</option>
                  <option value="Hindi">Hindi</option>
                </select>
                <button
                  onClick={handleTranslate}
                  disabled={isTranslating}
                  className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold cursor-pointer"
                >
                  {isTranslating ? 'Translating...' : 'Translate'}
                </button>
              </div>

              <button
                onClick={() => handleCopy(content)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Translation Output Drawer */}
            {translatedText && (
              <div className="mt-4 p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 text-xs space-y-2">
                <span className="font-bold text-indigo-900 block">Translated Version ({targetLanguage}):</span>
                <p className="text-slate-800 whitespace-pre-wrap leading-relaxed">{translatedText}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: AI Feedback & Polished Version */}
        <div className="lg:col-span-5 space-y-6">
          
          {!feedback && (
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 text-center space-y-4 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">No AI Essay Audit Yet</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                Click "Review & Score Essay" to trigger Gemini AI quality analysis, storytelling evaluation, and polished text suggestions.
              </p>
            </div>
          )}

          {feedback && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 space-y-6 shadow-2xs animate-fade-in">
              
              {/* Score Breakdown */}
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="font-bold text-slate-900 text-sm">Overall Essay Quality</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-sm">
                    {feedback.score} / 100
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-500 block">Grammar & Syntax</span>
                    <span className="font-bold text-blue-600">{feedback.grammarScore}%</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-500 block">Storytelling Hook</span>
                    <span className="font-bold text-purple-600">{feedback.storytellingScore}%</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-500 block">Persuasiveness</span>
                    <span className="font-bold text-emerald-600">{feedback.persuasivenessScore}%</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-500 block">Scholarship Alignment</span>
                    <span className="font-bold text-indigo-600">{feedback.alignmentScore}%</span>
                  </div>
                </div>
              </div>

              {/* Key Strengths */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-900 uppercase tracking-wider block text-[11px] text-emerald-700">
                  Key Strengths
                </span>
                <ul className="space-y-1 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 text-slate-700">
                  {feedback.keyStrengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-900 uppercase tracking-wider block text-[11px] text-amber-700">
                  Actionable Improvements
                </span>
                <ul className="space-y-1 bg-amber-50/50 p-3 rounded-xl border border-amber-100 text-slate-700">
                  {feedback.areasForImprovement.map((area, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Polished Draft Box */}
              <div className="bg-purple-50/80 p-4 rounded-2xl border border-purple-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-purple-600" /> AI Polished Revision
                  </span>
                  <button
                    onClick={() => setContent(feedback.polishedVersion)}
                    className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] transition-colors cursor-pointer"
                  >
                    Apply Revision
                  </button>
                </div>
                <p className="text-slate-800 line-clamp-6 whitespace-pre-wrap leading-relaxed italic bg-white/70 p-3 rounded-xl border border-purple-100">
                  {feedback.polishedVersion}
                </p>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
