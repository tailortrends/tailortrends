import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { PublishingProvider } from './context/PublishingContext.tsx';
import { Header } from './components/common/Header.tsx';
import { Footer } from './components/common/Footer.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { ArticlePage } from './pages/ArticlePage.tsx';
import { IndustryPage } from './pages/IndustryPage.tsx';
import { IndustriesDirectoryPage } from './pages/IndustriesDirectoryPage.tsx';
import { SearchPage } from './pages/SearchPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { AdminDashboard } from './pages/admin/AdminDashboard.tsx';
import { AdminArticleEditor } from './pages/admin/AdminArticleEditor.tsx';
import { AdminResearchWorkspace } from './pages/admin/AdminResearchWorkspace.tsx';
import { AdminStoryIdeaEngine } from './pages/admin/AdminStoryIdeaEngine.tsx';
import { AdminNewsInbox } from './pages/admin/AdminNewsInbox.tsx';
import { AdminSubscribers } from './pages/admin/AdminSubscribers.tsx';

export default function App() {
  const [route, setRoute] = useState<string>('home');
  const [editingArticleId, setEditingArticleId] = useState<string | undefined>(undefined);

  // Initialize and listen to hash or path for clean navigation
  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname;
      const hash = window.location.hash.replace(/^#\/?/, '');

      if (hash) {
        setRoute(hash);
      } else if (path.startsWith('/articles/')) {
        const slug = path.replace('/articles/', '');
        setRoute(`article:${slug}`);
      } else if (path.startsWith('/industries/')) {
        const slug = path.replace('/industries/', '');
        setRoute(`industry:${slug}`);
      } else if (path === '/admin') {
        setRoute('admin');
      } else if (path === '/about') {
        setRoute('about');
      } else if (path === '/search') {
        setRoute('search');
      } else if (path === '/industries') {
        setRoute('industries-directory');
      } else {
        setRoute('home');
      }
    };

    handleLocation();
    window.addEventListener('popstate', handleLocation);
    window.addEventListener('hashchange', handleLocation);
    return () => {
      window.removeEventListener('popstate', handleLocation);
      window.removeEventListener('hashchange', handleLocation);
    };
  }, []);

  const navigateTo = (newRoute: string) => {
    setRoute(newRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update browser URL history for clean URLs
    if (newRoute === 'home') {
      window.history.pushState({}, '', '/');
    } else if (newRoute.startsWith('article:')) {
      const slug = newRoute.replace('article:', '');
      window.history.pushState({}, '', `/articles/${slug}`);
    } else if (newRoute.startsWith('industry:')) {
      const slug = newRoute.replace('industry:', '');
      window.history.pushState({}, '', `/industries/${slug}`);
    } else if (newRoute === 'industries-directory') {
      window.history.pushState({}, '', '/industries');
    } else if (newRoute === 'about') {
      window.history.pushState({}, '', '/about');
    } else if (newRoute === 'search') {
      window.history.pushState({}, '', '/search');
    } else if (newRoute.startsWith('admin')) {
      window.history.pushState({}, '', '/admin');
    }
  };

  const handleOpenArticle = (slug: string) => {
    navigateTo(`article:${slug}`);
  };

  const handleOpenIndustry = (slug: string) => {
    navigateTo(`industry:${slug}`);
  };

  const handleEditArticle = (id: string) => {
    setEditingArticleId(id);
    navigateTo('admin-editor');
  };

  const handleCreateArticle = () => {
    setEditingArticleId(undefined);
    navigateTo('admin-editor');
  };

  // Determine current page
  const renderCurrentView = () => {
    if (route === 'home') {
      return (
        <HomePage 
          onNavigate={navigateTo} 
          onOpenArticle={handleOpenArticle} 
          onOpenIndustry={handleOpenIndustry} 
        />
      );
    }

    if (route.startsWith('article:')) {
      const slug = route.replace('article:', '');
      return (
        <ArticlePage 
          slug={slug} 
          onNavigate={navigateTo} 
          onOpenArticle={handleOpenArticle} 
          onOpenIndustry={handleOpenIndustry} 
        />
      );
    }

    if (route.startsWith('industry:')) {
      const slug = route.replace('industry:', '');
      return (
        <IndustryPage 
          industrySlug={slug} 
          onNavigate={navigateTo} 
          onOpenArticle={handleOpenArticle} 
        />
      );
    }

    if (route === 'industries-directory') {
      return (
        <IndustriesDirectoryPage 
          onOpenIndustry={handleOpenIndustry} 
          onNavigate={navigateTo} 
        />
      );
    }

    if (route === 'search') {
      return <SearchPage onOpenArticle={handleOpenArticle} onNavigate={navigateTo} />;
    }

    if (route === 'ai-news') {
      return <SearchPage onOpenArticle={handleOpenArticle} onNavigate={navigateTo} initialQuery="AI News" />;
    }

    if (route === 'tools') {
      return <SearchPage onOpenArticle={handleOpenArticle} onNavigate={navigateTo} initialQuery="Tool Breakdown" />;
    }

    if (route === 'guides') {
      return <SearchPage onOpenArticle={handleOpenArticle} onNavigate={navigateTo} initialQuery="Practical Guide" />;
    }

    if (route === 'deep-dives') {
      return <SearchPage onOpenArticle={handleOpenArticle} onNavigate={navigateTo} initialQuery="Deep Dive" />;
    }

    if (route.startsWith('tag:')) {
      const tag = route.replace('tag:', '');
      return <SearchPage onOpenArticle={handleOpenArticle} onNavigate={navigateTo} initialQuery={tag} />;
    }

    if (route === 'about') {
      return <AboutPage onNavigate={navigateTo} />;
    }

    // Admin Routes
    if (route === 'admin') {
      return (
        <AdminDashboard 
          onNavigate={navigateTo} 
          onEditArticle={handleEditArticle} 
          onCreateArticle={handleCreateArticle}
          onOpenArticle={handleOpenArticle} 
        />
      );
    }

    if (route === 'admin-editor') {
      return (
        <AdminArticleEditor 
          articleId={editingArticleId} 
          onNavigate={navigateTo} 
          onOpenArticle={handleOpenArticle} 
        />
      );
    }

    if (route === 'admin-research') {
      return (
        <AdminResearchWorkspace 
          onNavigate={navigateTo} 
          onEditArticle={handleEditArticle} 
        />
      );
    }

    if (route === 'admin-story-ideas') {
      return (
        <AdminStoryIdeaEngine 
          onNavigate={navigateTo} 
          onEditArticle={handleEditArticle} 
        />
      );
    }

    if (route === 'admin-news-inbox') {
      return (
        <AdminNewsInbox 
          onNavigate={navigateTo} 
          onEditArticle={handleEditArticle} 
        />
      );
    }

    if (route === 'admin-subscribers') {
      return <AdminSubscribers onNavigate={navigateTo} />;
    }

    return (
      <HomePage 
        onNavigate={navigateTo} 
        onOpenArticle={handleOpenArticle} 
        onOpenIndustry={handleOpenIndustry} 
      />
    );
  };

  const isAdminView = route.startsWith('admin');

  return (
    <ThemeProvider>
      <PublishingProvider>
        <div className="min-h-screen flex flex-col font-sans antialiased text-stone-900 dark:text-stone-100 bg-stone-50 dark:bg-stone-950 transition-colors">
          
          <Header 
            onOpenSearch={() => navigateTo('search')}
            onNavigate={navigateTo}
            currentRoute={route}
          />

          <main className="flex-1">
            {renderCurrentView()}
          </main>

          {!isAdminView && (
            <Footer onNavigate={navigateTo} />
          )}

        </div>
      </PublishingProvider>
    </ThemeProvider>
  );
}
