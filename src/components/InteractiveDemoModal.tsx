import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, Bot, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface InteractiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToMatch: () => void;
}

export const InteractiveDemoModal: React.FC<InteractiveDemoModalProps> = ({
  isOpen,
  onClose,
  onNavigateToMatch,
}) => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      return;
    }

    const timer1 = setTimeout(() => setStep(1), 800);
    const timer2 = setTimeout(() => setStep(2), 2200);
    const timer3 = setTimeout(() => setStep(3), 3600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <Bot className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Lumora AI Matching Agent Live Demo</h3>
              <p className="text-xs text-slate-500">Watching AI Agent analyze profile & scan 50,000+ grants</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Simulation Stepper */}
        <div className="py-6 space-y-4">
          
          {/* Step 1: Ingesting Profile */}
          <div className={`p-4 rounded-2xl border transition-all duration-300 ${
            step >= 1 ? 'bg-blue-50/60 border-blue-200' : 'bg-slate-50 border-slate-100 opacity-60'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-600'
              }`}>
                1
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                  Academic Profile Ingestion
                  {step >= 1 && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Ingesting GPA (3.88), Major (Computer Science & AI), Target (Postgraduate in USA/UK), TOEFL (110), Financial Need Score (8/10).
                </p>
              </div>
            </div>
          </div>

          {/* Step 2: Running Eligibility Matrix */}
          <div className={`p-4 rounded-2xl border transition-all duration-300 ${
            step >= 2 ? 'bg-purple-50/60 border-purple-200' : 'bg-slate-50 border-slate-100 opacity-60'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 2 ? 'bg-purple-600 text-white' : 'bg-slate-300 text-slate-600'
              }`}>
                2
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                  Gemini AI Eligibility Matrix & Competitiveness Score
                  {step >= 2 && <Zap className="w-4 h-4 text-purple-600" />}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Evaluating acceptance criteria across Fulbright Foreign Student, Rhodes Oxford, and Google Lime.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3: Match Output */}
          <div className={`p-4 rounded-2xl border transition-all duration-300 ${
            step >= 3 ? 'bg-emerald-50/80 border-emerald-300 shadow-xs' : 'bg-slate-50 border-slate-100 opacity-60'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 3 ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-600'
              }`}>
                3
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                  High-Match Recommendations Generated!
                  {step >= 3 && <Sparkles className="w-4 h-4 text-emerald-600" />}
                </h4>
                {step >= 3 && (
                  <div className="mt-2 space-y-2 text-xs">
                    <div className="bg-white p-2.5 rounded-xl border border-emerald-200 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900">Fulbright Foreign Student Program</span>
                        <span className="text-slate-500 block text-[11px]">$60,000 / yr + Full Tuition</span>
                      </div>
                      <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                        96% Match
                      </span>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-emerald-200 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900">Google Lime & Tech Leadership</span>
                        <span className="text-slate-500 block text-[11px]">$10,000 USD Merit Grant</span>
                      </div>
                      <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-[11px]">
                        92% Match
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close Preview
          </button>
          <button
            onClick={() => {
              onClose();
              onNavigateToMatch();
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center gap-2 shadow-md shadow-blue-500/20 cursor-pointer"
          >
            <span>Run On My Profile</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
