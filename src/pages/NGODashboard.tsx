
import React, { useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import NGOSidebar from "@/components/ngo/NGOSidebar";
import DashboardHeader from "@/components/ngo/DashboardHeader";
import DashboardCards from "@/components/ngo/dashboard/DashboardCards";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useOrganization } from "@/components/ngo/OrganizationContext";

const NGODashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { organizations, loading: orgLoading } = useOrganization();
  const navigate = useNavigate();
  
  // Check if user has an organization, redirect if not
  useEffect(() => {
    if (!authLoading && !orgLoading) {
      if (user && organizations.length === 0) {
        // User has no organizations, redirect to create organization page
        // For now we'll just redirect to the sign-in page as a placeholder
        // In a real app, you'd create an organization creation flow
        navigate('/auth/signin');
      }
    }
  }, [user, organizations, authLoading, orgLoading, navigate]);

  // Show loading while checking auth status
  if (authLoading || orgLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-offwhite">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald"></div>
      </div>
    );
  }
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-offwhite">
        <NGOSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6">
            <DashboardCards />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default NGODashboard;
