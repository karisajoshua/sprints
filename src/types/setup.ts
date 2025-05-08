
// Team types
export type TeamType = "scrum" | "startup" | "ngo";

// Steps in the wizard
export type WizardStep = "teamType" | "teamDetails" | "confirmation";

// Question interface
export interface TeamQuestion {
  id: string;
  question: string;
  options: string[];
}

// Loading step interface
export interface LoadingStep {
  progress: number;
  message: string;
  icon: React.ReactNode;
}
