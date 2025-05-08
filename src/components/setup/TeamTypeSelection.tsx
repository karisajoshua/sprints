
import React from 'react';
import { TeamType } from '@/types/setup';
import { CheckCircle, LayoutDashboard, Users } from 'lucide-react';

interface TeamTypeSelectionProps {
  teamType: TeamType | null;
  onSelect: (type: TeamType) => void;
}

const TeamTypeSelection: React.FC<TeamTypeSelectionProps> = ({ teamType, onSelect }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">What type of team are you?</h3>
      
      <div 
        className={`p-4 border rounded-lg cursor-pointer hover:border-emerald transition-colors ${
          teamType === "scrum" ? "border-emerald bg-emerald/5" : "border-gray-200"
        }`}
        onClick={() => onSelect("scrum")}
      >
        <div className="flex items-start gap-3">
          <CheckCircle className={`mt-1 ${teamType === "scrum" ? "text-emerald" : "text-gray-400"}`} />
          <div>
            <h4 className="font-semibold text-lg">Scrum Teams</h4>
            <p className="text-muted-foreground">
              Structure your product development with full sprint control and customizable workflows to meet delivery targets.
            </p>
          </div>
        </div>
      </div>
      
      <div 
        className={`p-4 border rounded-lg cursor-pointer hover:border-emerald transition-colors ${
          teamType === "startup" ? "border-emerald bg-emerald/5" : "border-gray-200"
        }`}
        onClick={() => onSelect("startup")}
      >
        <div className="flex items-start gap-3">
          <LayoutDashboard className={`mt-1 ${teamType === "startup" ? "text-emerald" : "text-gray-400"}`} />
          <div>
            <h4 className="font-semibold text-lg">Startups</h4>
            <p className="text-muted-foreground">
              Move fast, stay lean, and collaborate remotely with efficient task tracking and team coordination tools.
            </p>
          </div>
        </div>
      </div>
      
      <div 
        className={`p-4 border rounded-lg cursor-pointer hover:border-emerald transition-colors ${
          teamType === "ngo" ? "border-emerald bg-emerald/5" : "border-gray-200"
        }`}
        onClick={() => onSelect("ngo")}
      >
        <div className="flex items-start gap-3">
          <Users className={`mt-1 ${teamType === "ngo" ? "text-emerald" : "text-gray-400"}`} />
          <div>
            <h4 className="font-semibold text-lg">NGOs & Non-Profits</h4>
            <p className="text-muted-foreground">
              Coordinate teams across regions with clarity, ensuring timely delivery of mission-critical projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamTypeSelection;
