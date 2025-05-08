
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-offwhite p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald">
            OneMap<span className="text-sand">Africa</span>
          </h1>
          <p className="text-muted-foreground mt-2">Account Created</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-emerald" />
            </div>
            <CardTitle className="text-center">Thank You for Signing Up</CardTitle>
            <CardDescription className="text-center">
              Please check your email to confirm your account
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">
              We've sent a confirmation link to your email address. Please click on the link to verify your account.
            </p>
            <p className="text-sm text-muted-foreground">
              If you've already confirmed your email, you can proceed to sign in.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button asChild className="w-full">
              <Link to="/auth/signin">
                Sign In
              </Link>
            </Button>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Didn't receive an email? Check your spam folder or contact support.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ThankYou;
