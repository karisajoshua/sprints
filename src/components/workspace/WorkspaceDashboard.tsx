
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useWorkspace } from './WorkspaceContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Calendar, FileText, MessageSquare, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WorkspaceDashboard = () => {
  const { currentWorkspace, workspaceMembers, isAdmin, isHR } = useWorkspace();

  if (!currentWorkspace) {
    return <div>No workspace selected</div>;
  }

  // Get the first letters of the workspace name for the avatar fallback
  const initials = currentWorkspace.name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  // Get admin and HR counts
  const adminCount = workspaceMembers.filter(member => member.is_admin).length;
  const hrCount = workspaceMembers.filter(member => member.is_hr).length;

  return (
    <div className="space-y-6">
      {/* Workspace Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={currentWorkspace.logo_url || ''} alt={currentWorkspace.name} />
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{currentWorkspace.name}</h1>
            {currentWorkspace.description && (
              <p className="text-muted-foreground">{currentWorkspace.description}</p>
            )}
          </div>
        </div>
        {(isAdmin || isHR) && (
          <Button variant="lavender" asChild>
            <Link to={`/workspace/${currentWorkspace.id}/invite`}>
              <Users className="mr-2 h-4 w-4" />
              Invite Members
            </Link>
          </Button>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{workspaceMembers.length}</div>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex gap-2 mt-2">
              <Badge variant="subtle">
                {adminCount} Admin{adminCount !== 1 ? 's' : ''}
              </Badge>
              <Badge variant="subtle">
                {hrCount} HR{hrCount !== 1 ? 's' : ''}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Placeholder cards for future features */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">0</div>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">No upcoming events</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Task Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">0%</div>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">No active tasks</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Members */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>People working in this workspace</CardDescription>
          </div>
          {(isAdmin || isHR) && (
            <Button variant="ghost" size="sm" className="h-8" asChild>
              <Link to={`/workspace/${currentWorkspace.id}/members`}>
                Manage
              </Link>
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workspaceMembers.slice(0, 6).map(member => (
              <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg bg-accent/5">
                <Avatar>
                  <AvatarImage src={member.profile?.avatar_url || ''} alt={member.profile?.full_name || ''} />
                  <AvatarFallback>
                    {member.profile?.full_name
                      ? member.profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
                      : '??'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-grow overflow-hidden">
                  <p className="font-medium truncate">{member.profile?.full_name || 'Unknown User'}</p>
                  <p className="text-sm text-muted-foreground truncate">{member.profile?.email}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {member.is_admin && <Badge variant="purple" className="text-xs">Admin</Badge>}
                  {member.is_hr && <Badge variant="magenta" className="text-xs">HR</Badge>}
                </div>
              </div>
            ))}
            {workspaceMembers.length > 6 && (
              <div className="flex items-center justify-center p-4">
                <Button variant="ghost" asChild>
                  <Link to={`/workspace/${currentWorkspace.id}/members`}>
                    View all {workspaceMembers.length} members
                  </Link>
                </Button>
              </div>
            )}
            {workspaceMembers.length === 0 && (
              <div className="col-span-2 flex items-center justify-center p-8 text-muted-foreground">
                No team members yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:bg-accent/5 transition-colors cursor-pointer">
          <Link to="/dashboard/scrum" className="block p-4">
            <div className="flex items-center gap-3">
              <div className="bg-lavender/10 p-2 rounded-full">
                <FileText className="h-6 w-6 text-lavender" />
              </div>
              <div>
                <h3 className="font-medium">Scrum Board</h3>
                <p className="text-sm text-muted-foreground">Manage tasks and sprints</p>
              </div>
            </div>
          </Link>
        </Card>
        
        <Card className="hover:bg-accent/5 transition-colors cursor-pointer">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-magenta/10 p-2 rounded-full">
                <Calendar className="h-6 w-6 text-magenta" />
              </div>
              <div>
                <h3 className="font-medium">Event Calendar</h3>
                <p className="text-sm text-muted-foreground">View upcoming events</p>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="hover:bg-accent/5 transition-colors cursor-pointer">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple/10 p-2 rounded-full">
                <MessageSquare className="h-6 w-6 text-purple" />
              </div>
              <div>
                <h3 className="font-medium">Team Chat</h3>
                <p className="text-sm text-muted-foreground">Communicate with your team</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
