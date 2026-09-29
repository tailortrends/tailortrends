import React, { useState, useEffect } from 'react';
import { Mail, Sparkles, X, ArrowRight, CheckCircle2, ShieldAlert, Clock } from 'lucide-react';
import { usePublishing } from '../../context/PublishingContext.tsx';

interface NewsletterModalProps {
  articleSlug: string;
  articleTitle: string;
  industryName?: string;
  delayMs?: number; // Defaults to 30000 ms (30 seconds)
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({
  articleSlug,
  articleTitle,
  industryName,
  delayMs = 30000 // 30 seconds as requested
}) => {
  const { subscribeNewsletter } = usePublishing();
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if the user has already subscribed or dismissed the modal in this session
    const isDismissed = sessionStorage.getItem('tt_newsletter_modal_dismissed');
    const isSubscribed = localStorage.getItem('tt_newsletter_subscribed');

    if (isDismissed || isSubscribed) {
      return;
    }

    // Set timer for 30 seconds on this article page
    const timer = setTimeout(() => {
      setIsMounted(true);
      // Trigger animation on next animation frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    }, delayMs);

    // Clean up timer if reader navigates away before 30 seconds
    return () => clearTimeout(timer);
  }, [articleSlug, delayMs]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMounted) {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMounted]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('tt_newsletter_modal_dismissed', 'true');
    // Allow fade-out and slide-down transition to complete before unmounting
    setTimeout(() => {
      setIsMounted(false);
    }, 450);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    const sourcePage = `modal:article:${articleSlug}`;
    const res = await subscribeNewsletter(email, sourcePage);

    if (res.success) {
      setStatus('success');
      setMessage(res.message);
      localStorage.setItem('tt_newsletter_subscribed', email);
      sessionStorage.setItem('tt_newsletter_modal_dismissed', 'true');
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setIsMounted(false), 450);
      }, 2000);
    } else {
      setStatus('error');
      setMessage(res.message);
    }
  };

  if (!isMounted) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md transition-opacity duration-500 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleDismiss}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-newsletter-title"
    >
      <div 
        className={`relative max-w-lg w-full bg-stone-900 text-stone-100 dark:bg-stone-900 border border-stone-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-8 sm:translate-y-12 scale-[0.97]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-stone-700/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-left relative z-10">
          <div className="flex items-center space-x-2 mb-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              TAILOR TRENDS WEEKLY
            </span>
            <span className="flex items-center text-[11px] font-mono text-stone-400">
              <Clock className="w-3 h-3 mr-1 text-amber-400" />
              30s Reading Check-in
            </span>
          </div>

          <h2 
            id="modal-newsletter-title"
            className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug"
          >
            Stay ahead of the trend before it reshapes your trade.
          </h2>

          <p className="mt-2.5 text-stone-300 font-serif text-sm sm:text-base leading-relaxed">
            The most important developments in AI and emerging technology—and what they actually mean for{' '}
            <span className="text-amber-400 font-sans font-medium">{industryName || 'real-world industries'}</span>.
          </p>

          <div className="mt-4 p-3 rounded-xl bg-stone-800/60 border border-stone-700/60 text-xs font-mono text-stone-400">
            <span className="text-stone-300 font-bold block mb-0.5">Article Reference:</span>
            <span className="truncate block italic text-stone-300">"{articleTitle}"</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email address..."
                className="flex-1 px-4 py-3 rounded-xl bg-stone-800 border border-stone-700 text-white placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-inner"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all flex items-center justify-center space-x-1.5 shadow-md disabled:opacity-50 flex-shrink-0"
              >
                <span>{status === 'loading' ? 'Joining...' : 'Get Weekly'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {status === 'success' && (
              <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-xs font-mono text-emerald-400 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1.5 flex-shrink-0" />
                <span>{message}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-800 text-xs font-mono text-rose-400 flex items-center">
                <ShieldAlert className="w-4 h-4 mr-1.5 flex-shrink-0" />
                <span>{message}</span>
              </div>
            )}
          </form>

          {/* Footer note & Dismiss action */}
          <div className="mt-5 pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-500 font-mono">
            <span>Every Thursday • Zero spam</span>
            <button
              onClick={handleDismiss}
              className="hover:text-stone-300 underline transition-colors"
            >
              Continue reading article →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
