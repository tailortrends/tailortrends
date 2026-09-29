import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Share2, 
  Bookmark, 
  ArrowLeft, 
  Check, 
  Copy, 
  Tag as TagIcon, 
  ExternalLink,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { Article, ArticleBlock } from '../types/index.ts';
import { usePublishing } from '../context/PublishingContext.tsx';
import { SeoHead } from '../components/common/SeoHead.tsx';
import { TableOfContents } from '../components/article/TableOfContents.tsx';
import { 
  WhyThisMattersCard, 
  IndustryImpactCard, 
  TailorTrendsTakeawayCard, 
  TryItYourselfCard, 
  WhatToWatchTimeline, 
  VerifiedSourcesList 
} from '../components/article/SpecialBlocks.tsx';
import { SocialShareModal } from '../components/article/SocialShareModal.tsx';
import { NewsletterSection } from '../components/newsletter/NewsletterSection.tsx';
import { NewsletterModal } from '../components/newsletter/NewsletterModal.tsx';
import { ArticleCard } from '../components/article/ArticleCard.tsx';

interface ArticlePageProps {
  slug: string;
  onNavigate: (route: string) => void;
  onOpenArticle: (slug: string) => void;
  onOpenIndustry: (slug: string) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ 
  slug, 
  onNavigate, 
  onOpenArticle, 
  onOpenIndustry 
}) => {
  const { getArticleBySlug, articles, industries } = usePublishing();
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="min-h-screen py-24 text-center max-w-xl mx-auto px-4">
        <h2 className="font-display font-bold text-3xl mb-4">Article Not Found</h2>
        <p className="text-stone-600 dark:text-stone-400 mb-6 font-serif">
          The requested article may have been archived or moved.
        </p>
        <button
          onClick={() => onNavigate('home')}
          className="px-6 py-2.5 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-lg text-sm font-medium"
        >
          Return to Homepage
        </button>
      </div>
    );
  }

  const industryObj = industries.find(i => i.slug === article.primaryIndustry || i.id === article.primaryIndustry);
  const relatedArticles = articles
    .filter(a => a.id !== article.id && (a.primaryIndustry === article.primaryIndustry || a.tags.some(t => article.tags.includes(t))))
    .slice(0, 3);

  const formattedPublished = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(article.publishedAt));

  const formattedUpdated = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(article.updatedAt));

  return (
    <article className="min-h-screen pb-20">
      <SeoHead
        title={article.seo.metaTitle || article.title}
        description={article.seo.metaDescription || article.excerpt}
        article={article}
        industry={industryObj}
      />

      <SocialShareModal
        article={article}
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />

      {/* 30-Second Timed Newsletter Signup Modal */}
      <NewsletterModal
        articleSlug={article.slug}
        articleTitle={article.title}
        industryName={industryObj?.name || article.primaryIndustry}
        delayMs={30000}
      />

      {/* Breadcrumb Header Bar */}
      <div className="border-b border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between text-xs font-mono text-stone-500">
          <div className="flex items-center space-x-2">
            <button onClick={() => onNavigate('home')} className="hover:text-stone-900 dark:hover:text-stone-200">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <button 
              onClick={() => onOpenIndustry(article.primaryIndustry)}
              className="hover:text-amber-600 dark:hover:text-amber-400 font-bold uppercase"
            >
              {industryObj?.name || article.primaryIndustry}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="truncate max-w-[200px] sm:max-w-xs">{article.title}</span>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShareModalOpen(true)}
              className="flex items-center space-x-1 text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`flex items-center space-x-1 ${bookmarked ? 'text-amber-600' : 'text-stone-700 dark:text-stone-300 hover:text-stone-900'}`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-600' : ''}`} />
              <span className="hidden sm:inline">{bookmarked ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ARTICLE HEADER / TOP SECTION */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-8 text-center sm:text-left">
        <div className="flex flex-wrap items-center gap-2 mb-4 justify-center sm:justify-start">
          <button
            onClick={() => onOpenIndustry(article.primaryIndustry)}
            className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:bg-amber-600 dark:hover:bg-amber-400 dark:hover:text-stone-950 transition-colors"
          >
            {industryObj?.name || article.primaryIndustry}
          </button>
          <span className="px-2.5 py-1 rounded-full text-xs font-sans font-medium bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300">
            {article.type.replace(/_/g, ' ').toUpperCase()}
          </span>
          {article.trending && (
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500 text-stone-950">
              Trending
            </span>
          )}
        </div>

        <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-stone-900 dark:text-stone-50 leading-[1.12] tracking-tight">
          {article.title}
        </h1>

        {article.subheadline && (
          <p className="mt-5 text-stone-600 dark:text-stone-300 font-serif text-lg sm:text-2xl leading-relaxed">
            {article.subheadline}
          </p>
        )}

        {/* Metadata Row: Author, Published, Updated, Reading Time */}
        <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <img 
              src={article.author.avatar} 
              alt={article.author.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-stone-200 dark:border-stone-700" 
            />
            <div>
              <span className="font-sans font-bold text-stone-900 dark:text-stone-100 text-sm block">
                {article.author.name}
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400 font-mono block">
                {article.author.role}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono text-stone-500 dark:text-stone-400">
            <div>
              <span className="block text-stone-400">Published</span>
              <span className="font-medium text-stone-700 dark:text-stone-300">{formattedPublished}</span>
            </div>
            <span>•</span>
            <div>
              <span className="block text-stone-400">Read Time</span>
              <span className="font-medium text-stone-700 dark:text-stone-300">{article.readingTimeMinutes} min</span>
            </div>
          </div>
        </div>
      </header>

      {/* HERO IMAGE */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
        <div className="rounded-3xl overflow-hidden aspect-[16/9] sm:aspect-[21/10] bg-stone-200 dark:bg-stone-800 shadow-md">
          <img 
            src={article.coverImage} 
            alt={article.title}
            className="w-full h-full object-cover" 
          />
        </div>
        {article.coverImageCaption && (
          <p className="mt-2.5 text-center text-xs font-mono text-stone-500">
            {article.coverImageCaption}
          </p>
        )}
      </div>

      {/* MAIN CONTENT & SIDEBAR GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Reading Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Why This Matters Component */}
            {article.whyThisMatters && (
              <WhyThisMattersCard text={article.whyThisMatters} />
            )}

            {/* Structured Blocks */}
            <div className="prose prose-stone dark:prose-invert max-w-none">
              {article.blocks.map((block, idx) => (
                <RenderArticleBlock key={block.id || idx} block={block} isFirst={idx === 0} />
              ))}
            </div>

            {/* Industry Impact Component */}
            {article.industryImpact && (
              <IndustryImpactCard 
                summary={article.industryImpact.summary} 
                industriesAffected={article.industryImpact.industriesAffected} 
              />
            )}

            {/* Try It Yourself Component */}
            {article.tryItYourself && (
              <TryItYourselfCard data={article.tryItYourself} />
            )}

            {/* What To Watch Component */}
            {article.whatToWatch && article.whatToWatch.length > 0 && (
              <WhatToWatchTimeline milestones={article.whatToWatch} />
            )}

            {/* Tailor Trends Takeaway Component */}
            {article.takeaway && (
              <TailorTrendsTakeawayCard text={article.takeaway} />
            )}

            {/* Verified Sources Component */}
            <VerifiedSourcesList sources={article.sources} />

            {/* Tags Row */}
            <div className="mt-10 pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center gap-2">
              <span className="flex items-center text-xs font-mono text-stone-400 mr-2">
                <TagIcon className="w-3.5 h-3.5 mr-1" />
                Tags:
              </span>
              {article.tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => onNavigate(`tag:${tag}`)}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 hover:bg-amber-100 hover:text-amber-800 dark:hover:bg-amber-950 dark:hover:text-amber-300 transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>

            {/* Author Card Footer */}
            <div className="mt-8 p-6 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-start space-x-4">
              <img 
                src={article.author.avatar} 
                alt={article.author.name}
                className="w-14 h-14 rounded-full object-cover flex-shrink-0" 
              />
              <div>
                <span className="font-bold text-stone-900 dark:text-stone-100 text-base">
                  Written by {article.author.name}
                </span>
                <span className="text-xs font-mono text-stone-500 block mb-2">
                  {article.author.role}
                </span>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-serif leading-relaxed">
                  {article.author.bio}
                </p>
              </div>
            </div>

          </div>

          {/* Sticky Sidebar: Table of Contents & Related */}
          <div className="hidden lg:block lg:col-span-4 space-y-8">
            <TableOfContents blocks={article.blocks} />

            {/* Industry Focus Widget */}
            {industryObj && (
              <div className="p-6 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-2">
                  More in {industryObj.name}
                </span>
                <p className="text-xs text-stone-600 dark:text-stone-400 mb-4 font-serif">
                  {industryObj.shortDescription}
                </p>
                <button
                  onClick={() => onOpenIndustry(industryObj.slug)}
                  className="w-full py-2.5 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-mono font-semibold hover:bg-amber-500 dark:hover:bg-amber-400 dark:hover:text-stone-950 transition-colors"
                >
                  Explore {industryObj.name} Hub →
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* RELATED ARTICLES */}
      {relatedArticles.length > 0 && (
        <section className="mt-20 pt-16 border-t border-stone-200 dark:border-stone-800 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900 dark:text-stone-100">
              Related Industry Analysis
            </h2>
            <button 
              onClick={() => onOpenIndustry(article.primaryIndustry)}
              className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline"
            >
              View all {industryObj?.name || 'industry'} stories →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map(art => (
              <ArticleCard
                key={art.id}
                article={art}
                variant="standard"
                onClick={() => onOpenArticle(art.slug)}
              />
            ))}
          </div>
        </section>
      )}

      {/* NEWSLETTER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <NewsletterSection sourcePage={`article:${article.slug}`} />
      </div>
    </article>
  );
};

// Helper for rendering article blocks
const RenderArticleBlock: React.FC<{ block: ArticleBlock; isFirst?: boolean }> = ({ block, isFirst }) => {
  switch (block.type) {
    case 'h1':
      return <h1 id={block.id} className="font-display text-3xl font-bold mt-8 mb-4">{block.content}</h1>;
    case 'h2':
      return <h2 id={block.id} className="font-display text-2xl sm:text-3xl font-bold mt-10 mb-4 text-stone-900 dark:text-stone-100 border-b border-stone-200/60 dark:border-stone-800/60 pb-2">{block.content}</h2>;
    case 'h3':
      return <h3 id={block.id} className="font-sans text-xl font-bold mt-6 mb-3 text-stone-900 dark:text-stone-100">{block.content}</h3>;
    case 'paragraph':
      return (
        <p className={`font-serif text-lg leading-relaxed text-stone-800 dark:text-stone-200 my-4 ${isFirst ? 'editorial-drop-cap' : ''}`}>
          {block.content}
        </p>
      );
    case 'quote':
      return (
        <blockquote className="my-8 pl-6 border-l-4 border-amber-500 italic font-serif text-xl sm:text-2xl text-stone-800 dark:text-stone-200 py-1">
          "{block.content}"
        </blockquote>
      );
    case 'image':
      return (
        <div className="my-8">
          <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-stone-200 dark:bg-stone-800">
            <img src={block.content} alt={block.extra?.caption || ''} className="w-full h-full object-cover" />
          </div>
          {block.extra?.caption && (
            <p className="mt-2 text-center text-xs font-mono text-stone-500">{block.extra.caption}</p>
          )}
        </div>
      );
    case 'callout':
      return (
        <div className={`my-6 p-5 rounded-xl border text-sm font-sans leading-relaxed ${
          block.extra?.calloutVariant === 'warning' 
            ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200'
            : 'bg-stone-100 dark:bg-stone-800/70 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200'
        }`}>
          {block.content}
        </div>
      );
    case 'prompt':
      return (
        <div className="my-6 p-5 rounded-2xl bg-stone-900 text-stone-100 border border-stone-800 font-mono text-xs">
          <div className="text-amber-400 font-bold uppercase mb-2">Prompt Template: {block.content}</div>
          {block.extra?.promptExampleInput && (
            <div className="mb-2 p-3 bg-stone-950 rounded border border-stone-800">
              <span className="text-stone-500 block text-[10px]">INPUT:</span>
              <p className="text-stone-300 whitespace-pre-wrap">{block.extra.promptExampleInput}</p>
            </div>
          )}
          {block.extra?.promptExampleOutput && (
            <div className="p-3 bg-stone-800/50 rounded border border-stone-700">
              <span className="text-stone-400 block text-[10px]">OUTPUT:</span>
              <p className="text-stone-200 whitespace-pre-wrap">{block.extra.promptExampleOutput}</p>
            </div>
          )}
        </div>
      );
    case 'list':
      return (
        <div className="my-6">
          {block.content && <h4 className="font-bold text-sm uppercase font-mono text-stone-500 mb-3">{block.content}</h4>}
          <ul className="space-y-2.5">
            {block.extra?.items?.map((item, i) => (
              <li key={i} className="flex items-start text-sm sm:text-base font-serif text-stone-700 dark:text-stone-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-3 mt-2.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    default:
      return <p className="font-serif text-lg leading-relaxed text-stone-800 dark:text-stone-200 my-4">{block.content}</p>;
  }
};
