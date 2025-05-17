
import React from 'react';
import { JoinWorkspace } from '@/components/workspace/JoinWorkspace';
import { useLocation } from 'react-router-dom';

const JoinPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  if (!token) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Invalid Invitation</h1>
        <p className="text-muted-foreground">This invitation link is invalid or has expired.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Join Workspace</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          You've been invited to join a workspace. Accept the invitation to collaborate with the team.
        </p>
      </div>
      <JoinWorkspace token={token} />
    </div>
  );
};

export default JoinPage;
