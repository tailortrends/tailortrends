import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Article, 
  Industry, 
  Author, 
  StoryIdea, 
  NewsInboxItem, 
  ResearchProject, 
  NewsletterSubscriber,
  ArticleStatus,
  ArticleType
} from '../types/index.ts';
import { 
  SEED_ARTICLES, 
  SEED_INDUSTRIES, 
  SEED_AUTHORS, 
  SEED_STORY_IDEAS, 
  SEED_NEWS_INBOX, 
  SEED_RESEARCH_PROJECTS 
} from '../data/seedData.ts';

interface PublishingContextType {
  articles: Article[];
  industries: Industry[];
  authors: Author[];
  storyIdeas: StoryIdea[];
  newsInbox: NewsInboxItem[];
  researchProjects: ResearchProject[];
  subscribers: NewsletterSubscriber[];
  loading: boolean;
  refreshData: () => Promise<void>;
  
  // Article CRUD & Workflow
  getArticleBySlug: (slug: string) => Article | undefined;
  getArticleById: (id: string) => Article | undefined;
  createArticle: (data: Partial<Article>) => Promise<Article>;
  updateArticle: (id: string, data: Partial<Article>) => Promise<Article>;
  deleteArticle: (id: string) => Promise<boolean>;
  changeArticleStatus: (id: string, status: ArticleStatus) => Promise<Article | undefined>;
  
  // AI Tools
  callAiAssistant: (payload: {
    task: string;
    topic: string;
    industry?: string;
    context?: string;
    content?: string;
    draftText?: string;
    targetType?: ArticleType;
  }) => Promise<{ result: string; model: string }>;

  // Story Ideas & News Inbox
  addStoryIdea: (data: Partial<StoryIdea>) => Promise<StoryIdea>;
  updateNewsInboxStatus: (id: string, status: NewsInboxItem['status'], notes?: string) => Promise<void>;
  convertNewsToArticle: (inboxItem: NewsInboxItem) => Promise<Article>;

  // Research Projects
  createResearchProject: (data: Partial<ResearchProject>) => Promise<ResearchProject>;
  addResearchNote: (projectId: string, note: { type: string; content: string; sourceUrl?: string; authorOrSpeaker?: string }) => Promise<void>;

  // Newsletter
  subscribeNewsletter: (email: string, sourcePage?: string) => Promise<{ success: boolean; message: string }>;
}

const PublishingContext = createContext<PublishingContextType | undefined>(undefined);

export const PublishingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>(SEED_ARTICLES);
  const [industries, setIndustries] = useState<Industry[]>(SEED_INDUSTRIES);
  const [authors, setAuthors] = useState<Author[]>(SEED_AUTHORS);
  const [storyIdeas, setStoryIdeas] = useState<StoryIdea[]>(SEED_STORY_IDEAS);
  const [newsInbox, setNewsInbox] = useState<NewsInboxItem[]>(SEED_NEWS_INBOX);
  const [researchProjects, setResearchProjects] = useState<ResearchProject[]>(SEED_RESEARCH_PROJECTS);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Sync with API backend
  const refreshData = async () => {
    try {
      setLoading(true);
      const [artRes, indRes, ideasRes, inboxRes, projRes, subRes] = await Promise.allSettled([
        fetch('/api/articles?status=all').then(r => r.json()),
        fetch('/api/industries').then(r => r.json()),
        fetch('/api/story-ideas').then(r => r.json()),
        fetch('/api/news-inbox').then(r => r.json()),
        fetch('/api/research-projects').then(r => r.json()),
        fetch('/api/newsletter/subscribers').then(r => r.json())
      ]);

      if (artRes.status === 'fulfilled' && artRes.value.articles) {
        setArticles(artRes.value.articles);
      }
      if (indRes.status === 'fulfilled' && Array.isArray(indRes.value)) {
        setIndustries(indRes.value);
      }
      if (ideasRes.status === 'fulfilled' && Array.isArray(ideasRes.value)) {
        setStoryIdeas(ideasRes.value);
      }
      if (inboxRes.status === 'fulfilled' && Array.isArray(inboxRes.value)) {
        setNewsInbox(inboxRes.value);
      }
      if (projRes.status === 'fulfilled' && Array.isArray(projRes.value)) {
        setResearchProjects(projRes.value);
      }
      if (subRes.status === 'fulfilled' && subRes.value.subscribers) {
        setSubscribers(subRes.value.subscribers);
      }
    } catch (err) {
      console.warn('API sync warning (using local seed state):', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const getArticleBySlug = (slug: string) => {
    return articles.find(a => a.slug === slug || a.id === slug);
  };

  const getArticleById = (id: string) => {
    return articles.find(a => a.id === id);
  };

  const createArticle = async (data: Partial<Article>): Promise<Article> => {
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const created = await res.json();
        setArticles(prev => [created, ...prev]);
        return created;
      }
    } catch (err) {
      console.error('Error creating article on server:', err);
    }

    // Fallback local creation
    const slug = data.slug || (data.title || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const localNew: Article = {
      id: `art-${Date.now()}`,
      slug,
      title: data.title || 'Untitled Article',
      subheadline: data.subheadline || '',
      excerpt: data.excerpt || '',
      type: data.type || 'ai_in_industry',
      status: data.status || 'draft',
      primaryIndustry: data.primaryIndustry || 'artificial-intelligence',
      tags: data.tags || ['Emerging Tech'],
      author: data.author || authors[0],
      coverImage: data.coverImage || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1400&q=80',
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readingTimeMinutes: data.readingTimeMinutes || 5,
      blocks: data.blocks || [],
      whyThisMatters: data.whyThisMatters || '',
      takeaway: data.takeaway || '',
      sources: data.sources || [],
      seo: data.seo || {
        metaTitle: `${data.title} | Tailor Trends`,
        metaDescription: data.excerpt || 'Analysis from Tailor Trends.'
      }
    };
    setArticles(prev => [localNew, ...prev]);
    return localNew;
  };

  const updateArticle = async (id: string, data: Partial<Article>): Promise<Article> => {
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const updated = await res.json();
        setArticles(prev => prev.map(a => a.id === id ? updated : a));
        return updated;
      }
    } catch (err) {
      console.error('Error updating article on server:', err);
    }

    // Local fallback update
    let updatedArticle: Article | undefined;
    setArticles(prev => prev.map(a => {
      if (a.id === id) {
        updatedArticle = { ...a, ...data, updatedAt: new Date().toISOString() };
        return updatedArticle;
      }
      return a;
    }));
    return updatedArticle || (data as Article);
  };

  const deleteArticle = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setArticles(prev => prev.filter(a => a.id !== id));
        return true;
      }
    } catch (err) {
      console.error('Error deleting article:', err);
    }
    setArticles(prev => prev.filter(a => a.id !== id));
    return true;
  };

  const changeArticleStatus = async (id: string, status: ArticleStatus) => {
    return updateArticle(id, { status });
  };

  const callAiAssistant = async (payload: {
    task: string;
    topic: string;
    industry?: string;
    context?: string;
    content?: string;
    draftText?: string;
    targetType?: ArticleType;
  }) => {
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.error('AI assistant request failed:', err);
    }
    return {
      result: `Editorial preview for "${payload.topic}": Tailor Trends emphasizes grounding AI developments in practical, real-world field workflows. Verify claims with physical trade instrumentation.`,
      model: 'client-fallback'
    };
  };

  const addStoryIdea = async (data: Partial<StoryIdea>): Promise<StoryIdea> => {
    try {
      const res = await fetch('/api/story-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const created = await res.json();
        setStoryIdeas(prev => [created, ...prev]);
        return created;
      }
    } catch (err) {
      console.error('Error saving story idea:', err);
    }

    const localIdea: StoryIdea = {
      id: `idea-${Date.now()}`,
      technology: data.technology || 'AI',
      industry: data.industry || 'HVAC',
      possibleHeadline: data.possibleHeadline || '',
      whyTheTopicMatters: data.whyTheTopicMatters || '',
      questionsWorthInvestigating: data.questionsWorthInvestigating || [],
      possibleSources: data.possibleSources || [],
      potentialIndustryImpact: data.potentialIndustryImpact || '',
      dateAdded: new Date().toISOString().split('T')[0],
      status: 'new'
    };
    setStoryIdeas(prev => [localIdea, ...prev]);
    return localIdea;
  };

  const updateNewsInboxStatus = async (id: string, status: NewsInboxItem['status'], notes?: string) => {
    try {
      await fetch(`/api/news-inbox/${id}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, editorialNotes: notes })
      });
    } catch (err) {
      console.error('Error updating inbox item:', err);
    }
    setNewsInbox(prev => prev.map(item => item.id === id ? { ...item, status, editorialNotes: notes || item.editorialNotes } : item));
  };

  const convertNewsToArticle = async (item: NewsInboxItem): Promise<Article> => {
    await updateNewsInboxStatus(item.id, 'turned_to_article');
    const matchedIndustry = industries.find(i => i.name.toLowerCase().includes(item.industry.toLowerCase()))?.slug || 'technology';
    
    const newArticle = await createArticle({
      title: item.title,
      subheadline: item.snippet,
      excerpt: item.snippet,
      primaryIndustry: matchedIndustry,
      tags: [item.industry, item.technology, 'Field Analysis'],
      status: 'draft',
      type: 'ai_in_industry',
      sources: [
        {
          id: `src-${Date.now()}`,
          publication: item.sourceName,
          sourceTitle: item.title,
          url: item.sourceUrl,
          publicationDate: item.publishedDate,
          dateAccessed: new Date().toISOString().split('T')[0],
          verified: true
        }
      ],
      blocks: [
        {
          id: 'b1',
          type: 'paragraph',
          content: `${item.sourceName} reports: "${item.snippet}"`
        },
        {
          id: 'b2',
          type: 'h2',
          content: 'What This Actually Changes in the Real World'
        },
        {
          id: 'b3',
          type: 'paragraph',
          content: `While this development marks an interesting milestone for ${item.technology}, the real test is how it integrates into existing ${item.industry} operations.`
        }
      ]
    });
    return newArticle;
  };

  const createResearchProject = async (data: Partial<ResearchProject>): Promise<ResearchProject> => {
    try {
      const res = await fetch('/api/research-projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const created = await res.json();
        setResearchProjects(prev => [created, ...prev]);
        return created;
      }
    } catch (err) {
      console.error('Error creating research project:', err);
    }
    const localProj: ResearchProject = {
      id: `proj-${Date.now()}`,
      topic: data.topic || 'New Research Topic',
      industry: data.industry || 'hvac',
      status: 'research',
      targetArticleType: data.targetArticleType || 'ai_in_industry',
      questionsToInvestigate: data.questionsToInvestigate || [],
      notes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setResearchProjects(prev => [localProj, ...prev]);
    return localProj;
  };

  const addResearchNote = async (projectId: string, note: { type: string; content: string; sourceUrl?: string; authorOrSpeaker?: string }) => {
    try {
      await fetch(`/api/research-projects/${projectId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
      });
    } catch (err) {
      console.error('Error adding research note:', err);
    }
    const newNote = {
      id: `n-${Date.now()}`,
      type: note.type as any,
      content: note.content,
      sourceUrl: note.sourceUrl,
      authorOrSpeaker: note.authorOrSpeaker,
      createdAt: new Date().toISOString()
    };
    setResearchProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          notes: [newNote, ...p.notes],
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    }));
  };

  const subscribeNewsletter = async (email: string, sourcePage: string = '/'): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, sourcePage })
      });
      const data = await res.json();
      if (res.ok) {
        setSubscribers(prev => [{ id: `sub-${Date.now()}`, email, signupDate: new Date().toISOString().split('T')[0], sourcePage, status: 'active' }, ...prev]);
        return { success: true, message: data.message || 'Subscribed successfully!' };
      }
      return { success: false, message: data.error || 'Failed to subscribe' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Network error' };
    }
  };

  return (
    <PublishingContext.Provider
      value={{
        articles,
        industries,
        authors,
        storyIdeas,
        newsInbox,
        researchProjects,
        subscribers,
        loading,
        refreshData,
        getArticleBySlug,
        getArticleById,
        createArticle,
        updateArticle,
        deleteArticle,
        changeArticleStatus,
        callAiAssistant,
        addStoryIdea,
        updateNewsInboxStatus,
        convertNewsToArticle,
        createResearchProject,
        addResearchNote,
        subscribeNewsletter
      }}
    >
      {children}
    </PublishingContext.Provider>
  );
};

export const usePublishing = () => {
  const context = useContext(PublishingContext);
  if (!context) throw new Error('usePublishing must be used within PublishingProvider');
  return context;
};
