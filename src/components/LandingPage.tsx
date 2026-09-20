import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  CheckCircle, 
  ShieldCheck, 
  Bot, 
  FileText, 
  Award, 
  Search, 
  Globe2, 
  TrendingUp, 
  BookOpen, 
  Users, 
  DollarSign, 
  Check, 
  Zap, 
  Briefcase, 
  Calendar,
  FileCheck,
  UserCheck,
  GraduationCap
} from 'lucide-react';
import { FundingCalculator } from './FundingCalculator';
import { InteractiveDemoModal } from './InteractiveDemoModal';

interface LandingPageProps {
  onNavigateToMatch: () => void;
  onNavigateToSearch: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateToMatch,
  onNavigateToSearch,
}) => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-500 selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        {/* Soft Ambient Radial Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-blue-100/60 via-indigo-50/40 to-transparent pointer-events-none rounded-full blur-3xl -z-10" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* AI Badge Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-200 text-blue-700 shadow-sm text-xs font-semibold animate-fade-in">
            <Sparkles className="w-4 h-4 text-purple-600 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Next-Gen AI Agents Powered by Google Cloud & Gemini</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto text-slate-900 leading-[1.1]">
            Find Scholarships Meant for You —{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Powered by AI
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Upload your academic profile and let Lumora’s AI Agents instantly discover scholarships, grants, fellowships, and government financial aid tailored to your unique background.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              id="hero-find-scholarships-btn"
              onClick={onNavigateToMatch}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-base hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <span>Find Scholarships Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-watch-demo-btn"
              onClick={() => setIsDemoOpen(true)}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold text-base hover:bg-slate-100/80 transition-all flex items-center justify-center gap-2.5 shadow-2xs cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <span>Watch AI Agent Demo</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-slate-200/60 text-slate-800">
            <div className="p-4 bg-white/70 backdrop-blur-xs rounded-2xl border border-slate-100 shadow-2xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">50,000+</div>
              <div className="text-xs font-medium text-slate-500 mt-1">Global Scholarships</div>
            </div>
            <div className="p-4 bg-white/70 backdrop-blur-xs rounded-2xl border border-slate-100 shadow-2xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600">100+</div>
              <div className="text-xs font-medium text-slate-500 mt-1">Countries Covered</div>
            </div>
            <div className="p-4 bg-white/70 backdrop-blur-xs rounded-2xl border border-slate-100 shadow-2xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">10,000+</div>
              <div className="text-xs font-medium text-slate-500 mt-1">Students Awarded</div>
            </div>
            <div className="p-4 bg-white/70 backdrop-blur-xs rounded-2xl border border-slate-100 shadow-2xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-600">$450M+</div>
              <div className="text-xs font-medium text-slate-500 mt-1">Funding Discovered</div>
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-widest text-blue-600">
              Automated Financial Aid Discovery
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              How Lumora Works in 4 Steps
            </h2>
            <p className="text-slate-600 text-sm">
              Our multi-agent AI framework automates eligibility checks, essay writing, deadline reminders, and document validation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4 hover:shadow-md transition-shadow relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-base">
                01
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Create Your Profile</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Input your GPA, target degree, field of study, citizenship, test scores, and research achievements.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4 hover:shadow-md transition-shadow relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-base">
                02
              </div>
              <h3 className="font-bold text-slate-900 text-lg">AI Analyzes Qualifications</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gemini matches your academic profile against 50,000+ university grants, government schemes, and private fellowships.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4 hover:shadow-md transition-shadow relative">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white font-bold flex items-center justify-center text-base">
                03
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Personalized Results</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive ranked scholarship cards complete with eligibility scores, acceptance probability, and document checklists.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4 hover:shadow-md transition-shadow relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-base">
                04
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Apply with AI Assistance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Draft Statements of Purpose, perform AI Essay Audits, track deadlines, and submit with full confidence.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* AI AGENT FEATURES SHOWCASE */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-600">
              Multi-Agent Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              9 Core AI Powered Capabilities
            </h2>
            <p className="text-slate-600 text-sm">
              Designed to handle every stage of your scholarship application lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-blue-300 transition-all shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">AI Eligibility Matching Agent</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculates precision eligibility scores, pinpoints missing requirements, and provides actionable tips to maximize selection.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-purple-300 transition-all shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Essay Writing & Review Agent</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generates tailored Personal Statements and SOPs, evaluates storytelling, grammar, alignment, and generates polished revisions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-emerald-300 transition-all shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Automated Deadline Tracker</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tracks critical application dates, generates custom task roadmaps, and provides automated reminder alerts.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-blue-300 transition-all shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">AI Resume & ATS Optimizer</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Audits CVs for ATS formatting, recommends high-value academic keywords, and highlights scholarship relevance.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-300 transition-all shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Globe2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Government Scheme Finder</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Scans public international aid programs (DAAD, MEXT, Chevening, Fulbright) tailored to your citizenship.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-purple-300 transition-all shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Multi-Language Essay Translator</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Translates your Statements of Purpose into 10+ languages while preserving formal academic tone.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* INTERACTIVE FUNDING CALCULATOR WIDGET */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FundingCalculator
            onFindScholarships={(degree, destination) => {
              onNavigateToSearch();
            }}
          />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-600">
              Student Success Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Awarded Millions in Global Funding
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="Aria Chen"
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Aria Chen</h4>
                  <p className="text-xs text-slate-500">Oxford University • Rhodes Scholar</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 italic leading-relaxed">
                "Lumora’s AI Essay Reviewer caught weak points in my personal narrative that my professors missed. Getting the Rhodes Scholarship changed my life!"
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-600">£55,000 / year</span>
                <span className="text-slate-400">Awarded Oct 2025</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="David Osei"
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">David Osei</h4>
                  <p className="text-xs text-slate-500">Stanford University • Knight-Hennessy</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 italic leading-relaxed">
                "The Lumora AI Match Engine identified the Knight-Hennessy program when I thought I wasn't qualified. The automated roadmap kept me on track."
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-600">$90,000 / year</span>
                <span className="text-slate-400">Awarded Nov 2025</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="Priya Sharma"
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Priya Sharma</h4>
                  <p className="text-xs text-slate-500">German DAAD Fellowship</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 italic leading-relaxed">
                "As an international student, navigating German scholarships was daunting. Lumora extracted document metadata and simplified the process!"
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-600">Full Tuition + €934/mo</span>
                <span className="text-slate-400">Awarded Dec 2025</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* PRICING PLANS */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-widest text-blue-600">
              Accessible Subscription Tiers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Simple, Transparent Pricing
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Free */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-6">
              <div>
                <h3 className="font-bold text-slate-900 text-xl">Free Student</h3>
                <p className="text-xs text-slate-500 mt-1">Basic scholarship discovery for all</p>
                <div className="text-3xl font-extrabold text-slate-900 mt-4">$0</div>
              </div>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Basic Scholarship Search</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 3 AI Profile Match Runs / month</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Application Kanban Tracker</li>
              </ul>
              <button
                onClick={onNavigateToMatch}
                className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Get Started Free
              </button>
            </div>

            {/* Premium AI */}
            <div className="bg-gradient-to-b from-blue-900 to-indigo-950 text-white p-8 rounded-3xl border-2 border-blue-500 space-y-6 relative shadow-xl">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider">
                Most Popular
              </div>
              <div>
                <h3 className="font-bold text-white text-xl">Lumora Pro AI</h3>
                <p className="text-xs text-blue-200 mt-1">Unlimited AI Agents for Serious Applicants</p>
                <div className="text-3xl font-extrabold text-white mt-4">$12 <span className="text-xs text-blue-200 font-normal">/ month</span></div>
              </div>
              <ul className="space-y-3 text-xs text-blue-100">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited Gemini AI Match Runs</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited AI Essay Audits & Polishing</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> AI Resume ATS Optimization</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Multi-language Essay Translation</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Priority Deadline Email & Push Alerts</li>
              </ul>
              <button
                onClick={onNavigateToMatch}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-xs hover:from-blue-400 hover:to-indigo-400 transition-all shadow-md shadow-blue-500/30 cursor-pointer"
              >
                Start 7-Day Free Trial
              </button>
            </div>

            {/* University */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-6">
              <div>
                <h3 className="font-bold text-slate-900 text-xl">University / Grantor</h3>
                <p className="text-xs text-slate-500 mt-1">For institutions & grant providers</p>
                <div className="text-3xl font-extrabold text-slate-900 mt-4">$199 <span className="text-xs text-slate-500 font-normal">/ month</span></div>
              </div>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Post Unlimited Grant Opportunities</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Applicant Analytics & AI Scoring</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Direct Messaging & Decision Approvals</li>
              </ul>
              <button
                onClick={onNavigateToSearch}
                className="w-full py-3 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Contact University Sales
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <span>Lumora</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Empowering students worldwide with AI agents to unlock life-changing educational financial aid.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-white mb-3 text-sm">Platform</h5>
            <ul className="space-y-2">
              <li><button onClick={onNavigateToSearch} className="hover:text-white cursor-pointer">Find Scholarships</button></li>
              <li><button onClick={onNavigateToMatch} className="hover:text-white cursor-pointer">AI Match Engine</button></li>
              <li><a href="#funding-calc" className="hover:text-white">Funding Calculator</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-3 text-sm">Resources</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Fulbright Guide</a></li>
              <li><a href="#" className="hover:text-white">Oxford Rhodes Application Tips</a></li>
              <li><a href="#" className="hover:text-white">German DAAD Handbook</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-3 text-sm">Legal & Security</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">FERPA & GDPR Compliance</a></li>
            </ul>
          </div>

        </div>
      </footer>

      {/* Interactive Live Demo Modal */}
      <InteractiveDemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        onNavigateToMatch={onNavigateToMatch}
      />

    </div>
  );
};
