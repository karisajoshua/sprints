
import React from "react";
import { Sidebar, SidebarContent, SidebarTrigger, SidebarProvider, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar";
import { LayoutDashboard, CheckCircle, Calendar, Users, Settings, PlusCircle, Rocket, TrendingUp, Flag, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const StartupSidebar = () => {
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
                  <Rocket className="w-4 h-4" />
                  <span>Projects</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4" />
                  <span>Growth</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4" />
                  <span>Tasks</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Team</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-3">
                  <Users className="w-4 h-4" />
                  <span>Members</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-3">
                  <Target className="w-4 h-4" />
                  <span>OKRs</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

const StartupDashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-offwhite">
        <StartupSidebar />
        <div className="flex-1 flex flex-col">
          <header className="bg-white shadow-sm h-[60px] flex items-center justify-between px-6">
            <div className="flex items-center">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold ml-4">Startup Dashboard</h1>
            </div>
            <Button variant="emerald" className="hover-scale" size="sm">
              <PlusCircle className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </header>
          <main className="flex-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="hover-scale">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Product Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl font-bold text-emerald">87%</div>
                    <div className="text-sm text-muted-foreground">Weekly Growth</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Active Users</span>
                      <span className="font-medium">1,245</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Retention</span>
                      <span className="font-medium">76%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-scale">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Runway</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-sand">8.5</div>
                    <div className="text-sm text-muted-foreground">Months Remaining</div>
                  </div>
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span>Burn Rate</span>
                      <span>$23k/month</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-scale">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Team Velocity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-teal">Fast</div>
                    <div className="text-sm text-muted-foreground">4 launches/month</div>
                  </div>
                  <div className="mt-4 text-xs text-emerald flex items-center">
                    <span className="mr-1">▲</span> 24% increase in shipping speed
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 hover-scale">
                <CardHeader>
                  <CardTitle>Current Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Mobile app v2 redesign", "Landing page optimization", "Payment gateway integration", "User onboarding flow"].map((project, i) => (
                      <div key={i} className="bg-offwhite rounded-md p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{project}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            i === 0 ? "bg-emerald/20 text-emerald" : 
                            i === 1 ? "bg-teal/20 text-teal" : 
                            i === 2 ? "bg-sand/20 text-sand" : 
                            "bg-gray-200 text-gray-500"
                          }`}>
                            {i === 0 ? "On Track" : 
                             i === 1 ? "In Progress" : 
                             i === 2 ? "At Risk" : 
                             "Not Started"}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mb-2">
                          <span>Owner: {["Sarah", "David", "Michael", "Emma"][i]}</span>
                          <span>Due: {["May 15", "May 22", "May 18", "June 1"][i]}</span>
                        </div>
                        <Progress value={[85, 45, 30, 0][i]} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-scale">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Create Task
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Invite Team Member
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Flag className="w-4 h-4 mr-2" />
                      Set Milestone
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Meeting
                    </Button>
                    <Button variant="emerald" className="w-full justify-start mt-4">
                      <Zap className="w-4 h-4 mr-2" />
                      Weekly Review
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

export default StartupDashboard;
