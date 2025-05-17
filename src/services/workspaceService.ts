import { supabase } from "@/integrations/supabase/client";
import { Workspace, WorkspaceMember, WorkspaceInvitation } from "@/types/workspace";
import { v4 as uuidv4 } from "uuid";

// Workspace operations
export const createWorkspace = async (name: string, description: string | null = null, logo_url: string | null = null): Promise<Workspace> => {
  // Get the current user
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError) throw userError;
  if (!userData.user) throw new Error("No authenticated user found");

  // Insert the workspace with the current user as creator
  const { data, error } = await supabase
    .from('workspaces')
    .insert({
      name,
      description,
      logo_url,
      created_by: userData.user.id
    })
    .select()
    .single();

  if (error) throw error;
  
  // After creating workspace, add the creator as admin
  await supabase
    .from('workspace_members')
    .insert({
      workspace_id: data.id,
      profile_id: userData.user.id,
      role: 'admin',
      is_admin: true,
      invited_by: userData.user.id
    });

  return data;
};

export const getUserWorkspaces = async (): Promise<Workspace[]> => {
  const { data, error } = await supabase
    .from('workspaces')
    .select('*')
    .order('name');

  if (error) throw error;
  return data || [];
};

export const getWorkspaceById = async (id: string): Promise<Workspace | null> => {
  const { data, error } = await supabase
    .from('workspaces')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // No rows returned
    throw error;
  }
  
  return data;
};

export const updateWorkspace = async (id: string, updates: Partial<Workspace>): Promise<Workspace> => {
  const { data, error } = await supabase
    .from('workspaces')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteWorkspace = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('workspaces')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Workspace member operations
export const getWorkspaceMembers = async (workspaceId: string): Promise<WorkspaceMember[]> => {
  const { data, error } = await supabase
    .from('workspace_members')
    .select(`
      *,
      profile:profiles(id, full_name, avatar_url, email)
    `)
    .eq('workspace_id', workspaceId);

  if (error) throw error;
  return data || [];
};

export const updateMemberRole = async (
  memberId: string, 
  role: string, 
  isAdmin: boolean = false,
  isHR: boolean = false
): Promise<WorkspaceMember> => {
  const { data, error } = await supabase
    .from('workspace_members')
    .update({ 
      role,
      is_admin: isAdmin,
      is_hr: isHR
    })
    .eq('id', memberId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const removeMember = async (memberId: string): Promise<void> => {
  const { error } = await supabase
    .from('workspace_members')
    .delete()
    .eq('id', memberId);

  if (error) throw error;
};

// Invitation operations
export const generateInvitationToken = () => {
  return uuidv4();
};

export const createInvitation = async (
  workspaceId: string,
  email: string,
  role: string = 'member',
  isAdmin: boolean = false,
  isHR: boolean = false
): Promise<{ invitation: WorkspaceInvitation, inviteUrl: string }> => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // Expire in 7 days
  
  const token = generateInvitationToken();
  
  // We'll use an edge function for sending the invitation
  const { data: invitation, error } = await supabase.functions.invoke('send-invitation', {
    body: {
      email,
      role,
      isAdmin,
      isHR,
      organizationId: workspaceId,
      token
    }
  });

  if (error) throw error;
  return invitation;
};

export const getInvitations = async (workspaceId: string): Promise<WorkspaceInvitation[]> => {
  const { data, error } = await supabase
    .from('workspace_invitations')
    .select('*')
    .eq('workspace_id', workspaceId)
    .is('accepted_at', null)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const cancelInvitation = async (invitationId: string): Promise<void> => {
  const { error } = await supabase
    .from('workspace_invitations')
    .delete()
    .eq('id', invitationId);

  if (error) throw error;
};

export const acceptInvitation = async (token: string): Promise<string> => {
  const { data, error } = await supabase
    .rpc('accept_workspace_invitation', { token_input: token });

  if (error) throw error;
  return data; // Returns the workspace ID
};

// Check user permissions
export const isWorkspaceAdmin = async (workspaceId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .rpc('is_workspace_admin', { workspace_id: workspaceId });

  if (error) throw error;
  return data;
};

export const isWorkspaceHR = async (workspaceId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .rpc('is_workspace_hr', { workspace_id: workspaceId });

  if (error) throw error;
  return data;
};

export const isWorkspaceMember = async (workspaceId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .rpc('is_workspace_member', { workspace_id: workspaceId });

  if (error) throw error;
  return data;
};
