import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  FileText, 
  Quote, 
  BarChart3, 
  Link as LinkIcon, 
  HelpCircle, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  Layers,
  Building
} from 'lucide-react';
import { usePublishing } from '../../context/PublishingContext.tsx';
import { ResearchProject, ResearchNote, BlockType } from '../../types/index.ts';

interface AdminResearchWorkspaceProps {
  onNavigate: (route: string) => void;
  onEditArticle: (id: string) => void;
}

export const AdminResearchWorkspace: React.FC<AdminResearchWorkspaceProps> = ({ onNavigate, onEditArticle }) => {
  const { researchProjects, createResearchProject, addResearchNote, createArticle, callAiAssistant, industries } = usePublishing();
  const [selectedProjectId, setSelectedProjectId] = useState<string>(researchProjects[0]?.id || '');
  const [newTopic, setNewTopic] = useState('');
  const [newIndustry, setNewIndustry] = useState('hvac');
  const [noteType, setNoteType] = useState<ResearchNote['type']>('note');
  const [noteContent, setNoteContent] = useState('');
  const [noteSourceUrl, setNoteSourceUrl] = useState('');
  const [noteAuthor, setNoteAuthor] = useState('');
  const [synthesizing, setSynthesizing] = useState(false);
  const [synthesisOutput, setSynthesisOutput] = useState('');

  const currentProject = researchProjects.find(p => p.id === selectedProjectId) || researchProjects[0];

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim()) return;
    const proj = await createResearchProject({
      topic: newTopic,
      industry: newIndustry,
      status: 'research',
      questionsToInvestigate: [
        'What specific problem does this solve for frontline workers?',
        'What tools are currently available vs experimental?',
        'What safety or regulatory codes must be verified?'
      ]
    });
    setSelectedProjectId(proj.id);
    setNewTopic('');
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim() || !currentProject) return;
    await addResearchNote(currentProject.id, {
      type: noteType,
      content: noteContent,
      sourceUrl: noteSourceUrl || undefined,
      authorOrSpeaker: noteAuthor || undefined
    });
    setNoteContent('');
    setNoteSourceUrl('');
    setNoteAuthor('');
  };

  const handleSynthesizeWithAi = async () => {
    if (!currentProject) return;
    setSynthesizing(true);
    try {
      const notesSummary = currentProject.notes.map(n => `[${n.type.toUpperCase()}] ${n.content} (Source: ${n.sourceUrl || n.authorOrSpeaker || 'Field note'})`).join('\n');
      const res = await callAiAssistant({
        task: 'generate-outline',
        topic: currentProject.topic,
        industry: currentProject.industry,
        context: notesSummary
      });
      setSynthesisOutput(res.result);
    } catch (err) {
      console.error(err);
    } finally {
      setSynthesizing(false);
    }
  };

  const handleConvertToArticle = async () => {
    if (!currentProject) return;
    const newArt = await createArticle({
      title: `${currentProject.topic}: A Field-Tested Breakdown`,
      subheadline: `Research findings and operational impact for ${currentProject.industry.toUpperCase()} operators.`,
      primaryIndustry: currentProject.industry,
      status: 'draft',
      type: currentProject.targetArticleType,
      blocks: [
        {
          id: 'b1',
          type: 'paragraph',
          content: `Investigation into ${currentProject.topic}: How emerging technology is entering the ${currentProject.industry} workflow.`
        },
        ...currentProject.notes.map((n, idx) => ({
          id: `b-note-${idx}`,
          type: (n.type === 'quote' ? 'quote' : 'paragraph') as BlockType,
          content: n.content
        }))
      ]
    });
    onEditArticle(newArt.id);
  };

  const workflowStages = [
    { id: 'idea', label: '1. IDEA' },
    { id: 'research', label: '2. RESEARCH' },
    { id: 'outline', label: '3. OUTLINE' },
    { id: 'draft', label: '4. DRAFT' },
    { id: 'fact_check', label: '5. FACT CHECK' },
    { id: 'edit', label: '6. EDIT' },
    { id: 'publish', label: '7. PUBLISH' }
  ];

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
                EDITORIAL INVESTIGATION BOARD
              </span>
              <h1 className="font-display font-bold text-3xl text-stone-900 dark:text-stone-50">
                AI Article Research Workspace
              </h1>
            </div>
          </div>

          {currentProject && (
            <button
              onClick={handleConvertToArticle}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono font-bold text-xs flex items-center space-x-1.5 shadow-sm"
            >
              <span>Convert to Draft Article</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Workflow Stages Tracker */}
        <div className="my-6 p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between overflow-x-auto text-xs font-mono">
          {workflowStages.map((st, i) => (
            <div key={st.id} className="flex items-center space-x-2 flex-shrink-0 px-3">
              <span className={`px-2.5 py-1 rounded-md font-bold ${
                i <= 1 
                  ? 'bg-amber-500 text-stone-950' 
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
              }`}>
                {st.label}
              </span>
              {i < workflowStages.length - 1 && (
                <span className="text-stone-300 dark:text-stone-700">→</span>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Projects List & Add Form */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* New Topic Card */}
            <form onSubmit={handleCreateProject} className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-stone-500 block">
                Start New Research Topic
              </span>
              <input
                type="text"
                required
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="e.g. Acoustic diagnostics in commercial chillers"
                className="w-full text-xs font-sans p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700"
              />
              <div className="flex gap-2">
                <select
                  value={newIndustry}
                  onChange={(e) => setNewIndustry(e.target.value)}
                  className="flex-1 text-xs font-sans p-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700"
                >
                  {industries.map(i => (
                    <option key={i.id} value={i.slug}>{i.name}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="px-3 py-2 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-lg text-xs font-mono font-bold"
                >
                  Create
                </button>
              </div>
            </form>

            {/* Active Research Projects */}
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-stone-500 block mb-3">
                Active Research Projects ({researchProjects.length})
              </span>
              {researchProjects.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProjectId(p.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all ${
                    p.id === currentProject?.id
                      ? 'bg-amber-500/15 border-2 border-amber-500 text-stone-900 dark:text-stone-100 font-bold'
                      : 'hover:bg-stone-100 dark:hover:bg-stone-800 border border-transparent text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 uppercase block">
                    {p.industry}
                  </span>
                  <span className="text-sm block line-clamp-2">{p.topic}</span>
                  <span className="text-[10px] font-mono text-stone-500 block mt-1">
                    {p.notes.length} notes collected
                  </span>
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Project Details, Notes Collector & Synthesis */}
          <div className="lg:col-span-8 space-y-6">
            
            {currentProject ? (
              <>
                <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold uppercase text-amber-600 dark:text-amber-400">
                      Sector: {currentProject.industry.toUpperCase()}
                    </span>
                    <button
                      onClick={handleSynthesizeWithAi}
                      disabled={synthesizing}
                      className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline flex items-center"
                    >
                      <Sparkles className="w-3.5 h-3.5 mr-1" />
                      <span>{synthesizing ? 'Synthesizing with Gemini...' : 'Synthesize Notes into Outline →'}</span>
                    </button>
                  </div>
                  <h2 className="font-display font-bold text-2xl text-stone-900 dark:text-stone-100">
                    {currentProject.topic}
                  </h2>
                </div>

                {/* Synthesis Output if present */}
                {synthesisOutput && (
                  <div className="p-6 rounded-2xl bg-stone-900 text-stone-100 border border-amber-500/40">
                    <span className="text-xs font-mono font-bold uppercase text-amber-400 block mb-2">
                      Gemini 3.8 Research Synthesis
                    </span>
                    <div className="text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                      {synthesisOutput}
                    </div>
                  </div>
                )}

                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase text-stone-500">
                      Collect Research Data
                    </span>
                    
                    {/* Note Type Selector */}
                    <div className="flex items-center space-x-1.5 text-xs font-mono">
                      {(['note', 'stat', 'quote', 'source', 'question'] as const).map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setNoteType(t)}
                          className={`px-2.5 py-1 rounded-md uppercase font-bold text-[10px] ${
                            noteType === t
                              ? 'bg-amber-500 text-stone-950'
                              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    rows={3}
                    required
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder={`Enter verified ${noteType} (e.g. quote from a master technician, equipment failure statistic, or specific sensor capability)...`}
                    className="w-full text-xs font-sans p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="url"
                      value={noteSourceUrl}
                      onChange={(e) => setNoteSourceUrl(e.target.value)}
                      placeholder="Source URL (optional)"
                      className="text-xs font-mono p-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700"
                    />
                    <input
                      type="text"
                      value={noteAuthor}
                      onChange={(e) => setNoteAuthor(e.target.value)}
                      placeholder="Speaker / Author / Organization"
                      className="text-xs font-sans p-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-xl text-xs font-mono font-bold flex items-center space-x-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Save {noteType.toUpperCase()} to Repository</span>
                  </button>
                </form>

                {/* Collected Notes Feed */}
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold uppercase text-stone-500 block">
                    Collected Notes & Data Points ({currentProject.notes.length})
                  </span>
                  {currentProject.notes.map(n => (
                    <div key={n.id} className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                      <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 mb-1">
                        <span className="uppercase font-bold text-amber-600 dark:text-amber-400">
                          {n.type}
                        </span>
                        <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="font-serif text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                        {n.content}
                      </p>
                      {(n.authorOrSpeaker || n.sourceUrl) && (
                        <div className="mt-2 text-xs font-mono text-stone-500 flex items-center space-x-2">
                          {n.authorOrSpeaker && <span>— {n.authorOrSpeaker}</span>}
                          {n.sourceUrl && (
                            <a href={n.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 hover:underline">
                              [Source Link]
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-2xl p-8">
                <p>Create a research topic to get started.</p>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
