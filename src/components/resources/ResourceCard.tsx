
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  iconColor?: string;
  className?: string;
}

const ResourceCard = ({
  title,
  description,
  icon: Icon,
  link,
  iconColor = "text-forest",
  className,
}: ResourceCardProps) => {
  return (
    <Link
      to={link}
      className={cn(
        "block p-4 rounded-lg border border-slate-200 bg-white hover:shadow-md transition-shadow h-full",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn("p-2 rounded-md bg-slate-100 shrink-0", iconColor)}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-medium mb-1">{title}</h3>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ResourceCard;
