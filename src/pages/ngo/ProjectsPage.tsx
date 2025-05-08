
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { PlusCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectsByOrganization } from "@/services/ngoService";
import { useOrganization } from "@/components/ngo/OrganizationContext";
import { Project } from "@/types/ngo";
import { Input } from "@/components/ui/input";

const NGOProjectsPage = () => {
  const navigate = useNavigate();
  const { currentOrganization } = useOrganization();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  
  // Fetch projects for the current organization
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['projects', currentOrganization?.id],
    queryFn: () => currentOrganization ? getProjectsByOrganization(currentOrganization.id) : Promise.resolve([]),
    enabled: !!currentOrganization,
  });

  // Filter projects when search term or projects change
  useEffect(() => {
    if (!projects.length) {
      setFilteredProjects([]);
      return;
    }

    const filtered = projects.filter(project => 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.region?.name && project.region.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      project.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredProjects(filtered);
  }, [searchTerm, projects]);

  // Format budget as currency
  const formatBudget = (budget: number | null): string => {
    if (budget === null) return "N/A";
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(budget);
  };

  // Get status style based on project status
  const getStatusStyle = (status: string): string => {
    switch(status) {
      case "On Track": return "bg-emerald/20 text-emerald";
      case "At Risk": return "bg-sand/20 text-sand";
      case "On Hold": return "bg-gray-200 text-gray-500";
      case "Planning": return "bg-blue-100 text-blue-600";
      case "Completed": return "bg-green-100 text-green-600";
      default: return "bg-gray-200 text-gray-500";
    }
  };

  return (
    <div className="p-6 bg-offwhite min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Button 
          variant="emerald" 
          onClick={() => navigate("/dashboard/ngo/projects/new")}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            type="text" 
            placeholder="Search projects..." 
            className="pl-9 w-full h-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>All Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              Error loading projects. Please try again.
            </div>
          ) : filteredProjects.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Beneficiaries</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Completion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow 
                    key={project.id}
                    className="cursor-pointer hover:bg-muted/20"
                    onClick={() => navigate(`/dashboard/ngo/projects/${project.id}`)}
                  >
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.region?.name || "Not assigned"}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(project.status)}`}>
                        {project.status}
                      </span>
                    </TableCell>
                    <TableCell>{project.beneficiaries_count.toLocaleString()}</TableCell>
                    <TableCell>{formatBudget(project.budget)}</TableCell>
                    <TableCell>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-emerald h-full rounded-full" 
                          style={{ width: `${project.completion_percentage}%` }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {projects.length === 0 
                ? "No projects found. Create your first project!" 
                : "No projects match your search."}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NGOProjectsPage;
