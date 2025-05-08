
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useOrganization } from "@/components/ngo/OrganizationContext";
import { useQuery } from "@tanstack/react-query";
import { getRegions } from "@/services/ngoService";

const RegionsCard = () => {
  const navigate = useNavigate();
  const { currentOrganization } = useOrganization();
  
  const { data: regions, isLoading } = useQuery({
    queryKey: ['regions', currentOrganization?.id],
    queryFn: () => currentOrganization ? getRegions(currentOrganization.id) : Promise.resolve([]),
    enabled: !!currentOrganization,
  });
  
  // Get unique countries count
  const countriesCount = regions?.length > 0 
    ? new Set(regions.map(region => region.country).filter(Boolean)).size 
    : 0;
  
  // Get coverage values for bar chart
  const coverageValues = regions?.map(region => region.coverage_percentage || 0) || [];
  
  return (
    <Card className="hover:scale-105 transition-transform cursor-pointer" onClick={() => navigate('/dashboard/ngo/regions')}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Active Regions</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-20">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald"></div>
          </div>
        ) : regions && regions.length > 0 ? (
          <>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-emerald">{regions.length}</div>
              <div className="text-sm text-muted-foreground">
                {countriesCount > 0 
                  ? `Across ${countriesCount} ${countriesCount === 1 ? 'Country' : 'Countries'}`
                  : 'Regions Added'}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-sm text-muted-foreground mb-1">Regional Coverage</div>
              <div className="grid grid-cols-7 gap-1">
                {coverageValues.length > 0 ? (
                  coverageValues.slice(0, 7).map((value, i) => (
                    <div key={i} className="h-12 bg-emerald/10 rounded-md relative overflow-hidden">
                      <div 
                        className="absolute bottom-0 w-full bg-emerald rounded-md" 
                        style={{ height: `${value}%` }}
                      ></div>
                    </div>
                  ))
                ) : (
                  // Show empty bars when we have regions but no coverage data
                  Array(7).fill(0).map((_, i) => (
                    <div key={i} className="h-12 bg-emerald/10 rounded-md"></div>
                  ))
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-20 text-center">
            <div className="text-sm text-muted-foreground mb-2">No regions defined yet</div>
            <div className="text-xs text-emerald">Click to add your first region</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RegionsCard;
