import React, { useState, useEffect } from 'react';
import { 
  Save, 
  ArrowLeft, 
  Eye, 
  Sparkles, 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  Check, 
  Link, 
  ShieldCheck, 
  Share2, 
  Clock, 
  Layers,
  HelpCircle,
  AlertTriangle,
  Send,
  Zap,
  Tag as TagIcon
} from 'lucide-react';
import { usePublishing } from '../../context/PublishingContext.tsx';
import { Article, ArticleBlock, BlockType, ArticleStatus, ArticleType, SourceCitation } from '../../types/index.ts';

interface AdminArticleEditorProps {
  articleId?: string;
  onNavigate: (route: string) => void;
  onOpenArticle: (slug: string) => void;
}

export const AdminArticleEditor: React.FC<AdminArticleEditorProps> = ({ 
  articleId, 
  onNavigate,
  onOpenArticle 
}) => {
  const { getArticleById, createArticle, updateArticle, industries, authors, callAiAssistant } = usePublishing();
  
  const existingArticle = articleId ? getArticleById(articleId) : undefined;

  // Form State
  const [title, setTitle] = useState(existingArticle?.title || '');
  const [subheadline, setSubheadline] = useState(existingArticle?.subheadline || '');
  const [slug, setSlug] = useState(existingArticle?.slug || '');
  const [primaryIndustry, setPrimaryIndustry] = useState(existingArticle?.primaryIndustry || 'hvac');
  const [type, setType] = useState<ArticleType>(existingArticle?.type || 'ai_in_industry');
  const [status, setStatus] = useState<ArticleStatus>(existingArticle?.status || 'draft');
  const [authorId, setAuthorId] = useState(existingArticle?.author?.id || authors[0]?.id);
  const [coverImage, setCoverImage] = useState(existingArticle?.coverImage || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1400&q=80');
  const [coverImageCaption, setCoverImageCaption] = useState(existingArticle?.coverImageCaption || '');
  const [readingTime, setReadingTime] = useState(existingArticle?.readingTimeMinutes || 6);
  const [tagInput, setTagInput] = useState(existingArticle?.tags?.join(', ') || 'HVAC, Diagnostics, Field Service');
  
  // Special Blocks State
  const [whyThisMatters, setWhyThisMatters] = useState(existingArticle?.whyThisMatters || '');
  const [takeaway, setTakeaway] = useState(existingArticle?.takeaway || '');
  
  // Structured Content Blocks
  const [blocks, setBlocks] = useState<ArticleBlock[]>(existingArticle?.blocks || [
    { id: 'b1', type: 'paragraph', content: 'Begin writing your field analysis here. Connect the technological breakthrough directly to real-world operations.' },
    { id: 'b2', type: 'h2', content: 'What the Technology Actually Does' },
    { id: 'b3', type: 'paragraph', content: 'Explain the underlying physical mechanisms, models, or sensor feeds.' }
  ]);

  // Sources
  const [sources, setSources] = useState<SourceCitation[]>(existingArticle?.sources || [
    {
      id: 'src-1',
      publication: 'Air Conditioning Contractors of America (ACCA)',
      sourceTitle: 'Field Diagnostic Efficiency & Technician Retention Report',
      url: 'https://www.acca.org',
      publicationDate: '2025-11-12',
      dateAccessed: new Date().toISOString().split('T')[0],
      verified: true
    }
  ]);

  // SEO Metadata
  const [metaTitle, setMetaTitle] = useState(existingArticle?.seo?.metaTitle || '');
  const [metaDesc, setMetaDesc] = useState(existingArticle?.seo?.metaDescription || '');

  // UI state
  const [activeTab, setActiveTab] = useState<'editor' | 'special_components' | 'sources' | 'seo'>('editor');
  const [savedStatus, setSavedStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [aiAssistantOpen, setAiAssistantOpen] = useState(true);
  const [aiTask, setAiTask] = useState<string>('why-this-matters');
  const [aiOutput, setAiOutput] = useState<string>('');
  const [aiLoading, setAiLoading] = useState(false);
  const [currentArticleId, setCurrentArticleId] = useState<string | undefined>(articleId);

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!existingArticle) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  // Block Manipulation
  const addBlock = (blockType: BlockType) => {
    const newBlock: ArticleBlock = {
      id: `blk-${Date.now()}`,
      type: blockType,
      content: blockType === 'h2' ? 'New Section Heading' : blockType === 'quote' ? 'Key quote or field insight.' : 'Write paragraph content here...',
      extra: blockType === 'callout' ? { calloutVariant: 'insight' } : blockType === 'list' ? { items: ['Item 1', 'Item 2', 'Item 3'] } : undefined
    };
    setBlocks(prev => [...prev, newBlock]);
  };

  const updateBlockContent = (id: string, content: string) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, content } : b));
  };

  const removeBlock = (id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= blocks.length) return;
    const newBlocks = [...blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIdx];
    newBlocks[targetIdx] = temp;
    setBlocks(newBlocks);
  };

  // Sources manipulation
  const addSource = () => {
    const newSrc: SourceCitation = {
      id: `src-${Date.now()}`,
      publication: 'Primary Publication / Standards Body',
      sourceTitle: 'Study or Whitepaper Title',
      url: 'https://',
      publicationDate: new Date().toISOString().split('T')[0],
      dateAccessed: new Date().toISOString().split('T')[0],
      verified: true
    };
    setSources(prev => [...prev, newSrc]);
  };

  const updateSource = (id: string, field: keyof SourceCitation, value: any) => {
    setSources(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeSource = (id: string) => {
    setSources(prev => prev.filter(s => s.id !== id));
  };

  // Save / Publish
  const handleSave = async (overrideStatus?: ArticleStatus) => {
    setSavedStatus('saving');
    const selectedAuthor = authors.find(a => a.id === authorId) || authors[0];
    const tagArray = tagInput.split(',').map(t => t.trim()).filter(Boolean);

    const articleData: Partial<Article> = {
      title: title || 'Untitled Field Analysis',
      subheadline,
      excerpt: subheadline || (blocks[0]?.content.slice(0, 160) || ''),
      slug: slug || 'untitled-analysis',
      primaryIndustry,
      type,
      status: overrideStatus || status,
      author: selectedAuthor,
      coverImage,
      coverImageCaption,
      readingTimeMinutes: readingTime,
      tags: tagArray,
      blocks,
      whyThisMatters,
      takeaway,
      sources,
      seo: {
        metaTitle: metaTitle || `${title} | Tailor Trends`,
        metaDescription: metaDesc || subheadline || 'Practical technology analysis from Tailor Trends.'
      }
    };

    if (currentArticleId) {
      await updateArticle(currentArticleId, articleData);
    } else {
      const created = await createArticle(articleData);
      setCurrentArticleId(created.id);
    }

    if (overrideStatus) setStatus(overrideStatus);
    setSavedStatus('saved');
    setTimeout(() => setSavedStatus('idle'), 2500);
  };

  // Run AI Assistant
  const handleRunAi = async () => {
    if (!title && !whyThisMatters) {
      alert('Please enter at least an article headline or topic to assist.');
      return;
    }
    setAiLoading(true);
    setAiOutput('');
    try {
      const res = await callAiAssistant({
        task: aiTask,
        topic: title,
        industry: primaryIndustry,
        context: subheadline,
        draftText: blocks.map(b => b.content).join('\n\n'),
        targetType: type
      });
      setAiOutput(res.result);
    } catch (err) {
      console.error(err);
      setAiOutput('Failed to complete AI request.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100/60 dark:bg-stone-950 pb-24 text-stone-900 dark:text-stone-100">
      
      {/* Top Sticky Editor Bar */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('admin')}
              className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {currentArticleId ? 'Editing Article' : 'New Article'}
                </span>
                <span className="text-stone-400">•</span>
                <span className="text-xs font-mono text-stone-500">
                  Status: <strong className="uppercase text-stone-800 dark:text-stone-200">{status}</strong>
                </span>
              </div>
              <h2 className="font-sans font-bold text-sm text-stone-900 dark:text-stone-100 truncate max-w-xs sm:max-w-md">
                {title || 'Untitled Article'}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Auto/Manual Save Indicator */}
            {savedStatus === 'saving' && (
              <span className="text-xs font-mono text-amber-500 flex items-center">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping mr-1.5" />
                Saving...
              </span>
            )}
            {savedStatus === 'saved' && (
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center">
                <Check className="w-3.5 h-3.5 mr-1" />
                Saved!
              </span>
            )}

            {/* AI Assistant Toggle */}
            <button
              onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 transition-all ${
                aiAssistantOpen
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>

            {/* Preview Public Article (if published) */}
            {status === 'published' && slug && (
              <button
                onClick={() => onOpenArticle(slug)}
                className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 text-xs font-mono font-medium flex items-center space-x-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Preview</span>
              </button>
            )}

            {/* Save Draft */}
            <button
              onClick={() => handleSave('draft')}
              className="px-3.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-mono font-medium"
            >
              Save Draft
            </button>

            {/* Publish Button */}
            <button
              onClick={() => handleSave('published')}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold shadow-xs flex items-center space-x-1"
            >
              <span>Publish</span>
            </button>
          </div>

        </div>
      </div>

      {/* Editor Body Grid: Workspace + AI Assistant */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Workspace Column */}
          <div className={`space-y-6 ${aiAssistantOpen ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
            
            {/* Editor Sub-Tabs */}
            <div className="flex border-b border-stone-200 dark:border-stone-800 text-xs font-mono font-bold">
              <button
                onClick={() => setActiveTab('editor')}
                className={`py-3 px-4 border-b-2 transition-colors ${
                  activeTab === 'editor'
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-white/60 dark:bg-stone-900/60'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                1. Headline & Content Blocks
              </button>
              <button
                onClick={() => setActiveTab('special_components')}
                className={`py-3 px-4 border-b-2 transition-colors ${
                  activeTab === 'special_components'
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-white/60 dark:bg-stone-900/60'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                2. Why Matters & Takeaway
              </button>
              <button
                onClick={() => setActiveTab('sources')}
                className={`py-3 px-4 border-b-2 transition-colors ${
                  activeTab === 'sources'
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-white/60 dark:bg-stone-900/60'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                3. Primary Sources ({sources.length})
              </button>
              <button
                onClick={() => setActiveTab('seo')}
                className={`py-3 px-4 border-b-2 transition-colors ${
                  activeTab === 'seo'
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-white/60 dark:bg-stone-900/60'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                4. SEO & Canonical Metadata
              </button>
            </div>

            {/* TAB 1: HEADLINE & CONTENT BLOCKS */}
            {activeTab === 'editor' && (
              <div className="space-y-6">
                
                {/* Meta Configuration Card */}
                <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-stone-500 uppercase block mb-1">
                        Primary Industry
                      </label>
                      <select
                        value={primaryIndustry}
                        onChange={(e) => setPrimaryIndustry(e.target.value)}
                        className="w-full text-xs font-sans p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700"
                      >
                        {industries.map(i => (
                          <option key={i.id} value={i.slug}>{i.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-stone-500 uppercase block mb-1">
                        Content Format
                      </label>
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value as ArticleType)}
                        className="w-full text-xs font-sans p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700"
                      >
                        <option value="ai_in_industry">AI in Industry (Deep Dive)</option>
                        <option value="ai_news">AI News (Fast Update)</option>
                        <option value="tool_breakdown">Tool Breakdown</option>
                        <option value="trend_analysis">Trend Analysis</option>
                        <option value="practical_guide">Practical Guide</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-stone-500 uppercase block mb-1">
                        Author
                      </label>
                      <select
                        value={authorId}
                        onChange={(e) => setAuthorId(e.target.value)}
                        className="w-full text-xs font-sans p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700"
                      >
                        {authors.map(a => (
                          <option key={a.id} value={a.id}>{a.name} ({a.role})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-stone-500 uppercase block mb-1">
                      Article Headline (Directly connects tech to real work)
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. OpenAI's New Vision Technology Could Change How HVAC Technicians Diagnose Equipment"
                      className="w-full text-xl sm:text-2xl font-display font-bold p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-stone-500 uppercase block mb-1">
                      Subheadline / Excerpt
                    </label>
                    <textarea
                      rows={2}
                      value={subheadline}
                      onChange={(e) => setSubheadline(e.target.value)}
                      placeholder="A clear 2-sentence summary outlining what happened, what changed, and who it affects..."
                      className="w-full text-sm font-serif p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-stone-500 uppercase block mb-1">
                        Cover Image URL
                      </label>
                      <input
                        type="text"
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        className="w-full text-xs font-mono p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-stone-500 uppercase block mb-1">
                        Topic Tags (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="HVAC, Diagnostics, Computer Vision"
                        className="w-full text-xs font-mono p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Block Editor Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
                      Article Content Blocks ({blocks.length})
                    </span>
                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => addBlock('paragraph')}
                        className="px-2.5 py-1 rounded bg-stone-200 dark:bg-stone-800 text-xs font-mono hover:bg-stone-300 dark:hover:bg-stone-700"
                      >
                        + Paragraph
                      </button>
                      <button
                        onClick={() => addBlock('h2')}
                        className="px-2.5 py-1 rounded bg-stone-200 dark:bg-stone-800 text-xs font-mono hover:bg-stone-300 dark:hover:bg-stone-700"
                      >
                        + H2 Heading
                      </button>
                      <button
                        onClick={() => addBlock('callout')}
                        className="px-2.5 py-1 rounded bg-stone-200 dark:bg-stone-800 text-xs font-mono hover:bg-stone-300 dark:hover:bg-stone-700"
                      >
                        + Callout
                      </button>
                      <button
                        onClick={() => addBlock('quote')}
                        className="px-2.5 py-1 rounded bg-stone-200 dark:bg-stone-800 text-xs font-mono hover:bg-stone-300 dark:hover:bg-stone-700"
                      >
                        + Quote
                      </button>
                      <button
                        onClick={() => addBlock('prompt')}
                        className="px-2.5 py-1 rounded bg-stone-200 dark:bg-stone-800 text-xs font-mono hover:bg-stone-300 dark:hover:bg-stone-700 text-amber-600 dark:text-amber-400 font-bold"
                      >
                        + Prompt Block
                      </button>
                    </div>
                  </div>

                  {blocks.map((block, idx) => (
                    <div 
                      key={block.id}
                      className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs relative group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded">
                          {block.type.toUpperCase()} BLOCK #{idx + 1}
                        </span>
                        
                        <div className="flex items-center space-x-1 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => moveBlock(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-30"
                            title="Move Up"
                          >
                            <MoveUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => moveBlock(idx, 'down')}
                            disabled={idx === blocks.length - 1}
                            className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-30"
                            title="Move Down"
                          >
                            <MoveDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => removeBlock(block.id)}
                            className="p-1 text-stone-400 hover:text-rose-600"
                            title="Remove Block"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {block.type === 'h2' || block.type === 'h3' ? (
                        <input
                          type="text"
                          value={block.content}
                          onChange={(e) => updateBlockContent(block.id, e.target.value)}
                          className="w-full font-sans font-bold text-lg p-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                        />
                      ) : block.type === 'prompt' ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={block.content}
                            onChange={(e) => updateBlockContent(block.id, e.target.value)}
                            placeholder="Prompt Goal (e.g. Compressor Wiring Diagnosis)"
                            className="w-full font-mono text-xs font-bold p-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                          />
                          <textarea
                            rows={3}
                            value={block.extra?.promptExampleInput || ''}
                            onChange={(e) => {
                              const extra = { ...block.extra, promptExampleInput: e.target.value };
                              setBlocks(prev => prev.map(b => b.id === block.id ? { ...b, extra } : b));
                            }}
                            placeholder="Paste copyable prompt text here..."
                            className="w-full font-mono text-xs p-2.5 rounded-lg bg-stone-900 text-stone-100 border border-stone-700"
                          />
                        </div>
                      ) : (
                        <textarea
                          rows={block.type === 'quote' ? 2 : 4}
                          value={block.content}
                          onChange={(e) => updateBlockContent(block.id, e.target.value)}
                          className="w-full font-serif text-sm p-3 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 leading-relaxed focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      )}
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* TAB 2: SPECIAL COMPONENTS */}
            {activeTab === 'special_components' && (
              <div className="space-y-6">
                
                {/* Why This Matters */}
                <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center">
                      <Zap className="w-4 h-4 mr-1.5" />
                      "Why This Matters" Section
                    </span>
                    <button
                      onClick={() => {
                        setAiTask('why-this-matters');
                        handleRunAi();
                      }}
                      className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline flex items-center"
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      Generate with AI
                    </button>
                  </div>
                  <p className="text-xs text-stone-500 font-serif mb-3">
                    Highlighted callout early in the article explaining exactly why the reader should care about this development.
                  </p>
                  <textarea
                    rows={3}
                    value={whyThisMatters}
                    onChange={(e) => setWhyThisMatters(e.target.value)}
                    placeholder="Field technicians spend up to 25% of their billable hours searching for equipment documentation..."
                    className="w-full font-serif text-sm p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Tailor Trends Takeaway */}
                <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center">
                      <Sparkles className="w-4 h-4 mr-1.5 text-amber-500" />
                      "Tailor Trends Takeaway" Section
                    </span>
                    <button
                      onClick={() => {
                        setAiTask('takeaway');
                        handleRunAi();
                      }}
                      className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline flex items-center"
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      Generate with AI
                    </button>
                  </div>
                  <p className="text-xs text-stone-500 font-serif mb-3">
                    Authoritative conclusion separating confirmed physical reality from speculative vendor marketing.
                  </p>
                  <textarea
                    rows={3}
                    value={takeaway}
                    onChange={(e) => setTakeaway(e.target.value)}
                    placeholder="Computer vision will not turn wrenches or replace EPA certification, but it will separate contractors who fix problems in one trip from those who take three..."
                    className="w-full font-serif text-sm p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

              </div>
            )}

            {/* TAB 3: SOURCES */}
            {activeTab === 'sources' && (
              <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
                  <div>
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center">
                      <ShieldCheck className="w-4 h-4 mr-1 text-emerald-500" />
                      Verified Primary Sources
                    </h3>
                    <p className="text-xs text-stone-500 font-serif mt-0.5">
                      Tailor Trends Standard: Factual claims must link to primary publications or verified standards.
                    </p>
                  </div>
                  <button
                    onClick={addSource}
                    className="px-3 py-1.5 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-mono font-bold flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Source</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {sources.map((src, idx) => (
                    <div key={src.id} className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-stone-500 uppercase">
                          SOURCE #{idx + 1}
                        </span>
                        <button
                          onClick={() => removeSource(src.id)}
                          className="text-stone-400 hover:text-rose-600 text-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-mono text-stone-500 block mb-1">Publication Name</label>
                          <input
                            type="text"
                            value={src.publication}
                            onChange={(e) => updateSource(src.id, 'publication', e.target.value)}
                            className="w-full text-xs font-sans p-2 rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-stone-500 block mb-1">Source Title</label>
                          <input
                            type="text"
                            value={src.sourceTitle}
                            onChange={(e) => updateSource(src.id, 'sourceTitle', e.target.value)}
                            className="w-full text-xs font-sans p-2 rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-stone-500 block mb-1">Source URL</label>
                          <input
                            type="url"
                            value={src.url}
                            onChange={(e) => updateSource(src.id, 'url', e.target.value)}
                            className="w-full text-xs font-mono p-2 rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] font-mono text-stone-500 block mb-1">Pub Date</label>
                            <input
                              type="date"
                              value={src.publicationDate}
                              onChange={(e) => updateSource(src.id, 'publicationDate', e.target.value)}
                              className="w-full text-xs font-mono p-2 rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-mono text-stone-500 block mb-1">Accessed</label>
                            <input
                              type="date"
                              value={src.dateAccessed}
                              onChange={(e) => updateSource(src.id, 'dateAccessed', e.target.value)}
                              className="w-full text-xs font-mono p-2 rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: SEO METADATA */}
            {activeTab === 'seo' && (
              <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                  Search Engine Optimization & Social Cards
                </h3>
                
                <div>
                  <label className="text-[11px] font-mono text-stone-500 block mb-1">Canonical URL Slug</label>
                  <div className="flex items-center text-xs font-mono text-stone-400 bg-stone-50 dark:bg-stone-800 p-2.5 rounded-xl border border-stone-300 dark:border-stone-700">
                    <span>https://tailortrends.com/articles/</span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="flex-1 bg-transparent text-stone-900 dark:text-stone-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-stone-500 block mb-1">Meta SEO Title (30 - 60 chars)</label>
                  <input
                    type="text"
                    value={metaTitle || title}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="w-full text-xs font-sans p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-stone-500 block mb-1">Meta SEO Description (120 - 160 chars)</label>
                  <textarea
                    rows={3}
                    value={metaDesc || subheadline}
                    onChange={(e) => setMetaDesc(e.target.value)}
                    className="w-full text-xs font-sans p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700"
                  />
                </div>
              </div>
            )}

          </div>

          {/* AI Writing Assistant Sidepanel */}
          {aiAssistantOpen && (
            <div className="lg:col-span-4 sticky top-20 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <h3 className="font-sans font-bold text-sm text-stone-900 dark:text-stone-100">
                    AI Editorial Assistant
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  Gemini 3.8
                </span>
              </div>

              <div>
                <label className="text-[11px] font-mono text-stone-500 uppercase block mb-1">
                  Choose Editorial Task
                </label>
                <select
                  value={aiTask}
                  onChange={(e) => setAiTask(e.target.value)}
                  className="w-full text-xs font-sans p-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700"
                >
                  <option value="generate-outline">Generate Comprehensive Outline</option>
                  <option value="generate-headlines">Suggest 5 Practical Headlines</option>
                  <option value="why-this-matters">Write "Why This Matters" Callout</option>
                  <option value="takeaway">Write "Tailor Trends Takeaway"</option>
                  <option value="simplify-technology">Explain Technology Simply (Analogy)</option>
                  <option value="suggest-applications">Suggest Industry Applications</option>
                  <option value="find-gaps-and-citations">Fact-Check Gaps & Citations</option>
                  <option value="generate-social">Generate Social Media Drafts</option>
                </select>
              </div>

              <button
                onClick={handleRunAi}
                disabled={aiLoading}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs font-mono flex items-center justify-center space-x-1.5 transition-colors disabled:opacity-50"
              >
                {aiLoading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-stone-950 border-t-transparent rounded-full animate-spin mr-1" />
                    <span>Analyzing with Gemini...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Generate Assistance</span>
                  </>
                )}
              </button>

              {aiOutput && (
                <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-800">
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
                    <span>Generated Editorial Insight:</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(aiOutput);
                        alert('Copied to clipboard!');
                      }}
                      className="text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto p-3.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs font-mono whitespace-pre-wrap leading-relaxed select-all">
                    {aiOutput}
                  </div>

                  {/* 1-Click Apply to relevant fields */}
                  {aiTask === 'why-this-matters' && (
                    <button
                      onClick={() => {
                        setWhyThisMatters(aiOutput.replace(/^Why This Matters:\s*/i, ''));
                        alert('Applied to "Why This Matters" field!');
                      }}
                      className="w-full py-1.5 rounded-lg bg-stone-200 dark:bg-stone-800 text-xs font-mono font-medium hover:bg-stone-300 text-stone-800 dark:text-stone-200"
                    >
                      Apply to "Why This Matters" Field →
                    </button>
                  )}
                  {aiTask === 'takeaway' && (
                    <button
                      onClick={() => {
                        setTakeaway(aiOutput.replace(/^Tailor Trends Takeaway:\s*/i, ''));
                        alert('Applied to "Tailor Trends Takeaway" field!');
                      }}
                      className="w-full py-1.5 rounded-lg bg-stone-200 dark:bg-stone-800 text-xs font-mono font-medium hover:bg-stone-300 text-stone-800 dark:text-stone-200"
                    >
                      Apply to Takeaway Field →
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
