
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Client, getProjectsByClientId } from "@/data/mockData";
import { AlertTriangle, Mail, Phone, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClientCardProps {
  client: Client;
}

const ClientCard = ({ client }: ClientCardProps) => {
  const clientProjects = getProjectsByClientId(client.id);
  
  const getStatusColor = () => {
    switch (client.status) {
      case "active":
        return "bg-success";
      case "pending":
        return "bg-warning";
      case "completed":
        return "bg-muted";
      default:
        return "bg-muted";
    }
  };

  const getPaymentStatusColor = () => {
    switch (client.paymentStatus) {
      case "paid":
        return "status-badge-success";
      case "partial":
        return "status-badge-warning";
      case "unpaid":
        return "status-badge-danger";
      default:
        return "status-badge-info";
    }
  };

  const getPriorityBadge = () => {
    switch (client.priority) {
      case "high":
        return "border-l-4 border-destructive";
      case "medium":
        return "border-l-4 border-warning";
      case "low":
        return "border-l-4 border-muted";
      default:
        return "";
    }
  };

  return (
    <Link to={`/clients/${client.id}`}>
      <Card className={cn("card-hover h-full", getPriorityBadge())}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-medium">{client.name}</CardTitle>
              <div className="text-sm text-muted-foreground">
                {clientProjects.length} {clientProjects.length === 1 ? "project" : "projects"}
              </div>
            </div>
            <div 
              className={cn(
                "rounded-full h-3 w-3",
                getStatusColor()
              )}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="truncate">{client.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{client.phone}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-sm font-medium">${client.totalBudget.toLocaleString()}</span>
              </div>
              <div 
                className={cn(
                  "status-badge",
                  getPaymentStatusColor()
                )}
              >
                {client.paymentStatus === "paid" ? "Paid" : 
                 client.paymentStatus === "partial" ? "Partial" : "Unpaid"}
              </div>
            </div>
            
            {client.paymentStatus === "partial" && (
              <div className="text-xs text-muted-foreground">
                ${client.amountPaid.toLocaleString()} of ${client.totalBudget.toLocaleString()} paid
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ClientCard;
