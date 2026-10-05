
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useWorkspace } from "@/components/workspace/WorkspaceContext";
import { Link, useNavigate } from "react-router-dom";
import { WorkspaceSelector } from "@/components/workspace/WorkspaceSelector";
import { Plus, ArrowRight, Users, Calendar, Briefcase } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

export const AuthenticatedHome = () => {
  const { user, signOut } = useAuth();
  const { currentWorkspace, workspaces, loading } = useWorkspace();
  const navigate = useNavigate();

  // Store the time the user was last on the home page
  useEffect(() => {
    const lastVisit = localStorage.getItem("lastHomeVisit");
    const now = new Date().toISOString();
    localStorage.setItem("lastHomeVisit", now);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleCreateWorkspace = () => {
    navigate("/workspace/create");
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Get the initials for the user's email (for avatar fallback)
  const getEmailInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-emerald font-poppins font-bold text-xl md:text-2xl">
                Sprints
              </span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {workspaces.length > 0 && <WorkspaceSelector />}
            
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="" alt={user?.email || ""} />
                <AvatarFallback>{user?.email ? getEmailInitials(user.email) : "U"}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{user?.email}</p>
              </div>
            </div>
            
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome{user ? `, ${user.email.split('@')[0]}` : ""}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your workspaces</p>
        </div>

        {workspaces.length === 0 ? (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-2xl font-bold mb-2">Create your first workspace</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Create a workspace to invite your team members and start collaborating on projects.
                </p>
                <Button onClick={handleCreateWorkspace}>
                  <Plus className="mr-2 h-4 w-4" /> Create Workspace
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Your Workspaces</CardTitle>
                  <CardDescription>Manage and access your workspaces</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {workspaces.map(workspace => (
                      <div 
                        key={workspace.id} 
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors cursor-pointer"
                        onClick={() => navigate(`/workspace/${workspace.id}`)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={workspace.logo_url || ''} alt={workspace.name} />
                            <AvatarFallback>
                              {workspace.name.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{workspace.name}</h3>
                            {workspace.description && (
                              <p className="text-sm text-muted-foreground line-clamp-1">{workspace.description}</p>
                            )}
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full" onClick={handleCreateWorkspace}>
                      <Plus className="mr-2 h-4 w-4" /> Create New Workspace
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                  <CardDescription>Shortcuts to important areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/dashboard/scrum">
                        <Briefcase className="mr-2 h-4 w-4" /> Scrum Dashboard
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/dashboard/events">
                        <Calendar className="mr-2 h-4 w-4" /> Event Management
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/join">
                        <Users className="mr-2 h-4 w-4" /> Join Workspace
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {currentWorkspace && (
              <Card>
                <CardHeader>
                  <CardTitle>Continue Working</CardTitle>
                  <CardDescription>
                    Pick up where you left off in {currentWorkspace.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link to={`/workspace/${currentWorkspace.id}`}>
                      Go to Workspace Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </main>
    </div>
  );
};
