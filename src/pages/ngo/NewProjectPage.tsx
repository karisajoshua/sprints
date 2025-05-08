
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NGONewProjectPage = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Would normally save the project data here
    navigate('/dashboard/ngo/projects');
  };

  return (
    <div className="p-6 bg-offwhite min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => navigate("/dashboard/ngo/projects")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">Create New Project</h1>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">Project Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter project name"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <textarea
                  id="description"
                  placeholder="Enter project description"
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <label htmlFor="region" className="text-sm font-medium">Region</label>
                  <select
                    id="region"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    <option value="">Select a region</option>
                    <option value="East Africa">East Africa</option>
                    <option value="West Africa">West Africa</option>
                    <option value="Southern Africa">Southern Africa</option>
                    <option value="Central Africa">Central Africa</option>
                  </select>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="status" className="text-sm font-medium">Status</label>
                  <select
                    id="status"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    <option value="">Select a status</option>
                    <option value="Planning">Planning</option>
                    <option value="On Track">On Track</option>
                    <option value="At Risk">At Risk</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <label htmlFor="startDate" className="text-sm font-medium">Start Date</label>
                  <input
                    id="startDate"
                    type="date"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="endDate" className="text-sm font-medium">End Date</label>
                  <input
                    id="endDate"
                    type="date"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <label htmlFor="budget" className="text-sm font-medium">Budget (USD)</label>
                  <input
                    id="budget"
                    type="number"
                    placeholder="0.00"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="beneficiaries" className="text-sm font-medium">Expected Beneficiaries</label>
                  <input
                    id="beneficiaries"
                    type="number"
                    placeholder="0"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => navigate('/dashboard/ngo/projects')}>
              Cancel
            </Button>
            <Button variant="emerald" type="submit">
              Create Project
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default NGONewProjectPage;
