
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Hammer, LayoutDashboard, Users, Briefcase, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect to dashboard after 3 seconds
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white px-4 pt-16">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Hammer logo */}
        <div className="mb-6">
          <Hammer className="h-20 w-20 text-primary" />
        </div>
        
        {/* Welcome text */}
        <h1 className="text-4xl font-bold text-slate-800 text-center mb-4">
          Welcome to <span className="text-primary">Dekky</span>
        </h1>
        
        {/* Tagline */}
        <p className="text-slate-600 text-center mb-12">
          Your AI-powered hub for building decks and structures with smart material estimates, project planning, and client management.
        </p>
        
        {/* Primary button */}
        <Button 
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-white mb-4 h-14 text-base"
          onClick={() => navigate("/dashboard")}
        >
          <LayoutDashboard className="mr-2 h-5 w-5" />
          Go to Dashboard
        </Button>
        
        {/* Secondary buttons */}
        <div className="w-full space-y-4 mb-12">
          <Button 
            variant="outline"
            size="lg"
            className="w-full border-gray-300 h-14 text-base"
            onClick={() => navigate("/projects")}
          >
            <Briefcase className="mr-2 h-5 w-5" />
            View Projects
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            className="w-full border-gray-300 h-14 text-base"
            onClick={() => navigate("/clients")}
          >
            <Users className="mr-2 h-5 w-5" />
            Manage Clients
          </Button>
        </div>
        
        {/* Features cards */}
        <div className="w-full space-y-4">
          <Card className="border border-gray-200 overflow-hidden">
            <CardContent className="p-6">
              <div className="rounded-full bg-green-50 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Project Management</h3>
              <p className="text-slate-600 text-center">
                Track progress, manage timelines, and monitor budgets for all your construction projects.
              </p>
            </CardContent>
          </Card>
          
          {/* Additional cards would go here - only showing one to match the image */}
        </div>
        
        <div className="h-20"></div> {/* Spacer for bottom */}
      </div>
    </div>
  );
};

export default Index;
