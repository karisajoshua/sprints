
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const ProjectStatusCard = () => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default ProjectStatusCard;
