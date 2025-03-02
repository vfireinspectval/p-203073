
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Home, Clock, Settings, LogOut } from "lucide-react";

const OwnerDashboard: React.FC = () => {
  const { signOut, profile } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-red-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Building size={24} />
            <h1 className="text-xl font-bold">Establishment Portal</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span>{profile?.email}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-red-700"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-6">Welcome to Your Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-red-600">
                <Building className="mr-2" size={20} />
                Your Establishment
              </CardTitle>
              <CardDescription>Manage your establishment details</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-4">Update your establishment information, hours, and contact details.</p>
              <Button className="bg-red-600 hover:bg-red-700 w-full">
                Manage Establishment
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-red-600">
                <Clock className="mr-2" size={20} />
                Inspection Schedule
              </CardTitle>
              <CardDescription>View upcoming inspections</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-4">Check your upcoming fire inspection appointments and history.</p>
              <Button className="bg-red-600 hover:bg-red-700 w-full">
                View Schedule
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-red-600">
                <Settings className="mr-2" size={20} />
                Account Settings
              </CardTitle>
              <CardDescription>Manage your account</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-4">Update your profile information, password, and notification preferences.</p>
              <Button className="bg-red-600 hover:bg-red-700 w-full">
                Account Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>Complete these steps to set up your establishment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg flex items-start">
                <div className="bg-red-100 text-red-600 p-2 rounded-full mr-4">
                  <Building size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Add Your Establishment Details</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Provide information about your establishment including location, contact details, and type.
                  </p>
                  <Button variant="outline" className="mt-2">
                    Add Details
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerDashboard;
