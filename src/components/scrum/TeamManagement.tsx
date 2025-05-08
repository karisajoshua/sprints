
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useScrum } from "./ScrumContext";
import { 
  ScrumDepartmentMember,
  addDepartmentMember, 
  updateDepartmentMember, 
  removeDepartmentMember 
} from "@/services/scrumService";
import { 
  Users, PlusCircle, Trash2, User, UserPlus, Mail, Shield, ShieldCheck, ShieldX
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type Profile = {
  id: string;
  full_name: string | null;
  email: string;
  avatar_url: string | null;
};

export const TeamManagement = () => {
  const { currentDepartment, departmentMembers, isAdmin, refreshMembers } = useScrum();
  const { user } = useAuth();
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Member");
  const [isAdmin_, setIsAdmin_] = useState(false);
  const [loading, setLoading] = useState(false);
  const [availableProfiles, setAvailableProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<string>("");
  const [isEditingMember, setIsEditingMember] = useState(false);
  const [currentEditMember, setCurrentEditMember] = useState<ScrumDepartmentMember | null>(null);

  useEffect(() => {
    if (isAddingMember) {
      fetchAvailableProfiles();
    }
  }, [isAddingMember, departmentMembers]);

  const fetchAvailableProfiles = async () => {
    if (!currentDepartment) return;

    try {
      // Get all profiles
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*');
      
      if (error) throw error;

      // Filter out profiles that are already members
      const memberProfileIds = departmentMembers.map(member => member.profile_id);
      const available = profiles.filter(profile => !memberProfileIds.includes(profile.id));
      
      setAvailableProfiles(available);
    } catch (error) {
      console.error("Failed to fetch available profiles:", error);
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentDepartment || !selectedProfile) return;
    setLoading(true);
    
    try {
      await addDepartmentMember(
        currentDepartment.id,
        selectedProfile,
        role,
        isAdmin_
      );
      
      await refreshMembers();
      setIsAddingMember(false);
      resetForm();
    } finally {
      setLoading(false);
    }
  };

  const handleEditMember = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentEditMember) return;
    setLoading(true);
    
    try {
      await updateDepartmentMember(currentEditMember.id, {
        role,
        is_admin: isAdmin_
      });
      
      await refreshMembers();
      setIsEditingMember(false);
      setCurrentEditMember(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMember = async (member: ScrumDepartmentMember) => {
    if (!confirm(`Are you sure you want to remove ${member.profile?.full_name || member.profile?.email || 'this member'}?`)) {
      return;
    }

    try {
      await removeDepartmentMember(member.id);
      await refreshMembers();
    } catch (error) {
      console.error("Failed to remove member:", error);
    }
  };

  const openEditMember = (member: ScrumDepartmentMember) => {
    setCurrentEditMember(member);
    setRole(member.role);
    setIsAdmin_(member.is_admin);
    setIsEditingMember(true);
  };
  
  const resetForm = () => {
    setEmail("");
    setRole("Member");
    setIsAdmin_(false);
    setSelectedProfile("");
  };

  if (!currentDepartment) return null;
  
  return (
    <>
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Team Members</CardTitle>
          {isAdmin && (
            <Button 
              variant="emerald" 
              size="sm" 
              onClick={() => setIsAddingMember(true)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {departmentMembers.length > 0 ? (
            <div className="space-y-4">
              {departmentMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src={member.profile?.avatar_url || ""} alt={member.profile?.full_name || ""} />
                      <AvatarFallback>
                        {(member.profile?.full_name || member.profile?.email || "").substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {member.profile?.full_name || "Unnamed User"}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        {member.profile?.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                      <div className="flex items-center">
                        <span className="mr-2 text-sm">{member.role}</span>
                        {member.is_admin && <ShieldCheck className="w-4 h-4 text-emerald" />}
                      </div>
                    </div>
                    {isAdmin && member.profile_id !== user?.id && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => openEditMember(member)}>
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleRemoveMember(member)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6">
              <Users className="w-12 h-12 text-muted-foreground opacity-40 mb-4" />
              <h3 className="text-lg font-medium mb-1">No team members yet</h3>
              <p className="text-sm text-center text-muted-foreground mb-4">
                Add team members to collaborate on this department's projects.
              </p>
              {isAdmin && (
                <Button variant="emerald" onClick={() => setIsAddingMember(true)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Team Member
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Add Member Dialog */}
      <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddMember} className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">User</label>
              <Select 
                value={selectedProfile} 
                onValueChange={setSelectedProfile}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  {availableProfiles.length > 0 ? (
                    availableProfiles.map((profile) => (
                      <SelectItem key={profile.id} value={profile.id}>
                        {profile.full_name || profile.email}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>
                      No available users
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {availableProfiles.length === 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  All users are already members of this department.
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Developer, Designer, Product Owner"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isAdmin"
                checked={isAdmin_}
                onChange={(e) => setIsAdmin_(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="isAdmin" className="text-sm font-medium">
                Make admin (can manage department and members)
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsAddingMember(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="emerald" 
                disabled={loading || !selectedProfile}
              >
                {loading ? "Adding..." : "Add Member"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Member Dialog */}
      <Dialog open={isEditingMember} onOpenChange={setIsEditingMember}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditMember} className="space-y-4 pt-4">
            <div className="flex items-center mb-4">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={currentEditMember?.profile?.avatar_url || ""} />
                <AvatarFallback>
                  {(currentEditMember?.profile?.full_name || currentEditMember?.profile?.email || "").substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">
                  {currentEditMember?.profile?.full_name || "Unnamed User"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {currentEditMember?.profile?.email}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Developer, Designer, Product Owner"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isAdminEdit"
                checked={isAdmin_}
                onChange={(e) => setIsAdmin_(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="isAdminEdit" className="text-sm font-medium">
                Make admin (can manage department and members)
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsEditingMember(false);
                  setCurrentEditMember(null);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="emerald" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
