import React from 'react';
import { ShieldCheck, CheckCircle2, Award, Users, Compass, ArrowRight } from 'lucide-react';
import { SeoHead } from '../components/common/SeoHead.tsx';
import { usePublishing } from '../context/PublishingContext.tsx';

interface AboutPageProps {
  onNavigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { authors } = usePublishing();

  return (
    <div className="min-h-screen py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <SeoHead
        title="About Tailor Trends — Mission, Editorial Standards & Principles"
        description="Follow the trend. Understand the technology. See how it changes the real world. Learn about our editorial guidelines and team."
      />

      {/* Main Brand Mission */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block mb-3">
          ABOUT TAILOR TRENDS
        </span>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-stone-900 dark:text-stone-50 tracking-tight leading-tight">
          Technology Explained for the Real World.
        </h1>
        <p className="mt-4 text-xl sm:text-2xl text-stone-600 dark:text-stone-300 font-serif italic">
          "Follow the trend. Understand the technology. See how it changes the real world."
        </p>
      </div>

      <div className="prose prose-stone dark:prose-invert max-w-none font-serif text-lg leading-relaxed text-stone-800 dark:text-stone-200 space-y-6">
        <p className="editorial-drop-cap">
          Tailor Trends was founded on a simple observation: modern technology reporting is broken. 
          When a major research lab or startup releases an artificial intelligence model, tech journalism rushes to churn out sensational headlines about the impending replacement of all human labor. 
          Meanwhile, the people actually running the physical economy—HVAC contractors, general builders, commercial real estate underwriters, farmers, mechanics, and clinic directors—are left asking: 
          <em> What does this actually do? Can I use it on a jobsite today? Or is this just more Silicon Valley hype?</em>
        </p>

        <p>
          We do not write generic press-release rewrites. We do not participate in cryptocurrency or AI token speculation. 
          Our focus is the intersection of modern computation with physical work and real business operations.
        </p>
      </div>

      {/* The 6 Editorial Questions */}
      <div className="my-14 p-8 rounded-3xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
        <h2 className="font-display font-bold text-2xl text-stone-900 dark:text-stone-100 mb-6 text-center">
          The Tailor Trends Six-Question Standard
        </h2>
        <p className="text-sm font-serif text-stone-600 dark:text-stone-400 text-center max-w-xl mx-auto mb-8">
          Every deep dive, guide, and field breakdown on Tailor Trends is measured against six foundational questions:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700">
            <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 block mb-1">1. WHAT HAPPENED?</span>
            <p className="text-sm text-stone-700 dark:text-stone-300 font-sans">
              The factual event or technological release, stripped of vendor hyperbole.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700">
            <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 block mb-1">2. WHY DOES IT MATTER?</span>
            <p className="text-sm text-stone-700 dark:text-stone-300 font-sans">
              The concrete economic, labor, or operational pain point it attempts to solve.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700">
            <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 block mb-1">3. WHAT DOES THE TECH ACTUALLY DO?</span>
            <p className="text-sm text-stone-700 dark:text-stone-300 font-sans">
              Plain-language explanation of underlying models, sensors, physical mechanics, and limitations.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700">
            <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 block mb-1">4. HOW COULD THIS AFFECT A SPECIFIC INDUSTRY?</span>
            <p className="text-sm text-stone-700 dark:text-stone-300 font-sans">
              Workflow comparisons: how work is traditionally done vs how new tools modify it.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700">
            <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 block mb-1">5. HOW COULD AN INDIVIDUAL OR BUSINESS USE IT?</span>
            <p className="text-sm text-stone-700 dark:text-stone-300 font-sans">
              Actionable step-by-step guides, copyable prompts, tool requirements, and safety warnings.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700">
            <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 block mb-1">6. WHAT SHOULD WE WATCH NEXT?</span>
            <p className="text-sm text-stone-700 dark:text-stone-300 font-sans">
              Milestones, upcoming regulatory codes, hardware roadmaps, and timeline projections.
            </p>
          </div>
        </div>
      </div>

      {/* Editorial Principles & Fact-Checking */}
      <div className="my-12 space-y-6">
        <h2 className="font-display font-bold text-2xl text-stone-900 dark:text-stone-100">
          Source Verification & Anti-Hallucination Policy
        </h2>
        <div className="space-y-3 font-serif text-stone-700 dark:text-stone-300 text-base leading-relaxed">
          <p>
            We maintain strict boundaries between <strong>confirmed physical facts</strong>, 
            <strong>industry consensus analysis</strong>, and <strong>future speculation</strong>.
          </p>
          <p>
            Every factual claim regarding equipment specifications, labor statistics, and model capabilities includes primary source citations with direct links, publication dates, and access records. 
            We never present AI-generated hallucinations as verified physical reality.
          </p>
        </div>
      </div>

      {/* Editorial Team */}
      <div className="my-12">
        <h2 className="font-display font-bold text-2xl text-stone-900 dark:text-stone-100 mb-6">
          Editorial Masthead
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {authors.map(author => (
            <div key={author.id} className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center">
              <img 
                src={author.avatar} 
                alt={author.name}
                className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-stone-200 dark:border-stone-700" 
              />
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">
                {author.name}
              </h3>
              <span className="text-xs font-mono text-amber-600 dark:text-amber-400 block mb-2">
                {author.role}
              </span>
              <p className="text-xs text-stone-600 dark:text-stone-400 font-serif leading-relaxed">
                {author.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Back to Home CTA */}
      <div className="pt-8 border-t border-stone-200 dark:border-stone-800 text-center">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center space-x-2 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:underline"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
