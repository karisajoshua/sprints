
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, Globe } from "lucide-react";

const NGORegionsPage = () => {
  const regions = [
    { id: 1, name: "East Africa", countries: ["Kenya", "Tanzania", "Uganda", "Rwanda"], projects: 8, coordinators: 3 },
    { id: 2, name: "West Africa", countries: ["Ghana", "Nigeria", "Senegal", "Côte d'Ivoire"], projects: 6, coordinators: 2 },
    { id: 3, name: "Southern Africa", countries: ["South Africa", "Botswana", "Zimbabwe", "Mozambique"], projects: 5, coordinators: 2 },
    { id: 4, name: "Central Africa", countries: ["DR Congo", "Cameroon", "Central African Republic"], projects: 4, coordinators: 1 },
  ];

  return (
    <div className="p-6 bg-offwhite min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Regions</h1>
      
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm h-[400px] flex items-center justify-center">
        <div className="text-center">
          <Globe size={80} className="mb-4 mx-auto text-emerald opacity-50" />
          <p className="text-muted-foreground">Interactive map will be displayed here</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {regions.map(region => (
          <Card key={region.id} className="hover:scale-105 transition-transform cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Map className="w-5 h-5 text-emerald" />
                {region.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-2">
                Countries: {region.countries.join(', ')}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-offwhite p-3 rounded-md">
                  <div className="text-xl font-bold">{region.projects}</div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </div>
                <div className="bg-offwhite p-3 rounded-md">
                  <div className="text-xl font-bold">{region.coordinators}</div>
                  <div className="text-xs text-muted-foreground">Coordinators</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NGORegionsPage;
