
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useOrganization } from "@/components/ngo/OrganizationContext";
import { useQuery } from "@tanstack/react-query";
import { getProjectStatusSummary } from "@/services/ngoService";

const ProjectStatusCard = () => {
  const navigate = useNavigate();
  const { currentOrganization } = useOrganization();
  
  const { data: statusSummary, isLoading } = useQuery({
    queryKey: ['projectStatusSummary', currentOrganization?.id],
    queryFn: () => currentOrganization ? getProjectStatusSummary(currentOrganization.id) : Promise.resolve({
      on_track_count: 0,
      at_risk_count: 0,
      on_hold_count: 0,
      planning_count: 0,
      completed_count: 0,
      active_count: 0,
      total_count: 0
    }),
    enabled: !!currentOrganization,
  });
  
  // Calculate progress percentage based on actual data
  const progressPercentage = statusSummary && statusSummary.total_count > 0 
    ? Math.round((statusSummary.completed_count / statusSummary.total_count) * 100) 
    : 0;
  
  return (
    <Card className="hover:scale-105 transition-transform cursor-pointer" onClick={() => navigate('/dashboard/ngo/projects/status')}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Project Status</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-20">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald"></div>
          </div>
        ) : statusSummary && statusSummary.total_count > 0 ? (
          <div className="space-y-4">
            <div className="flex justify-between">
              <div>
                <div className="text-lg font-semibold">{statusSummary.active_count}</div>
                <div className="text-xs text-muted-foreground">Active Projects</div>
              </div>
              <div>
                <div className="text-lg font-semibold">{statusSummary.at_risk_count}</div>
                <div className="text-xs text-muted-foreground">At Risk</div>
              </div>
              <div>
                <div className="text-lg font-semibold">{statusSummary.completed_count}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-20 text-center">
            <div className="text-sm text-muted-foreground mb-2">No projects created yet</div>
            <div className="text-xs text-emerald">Click to create your first project</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectStatusCard;
