
import React, { useState } from "react";
import { 
  Sidebar, SidebarContent, SidebarTrigger, SidebarProvider, 
  SidebarMenu, SidebarMenuItem, SidebarMenuButton, 
  SidebarHeader, SidebarGroup, SidebarGroupContent, SidebarGroupLabel 
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, CheckCircle, Calendar, Users, Settings, 
  PlusCircle, FileText, Layers, Kanban, Briefcase, 
  BarChart3, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrumProvider, useScrum } from "@/components/scrum/ScrumContext";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createDepartment } from "@/services/scrumService";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DepartmentManagement } from "@/components/scrum/DepartmentManagement";
import { TeamManagement } from "@/components/scrum/TeamManagement";
import { SprintManagement } from "@/components/scrum/SprintManagement";
import { TaskBoard } from "@/components/scrum/TaskBoard";

type TabType = "dashboard" | "backlog" | "sprints" | "team" | "settings";

const ScrumSidebar = ({ activeTab, setActiveTab }: { 
  activeTab: TabType, 
  setActiveTab: (tab: TabType) => void
}) => {
  const { currentDepartment } = useScrum();
  
  return (
    <Sidebar className="sidebar-gradient text-white">
      <SidebarHeader className="flex items-center px-6 py-4 h-[60px]">
        <span className="text-white font-poppins font-bold text-xl">
          Scrum<span className="text-lavender">Board</span>
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className={`flex items-center gap-3 text-white/90 hover:text-white ${activeTab === 'dashboard' ? 'bg-white/10 text-white' : ''}`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className={`flex items-center gap-3 text-white/90 hover:text-white ${activeTab === 'backlog' ? 'bg-white/10 text-white' : ''}`}
                  onClick={() => setActiveTab('backlog')}
                >
                  <Layers className="w-4 h-4" />
                  <span>Task Board</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className={`flex items-center gap-3 text-white/90 hover:text-white ${activeTab === 'sprints' ? 'bg-white/10 text-white' : ''}`}
                  onClick={() => setActiveTab('sprints')}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Sprints</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className={`flex items-center gap-3 text-white/90 hover:text-white ${activeTab === 'team' ? 'bg-white/10 text-white' : ''}`}
                  onClick={() => setActiveTab('team')}
                >
                  <Users className="w-4 h-4" />
                  <span>Team</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-3 text-white/90 hover:text-white">
                  <Kanban className="w-4 h-4" />
                  <span>Board</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-3 text-white/90 hover:text-white">
                  <FileText className="w-4 h-4" />
                  <span>Documents</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className={`flex items-center gap-3 text-white/90 hover:text-white ${activeTab === 'settings' ? 'bg-white/10 text-white' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

const NewDepartmentModal = ({ onCreated }: { onCreated: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const department = await createDepartment({ 
        name, 
        description: description || null 
      });
      
      if (department) {
        setName('');
        setDescription('');
        setIsOpen(false);
        onCreated();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="gradient" className="hover-scale" size="sm">
          <PlusCircle className="w-4 h-4 mr-2" />
          New Department
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="gradient-text">Create Department</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name">Department Name</label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter department name"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="description">Description (Optional)</label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter department description"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient" disabled={loading}>
              {loading ? 'Creating...' : 'Create Department'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const DepartmentSelector = ({ departments, currentDepartment, onSelect }: {
  departments: any[], 
  currentDepartment: any | null,
  onSelect: (dept: any) => void
}) => {
  if (departments.length === 0) {
    return <div className="text-sm text-muted-foreground">No departments yet</div>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {departments.map((dept) => (
        <Button 
          key={dept.id} 
          variant={currentDepartment?.id === dept.id ? "gradient" : "outline"}
          size="sm"
          onClick={() => onSelect(dept)}
        >
          {dept.name}
        </Button>
      ))}
    </div>
  );
};

const ScrumDashboardOverview = () => {
  const { currentDepartment } = useScrum();
  
  if (!currentDepartment) {
    return null;
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-white p-6 rounded-lg shadow hover-scale border border-border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Current Sprint</div>
              <div className="text-2xl font-semibold">Sprint 8</div>
            </div>
            <div className="h-12 w-12 rounded-full bg-gradient-lavender flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex justify-between">
              <span className="text-sm">Progress</span>
              <span className="text-sm font-medium">68%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{width: '68%'}}></div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-lavender">
              <CheckCircle className="h-4 w-4" />
              <span>On track</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>3 days left</span>
            </div>
          </div>
        </Card>
        
        <Card className="bg-white p-6 rounded-lg shadow hover-scale border border-border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Team Velocity</div>
              <div className="text-2xl font-semibold">22 pts</div>
            </div>
            <div className="h-12 w-12 rounded-full bg-gradient-purple flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex justify-between">
              <span className="text-sm">Last Sprint</span>
              <span className="text-sm font-medium">19 pts</span>
            </div>
            <div className="progress-bar">
              <div 
                className="h-full bg-gradient-to-r from-purple to-magenta rounded-full transition-all duration-500" 
                style={{width: '85%'}}
              ></div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-magenta">
              <span className="mr-1">▲</span> 
              <span>3 points from last sprint</span>
            </div>
          </div>
        </Card>
        
        <Card className="bg-white p-6 rounded-lg shadow hover-scale border border-border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Team Members</div>
              <div className="text-2xl font-semibold">8 Members</div>
            </div>
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-magenta to-purple flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex justify-between">
              <span className="text-sm">Active Members</span>
              <span className="text-sm font-medium">100%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{width: '100%'}}></div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-purple">
              <span className="mr-1">✓</span> 
              <span>2 Admins</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span>6 Contributors</span>
            </div>
          </div>
        </Card>
      </div>
      
      <DepartmentManagement />
      
      <Card className="hover-scale border border-border">
        <div className="p-6">
          <h2 className="text-lg font-medium mb-4 gradient-text">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center hover:border-lavender">
              <Layers className="h-5 w-5 mb-2 text-lavender" />
              <span>View Backlog</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center hover:border-purple">
              <Calendar className="h-5 w-5 mb-2 text-purple" />
              <span>Create Sprint</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center hover:border-magenta">
              <Users className="h-5 w-5 mb-2 text-magenta" />
              <span>Manage Team</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center hover:border-lavender">
              <Kanban className="h-5 w-5 mb-2 text-lavender" />
              <span>Board View</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

const DashboardContent = () => {
  const { user } = useAuth();
  const { 
    departments, 
    currentDepartment, 
    setCurrentDepartment, 
    isAdmin,
    refreshDepartments
  } = useScrum();
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  // Map tab name to component
  const renderTabContent = () => {
    if (!currentDepartment) return null;
    
    switch (activeTab) {
      case "dashboard":
        return <ScrumDashboardOverview />;
      case "backlog":
        return <TaskBoard />;
      case "sprints":
        return <SprintManagement />;
      case "team":
        return <TeamManagement />;
      case "settings":
        return (
          <Card className="p-6 border border-border">
            <h2 className="text-lg font-medium mb-4 gradient-text">Department Settings</h2>
            <p className="text-muted-foreground">Settings options will be available here.</p>
          </Card>
        );
      default:
        return <ScrumDashboardOverview />;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <header className="bg-white shadow-sm h-[60px] flex items-center justify-between px-6 border-b">
        <div className="flex items-center">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold ml-4 gradient-text">Scrum Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          {user && isAdmin && (
            <NewDepartmentModal onCreated={refreshDepartments} />
          )}
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </header>
      <main className="flex-1 p-6 bg-offwhite">
        {user ? (
          <>
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-lg font-semibold">Your Departments</h2>
                <DepartmentSelector 
                  departments={departments} 
                  currentDepartment={currentDepartment} 
                  onSelect={setCurrentDepartment} 
                />
              </div>

              {currentDepartment ? (
                <>
                  {renderTabContent()}
                </>
              ) : (
                <div className="bg-white rounded-lg shadow p-8 text-center border border-border">
                  <div className="w-20 h-20 rounded-full bg-gradient-lavender mx-auto mb-4 flex items-center justify-center animate-bounce-subtle">
                    <Briefcase className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Department Selected</h3>
                  <p className="text-muted-foreground mb-6">
                    {departments.length > 0 
                      ? "Please select a department to view its dashboard."
                      : "You don't have any departments yet. Create your first department to get started."}
                  </p>
                  {departments.length === 0 && (
                    <NewDepartmentModal onCreated={refreshDepartments} />
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-purple mx-auto mb-4 flex items-center justify-center">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-medium mb-2">Authentication Required</h3>
            <p className="text-muted-foreground mb-6">
              Please sign in to access the Scrum dashboard.
            </p>
            <Button variant="gradient">Sign In</Button>
          </div>
        )}
      </main>
    </div>
  );
};

const ScrumDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  
  return (
    <ScrumProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-offwhite">
          <ScrumSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <DashboardContent />
        </div>
      </SidebarProvider>
    </ScrumProvider>
  );
};

export default ScrumDashboard;
