
import React from 'react';
import { CreateWorkspaceForm } from '@/components/workspace/CreateWorkspaceForm';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

const CreateWorkspacePage = () => {
  const { user, loading } = useAuth();

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

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Your Event Team Workspace</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Set up a dedicated space for your team to collaborate on events, manage tasks, and track progress.
        </p>
      </div>
      <CreateWorkspaceForm />
    </div>
  );
};

export default CreateWorkspacePage;
