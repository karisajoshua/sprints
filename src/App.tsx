
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import SetupWizard from "./pages/SetupWizard";
import ScrumDashboard from "./pages/ScrumDashboard";
import StartupDashboard from "./pages/StartupDashboard";
import NGODashboard from "./pages/NGODashboard";
import NotFound from "./pages/NotFound";

// Import Auth components
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ThankYou from "./pages/auth/ThankYou";
import { AuthProvider } from "./hooks/useAuth";
import RequireAuth from "./components/ngo/RequireAuth";
import { OrganizationProvider } from "./components/ngo/OrganizationContext";

// Import NGO pages
import NGOProjectsPage from "./pages/ngo/ProjectsPage";
import NGORegionsPage from "./pages/ngo/RegionsPage";
import NGOImpactPage from "./pages/ngo/ImpactPage";
import NGOTeamsPage from "./pages/ngo/TeamsPage";
import NGOPartnersPage from "./pages/ngo/PartnersPage";
import NGOStakeholdersPage from "./pages/ngo/StakeholdersPage";
import NGOProjectDetailPage from "./pages/ngo/ProjectDetailPage";
import NGONewProjectPage from "./pages/ngo/NewProjectPage";
import CreateOrganizationPage from "./pages/ngo/CreateOrganizationPage";

// Import Workspace pages
import { WorkspaceProvider } from "./components/workspace/WorkspaceContext";
import CreateWorkspacePage from "./pages/workspace/CreateWorkspacePage";
import WorkspacePage from "./pages/workspace/WorkspacePage";
import InvitePage from "./pages/workspace/InvitePage";
import JoinPage from "./pages/workspace/JoinPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TooltipProvider>
              <OrganizationProvider>
                <WorkspaceProvider>
                  <Routes>
                    {/* Home page is the default entry point */}
                    <Route path="/" element={<Index />} />
                    
                    {/* Setup and Dashboard Routes */}
                    <Route path="/setup" element={<SetupWizard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/scrum" element={<ScrumDashboard />} />
                    <Route path="/dashboard/startup" element={<StartupDashboard />} />
                    
                    {/* Auth Routes */}
                    <Route path="/auth/signin" element={<SignIn />} />
                    <Route path="/auth/signup" element={<SignUp />} />
                    <Route path="/auth/thankyou" element={<ThankYou />} />
                    
                    {/* Protected NGO Routes */}
                    <Route element={<RequireAuth />}>
                      <Route path="/dashboard/ngo" element={<NGODashboard />} />
                      <Route path="/dashboard/ngo/create-organization" element={<CreateOrganizationPage />} />
                      <Route path="/dashboard/ngo/projects" element={<NGOProjectsPage />} />
                      <Route path="/dashboard/ngo/projects/new" element={<NGONewProjectPage />} />
                      <Route path="/dashboard/ngo/projects/:id" element={<NGOProjectDetailPage />} />
                      <Route path="/dashboard/ngo/regions" element={<NGORegionsPage />} />
                      <Route path="/dashboard/ngo/impact" element={<NGOImpactPage />} />
                      <Route path="/dashboard/ngo/teams" element={<NGOTeamsPage />} />
                      <Route path="/dashboard/ngo/partners" element={<NGOPartnersPage />} />
                      <Route path="/dashboard/ngo/stakeholders" element={<NGOStakeholdersPage />} />
                    </Route>
                    
                    {/* Workspace Routes */}
                    <Route element={<RequireAuth />}>
                      <Route path="/workspace/create" element={<CreateWorkspacePage />} />
                      <Route path="/workspace/:workspaceId" element={<WorkspacePage />} />
                      <Route path="/workspace/:workspaceId/invite" element={<InvitePage />} />
                      <Route path="/dashboard/events" element={<WorkspacePage />} />
                    </Route>
                    
                    {/* Public Workspace Routes */}
                    <Route path="/join" element={<JoinPage />} />
                    
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Toaster />
                  <Sonner />
                </WorkspaceProvider>
              </OrganizationProvider>
            </TooltipProvider>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
