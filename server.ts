import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import { 
  SEED_ARTICLES, 
  SEED_INDUSTRIES, 
  SEED_AUTHORS, 
  SEED_STORY_IDEAS, 
  SEED_NEWS_INBOX, 
  SEED_RESEARCH_PROJECTS 
} from './src/data/seedData.ts';
import { Article, StoryIdea, NewsInboxItem, ResearchProject, NewsletterSubscriber } from './src/types/index.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));

// Initialize Gemini SDK with User-Agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// In-Memory Database with optional JSON file backup
interface DbState {
  articles: Article[];
  industries: typeof SEED_INDUSTRIES;
  authors: typeof SEED_AUTHORS;
  storyIdeas: StoryIdea[];
  newsInbox: NewsInboxItem[];
  researchProjects: ResearchProject[];
  subscribers: NewsletterSubscriber[];
}

const DB_FILE = path.join(__dirname, 'data_store.json');

function loadDatabase(): DbState {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed.articles && parsed.articles.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading DB_FILE, falling back to seed:', err);
  }
  return {
    articles: [...SEED_ARTICLES],
    industries: [...SEED_INDUSTRIES],
    authors: [...SEED_AUTHORS],
    storyIdeas: [...SEED_STORY_IDEAS],
    newsInbox: [...SEED_NEWS_INBOX],
    researchProjects: [...SEED_RESEARCH_PROJECTS],
    subscribers: [
      { id: 'sub-1', email: 'shyam@tailortrends.com', signupDate: '2026-09-20', sourcePage: '/industries/hvac', status: 'active' },
      { id: 'sub-2', email: 'contractor.lead@mech-trades.com', signupDate: '2026-09-22', sourcePage: '/', status: 'active' }
    ]
  };
}

const db = loadDatabase();

function saveDatabase() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to persist database:', err);
  }
}

// -----------------------------------------------------------------------------
// REST API ENDPOINTS
// -----------------------------------------------------------------------------

// Articles API
app.get('/api/articles', (req: Request, res: Response) => {
  const { industry, type, status, tag, search, featured, trending } = req.query;
  let list = db.articles;

  // Filter by status (default: allow published for public, or specified status)
  if (status && typeof status === 'string') {
    if (status !== 'all') {
      list = list.filter(a => a.status === status);
    }
  }

  if (industry && typeof industry === 'string') {
    list = list.filter(a => a.primaryIndustry === industry || a.secondaryIndustries?.includes(industry));
  }

  if (type && typeof type === 'string') {
    list = list.filter(a => a.type === type);
  }

  if (tag && typeof tag === 'string') {
    const target = tag.toLowerCase();
    list = list.filter(a => a.tags.some(t => t.toLowerCase() === target));
  }

  if (featured === 'true') {
    list = list.filter(a => a.featured);
  }

  if (trending === 'true') {
    list = list.filter(a => a.trending);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    list = list.filter(a => 
      a.title.toLowerCase().includes(q) || 
      a.subheadline.toLowerCase().includes(q) || 
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  res.json({ articles: list, total: list.length });
});

app.get('/api/articles/:slugOrId', (req: Request, res: Response) => {
  const { slugOrId } = req.params;
  const article = db.articles.find(a => a.slug === slugOrId || a.id === slugOrId);
  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }
  // Increment view counter
  article.views = (article.views || 0) + 1;
  res.json(article);
});

app.post('/api/articles', (req: Request, res: Response) => {
  const data = req.body as Partial<Article>;
  if (!data.title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const now = new Date().toISOString();

  const newArticle: Article = {
    id: data.id || `art-${Date.now()}`,
    slug,
    title: data.title,
    subheadline: data.subheadline || '',
    excerpt: data.excerpt || (data.subheadline ? data.subheadline.slice(0, 160) : ''),
    type: data.type || 'ai_in_industry',
    status: data.status || 'draft',
    primaryIndustry: data.primaryIndustry || 'artificial-intelligence',
    secondaryIndustries: data.secondaryIndustries || [],
    tags: data.tags || ['Emerging Tech'],
    author: data.author || db.authors[0],
    coverImage: data.coverImage || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1400&q=80',
    coverImageCaption: data.coverImageCaption || '',
    publishedAt: data.publishedAt || now,
    updatedAt: now,
    readingTimeMinutes: data.readingTimeMinutes || 5,
    featured: !!data.featured,
    trending: !!data.trending,
    views: 0,
    blocks: data.blocks || [],
    whyThisMatters: data.whyThisMatters || '',
    industryImpact: data.industryImpact,
    takeaway: data.takeaway || '',
    tryItYourself: data.tryItYourself,
    whatToWatch: data.whatToWatch || [],
    sources: data.sources || [],
    seo: data.seo || {
      metaTitle: `${data.title} | Tailor Trends`,
      metaDescription: data.excerpt || data.subheadline || 'A practical technology analysis from Tailor Trends.'
    }
  };

  db.articles.unshift(newArticle);
  saveDatabase();
  res.status(201).json(newArticle);
});

app.put('/api/articles/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = db.articles.findIndex(a => a.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Article not found' });
  }

  const existing = db.articles[index];
  const updated: Article = {
    ...existing,
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  db.articles[index] = updated;
  saveDatabase();
  res.json(updated);
});

app.delete('/api/articles/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = db.articles.findIndex(a => a.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Article not found' });
  }
  const removed = db.articles.splice(index, 1);
  saveDatabase();
  res.json({ success: true, removed: removed[0] });
});

// Industries API
app.get('/api/industries', (req: Request, res: Response) => {
  res.json(db.industries);
});

// Authors API
app.get('/api/authors', (req: Request, res: Response) => {
  res.json(db.authors);
});

// Story Ideas API
app.get('/api/story-ideas', (req: Request, res: Response) => {
  res.json(db.storyIdeas);
});

app.post('/api/story-ideas', (req: Request, res: Response) => {
  const idea: StoryIdea = {
    id: `idea-${Date.now()}`,
    technology: req.body.technology || 'Artificial Intelligence',
    industry: req.body.industry || 'HVAC',
    possibleHeadline: req.body.possibleHeadline || '',
    whyTheTopicMatters: req.body.whyTheTopicMatters || '',
    questionsWorthInvestigating: req.body.questionsWorthInvestigating || [],
    possibleSources: req.body.possibleSources || [],
    potentialIndustryImpact: req.body.potentialIndustryImpact || '',
    dateAdded: new Date().toISOString().split('T')[0],
    status: 'new'
  };
  db.storyIdeas.unshift(idea);
  saveDatabase();
  res.status(201).json(idea);
});

// News Inbox API
app.get('/api/news-inbox', (req: Request, res: Response) => {
  res.json(db.newsInbox);
});

app.post('/api/news-inbox/:id/action', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, editorialNotes } = req.body;
  const item = db.newsInbox.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  if (status) item.status = status;
  if (editorialNotes) item.editorialNotes = editorialNotes;
  saveDatabase();
  res.json(item);
});

// Research Projects API
app.get('/api/research-projects', (req: Request, res: Response) => {
  res.json(db.researchProjects);
});

app.post('/api/research-projects', (req: Request, res: Response) => {
  const project: ResearchProject = {
    id: `proj-${Date.now()}`,
    topic: req.body.topic || 'Untitled Research',
    industry: req.body.industry || 'hvac',
    status: req.body.status || 'research',
    targetArticleType: req.body.targetArticleType || 'ai_in_industry',
    questionsToInvestigate: req.body.questionsToInvestigate || [],
    notes: req.body.notes || [],
    outline: req.body.outline || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db.researchProjects.unshift(project);
  saveDatabase();
  res.status(201).json(project);
});

app.post('/api/research-projects/:id/notes', (req: Request, res: Response) => {
  const { id } = req.params;
  const project = db.researchProjects.find(p => p.id === id);
  if (!project) return res.status(404).json({ error: 'Project not found' });

  const note = {
    id: `n-${Date.now()}`,
    type: req.body.type || 'note',
    content: req.body.content || '',
    sourceUrl: req.body.sourceUrl,
    authorOrSpeaker: req.body.authorOrSpeaker,
    createdAt: new Date().toISOString()
  };
  project.notes.unshift(note);
  project.updatedAt = new Date().toISOString();
  saveDatabase();
  res.status(201).json(note);
});

// Newsletter API
app.post('/api/newsletter/subscribe', (req: Request, res: Response) => {
  const { email, sourcePage } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  const existing = db.subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.json({ message: 'You are already subscribed to Tailor Trends Weekly!', subscriber: existing });
  }

  const newSub: NewsletterSubscriber = {
    id: `sub-${Date.now()}`,
    email,
    signupDate: new Date().toISOString().split('T')[0],
    sourcePage: sourcePage || '/',
    status: 'active'
  };

  db.subscribers.unshift(newSub);
  saveDatabase();
  res.status(201).json({ message: 'Successfully subscribed to Tailor Trends Weekly.', subscriber: newSub });
});

app.get('/api/newsletter/subscribers', (req: Request, res: Response) => {
  res.json({ subscribers: db.subscribers, total: db.subscribers.length });
});

// -----------------------------------------------------------------------------
// AI WRITING ASSISTANT & EDITORIAL TOOLS (Gemini 3.8 Flash)
// -----------------------------------------------------------------------------

app.post('/api/ai/generate', async (req: Request, res: Response) => {
  const { task, topic, industry, context, content, draftText, targetType } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;

  // Editorial System Prompt enforcing Tailor Trends brand voice:
  // "Follow the trend. Understand the technology. See how it changes the real world."
  // Never sound generic, no empty hype, no marketing fluff. Answer:
  // 1. What happened? 2. Why does it matter? 3. What does tech actually do?
  // 4. How does it affect the industry? 5. How can workers/businesses use it? 6. What to watch next?
  const baseInstruction = `You are the lead editor at Tailor Trends (tailortrends.com).
Our core editorial mission is: "Follow the trend. Understand the technology. See how it changes the real world."
We write intelligent, practical, highly credible analysis connecting cutting-edge AI and emerging technology to real-world industrial and frontline workflows (HVAC, Construction, Real Estate, Automotive, Agriculture, Healthcare, Manufacturing, etc.).
NEVER produce generic AI hype, buzzwords, or superficial rehashes. Always specify actual mechanical/operational workflows, specific tools, physical metrics, limitations, and practical implications.`;

  let prompt = '';

  switch (task) {
    case 'generate-outline':
      prompt = `${baseInstruction}
Generate a comprehensive, structured editorial outline for an article on:
Topic: "${topic}"
Industry: "${industry || 'General Industry'}"
Article Type: "${targetType || 'AI in Industry'}"

The outline must follow the Tailor Trends 6-question framework:
1. What happened / Current status
2. Why does it matter?
3. What does the technology actually do (mechanics, models, sensors)?
4. How it affects this specific industry (workflow breakdown, jobs affected)?
5. How an individual or business actually uses it (tools, steps, safety)?
6. What should we watch next?

Provide structured headings, bullet points, and specific technical angles to investigate.`;
      break;

    case 'generate-headlines':
      prompt = `${baseInstruction}
Generate 5 compelling, intelligent headline and subheadline pairs for an article about:
Topic: "${topic}"
Industry: "${industry}"

Rules for Tailor Trends headlines:
- Do NOT sound like generic clickbait (e.g. avoid "This AI Will Blow Your Mind").
- Directly link the technology to the real-world trade or business (e.g. "OpenAI's New Vision Technology Could Change How HVAC Technicians Diagnose Equipment").
- Clear, authoritative, and informative.
Format as JSON array with objects containing { "headline": "...", "subheadline": "..." }.`;
      break;

    case 'simplify-technology':
      prompt = `${baseInstruction}
Explain this complex technical concept simply and accurately for a tradesperson, field technician, or business owner without talking down to them:
Concept / Excerpt: "${content || topic}"
Explain what the technology is, how it physically works in layman terms, and provide a concrete analogy to equipment they already understand (e.g. comparing neural network weights to calibration curves or refrigerant pressure-temperature charts).`;
      break;

    case 'why-this-matters':
      prompt = `${baseInstruction}
Write a concise, high-impact "Why This Matters" editorial callout (2-3 sentences) for an article titled "${topic}" in the ${industry} industry.
Context: "${context || draftText || ''}"
Focus on why a contractor, worker, or business owner should care right now.`;
      break;

    case 'takeaway':
      prompt = `${baseInstruction}
Write an authoritative "Tailor Trends Takeaway" (2-3 sentences) summarizing the key bottom line for an article titled "${topic}" in the ${industry} industry.
Draft text: "${draftText || context || ''}"
Be balanced: distinguish what works today from experimental hype.`;
      break;

    case 'suggest-applications':
      prompt = `${baseInstruction}
Suggest 4 practical, real-world applications of "${topic}" specifically for the "${industry}" industry.
For each application provide:
- Problem it solves
- How work is currently done vs how AI changes it
- Necessary tools or sensors
- Potential pitfall or limitation`;
      break;

    case 'find-gaps-and-citations':
      prompt = `${baseInstruction}
Review this draft text for factual gaps, unverified claims, or statements that require authoritative citations:
Draft:
"${draftText || content}"

List:
1. Specific claims that sound like unverified marketing hype and need physical proof or OEM validation.
2. Missing perspectives (e.g., worker safety, cost, connectivity issues, union or code regulations).
3. Recommended authoritative sources (standards bodies, trade associations, peer-reviewed research) to cite.`;
      break;

    case 'generate-social':
      prompt = `${baseInstruction}
Generate a complete social distribution package for this published article:
Title: "${topic}"
Industry: "${industry}"
Key takeaway: "${context || draftText}"

Provide:
1. An engaging, informative X (Twitter) post (under 280 chars) with 2 relevant hashtags.
2. An informative 4-tweet thread breaking down the 4 key lessons.
3. A professional LinkedIn post formatted for trade contractors and technology professionals.
4. An Instagram carousel outline (5 slides: Title, The Problem, What Tech Does, Field Example, Takeaway).
5. A 45-second YouTube Shorts / TikTok script with visual cues and speaker voiceover.
Output clean structured markdown.`;
      break;

    case 'story-ideas':
      prompt = `${baseInstruction}
Suggest 3 original, highly practical story idea combinations for Technology + Industry matrix.
Focus especially on "${industry || 'HVAC, Construction, Real Estate, Automotive, Agriculture'}".
For each idea provide:
- Technology + Industry combination
- Possible Headline
- Why the topic matters
- 3 Questions worth investigating
- Potential real-world impact`;
      break;

    default:
      prompt = `${baseInstruction}
Assist the human editor with the following request regarding "${topic}":
${context || draftText}`;
  }

  // If Gemini API Key is available, invoke the official Gemini 3.8 Flash model
  if (apiKey) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      const text = response.text || '';
      return res.json({ result: text, model: 'gemini-3.8-flash' });
    } catch (err: any) {
      console.error('Gemini API call failed:', err);
      // Fallback below
    }
  }

  // Graceful, intelligent editorial fallback if API key is not yet set or model request errored
  const fallbackResponse = getFallbackEditorialContent(task, topic, industry);
  res.json({ result: fallbackResponse, model: 'editorial-engine-fallback' });
});

function getFallbackEditorialContent(task: string, topic: string, industry: string): string {
  switch (task) {
    case 'why-this-matters':
      return `Why This Matters: Equipment downtime and diagnostic delays cost contractors up to $180 per service hour. Applying ${topic || 'emerging technology'} directly addresses the growing shortage of senior technicians by providing frontline crews with real-time verification and reducing repeat truck rolls.`;
    case 'takeaway':
      return `Tailor Trends Takeaway: While ${topic || 'new technology'} will not replace physical craftsmanship or field licenses, it will divide contractors into two camps: those who diagnose accurately in 20 minutes with digital assistance, and those who spend half a day manually flipping through PDF service manuals.`;
    case 'generate-headlines':
      return JSON.stringify([
        {
          headline: `How ${topic || 'New AI Models'} Are Transforming Daily Operations in ${industry || 'the Trades'}`,
          subheadline: `A field-tested breakdown of what actually works on the jobsite, what fails, and what contractors must prepare for.`
        },
        {
          headline: `The Real Economics of ${topic || 'Edge Automation'} for ${industry || 'Mid-Market Businesses'}`,
          subheadline: `Cutting through vendor marketing to measure real labor savings, payback timelines, and installation hurdles.`
        },
        {
          headline: `From Manual Checklists to Real-Time Telemetry: What ${topic || 'AI'} Means for ${industry || 'Technicians'}`,
          subheadline: `Why the intersection of physical sensors and generative models is where the real value lives.`
        }
      ], null, 2);
    case 'generate-outline':
      return `### Editorial Outline: ${topic || 'Technology Analysis'}
**Industry:** ${industry || 'General Industry'}

1. **What Happened / Current Landscape**
   - Recent product release or technological milestone
   - The status quo: how this operation is traditionally handled manually
2. **Why It Matters**
   - The economic and labor pain point
   - Quantifying the cost of current inefficiencies
3. **What the Technology Actually Does**
   - Demystifying the underlying model, sensors, or algorithms
   - Contrast between marketing claims vs technical reality
4. **How It Affects ${industry || 'the Industry'}**
   - Step-by-step impact on frontline workflows
   - Which specific job titles gain or lose leverage
5. **How an Individual or Business Can Use It Today**
   - Required software/hardware toolchain
   - Actionable step-by-step pilot protocol
   - Safety, regulatory, and liability considerations
6. **What to Watch Next**
   - Upcoming standards, hardware iterations, and OEM roadmaps`;
    case 'simplify-technology':
      return `In simple terms: Think of this technology like an experienced senior foreman who has memorized every service manual, wiring diagram, and error code written over the last thirty years. Instead of you having to search through hundreds of pages, you show it the symptom (a photo, an error code, or a sound), and it immediately points to the most probable culprit. However, just like any human assistant, it cannot turn the wrench for you or feel the heat of a live wire—you still must verify the reading with your calibrated physical meter.`;
    default:
      return `Editorial Analysis for ${topic}: Practical applications in ${industry} require connecting high-level digital reasoning with physical on-site telemetry. Focus on safety, verified measurements, and measurable labor hours saved.`;
  }
}

// -----------------------------------------------------------------------------
// SEO DYNAMIC GENERATION (Sitemap.xml, Robots.txt, RSS Feed)
// -----------------------------------------------------------------------------

app.get('/sitemap.xml', (req: Request, res: Response) => {
  const host = req.get('host') || 'tailortrends.com';
  const proto = req.protocol || 'https';
  const baseUrl = `${proto}://${host}`;

  const staticUrls = [
    '',
    '/industries',
    '/search',
    '/about',
    '/ai-news',
    '/tools',
    '/guides',
    '/deep-dives'
  ];

  const industryUrls = db.industries.map(i => `/industries/${i.slug}`);
  const articleUrls = db.articles
    .filter(a => a.status === 'published')
    .map(a => `/articles/${a.slug}`);

  const allUrls = [...staticUrls, ...industryUrls, ...articleUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${baseUrl}${u}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${u.startsWith('/articles') ? 'monthly' : 'daily'}</changefreq>
    <priority>${u === '' ? '1.0' : u.startsWith('/articles') ? '0.8' : '0.6'}</priority>
  </url>`).join('\n')}
</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

app.get('/robots.txt', (req: Request, res: Response) => {
  const host = req.get('host') || 'tailortrends.com';
  const proto = req.protocol || 'https';
  const text = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${proto}://${host}/sitemap.xml
`;
  res.header('Content-Type', 'text/plain');
  res.send(text);
});

app.get(['/feed.xml', '/rss.xml'], (req: Request, res: Response) => {
  const host = req.get('host') || 'tailortrends.com';
  const proto = req.protocol || 'https';
  const baseUrl = `${proto}://${host}`;

  const published = db.articles.filter(a => a.status === 'published').slice(0, 20);

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Tailor Trends</title>
    <link>${baseUrl}</link>
    <description>Follow the trend. Understand the technology. See how it changes the real world.</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
${published.map(a => `    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${baseUrl}/articles/${a.slug}</link>
      <guid isPermaLink="true">${baseUrl}/articles/${a.slug}</guid>
      <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${a.excerpt || a.subheadline}]]></description>
      <author>${a.author.email || 'editor@tailortrends.com'} (${a.author.name})</author>
      <category>${a.primaryIndustry}</category>
    </item>`).join('\n')}
  </channel>
</rss>`;

  res.header('Content-Type', 'application/rss+xml');
  res.send(rss);
});

// -----------------------------------------------------------------------------
// VITE SPA MIDDLEWARE / PRODUCTION STATIC FILES
// -----------------------------------------------------------------------------

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const PORT = 3000;

  if (isProd) {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Tailor Trends] Server running on http://0.0.0.0:${PORT}`);
    console.log(`[Tailor Trends] Gemini API status: ${process.env.GEMINI_API_KEY ? 'Active (API Key loaded)' : 'Fallback mode (API Key not found)'}`);
  });
}

startServer();
