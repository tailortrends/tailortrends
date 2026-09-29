import React, { useState } from 'react';
import { 
  Search, 
  Moon, 
  Sun, 
  ChevronDown, 
  SlidersHorizontal, 
  Menu, 
  X,
  PenTool,
  Bookmark,
  TrendingUp,
  Cpu,
  Hammer,
  Building2,
  Car,
  Wheat,
  Activity,
  Fan,
  Store,
  Bot
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.tsx';
import { usePublishing } from '../../context/PublishingContext.tsx';

interface HeaderProps {
  onOpenSearch: () => void;
  onNavigate: (route: string) => void;
  currentRoute: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onNavigate, currentRoute }) => {
  const { theme, toggleTheme } = useTheme();
  const { industries, articles } = usePublishing();
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const draftCount = articles.filter(a => a.status === 'draft' || a.status === 'editing').length;

  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  const navLinks = [
    { label: 'Home', route: 'home' },
    { label: 'AI News', route: 'ai-news' },
    { label: 'Tools', route: 'tools' },
    { label: 'Guides', route: 'guides' },
    { label: 'Deep Dives', route: 'deep-dives' },
    { label: 'About', route: 'about' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      {/* Top Editorial Bar */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1.5 text-xs text-stone-500 dark:text-stone-400 border-b border-stone-200/70 dark:border-stone-800/70 font-mono tracking-tight">
        <div className="flex items-center space-x-4">
          <span>{today}</span>
          <span className="text-stone-300 dark:text-stone-700">•</span>
          <span className="flex items-center text-amber-600 dark:text-amber-400 font-sans font-medium">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            Field-tested technology for real-world industries
          </span>
        </div>
        <div className="flex items-center space-x-5">
          <span className="italic font-serif">"Follow the trend. Understand the technology. See how it changes the real world."</span>
          <button 
            onClick={() => onNavigate('admin')}
            className="flex items-center text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 font-sans font-medium transition-colors"
          >
            <PenTool className="w-3.5 h-3.5 mr-1" />
            Editorial CMS
            {draftCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[10px] font-bold">
                {draftCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate('home')} 
              className="text-left group flex items-center space-x-3 focus:outline-none"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 flex items-center justify-center font-display font-bold text-xl sm:text-2xl shadow-sm group-hover:scale-105 transition-transform">
                T<span className="text-amber-500 font-sans text-lg">T</span>
              </div>
              <div>
                <span className="font-display tracking-tight text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50 block leading-tight">
                  TAILOR <span className="text-amber-600 dark:text-amber-400 font-normal italic">TRENDS</span>
                </span>
                <span className="hidden sm:block text-[10px] uppercase font-mono tracking-widest text-stone-500 dark:text-stone-400 -mt-0.5">
                  Technology • Industry • Reality
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentRoute === 'home'
                  ? 'text-amber-600 dark:text-amber-400 font-semibold'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onNavigate('ai-news')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentRoute === 'ai-news'
                  ? 'text-amber-600 dark:text-amber-400 font-semibold'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100'
              }`}
            >
              AI News
            </button>

            {/* Industries Mega Dropdown */}
            <div className="relative" onMouseLeave={() => setIndustriesOpen(false)}>
              <button
                onClick={() => setIndustriesOpen(!industriesOpen)}
                onMouseEnter={() => setIndustriesOpen(true)}
                className={`px-3 py-2 rounded-md flex items-center space-x-1 transition-colors ${
                  currentRoute.startsWith('industry')
                    ? 'text-amber-600 dark:text-amber-400 font-semibold'
                    : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100'
                }`}
              >
                <span>Industries</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${industriesOpen ? 'rotate-180' : ''}`} />
              </button>

              {industriesOpen && (
                <div 
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-[560px] bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-xl p-5 z-50 grid grid-cols-2 gap-3"
                  onMouseEnter={() => setIndustriesOpen(true)}
                >
                  <div className="col-span-2 pb-2 mb-1 border-b border-stone-200 dark:border-stone-800 flex justify-between items-center">
                    <span className="text-xs uppercase font-mono font-bold tracking-wider text-stone-500">
                      Real-World Industry Hubs ({industries.length})
                    </span>
                    <button 
                      onClick={() => {
                        setIndustriesOpen(false);
                        onNavigate('industries-directory');
                      }}
                      className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-medium"
                    >
                      View All Industries →
                    </button>
                  </div>
                  
                  {industries.slice(0, 10).map((ind) => (
                    <button
                      key={ind.id}
                      onClick={() => {
                        setIndustriesOpen(false);
                        onNavigate(`industry:${ind.slug}`);
                      }}
                      className="text-left p-2.5 rounded-lg hover:bg-stone-200/60 dark:hover:bg-stone-800/80 transition-colors group"
                    >
                      <div className="font-semibold text-stone-900 dark:text-stone-100 text-sm group-hover:text-amber-600 dark:group-hover:text-amber-400">
                        {ind.name}
                      </div>
                      <div className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                        {ind.shortDescription}
                      </div>
                    </button>
                  ))}
                  
                  <div className="col-span-2 pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
                    <span>Includes HVAC, Trades, Real Estate, Farming & more</span>
                    <button
                      onClick={() => {
                        setIndustriesOpen(false);
                        onNavigate('industries-directory');
                      }}
                      className="font-medium text-stone-900 dark:text-stone-200 underline"
                    >
                      Explore Full Directory
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('tools')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentRoute === 'tools'
                  ? 'text-amber-600 dark:text-amber-400 font-semibold'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100'
              }`}
            >
              Tools
            </button>

            <button
              onClick={() => onNavigate('guides')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentRoute === 'guides'
                  ? 'text-amber-600 dark:text-amber-400 font-semibold'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100'
              }`}
            >
              Guides
            </button>

            <button
              onClick={() => onNavigate('deep-dives')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentRoute === 'deep-dives'
                  ? 'text-amber-600 dark:text-amber-400 font-semibold'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100'
              }`}
            >
              Deep Dives
            </button>

            <button
              onClick={() => onNavigate('about')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentRoute === 'about'
                  ? 'text-amber-600 dark:text-amber-400 font-semibold'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100'
              }`}
            >
              About
            </button>
          </nav>

          {/* Right Action Icons: Search, Dark Mode, Admin Button, Mobile Trigger */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-50 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 rounded-full transition-colors"
              title="Search articles, industries, and tools"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-50 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 rounded-full transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Admin CMS Trigger (Visible on all viewports) */}
            <button
              onClick={() => onNavigate('admin')}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-900 hover:text-white dark:hover:bg-stone-100 dark:hover:text-stone-950 transition-all shadow-xs"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 rounded-md"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.route}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate(link.route);
                }}
                className={`text-left px-3 py-2 rounded-lg text-base font-medium ${
                  currentRoute === link.route
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-semibold'
                    : 'text-stone-800 dark:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800/50'
                }`}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('industries-directory');
              }}
              className="text-left px-3 py-2 rounded-lg text-base font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 flex items-center justify-between"
            >
              <span>All Industries</span>
              <span className="text-xs bg-stone-200 dark:bg-stone-800 px-2 py-0.5 rounded-full">{industries.length}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('admin');
              }}
              className="text-left px-3 py-2 rounded-lg text-base font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-stone-900 border border-amber-200 dark:border-stone-800 mt-2 flex items-center justify-between"
            >
              <span className="flex items-center">
                <PenTool className="w-4 h-4 mr-2" />
                Editorial CMS & AI Assistant
              </span>
              {draftCount > 0 && (
                <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">
                  {draftCount}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
