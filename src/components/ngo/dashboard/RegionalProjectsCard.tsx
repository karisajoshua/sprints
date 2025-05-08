
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const RegionalProjectsCard = () => {
  const navigate = useNavigate();
  
  const projects = [
    {id: 1, name: "Clean Water Initiative - East Africa", region: "East Africa", status: "On Track"},
    {id: 2, name: "Education Support Program", region: "West Africa", status: "At Risk"},
    {id: 3, name: "Healthcare Access Initiative", region: "Southern Africa", status: "On Hold"},
    {id: 4, name: "Community Development", region: "Central Africa", status: "On Track"},
  ];
  
  return (
    <Card className="lg:col-span-2 hover:scale-105 transition-transform">
      <CardHeader>
        <CardTitle>Regional Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project, i) => (
            <div 
              key={i} 
              className="bg-offwhite rounded-md p-4 cursor-pointer hover:bg-white transition-colors"
              onClick={() => navigate(`/dashboard/ngo/projects/${project.id}`)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{project.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  project.status === "On Track" ? "bg-emerald/20 text-emerald" : 
                  project.status === "At Risk" ? "bg-sand/20 text-sand" : 
                  "bg-gray-200 text-gray-500"
                }`}>
                  {project.status}
                </span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>Region: {project.region}</span>
                <span>Last Updated: {["2 days ago", "1 week ago", "3 days ago", "Yesterday"][i]}</span>
              </div>
              <Progress value={[75, 40, 25, 60][i]} className="h-1.5" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionalProjectsCard;
