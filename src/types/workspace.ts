
export type Workspace = {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
  created_by: string;
};

export type WorkspaceMember = {
  id: string;
  workspace_id: string;
  profile_id: string;
  role: string;
  is_admin: boolean;
  is_hr: boolean;
  joined_at: string;
  invited_by: string | null;
  profile?: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    email: string;
  };
};

export type WorkspaceInvitation = {
  id: string;
  workspace_id: string;
  email: string;
  role: string;
  is_admin: boolean;
  is_hr: boolean;
  invited_by: string;
  token: string;
  created_at: string;
  expires_at: string;
  accepted_at: string | null;
};
