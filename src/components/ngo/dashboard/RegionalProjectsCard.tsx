
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useOrganization } from "@/components/ngo/OrganizationContext";
import { useQuery } from "@tanstack/react-query";
import { getProjectsByOrganization } from "@/services/ngoService";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const RegionalProjectsCard = () => {
  const navigate = useNavigate();
  const { currentOrganization } = useOrganization();
  
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects', currentOrganization?.id],
    queryFn: () => currentOrganization ? getProjectsByOrganization(currentOrganization.id) : Promise.resolve([]),
    enabled: !!currentOrganization,
  });
  
  // Get the most recent/important projects to display
  const displayProjects = projects ? projects.slice(0, 4) : [];
  
  // Function to get relative time string
  const getRelativeTimeString = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  };
  
  // Get status style class based on project status
  const getStatusClass = (status) => {
    switch (status) {
      case "On Track": return "bg-emerald/20 text-emerald";
      case "At Risk": return "bg-sand/20 text-sand";
      case "On Hold": return "bg-gray-200 text-gray-500";
      default: return "bg-gray-200 text-gray-500";
    }
  };
  
  return (
    <Card className="lg:col-span-2 hover:scale-105 transition-transform">
      <CardHeader>
        <CardTitle>Regional Projects</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald"></div>
          </div>
        ) : displayProjects.length > 0 ? (
          <div className="space-y-4">
            {displayProjects.map((project, i) => (
              <div 
                key={i} 
                className="bg-offwhite rounded-md p-4 cursor-pointer hover:bg-white transition-colors"
                onClick={() => navigate(`/dashboard/ngo/projects/${project.id}`)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{project.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>Region: {project.region?.name || 'Unassigned'}</span>
                  <span>Last Updated: {getRelativeTimeString(project.updated_at)}</span>
                </div>
                <Progress value={project.completion_percentage || 0} className="h-1.5" />
              </div>
            ))}
            <div className="flex justify-center mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/dashboard/ngo/projects')}
              >
                View All Projects
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <div className="text-muted-foreground mb-4">No projects created yet</div>
            <Button
              variant="emerald"
              size="sm"
              onClick={() => navigate('/dashboard/ngo/projects/new')}
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Create First Project
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RegionalProjectsCard;
