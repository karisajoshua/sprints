
export type Organization = {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  email: string;
  created_at: string;
  updated_at: string;
};

export type OrganizationMember = {
  id: string;
  organization_id: string;
  profile_id: string;
  role: 'admin' | 'manager' | 'member';
  created_at: string;
  updated_at: string;
  profile?: Profile;
};

export type Region = {
  id: string;
  organization_id: string;
  name: string;
  country: string | null;
  description: string | null;
  coverage_percentage: number;
  coordinates: any | null;
  active_projects_count: number;
  created_at: string;
  updated_at: string;
};

export type Project = {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  region_id: string | null;
  status: 'Planning' | 'On Track' | 'At Risk' | 'On Hold' | 'Completed';
  start_date: string | null;
  end_date: string | null;
  budget: number | null;
  beneficiaries_count: number;
  completion_percentage: number;
  created_at: string;
  updated_at: string;
  region?: Region;
};

export type ProjectGoal = {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: 'Not Started' | 'In Progress' | 'Completed';
  target_value: number | null;
  achieved_value: number;
  target_date: string | null;
  created_at: string;
  updated_at: string;
};

export type ProjectUpdate = {
  id: string;
  project_id: string;
  author_id: string | null;
  title: string;
  content: string;
  status_change: 'Planning' | 'On Track' | 'At Risk' | 'On Hold' | 'Completed' | null;
  completion_percentage: number | null;
  created_at: string;
  author?: Profile;
};

export type TeamMember = {
  id: string;
  organization_id: string;
  profile_id: string | null;
  name: string | null;
  email: string | null;
  role: string;
  region_id: string | null;
  is_coordinator: boolean;
  created_at: string;
  updated_at: string;
  profile?: Profile;
  region?: Region;
};

export type ProjectStatusSummary = {
  organization_id: string;
  on_track_count: number;
  at_risk_count: number;
  on_hold_count: number;
  planning_count: number;
  completed_count: number;
  active_count: number;
  total_count: number;
};
