
import React from "react";
import { Kanban, Calendar, Users, ChartBar, Earth, Slack } from "lucide-react";

const Feature = ({ 
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
  <div className={`flex gap-5 slideUp`} style={{ animationDelay: `${delay}ms` }}>
    <div className="flex-shrink-0 mt-1">
      <div className="p-3 rounded-lg bg-emerald/10 text-emerald">
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-charcoal/80">{description}</p>
    </div>
  </div>
);

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-4 md:px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 fadeIn">
          <h2 className="mb-4">All-in-One Workspace for Agile Success</h2>
          <p className="text-lg text-charcoal/80">
            Everything your team needs to plan, track, and deliver projects on time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 max-w-5xl mx-auto">
          <Feature
            icon={Kanban}
            title="Kanban Boards"
            description="Visual task tracking built for agile workflows with customizable columns and filters."
            delay={100}
          />
          
          <Feature
            icon={Calendar}
            title="Sprint Planning"
            description="Plan and manage sprints with drag-and-drop ease to keep your team focused and coordinated."
            delay={200}
          />
          
          <Feature
            icon={Users}
            title="Team Collaboration"
            description="Comment, assign, and share in real time with built-in communication tools for remote teams."
            delay={300}
          />
          
          <Feature
            icon={ChartBar}
            title="Reports & Analytics"
            description="Get insights with burn-down charts, team velocity, and customizable performance reports."
            delay={400}
          />
          
          <Feature
            icon={Earth}
            title="Works Anywhere"
            description="Designed with African infrastructure in mind, works at low bandwidth and offline modes."
            delay={500}
          />
          
          <Feature
            icon={Slack}
            title="Seamless Integrations"
            description="Connect with tools you already use like Slack, Google Drive, GitHub, and more."
            delay={600}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
