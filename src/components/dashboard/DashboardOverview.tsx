import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectCard from "./ProjectCard";
import ClientAlert from "./ClientAlert";
import MaterialStatus from "./MaterialStatus";
import { Briefcase, DollarSign, Users, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const DEMO_USER_ID = "00000000-0000-0000-0000-000000000001";

const DashboardOverview = () => {
  const [loading, setLoading] = useState(true);
  const [activeProjects, setActiveProjects] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [activeClientsCount, setActiveClientsCount] = useState(0);
  const [totalActiveBudget, setTotalActiveBudget] = useState(0);
  const [delayedProjectsCount, setDelayedProjectsCount] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [projectsRes, alertsRes, clientsRes] = await Promise.all([
          supabase
            .from("projects")
            .select(`
              *,
              clients (name)
            `)
            .eq("user_id", DEMO_USER_ID)
            .in("status", ["planning", "in_progress"])
            .order("created_at", { ascending: false }),

          supabase
            .from("alerts")
            .select("*")
            .eq("user_id", DEMO_USER_ID)
            .or("severity.eq.high,is_read.eq.false")
            .order("date", { ascending: false }),

          supabase
            .from("clients")
            .select("id, status")
            .eq("user_id", DEMO_USER_ID)
            .in("status", ["active", "pending"]),
        ]);

        if (projectsRes.error) throw projectsRes.error;
        if (alertsRes.error) throw alertsRes.error;
        if (clientsRes.error) throw clientsRes.error;

        const projects = projectsRes.data || [];
        setActiveProjects(projects);

        setAlerts(alertsRes.data || []);

        setActiveClientsCount((clientsRes.data || []).length);

        const budget = projects.reduce((sum, p) => sum + Number(p.budget), 0);
        setTotalActiveBudget(budget);

        const delayed = projects.filter((p) => p.is_delayed).length;
        setDelayedProjectsCount(delayed);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

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
            <div className="text-2xl font-bold">{activeClientsCount}</div>
            <p className="text-xs text-muted-foreground">
              {activeClientsCount === 1 ? "client" : "clients"} with ongoing projects
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Delays</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{delayedProjectsCount}</div>
            <p className="text-xs text-muted-foreground">
              {delayedProjectsCount === 1 ? "project" : "projects"} behind schedule
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
        <div className="md:col-span-4 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Active Projects</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={{
                  id: project.id,
                  name: project.name,
                  type: project.type as "deck" | "pergola" | "shed" | "fence" | "other",
                  status: project.status as "planning" | "in_progress" | "on_hold" | "completed",
                  progress: project.progress,
                  startDate: project.start_date,
                  estimatedEndDate: project.estimated_end_date,
                  actualEndDate: project.actual_end_date,
                  budget: project.budget,
                  costToDate: project.cost_to_date,
                  clientId: project.client_id,
                  clientName: project.clients?.name || "Unknown Client",
                  address: project.address,
                  isDelayed: project.is_delayed,
                  delayReason: project.delay_reason,
                  weatherImpact: project.weather_impact,
                  length: project.length,
                  width: project.width,
                  height: project.height,
                  crew: project.crew || [],
                  notes: project.notes,
                }}
              />
            ))}
          </div>
        </div>
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Alerts</h2>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <ClientAlert
                key={alert.id}
                alert={{
                  id: alert.id,
                  type: alert.type,
                  severity: alert.severity,
                  message: alert.message,
                  relatedId: alert.related_id,
                  relatedType: alert.related_type,
                  date: alert.date,
                  isRead: alert.is_read,
                }}
              />
            ))}
          </div>
          <MaterialStatus projects={activeProjects} />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
