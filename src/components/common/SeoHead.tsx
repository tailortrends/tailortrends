import React, { useEffect } from 'react';
import { Article, Industry } from '../../types/index.ts';

interface SeoHeadProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  article?: Article;
  industry?: Industry;
  ogType?: 'website' | 'article';
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  canonicalPath = '',
  article,
  industry,
  ogType = 'website'
}) => {
  useEffect(() => {
    // Determine dynamic title and meta
    let docTitle = title || 'Tailor Trends — AI & Emerging Technology Explained for Real-World Industries';
    if (!docTitle.includes('Tailor Trends')) {
      docTitle = `${docTitle} | Tailor Trends`;
    }

    const docDescription = 
      description || 
      article?.excerpt || 
      industry?.heroSubtitle || 
      'Follow the trend. Understand the technology. See how AI, robotics, and emerging tech change real-world industries.';

    document.title = docTitle;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', docDescription);

    // Update OpenGraph
    const updateOg = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateOg('og:title', docTitle);
    updateOg('og:description', docDescription);
    updateOg('og:type', article ? 'article' : ogType);
    updateOg('og:url', window.location.origin + (canonicalPath || window.location.pathname));

    if (article?.coverImage) {
      updateOg('og:image', article.coverImage);
    }

    // Update Twitter Cards
    const updateTwitter = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateTwitter('twitter:title', docTitle);
    updateTwitter('twitter:description', docDescription);
    if (article?.coverImage) {
      updateTwitter('twitter:image', article.coverImage);
    }

    // Dynamic Schema.org JSON-LD
    let scriptTag = document.getElementById('dynamic-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'dynamic-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    if (article) {
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.title,
        description: article.excerpt || article.subheadline,
        image: [article.coverImage],
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        author: {
          '@type': 'Person',
          name: article.author.name,
          jobTitle: article.author.role
        },
        publisher: {
          '@type': 'Organization',
          name: 'Tailor Trends',
          url: 'https://tailortrends.com'
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': window.location.href
        }
      };
      scriptTag.text = JSON.stringify(articleSchema);
    } else if (industry) {
      const collectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${industry.name} AI & Emerging Technology Hub`,
        description: industry.heroSubtitle,
        url: window.location.href,
        publisher: {
          '@type': 'Organization',
          name: 'Tailor Trends'
        }
      };
      scriptTag.text = JSON.stringify(collectionSchema);
    } else {
      const orgSchema = {
        '@context': 'https://schema.org',
        '@type': 'NewsMediaOrganization',
        name: 'Tailor Trends',
        url: 'https://tailortrends.com',
        description: 'Technology and industry publication explaining emerging technology and AI in practical, real-world ways.'
      };
      scriptTag.text = JSON.stringify(orgSchema);
    }
  }, [title, description, canonicalPath, article, industry, ogType]);

  return null;
};
