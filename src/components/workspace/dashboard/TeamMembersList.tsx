
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { WorkspaceMember } from '@/types/workspace';

type TeamMembersListProps = {
  members: WorkspaceMember[];
  workspaceId: string;
  isAdmin: boolean;
  isHR: boolean;
};

export const TeamMembersList = ({ members, workspaceId, isAdmin, isHR }: TeamMembersListProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>People working in this workspace</CardDescription>
        </div>
        {(isAdmin || isHR) && (
          <Button variant="ghost" size="sm" className="h-8" asChild>
            <Link to={`/workspace/${workspaceId}/members`}>
              Manage
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {members.slice(0, 6).map(member => (
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
          {members.length > 6 && (
            <div className="flex items-center justify-center p-4">
              <Button variant="ghost" asChild>
                <Link to={`/workspace/${workspaceId}/members`}>
                  View all {members.length} members
                </Link>
              </Button>
            </div>
          )}
          {members.length === 0 && (
            <div className="col-span-2 flex items-center justify-center p-8 text-muted-foreground">
              No team members yet
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
