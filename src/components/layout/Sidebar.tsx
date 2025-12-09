
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  UserPlus,
  Package,
  Calendar,
  Hammer,
  CheckSquare,
  Settings,
  HelpCircle,
  FileText,
  Book,
  Wrench,
  FolderOpen,
  ExternalLink,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  sidebarOpen: boolean;
}

const Sidebar = ({ sidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const [resourcesOpen, setResourcesOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isResourcesActive = () => {
    return location.pathname.startsWith("/resources");
  };

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 bg-white border-r transition-transform duration-300 transform md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center px-6 py-5 border-b">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="p-2 rounded-lg bg-forest/10 group-hover:bg-forest/20 transition-colors">
              <Hammer className="h-5 w-5 text-forest" />
            </div>
            <span className="font-semibold text-xl text-slate-800">DeckWise</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">

        <nav className="space-y-1">
          <Link
            to="/dashboard"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive("/dashboard")
                ? "bg-slate text-white"
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
                ? "bg-slate text-white"
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
                ? "bg-slate text-white"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <Users className="h-5 w-5" />
            Clients
          </Link>
          <Link
            to="/leads"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive("/leads")
                ? "bg-slate text-white"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <UserPlus className="h-5 w-5" />
            Leads
          </Link>
          
          {/* Resources Dropdown */}
          <div className="relative">
            <button
              onClick={() => setResourcesOpen(!resourcesOpen)}
              className={cn(
                "w-full flex items-center justify-between gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isResourcesActive()
                  ? "bg-slate text-white"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <div className="flex items-center gap-3">
                <FolderOpen className="h-5 w-5" />
                <span>Resources</span>
              </div>
              {resourcesOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            
            {resourcesOpen && (
              <div className="pl-10 mt-1 space-y-1">
                <Link
                  to="/resources/blueprints"
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive("/resources/blueprints")
                      ? "bg-slate text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  <FileText className="h-4 w-4" />
                  Blueprints
                </Link>
                <Link
                  to="/resources/guides"
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive("/resources/guides")
                      ? "bg-slate text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  <Book className="h-4 w-4" />
                  Guides
                </Link>
                <Link
                  to="/resources/tools"
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive("/resources/tools")
                      ? "bg-slate text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  <Wrench className="h-4 w-4" />
                  Tools
                </Link>
                <Link
                  to="/resources/templates"
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive("/resources/templates")
                      ? "bg-slate text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  <ExternalLink className="h-4 w-4" />
                  Templates
                </Link>
              </div>
            )}
          </div>
          
          <Link
            to="/materials"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive("/materials")
                ? "bg-slate text-white"
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
                ? "bg-slate text-white"
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
                ? "bg-slate text-white"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <CheckSquare className="h-5 w-5" />
            Quality Checker
          </Link>
        </nav>
        </div>

        <div className="border-t px-4 py-4 space-y-1">
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
