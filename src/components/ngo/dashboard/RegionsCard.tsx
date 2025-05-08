
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const RegionsCard = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="hover:scale-105 transition-transform cursor-pointer" onClick={() => navigate('/dashboard/ngo/regions')}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Active Regions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-emerald">7</div>
          <div className="text-sm text-muted-foreground">Across 4 Countries</div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-muted-foreground mb-1">Regional Coverage</div>
          <div className="grid grid-cols-7 gap-1">
            {[90, 75, 60, 85, 40, 65, 30].map((value, i) => (
              <div key={i} className="h-12 bg-emerald/10 rounded-md relative overflow-hidden">
                <div 
                  className="absolute bottom-0 w-full bg-emerald rounded-md" 
                  style={{ height: `${value}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionsCard;
