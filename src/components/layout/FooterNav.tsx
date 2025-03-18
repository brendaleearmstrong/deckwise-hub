
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  UserPlus,
  FolderOpen,
} from "lucide-react";

const FooterNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t md:hidden">
      <div className="grid grid-cols-5 h-16">
        <Link
          to="/dashboard"
          className={cn(
            "flex flex-col items-center justify-center gap-1",
            isActive("/dashboard") ? "text-forest" : "text-slate-500"
          )}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          to="/projects"
          className={cn(
            "flex flex-col items-center justify-center gap-1",
            isActive("/projects") ? "text-forest" : "text-slate-500"
          )}
        >
          <Briefcase className="h-5 w-5" />
          <span className="text-xs">Projects</span>
        </Link>
        <Link
          to="/clients"
          className={cn(
            "flex flex-col items-center justify-center gap-1",
            isActive("/clients") ? "text-forest" : "text-slate-500"
          )}
        >
          <Users className="h-5 w-5" />
          <span className="text-xs">Clients</span>
        </Link>
        <Link
          to="/leads"
          className={cn(
            "flex flex-col items-center justify-center gap-1",
            isActive("/leads") ? "text-forest" : "text-slate-500"
          )}
        >
          <UserPlus className="h-5 w-5" />
          <span className="text-xs">Leads</span>
        </Link>
        <Link
          to="/resources"
          className={cn(
            "flex flex-col items-center justify-center gap-1",
            isActive("/resources") ? "text-forest" : "text-slate-500"
          )}
        >
          <FolderOpen className="h-5 w-5" />
          <span className="text-xs">Resources</span>
        </Link>
      </div>
    </div>
  );
};

export default FooterNav;
