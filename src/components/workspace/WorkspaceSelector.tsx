
import React, { useState } from 'react';
import { useWorkspace } from './WorkspaceContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown, Plus, Settings, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

export const WorkspaceSelector = () => {
  const { workspaces, currentWorkspace, setCurrentWorkspace, isAdmin } = useWorkspace();
  const navigate = useNavigate();
  
  if (!currentWorkspace) {
    return (
      <Button 
        variant="outline" 
        className="ml-2" 
        size="sm"
        onClick={() => navigate('/workspace/create')}
      >
        <Plus className="mr-2 h-4 w-4" /> Create Workspace
      </Button>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 hover:bg-accent/10 px-3">
          <Avatar className="h-6 w-6">
            <AvatarImage src={currentWorkspace.logo_url || ''} alt={currentWorkspace.name} />
            <AvatarFallback>{getInitials(currentWorkspace.name)}</AvatarFallback>
          </Avatar>
          <span className="max-w-[150px] truncate font-medium">{currentWorkspace.name}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Your Workspaces</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {workspaces.map(workspace => (
          <DropdownMenuItem 
            key={workspace.id} 
            onClick={() => setCurrentWorkspace(workspace)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={workspace.logo_url || ''} alt={workspace.name} />
                <AvatarFallback>{getInitials(workspace.name)}</AvatarFallback>
              </Avatar>
              <span className="truncate">{workspace.name}</span>
            </div>
            {workspace.id === currentWorkspace.id && (
              <Badge variant="subtle" className="ml-2">Active</Badge>
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/workspace/create" className="flex items-center cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            <span>Create New Workspace</span>
          </Link>
        </DropdownMenuItem>
        {isAdmin && currentWorkspace && (
          <DropdownMenuItem asChild>
            <Link to={`/workspace/${currentWorkspace.id}/settings`} className="flex items-center cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Workspace Settings</span>
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
