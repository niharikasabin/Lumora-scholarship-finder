import React, { useEffect, useState } from 'react';
import { Scholarship, StudentProfile, PrepRoadmap } from '../types';
import { 
  Sparkles, 
  X, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  RefreshCw, 
  MapPin, 
  BookOpen, 
  MessageSquareQuote,
  Target
} from 'lucide-react';

interface PrepRoadmapModalProps {
  scholarship: Scholarship | null;
  profile: StudentProfile;
  onClose: () => void;
}

export const PrepRoadmapModal: React.FC<PrepRoadmapModalProps> = ({
  scholarship,
  profile,
  onClose,
}) => {
  const [roadmap, setRoadmap] = useState<PrepRoadmap | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (scholarship) {
      fetchRoadmap();
    }
  }, [scholarship]);

  const fetchRoadmap = async () => {
    if (!scholarship) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scholarshipTitle: scholarship.title,
          deadline: scholarship.deadline,
          studentProfile: profile
        })
      });
      const data = await res.json();
      if (data.roadmap) {
        setRoadmap(data.roadmap);
      }
    } catch (err) {
      console.error('Roadmap error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!scholarship) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase text-purple-600 tracking-wider">
                Gemini AI Timeline Strategy
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Prep Roadmap: {scholarship.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-12 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-purple-600 animate-spin mx-auto" />
            <p className="text-xs text-slate-500 font-medium">Generating week-by-week preparation milestones...</p>
          </div>
        )}

        {/* Roadmap Display */}
        {!isLoading && roadmap && (
          <div className="space-y-6 text-xs animate-fade-in">
            
            {/* Timeline Milestones */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-purple-700 flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> Customized Preparation Schedule
              </h3>

              <div className="space-y-3 border-l-2 border-purple-200 pl-4 ml-2">
                {roadmap.weeks.map((w, idx) => (
                  <div key={idx} className="relative space-y-1">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-purple-600 ring-4 ring-purple-100" />
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-purple-900 text-xs">{w.weekName}</span>
                      <span className="text-[10px] text-slate-400 font-medium">Phase {idx + 1}</span>
                    </div>
                    <ul className="space-y-1 text-slate-600 pt-0.5">
                      {w.tasks.map((task, tidx) => (
                        <li key={tidx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation Letter Strategy */}
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 space-y-2">
              <h4 className="font-bold text-blue-900 text-xs flex items-center gap-1.5">
                <MessageSquareQuote className="w-4 h-4 text-blue-600" /> Recommendation Letter Strategy
              </h4>
              <p className="text-slate-700 leading-relaxed">
                {roadmap.recommendationStrategy}
              </p>
            </div>

            {/* Interview Prep Focus */}
            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 space-y-2">
              <h4 className="font-bold text-purple-900 text-xs flex items-center gap-1.5">
                <Target className="w-4 h-4 text-purple-600" /> Key Interview Focus Areas
              </h4>
              <p className="text-slate-700 leading-relaxed">
                {roadmap.interviewPrepFocus}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold cursor-pointer hover:bg-slate-800"
              >
                Close Roadmap
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
