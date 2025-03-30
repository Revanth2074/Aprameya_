import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const UserProfile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Fetch current user, user's event registrations, and comments
  const { data: currentUser } = useQuery({
    queryKey: ['/api/users/me'],
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

  // Update profile mutation
  const updateProfile = useMutation({
    mutationFn: (userData: any) => 
      apiRequest('/api/users/me', { method: 'PATCH', body: JSON.stringify(userData) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users/me'] });
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
      setIsEditing(false);
      setProfileData({
        email: '',
        newPassword: '',
        confirmPassword: '',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile',
        variant: 'destructive',
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

  // Delete comment mutation
  const deleteComment = useMutation({
    mutationFn: (commentId: number) => 
      apiRequest(`/api/comments/${commentId}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users/me/comments'] });
      toast({
        title: 'Success',
        description: 'Comment deleted successfully',
      });
    },
  });

  const handleEditProfile = () => {
    if (currentUser) {
      setProfileData({
        ...profileData,
        email: currentUser.email || '',
      });
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setProfileData({
      email: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData({
      ...profileData,
      [field]: value,
    });
  };

  const handleUpdateProfile = () => {
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    const updateData: any = {};
    
    if (profileData.email && profileData.email !== currentUser?.email) {
      updateData.email = profileData.email;
    }
    
    if (profileData.newPassword) {
      updateData.password = profileData.newPassword;
    }

    if (Object.keys(updateData).length > 0) {
      updateProfile.mutate(updateData);
    } else {
      toast({
        title: 'Info',
        description: 'No changes to update',
      });
      setIsEditing(false);
    }
  };

  const handleCancelRegistration = (registrationId: number) => {
    if (window.confirm('Are you sure you want to cancel this event registration?')) {
      cancelEventRegistration.mutate(registrationId);
    }
  };

  const handleDeleteComment = (commentId: number) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment.mutate(commentId);
    }
  };

  if (!currentUser) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="flex items-center justify-center py-10">
            <p>Please login to view your profile</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getInitials = (username: string) => {
    return username.substring(0, 2).toUpperCase();
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role.toUpperCase()) {
      case 'ADMIN':
        return 'bg-red-500';
      case 'CORE':
      case 'CORE_TEAM':
        return 'bg-blue-500';
      default:
        return 'bg-green-500';
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>

      {isEditing ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input 
                id="email" 
                value={profileData.email} 
                onChange={(e) => handleInputChange('email', e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="text-sm font-medium">New Password</label>
              <Input 
                id="newPassword" 
                type="password"
                value={profileData.newPassword} 
                onChange={(e) => handleInputChange('newPassword', e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
              <Input 
                id="confirmPassword" 
                type="password"
                value={profileData.confirmPassword} 
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)} 
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
            <Button onClick={handleUpdateProfile}>Save Changes</Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="" alt={currentUser.username} />
                <AvatarFallback className="text-lg">{getInitials(currentUser.username)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{currentUser.username}</CardTitle>
                <CardDescription>{currentUser.email}</CardDescription>
                <Badge className={`mt-2 ${getRoleBadgeColor(currentUser.role)}`}>
                  {currentUser.role}
                </Badge>
              </div>
            </div>
            <Button onClick={handleEditProfile}>Edit Profile</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Account Information</h3>
                <Separator className="my-2" />
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">Username:</div>
                  <div className="text-sm">{currentUser.username}</div>
                  <div className="text-sm font-medium">Email:</div>
                  <div className="text-sm">{currentUser.email}</div>
                  <div className="text-sm font-medium">Role:</div>
                  <div className="text-sm">
                    <Badge className={`${getRoleBadgeColor(currentUser.role)}`}>
                      {currentUser.role}
                    </Badge>
                  </div>
                  <div className="text-sm font-medium">Member Since:</div>
                  <div className="text-sm">{new Date(currentUser.created_at).toLocaleDateString()}</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">Activity Summary</h3>
                <Separator className="my-2" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <p className="text-lg font-bold text-blue-600">{userEventRegistrations.length}</p>
                    <p className="text-xs text-gray-500">Event Registrations</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <p className="text-lg font-bold text-green-600">{userComments.length}</p>
                    <p className="text-xs text-gray-500">Comments</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <p className="text-lg font-bold text-purple-600">{
                      new Date(currentUser.created_at).toLocaleDateString() !== 'Invalid Date' 
                        ? Math.floor((new Date().getTime() - new Date(currentUser.created_at).getTime()) / (1000 * 3600 * 24))
                        : 0
                    }</p>
                    <p className="text-xs text-gray-500">Days as Member</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">Access & Permissions</h3>
                <Separator className="my-2" />
                <div className="mt-4 space-y-2">
                  {currentUser.role === 'ADMIN' && (
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-purple-500">Full Admin Access</Badge>
                      <span className="text-sm text-gray-500">Can manage all content and users</span>
                    </div>
                  )}
                  
                  {(currentUser.role === 'ADMIN' || currentUser.role === 'CORE') && (
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-blue-500">Content Management</Badge>
                      <span className="text-sm text-gray-500">Can create and edit content</span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500">Event Registration</Badge>
                    <span className="text-sm text-gray-500">Can register for events</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-amber-500">Comment Access</Badge>
                    <span className="text-sm text-gray-500">Can comment on content</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="registrations">
        <TabsList className="mb-6">
          <TabsTrigger value="registrations">Event Registrations</TabsTrigger>
          <TabsTrigger value="comments">Your Comments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="registrations" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Your Event Registrations</h2>
          
          {userEventRegistrations.length === 0 ? (
            <Card>
              <CardContent className="py-6">
                <p className="text-center text-gray-500">You haven't registered for any events yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userEventRegistrations.map((registration: any) => (
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
        
        <TabsContent value="comments" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Your Comments</h2>
          
          {userComments.length === 0 ? (
            <Card>
              <CardContent className="py-6">
                <p className="text-center text-gray-500">You haven't made any comments yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {userComments.map((comment: any) => (
                <Card key={comment.id}>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {comment.project_id 
                        ? `Comment on Project: ${comment.project?.title || 'Unknown Project'}`
                        : comment.blog_id 
                          ? `Comment on Blog: ${comment.blog?.title || 'Unknown Blog'}`
                          : `Comment on Research: ${comment.research?.title || 'Unknown Research'}`
                      }
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {new Date(comment.created_at).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{comment.content}</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete Comment
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;