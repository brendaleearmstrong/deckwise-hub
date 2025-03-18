
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { LucideIcon, AlertCircle } from "lucide-react";
import { useState } from "react";

interface ResourceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  className?: string;
}

const ResourceCard = ({ title, description, icon: Icon, link, className }: ResourceCardProps) => {
  return (
    <Link 
      to={link}
      className={cn(
        "block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 h-full w-full overflow-hidden",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="bg-forest/10 p-3 rounded-full flex-shrink-0">
          <Icon className="h-6 w-6 text-forest" />
        </div>
        <div className="space-y-2 overflow-hidden">
          <h3 className="font-semibold text-lg text-left truncate">{title}</h3>
          <p className="text-sm text-slate-600 text-left">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ResourceCard;
