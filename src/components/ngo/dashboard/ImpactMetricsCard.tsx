
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useOrganization } from "@/components/ngo/OrganizationContext";
import { useQuery } from "@tanstack/react-query";
import { getImpactMetrics } from "@/services/ngoService";

const ImpactMetricsCard = () => {
  const navigate = useNavigate();
  const { currentOrganization } = useOrganization();
  
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['impactMetrics', currentOrganization?.id],
    queryFn: () => currentOrganization ? getImpactMetrics(currentOrganization.id) : Promise.resolve([]),
    enabled: !!currentOrganization,
  });
  
  // Calculate total people reached
  const peopleReached = metrics?.length > 0 
    ? metrics.reduce((sum, metric) => {
        return metric.metric_name.toLowerCase().includes('people') || 
               metric.metric_name.toLowerCase().includes('beneficiaries') ? 
               sum + Number(metric.metric_value) : sum;
      }, 0)
    : 0;
  
  // Format large numbers with k suffix
  const formatNumber = (num) => {
    return num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num;
  };
  
  return (
    <Card className="hover:scale-105 transition-transform cursor-pointer" onClick={() => navigate('/dashboard/ngo/impact')}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Impact Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-20">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald"></div>
          </div>
        ) : peopleReached > 0 ? (
          <>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-teal">{formatNumber(peopleReached)}</div>
              <div className="text-sm text-muted-foreground">People Reached</div>
            </div>
            {metrics && metrics.length > 1 && (
              <div className="mt-4 text-xs text-emerald flex items-center">
                <span className="mr-1">▲</span> Tracking {metrics.length} impact metrics
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-20 text-center">
            <div className="text-sm text-muted-foreground mb-2">No impact data yet</div>
            <div className="text-xs text-emerald">Click to add impact metrics</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImpactMetricsCard;
