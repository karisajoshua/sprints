
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import NGOSidebar from "@/components/ngo/NGOSidebar";
import DashboardHeader from "@/components/ngo/DashboardHeader";
import DashboardCards from "@/components/ngo/dashboard/DashboardCards";

const NGODashboard = () => {
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
