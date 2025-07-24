import { useState } from 'react';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { AuthForm } from '@/components/auth/auth-form';
import { Layout } from '@/components/layout/layout';
import { Dashboard } from '@/components/dashboard/dashboard';
import { MentorDirectory } from '@/components/mentors/mentor-directory';
import { Toaster } from '@/components/ui/sonner';

type Page = 'dashboard' | 'mentors' | 'connections' | 'community' | 'jobs' | 'events' | 'leaderboard';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'mentors':
        return <MentorDirectory />;
      case 'connections':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">My Connections</h1>
            <p className="text-muted-foreground">Manage your mentorship relationships</p>
            <div className="bg-muted/50 rounded-lg p-12 text-center">
              <p className="text-muted-foreground">Connections feature coming soon!</p>
            </div>
          </div>
        );
      case 'community':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Community</h1>
            <p className="text-muted-foreground">Join discussions and connect with peers</p>
            <div className="bg-muted/50 rounded-lg p-12 text-center">
              <p className="text-muted-foreground">Community forums coming soon!</p>
            </div>
          </div>
        );
      case 'jobs':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Job Opportunities</h1>
            <p className="text-muted-foreground">Discover mentor-recommended positions</p>
            <div className="bg-muted/50 rounded-lg p-12 text-center">
              <p className="text-muted-foreground">Job board coming soon!</p>
            </div>
          </div>
        );
      case 'events':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Events</h1>
            <p className="text-muted-foreground">Attend webinars, AMAs, and networking events</p>
            <div className="bg-muted/50 rounded-lg p-12 text-center">
              <p className="text-muted-foreground">Events calendar coming soon!</p>
            </div>
          </div>
        );
      case 'leaderboard':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Leaderboard</h1>
            <p className="text-muted-foreground">See top mentors and active community members</p>
            <div className="bg-muted/50 rounded-lg p-12 text-center">
              <p className="text-muted-foreground">Leaderboard coming soon!</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

export default App;