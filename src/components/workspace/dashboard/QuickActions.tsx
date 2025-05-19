
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { FileText, Calendar, MessageSquare } from 'lucide-react';

export const QuickActions = () => {
  return (
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
  );
};
