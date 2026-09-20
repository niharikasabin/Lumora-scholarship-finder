import React from 'react';
import { StudentProfile, Scholarship, ApplicationItem } from '../types';
import { 
  GraduationCap, 
  Award, 
  Calendar, 
  FileText, 
  Kanban, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  FolderCheck,
  Zap,
  Plus
} from 'lucide-react';

interface StudentDashboardProps {
  profile: StudentProfile;
  scholarships: Scholarship[];
  applications: ApplicationItem[];
  onNavigate: (tab: string) => void;
  onSelectScholarship: (scholarship: Scholarship) => void;
  profileCompletion: number;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  profile,
  scholarships,
  applications,
  onNavigate,
  onSelectScholarship,
  profileCompletion,
}) => {
  // Compute upcoming deadlines
  const sortedDeadlines = [...scholarships]
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Welcome Back, {profile.name}!</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Student Financial Aid Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Targeting <strong className="text-slate-800">{profile.targetDegree}</strong> in <strong className="text-slate-800">{profile.targetFields.join(', ')}</strong> • Cumulative GPA: <strong className="text-emerald-600">{profile.gpa}</strong>
            </p>
          </div>

          {/* Profile Completion Card */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-lg shadow-md shadow-blue-500/20">
              {profileCompletion}%
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-900">Profile Match Strength</span>
              <p className="text-[11px] text-slate-500">
                {profileCompletion >= 80 ? 'Optimal match accuracy' : 'Add test scores & publications to boost'}
              </p>
              <button
                onClick={() => onNavigate('match')}
                className="text-[11px] font-bold text-blue-600 hover:underline block cursor-pointer"
              >
                Complete Profile →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Active Applications</span>
            <span className="text-2xl font-extrabold text-slate-900">{applications.length}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Kanban className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Available Grants</span>
            <span className="text-2xl font-extrabold text-slate-900">{scholarships.length}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Target Degree</span>
            <span className="text-base font-extrabold text-slate-900">{profile.targetDegree}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Funding Discovered</span>
            <span className="text-2xl font-extrabold text-emerald-600">$450,000+</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Quick Launchpad & Recommended Scholarships */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Recommended Scholarships */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-bold text-slate-900">Featured High-Match Scholarships</h2>
            </div>
            <button
              onClick={() => onNavigate('search')}
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              View Directory →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scholarships.slice(0, 4).map((s) => (
              <div
                key={s.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition-all space-y-3 cursor-pointer group"
                onClick={() => onSelectScholarship(s)}
              >
                <div className="flex items-start justify-between gap-3">
                  <img
                    src={s.logo}
                    alt={s.organization}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                  />
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                    {s.fundingType}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-1">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{s.organization}</p>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="font-extrabold text-emerald-600">{s.amountDisplay}</span>
                  <span className="text-slate-400 text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-500" />
                    {s.deadline}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Deadlines & AI Tools */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Upcoming Deadlines */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-sm">Upcoming Application Deadlines</h3>
            </div>

            <div className="space-y-3">
              {sortedDeadlines.map((s) => (
                <div key={s.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="font-bold text-slate-900 text-xs block truncate">{s.title}</span>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">{s.organization}</span>
                    <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      Due {s.deadline}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Quick Actions */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-3xl space-y-4 shadow-xl border border-indigo-500/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h3 className="font-bold text-white text-sm">Lumora AI Suite Quick Launch</h3>
            </div>

            <div className="space-y-2 text-xs">
              <button
                onClick={() => onNavigate('essays')}
                className="w-full p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-300" />
                  <span>Draft SOP in AI Essay Studio</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('docs')}
                className="w-full p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FolderCheck className="w-4 h-4 text-emerald-300" />
                  <span>ATS Resume Audit & Extractor</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
