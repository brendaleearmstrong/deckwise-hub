
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Client, Project, Alert, mockClients, mockProjects, mockAlerts } from "@/data/mockData";
import ProjectCard from "./ProjectCard";
import ClientAlert from "./ClientAlert";
import MaterialStatus from "./MaterialStatus";
import { Briefcase, DollarSign, Users, AlertCircle } from "lucide-react";

const DashboardOverview = () => {
  // Active projects (planning or in_progress)
  const activeProjects = mockProjects.filter(
    (project) => project.status === "planning" || project.status === "in_progress"
  );
  
  // High priority alerts
  const highPriorityAlerts = mockAlerts.filter(
    (alert) => alert.severity === "high" || !alert.isRead
  );
  
  // Calculate total budget across all active projects
  const totalActiveBudget = activeProjects.reduce(
    (sum, project) => sum + project.budget,
    0
  );
  
  // Count active clients
  const activeClients = mockClients.filter(
    (client) => client.status === "active" || client.status === "pending"
  ).length;
  
  // Count delayed projects
  const delayedProjects = mockProjects.filter(
    (project) => project.isDelayed
  ).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeProjects.length === 1 ? "project" : "projects"} in progress
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalActiveBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              across all active projects
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeClients}</div>
            <p className="text-xs text-muted-foreground">
              {activeClients === 1 ? "client" : "clients"} with ongoing projects
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Delays</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{delayedProjects}</div>
            <p className="text-xs text-muted-foreground">
              {delayedProjects === 1 ? "project" : "projects"} behind schedule
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
        <div className="md:col-span-4 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Active Projects</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Alerts</h2>
          <div className="space-y-4">
            {highPriorityAlerts.map((alert) => (
              <ClientAlert key={alert.id} alert={alert} />
            ))}
          </div>
          <MaterialStatus projects={mockProjects} />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
