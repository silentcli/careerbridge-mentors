export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'mentee' | 'mentor' | 'both';
  isVerified: boolean;
  createdAt: string;
  profile?: UserProfile;
}

export interface UserProfile {
  id: string;
  userId: string;
  bio: string;
  industry: string;
  experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
  skills: string[];
  interests: string[];
  goals?: string[];
  location: string;
  timezone: string;
  availableForMentoring: boolean;
  mentorshipAreas?: string[];
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
}

export interface MentorshipConnection {
  id: string;
  mentorId: string;
  menteeId: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  goals: string[];
  startDate: string;
  endDate?: string;
  nextMeetingDate?: string;
  progressNotes: string[];
  createdAt: string;
}

export interface ForumPost {
  id: string;
  authorId: string;
  author: User;
  title: string;
  content: string;
  category: string;
  tags: string[];
  replies: ForumReply[];
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface ForumReply {
  id: string;
  authorId: string;
  author: User;
  content: string;
  parentId?: string;
  likes: number;
  createdAt: string;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  isRemote: boolean;
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  postedBy: string;
  mentorRecommended: boolean;
  applicants: string[];
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'webinar' | 'ama' | 'networking' | 'workshop';
  hostId: string;
  host: User;
  startDate: string;
  endDate: string;
  maxAttendees?: number;
  attendees: string[];
  isVirtual: boolean;
  meetingLink?: string;
  location?: string;
  tags: string[];
  isPremium: boolean;
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  criteria: string;
}

export interface UserBadge {
  id: string;
  userId: string;
  badgeId: string;
  badge: Badge;
  earnedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'connection_request' | 'message' | 'event_reminder' | 'achievement' | 'system';
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
}