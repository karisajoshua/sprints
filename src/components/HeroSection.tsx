
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-4 md:px-6 overflow-hidden relative">
      {/* Background gradient elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-emerald/10 to-teal/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-sand/10 to-emerald/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fadeIn">
            <h1 className="text-charcoal mb-6 relative">
              <span className="relative">
                Agile Project Management 
                <span className="absolute -bottom-2 left-0 w-24 h-2 bg-emerald/20 rounded-full"></span>
              </span>
              <br />Built for African Teams
            </h1>
            <p className="text-lg md:text-xl text-charcoal/80 mb-8 max-w-lg">
              OneMap Africa brings your remote team together with intuitive task
              boards, real-time collaboration, and seamless integrations — all
              tailored for the African work environment.
            </p>
            <Button 
              variant="emerald" 
              size="xl" 
              className="mt-2 glow-button animate-pulse-subtle hover:scale-105 transition-transform"
              onClick={() => navigate('/setup')}
            >
              Sign Up — It's Free
            </Button>
          </div>
          
          <div className="relative fadeIn delay-200">
            <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-500 transform hover:-translate-y-1">
              <div className="bg-gradient-to-r from-emerald/20 to-teal/5 p-3 border-b flex items-center">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto text-sm font-medium text-emerald">
                  OneMap Africa Dashboard
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-offwhite p-3 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">To Do</h4>
                    <div className="space-y-2">
                      <div className="bg-white p-2 rounded border shadow-sm hover:border-emerald/30 transition-colors">
                        <div className="h-2 bg-emerald/20 rounded w-1/4 mb-2"></div>
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                      </div>
                      <div className="bg-white p-2 rounded border shadow-sm hover:border-sand/30 transition-colors">
                        <div className="h-2 bg-sand/30 rounded w-1/3 mb-2"></div>
                        <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-offwhite p-3 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">In Progress</h4>
                    <div className="space-y-2">
                      <div className="bg-white p-2 rounded border shadow-sm hover:border-teal/30 transition-colors">
                        <div className="h-2 bg-teal/30 rounded w-1/4 mb-2"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <div className="bg-white p-2 rounded border shadow-sm hover:border-emerald/30 transition-colors">
                        <div className="h-2 bg-emerald/20 rounded w-1/3 mb-2"></div>
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-offwhite p-3 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Completed</h4>
                    <div className="space-y-2">
                      <div className="bg-white p-2 rounded border shadow-sm hover:border-emerald/30 transition-colors">
                        <div className="h-2 bg-emerald/20 rounded w-1/4 mb-2"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-offwhite p-4 rounded-lg hover:bg-gradient-to-r hover:from-offwhite hover:to-emerald/5 transition-colors">
                  <div className="flex justify-between items-center mb-3">
                    <div className="h-3 bg-gradient-to-r from-emerald to-teal rounded w-1/4"></div>
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                      <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                    </div>
                  </div>
                  <div className="h-16 bg-gray-100 rounded-md"></div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-sand/20 rounded-full blur-xl z-[-1] animate-pulse-slow"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-emerald/20 rounded-full blur-xl z-[-1] animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
