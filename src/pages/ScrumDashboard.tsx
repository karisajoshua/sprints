
import React from "react";
import { Sidebar, SidebarContent, SidebarTrigger, SidebarProvider, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar";
import { LayoutDashboard, CheckCircle, Calendar, Users, Settings, PlusCircle, Clock, FileText, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ScrumSidebar = () => {
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
                  <Layers className="w-4 h-4" />
                  <span>Backlog</span>
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
          <SidebarGroupLabel>Planning</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-3">
                  <FileText className="w-4 h-4" />
                  <span>User Stories</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4" />
                  <span>Acceptance Criteria</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

const ScrumDashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-offwhite">
        <ScrumSidebar />
        <div className="flex-1 flex flex-col">
          <header className="bg-white shadow-sm h-[60px] flex items-center justify-between px-6">
            <div className="flex items-center">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold ml-4">Scrum Dashboard</h1>
            </div>
            <Button variant="emerald" className="hover-scale" size="sm">
              <PlusCircle className="w-4 h-4 mr-2" />
              New Sprint
            </Button>
          </header>
          <main className="flex-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="hover-scale">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Current Sprint</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">Sprint 8</div>
                      <div className="text-sm text-emerald font-medium">68% Complete</div>
                    </div>
                    <Progress value={68} className="h-2" />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>3 days left</span>
                      </div>
                      <span>15/22 story points</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-scale">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Team Velocity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-teal">22</div>
                    <div className="text-sm text-muted-foreground">Story points per sprint</div>
                  </div>
                  <div className="mt-4 text-xs text-emerald flex items-center">
                    <span className="mr-1">▲</span> 3 points from last sprint
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-scale">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Burn Down</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-sand">On track</div>
                    <div className="text-sm text-muted-foreground">2 blockers</div>
                  </div>
                  <div className="mt-4">
                    <div className="h-2 w-full bg-gray-200 rounded-full">
                      <div className="h-2 bg-gradient-to-r from-emerald to-teal rounded-full" style={{width: '65%'}}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 hover-scale">
                <CardHeader>
                  <CardTitle>Sprint Backlog</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Implement user story refinement", "Update sprint planning board", "Create velocity charts", "Fix acceptance test failures"].map((task, i) => (
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
                  <CardTitle>Team Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Morale</span>
                        <span className="text-emerald">Good</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Commitment</span>
                        <span className="text-emerald">Excellent</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Dependencies</span>
                        <span className="text-sand">Needs attention</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div className="pt-2 text-center">
                      <Button variant="outline" size="sm">
                        Schedule Retrospective
                      </Button>
                    </div>
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

export default ScrumDashboard;
