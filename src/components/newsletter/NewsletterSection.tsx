import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldAlert, ArrowRight, Sparkles } from 'lucide-react';
import { usePublishing } from '../../context/PublishingContext.tsx';

interface NewsletterSectionProps {
  sourcePage?: string;
  variant?: 'inline' | 'banner';
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ 
  sourcePage = '/', 
  variant = 'inline' 
}) => {
  const { subscribeNewsletter } = usePublishing();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setStatus('loading');
    const res = await subscribeNewsletter(email, sourcePage);
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
    <section className="my-14 rounded-3xl bg-stone-900 text-stone-100 dark:bg-stone-900/90 dark:border dark:border-stone-800 p-8 sm:p-12 relative overflow-hidden shadow-xl">
      {/* Decorative subtle background grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-400 mb-4 border border-amber-500/30">
          <Sparkles className="w-3.5 h-3.5 mr-1.5" />
          TAILOR TRENDS WEEKLY
        </span>

        <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
          The technology that matters. Explained for the real world.
        </h2>

        <p className="mt-3 text-stone-300 font-serif text-lg leading-relaxed max-w-xl mx-auto">
          The most important developments in AI and emerging technology—and what they actually mean for the industries changing around us.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address..."
            className="flex-1 px-4 py-3.5 rounded-xl bg-stone-800 border border-stone-700 text-white placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-inner"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all flex items-center justify-center space-x-1.5 shadow-md disabled:opacity-50"
          >
            <span>{status === 'loading' ? 'Joining...' : 'Subscribe Free'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {status === 'success' && (
          <div className="mt-4 inline-flex items-center text-xs font-mono text-emerald-400 bg-emerald-950/50 px-3 py-1.5 rounded-lg border border-emerald-800">
            <CheckCircle2 className="w-4 h-4 mr-1.5 flex-shrink-0" />
            {message}
          </div>
        )}
        {status === 'error' && (
          <div className="mt-4 inline-flex items-center text-xs font-mono text-rose-400 bg-rose-950/50 px-3 py-1.5 rounded-lg border border-rose-800">
            <ShieldAlert className="w-4 h-4 mr-1.5 flex-shrink-0" />
            {message}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-stone-400">
          <span>✓ Delivered every Thursday</span>
          <span>•</span>
          <span>✓ No vendor marketing fluff</span>
          <span>•</span>
          <span>✓ 100% free forever</span>
        </div>
      </div>
    </section>
  );
};
