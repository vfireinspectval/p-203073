
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Shield } from "lucide-react";

const Index = () => {
  const { user, isAdmin, userType } = useAuth();

  const renderDashboardButton = () => {
    if (!user) return null;
    
    if (isAdmin) {
      return (
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Link to="/admin/dashboard" className="text-white">Go to Admin Dashboard</Link>
        </Button>
      );
    }
    
    if (userType === 'establishment_owner') {
      return (
        <Button className="bg-red-600 hover:bg-red-700">
          <Link to="/owner/dashboard" className="text-white">Go to Establishment Dashboard</Link>
        </Button>
      );
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-red-600">Fire Inspection Portal</h1>
          {user ? (
            renderDashboardButton()
          ) : (
            <div className="flex space-x-4">
              <Button variant="outline" asChild>
                <Link to="/admin">Admin Login</Link>
              </Button>
              <Button className="bg-red-600 hover:bg-red-700" asChild>
                <Link to="/owner/auth">Establishment Login</Link>
              </Button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to the Fire Inspection Portal</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A unified platform for fire inspections management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border-t-4 border-blue-500">
            <CardHeader>
              <div className="flex items-center">
                <Shield className="h-6 w-6 text-blue-500 mr-2" />
                <CardTitle>Admin Portal</CardTitle>
              </div>
              <CardDescription>For fire inspection personnel</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                Access tools to manage inspections, review establishment data, and generate reports.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/admin">Admin Login</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-red-500">
            <CardHeader>
              <div className="flex items-center">
                <Building className="h-6 w-6 text-red-500 mr-2" />
                <CardTitle>Establishment Portal</CardTitle>
              </div>
              <CardDescription>For establishment owners</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                Register your establishment, view inspection schedules, and access compliance resources.
              </p>
              <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
                <Link to="/owner/auth">Establishment Login/Register</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-gray-100 p-6 mt-auto">
        <div className="container mx-auto text-center text-gray-600">
          <p>&copy; 2023 Fire Inspection Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
