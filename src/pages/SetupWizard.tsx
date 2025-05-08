
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Calendar, LayoutDashboard, ArrowRight, Settings, FileText, Database, Cog } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Team types
export type TeamType = "scrum" | "startup" | "ngo";

// Steps in the wizard
type WizardStep = "teamType" | "teamDetails" | "confirmation";

// Questions for each team type
const teamQuestions = {
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
const loadingSteps = [
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

const SetupWizard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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

  // Setup loading process
  useEffect(() => {
    if (isLoading) {
      const duration = 40000; // 40 seconds
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
            }, 1000); // Small delay to ensure animations complete
          }
          
          return newProgress;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isLoading, currentLoadingStep]);
  
  const handleComplete = () => {
    // Start loading process instead of navigating directly
    setIsLoading(true);
  };
  
  const completeSetup = () => {
    if (!teamType) return;
    
    // Store user preferences in localStorage
    localStorage.setItem("oneMapTeamType", teamType);
    localStorage.setItem("oneMapSetupAnswers", JSON.stringify(answers));
    
    toast({
      title: "Setup Complete!",
      description: "Your dashboard is ready.",
    });
    
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
  
  return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-3xl fadeIn shadow-xl border-t-4 border-t-emerald">
        <CardHeader>
          <CardTitle className="text-2xl">Set Up Your OneMap Africa Dashboard</CardTitle>
          <CardDescription>
            Tell us about your team so we can customize your experience
          </CardDescription>
          
          {/* Progress indicator */}
          <div className="flex items-center justify-center mt-6">
            <div className={`h-2 w-10 rounded-full ${step === "teamType" ? "bg-emerald" : "bg-emerald/30"} mx-1`}></div>
            <div className={`h-2 w-10 rounded-full ${step === "teamDetails" ? "bg-emerald" : "bg-emerald/30"} mx-1`}></div>
            <div className={`h-2 w-10 rounded-full ${step === "confirmation" ? "bg-emerald" : "bg-emerald/30"} mx-1`}></div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {step === "teamType" && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">What type of team are you?</h3>
              
              <div 
                className={`p-4 border rounded-lg cursor-pointer hover:border-emerald transition-colors ${
                  teamType === "scrum" ? "border-emerald bg-emerald/5" : "border-gray-200"
                }`}
                onClick={() => handleTeamSelect("scrum")}
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
                onClick={() => handleTeamSelect("startup")}
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
                onClick={() => handleTeamSelect("ngo")}
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
          )}
          
          {step === "teamDetails" && teamType && (
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
                        onClick={() => handleAnswerSelect(q.id, option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {step === "confirmation" && teamType && (
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
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between border-t p-6">
          {step !== "teamType" && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          {step === "teamType" && (
            <div /> // Empty div for spacing when there's no back button
          )}
          
          {step === "teamDetails" && (
            <Button 
              variant="emerald" 
              onClick={handleNext}
              disabled={!isCompleteAnswers()}
              className="gap-2"
            >
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          )}
          
          {step === "confirmation" && (
            <Button 
              variant="emerald"
              onClick={handleComplete}
              className="gap-2"
            >
              Go to Dashboard <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Loading Dialog */}
      <Dialog open={isLoading} onOpenChange={(open) => setIsLoading(open)}>
        <DialogContent className="sm:max-w-md" hideCloseButton>
          <div className="space-y-6 py-2">
            <h3 className="text-xl font-semibold text-center">Setting Up Your Dashboard</h3>
            
            <div className="space-y-2">
              <Progress value={loadingProgress} className="h-2 bg-gray-100" />
              <p className="text-sm text-gray-500 text-right">{Math.round(loadingProgress)}%</p>
            </div>
            
            <div className="space-y-4">
              {loadingSteps.map((step, index) => {
                const isActive = currentLoadingStep >= index;
                const isCompleted = loadingProgress > step.progress;
                
                return (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-md transition-all duration-300 ${
                      isActive ? "bg-emerald/5 border border-emerald/20" : "opacity-50"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-emerald" />
                      ) : (
                        isActive ? step.icon : <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                      )}
                    </div>
                    <div>
                      <p className={`font-medium ${isActive ? "text-emerald" : "text-gray-500"}`}>
                        {step.message}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <p className="text-center text-sm text-muted-foreground animate-pulse">
              This may take a moment...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SetupWizard;
