
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Lock, Mail, User, Info, CircleHelp } from "lucide-react";
import { toast } from "sonner";

const OwnerAuthForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("signup");
  
  // Sign in state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  // Sign up state
  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [signupEmail, setSignupEmail] = useState<string>("");
  const [businessName, setBusinessName] = useState<string>("");
  const [dtiNumber, setDtiNumber] = useState<string>("");
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn(email, password);
      toast.success("Successfully signed in");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to sign in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeToTerms) {
      toast.error("You must agree to the Terms of Service and Privacy Policy");
      return;
    }
    
    setIsLoading(true);
    try {
      // Pass additional user metadata for profile creation
      const metadata = {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        business_name: businessName,
        dti_number: dtiNumber
      };
      
      await signUp(signupEmail, password);
      toast.success("Registration successful! Please check your email for verification.");
      setActiveTab("signin");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md px-4">
      <div className="text-center mb-8">
        <div className="mx-auto mb-4 p-2 rounded-full bg-white">
          <img src="/lovable-uploads/252fc772-e419-4592-abd2-adeea030b2c6.png" alt="Logo" className="w-12 h-12 object-contain mx-auto" />
        </div>
      </div>
      
      <Tabs 
        defaultValue={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="signin">
          <form onSubmit={handleSignIn}>
            <CardContent className="space-y-4 px-0">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <label htmlFor="email-signin" className="text-sm font-medium">Email</label>
                </div>
                <Input
                  id="email-signin"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-gray-500" />
                  <label htmlFor="password-signin" className="text-sm font-medium">Password</label>
                </div>
                <Input
                  id="password-signin"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-right">
                <a href="#" className="text-sm text-red-600 hover:underline">
                  Forgot Password?
                </a>
              </div>
            </CardContent>
            <CardFooter className="px-0">
              <Button 
                className="w-full bg-red-600 hover:bg-red-700" 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
        
        <TabsContent value="signup">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-red-600">REGISTER ACCOUNT</h2>
          </div>
          
          <form onSubmit={handleSignUp}>
            <CardContent className="space-y-4 px-0">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="firstName" className="text-sm font-medium flex items-center">
                    First Name*
                  </label>
                </div>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="middleName" className="text-sm font-medium">Middle Name</label>
                </div>
                <Input
                  id="middleName"
                  type="text"
                  placeholder="Enter Middle Name"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="lastName" className="text-sm font-medium">Last Name*</label>
                </div>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="email-signup" className="text-sm font-medium">Email*</label>
                </div>
                <Input
                  id="email-signup"
                  type="email"
                  placeholder="Enter Email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="password-signup" className="text-sm font-medium">Password*</label>
                </div>
                <Input
                  id="password-signup"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-2">
                  <div className="flex justify-between">
                    <label htmlFor="businessName" className="text-sm font-medium">Business Name*</label>
                  </div>
                  <Input
                    id="businessName"
                    type="text"
                    placeholder="Business Name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label htmlFor="dtiNumber" className="text-sm font-medium">DTI Certificate No.*</label>
                  </div>
                  <div className="relative">
                    <Input
                      id="dtiNumber"
                      type="text"
                      placeholder="(Optional)"
                      value={dtiNumber}
                      onChange={(e) => setDtiNumber(e.target.value)}
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <CircleHelp className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-2 mt-4">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                />
                <label htmlFor="terms" className="text-xs text-gray-600">
                  By clicking Sign Up, you agree to our Terms of Service and Privacy Policy.
                </label>
              </div>
              
              <div className="text-xs text-gray-500 text-center mt-4">
                Already have an account? <button type="button" onClick={() => setActiveTab("signin")} className="text-red-600 hover:underline">Log in</button>
              </div>
            </CardContent>
            <CardFooter className="px-0">
              <Button 
                className="w-full bg-red-600 hover:bg-red-700" 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Sign Up"}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OwnerAuthForm;
