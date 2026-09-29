import React, { useState } from 'react';
import { X, Copy, Check, Share2, Sparkles, Send, MessageSquare } from 'lucide-react';
import { Article } from '../../types/index.ts';
import { usePublishing } from '../../context/PublishingContext.tsx';

interface SocialShareModalProps {
  article: Article;
  isOpen: boolean;
  onClose: () => void;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({ article, isOpen, onClose }) => {
  const { callAiAssistant } = usePublishing();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'quick' | 'ai_package'>('quick');
  const [generating, setGenerating] = useState(false);
  const [socialPackage, setSocialPackage] = useState<string>('');

  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}/articles/${article.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`"${article.title}" — What it actually means for the real world via @TailorTrends`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleGenerateAiSocial = async () => {
    setGenerating(true);
    try {
      const res = await callAiAssistant({
        task: 'generate-social',
        topic: article.title,
        industry: article.primaryIndustry,
        context: article.takeaway || article.excerpt
      });
      setSocialPackage(res.result);
      setActiveTab('ai_package');
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-xl w-full border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Share2 className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">
              Share Article & Social Distribution
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 text-xs font-mono font-medium">
          <button
            onClick={() => setActiveTab('quick')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors ${
              activeTab === 'quick'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-bold bg-amber-50/30 dark:bg-amber-950/20'
                : 'border-transparent text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Quick Share
          </button>
          <button
            onClick={() => {
              setActiveTab('ai_package');
              if (!socialPackage) handleGenerateAiSocial();
            }}
            className={`flex-1 py-3 text-center border-b-2 transition-colors flex items-center justify-center space-x-1.5 ${
              activeTab === 'ai_package'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-bold bg-amber-50/30 dark:bg-amber-950/20'
                : 'border-transparent text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>AI Distribution Package</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {activeTab === 'quick' ? (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                <span className="text-xs font-mono text-stone-500 uppercase block mb-1">
                  Article Link
                </span>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="flex-1 bg-white dark:bg-stone-900 text-xs font-mono px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 select-all"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-3.5 py-2 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-lg text-xs font-medium flex items-center space-x-1"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleShareTwitter}
                  className="py-3 px-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-sky-500 dark:hover:border-sky-500 flex items-center justify-center space-x-2 text-sm font-medium transition-all group"
                >
                  <span className="text-sky-500 font-bold">X</span>
                  <span>Share on X / Twitter</span>
                </button>
                <button
                  onClick={handleShareLinkedIn}
                  className="py-3 px-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-blue-600 dark:hover:border-blue-600 flex items-center justify-center space-x-2 text-sm font-medium transition-all group"
                >
                  <span className="text-blue-600 font-bold">in</span>
                  <span>Share on LinkedIn</span>
                </button>
              </div>

              <div className="pt-2 border-t border-stone-200 dark:border-stone-800 text-center">
                <button
                  onClick={handleGenerateAiSocial}
                  disabled={generating}
                  className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline flex items-center justify-center mx-auto space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{generating ? 'Generating AI distribution package...' : 'Need complete social drafts? Generate with AI →'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-stone-500">
                <span>Multi-Platform Copy (X, LinkedIn, Carousel, Shorts)</span>
                <button
                  onClick={handleGenerateAiSocial}
                  disabled={generating}
                  className="text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Regenerate</span>
                </button>
              </div>

              {generating ? (
                <div className="py-12 text-center text-sm text-stone-500 font-mono">
                  <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  Synthesizing real-world social angles...
                </div>
              ) : (
                <div className="max-h-72 overflow-y-auto p-4 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs font-mono whitespace-pre-wrap leading-relaxed select-all">
                  {socialPackage || 'Click regenerate to create full social drafts.'}
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(socialPackage);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg text-xs font-semibold flex items-center space-x-1.5"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied All' : 'Copy All Social Drafts'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
