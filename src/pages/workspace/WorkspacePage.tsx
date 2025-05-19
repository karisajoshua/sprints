
import React from 'react';
import { WorkspaceDashboard } from '@/components/workspace/WorkspaceDashboard';
import { useAuth } from '@/hooks/useAuth';
import { useWorkspace } from '@/components/workspace/WorkspaceContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { WorkspaceSelector } from '@/components/workspace/WorkspaceSelector';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const WorkspacePage = () => {
  const { user, loading: authLoading } = useAuth();
  const { currentWorkspace, workspaces, loading: workspaceLoading } = useWorkspace();
  const navigate = useNavigate();

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

  // If user has no workspaces, show a message instead of redirecting
  if (workspaces.length === 0) {
    return (
      <div className="container mx-auto py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to the Workspace Dashboard</h1>
          <p className="text-muted-foreground mb-6">
            You don't have any workspaces yet. Create your first workspace to get started.
          </p>
          <Button onClick={() => navigate('/workspace/create')}>
            <Plus className="mr-2 h-4 w-4" /> Create Workspace
          </Button>
        </div>
      </div>
    );
  }

  // If user has workspaces but none is selected
  if (!currentWorkspace && workspaces.length > 0) {
    return (
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Select a Workspace</h1>
          <p className="text-muted-foreground">
            Choose a workspace to view its dashboard
          </p>
        </div>
        <div className="mb-4">
          <WorkspaceSelector />
        </div>
      </div>
    );
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
