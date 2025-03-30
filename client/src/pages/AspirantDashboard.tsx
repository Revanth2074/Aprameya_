import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Project, BlogPost, ResearchItem, Event } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const AspirantDashboard = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch current user, event registrations, and comments
  const { data: currentUser } = useQuery({
    queryKey: ['/api/users/me'],
    staleTime: 5000,
  });

  const { data: events = [] } = useQuery({
    queryKey: ['/api/events'],
    staleTime: 5000,
  });

  const { data: userEventRegistrations = [] } = useQuery({
    queryKey: ['/api/users/me/event-registrations'],
    staleTime: 5000,
  });

  const { data: userComments = [] } = useQuery({
    queryKey: ['/api/users/me/comments'],
    staleTime: 5000,
  });

  const { data: projects = [] } = useQuery({
    queryKey: ['/api/projects'],
    staleTime: 5000,
  });

  const { data: blogs = [] } = useQuery({
    queryKey: ['/api/blogs'],
    staleTime: 5000,
  });

  const { data: research = [] } = useQuery({
    queryKey: ['/api/research'],
    staleTime: 5000,
  });

  // Register for event mutation
  const registerForEvent = useMutation({
    mutationFn: (eventId: number) => 
      apiRequest('/api/event-registrations', { 
        method: 'POST', 
        body: JSON.stringify({ event_id: eventId }) 
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users/me/event-registrations'] });
      toast({
        title: 'Success',
        description: 'You have been registered for the event successfully',
      });
    },
  });

  // Cancel event registration mutation
  const cancelEventRegistration = useMutation({
    mutationFn: (registrationId: number) => 
      apiRequest(`/api/event-registrations/${registrationId}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users/me/event-registrations'] });
      toast({
        title: 'Success',
        description: 'Event registration cancelled successfully',
      });
    },
  });

  // Add comment mutation
  const addComment = useMutation({
    mutationFn: (comment: { content: string, project_id?: number, blog_id?: number, research_id?: number }) => 
      apiRequest('/api/comments', { method: 'POST', body: JSON.stringify(comment) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users/me/comments'] });
      toast({
        title: 'Success',
        description: 'Comment added successfully',
      });
    },
  });

  const handleRegisterForEvent = (eventId: number) => {
    registerForEvent.mutate(eventId);
  };

  const handleCancelRegistration = (registrationId: number) => {
    if (window.confirm('Are you sure you want to cancel this event registration?')) {
      cancelEventRegistration.mutate(registrationId);
    }
  };

  const isRegisteredForEvent = (eventId: number) => {
    return userEventRegistrations.some((reg: any) => reg.event_id === eventId);
  };

  const getRegistrationId = (eventId: number) => {
    const registration = userEventRegistrations.find((reg: any) => reg.event_id === eventId);
    return registration ? registration.id : null;
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Aspirant Dashboard</h1>
      
      {/* Welcome Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Welcome, {currentUser?.username || 'Aspirant'}!</CardTitle>
          <CardDescription>
            Explore events, track your registrations, and engage with our community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-blue-700 mb-1">Registered Events</h3>
              <p className="text-2xl font-bold">{userEventRegistrations.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-green-700 mb-1">Comments Posted</h3>
              <p className="text-2xl font-bold">{userComments.length}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-purple-700 mb-1">Account Status</h3>
              <p className="font-bold">
                <Badge className="bg-green-500">{currentUser?.role || 'ASPIRANT'}</Badge>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="events">
        <TabsList className="mb-6">
          <TabsTrigger value="events">Upcoming Events</TabsTrigger>
          <TabsTrigger value="registrations">My Registrations</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
        </TabsList>
        
        <TabsContent value="events" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(events as any[]).map((event) => {
              const isRegistered = isRegisteredForEvent(event.id);
              const registrationId = getRegistrationId(event.id);
              
              return (
                <Card key={event.id} className="overflow-hidden">
                  {event.image && (
                    <div className="h-48 overflow-hidden">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>{event.type} - {event.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3">{event.description}</p>
                    <p className="mt-2 text-sm">{event.location} at {event.time}</p>
                  </CardContent>
                  <CardFooter>
                    {isRegistered ? (
                      <Button 
                        variant="destructive" 
                        onClick={() => handleCancelRegistration(registrationId)}
                      >
                        Cancel Registration
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => handleRegisterForEvent(event.id)}
                      >
                        Register Now
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="registrations" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">My Event Registrations</h2>
          
          {(userEventRegistrations as any[]).length === 0 ? (
            <Card>
              <CardContent className="py-6">
                <p className="text-center text-gray-500">You haven't registered for any events yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(userEventRegistrations as any[]).map((registration) => (
                <Card key={registration.id}>
                  <CardHeader>
                    <CardTitle>{registration.event?.title || 'Event'}</CardTitle>
                    <CardDescription>
                      {registration.event?.date || 'Date TBA'} | {registration.event?.location || 'Location TBA'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2">{registration.event?.description || 'No description available'}</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleCancelRegistration(registration.id)}
                    >
                      Cancel Registration
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Explore Our Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(projects as any[]).map((project) => (
              <Card key={project.id} className="overflow-hidden">
                {project.image && (
                  <div className="h-48 overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3">{project.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.technologies.split(',').map((tech: string, index: number) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        {tech.trim()}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="blogs" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Latest Blogs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(blogs as any[]).map((blog) => (
              <Card key={blog.id} className="overflow-hidden">
                {blog.image && (
                  <div className="h-48 overflow-hidden">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{blog.title}</CardTitle>
                  <CardDescription>{blog.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3">{blog.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="research" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Research Publications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(research as any[]).map((item) => (
              <Card key={item.id} className="overflow-hidden">
                {item.image && (
                  <div className="h-48 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3">{item.description}</p>
                  <p className="mt-2 text-sm font-semibold">Citations: {item.citations}</p>
                  <p className="text-sm text-gray-600">Authors: {item.authors}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AspirantDashboard;