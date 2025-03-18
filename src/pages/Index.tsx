
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Hammer, LayoutDashboard, Users, Briefcase, FileText } from "lucide-react";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-slate-100 p-4">
      <div className="w-full max-w-4xl text-center space-y-6">
        <div className="flex items-center justify-center mb-6">
          <Hammer className="h-16 w-16 text-forest" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
          Welcome to <span className="text-forest">Dekky</span>
        </h1>
        
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Your AI-powered hub for building decks and structures with smart material estimates, project planning, and client management.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <Button 
            size="lg"
            className="bg-forest hover:bg-forest-dark text-white"
            onClick={() => navigate("/dashboard")}
          >
            <LayoutDashboard className="mr-2 h-5 w-5" />
            Go to Dashboard
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            onClick={() => navigate("/projects")}
          >
            <Briefcase className="mr-2 h-5 w-5" />
            View Projects
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            onClick={() => navigate("/clients")}
          >
            <Users className="mr-2 h-5 w-5" />
            Manage Clients
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="rounded-full bg-forest/10 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              <Briefcase className="h-6 w-6 text-forest" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Project Management</h3>
            <p className="text-slate-600">
              Track progress, manage timelines, and monitor budgets for all your construction projects.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="rounded-full bg-forest/10 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              <Users className="h-6 w-6 text-forest" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Client Relationship</h3>
            <p className="text-slate-600">
              Manage client information, track payments, and send automated updates to keep everyone informed.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="rounded-full bg-forest/10 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              <FileText className="h-6 w-6 text-forest" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Blueprint Analysis</h3>
            <p className="text-slate-600">
              AI-powered tools to extract dimensions and materials from blueprints and optimize material usage.
            </p>
          </div>
        </div>
        
        <p className="text-sm text-slate-500 mt-12">
          Dekky - Build Smarter, Manage Better.
        </p>
      </div>
    </div>
  );
};

export default Index;
