
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
    <section id="how-it-works" className="py-20 px-4 md:px-6 bg-gradient-to-b from-offwhite to-white relative">
      {/* Decorative elements */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/4 h-1/2 bg-emerald/5 rounded-r-full blur-3xl -z-10"></div>
      <div className="absolute right-0 top-1/3 transform -translate-y-1/3 w-1/5 h-1/3 bg-sand/5 rounded-l-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 fadeIn">
          <h2 className="mb-4 relative inline-block">
            How OneMap Africa Helps Your Team Move Faster
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-emerald/30 to-transparent rounded-full"></span>
          </h2>
          <p className="text-lg text-charcoal/80">
            Simple steps to transform how your team delivers projects
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={step.number} 
              className={cn(
                "bg-white rounded-xl p-8 shadow-md border border-gray-100 slideUp hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden relative",
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute -right-5 -top-5 w-20 h-20 bg-gradient-to-br from-emerald/10 to-teal/5 rounded-full blur-xl"></div>
              
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald to-teal mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-charcoal/80">{step.description}</p>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald/30 to-teal/30"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
