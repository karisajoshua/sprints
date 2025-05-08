
import React from "react";
import { Sidebar, SidebarContent, SidebarTrigger, SidebarProvider, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar";
import { LayoutDashboard, CheckCircle, Calendar, Users, Settings, PlusCircle, Globe, Map, HeartHandshake, BarChart3, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const NGOSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-6 py-4 h-[60px]">
        <span className="text-emerald font-poppins font-bold text-xl">
          OneMap<span className="text-sand">Africa</span>
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-3" asChild>
                  <Link to="/dashboard/ngo">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-3" asChild>
                  <Link to="/dashboard/ngo/projects">
                    <Globe className="w-4 h-4" />
                    <span>Projects</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-3" asChild>
                  <Link to="/dashboard/ngo/regions">
                    <Map className="w-4 h-4" />
                    <span>Regions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-3" asChild>
                  <Link to="/dashboard/ngo/impact">
                    <BarChart3 className="w-4 h-4" />
                    <span>Impact</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Organization</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-3" asChild>
                  <Link to="/dashboard/ngo/teams">
                    <Users className="w-4 h-4" />
                    <span>Teams</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-3" asChild>
                  <Link to="/dashboard/ngo/partners">
                    <Building className="w-4 h-4" />
                    <span>Partners</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-3" asChild>
                  <Link to="/dashboard/ngo/stakeholders">
                    <HeartHandshake className="w-4 h-4" />
                    <span>Stakeholders</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

const NGODashboard = () => {
  const navigate = useNavigate();
  
  const handleNewProject = () => {
    navigate('/dashboard/ngo/projects/new');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-offwhite">
        <NGOSidebar />
        <div className="flex-1 flex flex-col">
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
          <main className="flex-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="hover:scale-105 transition-transform cursor-pointer" onClick={() => navigate('/dashboard/ngo/regions')}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Active Regions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-emerald">7</div>
                    <div className="text-sm text-muted-foreground">Across 4 Countries</div>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-muted-foreground mb-1">Regional Coverage</div>
                    <div className="grid grid-cols-7 gap-1">
                      {[90, 75, 60, 85, 40, 65, 30].map((value, i) => (
                        <div key={i} className="h-12 bg-emerald/10 rounded-md relative overflow-hidden">
                          <div 
                            className="absolute bottom-0 w-full bg-emerald rounded-md" 
                            style={{ height: `${value}%` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:scale-105 transition-transform cursor-pointer" onClick={() => navigate('/dashboard/ngo/projects/status')}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Project Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <div className="text-lg font-semibold">12</div>
                        <div className="text-xs text-muted-foreground">Active Projects</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">5</div>
                        <div className="text-xs text-muted-foreground">At Risk</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">24</div>
                        <div className="text-xs text-muted-foreground">Completed</div>
                      </div>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:scale-105 transition-transform cursor-pointer" onClick={() => navigate('/dashboard/ngo/impact')}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Impact Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-teal">24.5k</div>
                    <div className="text-sm text-muted-foreground">People Reached</div>
                  </div>
                  <div className="mt-4 text-xs text-emerald flex items-center">
                    <span className="mr-1">▲</span> 12% increase from last quarter
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 hover:scale-105 transition-transform">
                <CardHeader>
                  <CardTitle>Regional Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {id: 1, name: "Clean Water Initiative - East Africa", region: "East Africa", status: "On Track"},
                      {id: 2, name: "Education Support Program", region: "West Africa", status: "At Risk"},
                      {id: 3, name: "Healthcare Access Initiative", region: "Southern Africa", status: "On Hold"},
                      {id: 4, name: "Community Development", region: "Central Africa", status: "On Track"},
                    ].map((project, i) => (
                      <div 
                        key={i} 
                        className="bg-offwhite rounded-md p-4 cursor-pointer hover:bg-white transition-colors"
                        onClick={() => navigate(`/dashboard/ngo/projects/${project.id}`)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{project.name}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            project.status === "On Track" ? "bg-emerald/20 text-emerald" : 
                            project.status === "At Risk" ? "bg-sand/20 text-sand" : 
                            "bg-gray-200 text-gray-500"
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mb-2">
                          <span>Region: {project.region}</span>
                          <span>Last Updated: {["2 days ago", "1 week ago", "3 days ago", "Yesterday"][i]}</span>
                        </div>
                        <Progress value={[75, 40, 25, 60][i]} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:scale-105 transition-transform">
                <CardHeader>
                  <CardTitle>Regional Coordinators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {id: 1, name: "Ngozi Okonjo", region: "East Africa"},
                      {id: 2, name: "Kwame Darko", region: "West Africa"},
                      {id: 3, name: "Thabo Mbeki", region: "Southern Africa"},
                      {id: 4, name: "Marie Diop", region: "Central Africa"},
                    ].map((coordinator, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-3 cursor-pointer hover:bg-offwhite p-2 rounded-md transition-colors"
                        onClick={() => navigate(`/dashboard/ngo/teams/${coordinator.id}`)}
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald to-teal flex items-center justify-center text-white font-medium">
                          {coordinator.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium">{coordinator.name}</div>
                          <div className="text-xs text-muted-foreground">{coordinator.region}</div>
                        </div>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2"
                      onClick={() => navigate('/dashboard/ngo/teams')}
                    >
                      View All Team Members
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default NGODashboard;
