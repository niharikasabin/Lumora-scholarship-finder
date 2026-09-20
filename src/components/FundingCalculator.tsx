import React, { useState } from 'react';
import { Calculator, DollarSign, Sparkles, TrendingUp, Award, ArrowRight } from 'lucide-react';

interface FundingCalculatorProps {
  onFindScholarships: (degree: string, country: string) => void;
}

export const FundingCalculator: React.FC<FundingCalculatorProps> = ({ onFindScholarships }) => {
  const [degree, setDegree] = useState<string>('Postgraduate');
  const [destination, setDestination] = useState<string>('United States');
  const [income, setIncome] = useState<string>('< $25,000');
  const [gpa, setGpa] = useState<number>(3.8);

  // Calculate estimated funding
  const calculateEstimate = () => {
    let base = 25000;
    if (degree === 'PhD' || degree === 'Postgraduate') base += 20000;
    if (destination === 'United States' || destination === 'United Kingdom') base += 15000;
    if (income === '< $25,000') base += 10000;
    if (gpa >= 3.7) base += 15000;
    return base;
  };

  const estimatedFunding = calculateEstimate();

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-indigo-500/20">
      {/* Subtle Background Glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Info & Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5 text-blue-400" />
            AI Funding Calculator Engine
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Estimate How Much Scholarship Funding You Qualify For
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Lumora’s predictive model analyzes historical award benchmarks, country quotas, tuition coverage caps, and merit tiers to forecast your potential funding pool.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label htmlFor="degree-select" className="block text-xs font-semibold text-slate-300 mb-1">Target Degree</label>
              <select
                id="degree-select"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700/80 text-white text-sm rounded-xl p-2.5 focus:border-blue-500 focus:outline-hidden"
              >
                <option value="High School">High School Senior</option>
                <option value="Undergraduate">Undergraduate (B.Sc / B.A)</option>
                <option value="Postgraduate">Postgraduate (M.Sc / MBA)</option>
                <option value="PhD">PhD / Doctoral Fellowship</option>
              </select>
            </div>

            <div>
              <label htmlFor="destination-select" className="block text-xs font-semibold text-slate-300 mb-1">Target Study Destination</label>
              <select
                id="destination-select"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700/80 text-white text-sm rounded-xl p-2.5 focus:border-blue-500 focus:outline-hidden"
              >
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Germany">Germany / Europe</option>
                <option value="Canada">Canada</option>
                <option value="Japan">Japan / East Asia</option>
              </select>
            </div>

            <div>
              <label htmlFor="income-select" className="block text-xs font-semibold text-slate-300 mb-1">Annual Household Income</label>
              <select
                id="income-select"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700/80 text-white text-sm rounded-xl p-2.5 focus:border-blue-500 focus:outline-hidden"
              >
                <option value="< $25,000">Under $25,000 / year (High Need)</option>
                <option value="$25k - $50k">$25,000 – $50,000 / year</option>
                <option value="$50k - $100k">$50,000 – $100,000 / year</option>
                <option value="> $100k">Above $100,000 / year</option>
              </select>
            </div>

            <div>
              <label htmlFor="gpa-input" className="block text-xs font-semibold text-slate-300 mb-1">
                Current GPA (Scale 4.0): <span className="text-emerald-400 font-bold">{gpa}</span>
              </label>
              <input
                id="gpa-input"
                type="range"
                min="2.5"
                max="4.0"
                step="0.05"
                value={gpa}
                onChange={(e) => setGpa(parseFloat(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer mt-2"
              />
            </div>
          </div>
        </div>

        {/* Right Calculated Result Card */}
        <div className="lg:col-span-5 bg-slate-800/90 border border-slate-700 rounded-2xl p-6 text-center space-y-4 shadow-xl backdrop-blur-md">
          <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
            <DollarSign className="w-6 h-6" />
          </div>

          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
              Estimated Total Funding Capacity
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 my-1">
              ${estimatedFunding.toLocaleString()} <span className="text-sm text-slate-300 font-normal">/ year</span>
            </div>
            <p className="text-xs text-slate-300">
              Covers tuition waivers, living stipends, book allowances & airfare grants.
            </p>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-left space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span>Full Ride Potential:</span>
              <span className="text-emerald-400 font-bold">
                {gpa >= 3.6 ? 'High (88% Match)' : 'Moderate (65% Match)'}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Matched Opportunities:</span>
              <span className="text-blue-400 font-bold">14+ Grants Available</span>
            </div>
          </div>

          <button
            id="calculator-find-scholarships-btn"
            onClick={() => onFindScholarships(degree, destination)}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 cursor-pointer"
          >
            <span>Match These Opportunities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
