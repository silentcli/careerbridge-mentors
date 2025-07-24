import { useState } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { useAuth } from '@/hooks/use-auth';

type Page = 'dashboard' | 'mentors' | 'connections' | 'community' | 'jobs' | 'events' | 'leaderboard';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export function Layout({ children, currentPage, onPageChange }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onMobileMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
        
        <main className="flex-1 min-h-[calc(100vh-4rem)] p-4 md:p-6 md:ml-0">
          {children}
        </main>
      </div>
    </div>
  );
}