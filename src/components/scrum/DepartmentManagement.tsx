
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useScrum } from "./ScrumContext";
import { 
  updateDepartment, 
  deleteDepartment, 
  getDepartmentMembers,
  ScrumDepartmentMember
} from "@/services/scrumService";
import { Users, Pencil, Trash, Calendar, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const DepartmentManagement = () => {
  const { currentDepartment, isAdmin, refreshDepartments } = useScrum();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [members, setMembers] = useState<ScrumDepartmentMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  useEffect(() => {
    if (currentDepartment) {
      setName(currentDepartment.name);
      setDescription(currentDepartment.description || "");
      loadMembers();
    }
  }, [currentDepartment]);
  
  const loadMembers = async () => {
    if (!currentDepartment) return;
    
    try {
      const departmentMembers = await getDepartmentMembers(currentDepartment.id);
      setMembers(departmentMembers);
    } catch (error) {
      console.error("Failed to load department members:", error);
    }
  };
  
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentDepartment) return;
    setLoading(true);
    
    try {
      await updateDepartment(currentDepartment.id, {
        name,
        description: description || null
      });
      
      await refreshDepartments();
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (!currentDepartment) return;
    setDeleteLoading(true);
    
    try {
      await deleteDepartment(currentDepartment.id);
      await refreshDepartments();
      setIsDeleting(false);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (!currentDepartment) return null;
  
  return (
    <>
      <Card className="mb-6">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Department Details</CardTitle>
          {isAdmin && (
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => setIsDeleting(true)}
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">{currentDepartment.name}</h3>
              <p className="text-muted-foreground text-sm">
                {currentDepartment.description || "No description available."}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="w-4 h-4 mr-2" />
                <span>{members.length} members</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Created {new Date(currentDepartment.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Team Members</h4>
              <div className="flex flex-wrap gap-2">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center bg-white rounded-full pl-1 pr-3 py-1 shadow-sm border">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={member.profile?.avatar_url || ""} alt={member.profile?.full_name || ""} />
                      <AvatarFallback>
                        {(member.profile?.full_name || member.profile?.email || "").substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">
                      {member.profile?.full_name || member.profile?.email || "Unknown"}
                    </span>
                    {member.is_admin && (
                      <span className="ml-1 text-xs bg-emerald/10 text-emerald px-1.5 py-0.5 rounded">
                        Admin
                      </span>
                    )}
                  </div>
                ))}
                
                {members.length === 0 && (
                  <div className="text-xs text-muted-foreground">No team members yet.</div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Department Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter department name"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter department description"
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="emerald" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Department</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Are you sure you want to delete <span className="font-medium">{currentDepartment.name}</span>? 
              This action cannot be undone. All associated sprints, tasks, and data will be permanently removed.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDeleting(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={deleteLoading}>
                {deleteLoading ? "Deleting..." : "Delete Department"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
