import React from 'react';
import { useLocation, Redirect } from 'wouter';
import { Loader2 } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import AdminDashboard from '@/pages/AdminDashboard';
import CoreTeamDashboard from '@/pages/CoreTeamDashboard';
import AspirantDashboard from '@/pages/AspirantDashboard';
import { getQueryFn } from '@/lib/queryClient';

const DashboardRouter: React.FC = () => {
  const [, setLocation] = useLocation();
  
  const { 
    data: user, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['/api/users/me'],
    queryFn: getQueryFn({ on401: 'returnNull' }),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !user) {
    setLocation('/auth');
    return null;
  }

  // Route to the appropriate dashboard based on user role
  if (user.role === 'ADMIN') {
    return <AdminDashboard />;
  } else if (user.role === 'CORE') {
    return <CoreTeamDashboard />;
  } else {
    return <AspirantDashboard />;
  }
};

export default DashboardRouter;