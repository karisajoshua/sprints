
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useOrganization } from "@/components/ngo/OrganizationContext";
import { useQuery } from "@tanstack/react-query";
import { getTeamMembers } from "@/services/ngoService";

const CoordinatorsCard = () => {
  const navigate = useNavigate();
  const { currentOrganization } = useOrganization();
  
  const { data: teamMembers, isLoading } = useQuery({
    queryKey: ['teamMembers', currentOrganization?.id],
    queryFn: () => currentOrganization ? getTeamMembers(currentOrganization.id) : Promise.resolve([]),
    enabled: !!currentOrganization,
  });
  
  // Filter to only show coordinators
  const coordinators = teamMembers?.filter(member => member.is_coordinator) || [];
  
  // Function to get initials from name
  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('') : '';
  };
  
  return (
    <Card className="hover:scale-105 transition-transform">
      <CardHeader>
        <CardTitle>Regional Coordinators</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-20">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald"></div>
          </div>
        ) : coordinators.length > 0 ? (
          <div className="space-y-4">
            {coordinators.map((coordinator, i) => (
              <div 
                key={i} 
                className="flex items-center gap-3 cursor-pointer hover:bg-offwhite p-2 rounded-md transition-colors"
                onClick={() => navigate(`/dashboard/ngo/teams/${coordinator.id}`)}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald to-teal flex items-center justify-center text-white font-medium">
                  {getInitials(coordinator.name || coordinator.profile?.full_name || '')}
                </div>
                <div>
                  <div className="font-medium">{coordinator.name || coordinator.profile?.full_name}</div>
                  <div className="text-xs text-muted-foreground">
                    {coordinator.region?.name || coordinator.role || 'Coordinator'}
                  </div>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-2"
              onClick={() => navigate('/dashboard/ngo/teams')}
            >
              View All Team Members
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-center p-4">
            <div className="text-sm text-muted-foreground mb-4">No regional coordinators defined yet</div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/dashboard/ngo/teams')}
            >
              Add Team Members
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CoordinatorsCard;
