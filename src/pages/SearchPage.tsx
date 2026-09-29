import React, { useState, useMemo } from 'react';
import { Search, Filter, X, Calendar, Clock, Layers } from 'lucide-react';
import { usePublishing } from '../context/PublishingContext.tsx';
import { SeoHead } from '../components/common/SeoHead.tsx';
import { ArticleCard } from '../components/article/ArticleCard.tsx';

interface SearchPageProps {
  onOpenArticle: (slug: string) => void;
  onNavigate: (route: string) => void;
  initialQuery?: string;
  initialIndustry?: string;
}

export const SearchPage: React.FC<SearchPageProps> = ({ 
  onOpenArticle, 
  onNavigate,
  initialQuery = '',
  initialIndustry = 'all'
}) => {
  const { articles, industries } = usePublishing();
  const [query, setQuery] = useState(initialQuery);
  const [selectedIndustry, setSelectedIndustry] = useState(initialIndustry);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');

  // Collect all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    articles.forEach(a => a.tags?.forEach(t => set.add(t)));
    return Array.from(set);
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter(a => {
      // Must be published for public search
      if (a.status !== 'published') return false;

      // Query filter
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchesTitle = a.title.toLowerCase().includes(q);
        const matchesSub = a.subheadline?.toLowerCase().includes(q);
        const matchesExcerpt = a.excerpt?.toLowerCase().includes(q);
        const matchesTags = a.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSub && !matchesExcerpt && !matchesTags) return false;
      }

      // Industry filter
      if (selectedIndustry !== 'all') {
        if (a.primaryIndustry !== selectedIndustry && !a.secondaryIndustries?.includes(selectedIndustry)) {
          return false;
        }
      }

      // Type filter
      if (selectedType !== 'all') {
        if (a.type !== selectedType) return false;
      }

      // Tag filter
      if (selectedTag !== 'all') {
        if (!a.tags?.includes(selectedTag)) return false;
      }

      return true;
    });
  }, [articles, query, selectedIndustry, selectedType, selectedTag]);

  const clearFilters = () => {
    setQuery('');
    setSelectedIndustry('all');
    setSelectedType('all');
    setSelectedTag('all');
  };

  const hasActiveFilters = query !== '' || selectedIndustry !== 'all' || selectedType !== 'all' || selectedTag !== 'all';

  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SeoHead
        title="Search Practical AI & Industry Technology Analysis | Tailor Trends"
        description="Filter and search field-tested articles, industry guides, and tool breakdowns."
      />

      {/* Header */}
      <div className="max-w-3xl mb-8">
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 dark:text-stone-50 tracking-tight">
          Search Intelligence & Analysis
        </h1>
        <p className="mt-2 text-stone-600 dark:text-stone-400 font-serif text-base">
          Find practical breakdowns by trade, equipment, foundation model, or diagnostic workflow.
        </p>
      </div>

      {/* Search Bar Input */}
      <div className="relative mb-6">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by technology, diagnostic task, equipment (e.g., HVAC, vision, laser weeding, BIM)..."
          className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs text-base"
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Multi-faceted Filters */}
      <div className="p-5 rounded-2xl bg-stone-100/70 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 flex items-center">
            <Filter className="w-3.5 h-3.5 mr-1 text-amber-500" />
            Filters
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline"
            >
              Clear All Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Industry Filter */}
          <div>
            <label className="text-[11px] font-mono text-stone-500 block mb-1">INDUSTRY</label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full text-xs font-sans p-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Industries (16 Hubs)</option>
              {industries.map(i => (
                <option key={i.id} value={i.slug}>{i.name}</option>
              ))}
            </select>
          </div>

          {/* Format Filter */}
          <div>
            <label className="text-[11px] font-mono text-stone-500 block mb-1">CONTENT FORMAT</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full text-xs font-sans p-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Editorial Formats</option>
              <option value="ai_in_industry">AI in Industry (Deep Dives)</option>
              <option value="practical_guide">Practical Guides & Prompts</option>
              <option value="tool_breakdown">Tool Breakdowns</option>
              <option value="trend_analysis">Trend Analysis</option>
              <option value="ai_news">AI News</option>
            </select>
          </div>

          {/* Tag Filter */}
          <div>
            <label className="text-[11px] font-mono text-stone-500 block mb-1">TOPIC TAG</label>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full text-xs font-sans p-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Topics & Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>#{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-stone-200 dark:border-stone-800 text-xs font-mono text-stone-500">
        <span>Showing {filteredArticles.length} matching {filteredArticles.length === 1 ? 'article' : 'articles'}</span>
        <span>Sorted by Relevance & Recency</span>
      </div>

      {/* Results Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(art => (
            <ArticleCard
              key={art.id}
              article={art}
              variant="standard"
              onClick={() => onOpenArticle(art.slug)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-stone-100 dark:bg-stone-900/60 rounded-3xl p-8">
          <p className="font-display font-bold text-xl text-stone-800 dark:text-stone-200 mb-2">
            No published articles match your current criteria
          </p>
          <p className="text-stone-600 dark:text-stone-400 font-serif text-sm max-w-md mx-auto mb-6">
            Try adjusting your search terms or clearing industry filters.
          </p>
          <button
            onClick={clearFilters}
            className="px-5 py-2.5 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-xl text-xs font-mono font-medium"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
