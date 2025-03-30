import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Project, BlogPost, ResearchItem, Event } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const CoreTeamDashboard = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch projects, blogs, research items, and events
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

  const { data: events = [] } = useQuery({
    queryKey: ['/api/events'],
    staleTime: 5000,
  });

  // Message thread for core team
  const { data: messages = [] } = useQuery({
    queryKey: ['/api/messages'],
    staleTime: 5000,
  });

  const [newMessage, setNewMessage] = useState('');

  // Mutations
  const createProject = useMutation({
    mutationFn: (project: Omit<Project, 'id'>) => 
      apiRequest('/api/projects', { method: 'POST', body: JSON.stringify(project) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({
        title: 'Success',
        description: 'Project created successfully',
      });
      setSelectedItem(null);
      setIsEditing(false);
    },
  });

  const updateProject = useMutation({
    mutationFn: (project: Project) => 
      apiRequest(`/api/projects/${project.id}`, { method: 'PATCH', body: JSON.stringify(project) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({
        title: 'Success',
        description: 'Project updated successfully',
      });
      setSelectedItem(null);
      setIsEditing(false);
    },
  });

  const createBlog = useMutation({
    mutationFn: (blog: Omit<BlogPost, 'id'>) => 
      apiRequest('/api/blogs', { method: 'POST', body: JSON.stringify(blog) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blogs'] });
      toast({
        title: 'Success',
        description: 'Blog post created successfully',
      });
      setSelectedItem(null);
      setIsEditing(false);
    },
  });

  const updateBlog = useMutation({
    mutationFn: (blog: BlogPost) => 
      apiRequest(`/api/blogs/${blog.id}`, { method: 'PATCH', body: JSON.stringify(blog) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blogs'] });
      toast({
        title: 'Success',
        description: 'Blog post updated successfully',
      });
      setSelectedItem(null);
      setIsEditing(false);
    },
  });

  const createResearch = useMutation({
    mutationFn: (research: Omit<ResearchItem, 'id'>) => 
      apiRequest('/api/research', { method: 'POST', body: JSON.stringify(research) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/research'] });
      toast({
        title: 'Success',
        description: 'Research item created successfully',
      });
      setSelectedItem(null);
      setIsEditing(false);
    },
  });

  const updateResearch = useMutation({
    mutationFn: (research: ResearchItem) => 
      apiRequest(`/api/research/${research.id}`, { method: 'PATCH', body: JSON.stringify(research) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/research'] });
      toast({
        title: 'Success',
        description: 'Research item updated successfully',
      });
      setSelectedItem(null);
      setIsEditing(false);
    },
  });

  const createEvent = useMutation({
    mutationFn: (event: Omit<Event, 'id'>) => 
      apiRequest('/api/events', { method: 'POST', body: JSON.stringify(event) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      toast({
        title: 'Success',
        description: 'Event created successfully',
      });
      setSelectedItem(null);
      setIsEditing(false);
    },
  });

  const updateEvent = useMutation({
    mutationFn: (event: Event) => 
      apiRequest(`/api/events/${event.id}`, { method: 'PATCH', body: JSON.stringify(event) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      toast({
        title: 'Success',
        description: 'Event updated successfully',
      });
      setSelectedItem(null);
      setIsEditing(false);
    },
  });

  const sendMessage = useMutation({
    mutationFn: (content: string) => 
      apiRequest('/api/messages', { method: 'POST', body: JSON.stringify({ content }) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
      setNewMessage('');
    },
  });

  // Generic form handlers
  const handleEdit = (item: any, type: string) => {
    setSelectedItem({ ...item, type });
    setIsEditing(true);
  };

  const handleCreate = (type: string) => {
    const newItem: any = {};
    
    if (type === 'project') {
      newItem.title = '';
      newItem.description = '';
      newItem.category = '';
      newItem.technologies = '';
      newItem.team = '';
      newItem.image = '';
    } else if (type === 'blog') {
      newItem.title = '';
      newItem.excerpt = '';
      newItem.content = '';
      newItem.category = '';
      newItem.image = '';
    } else if (type === 'research') {
      newItem.title = '';
      newItem.description = '';
      newItem.category = '';
      newItem.authors = '';
      newItem.citations = 0;
      newItem.image = '';
    } else if (type === 'event') {
      newItem.title = '';
      newItem.description = '';
      newItem.type = '';
      newItem.date = '';
      newItem.time = '';
      newItem.location = '';
      newItem.image = '';
    }
    
    setSelectedItem({ ...newItem, type });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setSelectedItem(null);
    setIsEditing(false);
  };

  const handleSave = () => {
    if (!selectedItem) return;

    const { type, ...item } = selectedItem;

    if (type === 'project') {
      if (item.id) {
        updateProject.mutate(item as Project);
      } else {
        createProject.mutate(item as Omit<Project, 'id'>);
      }
    } else if (type === 'blog') {
      if (item.id) {
        updateBlog.mutate(item as BlogPost);
      } else {
        createBlog.mutate(item as Omit<BlogPost, 'id'>);
      }
    } else if (type === 'research') {
      if (item.id) {
        updateResearch.mutate(item as ResearchItem);
      } else {
        createResearch.mutate(item as Omit<ResearchItem, 'id'>);
      }
    } else if (type === 'event') {
      if (item.id) {
        updateEvent.mutate(item as Event);
      } else {
        createEvent.mutate(item as Omit<Event, 'id'>);
      }
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    if (!selectedItem) return;
    setSelectedItem({ ...selectedItem, [field]: value });
  };

  const renderForm = () => {
    if (!selectedItem) return null;
    
    const { type } = selectedItem;
    
    if (type === 'project') {
      return (
        <Card className="w-full mb-6">
          <CardHeader>
            <CardTitle>{selectedItem.id ? 'Edit Project' : 'New Project'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input 
                id="title" 
                value={selectedItem.title} 
                onChange={(e) => handleInputChange('title', e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="category" className="text-sm font-medium">Category</label>
              <Input 
                id="category" 
                value={selectedItem.category} 
                onChange={(e) => handleInputChange('category', e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea 
                id="description" 
                value={selectedItem.description} 
                onChange={(e) => handleInputChange('description', e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="technologies" className="text-sm font-medium">Technologies (comma separated)</label>
              <Input 
                id="technologies" 
                value={selectedItem.technologies} 
                onChange={(e) => handleInputChange('technologies', e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="team" className="text-sm font-medium">Team Members (comma separated)</label>
              <Input 
                id="team" 
                value={selectedItem.team} 
                onChange={(e) => handleInputChange('team', e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="image" className="text-sm font-medium">Image URL</label>
              <Input 
                id="image" 
                value={selectedItem.image} 
                onChange={(e) => handleInputChange('image', e.target.value)} 
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </CardFooter>
        </Card>
      );
    } else if (type === 'blog') {
      return (
        <Card className="w-full mb-6">
          <CardHeader>
            <CardTitle>{selectedItem.id ? 'Edit Blog Post' : 'New Blog Post'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input 
                id="title" 
                value={selectedItem.title} 
                onChange={(e) => handleInputChange('title', e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="excerpt" className="text-sm font-medium">Excerpt</label>
              <Input 
                id="excerpt" 
                value={selectedItem.excerpt} 
                onChange={(e) => handleInputChange('excerpt', e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="content" className="text-sm font-medium">Content</label>
              <Textarea 
                id="content" 
                value={selectedItem.content} 
                rows={6}
                onChange={(e) => handleInputChange('content', e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="category" className="text-sm font-medium">Category</label>
              <Input 
                id="category" 
                value={selectedItem.category} 
                onChange={(e) => handleInputChange('category', e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="image" className="text-sm font-medium">Image URL</label>
              <Input 
                id="image" 
                value={selectedItem.image} 
                onChange={(e) => handleInputChange('image', e.target.value)} 
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </CardFooter>
        </Card>
      );
    } else if (type === 'research') {
      return (
        <Card className="w-full mb-6">
          <CardHeader>
            <CardTitle>{selectedItem.id ? 'Edit Research Item' : 'New Research Item'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input 
                id="title" 
                value={selectedItem.title} 
                onChange={(e) => handleInputChange('title', e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="category" className="text-sm font-medium">Category</label>
              <Input 
                id="category" 
                value={selectedItem.category} 
                onChange={(e) => handleInputChange('category', e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea 
                id="description" 
                value={selectedItem.description} 
                onChange={(e) => handleInputChange('description', e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="authors" className="text-sm font-medium">Authors (comma separated)</label>
              <Input 
                id="authors" 
                value={selectedItem.authors} 
                onChange={(e) => handleInputChange('authors', e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="citations" className="text-sm font-medium">Citations</label>
              <Input 
                id="citations" 
                type="number"
                value={selectedItem.citations} 
                onChange={(e) => handleInputChange('citations', parseInt(e.target.value, 10) || 0)} 
              />
            </div>
            <div>
              <label htmlFor="image" className="text-sm font-medium">Image URL</label>
              <Input 
                id="image" 
                value={selectedItem.image} 
                onChange={(e) => handleInputChange('image', e.target.value)} 
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </CardFooter>
        </Card>
      );
    } else if (type === 'event') {
      return (
        <Card className="w-full mb-6">
          <CardHeader>
            <CardTitle>{selectedItem.id ? 'Edit Event' : 'New Event'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input 
                id="title" 
                value={selectedItem.title} 
                onChange={(e) => handleInputChange('title', e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="type" className="text-sm font-medium">Event Type</label>
              <Input 
                id="type" 
                value={selectedItem.type} 
                onChange={(e) => handleInputChange('type', e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea 
                id="description" 
                value={selectedItem.description} 
                onChange={(e) => handleInputChange('description', e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="date" className="text-sm font-medium">Date</label>
              <Input 
                id="date" 
                type="date"
                value={selectedItem.date} 
                onChange={(e) => handleInputChange('date', e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="time" className="text-sm font-medium">Time</label>
              <Input 
                id="time" 
                value={selectedItem.time} 
                onChange={(e) => handleInputChange('time', e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="location" className="text-sm font-medium">Location</label>
              <Input 
                id="location" 
                value={selectedItem.location} 
                onChange={(e) => handleInputChange('location', e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="image" className="text-sm font-medium">Image URL</label>
              <Input 
                id="image" 
                value={selectedItem.image} 
                onChange={(e) => handleInputChange('image', e.target.value)} 
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </CardFooter>
        </Card>
      );
    }
    
    return null;
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Core Team Dashboard</h1>
      
      {isEditing ? (
        renderForm()
      ) : (
        <Tabs defaultValue="projects">
          <TabsList className="mb-6">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="team-chat">Team Chat</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="space-y-4">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-semibold">Projects</h2>
              <Button onClick={() => handleCreate('project')}>Add Project</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project: Project) => (
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
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline"
                      onClick={() => handleEdit(project, 'project')}
                    >
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="blogs" className="space-y-4">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-semibold">Blog Posts</h2>
              <Button onClick={() => handleCreate('blog')}>Add Blog Post</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {blogs.map((blog: BlogPost) => (
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
                  <CardFooter>
                    <Button 
                      variant="outline"
                      onClick={() => handleEdit(blog, 'blog')}
                    >
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="research" className="space-y-4">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-semibold">Research</h2>
              <Button onClick={() => handleCreate('research')}>Add Research</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {research.map((item: ResearchItem) => (
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
                    <p className="mt-2 text-sm">Citations: {item.citations}</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline"
                      onClick={() => handleEdit(item, 'research')}
                    >
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="space-y-4">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-semibold">Events</h2>
              <Button onClick={() => handleCreate('event')}>Add Event</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map((event: Event) => (
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
                    <Button 
                      variant="outline"
                      onClick={() => handleEdit(event, 'event')}
                    >
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="team-chat" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">Core Team Chat</h2>
              <p className="text-gray-600">Private chat for core team members to discuss club matters</p>
            </div>
            
            <Card>
              <CardContent className="p-4 h-96 flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                  {messages.map((message: any) => (
                    <div key={message.id} className="p-3 bg-gray-100 rounded-lg">
                      <div className="flex justify-between items-start">
                        <span className="font-medium">{message.user_id}</span>
                        <span className="text-xs text-gray-500">{new Date(message.created_at).toLocaleString()}</span>
                      </div>
                      <p className="mt-1">{message.content}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && newMessage.trim()) {
                        sendMessage.mutate(newMessage);
                      }
                    }}
                  />
                  <Button onClick={() => {
                    if (newMessage.trim()) {
                      sendMessage.mutate(newMessage);
                    }
                  }}>
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default CoreTeamDashboard;