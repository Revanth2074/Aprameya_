import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '../lib/queryClient';
import { Project, BlogPost, Event, ResearchItem } from '../lib/types';
import { queryClient } from '../lib/queryClient';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  PlusCircle, 
  Pencil, 
  Trash2, 
  Check, 
  X, 
  BookOpen, 
  Beaker, 
  Calendar, 
  FolderOpen
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const { toast } = useToast();
  
  // Fetch users - only admins can see this page
  const { data: userData, isLoading: userLoading } = useQuery<{id: number, username: string, role: string}>({
    queryKey: ['/api/users/me'],
    retry: false,
  });

  // Redirect if not admin
  useEffect(() => {
    if (!userLoading && (!userData || userData?.role !== 'admin')) {
      window.location.href = '/';
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin dashboard.",
        variant: "destructive",
      });
    }
  }, [userData, userLoading, toast]);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-lg text-gray-600 mb-8">Manage website content</p>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="projects" className="flex items-center gap-1">
            <FolderOpen className="h-4 w-4" /> Projects
          </TabsTrigger>
          <TabsTrigger value="blogs" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" /> Blogs
          </TabsTrigger>
          <TabsTrigger value="research" className="flex items-center gap-1">
            <Beaker className="h-4 w-4" /> Research
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> Events
          </TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects">
          <ProjectsManager />
        </TabsContent>
        
        <TabsContent value="blogs">
          <BlogsManager />
        </TabsContent>
        
        <TabsContent value="research">
          <ResearchManager />
        </TabsContent>
        
        <TabsContent value="events">
          <EventsManager />
        </TabsContent>
        
        <TabsContent value="users">
          <UsersManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Projects Manager Component
const ProjectsManager = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project> | null>(null);
  const { toast } = useToast();
  
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
    retry: false,
  });
  
  const createMutation = useMutation({
    mutationFn: (newProject: Partial<Project>) => {
      return apiRequest('/api/projects', {
        method: 'POST',
        body: JSON.stringify(newProject),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({
        title: "Success",
        description: "Project created successfully",
      });
      setIsEditing(false);
      setCurrentProject(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    }
  });
  
  const updateMutation = useMutation({
    mutationFn: (updatedProject: Partial<Project>) => {
      return apiRequest(`/api/projects/${updatedProject.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedProject),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
      setIsEditing(false);
      setCurrentProject(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
    }
  });
  
  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      return apiRequest(`/api/projects/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  });
  
  const handleEdit = (project: Project) => {
    setCurrentProject(project);
    setIsEditing(true);
  };
  
  const handleCreate = () => {
    setCurrentProject({
      title: '',
      category: '',
      description: '',
      image: '',
      technologies: [],
      team: []
    });
    setIsEditing(true);
  };
  
  const handleSave = () => {
    if (!currentProject) return;
    
    if (currentProject.id) {
      updateMutation.mutate(currentProject as Project);
    } else {
      createMutation.mutate(currentProject);
    }
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setCurrentProject(null);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProject(prev => prev ? { ...prev, [name]: value } : null);
  };
  
  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'technologies' | 'team') => {
    const value = e.target.value.split(',').map(item => item.trim());
    setCurrentProject(prev => prev ? { ...prev, [field]: value } : null);
  };
  
  if (isLoading) {
    return <div>Loading projects...</div>;
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        {!isEditing && (
          <Button onClick={handleCreate} className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" /> Add Project
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <Card>
          <CardHeader>
            <CardTitle>{currentProject?.id ? 'Edit Project' : 'Create Project'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input 
                name="title" 
                value={currentProject?.title || ''} 
                onChange={handleChange} 
                placeholder="Project title" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Input 
                name="category" 
                value={currentProject?.category || ''} 
                onChange={handleChange} 
                placeholder="e.g., Autonomous, Robotics, AI" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea 
                name="description" 
                value={currentProject?.description || ''} 
                onChange={handleChange} 
                placeholder="Project description" 
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <Input 
                name="image" 
                value={currentProject?.image || ''} 
                onChange={handleChange} 
                placeholder="Image URL" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Technologies (comma-separated)</label>
              <Input 
                name="technologies" 
                value={currentProject?.technologies?.join(', ') || ''} 
                onChange={(e) => handleArrayChange(e, 'technologies')} 
                placeholder="React, Node.js, Python..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Team Members (comma-separated)</label>
              <Input 
                name="team" 
                value={currentProject?.team?.join(', ') || ''} 
                onChange={(e) => handleArrayChange(e, 'team')} 
                placeholder="John Doe, Jane Smith..." 
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel} className="flex items-center gap-1">
              <X className="h-4 w-4" /> Cancel
            </Button>
            <Button onClick={handleSave} className="flex items-center gap-1">
              <Check className="h-4 w-4" /> Save
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects && projects.length > 0 ? (
            projects.map((project: Project) => (
              <Card key={project.id} className="overflow-hidden">
                <div className="relative h-40 bg-gray-100">
                  {project.image && (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-sm">{project.category}</CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-sm line-clamp-3">{project.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 pt-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEdit(project)}
                    className="flex items-center gap-1"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this project?')) {
                        deleteMutation.mutate(project.id);
                      }
                    }}
                    className="flex items-center gap-1"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No projects found. Click "Add Project" to create one.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Blogs Manager Component
const BlogsManager = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Partial<BlogPost> | null>(null);
  const { toast } = useToast();
  
  const { data: blogs, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blogs'],
    retry: false,
  });
  
  const createMutation = useMutation({
    mutationFn: (newBlog: Partial<BlogPost>) => {
      return apiRequest('/api/blogs', {
        method: 'POST',
        body: JSON.stringify(newBlog),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blogs'] });
      toast({
        title: "Success",
        description: "Blog post created successfully",
      });
      setIsEditing(false);
      setCurrentBlog(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create blog post",
        variant: "destructive",
      });
    }
  });
  
  const updateMutation = useMutation({
    mutationFn: (updatedBlog: Partial<BlogPost>) => {
      return apiRequest(`/api/blogs/${updatedBlog.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedBlog),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blogs'] });
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
      setIsEditing(false);
      setCurrentBlog(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      });
    }
  });
  
  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      return apiRequest(`/api/blogs/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blogs'] });
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    }
  });
  
  const handleEdit = (blog: BlogPost) => {
    setCurrentBlog(blog);
    setIsEditing(true);
  };
  
  const handleCreate = () => {
    const today = new Date().toISOString().split('T')[0];
    setCurrentBlog({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      date: today,
      image: '',
      author: ''
    });
    setIsEditing(true);
  };
  
  const handleSave = () => {
    if (!currentBlog) return;
    
    if (currentBlog.id) {
      updateMutation.mutate(currentBlog as BlogPost);
    } else {
      createMutation.mutate(currentBlog);
    }
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setCurrentBlog(null);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentBlog(prev => prev ? { ...prev, [name]: value } : null);
  };
  
  if (isLoading) {
    return <div>Loading blogs...</div>;
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        {!isEditing && (
          <Button onClick={handleCreate} className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" /> Add Blog Post
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <Card>
          <CardHeader>
            <CardTitle>{currentBlog?.id ? 'Edit Blog Post' : 'Create Blog Post'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input 
                name="title" 
                value={currentBlog?.title || ''} 
                onChange={handleChange} 
                placeholder="Blog post title" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Excerpt</label>
              <Textarea 
                name="excerpt" 
                value={currentBlog?.excerpt || ''} 
                onChange={handleChange} 
                placeholder="Short excerpt" 
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <Textarea 
                name="content" 
                value={currentBlog?.content || ''} 
                onChange={handleChange} 
                placeholder="Blog post content" 
                rows={6}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Input 
                name="category" 
                value={currentBlog?.category || ''} 
                onChange={handleChange} 
                placeholder="e.g., Technology, Research, News" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <Input 
                type="date"
                name="date" 
                value={currentBlog?.date || ''} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <Input 
                name="image" 
                value={currentBlog?.image || ''} 
                onChange={handleChange} 
                placeholder="Image URL" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Author</label>
              <Input 
                name="author" 
                value={currentBlog?.author || ''} 
                onChange={handleChange} 
                placeholder="Author name" 
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel} className="flex items-center gap-1">
              <X className="h-4 w-4" /> Cancel
            </Button>
            <Button onClick={handleSave} className="flex items-center gap-1">
              <Check className="h-4 w-4" /> Save
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog: BlogPost) => (
              <Card key={blog.id} className="overflow-hidden">
                <div className="relative h-40 bg-gray-100">
                  {blog.image && (
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{blog.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {blog.category} • {blog.date} • by {blog.author}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-sm line-clamp-3">{blog.excerpt}</p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 pt-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEdit(blog)}
                    className="flex items-center gap-1"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this blog post?')) {
                        deleteMutation.mutate(blog.id);
                      }
                    }}
                    className="flex items-center gap-1"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No blog posts found. Click "Add Blog Post" to create one.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Research Manager Component
const ResearchManager = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentResearch, setCurrentResearch] = useState<Partial<ResearchItem> | null>(null);
  const { toast } = useToast();
  
  const { data: researchItems, isLoading } = useQuery<ResearchItem[]>({
    queryKey: ['/api/research'],
    retry: false,
  });
  
  const createMutation = useMutation({
    mutationFn: (newResearch: Partial<ResearchItem>) => {
      return apiRequest('/api/research', {
        method: 'POST',
        body: JSON.stringify(newResearch),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/research'] });
      toast({
        title: "Success",
        description: "Research item created successfully",
      });
      setIsEditing(false);
      setCurrentResearch(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create research item",
        variant: "destructive",
      });
    }
  });
  
  const updateMutation = useMutation({
    mutationFn: (updatedResearch: Partial<ResearchItem>) => {
      return apiRequest(`/api/research/${updatedResearch.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedResearch),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/research'] });
      toast({
        title: "Success",
        description: "Research item updated successfully",
      });
      setIsEditing(false);
      setCurrentResearch(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update research item",
        variant: "destructive",
      });
    }
  });
  
  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      return apiRequest(`/api/research/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/research'] });
      toast({
        title: "Success",
        description: "Research item deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete research item",
        variant: "destructive",
      });
    }
  });
  
  const handleEdit = (research: ResearchItem) => {
    setCurrentResearch(research);
    setIsEditing(true);
  };
  
  const handleCreate = () => {
    const today = new Date().toISOString().split('T')[0];
    setCurrentResearch({
      title: '',
      category: '',
      description: '',
      image: '',
      date: today,
      authors: [],
      citations: 0
    });
    setIsEditing(true);
  };
  
  const handleSave = () => {
    if (!currentResearch) return;
    
    if (currentResearch.id) {
      updateMutation.mutate(currentResearch as ResearchItem);
    } else {
      createMutation.mutate(currentResearch);
    }
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setCurrentResearch(null);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentResearch(prev => prev ? { 
      ...prev, 
      [name]: name === 'citations' ? parseInt(value) || 0 : value 
    } : null);
  };
  
  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.split(',').map(item => item.trim());
    setCurrentResearch(prev => prev ? { ...prev, authors: value } : null);
  };
  
  if (isLoading) {
    return <div>Loading research items...</div>;
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Research</h2>
        {!isEditing && (
          <Button onClick={handleCreate} className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" /> Add Research Item
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <Card>
          <CardHeader>
            <CardTitle>{currentResearch?.id ? 'Edit Research Item' : 'Create Research Item'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input 
                name="title" 
                value={currentResearch?.title || ''} 
                onChange={handleChange} 
                placeholder="Research title" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Input 
                name="category" 
                value={currentResearch?.category || ''} 
                onChange={handleChange} 
                placeholder="e.g., Computer Vision, Navigation, Machine Learning" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea 
                name="description" 
                value={currentResearch?.description || ''} 
                onChange={handleChange} 
                placeholder="Research description" 
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <Input 
                name="image" 
                value={currentResearch?.image || ''} 
                onChange={handleChange} 
                placeholder="Image URL" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <Input 
                type="date"
                name="date" 
                value={currentResearch?.date || ''} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Authors (comma-separated)</label>
              <Input 
                name="authors" 
                value={currentResearch?.authors?.join(', ') || ''} 
                onChange={handleArrayChange} 
                placeholder="John Doe, Jane Smith..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Citations</label>
              <Input 
                type="number"
                name="citations" 
                value={currentResearch?.citations || 0} 
                onChange={handleChange} 
                placeholder="0" 
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel} className="flex items-center gap-1">
              <X className="h-4 w-4" /> Cancel
            </Button>
            <Button onClick={handleSave} className="flex items-center gap-1">
              <Check className="h-4 w-4" /> Save
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchItems && researchItems.length > 0 ? (
            researchItems.map((research: ResearchItem) => (
              <Card key={research.id} className="overflow-hidden">
                <div className="relative h-40 bg-gray-100">
                  {research.image && (
                    <img 
                      src={research.image} 
                      alt={research.title} 
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{research.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {research.category} • {research.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm line-clamp-3">{research.description}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    Citations: {research.citations} | Authors: {research.authors.join(', ')}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 pt-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEdit(research)}
                    className="flex items-center gap-1"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this research item?')) {
                        deleteMutation.mutate(research.id);
                      }
                    }}
                    className="flex items-center gap-1"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No research items found. Click "Add Research Item" to create one.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Events Manager Component
const EventsManager = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Partial<Event> | null>(null);
  const { toast } = useToast();
  
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events'],
    retry: false,
  });
  
  const createMutation = useMutation({
    mutationFn: (newEvent: Partial<Event>) => {
      return apiRequest('/api/events', {
        method: 'POST',
        body: JSON.stringify(newEvent),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      toast({
        title: "Success",
        description: "Event created successfully",
      });
      setIsEditing(false);
      setCurrentEvent(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "destructive",
      });
    }
  });
  
  const updateMutation = useMutation({
    mutationFn: (updatedEvent: Partial<Event>) => {
      return apiRequest(`/api/events/${updatedEvent.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedEvent),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      toast({
        title: "Success",
        description: "Event updated successfully",
      });
      setIsEditing(false);
      setCurrentEvent(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update event",
        variant: "destructive",
      });
    }
  });
  
  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      return apiRequest(`/api/events/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    }
  });
  
  const handleEdit = (event: Event) => {
    setCurrentEvent(event);
    setIsEditing(true);
  };
  
  const handleCreate = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const day = today.getDate().toString();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear().toString();
    
    setCurrentEvent({
      title: '',
      type: '',
      date: formattedDate,
      day,
      month,
      year,
      time: '10:00 AM',
      location: '',
      description: '',
      image: ''
    });
    setIsEditing(true);
  };
  
  const handleSave = () => {
    if (!currentEvent) return;
    
    if (currentEvent.id) {
      updateMutation.mutate(currentEvent as Event);
    } else {
      createMutation.mutate(currentEvent);
    }
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setCurrentEvent(null);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentEvent(prev => prev ? { ...prev, [name]: value } : null);
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value; // YYYY-MM-DD
    const dateObj = new Date(dateValue);
    
    if (!isNaN(dateObj.getTime())) {
      const day = dateObj.getDate().toString();
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = monthNames[dateObj.getMonth()];
      const year = dateObj.getFullYear().toString();
      
      setCurrentEvent(prev => prev ? { 
        ...prev, 
        date: dateValue,
        day,
        month,
        year
      } : null);
    }
  };
  
  if (isLoading) {
    return <div>Loading events...</div>;
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Events</h2>
        {!isEditing && (
          <Button onClick={handleCreate} className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" /> Add Event
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <Card>
          <CardHeader>
            <CardTitle>{currentEvent?.id ? 'Edit Event' : 'Create Event'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input 
                name="title" 
                value={currentEvent?.title || ''} 
                onChange={handleChange} 
                placeholder="Event title" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <Input 
                name="type" 
                value={currentEvent?.type || ''} 
                onChange={handleChange} 
                placeholder="e.g., Workshop, Seminar, Competition" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <Input 
                type="date"
                name="date" 
                value={currentEvent?.date || ''} 
                onChange={handleDateChange} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <Input 
                name="time" 
                value={currentEvent?.time || ''} 
                onChange={handleChange} 
                placeholder="e.g., 10:00 AM" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <Input 
                name="location" 
                value={currentEvent?.location || ''} 
                onChange={handleChange} 
                placeholder="Event location" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea 
                name="description" 
                value={currentEvent?.description || ''} 
                onChange={handleChange} 
                placeholder="Event description" 
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <Input 
                name="image" 
                value={currentEvent?.image || ''} 
                onChange={handleChange} 
                placeholder="Image URL" 
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel} className="flex items-center gap-1">
              <X className="h-4 w-4" /> Cancel
            </Button>
            <Button onClick={handleSave} className="flex items-center gap-1">
              <Check className="h-4 w-4" /> Save
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events && events.length > 0 ? (
            events.map((event: Event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="relative h-40 bg-gray-100">
                  {event.image && (
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="object-cover w-full h-full"
                    />
                  )}
                  <div className="absolute top-2 left-2 bg-white rounded-lg shadow px-3 py-2 text-center">
                    <div className="text-xl font-bold">{event.day}</div>
                    <div className="text-sm font-medium text-gray-600">{event.month}</div>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {event.type} • {event.time} • {event.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-sm line-clamp-3">{event.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 pt-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEdit(event)}
                    className="flex items-center gap-1"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this event?')) {
                        deleteMutation.mutate(event.id);
                      }
                    }}
                    className="flex items-center gap-1"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No events found. Click "Add Event" to create one.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Users Manager Component
const UsersManager = () => {
  const { toast } = useToast();
  
  const { data: users, isLoading } = useQuery<{ id: number, username: string, role: string }[]>({
    queryKey: ['/api/users'],
    retry: false,
  });
  
  const updateRoleMutation = useMutation({
    mutationFn: ({ userId, role }: { userId: number, role: string }) => {
      return apiRequest(`/api/users/${userId}/role`, {
        method: 'PUT',
        body: JSON.stringify({ role }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
      toast({
        title: "Success",
        description: "User role updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    }
  });
  
  const promoteToCore = (userId: number) => {
    if (window.confirm('Are you sure you want to promote this user to Core Team?')) {
      updateRoleMutation.mutate({ userId, role: 'core' });
    }
  };
  
  const demoteToAspirant = (userId: number) => {
    if (window.confirm('Are you sure you want to demote this user to Aspirant?')) {
      updateRoleMutation.mutate({ userId, role: 'aspirant' });
    }
  };
  
  if (isLoading) {
    return <div>Loading users...</div>;
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Users</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage user roles and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">ID</th>
                  <th className="text-left py-3 px-4 font-medium">Username</th>
                  <th className="text-left py-3 px-4 font-medium">Role</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? (
                  users.map((user: any) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{user.id}</td>
                      <td className="py-3 px-4">{user.username}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : user.role === 'core'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role === 'admin' 
                            ? 'Admin' 
                            : user.role === 'core' 
                            ? 'Core Team' 
                            : 'Aspirant'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {user.role !== 'admin' && (
                          <>
                            {user.role === 'aspirant' ? (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => promoteToCore(user.id)}
                                className="ml-2"
                              >
                                Promote to Core
                              </Button>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => demoteToAspirant(user.id)}
                                className="ml-2"
                              >
                                Demote to Aspirant
                              </Button>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;