
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
    className="flex flex-col items-center slideUp hover:-translate-y-2 transition-transform duration-300"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="bg-gradient-to-br from-white to-offwhite p-5 rounded-xl shadow-lg border border-gray-100 mb-3 hover:shadow-xl transition-all duration-300 group">
      <Icon className="w-10 h-10 text-charcoal group-hover:text-emerald transition-colors duration-300" />
    </div>
    <span className="text-sm font-medium">{name}</span>
  </div>
);

const IntegrationsSection = () => {
  return (
    <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-white to-offwhite relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/80 to-transparent -z-10"></div>
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-emerald/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-sand/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 fadeIn">
          <h2 className="mb-4">
            <span className="relative inline-block">
              Seamlessly Integrates
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-sand/30 via-emerald/30 to-teal/30 rounded-full"></span>
            </span> With Your Workflow
          </h2>
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
