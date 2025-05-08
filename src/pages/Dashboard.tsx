
import React from "react";
import { Sidebar, SidebarContent, SidebarTrigger, SidebarProvider, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar";
import { LayoutDashboard, CheckCircle, Calendar, Users, Settings, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardSidebar = () => {
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
                <SidebarMenuButton className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4" />
                  <span>Tasks</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-3">
                  <Calendar className="w-4 h-4" />
                  <span>Sprints</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-3">
                  <Users className="w-4 h-4" />
                  <span>Team</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-3">
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

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-offwhite">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <header className="bg-white shadow-sm h-[60px] flex items-center justify-between px-6">
            <div className="flex items-center">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold ml-4">My Dashboard</h1>
            </div>
            <Button variant="emerald" className="hover-scale" size="sm">
              <PlusCircle className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </header>
          <main className="flex-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <Card className="hover-scale">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-emerald">12</div>
                    <div className="text-sm text-gray-500">4 completed</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover-scale">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Sprint Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-teal">68%</div>
                    <div className="text-sm text-gray-500">3 days left</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover-scale">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Team Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-sand">High</div>
                    <div className="text-sm text-gray-500">24 commits today</div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="col-span-2 hover-scale">
                <CardHeader>
                  <CardTitle>Current Sprint</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Implement user dashboard", "Fix login API issues", "Add notification center", "Update documentation"].map((task, i) => (
                      <div key={i} className="flex items-center justify-between bg-offwhite rounded-md p-3">
                        <span>{task}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          i === 0 ? "bg-teal/20 text-teal" : 
                          i === 1 ? "bg-sand/20 text-sand" : 
                          i === 2 ? "bg-emerald/20 text-emerald" : 
                          "bg-gray-200 text-gray-500"
                        }`}>
                          {i === 0 ? "In Progress" : 
                           i === 1 ? "High Priority" : 
                           i === 2 ? "Ready" : 
                           "Pending"}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-scale">
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Ade Olanrewaju", "Fatima Mohammed", "Kofi Mensah", "Zainab Nkosi"].map((member, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald/60 to-teal/60 flex items-center justify-center text-white font-medium">
                          {member.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span>{member}</span>
                      </div>
                    ))}
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

export default Dashboard;
