import React from 'react';
import { Clock, Calendar, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Article } from '../../types/index.ts';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
  variant?: 'featured' | 'standard' | 'compact' | 'horizontal';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  onClick, 
  variant = 'standard' 
}) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(article.publishedAt));

  const typeLabels: Record<string, string> = {
    ai_news: 'AI News',
    ai_in_industry: 'AI in Industry',
    tool_breakdown: 'Tool Breakdown',
    trend_analysis: 'Trend Analysis',
    practical_guide: 'Practical Guide'
  };

  if (variant === 'featured') {
    return (
      <article 
        onClick={onClick}
        className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-100/80 dark:bg-stone-900/60 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 transition-all duration-300"
      >
        <div className="lg:col-span-7 overflow-hidden rounded-2xl aspect-[16/10] bg-stone-200 dark:bg-stone-800 relative">
          <img 
            src={article.coverImage} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-stone-900/90 text-white backdrop-blur-md">
              {article.primaryIndustry.toUpperCase()}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-sans font-medium bg-amber-500 text-stone-950 backdrop-blur-md">
              {typeLabels[article.type] || 'Deep Dive'}
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
          <div>
            <div className="flex items-center space-x-3 text-xs text-stone-500 dark:text-stone-400 font-mono mb-2">
              <span className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                {formattedDate}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                {article.readingTimeMinutes} min read
              </span>
            </div>

            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 dark:text-stone-50 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-tight">
              {article.title}
            </h2>

            <p className="mt-3 text-stone-600 dark:text-stone-300 font-serif text-base sm:text-lg leading-relaxed line-clamp-3">
              {article.subheadline || article.excerpt}
            </p>
          </div>

          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={article.author.avatar} 
                alt={article.author.name}
                className="w-9 h-9 rounded-full object-cover border border-stone-300 dark:border-stone-700" 
              />
              <div>
                <span className="font-sans font-medium text-xs sm:text-sm text-stone-900 dark:text-stone-100 block">
                  {article.author.name}
                </span>
                <span className="text-[11px] text-stone-500 font-mono block">
                  {article.author.role}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-xs font-mono font-medium text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Read Analysis</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article
        onClick={onClick}
        className="group cursor-pointer flex flex-col sm:flex-row gap-5 p-4 rounded-2xl hover:bg-stone-100/70 dark:hover:bg-stone-900/70 border border-transparent hover:border-stone-200 dark:hover:border-stone-800 transition-all duration-200"
      >
        <div className="sm:w-44 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-stone-200 dark:bg-stone-800 aspect-[16/10] sm:aspect-auto">
          <img 
            src={article.coverImage} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-stone-500 mb-1.5">
              <span className="text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
                {article.primaryIndustry}
              </span>
              <span>•</span>
              <span>{article.readingTimeMinutes} min</span>
            </div>

            <h3 className="font-sans font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">
              {article.title}
            </h3>

            <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-2">
              {article.subheadline || article.excerpt}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-stone-500 font-mono">
            <span>By {article.author.name}</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article
        onClick={onClick}
        className="group cursor-pointer py-3 border-b border-stone-200/80 dark:border-stone-800/80 last:border-0"
      >
        <div className="flex items-center space-x-2 text-[11px] font-mono text-stone-500 mb-1">
          <span className="text-amber-600 dark:text-amber-400 font-bold uppercase">
            {article.primaryIndustry}
          </span>
          <span>•</span>
          <span>{formattedDate}</span>
        </div>
        <h4 className="font-sans font-semibold text-sm sm:text-base text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">
          {article.title}
        </h4>
      </article>
    );
  }

  // Standard Magazine Card
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer flex flex-col justify-between bg-white dark:bg-stone-900/60 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div>
        <div className="aspect-[16/10] overflow-hidden bg-stone-200 dark:bg-stone-800 relative">
          <img 
            src={article.coverImage} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex items-center space-x-1.5">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-stone-900/90 text-white backdrop-blur-md">
              {article.primaryIndustry}
            </span>
            {article.trending && (
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500 text-stone-950 flex items-center shadow-xs">
                <TrendingUp className="w-3 h-3 mr-0.5" />
                Trending
              </span>
            )}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-center space-x-2 text-xs font-mono text-stone-500 dark:text-stone-400 mb-2">
            <span className="font-sans font-medium text-amber-600 dark:text-amber-400">
              {typeLabels[article.type] || 'Analysis'}
            </span>
            <span>•</span>
            <span>{article.readingTimeMinutes} min read</span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>

          <h3 className="font-sans font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
            {article.title}
          </h3>

          <p className="mt-2.5 text-stone-600 dark:text-stone-300 font-serif text-sm leading-relaxed line-clamp-3">
            {article.subheadline || article.excerpt}
          </p>
        </div>
      </div>

      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <img 
            src={article.author.avatar} 
            alt={article.author.name}
            className="w-6 h-6 rounded-full object-cover" 
          />
          <span className="font-medium text-stone-700 dark:text-stone-300">
            {article.author.name}
          </span>
        </div>

        <span className="text-amber-600 dark:text-amber-400 font-mono font-medium flex items-center group-hover:translate-x-0.5 transition-transform">
          Read <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
        </span>
      </div>
    </article>
  );
};
