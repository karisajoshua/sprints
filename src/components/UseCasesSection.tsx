
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
    className="bg-gradient-to-br from-white to-offwhite rounded-xl p-8 border border-gray-100 shadow-md slideUp hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="mb-5">
      <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-emerald/20 to-teal/10 text-emerald group-hover:bg-gradient-to-br group-hover:from-emerald/30 group-hover:to-teal/20 transition-all duration-300">
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-charcoal/80 mb-5">{description}</p>
    <Button 
      variant="ghost" 
      className="text-emerald hover:text-emerald/90 hover:bg-emerald/5 p-0 group-hover:translate-x-1 transition-transform duration-300"
    >
      Learn more →
    </Button>
    
    {/* Decorative corner accent */}
    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-emerald/5 to-transparent -z-10"></div>
    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-teal/5 to-transparent -z-10"></div>
  </div>
);

const UseCasesSection = () => {
  return (
    <section id="use-cases" className="py-20 px-4 md:px-6 bg-gradient-to-b from-offwhite to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/3 left-1/5 w-60 h-60 bg-emerald/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 right-1/5 w-60 h-60 bg-sand/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 fadeIn">
          <h2 className="mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald to-teal">Built</span> for Every Kind of Agile Team
          </h2>
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
