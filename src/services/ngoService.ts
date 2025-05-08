
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { 
  Organization, 
  Project, 
  Region, 
  ProjectGoal, 
  ProjectUpdate, 
  TeamMember,
  ProjectStatusSummary
} from "@/types/ngo";

// Organizations
export const createOrganization = async (organization: Partial<Organization>): Promise<Organization> => {
  const { data, error } = await supabase
    .from('organizations')
    .insert(organization)
    .select('*')
    .single();

  if (error) {
    toast({
      title: "Error creating organization",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }

  return data;
};

export const getUserOrganizations = async (): Promise<Organization[]> => {
  const { data, error } = await supabase
    .from('organization_members')
    .select(`
      organization:organizations (*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    toast({
      title: "Error fetching organizations",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }

  return data.map(item => item.organization);
};

// Projects
export const getProjectsByOrganization = async (organizationId: string): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      region:regions (*)
    `)
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });

  if (error) {
    toast({
      title: "Error fetching projects",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }

  return data || [];
};

export const getProjectById = async (projectId: string): Promise<Project> => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      region:regions (*)
    `)
    .eq('id', projectId)
    .single();

  if (error) {
    toast({
      title: "Error fetching project",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }

  return data;
};

export const createProject = async (project: Partial<Project>): Promise<Project> => {
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select('*')
    .single();

  if (error) {
    toast({
      title: "Error creating project",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }

  return data;
};

export const updateProject = async (id: string, project: Partial<Project>): Promise<Project> => {
  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    toast({
      title: "Error updating project",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }

  return data;
};

// Project Goals
export const getProjectGoals = async (projectId: string): Promise<ProjectGoal[]> => {
  const { data, error } = await supabase
    .from('project_goals')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) {
    toast({
      title: "Error fetching project goals",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }

  return data || [];
};

// Project Updates
export const getProjectUpdates = async (projectId: string): Promise<ProjectUpdate[]> => {
  const { data, error } = await supabase
    .from('project_updates')
    .select(`
      *,
      author:profiles (*)
    `)
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) {
    toast({
      title: "Error fetching project updates",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }

  return data || [];
};

export const addProjectUpdate = async (update: Partial<ProjectUpdate>): Promise<ProjectUpdate> => {
  const { data, error } = await supabase
    .from('project_updates')
    .insert(update)
    .select('*')
    .single();

  if (error) {
    toast({
      title: "Error adding project update",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }

  return data;
};

// Team Members
export const getTeamMembers = async (organizationId: string): Promise<TeamMember[]> => {
  const { data, error } = await supabase
    .from('team_members')
    .select(`
      *,
      profile:profiles (*),
      region:regions (*)
    `)
    .eq('organization_id', organizationId)
    .order('is_coordinator', { ascending: false });

  if (error) {
    toast({
      title: "Error fetching team members",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }

  return data || [];
};

// Regions
export const getRegions = async (organizationId: string): Promise<Region[]> => {
  const { data, error } = await supabase
    .from('regions')
    .select('*')
    .eq('organization_id', organizationId)
    .order('name', { ascending: true });

  if (error) {
    toast({
      title: "Error fetching regions",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }

  return data || [];
};

// Dashboard Data
export const getProjectStatusSummary = async (organizationId: string): Promise<ProjectStatusSummary> => {
  const { data, error } = await supabase
    .from('project_status_summary')
    .select('*')
    .eq('organization_id', organizationId)
    .single();

  if (error) {
    // If no rows found, return empty summary
    if (error.code === 'PGRST116') {
      return {
        organization_id: organizationId,
        on_track_count: 0,
        at_risk_count: 0,
        on_hold_count: 0,
        planning_count: 0,
        completed_count: 0,
        active_count: 0,
        total_count: 0
      };
    }
    
    toast({
      title: "Error fetching project status summary",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }

  return data;
};
