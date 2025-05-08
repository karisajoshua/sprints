
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Types for Scrum entities
export type ScrumDepartment = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type ScrumDepartmentMember = {
  id: string;
  department_id: string;
  profile_id: string;
  role: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
  profile?: {
    id: string;
    full_name: string | null;
    email: string;
    avatar_url: string | null;
  }
};

export type ScrumSprint = {
  id: string;
  name: string;
  department_id: string;
  start_date: string | null;
  end_date: string | null;
  goal: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type ScrumTask = {
  id: string;
  title: string;
  description: string | null;
  department_id: string;
  assignee_id: string | null;
  reporter_id: string | null;
  sprint_id: string | null;
  status: string;
  priority: string;
  story_points: number | null;
  due_date: string | null;
  created_at: string;
  updated_at: string;
  assignee?: {
    id: string;
    full_name: string | null;
    email: string;
    avatar_url: string | null;
  };
  reporter?: {
    id: string;
    full_name: string | null;
    email: string;
    avatar_url: string | null;
  };
};

export type ScrumBoardColumn = {
  id: string;
  department_id: string;
  name: string;
  position: number;
  created_at: string;
  updated_at: string;
};

// Departments
export const getDepartments = async (): Promise<ScrumDepartment[]> => {
  try {
    const { data, error } = await supabase
      .from('scrum_departments')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      toast({
        title: "Error fetching departments",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    return data || [];
  } catch (error: any) {
    console.error("Error in getDepartments:", error);
    return [];
  }
};

export const getDepartmentById = async (id: string): Promise<ScrumDepartment | null> => {
  try {
    const { data, error } = await supabase
      .from('scrum_departments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code !== 'PGRST116') { // Not found error
        toast({
          title: "Error fetching department",
          description: error.message,
          variant: "destructive",
        });
      }
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error in getDepartmentById:", error);
    return null;
  }
};

export const createDepartment = async (department: Pick<ScrumDepartment, 'name'> & Partial<Omit<ScrumDepartment, 'name'>>): Promise<ScrumDepartment | null> => {
  try {
    const { data, error } = await supabase
      .from('scrum_departments')
      .insert(department)
      .select()
      .single();

    if (error) {
      toast({
        title: "Error creating department",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    // Add the creator as an admin member
    const { error: memberError } = await supabase
      .from('scrum_department_members')
      .insert({
        department_id: data.id,
        profile_id: (await supabase.auth.getUser()).data.user?.id,
        role: 'Admin',
        is_admin: true
      });

    if (memberError) {
      toast({
        title: "Error adding you as admin",
        description: memberError.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Department created",
        description: `${data.name} has been created successfully.`,
      });
    }

    return data;
  } catch (error: any) {
    console.error("Error in createDepartment:", error);
    return null;
  }
};

export const updateDepartment = async (id: string, department: Partial<ScrumDepartment>): Promise<ScrumDepartment | null> => {
  try {
    const { data, error } = await supabase
      .from('scrum_departments')
      .update(department)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      toast({
        title: "Error updating department",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    toast({
      title: "Department updated",
      description: `${data.name} has been updated successfully.`,
    });

    return data;
  } catch (error: any) {
    console.error("Error in updateDepartment:", error);
    return null;
  }
};

export const deleteDepartment = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('scrum_departments')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error deleting department",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    toast({
      title: "Department deleted",
      description: "The department has been deleted successfully.",
    });

    return true;
  } catch (error: any) {
    console.error("Error in deleteDepartment:", error);
    return false;
  }
};

// Department Members
export const getDepartmentMembers = async (departmentId: string): Promise<ScrumDepartmentMember[]> => {
  try {
    const { data, error } = await supabase
      .from('scrum_department_members')
      .select(`
        *,
        profile:profiles (*)
      `)
      .eq('department_id', departmentId)
      .order('is_admin', { ascending: false });

    if (error) {
      toast({
        title: "Error fetching department members",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    return data || [];
  } catch (error: any) {
    console.error("Error in getDepartmentMembers:", error);
    return [];
  }
};

export const addDepartmentMember = async (
  departmentId: string, 
  profileId: string, 
  role: string, 
  isAdmin: boolean = false
): Promise<ScrumDepartmentMember | null> => {
  try {
    const { data, error } = await supabase
      .from('scrum_department_members')
      .insert({
        department_id: departmentId,
        profile_id: profileId,
        role,
        is_admin: isAdmin
      })
      .select()
      .single();

    if (error) {
      toast({
        title: "Error adding member",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    toast({
      title: "Member added",
      description: "The member has been added to the department.",
    });

    return data;
  } catch (error: any) {
    console.error("Error in addDepartmentMember:", error);
    return null;
  }
};

export const updateDepartmentMember = async (
  id: string,
  updates: Partial<ScrumDepartmentMember>
): Promise<ScrumDepartmentMember | null> => {
  try {
    const { data, error } = await supabase
      .from('scrum_department_members')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      toast({
        title: "Error updating member",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    toast({
      title: "Member updated",
      description: "The member's information has been updated.",
    });

    return data;
  } catch (error: any) {
    console.error("Error in updateDepartmentMember:", error);
    return null;
  }
};

export const removeDepartmentMember = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('scrum_department_members')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error removing member",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    toast({
      title: "Member removed",
      description: "The member has been removed from the department.",
    });

    return true;
  } catch (error: any) {
    console.error("Error in removeDepartmentMember:", error);
    return false;
  }
};

// Sprints
export const getSprints = async (departmentId: string): Promise<ScrumSprint[]> => {
  try {
    const { data, error } = await supabase
      .from('scrum_sprints')
      .select('*')
      .eq('department_id', departmentId)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error fetching sprints",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    return data || [];
  } catch (error: any) {
    console.error("Error in getSprints:", error);
    return [];
  }
};

export const getSprintById = async (id: string): Promise<ScrumSprint | null> => {
  try {
    const { data, error } = await supabase
      .from('scrum_sprints')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code !== 'PGRST116') {
        toast({
          title: "Error fetching sprint",
          description: error.message,
          variant: "destructive",
        });
      }
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error in getSprintById:", error);
    return null;
  }
};

export const createSprint = async (sprint: Pick<ScrumSprint, 'name' | 'department_id'> & Partial<Omit<ScrumSprint, 'name' | 'department_id'>>): Promise<ScrumSprint | null> => {
  try {
    const { data, error } = await supabase
      .from('scrum_sprints')
      .insert(sprint)
      .select()
      .single();

    if (error) {
      toast({
        title: "Error creating sprint",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    toast({
      title: "Sprint created",
      description: `${data.name} has been created successfully.`,
    });

    return data;
  } catch (error: any) {
    console.error("Error in createSprint:", error);
    return null;
  }
};

export const updateSprint = async (id: string, sprint: Partial<ScrumSprint>): Promise<ScrumSprint | null> => {
  try {
    const { data, error } = await supabase
      .from('scrum_sprints')
      .update(sprint)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      toast({
        title: "Error updating sprint",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    toast({
      title: "Sprint updated",
      description: `${data.name} has been updated successfully.`,
    });

    return data;
  } catch (error: any) {
    console.error("Error in updateSprint:", error);
    return null;
  }
};

export const deleteSprint = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('scrum_sprints')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error deleting sprint",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    toast({
      title: "Sprint deleted",
      description: "The sprint has been deleted successfully.",
    });

    return true;
  } catch (error: any) {
    console.error("Error in deleteSprint:", error);
    return false;
  }
};

// Tasks
export const getTasks = async (departmentId: string, sprintId?: string): Promise<ScrumTask[]> => {
  try {
    let query = supabase
      .from('scrum_tasks')
      .select(`
        *,
        assignee:profiles!scrum_tasks_assignee_id_fkey(*),
        reporter:profiles!scrum_tasks_reporter_id_fkey(*)
      `)
      .eq('department_id', departmentId);

    if (sprintId) {
      query = query.eq('sprint_id', sprintId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error fetching tasks",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    return data || [];
  } catch (error: any) {
    console.error("Error in getTasks:", error);
    return [];
  }
};

export const getTaskById = async (id: string): Promise<ScrumTask | null> => {
  try {
    const { data, error } = await supabase
      .from('scrum_tasks')
      .select(`
        *,
        assignee:profiles!scrum_tasks_assignee_id_fkey(*),
        reporter:profiles!scrum_tasks_reporter_id_fkey(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code !== 'PGRST116') {
        toast({
          title: "Error fetching task",
          description: error.message,
          variant: "destructive",
        });
      }
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error in getTaskById:", error);
    return null;
  }
};

export const createTask = async (task: Pick<ScrumTask, 'title' | 'department_id'> & Partial<Omit<ScrumTask, 'title' | 'department_id'>>): Promise<ScrumTask | null> => {
  try {
    const { data, error } = await supabase
      .from('scrum_tasks')
      .insert(task)
      .select()
      .single();

    if (error) {
      toast({
        title: "Error creating task",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    toast({
      title: "Task created",
      description: `${data.title} has been created successfully.`,
    });

    return data;
  } catch (error: any) {
    console.error("Error in createTask:", error);
    return null;
  }
};

export const updateTask = async (id: string, task: Partial<ScrumTask>): Promise<ScrumTask | null> => {
  try {
    const { data, error } = await supabase
      .from('scrum_tasks')
      .update(task)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      toast({
        title: "Error updating task",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    toast({
      title: "Task updated",
      description: `${data.title} has been updated successfully.`,
    });

    return data;
  } catch (error: any) {
    console.error("Error in updateTask:", error);
    return null;
  }
};

export const deleteTask = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('scrum_tasks')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error deleting task",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    toast({
      title: "Task deleted",
      description: "The task has been deleted successfully.",
    });

    return true;
  } catch (error: any) {
    console.error("Error in deleteTask:", error);
    return false;
  }
};

// Board Columns
export const getBoardColumns = async (departmentId: string): Promise<ScrumBoardColumn[]> => {
  try {
    const { data, error } = await supabase
      .from('scrum_board_columns')
      .select('*')
      .eq('department_id', departmentId)
      .order('position', { ascending: true });

    if (error) {
      toast({
        title: "Error fetching board columns",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    return data || [];
  } catch (error: any) {
    console.error("Error in getBoardColumns:", error);
    return [];
  }
};
