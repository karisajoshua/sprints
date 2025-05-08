
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrganization } from '@/components/ngo/OrganizationContext';
import { useAuth } from './useAuth';

/**
 * Hook to ensure the user has an organization, redirects to organization
 * creation if they don't have one.
 */
export const useRequireOrganization = () => {
  const { currentOrganization, loading: orgLoading, organizations } = useOrganization();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only check after we're done loading auth and organization data
    if (!authLoading && !orgLoading) {
      // If user is logged in but has no organizations, redirect to create organization page
      if (user && organizations.length === 0) {
        navigate('/org/create');
      }
    }
  }, [user, organizations, authLoading, orgLoading, navigate]);

  return {
    currentOrganization,
    loading: authLoading || orgLoading,
    hasOrganization: organizations.length > 0
  };
};
