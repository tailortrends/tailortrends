export type ArticleType = 
  | 'ai_news' 
  | 'ai_in_industry' 
  | 'tool_breakdown' 
  | 'trend_analysis' 
  | 'practical_guide';

export type ArticleStatus = 
  | 'idea' 
  | 'researching' 
  | 'draft' 
  | 'editing' 
  | 'ready' 
  | 'scheduled' 
  | 'published' 
  | 'archived';

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  email?: string;
}

export interface SourceCitation {
  id: string;
  publication: string;
  sourceTitle: string;
  url: string;
  publicationDate: string;
  dateAccessed: string;
  verified?: boolean;
}

export type BlockType = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'paragraph' 
  | 'quote' 
  | 'image' 
  | 'gallery' 
  | 'callout' 
  | 'prompt' 
  | 'code' 
  | 'table' 
  | 'divider' 
  | 'list' 
  | 'why_matters' 
  | 'industry_impact' 
  | 'takeaway' 
  | 'try_yourself' 
  | 'what_watch';

export interface ArticleBlock {
  id: string;
  type: BlockType;
  content: string;
  extra?: {
    caption?: string;
    url?: string;
    items?: string[];
    language?: string;
    calloutVariant?: 'info' | 'warning' | 'tip' | 'insight';
    promptExampleInput?: string;
    promptExampleOutput?: string;
    safetyNotes?: string;
    tableHeaders?: string[];
    tableRows?: string[][];
    images?: Array<{ url: string; caption?: string }>;
    industryName?: string;
    impactLevel?: 'High' | 'Medium' | 'Transformative';
    timeHorizon?: string;
    factType?: 'confirmed_fact' | 'industry_analysis' | 'prediction';
  };
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subheadline: string;
  excerpt: string;
  type: ArticleType;
  status: ArticleStatus;
  primaryIndustry: string; // Industry ID or slug
  secondaryIndustries?: string[];
  tags: string[];
  author: Author;
  coverImage: string;
  coverImageCaption?: string;
  publishedAt: string;
  updatedAt: string;
  readingTimeMinutes: number;
  featured?: boolean;
  trending?: boolean;
  views?: number;
  
  // Structured blocks
  blocks: ArticleBlock[];
  
  // Special components
  whyThisMatters?: string;
  industryImpact?: {
    summary: string;
    industriesAffected: Array<{ name: string; impact: string }>;
  };
  takeaway?: string;
  tryItYourself?: {
    title: string;
    toolName: string;
    workflowStepByStep: string[];
    prompts: Array<{ label: string; promptText: string; expectedResult?: string }>;
    safetyConsiderations?: string;
  };
  whatToWatch?: Array<{ milestone: string; timeline: string; reason: string }>;
  sources: SourceCitation[];

  // SEO metadata
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    canonicalUrl?: string;
  };
}

export interface Industry {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  heroSubtitle: string;
  iconName: string;
  badgeColor: string;
  practicalApplications: string[];
  toolsCurrentlyAvailable: Array<{ name: string; purpose: string }>;
  jobsAffected: string[];
  skillsWorkersShouldLearn: string[];
  futureOutlook: string;
  relatedTechnologies: string[];
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

export interface ResearchNote {
  id: string;
  type: 'note' | 'source' | 'quote' | 'stat' | 'company' | 'question';
  content: string;
  sourceUrl?: string;
  authorOrSpeaker?: string;
  createdAt: string;
}

export interface ResearchProject {
  id: string;
  topic: string;
  industry: string;
  status: 'idea' | 'research' | 'outline' | 'draft' | 'fact_check' | 'edit' | 'ready';
  targetArticleType: ArticleType;
  notes: ResearchNote[];
  questionsToInvestigate: string[];
  outline?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoryIdea {
  id: string;
  technology: string;
  industry: string;
  possibleHeadline: string;
  whyTheTopicMatters: string;
  questionsWorthInvestigating: string[];
  possibleSources: string[];
  potentialIndustryImpact: string;
  dateAdded: string;
  status: 'new' | 'exploring' | 'converted' | 'dismissed';
}

export interface NewsInboxItem {
  id: string;
  title: string;
  sourceName: string;
  sourceUrl: string;
  snippet: string;
  publishedDate: string;
  industry: string;
  technology: string;
  status: 'inbox' | 'saved' | 'research' | 'ignored' | 'turned_to_article';
  editorialNotes?: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  signupDate: string;
  sourcePage: string;
  status: 'active' | 'unsubscribed';
}

export interface SocialDistributionPackage {
  xPost: string;
  xThread: string[];
  linkedInPost: string;
  instagramCarousel: Array<{ slide: number; title: string; body: string }>;
  youtubeShortsScript: string;
  facebookPost: string;
}
