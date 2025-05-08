
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { CheckCircle } from 'lucide-react';
import { loadingSteps } from '@/constants/setupWizardData';

interface LoadingDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  loadingProgress: number;
  currentLoadingStep: number;
}

const LoadingDialog: React.FC<LoadingDialogProps> = ({ 
  isOpen, 
  onOpenChange, 
  loadingProgress, 
  currentLoadingStep 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
  );
};

export default LoadingDialog;
