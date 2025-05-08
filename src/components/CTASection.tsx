
import React from "react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 px-4 md:px-6 bg-emerald text-white">
      <div className="container mx-auto text-center max-w-3xl fadeIn">
        <h2 className="text-white mb-6">Ready to Transform How Your Team Works?</h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Join hundreds of teams across Africa who are shipping better products faster with OneMap Africa.
        </p>
        <Button variant="sand" size="xl" className="font-bold">
          Sign Up — It's Free
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
