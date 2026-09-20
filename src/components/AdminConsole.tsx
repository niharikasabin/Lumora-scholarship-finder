import React, { useState } from 'react';
import { Scholarship } from '../types';
import { 
  ShieldCheck, 
  BarChart3, 
  Users, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Activity, 
  RefreshCw,
  Search,
  Filter,
  Check,
  Zap,
  Cpu
} from 'lucide-react';

interface AdminConsoleProps {
  scholarships: Scholarship[];
  onApproveScholarship?: (id: string) => void;
  onToggleFeatured?: (id: string) => void;
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({
  scholarships,
  onApproveScholarship,
  onToggleFeatured,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'grants' | 'ai_status'>('overview');
  const [featuredIds, setFeaturedIds] = useState<string[]>(
    scholarships.filter(s => s.featured).map(s => s.id)
  );

  const toggleFeatured = (id: string) => {
    if (featuredIds.includes(id)) {
      setFeaturedIds(featuredIds.filter(i => i !== id));
    } else {
      setFeaturedIds([...featuredIds, id]);
    }
    if (onToggleFeatured) onToggleFeatured(id);
  };

  const filteredScholarships = scholarships.filter(s =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Lumora System Administrator Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Platform Governance & AI Health Center
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Monitor real-time Gemini AI agent operations, verify university grant submissions, configure featured listings, and analyze student matching telemetry.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              Gemini 3.6 Flash Active
            </div>
          </div>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'overview'
              ? 'border-purple-600 text-purple-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Analytics Overview
        </button>

        <button
          onClick={() => setActiveTab('grants')}
          className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'grants'
              ? 'border-purple-600 text-purple-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          Scholarship Directory ({scholarships.length})
        </button>

        <button
          onClick={() => setActiveTab('ai_status')}
          className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'ai_status'
              ? 'border-purple-600 text-purple-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Cpu className="w-4 h-4" />
          AI Telemetry & Logs
        </button>
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Opportunities</span>
              <div className="text-3xl font-extrabold text-slate-900">{scholarships.length}</div>
              <p className="text-xs text-emerald-600 font-medium">+12 added this week</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total AI Match Calls</span>
              <div className="text-3xl font-extrabold text-purple-600">14,890</div>
              <p className="text-xs text-purple-600 font-medium">99.4% Gemini success rate</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Student Applications</span>
              <div className="text-3xl font-extrabold text-blue-600">3,420</div>
              <p className="text-xs text-blue-600 font-medium">Across 142 partner universities</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Funding Tracked</span>
              <div className="text-3xl font-extrabold text-emerald-600">$18.5M</div>
              <p className="text-xs text-slate-500 font-medium">Global financial aid value</p>
            </div>
          </div>

          {/* Activity Logs & Quick Moderation */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-600" />
              Real-Time AI & System Log Stream
            </h3>

            <div className="space-y-3 text-xs font-mono bg-slate-950 text-slate-300 p-4 rounded-2xl max-h-64 overflow-y-auto border border-slate-800">
              <div className="flex items-center justify-between text-emerald-400">
                <span>[INFO] 2026-08-04 09:22:10 UTC - Agent 1 (Eligibility): Successfully scored 15 scholarships for profile Aria_Chen</span>
                <span>200 OK</span>
              </div>
              <div className="flex items-center justify-between text-blue-400">
                <span>[INFO] 2026-08-04 09:18:42 UTC - Agent 2 (Essay Audit): Completed SOP storytelling analysis (Score: 88/100)</span>
                <span>200 OK</span>
              </div>
              <div className="flex items-center justify-between text-purple-400">
                <span>[INFO] 2026-08-04 09:15:00 UTC - University Portal: New scholarship 'Oxford AI Fellowship' published by Oxford Trustee</span>
                <span>CREATED</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>[INFO] 2026-08-04 09:02:11 UTC - Gemini API model check: gemini-3.6-flash latency 340ms</span>
                <span>HEALTHY</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SCHOLARSHIP MANAGEMENT */}
      {activeTab === 'grants' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Manage & Moderate Opportunities</h3>
              <p className="text-xs text-slate-500">Toggle featured status and review university postings.</p>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search scholarships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:outline-hidden w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3">Scholarship</th>
                  <th className="p-3">Organization</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Deadline</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredScholarships.map((s) => {
                  const isFeatured = featuredIds.includes(s.id);
                  return (
                    <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-bold text-slate-900">{s.title}</td>
                      <td className="p-3 text-slate-600">{s.organization}</td>
                      <td className="p-3 font-semibold text-emerald-600">{s.amountDisplay}</td>
                      <td className="p-3 text-slate-500">{s.deadline}</td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                          Active & Verified
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => toggleFeatured(s.id)}
                          className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                            isFeatured
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {isFeatured ? '★ Featured' : '☆ Feature'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: AI TELEMETRY */}
      {activeTab === 'ai_status' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            Gemini AI Infrastructure Status
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 space-y-2">
              <span className="text-xs font-bold text-purple-800 uppercase tracking-wider block">Primary Engine</span>
              <div className="text-xl font-bold text-purple-950">gemini-3.6-flash</div>
              <p className="text-xs text-purple-700">Configured via @google/genai SDK</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">Heuristic Fallback</span>
              <div className="text-xl font-bold text-emerald-950">Enabled & Operational</div>
              <p className="text-xs text-emerald-700">Triggers automatically if API key is absent</p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block">Server Architecture</span>
              <div className="text-xl font-bold text-blue-950">Full-Stack Express proxy</div>
              <p className="text-xs text-blue-700">Port 3000 • ESM TypeScript bundle</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
