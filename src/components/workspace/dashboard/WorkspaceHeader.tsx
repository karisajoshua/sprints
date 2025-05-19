
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users } from 'lucide-react';
import { Workspace } from '@/types/workspace';

type WorkspaceHeaderProps = {
  workspace: Workspace;
  isAdmin: boolean;
  isHR: boolean;
};

export const WorkspaceHeader = ({ workspace, isAdmin, isHR }: WorkspaceHeaderProps) => {
  // Get the first letters of the workspace name for the avatar fallback
  const initials = workspace.name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={workspace.logo_url || ''} alt={workspace.name} />
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{workspace.name}</h1>
          {workspace.description && (
            <p className="text-muted-foreground">{workspace.description}</p>
          )}
        </div>
      </div>
      {(isAdmin || isHR) && (
        <Button variant="lavender" asChild>
          <Link to={`/workspace/${workspace.id}/invite`}>
            <Users className="mr-2 h-4 w-4" />
            Invite Members
          </Link>
        </Button>
      )}
    </div>
  );
};
