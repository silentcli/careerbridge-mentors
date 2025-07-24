import { User, UserProfile, MentorshipConnection, ForumPost, JobOpportunity, Event } from '../lib/types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'sarah.chen@email.com',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b6b70b24?w=150&h=150&fit=crop&crop=face',
    role: 'mentor',
    isVerified: true,
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    email: 'alex.rivera@email.com',
    name: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'mentee',
    isVerified: false,
    createdAt: '2024-02-01T00:00:00Z',
  },
  {
    id: '3',
    email: 'marcus.johnson@email.com',
    name: 'Marcus Johnson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'both',
    isVerified: true,
    createdAt: '2024-01-20T00:00:00Z',
  },
];

export const mockProfiles: UserProfile[] = [
  {
    id: '1',
    userId: '1',
    bio: 'Senior Software Engineer with 8 years of experience in full-stack development. Passionate about mentoring newcomers in tech and helping them navigate their career journey.',
    industry: 'Technology',
    experienceLevel: 'senior',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Leadership'],
    interests: ['Web Development', 'Cloud Architecture', 'Team Leadership'],
    location: 'San Francisco, CA',
    timezone: 'PST',
    availableForMentoring: true,
    mentorshipAreas: ['Technical Skills', 'Career Growth', 'Interview Preparation'],
    linkedinUrl: 'https://linkedin.com/in/sarahchen',
    githubUrl: 'https://github.com/sarahchen',
  },
  {
    id: '2',
    userId: '2',
    bio: 'Recent computer science graduate looking to break into the tech industry. Eager to learn from experienced professionals and contribute to meaningful projects.',
    industry: 'Technology',
    experienceLevel: 'entry',
    skills: ['JavaScript', 'Python', 'React', 'SQL'],
    interests: ['Frontend Development', 'Machine Learning', 'Startups'],
    goals: ['Land first tech job', 'Build portfolio projects', 'Improve coding skills'],
    location: 'New York, NY',
    timezone: 'EST',
    availableForMentoring: false,
    githubUrl: 'https://github.com/alexrivera',
  },
];

export const mockForumPosts: ForumPost[] = [
  {
    id: '1',
    authorId: '2',
    author: mockUsers[1],
    title: 'Tips for transitioning from bootcamp to first job?',
    content: 'I just completed a coding bootcamp and I\'m starting my job search. What should I focus on to make myself stand out to employers?',
    category: 'Career Advice',
    tags: ['bootcamp', 'job-search', 'entry-level'],
    replies: [],
    likes: 5,
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z',
  },
  {
    id: '2',
    authorId: '1',
    author: mockUsers[0],
    title: 'Best practices for code reviews',
    content: 'I\'m leading a team and want to establish effective code review practices. What has worked well for other senior developers?',
    category: 'Technical Discussion',
    tags: ['code-review', 'leadership', 'best-practices'],
    replies: [],
    likes: 12,
    createdAt: '2024-02-08T14:30:00Z',
    updatedAt: '2024-02-08T14:30:00Z',
  },
];

export const mockJobs: JobOpportunity[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'TechStart Inc.',
    description: 'Join our growing team as a Frontend Developer. We\'re looking for someone passionate about creating exceptional user experiences.',
    requirements: ['2+ years React experience', 'TypeScript proficiency', 'CSS/Sass skills'],
    location: 'San Francisco, CA',
    type: 'full-time',
    isRemote: true,
    salaryRange: {
      min: 80000,
      max: 120000,
      currency: 'USD',
    },
    postedBy: '1',
    mentorRecommended: true,
    applicants: ['2'],
    createdAt: '2024-02-05T00:00:00Z',
  },
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Career AMA with Industry Leaders',
    description: 'Join us for an Ask Me Anything session with senior engineers from top tech companies.',
    type: 'ama',
    hostId: '1',
    host: mockUsers[0],
    startDate: '2024-02-20T18:00:00Z',
    endDate: '2024-02-20T19:30:00Z',
    maxAttendees: 100,
    attendees: ['2', '3'],
    isVirtual: true,
    meetingLink: 'https://zoom.us/j/123456789',
    tags: ['career', 'tech', 'qa'],
    isPremium: false,
    createdAt: '2024-02-01T00:00:00Z',
  },
];