
import React from "react";
import OwnerAuthForm from "@/components/auth/OwnerAuthForm";

const OwnerAuth: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left side image */}
      <div className="hidden md:block md:w-1/2 bg-gray-200">
        <img 
          src="/lovable-uploads/252fc772-e419-4592-abd2-adeea030b2c6.png" 
          alt="V-Fire Inspect" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Right side form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <OwnerAuthForm />
      </div>
    </div>
  );
};

export default OwnerAuth;
