
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

// Import NGO pages
import NGOProjectsPage from "./pages/ngo/ProjectsPage";
import NGORegionsPage from "./pages/ngo/RegionsPage";
import NGOImpactPage from "./pages/ngo/ImpactPage";
import NGOTeamsPage from "./pages/ngo/TeamsPage";
import NGOPartnersPage from "./pages/ngo/PartnersPage";
import NGOStakeholdersPage from "./pages/ngo/StakeholdersPage";
import NGOProjectDetailPage from "./pages/ngo/ProjectDetailPage";
import NGONewProjectPage from "./pages/ngo/NewProjectPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/setup" element={<SetupWizard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/scrum" element={<ScrumDashboard />} />
              <Route path="/dashboard/startup" element={<StartupDashboard />} />
              <Route path="/dashboard/ngo" element={<NGODashboard />} />
              
              {/* NGO Dashboard Routes */}
              <Route path="/dashboard/ngo/projects" element={<NGOProjectsPage />} />
              <Route path="/dashboard/ngo/projects/new" element={<NGONewProjectPage />} />
              <Route path="/dashboard/ngo/projects/:id" element={<NGOProjectDetailPage />} />
              <Route path="/dashboard/ngo/regions" element={<NGORegionsPage />} />
              <Route path="/dashboard/ngo/impact" element={<NGOImpactPage />} />
              <Route path="/dashboard/ngo/teams" element={<NGOTeamsPage />} />
              <Route path="/dashboard/ngo/partners" element={<NGOPartnersPage />} />
              <Route path="/dashboard/ngo/stakeholders" element={<NGOStakeholdersPage />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
