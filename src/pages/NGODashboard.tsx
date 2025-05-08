
import React, { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import NGOSidebar from "@/components/ngo/NGOSidebar";
import DashboardHeader from "@/components/ngo/DashboardHeader";
import DashboardCards from "@/components/ngo/dashboard/DashboardCards";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useOrganization } from "@/components/ngo/OrganizationContext";
import { toast } from "@/hooks/use-toast";

const NGODashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { organizations, loading: orgLoading } = useOrganization();
  const navigate = useNavigate();
  const [isSettingUp, setIsSettingUp] = useState(false);
  
  // Check if user has an organization, redirect if not
  useEffect(() => {
    // Check if user just came from setup wizard
    const isFromSetup = sessionStorage.getItem("fromSetupWizard") === "true";
    
    if (isFromSetup && !isSettingUp) {
      setIsSettingUp(true);
      
      // If coming from setup wizard, clear the flag immediately
      sessionStorage.removeItem("fromSetupWizard");
      
      // Show a loading toast
      toast({
        title: "Setting up your dashboard",
        description: "Please wait while we prepare your NGO dashboard...",
      });
    }
    
    // Only redirect if not currently setting up from wizard
    if (!authLoading && !orgLoading && !isSettingUp) {
      if (user && organizations.length === 0) {
        // User has no organizations, redirect to create organization page
        toast({
          title: "Create Your Organization",
          description: "Let's create your first organization to get started.",
        });
        
        // For now we'll redirect to the dashboard, in a real app you'd
        // redirect to a proper organization creation page
        navigate('/dashboard');
      }
    }
  }, [user, organizations, authLoading, orgLoading, navigate, isSettingUp]);

  // Add a retry mechanism for organization loading
  useEffect(() => {
    // If we're in setup mode (from wizard) but no organizations loaded yet
    if (isSettingUp && !orgLoading && organizations.length === 0 && user) {
      // Setup a retry timer with increasing timeout
      const retryTimer = setTimeout(() => {
        // Force a refresh of the organization context after a delay
        window.location.reload();
      }, 2000);
      
      return () => clearTimeout(retryTimer);
    } else if (isSettingUp && organizations.length > 0) {
      // Successfully loaded organization after setup
      setIsSettingUp(false);
      toast({
        title: "Setup Complete!",
        description: "Your NGO dashboard is ready.",
      });
    }
  }, [isSettingUp, organizations, orgLoading, user]);

  // Show loading while checking auth status or during setup
  if (authLoading || orgLoading || isSettingUp) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-offwhite">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald mb-4"></div>
        <p className="text-emerald font-medium">
          {isSettingUp ? "Setting up your NGO dashboard..." : "Loading..."}
        </p>
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
