import React, { useState } from 'react';
import { Rss, FileText, CheckCircle2, ShieldAlert, ArrowRight, Mail } from 'lucide-react';
import { usePublishing } from '../../context/PublishingContext.tsx';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { industries, subscribeNewsletter } = usePublishing();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    const res = await subscribeNewsletter(email, 'footer');
    if (res.success) {
      setStatus('success');
      setMessage(res.message);
      setEmail('');
    } else {
      setStatus('error');
      setMessage(res.message);
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 dark:bg-stone-950 dark:text-stone-400 border-t border-stone-800 transition-colors pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-stone-800">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-white text-stone-950 flex items-center justify-center font-display font-bold text-2xl">
                T<span className="text-amber-500 font-sans text-lg">T</span>
              </div>
              <span className="font-display tracking-tight text-3xl font-bold text-white">
                TAILOR <span className="text-amber-400 font-normal italic">TRENDS</span>
              </span>
            </div>

            <p className="text-stone-400 font-serif text-lg leading-relaxed max-w-md">
              "Follow the trend. Understand the technology. See how it changes the real world."
            </p>

            <p className="text-sm text-stone-400 leading-relaxed max-w-md">
              A modern technology and industry publication dedicated to demystifying artificial intelligence, 
              robotics, and edge computing for frontline trades, businesses, and engineering operations.
            </p>

            <div className="flex items-center space-x-4 pt-2 text-xs font-mono text-stone-400">
              <a href="/feed.xml" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-amber-400 transition-colors">
                <Rss className="w-4 h-4 mr-1 text-amber-500" />
                RSS Feed
              </a>
              <span>•</span>
              <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-amber-400 transition-colors">
                <FileText className="w-4 h-4 mr-1 text-stone-400" />
                Sitemap.xml
              </a>
              <span>•</span>
              <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">
                Editorial Principles
              </button>
            </div>
          </div>

          {/* Newsletter Signup Column */}
          <div className="lg:col-span-7 bg-stone-800/60 rounded-2xl p-6 sm:p-8 border border-stone-700/60">
            <div className="max-w-xl">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-amber-500/20 text-amber-300 mb-3">
                <Mail className="w-3.5 h-3.5 mr-1" />
                Tailor Trends Weekly
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                The AI developments that actually matter for your trade.
              </h3>
              <p className="text-sm text-stone-400 mt-2 mb-5">
                Every Thursday: zero hype, zero sponsored fluff. Only field-tested tool breakdowns, practical prompts, and deep industry case studies.
              </p>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email address..."
                  required
                  className="flex-1 bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold px-6 py-3 rounded-lg text-sm transition-all flex items-center justify-center space-x-1.5 disabled:opacity-50"
                >
                  <span>{status === 'loading' ? 'Joining...' : 'Subscribe'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {status === 'success' && (
                <div className="mt-3 flex items-center text-xs text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 mr-1.5 flex-shrink-0" />
                  {message}
                </div>
              )}
              {status === 'error' && (
                <div className="mt-3 flex items-center text-xs text-rose-400">
                  <ShieldAlert className="w-4 h-4 mr-1.5 flex-shrink-0" />
                  {message}
                </div>
              )}

              <p className="text-[11px] text-stone-500 mt-3 font-mono">
                No spam. Unsubscribe anytime. Read by 14,000+ trade contractors, engineers, and founders.
              </p>
            </div>
          </div>
        </div>

        {/* Middle Navigation Grid: Industries & Content Types */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-12 border-b border-stone-800 text-sm">
          
          {/* Industries Column 1 */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400 mb-4">
              Frontline Trades
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('industry:hvac')} className="hover:text-white transition-colors text-left">
                  HVAC & Refrigeration
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industry:construction-trades')} className="hover:text-white transition-colors text-left">
                  Construction & Skilled Trades
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industry:automotive')} className="hover:text-white transition-colors text-left">
                  Automotive & Fleets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industry:manufacturing')} className="hover:text-white transition-colors text-left">
                  Manufacturing & Machining
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industry:3d-printing')} className="hover:text-white transition-colors text-left">
                  3D Printing & Additive
                </button>
              </li>
            </ul>
          </div>

          {/* Industries Column 2 */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400 mb-4">
              Real Estate & Commerce
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('industry:real-estate')} className="hover:text-white transition-colors text-left">
                  Commercial Real Estate
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industry:agriculture')} className="hover:text-white transition-colors text-left">
                  Agriculture & Farming
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industry:small-business')} className="hover:text-white transition-colors text-left">
                  Small Business Operations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industry:cannabis')} className="hover:text-white transition-colors text-left">
                  Cannabis Cultivation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industry:healthcare')} className="hover:text-white transition-colors text-left">
                  Healthcare & Clinical Voice
                </button>
              </li>
            </ul>
          </div>

          {/* Industries Column 3 */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400 mb-4">
              Core Tech & Robotics
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('industry:artificial-intelligence')} className="hover:text-white transition-colors text-left">
                  Artificial Intelligence
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industry:robotics-automation')} className="hover:text-white transition-colors text-left">
                  Robotics & Automation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industry:software-development')} className="hover:text-white transition-colors text-left">
                  Software Engineering
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industry:consumer-technology')} className="hover:text-white transition-colors text-left">
                  Consumer Tech & Wearables
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industry:future-technology')} className="hover:text-white transition-colors text-left">
                  Future Technology & Quantum
                </button>
              </li>
            </ul>
          </div>

          {/* Formats & Editorial */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400 mb-4">
              Editorial Formats
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('ai-news')} className="hover:text-white transition-colors text-left">
                  AI News (Fast updates)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('deep-dives')} className="hover:text-white transition-colors text-left">
                  AI in Industry (Deep dives)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tools')} className="hover:text-white transition-colors text-left">
                  Tool Breakdowns
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('guides')} className="hover:text-white transition-colors text-left">
                  Practical Guides & Prompts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('deep-dives')} className="hover:text-white transition-colors text-left">
                  Trend Analysis (3/5/10 yr)
                </button>
              </li>
            </ul>
          </div>

          {/* Editorial Standards & Admin */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400 mb-4">
              Publication
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors text-left">
                  About Tailor Trends
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors text-left">
                  Fact-Checking Standards
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors text-left">
                  Source Citation Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="text-amber-400 hover:underline font-medium text-left">
                  Admin CMS & AI Tools →
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 font-mono">
          <div>
            © {new Date().getFullYear()} Tailor Trends (TailorTrends.com). All rights reserved.
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-6">
            <span>Independent Technology Journalism</span>
            <span>•</span>
            <span>No Unverified AI Hallucinations</span>
            <span>•</span>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-stone-300">
              Back to Top ↑
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
