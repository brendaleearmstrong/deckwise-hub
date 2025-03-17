
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  Package,
  Calendar,
  Hammer,
  CheckSquare,
  Settings,
  HelpCircle,
} from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
}

const Sidebar = ({ sidebarOpen }: SidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 bg-white border-r transition-transform duration-300 transform md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="h-full flex flex-col px-4 py-6">
        <div className="flex items-center gap-2 px-2 mb-8">
          <Hammer className="h-8 w-8 text-forest" />
          <span className="font-roboto font-bold text-xl">DeckSavvy</span>
        </div>
        
        <nav className="space-y-1 flex-1">
          <Link
            to="/dashboard"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive("/dashboard")
                ? "bg-forest text-white"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to="/projects"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive("/projects")
                ? "bg-forest text-white"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <Briefcase className="h-5 w-5" />
            Projects
          </Link>
          <Link
            to="/clients"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive("/clients")
                ? "bg-forest text-white"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <Users className="h-5 w-5" />
            Clients
          </Link>
          <Link
            to="/blueprints"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive("/blueprints")
                ? "bg-forest text-white"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <FileText className="h-5 w-5" />
            Blueprints
          </Link>
          <Link
            to="/materials"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive("/materials")
                ? "bg-forest text-white"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <Package className="h-5 w-5" />
            Materials
          </Link>
          <Link
            to="/scheduler"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive("/scheduler")
                ? "bg-forest text-white"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <Calendar className="h-5 w-5" />
            Scheduler
          </Link>
          <Link
            to="/quality-checker"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive("/quality-checker")
                ? "bg-forest text-white"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <CheckSquare className="h-5 w-5" />
            Quality Checker
          </Link>
        </nav>
        
        <div className="mt-auto space-y-1">
          <Link
            to="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-slate-600 hover:bg-slate-100"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <Link
            to="/help"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-slate-600 hover:bg-slate-100"
          >
            <HelpCircle className="h-5 w-5" />
            Help & Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
