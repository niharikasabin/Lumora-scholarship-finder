import React, { useState, useMemo } from 'react';
import { Scholarship, DegreeLevel, FundingType, ProviderType } from '../types';
import { 
  Search, 
  Filter, 
  Calendar, 
  DollarSign, 
  Globe, 
  GraduationCap, 
  ExternalLink, 
  Bookmark, 
  Sparkles, 
  X, 
  FileCheck,
  Building2,
  ChevronRight,
  Zap,
  Clock,
  Check
} from 'lucide-react';

interface ScholarshipSearchProps {
  scholarships: Scholarship[];
  savedIds: string[];
  onSaveToTracker: (scholarship: Scholarship) => void;
  onSelectScholarship: (scholarship: Scholarship) => void;
  onGenerateRoadmap: (scholarship: Scholarship) => void;
}

export const ScholarshipSearch: React.FC<ScholarshipSearchProps> = ({
  scholarships,
  savedIds,
  onSaveToTracker,
  onSelectScholarship,
  onGenerateRoadmap,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDegree, setSelectedDegree] = useState<string>('All');
  const [selectedFunding, setSelectedFunding] = useState<string>('All');
  const [selectedProvider, setSelectedProvider] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [detailModal, setDetailModal] = useState<Scholarship | null>(null);

  // Filter scholarships
  const filteredScholarships = useMemo(() => {
    return scholarships.filter((s) => {
      // Search term
      if (
        searchTerm &&
        !s.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !s.organization.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !s.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !s.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
      ) {
        return false;
      }

      // Degree filter
      if (selectedDegree !== 'All' && !s.degreeLevels.includes(selectedDegree as DegreeLevel)) {
        return false;
      }

      // Funding filter
      if (selectedFunding !== 'All' && s.fundingType !== selectedFunding) {
        return false;
      }

      // Provider filter
      if (selectedProvider !== 'All' && s.providerType !== selectedProvider) {
        return false;
      }

      // Location filter
      if (selectedLocation !== 'All' && !s.studyLocations.includes(selectedLocation)) {
        return false;
      }

      return true;
    });
  }, [scholarships, searchTerm, selectedDegree, selectedFunding, selectedProvider, selectedLocation]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Title & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Global Scholarship & Grant Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore 50,000+ verified grants, fellowships, and government schemes.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Showing <strong className="text-slate-900">{filteredScholarships.length}</strong> of {scholarships.length} opportunities</span>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            id="scholarship-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by keyword, university (e.g. Oxford, Stanford), field (e.g. STEM, AI), or scheme (e.g. Fulbright)..."
            className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border border-slate-200 text-sm text-slate-900 focus:border-blue-500 focus:outline-hidden shadow-2xs"
          />
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          
          {/* Degree Filter */}
          <div>
            <label htmlFor="filter-degree" className="sr-only">Degree Level</label>
            <select
              id="filter-degree"
              value={selectedDegree}
              onChange={(e) => setSelectedDegree(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-700 font-medium focus:border-blue-500 focus:outline-hidden"
            >
              <option value="All">🎓 All Degrees</option>
              <option value="High School">High School</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="PhD">PhD / Doctorate</option>
            </select>
          </div>

          {/* Funding Type Filter */}
          <div>
            <label htmlFor="filter-funding" className="sr-only">Funding Type</label>
            <select
              id="filter-funding"
              value={selectedFunding}
              onChange={(e) => setSelectedFunding(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-700 font-medium focus:border-blue-500 focus:outline-hidden"
            >
              <option value="All">💰 All Funding Types</option>
              <option value="Full Ride">Full Ride</option>
              <option value="Tuition">Tuition Waiver</option>
              <option value="Stipend">Living Stipend</option>
              <option value="Research Grant">Research Grant</option>
              <option value="Fellowship">Fellowship</option>
            </select>
          </div>

          {/* Provider Filter */}
          <div>
            <label htmlFor="filter-provider" className="sr-only">Provider Type</label>
            <select
              id="filter-provider"
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-700 font-medium focus:border-blue-500 focus:outline-hidden"
            >
              <option value="All">🏛️ All Providers</option>
              <option value="Government">Government Scheme</option>
              <option value="University">University Award</option>
              <option value="Private">Private / Corporate</option>
              <option value="NonProfit">Non-Profit / Foundation</option>
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label htmlFor="filter-location" className="sr-only">Study Location</label>
            <select
              id="filter-location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-700 font-medium focus:border-blue-500 focus:outline-hidden"
            >
              <option value="All">🌍 All Study Locations</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Germany">Germany</option>
              <option value="Canada">Canada</option>
              <option value="Japan">Japan</option>
              <option value="Switzerland">Switzerland</option>
            </select>
          </div>

        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScholarships.map((scholarship) => {
          const isSaved = savedIds.includes(scholarship.id);

          return (
            <div
              key={scholarship.id}
              className="bg-white rounded-3xl border border-slate-200/80 hover:border-blue-400 hover:shadow-xl transition-all p-6 flex flex-col justify-between space-y-4 group relative"
            >
              {/* Top Banner Image or Logo */}
              <div className="space-y-3">
                <div className="relative h-36 rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={scholarship.coverImage}
                    alt={scholarship.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md p-1.5 rounded-xl border border-white/50 shadow-xs">
                    <img
                      src={scholarship.logo}
                      alt={scholarship.organization}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
                    <span className="px-2.5 py-1 rounded-full bg-blue-600/90 backdrop-blur-md">
                      {scholarship.fundingType}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-200 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      Deadline: {scholarship.deadline}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase text-blue-600 tracking-wider">
                    {scholarship.providerType} • {scholarship.studyLocations.join(', ')}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors line-clamp-2 mt-0.5">
                    {scholarship.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {scholarship.organization}
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Award Value:</span>
                    <span className="font-extrabold text-emerald-600">{scholarship.amountDisplay}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Acceptance Rate:</span>
                    <span className="font-bold text-slate-700">{scholarship.acceptanceRate}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {scholarship.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSaveToTracker(scholarship)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSaved
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isSaved ? 'Tracked' : 'Save'}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onGenerateRoadmap(scholarship)}
                    className="px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Roadmap
                  </button>

                  <button
                    onClick={() => setDetailModal(scholarship)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Details
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* SCHOLARSHIP DETAIL MODAL */}
      {detailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={detailModal.logo}
                  alt={detailModal.organization}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <span className="text-xs font-bold uppercase text-blue-600 tracking-wider">
                    {detailModal.providerType} Grant
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    {detailModal.title}
                  </h2>
                  <p className="text-xs text-slate-500">{detailModal.organization}</p>
                </div>
              </div>
              <button
                onClick={() => setDetailModal(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Coverage Highlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                <span className="text-slate-500 font-semibold block">Award Amount</span>
                <span className="text-base font-extrabold text-emerald-700">{detailModal.amountDisplay}</span>
              </div>
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
                <span className="text-slate-500 font-semibold block">Application Deadline</span>
                <span className="text-base font-extrabold text-blue-800">{detailModal.deadline}</span>
              </div>
              <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200">
                <span className="text-slate-500 font-semibold block">Acceptance Rate</span>
                <span className="text-base font-extrabold text-purple-800">{detailModal.acceptanceRate}</span>
              </div>
            </div>

            {/* Overview Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Program Overview</h3>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {detailModal.description}
              </p>
            </div>

            {/* Coverage Items */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">What's Included (Coverage Details)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {detailModal.coverageDetails.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Documents Checklist */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Required Document Checklist</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {detailModal.requiredDocs.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <Check className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  onGenerateRoadmap(detailModal);
                  setDetailModal(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                Generate AI Prep Roadmap
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    onSaveToTracker(detailModal);
                    setDetailModal(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer"
                >
                  Save to Application Kanban
                </button>

                <a
                  href={detailModal.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
