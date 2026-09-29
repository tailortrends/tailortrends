import React, { useEffect, useState } from 'react';
import { ListFilter } from 'lucide-react';
import { ArticleBlock } from '../../types/index.ts';

interface TableOfContentsProps {
  blocks: ArticleBlock[];
}

interface TocItem {
  id: string;
  title: string;
  level: number;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ blocks }) => {
  const [activeId, setActiveId] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const headings: TocItem[] = blocks
    .filter(b => b.type === 'h2' || b.type === 'h3')
    .map(b => ({
      id: b.id,
      title: b.content,
      level: b.type === 'h2' ? 2 : 3
    }));

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Check current section in view
      const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        const rect = el.getBoundingClientRect();
        if (rect.top <= 140) {
          setActiveId(el.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-28 p-5 rounded-2xl bg-stone-100/70 dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800 backdrop-blur-xs">
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-1.5">
          <span className="flex items-center">
            <ListFilter className="w-3.5 h-3.5 mr-1 text-amber-600 dark:text-amber-400" />
            Table of Contents
          </span>
          <span className="font-bold text-stone-800 dark:text-stone-200">{Math.round(scrollProgress)}% Read</span>
        </div>
        <div className="w-full h-1 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-amber-500 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      <nav className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
        {headings.map(h => (
          <button
            key={h.id}
            onClick={() => scrollToHeading(h.id)}
            className={`w-full text-left transition-colors text-xs leading-snug py-1 block ${
              h.level === 3 ? 'pl-4' : 'pl-0'
            } ${
              activeId === h.id
                ? 'text-amber-600 dark:text-amber-400 font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            {h.title}
          </button>
        ))}
      </nav>
    </div>
  );
};
