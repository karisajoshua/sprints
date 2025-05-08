
import React from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LayoutDashboard, Globe, Map, BarChart3, Users, Building, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";

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

export default NGOSidebar;
