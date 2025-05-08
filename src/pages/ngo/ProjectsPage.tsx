
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { PlusCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NGOProjectsPage = () => {
  const navigate = useNavigate();
  
  const projects = [
    { id: 1, name: "Clean Water Initiative - East Africa", region: "East Africa", status: "On Track", beneficiaries: "12,500", budget: "$235,000", completion: 75 },
    { id: 2, name: "Education Support Program", region: "West Africa", status: "At Risk", beneficiaries: "8,300", budget: "$185,000", completion: 40 },
    { id: 3, name: "Healthcare Access Initiative", region: "Southern Africa", status: "On Hold", beneficiaries: "15,200", budget: "$320,000", completion: 25 },
    { id: 4, name: "Community Development", region: "Central Africa", status: "On Track", beneficiaries: "9,700", budget: "$150,000", completion: 60 },
    { id: 5, name: "Sustainable Agriculture Program", region: "East Africa", status: "On Track", beneficiaries: "7,800", budget: "$175,000", completion: 85 },
    { id: 6, name: "Women's Empowerment Project", region: "West Africa", status: "On Track", beneficiaries: "5,600", budget: "$120,000", completion: 70 },
  ];

  return (
    <div className="p-6 bg-offwhite min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Button 
          variant="emerald" 
          onClick={() => navigate("/dashboard/ngo/projects/new")}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="pl-9 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>All Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Beneficiaries</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Completion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow 
                  key={project.id}
                  className="cursor-pointer hover:bg-muted/20"
                  onClick={() => navigate(`/dashboard/ngo/projects/${project.id}`)}
                >
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{project.region}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.status === "On Track" ? "bg-emerald/20 text-emerald" : 
                      project.status === "At Risk" ? "bg-sand/20 text-sand" : 
                      "bg-gray-200 text-gray-500"
                    }`}>
                      {project.status}
                    </span>
                  </TableCell>
                  <TableCell>{project.beneficiaries}</TableCell>
                  <TableCell>{project.budget}</TableCell>
                  <TableCell>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-emerald h-full rounded-full" 
                        style={{ width: `${project.completion}%` }}
                      />
                    </div>
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

export default NGOProjectsPage;
