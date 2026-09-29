import React, { useState } from 'react';
import { ArrowLeft, Inbox, ExternalLink, Bookmark, FileText, ArrowRight, EyeOff, Check, Filter } from 'lucide-react';
import { usePublishing } from '../../context/PublishingContext.tsx';
import { NewsInboxItem } from '../../types/index.ts';

interface AdminNewsInboxProps {
  onNavigate: (route: string) => void;
  onEditArticle: (id: string) => void;
}

export const AdminNewsInbox: React.FC<AdminNewsInboxProps> = ({ onNavigate, onEditArticle }) => {
  const { newsInbox, updateNewsInboxStatus, convertNewsToArticle } = usePublishing();
  const [filter, setFilter] = useState<'all' | 'inbox' | 'saved' | 'research'>('inbox');

  const filteredItems = newsInbox.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const handleTurnToArticle = async (item: NewsInboxItem) => {
    const created = await convertNewsToArticle(item);
    onEditArticle(created.id);
  };

  return (
    <div className="min-h-screen bg-stone-100/60 dark:bg-stone-950 py-8 text-stone-900 dark:text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('admin')}
              className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 block">
                INTELLIGENCE DISCOVERY FEED
              </span>
              <h1 className="font-display font-bold text-3xl text-stone-900 dark:text-stone-50">
                News Discovery Inbox
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 font-serif">
                Incoming technical developments and field announcements. Filter, research, or turn into deep-dive articles.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="my-6 flex items-center space-x-2 text-xs font-mono">
          <button
            onClick={() => setFilter('inbox')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'inbox'
                ? 'bg-sky-600 text-white font-bold'
                : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400'
            }`}
          >
            Inbox ({newsInbox.filter(n => n.status === 'inbox').length})
          </button>
          <button
            onClick={() => setFilter('saved')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'saved'
                ? 'bg-sky-600 text-white font-bold'
                : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400'
            }`}
          >
            Saved ({newsInbox.filter(n => n.status === 'saved').length})
          </button>
          <button
            onClick={() => setFilter('research')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'research'
                ? 'bg-sky-600 text-white font-bold'
                : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400'
            }`}
          >
            In Research ({newsInbox.filter(n => n.status === 'research').length})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-sky-600 text-white font-bold'
                : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400'
            }`}
          >
            All Items ({newsInbox.length})
          </button>
        </div>

        {/* Items Grid */}
        <div className="space-y-4">
          {filteredItems.map(item => (
            <div 
              key={item.id}
              className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-6 hover:border-sky-500 transition-colors"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center space-x-2 text-[11px] font-mono">
                  <span className="font-bold text-sky-600 dark:text-sky-400 uppercase">
                    {item.sourceName}
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                    {item.industry}
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="text-stone-500">{item.publishedDate}</span>
                </div>

                <h3 className="font-sans font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-serif leading-relaxed">
                  "{item.snippet}"
                </p>

                {item.editorialNotes && (
                  <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs font-mono text-amber-800 dark:text-amber-300">
                    Note: {item.editorialNotes}
                  </div>
                )}
              </div>

              {/* Actions Column */}
              <div className="flex flex-wrap md:flex-col items-end gap-2 flex-shrink-0">
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-mono text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 flex items-center space-x-1"
                >
                  <span>Source URL</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => updateNewsInboxStatus(item.id, 'saved')}
                    className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-stone-950 hover:bg-stone-200"
                    title="Save for Later"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      updateNewsInboxStatus(item.id, 'research');
                      onNavigate('admin-research');
                    }}
                    className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-stone-950 hover:bg-stone-200"
                    title="Send to Research Workspace"
                  >
                    <FileText className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => updateNewsInboxStatus(item.id, 'ignored')}
                    className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-400 hover:text-stone-600"
                    title="Ignore"
                  >
                    <EyeOff className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleTurnToArticle(item)}
                    className="px-3.5 py-2 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-xl text-xs font-mono font-bold flex items-center space-x-1 hover:bg-amber-500 dark:hover:bg-amber-400 dark:hover:text-stone-950 transition-colors"
                  >
                    <span>Turn Into Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
