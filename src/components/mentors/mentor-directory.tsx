import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search, MapPin, Star, MessageCircle, Calendar, Filter } from '@phosphor-icons/react';
import { mockUsers, mockProfiles } from '@/lib/mock-data';
import { toast } from 'sonner';

export function MentorDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [experienceRange, setExperienceRange] = useState([0, 10]);
  const [showFilters, setShowFilters] = useState(false);

  const mentors = mockUsers.filter(user => user.role === 'mentor' || user.role === 'both');
  const profiles = mockProfiles.filter(profile => 
    mentors.some(mentor => mentor.id === profile.userId)
  );

  const industries = ['all', 'Technology', 'Finance', 'Healthcare', 'Marketing', 'Design'];

  const handleConnect = (mentorName: string) => {
    toast.success(`Connection request sent to ${mentorName}!`);
  };

  const handleMessage = (mentorName: string) => {
    toast.info(`Opening chat with ${mentorName}`);
  };

  const filteredProfiles = profiles.filter(profile => {
    const mentor = mentors.find(m => m.id === profile.userId);
    if (!mentor) return false;

    const matchesSearch = !searchQuery || 
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesIndustry = selectedIndustry === 'all' || profile.industry === selectedIndustry;

    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Find Mentors</h1>
          <p className="text-muted-foreground mt-1">Connect with experienced professionals in your field</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, skills, or expertise..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {showFilters && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pt-4 border-t">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Industry</label>
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map(industry => (
                        <SelectItem key={industry} value={industry}>
                          {industry === 'all' ? 'All Industries' : industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Experience Level</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Level</SelectItem>
                      <SelectItem value="mid">Mid-Level (3-7 years)</SelectItem>
                      <SelectItem value="senior">Senior (7+ years)</SelectItem>
                      <SelectItem value="executive">Executive (10+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Availability</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Availability</SelectItem>
                      <SelectItem value="immediate">Available Now</SelectItem>
                      <SelectItem value="within-week">Within a Week</SelectItem>
                      <SelectItem value="within-month">Within a Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredProfiles.length} mentors
        </p>
        <Select defaultValue="recommended">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="experience">Most Experienced</SelectItem>
            <SelectItem value="recent">Most Active</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Mentor Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProfiles.map((profile) => {
          const mentor = mentors.find(m => m.id === profile.userId);
          if (!mentor) return null;

          return (
            <Card key={profile.id} className="group hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={mentor.avatar} />
                    <AvatarFallback className="text-lg">
                      {mentor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{mentor.name}</CardTitle>
                      {mentor.isVerified && (
                        <Badge variant="secondary" className="text-xs">Verified</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{profile.industry}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">4.9</span>
                      <span className="text-xs text-muted-foreground">(24 reviews)</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">{profile.bio}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {profile.location}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {profile.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {profile.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{profile.skills.length - 3} more
                    </Badge>
                  )}
                </div>

                {profile.mentorshipAreas && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Mentoring in:</p>
                    <div className="flex flex-wrap gap-1">
                      {profile.mentorshipAreas.map((area) => (
                        <Badge key={area} className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button 
                    onClick={() => handleConnect(mentor.name)}
                    className="flex-1"
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleMessage(mentor.name)}
                    className="gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProfiles.length === 0 && (
        <Card className="p-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-medium">No mentors found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setSelectedIndustry('all');
            }}>
              Clear Filters
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}