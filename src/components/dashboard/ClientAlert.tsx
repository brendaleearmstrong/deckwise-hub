
import { AlertTriangle, Check, Info, Bell, UserRound, Briefcase, Package, CloudRain, Bot } from "lucide-react";
import { Alert } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface ClientAlertProps {
  alert: Alert;
}

const ClientAlert = ({ alert }: ClientAlertProps) => {
  const getIcon = () => {
    switch (alert.type) {
      case "client":
        return <UserRound className="h-5 w-5" />;
      case "project":
        return <Briefcase className="h-5 w-5" />;
      case "material":
        return <Package className="h-5 w-5" />;
      case "weather":
        return <CloudRain className="h-5 w-5" />;
      case "system":
        return <Bot className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getSeverityColor = () => {
    switch (alert.severity) {
      case "high":
        return "text-destructive";
      case "medium":
        return "text-warning";
      case "low":
        return "text-info";
      default:
        return "text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className={cn(
      "flex items-start p-3 rounded-lg border transition-colors",
      alert.isRead ? "bg-background" : "bg-muted/30"
    )}>
      <div className={cn("mr-3", getSeverityColor())}>
        {getIcon()}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{alert.message}</p>
        <div className="flex justify-between mt-1">
          <p className="text-xs text-muted-foreground">{formatDate(alert.date)}</p>
          {!alert.isRead && (
            <span className="text-xs font-medium text-primary">New</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientAlert;
