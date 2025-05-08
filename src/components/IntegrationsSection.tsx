
import React from "react";
import { Slack, Github, Trello, FileSpreadsheet, Mail, Zap } from "lucide-react";

const IntegrationLogo = ({ 
  icon: Icon, 
  name,
  delay = 0
}: { 
  icon: React.ElementType;
  name: string;
  delay?: number;
}) => (
  <div 
    className="flex flex-col items-center slideUp"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-3">
      <Icon className="w-10 h-10 text-charcoal" />
    </div>
    <span className="text-sm font-medium">{name}</span>
  </div>
);

const IntegrationsSection = () => {
  return (
    <section className="py-20 px-4 md:px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 fadeIn">
          <h2 className="mb-4">Seamlessly Integrates With Your Workflow</h2>
          <p className="text-lg text-charcoal/80">
            Connect your favorite tools to centralize your productivity
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-5xl mx-auto">
          <IntegrationLogo icon={Slack} name="Slack" delay={100} />
          <IntegrationLogo icon={FileSpreadsheet} name="Google Drive" delay={200} />
          <IntegrationLogo icon={Mail} name="Email" delay={300} />
          <IntegrationLogo icon={Trello} name="Trello" delay={400} />
          <IntegrationLogo icon={Github} name="GitHub" delay={500} />
          <IntegrationLogo icon={Zap} name="Notion" delay={600} />
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
