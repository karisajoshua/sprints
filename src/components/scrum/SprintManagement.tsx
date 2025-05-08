
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useScrum } from "./ScrumContext";
import {
  ScrumSprint,
  getSprints,
  createSprint,
  updateSprint,
  deleteSprint
} from "@/services/scrumService";
import {
  Calendar, Plus, Play, CheckCircle, Clock, 
  CalendarDays, Pencil, Trash, AlertCircle, Ban, BarChart3
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TaskBoard } from "./TaskBoard";
import { Progress } from "@/components/ui/progress";

export const SprintManagement = () => {
  const { currentDepartment, isAdmin } = useScrum();
  const [sprints, setSprints] = useState<ScrumSprint[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New sprint form
  const [isAddingSprint, setIsAddingSprint] = useState(false);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  
  // Edit sprint form
  const [isEditingSprint, setIsEditingSprint] = useState(false);
  const [currentSprint, setCurrentSprint] = useState<ScrumSprint | null>(null);
  
  // Active sprint view
  const [viewingSprintId, setViewingSprintId] = useState<string | null>(null);
  
  useEffect(() => {
    if (currentDepartment) {
      loadSprints();
    }
  }, [currentDepartment]);
  
  const loadSprints = async () => {
    if (!currentDepartment) return;
    
    setLoading(true);
    try {
      const fetchedSprints = await getSprints(currentDepartment.id);
      setSprints(fetchedSprints);
      
      // Auto-select active sprint if any
      const activeSprint = fetchedSprints.find(s => s.status === 'Active');
      if (activeSprint) {
        setViewingSprintId(activeSprint.id);
      }
    } catch (error) {
      console.error("Failed to load sprints:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCreateSprint = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentDepartment) return;
    setSubmitting(true);
    
    try {
      await createSprint({
        name,
        goal: goal || null,
        department_id: currentDepartment.id,
        start_date: startDate || null,
        end_date: endDate || null
      });
      
      resetForm();
      setIsAddingSprint(false);
      loadSprints();
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleUpdateSprint = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentSprint) return;
    setSubmitting(true);
    
    try {
      await updateSprint(currentSprint.id, {
        name,
        goal: goal || null,
        start_date: startDate || null,
        end_date: endDate || null
      });
      
      setIsEditingSprint(false);
      setCurrentSprint(null);
      loadSprints();
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleDeleteSprint = async (sprintId: string) => {
    if (!confirm("Are you sure you want to delete this sprint? All tasks will be moved to the backlog.")) {
      return;
    }
    
    try {
      await deleteSprint(sprintId);
      
      if (viewingSprintId === sprintId) {
        setViewingSprintId(null);
      }
      
      loadSprints();
    } catch (error) {
      console.error("Failed to delete sprint:", error);
    }
  };
  
  const handleStartSprint = async (sprintId: string) => {
    try {
      await updateSprint(sprintId, { status: 'Active' });
      loadSprints();
    } catch (error) {
      console.error("Failed to start sprint:", error);
    }
  };
  
  const handleCompleteSprint = async (sprintId: string) => {
    try {
      await updateSprint(sprintId, { status: 'Completed' });
      loadSprints();
    } catch (error) {
      console.error("Failed to complete sprint:", error);
    }
  };
  
  const openEditSprint = (sprint: ScrumSprint) => {
    setCurrentSprint(sprint);
    setName(sprint.name);
    setGoal(sprint.goal || "");
    setStartDate(sprint.start_date || "");
    setEndDate(sprint.end_date || "");
    setIsEditingSprint(true);
  };
  
  const resetForm = () => {
    setName("");
    setGoal("");
    setStartDate("");
    setEndDate("");
  };
  
  const getSprintStatusBadge = (status: string) => {
    switch (status) {
      case 'Planning':
        return <Badge className="bg-gray-200 text-gray-800">Planning</Badge>;
      case 'Active':
        return <Badge className="bg-emerald text-white">Active</Badge>;
      case 'Completed':
        return <Badge className="bg-teal text-white">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getDaysLeft = (endDate: string | null) => {
    if (!endDate) return null;
    
    const end = new Date(endDate);
    const now = new Date();
    
    // Check for invalid date
    if (isNaN(end.getTime())) return null;
    
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  const activeSprint = sprints.find(s => s.status === 'Active');
  const planningSprints = sprints.filter(s => s.status === 'Planning');
  const completedSprints = sprints.filter(s => s.status === 'Completed');
  
  const viewingSprint = sprints.find(s => s.id === viewingSprintId);
  
  return (
    <>
      <div className="space-y-6">
        {/* Sprints Overview */}
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Sprints</CardTitle>
            {isAdmin && (
              <Button variant="emerald" size="sm" onClick={() => setIsAddingSprint(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Sprint
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Active Sprint */}
                {activeSprint ? (
                  <div className="bg-emerald/10 border border-emerald/20 rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Play className="w-4 h-4 text-emerald" />
                          <h3 className="font-medium">{activeSprint.name}</h3>
                          <Badge className="bg-emerald text-white">Active</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{activeSprint.goal || "No goal set"}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-3 md:mt-0">
                        {activeSprint.end_date && (
                          <div className="text-sm flex items-center gap-1 bg-accent px-2 py-1 rounded">
                            <Clock className="w-3 h-3" />
                            <span>
                              {getDaysLeft(activeSprint.end_date)} day{getDaysLeft(activeSprint.end_date) !== 1 ? "s" : ""} left
                            </span>
                          </div>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="whitespace-nowrap"
                          onClick={() => setViewingSprintId(activeSprint.id)}
                        >
                          View Board
                        </Button>
                        {isAdmin && (
                          <Button 
                            variant="teal" 
                            size="sm"
                            onClick={() => handleCompleteSprint(activeSprint.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-muted-foreground">
                      {activeSprint.start_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Started: {new Date(activeSprint.start_date).toLocaleDateString()}</span>
                        </div>
                      )}
                      {activeSprint.end_date && (
                        <div className="flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" />
                          <span>Ends: {new Date(activeSprint.end_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-accent/50 rounded-lg p-6 text-center">
                    <BarChart3 className="w-10 h-10 mx-auto text-muted-foreground opacity-50 mb-3" />
                    <h3 className="text-lg font-medium mb-1">No Active Sprint</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Start a sprint to begin tracking progress.
                    </p>
                    {planningSprints.length > 0 && isAdmin && (
                      <Button 
                        variant="emerald" 
                        onClick={() => handleStartSprint(planningSprints[0].id)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Next Sprint
                      </Button>
                    )}
                  </div>
                )}
                
                {/* Planned Sprints */}
                {planningSprints.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Upcoming Sprints</h3>
                    {planningSprints.map(sprint => (
                      <div key={sprint.id} className="bg-white rounded-md p-4 border">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{sprint.name}</h4>
                              {getSprintStatusBadge(sprint.status)}
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              {sprint.goal || "No goal set"}
                            </p>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                              {sprint.start_date && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(sprint.start_date).toLocaleDateString()} - 
                                  {sprint.end_date && (
                                    <>{new Date(sprint.end_date).toLocaleDateString()}</>
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-3 md:mt-0">
                            {isAdmin && !activeSprint && (
                              <Button 
                                variant="emerald" 
                                size="sm"
                                onClick={() => handleStartSprint(sprint.id)}
                              >
                                <Play className="w-4 h-4 mr-2" />
                                Start
                              </Button>
                            )}
                            {isAdmin && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => openEditSprint(sprint)}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                            )}
                            {isAdmin && (
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleDeleteSprint(sprint.id)}
                              >
                                <Trash className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Completed Sprints */}
                {completedSprints.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Completed Sprints</h3>
                    <div className="space-y-2">
                      {completedSprints.slice(0, 3).map(sprint => (
                        <div key={sprint.id} className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{sprint.name}</span>
                              {getSprintStatusBadge(sprint.status)}
                            </div>
                            {sprint.end_date && (
                              <div className="text-xs text-muted-foreground">
                                Completed on {new Date(sprint.end_date).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                          <Button variant="outline" size="sm">View Report</Button>
                        </div>
                      ))}
                      
                      {completedSprints.length > 3 && (
                        <Button variant="ghost" size="sm" className="w-full">
                          View All {completedSprints.length} Completed Sprints
                        </Button>
                      )}
                    </div>
                  </div>
                )}
                
                {sprints.length === 0 && !loading && (
                  <div className="text-center py-6">
                    <Calendar className="w-12 h-12 mx-auto text-muted-foreground opacity-40 mb-3" />
                    <h3 className="text-lg font-medium mb-1">No Sprints Yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create your first sprint to start planning.
                    </p>
                    {isAdmin && (
                      <Button variant="emerald" onClick={() => setIsAddingSprint(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create First Sprint
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Sprint Board */}
        {viewingSprint && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-xl font-medium flex items-center gap-2">
                  {viewingSprint.name}
                  {getSprintStatusBadge(viewingSprint.status)}
                </h2>
                <p className="text-sm text-muted-foreground">{viewingSprint.goal || "No sprint goal set"}</p>
              </div>
              <div className="mt-2 md:mt-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setViewingSprintId(null)}
                >
                  Back to All Sprints
                </Button>
              </div>
            </div>
            <TaskBoard sprintId={viewingSprint.id} />
          </div>
        )}
        
        {!viewingSprint && sprints.length > 0 && (
          <TaskBoard />
        )}
      </div>
      
      {/* Add Sprint Dialog */}
      <Dialog open={isAddingSprint} onOpenChange={setIsAddingSprint}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Sprint</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateSprint} className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Sprint Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter sprint name"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sprint Goal</label>
              <Textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="What do you want to achieve in this sprint?"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsAddingSprint(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="emerald" 
                disabled={submitting || !name}
              >
                {submitting ? "Creating..." : "Create Sprint"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Sprint Dialog */}
      <Dialog open={isEditingSprint} onOpenChange={setIsEditingSprint}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Sprint</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateSprint} className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Sprint Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter sprint name"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sprint Goal</label>
              <Textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="What do you want to achieve in this sprint?"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsEditingSprint(false);
                  setCurrentSprint(null);
                }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="emerald" 
                disabled={submitting || !name}
              >
                {submitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
