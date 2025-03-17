
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Client, getProjectsByClientId } from "@/data/mockData";
import { ArrowLeft, Mail, Phone, MapPin, DollarSign, Calendar, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import ProjectCard from "../dashboard/ProjectCard";

interface ClientDetailProps {
  client: Client;
}

const ClientDetail = ({ client }: ClientDetailProps) => {
  const navigate = useNavigate();
  const clientProjects = getProjectsByClientId(client.id);
  
  const getStatusBadge = () => {
    switch (client.status) {
      case "active":
        return "status-badge-success";
      case "pending":
        return "status-badge-warning";
      case "completed":
        return "status-badge-info";
      default:
        return "status-badge-info";
    }
  };

  const getPaymentStatusBadge = () => {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => navigate("/clients")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Clients
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Edit Client
          </Button>
          <Button variant="default" size="sm">
            Contact Client
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-2xl font-bold">{client.name}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <div className={cn("status-badge", getStatusBadge())}>
                    {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                  </div>
                  <div className={cn("status-badge", getPaymentStatusBadge())}>
                    {client.paymentStatus === "paid" 
                      ? "Paid in Full" 
                      : client.paymentStatus === "partial" 
                        ? `${Math.round((client.amountPaid / client.totalBudget) * 100)}% Paid`
                        : "Unpaid"}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">${client.totalBudget.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Budget</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{client.address}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>${client.amountPaid.toLocaleString()} paid of ${client.totalBudget.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Last Contact: {formatDate(client.lastContact)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Priority: {client.priority.charAt(0).toUpperCase() + client.priority.slice(1)}</span>
                  </div>
                </div>
              </div>

              {client.notes && (
                <div className="mt-4 p-3 bg-muted rounded-md">
                  <h4 className="font-medium mb-1">Notes</h4>
                  <p className="text-sm">{client.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Payment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Total Budget:</span>
                  <span className="font-medium">${client.totalBudget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Amount Paid:</span>
                  <span className="font-medium">${client.amountPaid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Remaining:</span>
                  <span className="font-medium">${(client.totalBudget - client.amountPaid).toLocaleString()}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary"
                    style={{ width: `${(client.amountPaid / client.totalBudget) * 100}%` }}
                  ></div>
                </div>
                <div className="pt-4 mt-4 border-t">
                  <Button className="w-full">Record Payment</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Client Projects</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clientProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientDetail;
