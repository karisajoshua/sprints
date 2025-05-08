
import React from 'react';
import { TeamType } from '@/types/setup';
import { teamQuestions } from '@/constants/setupWizardData';

interface TeamDetailsFormProps {
  teamType: TeamType;
  answers: Record<string, string>;
  onAnswerSelect: (questionId: string, answer: string) => void;
}

const TeamDetailsForm: React.FC<TeamDetailsFormProps> = ({ teamType, answers, onAnswerSelect }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Tell us more about your {
        teamType === "scrum" ? "scrum team" : 
        teamType === "startup" ? "startup" : "organization"
      }</h3>
      
      {teamQuestions[teamType].map((q) => (
        <div key={q.id} className="space-y-3">
          <h4 className="font-medium">{q.question}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {q.options.map((option) => (
              <div
                key={option}
                className={`p-3 border rounded-md cursor-pointer hover:border-emerald transition-colors ${
                  answers[q.id] === option ? "border-emerald bg-emerald/5" : "border-gray-200"
                }`}
                onClick={() => onAnswerSelect(q.id, option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamDetailsForm;
