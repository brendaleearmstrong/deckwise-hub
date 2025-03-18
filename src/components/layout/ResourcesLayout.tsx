
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import DashboardLayout from "./DashboardLayout";
import { FileText, Book, Wrench, ExternalLink } from "lucide-react";

interface ResourcesLayoutProps {
  children: ReactNode;
  title: string;
}

const ResourcesLayout = ({ children, title }: ResourcesLayoutProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <div className="border-b mb-4"></div>
        
        <div className="flex overflow-x-auto gap-2 pb-3">
          <Link
            to="/resources"
            className={cn(
              "py-2 px-4 rounded-md whitespace-nowrap text-sm font-medium transition-colors flex items-center gap-2",
              isActive("/resources")
                ? "bg-forest text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            )}
          >
            All Resources
          </Link>
          <Link
            to="/resources/blueprints"
            className={cn(
              "py-2 px-4 rounded-md whitespace-nowrap text-sm font-medium transition-colors flex items-center gap-2",
              isActive("/resources/blueprints")
                ? "bg-forest text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            )}
          >
            <FileText className="h-4 w-4" />
            Blueprints
          </Link>
          <Link
            to="/resources/guides"
            className={cn(
              "py-2 px-4 rounded-md whitespace-nowrap text-sm font-medium transition-colors flex items-center gap-2",
              isActive("/resources/guides")
                ? "bg-forest text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            )}
          >
            <Book className="h-4 w-4" />
            Guides
          </Link>
          <Link
            to="/resources/tools"
            className={cn(
              "py-2 px-4 rounded-md whitespace-nowrap text-sm font-medium transition-colors flex items-center gap-2",
              isActive("/resources/tools")
                ? "bg-forest text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            )}
          >
            <Wrench className="h-4 w-4" />
            Tools
          </Link>
          <Link
            to="/resources/templates"
            className={cn(
              "py-2 px-4 rounded-md whitespace-nowrap text-sm font-medium transition-colors flex items-center gap-2",
              isActive("/resources/templates")
                ? "bg-forest text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            )}
          >
            <ExternalLink className="h-4 w-4" />
            Templates
          </Link>
        </div>
      </div>
      
      {children}
    </DashboardLayout>
  );
};

export default ResourcesLayout;
