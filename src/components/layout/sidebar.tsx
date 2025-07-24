import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  House, 
  Users, 
  ChatCircle, 
  Briefcase, 
  Calendar, 
  Trophy,
  GraduationCap,
  Handshake
} from '@phosphor-icons/react';

type Page = 'dashboard' | 'mentors' | 'connections' | 'community' | 'jobs' | 'events' | 'leaderboard';

const navigation = [
  { name: 'Dashboard', page: 'dashboard' as Page, icon: House },
  { name: 'Find Mentors', page: 'mentors' as Page, icon: GraduationCap },
  { name: 'My Connections', page: 'connections' as Page, icon: Handshake },
  { name: 'Community', page: 'community' as Page, icon: ChatCircle, badge: '12' },
  { name: 'Jobs', page: 'jobs' as Page, icon: Briefcase, badge: '5' },
  { name: 'Events', page: 'events' as Page, icon: Calendar },
  { name: 'Leaderboard', page: 'leaderboard' as Page, icon: Trophy },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export function Sidebar({ isOpen, onClose, currentPage, onPageChange }: SidebarProps) {
  const handleNavigation = (page: Page) => {
    onPageChange(page);
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-64 transform bg-card border-r transition-transform duration-200 ease-in-out md:relative md:top-0 md:translate-x-0 md:z-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.page;
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-11",
                    isActive && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => handleNavigation(item.page)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </nav>
          
          <div className="p-4 border-t">
            <div className="bg-accent/50 rounded-lg p-4">
              <h3 className="font-medium text-sm mb-2">Upgrade to Premium</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Get unlimited messaging and exclusive events
              </p>
              <Button size="sm" className="w-full">
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}