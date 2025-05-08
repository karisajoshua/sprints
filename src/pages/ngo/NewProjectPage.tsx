
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOrganization } from "@/components/ngo/OrganizationContext";
import { createProject, getRegions } from "@/services/ngoService";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Region } from "@/types/ngo";

const NGONewProjectPage = () => {
  const navigate = useNavigate();
  const { currentOrganization } = useOrganization();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [regionId, setRegionId] = useState("");
  const [status, setStatus] = useState("Planning");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [beneficiaries, setBeneficiaries] = useState("");

  // Fetch regions for dropdown
  const { data: regions = [] } = useQuery<Region[]>({
    queryKey: ['regions', currentOrganization?.id],
    queryFn: () => currentOrganization ? getRegions(currentOrganization.id) : Promise.resolve([]),
    enabled: !!currentOrganization,
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrganization) {
      toast({
        title: "Error",
        description: "No organization selected",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const newProject = {
        organization_id: currentOrganization.id,
        name,
        description,
        region_id: regionId || null,
        status: status as any,
        start_date: startDate || null,
        end_date: endDate || null,
        budget: budget ? parseFloat(budget) : null,
        beneficiaries_count: beneficiaries ? parseInt(beneficiaries, 10) : 0,
        completion_percentage: 0
      };
      
      await createProject(newProject);
      
      toast({
        title: "Project created",
        description: "Your new project has been created successfully.",
      });
      
      navigate('/dashboard/ngo/projects');
    } catch (error) {
      console.error("Failed to create project:", error);
    } finally {
      setIsSubmitting(false);
    }
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter project name"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                    value={regionId}
                    onChange={(e) => setRegionId(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select a region</option>
                    {regions.map(region => (
                      <option key={region.id} value={region.id}>
                        {region.name}{region.country ? ` (${region.country})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="status" className="text-sm font-medium">Status</label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
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
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="endDate" className="text-sm font-medium">End Date</label>
                  <input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <label htmlFor="budget" className="text-sm font-medium">Budget (USD)</label>
                  <input
                    id="budget"
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="beneficiaries" className="text-sm font-medium">Expected Beneficiaries</label>
                  <input
                    id="beneficiaries"
                    type="number"
                    value={beneficiaries}
                    onChange={(e) => setBeneficiaries(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => navigate('/dashboard/ngo/projects')}>
              Cancel
            </Button>
            <Button variant="emerald" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default NGONewProjectPage;
