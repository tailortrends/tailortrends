import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Plus, Lightbulb, ArrowRight, Layers, HelpCircle, ShieldCheck } from 'lucide-react';
import { usePublishing } from '../../context/PublishingContext.tsx';
import { StoryIdea } from '../../types/index.ts';

interface AdminStoryIdeaEngineProps {
  onNavigate: (route: string) => void;
  onEditArticle: (id: string) => void;
}

export const AdminStoryIdeaEngine: React.FC<AdminStoryIdeaEngineProps> = ({ onNavigate, onEditArticle }) => {
  const { storyIdeas, addStoryIdea, createArticle, callAiAssistant, industries } = usePublishing();
  const [selectedTech, setSelectedTech] = useState('Computer Vision');
  const [selectedIndustry, setSelectedIndustry] = useState('HVAC');
  const [generating, setGenerating] = useState(false);

  const technologies = [
    'Computer Vision',
    'AI Agents',
    'Robotics & Automation',
    'Generative AI',
    'Machine Learning',
    '3D Printing & Additive',
    'Acoustic Telemetry',
    'Spatial Computing / HUDs',
    'Edge AI & Local NPUs'
  ];

  const handleGenerateIdeas = async () => {
    setGenerating(true);
    try {
      const res = await callAiAssistant({
        task: 'story-ideas',
        topic: `${selectedTech} in ${selectedIndustry}`,
        industry: selectedIndustry
      });
      
      // Add as a new story idea
      await addStoryIdea({
        technology: selectedTech,
        industry: selectedIndustry,
        possibleHeadline: `How ${selectedTech} Is Solving Critical Diagnostic Bottlenecks in ${selectedIndustry}`,
        whyTheTopicMatters: `Frontline operators in ${selectedIndustry} face severe labor constraints. Applying ${selectedTech} allows junior technicians to operate with senior-level accuracy.`,
        questionsWorthInvestigating: [
          `What is the minimum physical sensor tolerance required for ${selectedTech} in ${selectedIndustry}?`,
          `How are OEMs handling warranty compliance when AI recommendations are followed?`,
          `What is the payback period for a mid-sized contractor adopting this technology?`
        ],
        possibleSources: ['Trade Association Technical Committee', 'Lead Equipment Manufacturer', 'Field Test Engineering Data'],
        potentialIndustryImpact: 'Estimated 25-35% reduction in diagnostic callback visits and warranty disputes.'
      });
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  const handleTurnIntoArticle = async (idea: StoryIdea) => {
    const matchedIndustry = industries.find(i => i.name.toLowerCase().includes(idea.industry.toLowerCase()))?.slug || 'hvac';
    const newArt = await createArticle({
      title: idea.possibleHeadline,
      subheadline: idea.whyTheTopicMatters,
      primaryIndustry: matchedIndustry,
      status: 'draft',
      type: 'ai_in_industry',
      whyThisMatters: idea.whyTheTopicMatters,
      tags: [idea.industry, idea.technology, 'Field Diagnostics'],
      blocks: [
        {
          id: 'b1',
          type: 'paragraph',
          content: `When ${idea.technology} meets ${idea.industry}, the question is not whether the technology is mathematically impressive—it is whether it holds up when a technician or operator is working under pressure.`
        },
        {
          id: 'b2',
          type: 'h2',
          content: 'The Core Industry Problem'
        },
        {
          id: 'b3',
          type: 'paragraph',
          content: idea.potentialIndustryImpact
        }
      ]
    });
    onEditArticle(newArt.id);
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
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                EDITORIAL ENGINE
              </span>
              <h1 className="font-display font-bold text-3xl text-stone-900 dark:text-stone-50">
                Technology + Industry Story Matrix
              </h1>
            </div>
          </div>
        </div>

        {/* Matrix Generator Generator Box */}
        <div className="my-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase text-amber-600 dark:text-amber-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Technology × Industry Combinator</span>
            </div>
            <h2 className="font-display font-bold text-2xl text-stone-900 dark:text-stone-100">
              Generate High-Impact Editorial Angles
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-serif mt-1">
              Select an emerging capability and a physical trade sector to generate non-hype, practical investigative story leads.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-mono text-stone-500 uppercase block mb-1">
                Technology Capability
              </label>
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="w-full text-xs font-sans p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700"
              >
                {technologies.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-mono text-stone-500 uppercase block mb-1">
                Real-World Industry
              </label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full text-xs font-sans p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700"
              >
                {industries.map(i => (
                  <option key={i.id} value={i.name}>{i.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleGenerateIdeas}
              disabled={generating}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono font-bold text-xs flex items-center space-x-2 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{generating ? 'Analyzing Matrix with Gemini...' : `Generate Story Idea (${selectedTech} + ${selectedIndustry})`}</span>
            </button>
          </div>
        </div>

        {/* Story Ideas Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
            <span className="text-xs font-mono font-bold uppercase text-stone-500">
              Active Story Ideas ({storyIdeas.length})
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {storyIdeas.map(idea => (
              <div 
                key={idea.id}
                className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col justify-between shadow-xs hover:border-amber-500 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 uppercase">
                      {idea.technology} + {idea.industry}
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">{idea.dateAdded}</span>
                  </div>

                  <h3 className="font-sans font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 leading-snug">
                    {idea.possibleHeadline}
                  </h3>

                  <div>
                    <span className="text-[11px] font-mono font-bold text-stone-500 uppercase block mb-1">
                      Why The Topic Matters:
                    </span>
                    <p className="text-xs font-serif text-stone-700 dark:text-stone-300 leading-relaxed">
                      {idea.whyTheTopicMatters}
                    </p>
                  </div>

                  {idea.questionsWorthInvestigating && idea.questionsWorthInvestigating.length > 0 && (
                    <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                      <span className="text-[11px] font-mono font-bold text-stone-500 uppercase block mb-1">
                        Questions to Investigate:
                      </span>
                      <ul className="space-y-1">
                        {idea.questionsWorthInvestigating.map((q, idx) => (
                          <li key={idx} className="text-xs text-stone-600 dark:text-stone-400 flex items-start">
                            <span className="text-amber-500 mr-1.5">•</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      onNavigate('admin-research');
                    }}
                    className="text-xs font-mono text-stone-500 hover:text-stone-900 dark:hover:text-stone-200"
                  >
                    Open in Research Hub
                  </button>

                  <button
                    onClick={() => handleTurnIntoArticle(idea)}
                    className="px-4 py-2 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-amber-500 dark:hover:bg-amber-400 dark:hover:text-stone-950 rounded-xl text-xs font-mono font-bold flex items-center space-x-1.5 transition-colors"
                  >
                    <span>Turn Into Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
