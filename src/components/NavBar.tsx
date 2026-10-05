
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignUp = () => {
    navigate('/setup');
  };

  const handleSignIn = () => {
    navigate('/auth/signin');
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleDashboard = () => {
    navigate('/');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 shadow-sm backdrop-blur-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <a href="/" className="flex items-center">
          <span className="text-emerald font-poppins font-bold text-xl md:text-2xl">
            Sprints
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {user ? (
            <>
              <Button 
                variant="ghost" 
                onClick={handleDashboard}
              >
                Dashboard
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <a
                href="#features"
                className="text-charcoal hover:text-emerald font-medium transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-emerald/30 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-charcoal hover:text-emerald font-medium transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-emerald/30 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                How It Works
              </a>
              <a
                href="#use-cases"
                className="text-charcoal hover:text-emerald font-medium transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-emerald/30 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                Use Cases
              </a>
              <Button 
                variant="outline"
                className="mr-2"
                onClick={handleSignIn}
              >
                Sign In
              </Button>
              <Button 
                variant="emerald" 
                size="default" 
                className="hover:scale-105 transition-transform"
                onClick={handleSignUp}
              >
                Sign Up — It's Free
              </Button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-charcoal focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white border-t p-4 absolute w-full shadow-md flex flex-col gap-4">
          {user ? (
            <>
              <Button 
                variant="ghost" 
                className="justify-start"
                onClick={handleDashboard}
              >
                Dashboard
              </Button>
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <a
                href="#features"
                className="text-charcoal block p-2 hover:bg-offwhite rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-charcoal block p-2 hover:bg-offwhite rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#use-cases"
                className="text-charcoal block p-2 hover:bg-offwhite rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Use Cases
              </a>
              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleSignIn();
                }}
              >
                Sign In
              </Button>
              <Button 
                variant="emerald" 
                size="default" 
                className="w-full"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleSignUp();
                }}
              >
                Sign Up — It's Free
              </Button>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default NavBar;
