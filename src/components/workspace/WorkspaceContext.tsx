
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUserWorkspaces, getWorkspaceMembers } from '@/services/workspaceService';
import { Workspace, WorkspaceMember } from '@/types/workspace';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

type WorkspaceContextType = {
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  workspaceMembers: WorkspaceMember[];
  loading: boolean;
  isAdmin: boolean;
  isHR: boolean;
  setCurrentWorkspace: (workspace: Workspace | null) => void;
  refreshWorkspaces: () => Promise<void>;
  refreshMembers: () => Promise<void>;
};

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider = ({ children }: { children: ReactNode }) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [workspaceMembers, setWorkspaceMembers] = useState<WorkspaceMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isHR, setIsHR] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Load workspaces on initial render if user is authenticated
  useEffect(() => {
    if (user) {
      refreshWorkspaces();
    } else {
      setLoading(false);
      setWorkspaces([]);
      setCurrentWorkspace(null);
      setWorkspaceMembers([]);
      setIsAdmin(false);
      setIsHR(false);
    }
  }, [user]);

  // Load workspace members when current workspace changes
  useEffect(() => {
    if (currentWorkspace) {
      refreshMembers();
    } else {
      setWorkspaceMembers([]);
      setIsAdmin(false);
      setIsHR(false);
    }
  }, [currentWorkspace]);

  // Check user permissions
  useEffect(() => {
    if (user && workspaceMembers.length > 0) {
      const currentUserMembership = workspaceMembers.find(
        member => member.profile?.id === user.id
      );
      
      if (currentUserMembership) {
        setIsAdmin(currentUserMembership.is_admin);
        setIsHR(currentUserMembership.is_hr);
      } else {
        setIsAdmin(false);
        setIsHR(false);
      }
    }
  }, [user, workspaceMembers]);

  const refreshWorkspaces = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const fetchedWorkspaces = await getUserWorkspaces();
      setWorkspaces(fetchedWorkspaces);
      
      // If we have workspaces but no current workspace selected, select the first one
      if (fetchedWorkspaces.length > 0 && !currentWorkspace) {
        setCurrentWorkspace(fetchedWorkspaces[0]);
      } else if (fetchedWorkspaces.length === 0) {
        // If user has no workspaces, redirect to create workspace page
        navigate('/workspace/create');
      }
    } catch (error) {
      console.error('Failed to fetch workspaces:', error);
      toast({
        title: 'Error fetching workspaces',
        description: 'Please try again later',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshMembers = async () => {
    if (!currentWorkspace || !user) return;
    
    setLoading(true);
    try {
      const members = await getWorkspaceMembers(currentWorkspace.id);
      setWorkspaceMembers(members);
      
      // Check if current user is a member of this workspace
      const isMember = members.some(member => member.profile?.id === user.id);
      if (!isMember) {
        // User doesn't belong to this workspace, redirect to dashboard
        toast({
          title: 'Access denied',
          description: 'You are not a member of this workspace',
          variant: 'destructive'
        });
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Failed to fetch workspace members:', error);
      toast({
        title: 'Error fetching members',
        description: 'Please try again later',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    workspaces,
    currentWorkspace,
    workspaceMembers,
    loading,
    isAdmin,
    isHR,
    setCurrentWorkspace,
    refreshWorkspaces,
    refreshMembers
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
