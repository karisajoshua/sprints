
import React from 'react';
import { Settings, FileText, Cog, Database } from 'lucide-react';
import { TeamQuestion, TeamType, LoadingStep } from '@/types/setup';

// Questions for each team type
export const teamQuestions: Record<TeamType, TeamQuestion[]> = {
  scrum: [
    {
      id: "sprintLength",
      question: "What is your preferred sprint length?",
      options: ["1 week", "2 weeks", "3 weeks", "4 weeks"]
    },
    {
      id: "projectGoals",
      question: "What are your main project goals?",
      options: ["Consistent delivery", "Feature innovation", "Technical excellence", "User satisfaction"]
    }
  ],
  startup: [
    {
      id: "teamSize",
      question: "What is your team size?",
      options: ["1-5 people", "6-15 people", "16-30 people", "30+ people"]
    },
    {
      id: "mainFocus",
      question: "What is your main focus area?",
      options: ["Product development", "Customer acquisition", "Market fit", "Scaling operations"]
    }
  ],
  ngo: [
    {
      id: "regions",
      question: "How many regions are you operating in?",
      options: ["1", "2-5", "6-10", "10+"]
    },
    {
      id: "missionFocus",
      question: "What is your mission's primary focus?",
      options: ["Health & wellness", "Education", "Environmental", "Humanitarian aid", "Community development"]
    }
  ]
};

// Loading steps for the setup process
export const loadingSteps: LoadingStep[] = [
  { 
    progress: 25, 
    message: "Creating your workspace", 
    icon: <Settings className="animate-spin h-5 w-5 text-emerald" /> 
  },
  { 
    progress: 50, 
    message: "Setting up templates", 
    icon: <FileText className="animate-pulse h-5 w-5 text-emerald" /> 
  },
  { 
    progress: 75, 
    message: "Configuring preferences", 
    icon: <Cog className="animate-spin h-5 w-5 text-emerald" /> 
  },
  { 
    progress: 100, 
    message: "Preparing dashboard", 
    icon: <Database className="animate-pulse h-5 w-5 text-emerald" /> 
  }
];
