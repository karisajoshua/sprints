
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUserOrganizations } from '@/services/ngoService';
import { Organization } from '@/types/ngo';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

type OrganizationContextType = {
  currentOrganization: Organization | null;
  organizations: Organization[];
  loading: boolean;
  setCurrentOrganization: (org: Organization) => void;
};

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export const OrganizationProvider = ({ children }: { children: ReactNode }) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizations = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const orgs = await getUserOrganizations();
        setOrganizations(orgs);
        
        // Set first organization as current if none is selected
        if (orgs.length > 0 && !currentOrganization) {
          setCurrentOrganization(orgs[0]);
        }
      } catch (error) {
        console.error('Failed to fetch organizations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, [user]);

  // If user logs out, clear organization data
  useEffect(() => {
    if (!user) {
      setCurrentOrganization(null);
      setOrganizations([]);
    }
  }, [user]);

  const value = {
    currentOrganization,
    organizations,
    loading,
    setCurrentOrganization,
  };

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
};
