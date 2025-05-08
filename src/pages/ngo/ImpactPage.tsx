
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Heart } from "lucide-react";

const NGOImpactPage = () => {
  return (
    <div className="p-6 bg-offwhite min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Impact Metrics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardDescription>Total Reach</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              24.5k <Users className="w-5 h-5 text-emerald" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-emerald flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              12% increase from last quarter
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardDescription>Communities Served</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              78 <Heart className="w-5 h-5 text-sand" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-emerald flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              8% increase from last quarter
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardDescription>Projects Completed</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              24 <BarChart3 className="w-5 h-5 text-teal" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-emerald flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              15% increase from last quarter
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardDescription>Sustainability Score</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              8.7 <BarChart3 className="w-5 h-5 text-emerald" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-emerald flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              0.5 increase from last quarter
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Impact by Region</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <BarChart3 size={64} className="mb-4 mx-auto text-emerald opacity-50" />
              <p className="text-muted-foreground">Regional impact chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Impact Timeline</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <BarChart3 size={64} className="mb-4 mx-auto text-teal opacity-50" />
              <p className="text-muted-foreground">Timeline chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Impact Scores</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <div className="text-center">
            <BarChart3 size={80} className="mb-4 mx-auto text-emerald opacity-50" />
            <p className="text-muted-foreground">Detailed project impact chart will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NGOImpactPage;
