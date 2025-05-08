
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { createOrganization } from '@/services/ngoService';
import { TeamType, WizardStep } from '@/types/setup';
import { teamQuestions } from '@/constants/setupWizardData';

export const useSetupWizard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [step, setStep] = useState<WizardStep>("teamType");
  const [teamType, setTeamType] = useState<TeamType | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentLoadingStep, setCurrentLoadingStep] = useState(0);

  const handleTeamSelect = (type: TeamType) => {
    setTeamType(type);
    setStep("teamDetails");
  };
  
  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };
  
  const handleComplete = () => {
    setIsLoading(true);
  };
  
  const completeSetup = async () => {
    if (!teamType) return;
    
    // Store user preferences in localStorage
    localStorage.setItem("oneMapTeamType", teamType);
    localStorage.setItem("oneMapSetupAnswers", JSON.stringify(answers));
    
    // For NGO team type, we will let NGODashboard handle the organization flow
    // This is a cleaner UX than trying to create it here without visual feedback
    
    toast({
      title: "Setup Complete!",
      description: "Your dashboard is ready.",
    });
    
    // Set session flag to indicate this user just completed the setup wizard
    sessionStorage.setItem("fromSetupWizard", "true");
    
    // Navigate to the appropriate dashboard
    navigate(`/dashboard/${teamType}`);
  };
  
  const handleBack = () => {
    if (step === "teamDetails") {
      setStep("teamType");
    } else if (step === "confirmation") {
      setStep("teamDetails");
    }
  };
  
  const handleNext = () => {
    if (step === "teamDetails") {
      setStep("confirmation");
    }
  };
  
  const isCompleteAnswers = () => {
    if (!teamType) return false;
    
    // Check if all questions for the team type have been answered
    return teamQuestions[teamType].every(q => answers[q.id]);
  };

  // Setup loading process
  useEffect(() => {
    if (isLoading) {
      const duration = 3000; // Reduced to 3 seconds for better UX
      const interval = 100; // Update every 100ms
      const steps = duration / interval;
      const incrementPerStep = 100 / steps;

      const timer = setInterval(() => {
        setLoadingProgress(prev => {
          const newProgress = Math.min(prev + incrementPerStep, 100);
          
          // Update the current loading step based on progress
          if (newProgress >= 25 && currentLoadingStep < 1) {
            setCurrentLoadingStep(1);
          } else if (newProgress >= 50 && currentLoadingStep < 2) {
            setCurrentLoadingStep(2);
          } else if (newProgress >= 75 && currentLoadingStep < 3) {
            setCurrentLoadingStep(3);
          }
          
          // When complete, navigate to dashboard
          if (newProgress >= 100) {
            clearInterval(timer);
            setTimeout(() => {
              completeSetup();
            }, 500); // Small delay to ensure animations complete
          }
          
          return newProgress;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isLoading, currentLoadingStep]);

  return {
    step,
    teamType,
    answers,
    isLoading,
    loadingProgress,
    currentLoadingStep,
    handleTeamSelect,
    handleAnswerSelect,
    handleComplete,
    handleBack,
    handleNext,
    isCompleteAnswers,
    setIsLoading
  };
};
