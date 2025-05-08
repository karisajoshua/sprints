
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, Clock, Edit, Globe, Users, Map, ArrowLeft } from "lucide-react";

const NGOProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // This would typically come from an API call based on the ID
  const project = {
    id: parseInt(id || "1"),
    name: "Clean Water Initiative - East Africa",
    region: "East Africa",
    status: "On Track",
    description: "Providing clean water access to rural communities through sustainable well construction and water purification systems. This project aims to reduce waterborne diseases and improve quality of life.",
    startDate: "2023-05-15",
    endDate: "2024-11-30",
    budget: "$235,000",
    spent: "$142,500",
    beneficiaries: "12,500",
    completion: 75,
    team: ["Ngozi Okonjo", "Makena Wanjiku", "Daniel Muthoni"],
    updates: [
      { date: "2023-10-15", update: "Completed well construction in 5 villages" },
      { date: "2024-01-20", update: "Water quality testing completed in all sites" },
      { date: "2024-03-05", update: "Community training sessions conducted" },
    ],
    goals: [
      { name: "Well Construction", target: 15, achieved: 12 },
      { name: "Water Systems", target: 8, achieved: 6 },
      { name: "People Trained", target: 500, achieved: 425 },
    ]
  };

  return (
    <div className="p-6 bg-offwhite min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => navigate("/dashboard/ngo/projects")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">{project.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Description</div>
                <p>{project.description}</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-offwhite p-3 rounded-md">
                  <div className="text-xs text-muted-foreground">Status</div>
                  <div className="text-base font-medium mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.status === "On Track" ? "bg-emerald/20 text-emerald" : 
                      project.status === "At Risk" ? "bg-sand/20 text-sand" : 
                      "bg-gray-200 text-gray-500"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className="bg-offwhite p-3 rounded-md">
                  <div className="text-xs text-muted-foreground">Region</div>
                  <div className="text-base font-medium flex items-center mt-1">
                    <Map className="w-3 h-3 mr-1" />
                    {project.region}
                  </div>
                </div>
                <div className="bg-offwhite p-3 rounded-md">
                  <div className="text-xs text-muted-foreground">Budget</div>
                  <div className="text-base font-medium mt-1">{project.budget}</div>
                </div>
                <div className="bg-offwhite p-3 rounded-md">
                  <div className="text-xs text-muted-foreground">Beneficiaries</div>
                  <div className="text-base font-medium flex items-center mt-1">
                    <Users className="w-3 h-3 mr-1" />
                    {project.beneficiaries}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <div className="text-sm text-muted-foreground">Project Completion</div>
                  <div className="text-sm font-medium">{project.completion}%</div>
                </div>
                <Progress value={project.completion} className="h-2" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Timeline</div>
                  <div className="bg-offwhite p-3 rounded-md space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-emerald" />
                        <span className="text-sm">Start Date</span>
                      </div>
                      <div className="text-sm font-medium">{project.startDate}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-sand" />
                        <span className="text-sm">End Date</span>
                      </div>
                      <div className="text-sm font-medium">{project.endDate}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Budget Utilization</div>
                  <div className="bg-offwhite p-3 rounded-md space-y-2">
                    <div className="flex justify-between mb-1">
                      <div className="text-sm">Spent</div>
                      <div className="text-sm font-medium">{project.spent}</div>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.team.map((member, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald to-teal flex items-center justify-center text-white font-medium">
                    {member.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium">{member}</div>
                    <div className="text-xs text-muted-foreground">
                      {index === 0 ? "Project Lead" : "Team Member"}
                    </div>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" size="sm" className="w-full mt-4">
                <Users className="w-4 h-4 mr-2" />
                Manage Team
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Project Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.goals.map((goal, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <div className="text-sm font-medium">{goal.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {goal.achieved} of {goal.target} ({Math.round((goal.achieved/goal.target) * 100)}%)
                    </div>
                  </div>
                  <Progress value={(goal.achieved/goal.target) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.updates.map((update, index) => (
                <div key={index} className="border-l-2 border-emerald pl-4 py-1">
                  <div className="text-sm font-medium">{update.update}</div>
                  <div className="text-xs text-muted-foreground flex items-center mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {update.date}
                  </div>
                </div>
              ))}
              
              <Button variant="outline" size="sm" className="w-full mt-4">
                <Edit className="w-4 h-4 mr-2" />
                Add Update
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NGOProjectDetailPage;
