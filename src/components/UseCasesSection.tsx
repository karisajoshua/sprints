
import React from "react";
import { Users, ChartBar, Earth } from "lucide-react";
import { Button } from "@/components/ui/button";

const UseCase = ({ 
  icon: Icon, 
  title, 
  description,
  delay = 0
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  delay?: number;
}) => (
  <div 
    className="bg-white rounded-xl p-8 border border-gray-100 shadow-md slideUp"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="mb-5">
      <div className="inline-flex p-3 rounded-lg bg-emerald/10 text-emerald">
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-charcoal/80 mb-5">{description}</p>
    <Button variant="ghost" className="text-emerald hover:text-emerald/90 hover:bg-emerald/5 p-0">
      Learn more →
    </Button>
  </div>
);

const UseCasesSection = () => {
  return (
    <section id="use-cases" className="py-20 px-4 md:px-6 bg-offwhite">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 fadeIn">
          <h2 className="mb-4">Built for Every Kind of Agile Team</h2>
          <p className="text-lg text-charcoal/80">
            Discover how teams across Africa are accelerating their productivity
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <UseCase
            icon={ChartBar}
            title="Scrum Teams"
            description="Structure your product development with full sprint control and customizable workflows to meet delivery targets."
            delay={100}
          />
          
          <UseCase
            icon={Users}
            title="Startups"
            description="Move fast, stay lean, and collaborate remotely with efficient task tracking and team coordination tools."
            delay={200}
          />
          
          <UseCase
            icon={Earth}
            title="NGOs & Non-Profits"
            description="Coordinate teams across regions with clarity, ensuring timely delivery of mission-critical projects."
            delay={300}
          />
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
