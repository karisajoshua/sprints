
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";

const DashboardHeader = () => {
  const navigate = useNavigate();
  
  const handleNewProject = () => {
    navigate('/dashboard/ngo/projects/new');
  };

  return (
    <header className="bg-white shadow-sm h-[60px] flex items-center justify-between px-6">
      <div className="flex items-center">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold ml-4">NGO Dashboard</h1>
      </div>
      <Button variant="emerald" className="hover:scale-105 transition-transform" size="sm" onClick={handleNewProject}>
        <PlusCircle className="w-4 h-4 mr-2" />
        New Project
      </Button>
    </header>
  );
};

export default DashboardHeader;
