
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const ImpactMetricsCard = () => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default ImpactMetricsCard;
