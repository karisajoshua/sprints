
import React from 'react';
import { useWorkspace } from './WorkspaceContext';
import { WorkspaceHeader } from './dashboard/WorkspaceHeader';
import { StatCards } from './dashboard/StatCards';
import { TeamMembersList } from './dashboard/TeamMembersList';
import { QuickActions } from './dashboard/QuickActions';

export const WorkspaceDashboard = () => {
  const { currentWorkspace, workspaceMembers, isAdmin, isHR } = useWorkspace();

  if (!currentWorkspace) {
    return <div>No workspace selected</div>;
  }

  return (
    <div className="space-y-6">
      {/* Workspace Header */}
      <WorkspaceHeader 
        workspace={currentWorkspace} 
        isAdmin={isAdmin} 
        isHR={isHR}
      />

      {/* Quick Stats */}
      <StatCards members={workspaceMembers} />

      {/* Team Members */}
      <TeamMembersList 
        members={workspaceMembers}
        workspaceId={currentWorkspace.id}
        isAdmin={isAdmin}
        isHR={isHR}
      />

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
};
