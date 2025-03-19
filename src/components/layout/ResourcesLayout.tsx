
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import DashboardLayout from "./DashboardLayout";
import { FileText, Book, Wrench, ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResourcesLayoutProps {
  children: ReactNode;
  title: string;
}

const ResourcesLayout = ({ children, title }: ResourcesLayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <div className="border-b mb-4"></div>
        
        <ScrollArea className="w-full pb-3">
          <div className="flex gap-2 pb-2 min-w-max">
            <Link
              to="/resources"
              className={cn(
                "py-2 px-4 rounded-md whitespace-nowrap text-sm font-medium transition-colors flex items-center gap-2",
                isActive("/resources")
                  ? "bg-slate text-white"
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
                  ? "bg-slate text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              )}
            >
              <FileText className="h-4 w-4" />
              {!isMobile && "Blueprints"}
              {isMobile && <span className="sr-only">Blueprints</span>}
            </Link>
            <Link
              to="/resources/guides"
              className={cn(
                "py-2 px-4 rounded-md whitespace-nowrap text-sm font-medium transition-colors flex items-center gap-2",
                isActive("/resources/guides")
                  ? "bg-slate text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              )}
            >
              <Book className="h-4 w-4" />
              {!isMobile && "Guides"}
              {isMobile && <span className="sr-only">Guides</span>}
            </Link>
            <Link
              to="/resources/tools"
              className={cn(
                "py-2 px-4 rounded-md whitespace-nowrap text-sm font-medium transition-colors flex items-center gap-2",
                isActive("/resources/tools")
                  ? "bg-slate text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              )}
            >
              <Wrench className="h-4 w-4" />
              {!isMobile && "Tools"}
              {isMobile && <span className="sr-only">Tools</span>}
            </Link>
            <Link
              to="/resources/templates"
              className={cn(
                "py-2 px-4 rounded-md whitespace-nowrap text-sm font-medium transition-colors flex items-center gap-2",
                isActive("/resources/templates")
                  ? "bg-slate text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              )}
            >
              <ExternalLink className="h-4 w-4" />
              {!isMobile && "Templates"}
              {isMobile && <span className="sr-only">Templates</span>}
            </Link>
          </div>
        </ScrollArea>
      </div>
      
      <div className="w-full overflow-x-visible">
        {children}
      </div>
    </DashboardLayout>
  );
};

export default ResourcesLayout;
