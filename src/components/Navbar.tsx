import React from 'react';
import { 
  Sparkles, 
  Search, 
  Kanban, 
  FileText, 
  FolderCheck, 
  Building2, 
  ShieldCheck, 
  User, 
  GraduationCap,
  Bell,
  Zap,
  Globe
} from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  savedCount: number;
  profileCompletion: number;
  onOpenChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  savedCount,
  profileCompletion,
  onOpenChat,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => {
              setUserRole('student');
              setActiveTab('landing');
            }}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
            id="brand-logo-btn"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 bg-clip-text text-transparent">
                Lumora
              </span>
              <span className="text-[10px] uppercase font-semibold text-blue-600 tracking-wider block -mt-1">
                AI Scholarship Agent
              </span>
            </div>
          </button>

          {/* Navigation Links (Student View) */}
          {userRole === 'student' && (
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 p-1 rounded-xl text-sm font-medium">
              <button
                id="nav-search-btn"
                onClick={() => setActiveTab('search')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                  activeTab === 'search'
                    ? 'bg-white text-blue-600 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Search className="w-4 h-4" />
                Find Scholarships
              </button>

              <button
                id="nav-match-btn"
                onClick={() => setActiveTab('match')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                  activeTab === 'match'
                    ? 'bg-white text-blue-600 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Zap className="w-4 h-4 text-purple-600" />
                AI Match Engine
              </button>

              <button
                id="nav-dashboard-btn"
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-white text-blue-600 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                Dashboard
              </button>

              <button
                id="nav-tracker-btn"
                onClick={() => setActiveTab('tracker')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                  activeTab === 'tracker'
                    ? 'bg-white text-blue-600 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Kanban className="w-4 h-4" />
                Applications
                {savedCount > 0 && (
                  <span className="bg-blue-100 text-blue-700 text-xs px-1.5 py-0.5 rounded-full font-bold">
                    {savedCount}
                  </span>
                )}
              </button>

              <button
                id="nav-essays-btn"
                onClick={() => setActiveTab('essays')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                  activeTab === 'essays'
                    ? 'bg-white text-blue-600 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <FileText className="w-4 h-4" />
                AI Essay Studio
              </button>

              <button
                id="nav-docs-btn"
                onClick={() => setActiveTab('docs')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                  activeTab === 'docs'
                    ? 'bg-white text-blue-600 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <FolderCheck className="w-4 h-4" />
                Documents & Resume
              </button>
            </nav>
          )}
        </div>

        {/* Right Side Tools & Role Switcher */}
        <div className="flex items-center gap-3">
          
          {/* AI Floating Chat Quick Launcher */}
          <button
            id="open-ai-assistant-btn"
            onClick={onOpenChat}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 text-blue-700 hover:bg-blue-100/80 transition-colors cursor-pointer shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden sm:inline">Lumora AI Assistant</span>
          </button>

          {/* Role Switcher Selector */}
          <div className="relative flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs">
            <label htmlFor="role-select" className="sr-only">Select Role</label>
            <select
              id="role-select"
              value={userRole}
              onChange={(e) => {
                const newRole = e.target.value as UserRole;
                setUserRole(newRole);
                if (newRole === 'university') setActiveTab('university');
                else if (newRole === 'admin') setActiveTab('admin');
                else if (activeTab === 'university' || activeTab === 'admin') setActiveTab('dashboard');
              }}
              className="bg-transparent text-slate-700 font-medium px-2.5 py-1 rounded-lg focus:outline-hidden cursor-pointer"
            >
              <option value="student">🎓 Student View</option>
              <option value="university">🏛️ University / Grantor</option>
              <option value="admin">⚙️ Admin Console</option>
            </select>
          </div>

          {/* Profile Badge (Student) */}
          {userRole === 'student' && (
            <button
              id="nav-profile-chip"
              onClick={() => setActiveTab('match')}
              className="hidden md:flex items-center gap-2 bg-slate-50 hover:bg-slate-100 p-1.5 pr-3 rounded-full border border-slate-200 text-xs cursor-pointer transition-colors"
              title="Click to update academic profile"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[11px]">
                {profileCompletion}%
              </div>
              <span className="font-semibold text-slate-700">Profile</span>
            </button>
          )}

        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      {userRole === 'student' && (
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-slate-100 bg-slate-50/90 text-xs font-medium no-scrollbar">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'search' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 bg-white border border-slate-200'}`}
          >
            Find Scholarships
          </button>
          <button
            onClick={() => setActiveTab('match')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'match' ? 'bg-purple-600 text-white font-bold' : 'text-slate-600 bg-white border border-slate-200'}`}
          >
            AI Match Engine
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 bg-white border border-slate-200'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('tracker')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'tracker' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 bg-white border border-slate-200'}`}
          >
            Applications ({savedCount})
          </button>
          <button
            onClick={() => setActiveTab('essays')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'essays' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 bg-white border border-slate-200'}`}
          >
            AI Essay Studio
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'docs' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 bg-white border border-slate-200'}`}
          >
            Documents
          </button>
        </div>
      )}
    </header>
  );
};
