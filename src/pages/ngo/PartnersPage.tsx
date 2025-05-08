
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Search, PlusCircle, Globe } from "lucide-react";

const NGOPartnersPage = () => {
  const partners = [
    { 
      id: 1, 
      name: "Global Water Foundation", 
      type: "Funding Partner", 
      projects: 5,
      location: "Geneva, Switzerland",
      website: "globalwaterfoundation.org",
      logo: "GWF"
    },
    { 
      id: 2, 
      name: "EduAccess International", 
      type: "Implementation Partner", 
      projects: 3,
      location: "London, UK",
      website: "eduaccess.org",
      logo: "EAI"
    },
    { 
      id: 3, 
      name: "African Health Initiative", 
      type: "Technical Partner", 
      projects: 4,
      location: "Nairobi, Kenya",
      website: "afrihealth.org",
      logo: "AHI"
    },
    { 
      id: 4, 
      name: "Community Builders Network", 
      type: "Local Partner", 
      projects: 6,
      location: "Accra, Ghana",
      website: "communitybuilders.net",
      logo: "CBN"
    },
    { 
      id: 5, 
      name: "Sustainable Futures", 
      type: "Funding Partner", 
      projects: 2,
      location: "Cape Town, South Africa",
      website: "sustainablefutures.org",
      logo: "SF"
    },
    { 
      id: 6, 
      name: "Women's Empowerment Coalition", 
      type: "Implementation Partner", 
      projects: 3,
      location: "Dakar, Senegal",
      website: "wec-africa.org",
      logo: "WEC"
    },
  ];

  return (
    <div className="p-6 bg-offwhite min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Partners</h1>
        <Button variant="emerald">
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Partner
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search partners..." 
            className="pl-9 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <Card key={partner.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-gradient-to-br from-teal to-sand flex items-center justify-center text-white font-bold">
                  {partner.logo}
                </div>
                <div>
                  <CardTitle className="text-lg">{partner.name}</CardTitle>
                  <div className="text-sm text-muted-foreground">{partner.type}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Building className="w-4 h-4 mr-2 text-muted-foreground" />
                  {partner.location}
                </div>
                <div className="flex items-center text-sm">
                  <Globe className="w-4 h-4 mr-2 text-muted-foreground" />
                  {partner.website}
                </div>
                <div className="bg-offwhite p-2 rounded-md text-center mt-2">
                  <span className="text-sm font-medium">{partner.projects}</span>
                  <span className="text-xs text-muted-foreground ml-1">Active Projects</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NGOPartnersPage;
