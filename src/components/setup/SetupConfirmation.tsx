
import React from 'react';
import { TeamType } from '@/types/setup';
import { teamQuestions } from '@/constants/setupWizardData';
import { CheckCircle } from 'lucide-react';

interface SetupConfirmationProps {
  teamType: TeamType;
  answers: Record<string, string>;
}

const SetupConfirmation: React.FC<SetupConfirmationProps> = ({ teamType, answers }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Confirm your setup</h3>
      
      <div className="bg-offwhite p-4 rounded-lg">
        <div className="mb-3">
          <span className="font-medium">Team Type:</span> {
            teamType === "scrum" ? "Scrum Team" : 
            teamType === "startup" ? "Startup" : "NGO & Non-Profit"
          }
        </div>
        
        {teamQuestions[teamType].map((q) => (
          <div key={q.id} className="mb-2">
            <span className="font-medium">{q.question}</span> {answers[q.id]}
          </div>
        ))}
      </div>
      
      <div className="bg-emerald/10 p-4 rounded-lg border border-emerald/20">
        <h4 className="font-medium text-emerald flex items-center gap-2">
          <CheckCircle className="h-5 w-5" /> 
          Your dashboard is ready
        </h4>
        <p className="mt-1 text-sm">
          We've customized your dashboard based on your preferences. You can always change these settings later.
        </p>
      </div>
    </div>
  );
};

export default SetupConfirmation;
