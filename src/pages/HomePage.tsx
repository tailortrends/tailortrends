import React from 'react';
import { 
  ArrowRight, 
  TrendingUp, 
  Layers, 
  Sparkles, 
  Wrench, 
  BookOpen, 
  ChevronRight,
  Fan,
  Building2,
  Car,
  Wheat,
  Activity,
  Hammer,
  Code,
  Store,
  Bot,
  Compass
} from 'lucide-react';
import { usePublishing } from '../context/PublishingContext.tsx';
import { ArticleCard } from '../components/article/ArticleCard.tsx';
import { NewsletterSection } from '../components/newsletter/NewsletterSection.tsx';
import { SeoHead } from '../components/common/SeoHead.tsx';

interface HomePageProps {
  onNavigate: (route: string) => void;
  onOpenArticle: (slug: string) => void;
  onOpenIndustry: (slug: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onNavigate, 
  onOpenArticle, 
  onOpenIndustry 
}) => {
  const { articles, industries } = usePublishing();

  const publishedArticles = articles.filter(a => a.status === 'published');
  const featuredArticle = publishedArticles.find(a => a.featured) || publishedArticles[0];
  const trendingArticles = publishedArticles.filter(a => a.id !== featuredArticle?.id).slice(0, 4);
  const aiNewsArticles = publishedArticles.filter(a => a.type === 'ai_news' || a.tags.includes('AI News')).slice(0, 4);
  const deepDives = publishedArticles.filter(a => a.type === 'ai_in_industry' || a.type === 'trend_analysis').slice(0, 3);
  const practicalGuides = publishedArticles.filter(a => a.type === 'practical_guide').slice(0, 2);

  // Key Industry Visual Cards
  const keyIndustrySlugs = [
    { slug: 'hvac', label: 'HVAC', desc: 'Acoustic diagnostics, heat pump telemetry & field vision', icon: Fan },
    { slug: 'real-estate', label: 'Real Estate', desc: 'Autonomous lease abstraction & predictive underwriting', icon: Building2 },
    { slug: 'automotive', label: 'Automotive', desc: 'Predictive telematics & drive-thru computer vision', icon: Car },
    { slug: 'healthcare', label: 'Healthcare', desc: 'Ambient clinical listening & diagnostic radiology flags', icon: Activity },
    { slug: 'agriculture', label: 'Agriculture', desc: 'Autonomous weed laser eradication & multispectral drones', icon: Wheat },
    { slug: 'construction-trades', label: 'Construction', desc: 'Autonomous layout rovers & 360 BIM reality capture', icon: Hammer },
    { slug: 'software-development', label: 'Software', desc: 'Agentic refactoring & automated regression synthesis', icon: Code },
    { slug: 'small-business', label: 'Small Business', desc: 'Conversational phone dispatch & automated bookkeeping', icon: Store }
  ];

  return (
    <div className="min-h-screen">
      <SeoHead
        title="Tailor Trends — AI & Emerging Technology Explained for Real-World Industries"
        description="Follow the trend. Understand the technology. See how AI, automation, and robotics transform HVAC, Construction, Healthcare, Real Estate, and more."
      />

      {/* HOMEPAGE HERO */}
      <section className="relative pt-12 pb-16 lg:pt-18 lg:pb-24 overflow-hidden border-b border-stone-200 dark:border-stone-800 bg-stone-100/40 dark:bg-stone-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-stone-200/80 dark:bg-stone-800 text-stone-800 dark:text-stone-200 mb-6 border border-stone-300 dark:border-stone-700">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>THE PRACTICAL TECHNOLOGY PUBLICATION</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-stone-900 dark:text-stone-50 tracking-tight leading-[1.08]">
              Technology Is Changing Every Industry.{' '}
              <span className="italic font-normal text-amber-600 dark:text-amber-400 block sm:inline">
                Tailor Trends Explains How.
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-2xl text-stone-600 dark:text-stone-300 font-serif max-w-2xl mx-auto leading-relaxed">
              Follow AI, automation, software, robotics, and emerging technology as they move from headlines into real-world industries.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('trending-now');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-900 font-semibold text-sm hover:scale-102 transition-all flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Explore the Latest Trends</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('industries-directory')}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-transparent border-2 border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-semibold text-sm hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-all flex items-center justify-center space-x-2"
              >
                <Compass className="w-4 h-4 text-amber-500" />
                <span>Explore AI by Industry (16 Hubs)</span>
              </button>
            </div>

            {/* Six Questions Banner */}
            <div className="mt-12 pt-8 border-t border-stone-200/80 dark:border-stone-800/80 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs font-mono text-stone-500 dark:text-stone-400">
              <span className="bg-stone-50 dark:bg-stone-900/60 p-2 rounded-lg border border-stone-200/60 dark:border-stone-800">1. What happened?</span>
              <span className="bg-stone-50 dark:bg-stone-900/60 p-2 rounded-lg border border-stone-200/60 dark:border-stone-800">2. Why it matters?</span>
              <span className="bg-stone-50 dark:bg-stone-900/60 p-2 rounded-lg border border-stone-200/60 dark:border-stone-800">3. How it works?</span>
              <span className="bg-stone-50 dark:bg-stone-900/60 p-2 rounded-lg border border-stone-200/60 dark:border-stone-800">4. Industry impact?</span>
              <span className="bg-stone-50 dark:bg-stone-900/60 p-2 rounded-lg border border-stone-200/60 dark:border-stone-800">5. How to use it?</span>
              <span className="bg-stone-50 dark:bg-stone-900/60 p-2 rounded-lg border border-stone-200/60 dark:border-stone-800">6. What to watch?</span>
            </div>

          </div>
        </div>
      </section>

      {/* TRENDING NOW */}
      <section id="trending-now" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-amber-500" />
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900 dark:text-stone-100">
              Trending Now
            </h2>
          </div>
          <span className="text-xs font-mono text-stone-500">
            Field Reports & Breaking Practical Analysis
          </span>
        </div>

        {/* Featured Big Story */}
        {featuredArticle && (
          <div className="mb-10">
            <ArticleCard
              article={featuredArticle}
              variant="featured"
              onClick={() => onOpenArticle(featuredArticle.slug)}
            />
          </div>
        )}

        {/* Secondary Trending Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingArticles.map(art => (
            <ArticleCard
              key={art.id}
              article={art}
              variant="standard"
              onClick={() => onOpenArticle(art.slug)}
            />
          ))}
        </div>
      </section>

      {/* AI ACROSS INDUSTRIES (Visual Cards) */}
      <section className="py-16 bg-stone-100 dark:bg-stone-900/50 border-y border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
                SECTOR HUBS
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 dark:text-stone-100">
                AI Across Real-World Industries
              </h2>
              <p className="text-stone-600 dark:text-stone-400 font-serif text-base mt-1">
                Select an industry to explore tools, diagnostic workflows, and labor transformations.
              </p>
            </div>
            <button
              onClick={() => onNavigate('industries-directory')}
              className="mt-4 sm:mt-0 inline-flex items-center text-sm font-semibold text-amber-600 dark:text-amber-400 hover:underline"
            >
              <span>View all 16 industries</span>
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyIndustrySlugs.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.slug}
                  onClick={() => onOpenIndustry(item.slug)}
                  className="group text-left p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500 dark:hover:border-amber-500 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-sans font-bold text-lg text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {item.label}
                    </h3>
                    <p className="mt-1.5 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-mono text-stone-500 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                    <span>Enter Hub</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* LATEST AI NEWS FEED */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Feed Column */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-stone-200 dark:border-stone-800">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900 dark:text-stone-100">
                Latest AI & Emerging Tech Developments
              </h2>
              <button 
                onClick={() => onNavigate('ai-news')}
                className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline"
              >
                All News →
              </button>
            </div>

            <div className="divide-y divide-stone-200 dark:divide-stone-800">
              {publishedArticles.slice(0, 5).map(art => (
                <ArticleCard
                  key={art.id}
                  article={art}
                  variant="horizontal"
                  onClick={() => onOpenArticle(art.slug)}
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar: Tools Worth Knowing & Quick Guides */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Tools Worth Knowing */}
            <div className="p-6 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-4">
                <Wrench className="w-4 h-4" />
                <span>Tools Worth Knowing</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 mb-4 font-serif">
                Software, diagnostic platforms, and hardware tested for real frontline utility.
              </p>

              <div className="space-y-3.5">
                <div className="p-3 rounded-xl bg-white dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80">
                  <span className="font-bold text-sm text-stone-900 dark:text-stone-100 block">
                    MeasureQuick + AI Diagnostics
                  </span>
                  <span className="text-xs text-stone-500 font-mono block mt-0.5">
                    Field HVAC electrical & psychrometrics
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80">
                  <span className="font-bold text-sm text-stone-900 dark:text-stone-100 block">
                    Carbon Robotics LaserWeeder
                  </span>
                  <span className="text-xs text-stone-500 font-mono block mt-0.5">
                    Autonomous sub-millimeter agricultural laser
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80">
                  <span className="font-bold text-sm text-stone-900 dark:text-stone-100 block">
                    Dusty Robotics FieldPrinter
                  </span>
                  <span className="text-xs text-stone-500 font-mono block mt-0.5">
                    Automated full-scale BIM layout on slabs
                  </span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('tools')}
                className="mt-4 w-full py-2.5 rounded-lg bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-xs font-mono font-medium text-stone-800 dark:text-stone-200 transition-colors text-center block"
              >
                Browse All Field Tools →
              </button>
            </div>

            {/* Practical Guides Widget */}
            <div className="p-6 rounded-2xl bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/30">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
                <BookOpen className="w-4 h-4" />
                <span>Practical Guides & Prompts</span>
              </div>
              <h3 className="font-sans font-bold text-base text-stone-900 dark:text-stone-100 mb-2">
                How an HVAC Technician Could Use ChatGPT on a Service Call
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 font-serif leading-relaxed mb-4">
                Step-by-step workflow with copyable prompt templates for psychrometrics, wiring diagrams, and customer invoice writing.
              </p>
              <button
                onClick={() => onOpenArticle('how-an-hvac-technician-could-use-chatgpt-on-a-service-call')}
                className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center"
              >
                <span>Read Full Step-by-Step Guide</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* TAILOR TRENDS DEEP DIVES */}
      <section className="py-16 bg-stone-900 text-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-stone-800">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block mb-1">
                LONG-FORM INVESTIGATIONS
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
                Tailor Trends Deep Dives
              </h2>
              <p className="text-stone-400 font-serif text-base mt-1">
                Rigorous economic analysis, labor impact models, and multi-year outlooks.
              </p>
            </div>
            <button
              onClick={() => onNavigate('deep-dives')}
              className="mt-4 sm:mt-0 text-sm font-semibold text-amber-400 hover:underline flex items-center"
            >
              <span>Explore all deep dives</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deepDives.map(art => (
              <div 
                key={art.id}
                onClick={() => onOpenArticle(art.slug)}
                className="group cursor-pointer flex flex-col justify-between bg-stone-800/80 rounded-2xl p-6 border border-stone-700 hover:border-amber-500 transition-all duration-300"
              >
                <div>
                  <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-stone-700">
                    <img 
                      src={art.coverImage} 
                      alt={art.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                    {art.primaryIndustry}
                  </span>
                  <h3 className="font-sans font-bold text-lg text-white mt-1 group-hover:text-amber-400 transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="mt-2 text-xs text-stone-400 font-serif line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-700 flex items-center justify-between text-xs font-mono text-stone-400">
                  <span>{art.readingTimeMinutes} min read</span>
                  <span className="text-amber-400 flex items-center group-hover:translate-x-1 transition-transform">
                    Read Report →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterSection sourcePage="homepage" />
      </div>
    </div>
  );
};
