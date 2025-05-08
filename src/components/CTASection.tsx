
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 px-4 md:px-6 bg-gradient-to-r from-emerald to-teal text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-white opacity-5"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-white opacity-10"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-white opacity-10"></div>
      
      <div className="container mx-auto text-center max-w-3xl fadeIn relative z-10">
        <h2 className="text-white mb-6 drop-shadow-md">Ready to Transform How Your Team Works?</h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Join hundreds of teams across Africa who are shipping better products faster with OneMap Africa.
        </p>
        <Button 
          variant="sand" 
          size="xl" 
          className="font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse-subtle"
          onClick={() => navigate('/setup')}
        >
          Sign Up — It's Free
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
