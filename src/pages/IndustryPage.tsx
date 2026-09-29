import React, { useState } from 'react';
import { 
  Wrench, 
  GraduationCap, 
  TrendingUp, 
  Layers, 
  ArrowRight, 
  Cpu, 
  Filter,
  CheckCircle2,
  Users,
  Compass
} from 'lucide-react';
import { usePublishing } from '../context/PublishingContext.tsx';
import { SeoHead } from '../components/common/SeoHead.tsx';
import { ArticleCard } from '../components/article/ArticleCard.tsx';
import { NewsletterSection } from '../components/newsletter/NewsletterSection.tsx';

interface IndustryPageProps {
  industrySlug: string;
  onNavigate: (route: string) => void;
  onOpenArticle: (slug: string) => void;
}

export const IndustryPage: React.FC<IndustryPageProps> = ({ 
  industrySlug, 
  onNavigate, 
  onOpenArticle 
}) => {
  const { industries, articles } = usePublishing();
  const [selectedType, setSelectedType] = useState<string>('all');

  const industry = industries.find(i => i.slug === industrySlug || i.id === industrySlug) || industries[0];

  const industryArticles = articles.filter(a => 
    a.status === 'published' && 
    (a.primaryIndustry === industry.slug || a.secondaryIndustries?.includes(industry.slug))
  );

  const filteredArticles = selectedType === 'all' 
    ? industryArticles 
    : industryArticles.filter(a => a.type === selectedType);

  return (
    <div className="min-h-screen">
      <SeoHead
        title={`AI + ${industry.name} — Practical Trends & Field Workflows`}
        description={industry.heroSubtitle}
        industry={industry}
      />

      {/* INDUSTRY HERO */}
      <section className="pt-12 pb-16 border-b border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-3">
              <Compass className="w-4 h-4" />
              <span>INDUSTRY INTELLIGENCE HUB</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-6xl text-stone-900 dark:text-stone-50 tracking-tight">
              AI + <span className="text-amber-600 dark:text-amber-400 italic">{industry.name}</span>
            </h1>

            <p className="mt-4 text-xl sm:text-2xl text-stone-600 dark:text-stone-300 font-serif leading-relaxed">
              {industry.heroSubtitle}
            </p>

            {/* Related Tech Chips */}
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-stone-400 mr-1">Related Technologies:</span>
              {industry.relatedTechnologies.map(tech => (
                <span 
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-stone-200/80 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: PRACTICAL APPLICATIONS & FIELD TOOLS GRID */}
      <section className="py-12 bg-white dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Practical Applications */}
            <div className="lg:col-span-7">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-500 mb-4">
                <Layers className="w-4 h-4 text-amber-500" />
                <span>Verified Practical Applications in {industry.name}</span>
              </div>
              <div className="space-y-3">
                {industry.practicalApplications.map((app, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="font-serif text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed">
                      {app}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Tools for Industry */}
            <div className="lg:col-span-5">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-500 mb-4">
                <Wrench className="w-4 h-4 text-amber-500" />
                <span>AI Tools Currently Available</span>
              </div>
              <div className="space-y-3">
                {industry.toolsCurrentlyAvailable.map((tool, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                    <span className="font-bold text-sm text-stone-900 dark:text-stone-100 block">
                      {tool.name}
                    </span>
                    <span className="text-xs text-stone-600 dark:text-stone-400 mt-1 block font-serif">
                      {tool.purpose}
                    </span>
                  </div>
                ))}
              </div>

              {/* Future Outlook Summary Callout */}
              <div className="mt-6 p-5 rounded-xl bg-amber-500/10 border-l-4 border-amber-500 dark:bg-amber-950/20">
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400 block mb-1">
                  Future Outlook for {industry.name}
                </span>
                <p className="font-serif text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                  {industry.futureOutlook}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: TRAINING, SKILLS & JOBS AFFECTED */}
      <section className="py-12 bg-stone-50 dark:bg-stone-900/40 border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-500 mb-3">
                <GraduationCap className="w-4 h-4 text-amber-500" />
                <span>Skills Workers Should Learn</span>
              </div>
              <ul className="space-y-2">
                {industry.skillsWorkersShouldLearn.map((skill, idx) => (
                  <li key={idx} className="flex items-center text-xs sm:text-sm font-sans text-stone-700 dark:text-stone-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2.5" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-500 mb-3">
                <Users className="w-4 h-4 text-amber-500" />
                <span>Job Roles Most Affected</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {industry.jobsAffected.map((job, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200"
                  >
                    {job}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs font-mono text-stone-500">
                Key Trend: Shift from manual data-entry and diagnostic guessing to audited digital verification.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: LATEST ARTICLES IN THIS INDUSTRY */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-3 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900 dark:text-stone-100">
              Latest {industry.name} Stories & Guides
            </h2>
            <span className="text-xs font-mono text-stone-500">
              Showing {filteredArticles.length} published reports
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedType === 'all'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
              }`}
            >
              All Formats
            </button>
            <button
              onClick={() => setSelectedType('ai_in_industry')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedType === 'ai_in_industry'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
              }`}
            >
              Deep Dives
            </button>
            <button
              onClick={() => setSelectedType('practical_guide')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedType === 'practical_guide'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
              }`}
            >
              Practical Guides
            </button>
            <button
              onClick={() => setSelectedType('trend_analysis')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedType === 'trend_analysis'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
              }`}
            >
              Trend Analysis
            </button>
          </div>
        </div>

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
          <div className="text-center py-16 bg-stone-100 dark:bg-stone-900 rounded-3xl p-8">
            <h3 className="font-display font-bold text-xl text-stone-800 dark:text-stone-200 mb-2">
              New {industry.name} Stories in Editorial Review
            </h3>
            <p className="text-stone-600 dark:text-stone-400 font-serif text-sm max-w-md mx-auto mb-6">
              Our research team is currently fact-checking additional frontline case studies for this sector.
            </p>
            <button
              onClick={() => onNavigate('admin')}
              className="px-5 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs font-mono"
            >
              Open Admin to Draft an Article for {industry.name} →
            </button>
          </div>
        )}
      </section>

      {/* NEWSLETTER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterSection sourcePage={`industry:${industry.slug}`} />
      </div>
    </div>
  );
};
