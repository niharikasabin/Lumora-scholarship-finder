import React, { useState } from 'react';
import { Scholarship, ProviderType } from '../types';
import { 
  Building2, 
  Plus, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Download, 
  BarChart3, 
  Search, 
  Award,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface UniversityPortalProps {
  scholarships: Scholarship[];
  onAddScholarship: (scholarship: Scholarship) => void;
}

export const UniversityPortal: React.FC<UniversityPortalProps> = ({
  scholarships,
  onAddScholarship,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newOrg, setNewOrg] = useState('Global Tech Foundation');
  const [newAmount, setNewAmount] = useState('25000');
  const [newDeadline, setNewDeadline] = useState('2026-11-30');
  const [newDesc, setNewDesc] = useState('');

  // Sample Applicants
  const [applicants, setApplicants] = useState([
    { id: 'app-1', name: 'Aria Chen', degree: 'Postgraduate (M.Sc CS)', gpa: '3.92', score: 96, status: 'Shortlisted' },
    { id: 'app-2', name: 'David Osei', degree: 'Postgraduate (MBA)', gpa: '3.85', score: 91, status: 'Under Review' },
    { id: 'app-3', name: 'Priya Sharma', degree: 'PhD (Biotechnology)', gpa: '3.88', score: 94, status: 'Shortlisted' },
    { id: 'app-4', name: 'Alex Mercer', degree: 'Undergraduate (B.S.)', gpa: '3.80', score: 85, status: 'Under Review' },
  ]);

  const handleCreateGrant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newGrant: Scholarship = {
      id: 'sch-' + Date.now(),
      title: newTitle.trim(),
      organization: newOrg.trim(),
      providerType: 'University',
      logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=120&h=120&q=80',
      coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      amount: parseInt(newAmount) || 25000,
      amountDisplay: `$${parseInt(newAmount).toLocaleString()} USD`,
      currency: 'USD',
      fundingType: 'Full Ride',
      degreeLevels: ['Postgraduate', 'PhD'],
      targetFields: ['STEM', 'Computer Science', 'Business'],
      eligibleCountries: ['Global'],
      studyLocations: ['United States', 'Europe'],
      citizenshipReqs: 'Open to all international candidates',
      minGpa: 3.5,
      deadline: newDeadline,
      description: newDesc.trim() || 'University fellowship grant for high-performing graduate scholars.',
      coverageDetails: ['Full Tuition Waiver', 'Monthly Stipend', 'Health Insurance'],
      requiredDocs: ['Statement of Purpose', 'Transcripts', '2 Recommendations'],
      acceptanceRate: '4.0%',
      applicationUrl: 'https://university.edu',
      tags: ['University Award', 'Graduate']
    };

    onAddScholarship(newGrant);
    setShowAddForm(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span>University & Grantor Enterprise Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Post & Manage Financial Aid Opportunities
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Publish global scholarships, review AI applicant match scores, streamline candidate shortlist approvals, and export compliance reports.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/25 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Scholarship</span>
            </button>
          </div>
        </div>
      </div>

      {/* ADD NEW SCHOLARSHIP FORM */}
      {showAddForm && (
        <form onSubmit={handleCreateGrant} className="bg-white p-6 rounded-3xl border border-blue-200 shadow-md space-y-4 text-xs animate-fade-in">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Post New Scholarship Program</h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="grant-title-input" className="block font-semibold text-slate-700 mb-1">Scholarship Title</label>
              <input
                id="grant-title-input"
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Global Tech Excellence Fellowship"
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label htmlFor="grant-org-input" className="block font-semibold text-slate-700 mb-1">Institution / Organization Name</label>
              <input
                id="grant-org-input"
                type="text"
                required
                value={newOrg}
                onChange={(e) => setNewOrg(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label htmlFor="grant-amount-input" className="block font-semibold text-slate-700 mb-1">Award Amount ($ USD)</label>
              <input
                id="grant-amount-input"
                type="number"
                required
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label htmlFor="grant-deadline-input" className="block font-semibold text-slate-700 mb-1">Application Deadline</label>
              <input
                id="grant-deadline-input"
                type="date"
                required
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="grant-desc-textarea" className="block font-semibold text-slate-700 mb-1">Description & Criteria</label>
              <input
                id="grant-desc-textarea"
                type="text"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Briefly describe coverage, eligibility criteria, and benefits..."
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 focus:border-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer shadow-md"
            >
              Publish Opportunity
            </button>
          </div>
        </form>
      )}

      {/* APPLICANT REVIEW MANAGEMENT TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Incoming Candidate Applications</h3>
            <p className="text-xs text-slate-500">Ranked by Lumora Gemini AI Eligibility Score</p>
          </div>

          <button
            onClick={() => alert('Exported candidate CSV report!')}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Candidate Report</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="p-3">Candidate Name</th>
                <th className="p-3">Degree & Major</th>
                <th className="p-3">GPA</th>
                <th className="p-3">AI Match Score</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {applicants.map((cand) => (
                <tr key={cand.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{cand.name}</td>
                  <td className="p-3 text-slate-600">{cand.degree}</td>
                  <td className="p-3 text-emerald-600 font-bold">{cand.gpa}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[11px]">
                      {cand.score}% Match
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      cand.status === 'Shortlisted' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {cand.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => {
                        setApplicants(applicants.map(a => a.id === cand.id ? { ...a, status: 'Shortlisted' } : a));
                      }}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] cursor-pointer"
                    >
                      Shortlist
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
