import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Sparkles, 
  Inbox, 
  Lightbulb, 
  Users, 
  ExternalLink, 
  Trash2, 
  Edit3, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Archive,
  Layers,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { usePublishing } from '../../context/PublishingContext.tsx';
import { Article, ArticleStatus } from '../../types/index.ts';

interface AdminDashboardProps {
  onNavigate: (route: string) => void;
  onEditArticle: (id: string) => void;
  onCreateArticle: () => void;
  onOpenArticle: (slug: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  onNavigate, 
  onEditArticle, 
  onCreateArticle,
  onOpenArticle 
}) => {
  const { articles, deleteArticle, changeArticleStatus, newsInbox, storyIdeas, subscribers } = usePublishing();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const statuses: { label: string; value: ArticleStatus | 'all'; color: string }[] = [
    { label: 'All Articles', value: 'all', color: 'stone' },
    { label: 'Published', value: 'published', color: 'emerald' },
    { label: 'Draft', value: 'draft', color: 'amber' },
    { label: 'Editing', value: 'editing', color: 'indigo' },
    { label: 'Ready', value: 'ready', color: 'blue' },
    { label: 'Researching', value: 'researching', color: 'cyan' },
    { label: 'Idea', value: 'idea', color: 'purple' },
    { label: 'Scheduled', value: 'scheduled', color: 'sky' },
    { label: 'Archived', value: 'archived', color: 'stone' }
  ];

  const filteredArticles = articles.filter(a => {
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return a.title.toLowerCase().includes(q) || a.primaryIndustry.toLowerCase().includes(q);
    }
    return true;
  });

  const countByStatus = (st: ArticleStatus) => articles.filter(a => a.status === st).length;

  return (
    <div className="min-h-screen bg-stone-100/60 dark:bg-stone-950 py-8 text-stone-900 dark:text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider mb-1">
              <span>TAILOR TRENDS CONTENT MANAGEMENT SYSTEM</span>
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 dark:text-stone-50">
              Editorial Operations
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-serif">
              Manage articles, block-based drafts, AI assistant workflows, and research projects.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigate('admin-news-inbox')}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 hover:border-amber-500 text-xs font-mono font-medium flex items-center space-x-1.5 shadow-xs"
            >
              <Inbox className="w-4 h-4 text-sky-500" />
              <span>News Inbox</span>
              {newsInbox.filter(n => n.status === 'inbox').length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-[10px] font-bold">
                  {newsInbox.filter(n => n.status === 'inbox').length}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('admin-story-ideas')}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 hover:border-amber-500 text-xs font-mono font-medium flex items-center space-x-1.5 shadow-xs"
            >
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Story Ideas</span>
              <span className="px-1.5 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[10px] font-bold">
                {storyIdeas.length}
              </span>
            </button>

            <button
              onClick={() => onNavigate('admin-research')}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 hover:border-amber-500 text-xs font-mono font-medium flex items-center space-x-1.5 shadow-xs"
            >
              <FileText className="w-4 h-4 text-emerald-500" />
              <span>Research Hub</span>
            </button>

            <button
              onClick={() => onNavigate('admin-subscribers')}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 hover:border-amber-500 text-xs font-mono font-medium flex items-center space-x-1.5 shadow-xs"
            >
              <Users className="w-4 h-4 text-indigo-500" />
              <span>Subscribers ({subscribers.length})</span>
            </button>

            <button
              onClick={onCreateArticle}
              className="px-4 py-2 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-amber-600 dark:hover:bg-amber-400 dark:hover:text-stone-950 text-xs font-mono font-bold flex items-center space-x-1.5 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Article</span>
            </button>
          </div>
        </div>

        {/* Status Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 my-6">
          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <span className="text-[11px] font-mono text-stone-500 uppercase block">Published</span>
            <span className="font-display font-bold text-2xl text-emerald-600 dark:text-emerald-400">
              {countByStatus('published')}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <span className="text-[11px] font-mono text-stone-500 uppercase block">Drafts</span>
            <span className="font-display font-bold text-2xl text-amber-600 dark:text-amber-400">
              {countByStatus('draft')}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <span className="text-[11px] font-mono text-stone-500 uppercase block">In Editing</span>
            <span className="font-display font-bold text-2xl text-indigo-600 dark:text-indigo-400">
              {countByStatus('editing')}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <span className="text-[11px] font-mono text-stone-500 uppercase block">Ready for Review</span>
            <span className="font-display font-bold text-2xl text-blue-600 dark:text-blue-400">
              {countByStatus('ready')}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <span className="text-[11px] font-mono text-stone-500 uppercase block">Total Views</span>
            <span className="font-display font-bold text-2xl text-stone-900 dark:text-stone-100">
              {articles.reduce((acc, a) => acc + (a.views || 0), 0).toLocaleString()}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <span className="text-[11px] font-mono text-stone-500 uppercase block">Subscribers</span>
            <span className="font-display font-bold text-2xl text-purple-600 dark:text-purple-400">
              {subscribers.length}
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          {/* Status Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 text-xs font-mono">
            {statuses.map(s => (
              <button
                key={s.value}
                onClick={() => setStatusFilter(s.value)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  statusFilter === s.value
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                    : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Articles Table */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-stone-50 dark:bg-stone-800/80 border-b border-stone-200 dark:border-stone-800 text-[11px] font-mono text-stone-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Article Headline</th>
                  <th className="py-3.5 px-4 font-semibold">Industry</th>
                  <th className="py-3.5 px-4 font-semibold">Format</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold">Views</th>
                  <th className="py-3.5 px-4 font-semibold">Updated</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                {filteredArticles.map(art => (
                  <tr key={art.id} className="hover:bg-stone-50/70 dark:hover:bg-stone-800/50 transition-colors group">
                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="font-semibold text-stone-900 dark:text-stone-100 text-sm line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 cursor-pointer" onClick={() => onEditArticle(art.id)}>
                        {art.title}
                      </div>
                      <div className="text-stone-500 font-mono text-[11px] line-clamp-1 mt-0.5">
                        By {art.author.name} • /{art.slug}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium uppercase bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                        {art.primaryIndustry}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-stone-600 dark:text-stone-400">
                      {art.type.replace(/_/g, ' ')}
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={art.status}
                        onChange={(e) => changeArticleStatus(art.id, e.target.value as ArticleStatus)}
                        className={`text-[11px] font-mono font-bold px-2 py-1 rounded-md border focus:outline-none ${
                          art.status === 'published'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                            : art.status === 'draft'
                            ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                            : art.status === 'editing'
                            ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700'
                        }`}
                      >
                        <option value="draft">Draft</option>
                        <option value="editing">Editing</option>
                        <option value="ready">Ready</option>
                        <option value="published">Published</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-stone-600 dark:text-stone-400">
                      {art.views?.toLocaleString() || 0}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-stone-500">
                      {new Date(art.updatedAt).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {art.status === 'published' && (
                          <button
                            onClick={() => onOpenArticle(art.slug)}
                            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200 dark:hover:bg-stone-800"
                            title="View Public Article"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => onEditArticle(art.id)}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-stone-200 dark:hover:bg-stone-800"
                          title="Open Block Editor"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${art.title}"?`)) {
                              deleteArticle(art.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
