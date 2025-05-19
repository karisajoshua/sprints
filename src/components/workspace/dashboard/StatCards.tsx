
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, FileText } from 'lucide-react';
import { WorkspaceMember } from '@/types/workspace';

type StatCardsProps = {
  members: WorkspaceMember[];
};

export const StatCards = ({ members }: StatCardsProps) => {
  // Get admin and HR counts
  const adminCount = members.filter(member => member.is_admin).length;
  const hrCount = members.filter(member => member.is_hr).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{members.length}</div>
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
  );
};
