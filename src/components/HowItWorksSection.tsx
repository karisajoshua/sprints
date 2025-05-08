
import React from "react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Create Workspaces",
    description: "Start with a workspace for your project or team to organize everything in one place.",
  },
  {
    number: "02",
    title: "Assign & Collaborate",
    description: "Break work into tasks, assign roles, and stay synced with real-time updates.",
  },
  {
    number: "03",
    title: "Track & Deliver",
    description: "Monitor progress, adjust sprints, and ship on time with powerful analytics.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 md:px-6 bg-offwhite">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 fadeIn">
          <h2 className="mb-4">How OneMap Africa Helps Your Team Move Faster</h2>
          <p className="text-lg text-charcoal/80">
            Simple steps to transform how your team delivers projects
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={step.number} 
              className={cn(
                "bg-white rounded-xl p-8 shadow-md border border-gray-100 slideUp",
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl font-bold text-emerald/30 mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-charcoal/80">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
