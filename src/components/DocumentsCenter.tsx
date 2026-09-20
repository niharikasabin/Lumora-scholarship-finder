import React, { useState } from 'react';
import { DocumentItem, StudentProfile } from '../types';
import { 
  FolderCheck, 
  Upload, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  FileCheck,
  Bot,
  UserCheck,
  Download,
  Trash2,
  FileSpreadsheet
} from 'lucide-react';

interface DocumentsCenterProps {
  documents: DocumentItem[];
  onAddDocument: (doc: DocumentItem) => void;
  onRemoveDocument: (id: string) => void;
  profile: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
}

export const DocumentsCenter: React.FC<DocumentsCenterProps> = ({
  documents,
  onAddDocument,
  onRemoveDocument,
  profile,
  onUpdateProfile,
}) => {
  const [selectedDocId, setSelectedDocId] = useState<string>(documents[0]?.id || '');
  const [isExtracting, setIsExtracting] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [resumeText, setResumeText] = useState(
    `EXPERIENCE: Research Assistant, University Robotics Lab. Conducted deep learning experiments using PyTorch for autonomous perception. GPA: ${profile.gpa}. SKILLS: Python, Machine Learning, Data Structures, Grant Writing.`
  );

  const selectedDoc = documents.find((d) => d.id === selectedDocId);

  // Handle uploading simulated document file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newDoc: DocumentItem = {
      id: 'doc-' + Date.now(),
      name: file.name,
      type: file.name.toLowerCase().includes('resume') ? 'Resume' : 'Transcript',
      uploadDate: new Date().toISOString().split('T')[0],
      size: `${(file.size / 1024).toFixed(1)} KB`
    };

    onAddDocument(newDoc);
    setSelectedDocId(newDoc.id);
  };

  // Run Document Info Extraction
  const handleExtractInfo = async () => {
    setIsExtracting(true);
    try {
      const res = await fetch('/api/ai/document-extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          textContent: resumeText,
          filename: selectedDoc?.name || 'Academic Credential'
        })
      });
      const data = await res.json();
      if (data.extractedData) {
        // Auto update profile with extracted data
        onUpdateProfile({
          ...profile,
          gpa: parseFloat(data.extractedData.detectedGpa) || profile.gpa,
          skills: [...new Set([...profile.skills, ...(data.extractedData.skillsExtracted || [])])]
        });

        if (selectedDoc) {
          selectedDoc.extractedData = data.extractedData;
        }
      }
    } catch (err) {
      console.error('Extract error:', err);
    } finally {
      setIsExtracting(false);
    }
  };

  // Run Resume Review
  const handleReviewResume = async () => {
    setIsReviewing(true);
    try {
      const res = await fetch('/api/ai/resume-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: resumeText,
          studentProfile: profile
        })
      });
      const data = await res.json();
      if (data.review && selectedDoc) {
        selectedDoc.resumeReview = data.review;
      }
    } catch (err) {
      console.error('Resume review error:', err);
    } finally {
      setIsReviewing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
              <span>Document OCR & ATS Resume Review Agent</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Documents Center & Resume Optimizer
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Upload transcripts, passports, and CVs. Lumora AI automatically extracts qualifications and audits your resume for scholarship ATS compatibility.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/25 cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>Upload Credentials</span>
              <input type="file" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Document Manager, Right AI Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Document List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-bold text-slate-900 text-sm">Uploaded Credentials ({documents.length})</span>
              <span className="text-xs text-slate-400 font-medium">Encrypted Storage</span>
            </div>

            <div className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedDocId === doc.id
                      ? 'bg-emerald-50/80 border-emerald-300 shadow-xs'
                      : 'bg-slate-50 border-slate-100 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700">
                      <FileText className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs truncate max-w-[160px]">{doc.name}</h4>
                      <span className="text-[10px] text-slate-500">{doc.type} • {doc.size}</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveDocument(doc.id);
                    }}
                    className="p-1 hover:text-rose-600 text-slate-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Text Content Input for Analysis */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3 text-xs">
            <span className="font-bold text-slate-900 block">Resume / Transcript Text Content</span>
            <textarea
              id="resume-text-textarea"
              rows={6}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full p-3 rounded-2xl border border-slate-200 text-slate-900 focus:border-emerald-500 focus:outline-hidden"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleExtractInfo}
                disabled={isExtracting}
                className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer transition-colors flex items-center justify-center gap-1.5"
              >
                {isExtracting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>Auto-Extract Profile Info</span>
              </button>

              <button
                onClick={handleReviewResume}
                disabled={isReviewing}
                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer transition-colors flex items-center justify-center gap-1.5"
              >
                {isReviewing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <FileCheck className="w-3.5 h-3.5" />}
                <span>Run ATS Audit</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Extraction & Resume Review Output */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Extracted Profile Info */}
          {selectedDoc?.extractedData && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <UserCheck className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm">AI Extracted Candidate Qualifications</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block">Candidate Name</span>
                  <span className="font-bold text-slate-900">{selectedDoc.extractedData.candidateName}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block">Detected GPA</span>
                  <span className="font-bold text-emerald-600">{selectedDoc.extractedData.detectedGpa}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block">Degree Level</span>
                  <span className="font-bold text-slate-900">{selectedDoc.extractedData.detectedDegree}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block">Major</span>
                  <span className="font-bold text-slate-900">{selectedDoc.extractedData.detectedMajor}</span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <span className="font-semibold text-slate-700">Skills Extracted:</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedDoc.extractedData.skillsExtracted?.map((skill, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px] border border-blue-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Resume Review Report */}
          {selectedDoc?.resumeReview && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-slate-900 text-sm">ATS Compatibility & Scholarship Audit</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                  ATS Score: {selectedDoc.resumeReview.atsScore}/100
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs text-center">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block">Formatting</span>
                  <span className="font-extrabold text-blue-600 text-base">{selectedDoc.resumeReview.formattingScore}%</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block">Keywords</span>
                  <span className="font-extrabold text-purple-600 text-base">{selectedDoc.resumeReview.keywordScore}%</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block">Impact</span>
                  <span className="font-extrabold text-emerald-600 text-base">{selectedDoc.resumeReview.impactScore}%</span>
                </div>
              </div>

              {/* Actionable Improvements */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-900 uppercase tracking-wider block text-[11px] text-amber-700">
                  Recommended Bullet-Point Fixes
                </span>
                <ul className="space-y-1 bg-amber-50/50 p-3.5 rounded-2xl border border-amber-200 text-slate-700">
                  {selectedDoc.resumeReview.improvements.map((imp, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Missing Keywords */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-900 uppercase tracking-wider block text-[11px] text-indigo-700">
                  Suggested High-Value Keywords to Add
                </span>
                <div className="flex flex-wrap gap-1.5 bg-indigo-50/50 p-3 rounded-2xl border border-indigo-200">
                  {selectedDoc.resumeReview.missingKeywords.map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full bg-white text-indigo-800 font-bold text-[11px] border border-indigo-200">
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
