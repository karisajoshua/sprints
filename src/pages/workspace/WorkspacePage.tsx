
import React from 'react';
import { WorkspaceDashboard } from '@/components/workspace/WorkspaceDashboard';
import { useAuth } from '@/hooks/useAuth';
import { useWorkspace } from '@/components/workspace/WorkspaceContext';
import { Navigate } from 'react-router-dom';
import { WorkspaceSelector } from '@/components/workspace/WorkspaceSelector';

const WorkspacePage = () => {
  const { user, loading: authLoading } = useAuth();
  const { currentWorkspace, loading: workspaceLoading } = useWorkspace();

  const loading = authLoading || workspaceLoading;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/signin" />;
  }

  if (!currentWorkspace) {
    return <Navigate to="/workspace/create" />;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Workspace Dashboard</h1>
        <WorkspaceSelector />
      </div>
      <WorkspaceDashboard />
    </div>
  );
};

export default WorkspacePage;
