
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Search, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NGOTeamsPage = () => {
  const teamMembers = [
    { id: 1, name: "Ngozi Okonjo", role: "Regional Coordinator", region: "East Africa", email: "ngozi@onemapngo.org", phone: "+254 712 345 678" },
    { id: 2, name: "Kwame Darko", role: "Regional Coordinator", region: "West Africa", email: "kwame@onemapngo.org", phone: "+233 55 123 4567" },
    { id: 3, name: "Thabo Mbeki", role: "Regional Coordinator", region: "Southern Africa", email: "thabo@onemapngo.org", phone: "+27 82 456 7890" },
    { id: 4, name: "Marie Diop", role: "Regional Coordinator", region: "Central Africa", email: "marie@onemapngo.org", phone: "+243 89 567 1234" },
    { id: 5, name: "Amara Kone", role: "Project Manager", region: "West Africa", email: "amara@onemapngo.org", phone: "+225 07 234 5678" },
    { id: 6, name: "Tendai Moyo", role: "Project Manager", region: "Southern Africa", email: "tendai@onemapngo.org", phone: "+263 77 890 1234" },
    { id: 7, name: "Ibrahim Keita", role: "Field Coordinator", region: "West Africa", email: "ibrahim@onemapngo.org", phone: "+221 76 543 2109" },
    { id: 8, name: "Makena Wanjiku", role: "Field Coordinator", region: "East Africa", email: "makena@onemapngo.org", phone: "+255 75 678 9012" },
  ];

  return (
    <div className="p-6 bg-offwhite min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Teams</h1>
        <Button variant="emerald">
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search team members..." 
            className="pl-9 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald to-teal flex items-center justify-center text-white font-medium text-lg">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <div className="text-sm text-muted-foreground">{member.role}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-20 text-xs text-muted-foreground">Region:</div>
                  <div className="text-sm">{member.region}</div>
                </div>
                <div className="flex items-center">
                  <div className="w-20 text-xs text-muted-foreground">Email:</div>
                  <div className="text-sm truncate">{member.email}</div>
                </div>
                <div className="flex items-center">
                  <div className="w-20 text-xs text-muted-foreground">Phone:</div>
                  <div className="text-sm">{member.phone}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NGOTeamsPage;
