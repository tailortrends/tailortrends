import React from 'react';
import { Compass, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { usePublishing } from '../context/PublishingContext.tsx';
import { SeoHead } from '../components/common/SeoHead.tsx';

interface IndustriesDirectoryProps {
  onOpenIndustry: (slug: string) => void;
  onNavigate: (route: string) => void;
}

export const IndustriesDirectoryPage: React.FC<IndustriesDirectoryProps> = ({ 
  onOpenIndustry, 
  onNavigate 
}) => {
  const { industries, articles } = usePublishing();

  return (
    <div className="min-h-screen py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SeoHead
        title="All Industry Hubs — AI & Emerging Technology Directory | Tailor Trends"
        description="Explore how artificial intelligence, robotics, computer vision, and edge computing transform 16 real-world industries."
      />

      <div className="max-w-3xl mb-12">
        <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
          <Compass className="w-4 h-4" />
          <span>REAL-WORLD INDUSTRY DIRECTORY</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-stone-900 dark:text-stone-50 tracking-tight">
          How Technology Changes Real Industries
        </h1>
        <p className="mt-4 text-stone-600 dark:text-stone-300 font-serif text-lg leading-relaxed">
          Tailor Trends covers technology not in isolation, but through its direct impact on frontline workers, 
          equipment diagnostics, economics, and commercial operations across 16 core sectors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((ind) => {
          const count = articles.filter(a => 
            a.status === 'published' && 
            (a.primaryIndustry === ind.slug || a.secondaryIndustries?.includes(ind.slug))
          ).length;

          return (
            <div
              key={ind.id}
              onClick={() => onOpenIndustry(ind.slug)}
              className="group cursor-pointer p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500 dark:hover:border-amber-500 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold uppercase text-amber-600 dark:text-amber-400">
                    Industry Hub
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                    {count} {count === 1 ? 'article' : 'articles'}
                  </span>
                </div>

                <h2 className="font-display font-bold text-2xl text-stone-900 dark:text-stone-50 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {ind.name}
                </h2>

                <p className="mt-2 text-stone-600 dark:text-stone-400 font-serif text-sm leading-relaxed line-clamp-2">
                  {ind.heroSubtitle}
                </p>

                {/* Practical Apps Peek */}
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 space-y-1">
                  <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block">
                    Key Practical Focus:
                  </span>
                  <p className="text-xs text-stone-700 dark:text-stone-300 line-clamp-2">
                    {ind.practicalApplications[0]}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-mono font-medium text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
                <span>Explore {ind.name} Intelligence</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
