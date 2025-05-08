
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartHandshake, Search, PlusCircle, Users } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const NGOStakeholdersPage = () => {
  const stakeholders = [
    { 
      id: 1, 
      name: "Ministry of Education - Ghana", 
      type: "Government", 
      projects: ["Education Support Program", "Women's Empowerment Project"],
      contactPerson: "Dr. Kofi Mensah",
      engagement: "High"
    },
    { 
      id: 2, 
      name: "Nairobi Community Leaders Council", 
      type: "Local Authority", 
      projects: ["Clean Water Initiative"],
      contactPerson: "James Odhiambo",
      engagement: "Medium"
    },
    { 
      id: 3, 
      name: "Southern Africa Health Department", 
      type: "Government", 
      projects: ["Healthcare Access Initiative"],
      contactPerson: "Dr. Nomsa Dlamini", 
      engagement: "High"
    },
    { 
      id: 4, 
      name: "Central Africa Agricultural Cooperative", 
      type: "Community Org", 
      projects: ["Community Development", "Sustainable Agriculture Program"],
      contactPerson: "Jean-Pierre Mutombo",
      engagement: "Medium"
    },
    { 
      id: 5, 
      name: "East African Teachers Association", 
      type: "Professional Body", 
      projects: ["Education Support Program"],
      contactPerson: "Amina Hassan",
      engagement: "Low"
    },
  ];

  return (
    <div className="p-6 bg-offwhite min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Stakeholders</h1>
        <Button variant="emerald">
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Stakeholder
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search stakeholders..." 
            className="pl-9 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <HeartHandshake className="w-5 h-5 mr-2 text-emerald" />
              Stakeholder Engagement Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-offwhite rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-muted-foreground">Total Stakeholders</div>
              </div>
              <div className="bg-offwhite rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">High Engagement</div>
              </div>
              <div className="bg-offwhite rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">2</div>
                <div className="text-sm text-muted-foreground">Need Attention</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Stakeholder Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Engagement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stakeholders.map((stakeholder) => (
                <TableRow key={stakeholder.id} className="cursor-pointer hover:bg-muted/20">
                  <TableCell className="font-medium">{stakeholder.name}</TableCell>
                  <TableCell>{stakeholder.type}</TableCell>
                  <TableCell>{stakeholder.contactPerson}</TableCell>
                  <TableCell>{stakeholder.projects.join(', ')}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      stakeholder.engagement === "High" ? "bg-emerald/20 text-emerald" : 
                      stakeholder.engagement === "Medium" ? "bg-sand/20 text-sand" : 
                      "bg-gray-200 text-gray-500"
                    }`}>
                      {stakeholder.engagement}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default NGOStakeholdersPage;
