
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { 
  ScrumDepartment,
  ScrumDepartmentMember,
  ScrumSprint,
  ScrumTask,
  ScrumBoardColumn,
  getDepartments,
  getDepartmentMembers
} from '@/services/scrumService';

type ScrumContextType = {
  departments: ScrumDepartment[];
  currentDepartment: ScrumDepartment | null;
  setCurrentDepartment: (department: ScrumDepartment | null) => void;
  departmentMembers: ScrumDepartmentMember[];
  isAdmin: boolean;
  loading: boolean;
  refreshDepartments: () => Promise<void>;
  refreshMembers: () => Promise<void>;
};

const ScrumContext = createContext<ScrumContextType | undefined>(undefined);

export const ScrumProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [departments, setDepartments] = useState<ScrumDepartment[]>([]);
  const [currentDepartment, setCurrentDepartment] = useState<ScrumDepartment | null>(null);
  const [departmentMembers, setDepartmentMembers] = useState<ScrumDepartmentMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Load departments on initial render if user is authenticated
  useEffect(() => {
    if (user) {
      refreshDepartments();
    } else {
      setLoading(false);
      setDepartments([]);
      setCurrentDepartment(null);
      setDepartmentMembers([]);
    }
  }, [user]);

  // Load department members when current department changes
  useEffect(() => {
    if (currentDepartment) {
      refreshMembers();
    } else {
      setDepartmentMembers([]);
      setIsAdmin(false);
    }
  }, [currentDepartment]);

  // Check if current user is admin of the current department
  useEffect(() => {
    if (user && departmentMembers.length > 0) {
      const userMembership = departmentMembers.find(member => member.profile_id === user.id);
      setIsAdmin(userMembership?.is_admin || false);
    } else {
      setIsAdmin(false);
    }
  }, [user, departmentMembers]);

  const refreshDepartments = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const fetchedDepartments = await getDepartments();
      setDepartments(fetchedDepartments);
      
      // If we have departments but no current department selected, select the first one
      if (fetchedDepartments.length > 0 && !currentDepartment) {
        setCurrentDepartment(fetchedDepartments[0]);
      }
    } catch (error) {
      console.error('Failed to fetch departments:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshMembers = async () => {
    if (!currentDepartment || !user) return;
    
    setLoading(true);
    try {
      const members = await getDepartmentMembers(currentDepartment.id);
      setDepartmentMembers(members);
    } catch (error) {
      console.error('Failed to fetch department members:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    departments,
    currentDepartment,
    setCurrentDepartment,
    departmentMembers,
    isAdmin,
    loading,
    refreshDepartments,
    refreshMembers,
  };

  return (
    <ScrumContext.Provider value={value}>
      {children}
    </ScrumContext.Provider>
  );
};

export const useScrum = () => {
  const context = useContext(ScrumContext);
  if (context === undefined) {
    throw new Error('useScrum must be used within a ScrumProvider');
  }
  return context;
};
