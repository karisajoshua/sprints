
import React, { useEffect, useState } from 'react';
import { acceptInvitation } from '@/services/workspaceService';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type JoinWorkspaceProps = {
  token: string;
};

export const JoinWorkspace = ({ token }: JoinWorkspaceProps) => {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAcceptInvitation = async () => {
    if (!user) {
      // If not logged in, navigate to sign in page with token as redirect parameter
      navigate(`/auth/signin?redirect=/join?token=${token}`);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const workspaceId = await acceptInvitation(token);
      
      toast({
        title: 'Joined workspace!',
        description: 'You have successfully joined the workspace.',
      });
      
      // Navigate to the workspace
      navigate(`/workspace/${workspaceId}`);
    } catch (err: any) {
      console.error('Error accepting invitation:', err);
      setError(err.message || 'Failed to accept the invitation. It may be invalid or expired.');
      
      toast({
        title: 'Error joining workspace',
        description: err.message || 'Failed to accept the invitation.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // If the user is logged in, automatically try to join
  useEffect(() => {
    if (user && !loading && !error) {
      handleAcceptInvitation();
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p>Processing your invitation...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Invitation Error</CardTitle>
          <CardDescription>We couldn't process your invitation</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" onClick={() => navigate('/')}>
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Join Workspace</CardTitle>
          <CardDescription>You need to sign in to accept this invitation</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Please sign in or create an account to join this workspace.</p>
        </CardContent>
        <CardFooter className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => navigate('/')}>
            Return to Home
          </Button>
          <Button 
            variant="lavender" 
            onClick={() => navigate(`/auth/signin?redirect=/join?token=${token}`)}
          >
            Sign In
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Join Workspace</CardTitle>
          <CardDescription>Accept the invitation to join the workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Processing your invitation...</p>
        </CardContent>
      </Card>
    </div>
  );
};
