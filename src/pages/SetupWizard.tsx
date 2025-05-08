
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import TeamTypeSelection from "@/components/setup/TeamTypeSelection";
import TeamDetailsForm from "@/components/setup/TeamDetailsForm";
import SetupConfirmation from "@/components/setup/SetupConfirmation";
import LoadingDialog from "@/components/setup/LoadingDialog";
import { useSetupWizard } from "@/hooks/useSetupWizard";

const SetupWizard = () => {
  const {
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
  } = useSetupWizard();
  
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
            <TeamTypeSelection 
              teamType={teamType} 
              onSelect={handleTeamSelect} 
            />
          )}
          
          {step === "teamDetails" && teamType && (
            <TeamDetailsForm 
              teamType={teamType}
              answers={answers}
              onAnswerSelect={handleAnswerSelect}
            />
          )}
          
          {step === "confirmation" && teamType && (
            <SetupConfirmation
              teamType={teamType}
              answers={answers}
            />
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between border-t p-6">
          {step !== "teamType" && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          
          {/* Empty div for spacing when there's no back button */}
          {step === "teamType" && (
            <div></div>
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
      <LoadingDialog 
        isOpen={isLoading} 
        onOpenChange={(open) => setIsLoading(open)}
        loadingProgress={loadingProgress}
        currentLoadingStep={currentLoadingStep}
      />
    </div>
  );
};

export default SetupWizard;
