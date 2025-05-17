
import React from 'react';
import { InviteForm } from '@/components/workspace/InviteForm';
import { useAuth } from '@/hooks/useAuth';
import { useWorkspace } from '@/components/workspace/WorkspaceContext';
import { Navigate, useParams } from 'react-router-dom';

const InvitePage = () => {
  const { user, loading: authLoading } = useAuth();
  const { currentWorkspace, isAdmin, isHR, loading: workspaceLoading } = useWorkspace();
  const { workspaceId } = useParams<{ workspaceId: string }>();

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

  // Check if the user is trying to access the correct workspace
  if (workspaceId && currentWorkspace.id !== workspaceId) {
    return <Navigate to={`/workspace/${currentWorkspace.id}/invite`} />;
  }

  // Check if the user has permission to invite members
  if (!isAdmin && !isHR) {
    return <Navigate to={`/workspace/${currentWorkspace.id}`} />;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Invite Team Members</h1>
      <div className="max-w-lg mx-auto">
        <InviteForm />
      </div>
    </div>
  );
};

export default InvitePage;
