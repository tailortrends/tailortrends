import React, { useState } from 'react';
import { 
  Zap, 
  Layers, 
  Sparkles, 
  Terminal, 
  Copy, 
  Check, 
  Eye, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle,
  Building,
  Calendar,
  Clock
} from 'lucide-react';
import { SourceCitation } from '../../types/index.ts';

// 1. Why This Matters Card
export const WhyThisMattersCard: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="my-8 p-6 rounded-xl bg-amber-500/10 border-l-4 border-amber-500 dark:bg-amber-950/30 text-stone-900 dark:text-stone-100">
      <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 font-mono text-xs uppercase tracking-wider font-bold mb-2">
        <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
        <span>Why This Matters</span>
      </div>
      <p className="font-serif text-lg leading-relaxed text-stone-800 dark:text-stone-200">
        {text}
      </p>
    </div>
  );
};

// 2. Industry Impact Badge & Breakdown
export const IndustryImpactCard: React.FC<{
  summary: string;
  industriesAffected?: Array<{ name: string; impact: string }>;
}> = ({ summary, industriesAffected }) => {
  return (
    <div className="my-8 p-6 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
      <div className="flex items-center space-x-2 text-stone-700 dark:text-stone-300 font-mono text-xs uppercase tracking-wider font-bold mb-3">
        <Layers className="w-4 h-4 text-stone-600 dark:text-stone-400" />
        <span>Industry Impact Analysis</span>
      </div>
      <p className="text-stone-700 dark:text-stone-300 mb-4 font-sans text-sm sm:text-base leading-relaxed">
        {summary}
      </p>

      {industriesAffected && industriesAffected.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-stone-200 dark:border-stone-800">
          {industriesAffected.map((item, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
              <span className="font-semibold text-stone-900 dark:text-stone-100 text-xs sm:text-sm block">
                {item.name}
              </span>
              <span className="text-xs text-stone-600 dark:text-stone-400 mt-1 block">
                {item.impact}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 3. Tailor Trends Takeaway
export const TailorTrendsTakeawayCard: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="my-10 p-6 sm:p-8 rounded-2xl bg-stone-900 text-stone-100 dark:bg-stone-900 dark:border dark:border-amber-500/30 shadow-md">
      <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs uppercase tracking-widest font-bold mb-3">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span>Tailor Trends Takeaway</span>
      </div>
      <p className="font-serif text-xl sm:text-2xl leading-relaxed text-stone-100 font-normal italic">
        "{text}"
      </p>
      <div className="mt-4 pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 font-mono">
        <span>The Bottom Line for Operators</span>
        <span className="text-amber-400 font-medium">Tailor Trends Editorial Verdict</span>
      </div>
    </div>
  );
};

// 4. Try It Yourself (with interactive copy buttons)
export const TryItYourselfCard: React.FC<{
  data: {
    title: string;
    toolName: string;
    workflowStepByStep: string[];
    prompts: Array<{ label: string; promptText: string; expectedResult?: string }>;
    safetyConsiderations?: string;
  };
}> = ({ data }) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(index);
    setTimeout(() => setCopiedIdx(null), 2500);
  };

  return (
    <div className="my-10 rounded-2xl border-2 border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 overflow-hidden shadow-sm">
      <div className="bg-stone-100 dark:bg-stone-800 px-6 py-4 border-b border-stone-200 dark:border-stone-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3 className="font-bold font-sans text-base text-stone-900 dark:text-stone-100">
            Try It Yourself: {data.title}
          </h3>
        </div>
        <span className="inline-block px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 self-start sm:self-auto">
          Tool: {data.toolName}
        </span>
      </div>

      <div className="p-6 space-y-6">
        {/* Step-by-Step Workflow */}
        <div>
          <h4 className="font-mono text-xs uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400 mb-3">
            Recommended Workflow Protocol
          </h4>
          <ol className="space-y-2">
            {data.workflowStepByStep.map((step, idx) => (
              <li key={idx} className="flex items-start text-sm text-stone-700 dark:text-stone-300">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center font-mono text-xs font-bold mr-3 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Copyable Prompts */}
        {data.prompts && data.prompts.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400">
              Field-Tested Example Prompts (Click to Copy)
            </h4>
            {data.prompts.map((p, idx) => (
              <div 
                key={idx}
                className="rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 p-4 relative group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-sans font-semibold text-xs text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                    {p.label}
                  </span>
                  <button
                    onClick={() => handleCopy(p.promptText, idx)}
                    className="flex items-center space-x-1 px-2.5 py-1 rounded bg-stone-200 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 text-xs font-mono text-stone-800 dark:text-stone-200 transition-colors"
                  >
                    {copiedIdx === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="font-mono text-xs text-stone-800 dark:text-stone-200 whitespace-pre-wrap leading-relaxed select-all bg-white dark:bg-stone-900 p-3 rounded-lg border border-stone-200/80 dark:border-stone-800">
                  {p.promptText}
                </p>
                {p.expectedResult && (
                  <div className="mt-2 text-xs text-stone-600 dark:text-stone-400 flex items-start space-x-1.5 font-sans">
                    <span className="font-bold text-stone-700 dark:text-stone-300">Expected Output:</span>
                    <span>{p.expectedResult}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Safety & Physical Considerations */}
        {data.safetyConsiderations && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-start space-x-3 text-xs text-rose-900 dark:text-rose-200">
            <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold uppercase tracking-wider block mb-1">Safety & Verification Protocol:</span>
              <p className="leading-relaxed">{data.safetyConsiderations}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 5. What to Watch (Milestones & Roadmap)
export const WhatToWatchTimeline: React.FC<{
  milestones: Array<{ milestone: string; timeline: string; reason: string }>;
}> = ({ milestones }) => {
  return (
    <div className="my-10 p-6 sm:p-8 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
      <div className="flex items-center space-x-2 text-stone-900 dark:text-stone-100 font-mono text-xs uppercase tracking-wider font-bold mb-6">
        <Eye className="w-4 h-4 text-amber-500" />
        <span>What to Watch: Next Signals & Milestones</span>
      </div>
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-stone-300 dark:before:bg-stone-800">
        {milestones.map((m, idx) => (
          <div key={idx} className="relative pl-8">
            <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-stone-100 dark:ring-stone-900 -translate-x-1/2" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
              <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base">
                {m.milestone}
              </h4>
              <span className="font-mono text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded self-start sm:self-auto mt-1 sm:mt-0">
                {m.timeline}
              </span>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {m.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// 6. Verified Sources Component
export const VerifiedSourcesList: React.FC<{ sources: SourceCitation[] }> = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t-2 border-stone-200 dark:border-stone-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="font-mono text-xs uppercase font-bold tracking-wider text-stone-900 dark:text-stone-100">
            Verified Primary Sources ({sources.length})
          </h3>
        </div>
        <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
          Editorial Standard: Factual claims backed by primary publications
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sources.map((src) => (
          <a
            key={src.id}
            href={src.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-500 dark:hover:border-amber-500 bg-stone-50 dark:bg-stone-900/60 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-mono mb-1.5">
                <span className="font-medium text-stone-700 dark:text-stone-300">
                  {src.publication}
                </span>
                <span className="flex items-center text-emerald-600 dark:text-emerald-400">
                  <Check className="w-3 h-3 mr-0.5" />
                  Verified
                </span>
              </div>
              <h4 className="font-sans font-semibold text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 line-clamp-2 transition-colors">
                {src.sourceTitle}
              </h4>
            </div>

            <div className="mt-3 pt-2 border-t border-stone-200/60 dark:border-stone-800/60 flex items-center justify-between text-[11px] font-mono text-stone-500">
              <span>Published: {src.publicationDate}</span>
              <span className="flex items-center text-stone-600 dark:text-stone-400 group-hover:underline">
                View Source <ExternalLink className="w-3 h-3 ml-1" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
