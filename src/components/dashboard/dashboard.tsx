import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CalendarDays, MessageCircle, TrendingUp, Users, Star, Clock, CheckCircle } from '@phosphor-icons/react';
import { useAuth } from '@/hooks/use-auth';
import { mockUsers, mockEvents, mockJobs, mockForumPosts } from '@/lib/mock-data';

export function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { label: 'Active Connections', value: '12', icon: Users, change: '+2 this week' },
    { label: 'Messages', value: '34', icon: MessageCircle, change: '+8 today' },
    { label: 'Events Attended', value: '6', icon: CalendarDays, change: '+1 this month' },
    { label: 'Profile Views', value: '89', icon: TrendingUp, change: '+15 this week' },
  ];

  const mentorshipGoals = [
    { title: 'Complete Portfolio Project', progress: 75, dueDate: '2024-02-28' },
    { title: 'Prepare for Technical Interviews', progress: 40, dueDate: '2024-03-15' },
    { title: 'Learn Advanced React Patterns', progress: 25, dueDate: '2024-03-30' },
  ];

  const recentActivity = [
    { type: 'message', title: 'New message from Sarah Chen', time: '2 hours ago', avatar: mockUsers[0].avatar },
    { type: 'event', title: 'Registered for Tech Career AMA', time: '1 day ago' },
    { type: 'connection', title: 'Marcus Johnson accepted your mentorship request', time: '2 days ago', avatar: mockUsers[2].avatar },
    { type: 'achievement', title: 'Earned "Active Learner" badge', time: '3 days ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening in your career journey</p>
        </div>
        <Button className="gap-2">
          <MessageCircle className="h-4 w-4" />
          Start Conversation
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Mentorship Goals */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Mentorship Goals
            </CardTitle>
            <CardDescription>Track your progress on career development goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mentorshipGoals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{goal.title}</h4>
                  <Badge variant="secondary">{goal.progress}%</Badge>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <p className="text-sm text-muted-foreground">Due: {new Date(goal.dueDate).toLocaleDateString()}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              Add New Goal
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                {activity.avatar ? (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="h-8 w-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <Clock className="h-4 w-4 text-accent" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recommended Mentors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Recommended Mentors
            </CardTitle>
            <CardDescription>Based on your interests and goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockUsers.filter(u => u.role === 'mentor' || u.role === 'both').slice(0, 2).map((mentor) => (
              <div key={mentor.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Avatar>
                  <AvatarImage src={mentor.avatar} />
                  <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{mentor.name}</p>
                  <p className="text-sm text-muted-foreground">Senior Software Engineer</p>
                  <div className="flex gap-1 mt-1">
                    <Badge variant="secondary" className="text-xs">React</Badge>
                    <Badge variant="secondary" className="text-xs">Leadership</Badge>
                  </div>
                </div>
                <Button size="sm">Connect</Button>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Mentors
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Don't miss these opportunities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockEvents.slice(0, 2).map((event) => (
              <div key={event.id} className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{event.type.toUpperCase()}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(event.startDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Events
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}