
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CoordinatorsCard = () => {
  const navigate = useNavigate();
  
  const coordinators = [
    {id: 1, name: "Ngozi Okonjo", region: "East Africa"},
    {id: 2, name: "Kwame Darko", region: "West Africa"},
    {id: 3, name: "Thabo Mbeki", region: "Southern Africa"},
    {id: 4, name: "Marie Diop", region: "Central Africa"},
  ];
  
  return (
    <Card className="hover:scale-105 transition-transform">
      <CardHeader>
        <CardTitle>Regional Coordinators</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {coordinators.map((coordinator, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3 cursor-pointer hover:bg-offwhite p-2 rounded-md transition-colors"
              onClick={() => navigate(`/dashboard/ngo/teams/${coordinator.id}`)}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald to-teal flex items-center justify-center text-white font-medium">
                {coordinator.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-medium">{coordinator.name}</div>
                <div className="text-xs text-muted-foreground">{coordinator.region}</div>
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
      </CardContent>
    </Card>
  );
};

export default CoordinatorsCard;
