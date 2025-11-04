
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProjectCard from "@/components/dashboard/ProjectCard";
import AddProjectForm, { ProjectFormData } from "@/components/forms/AddProjectForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Plus, Search, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface Project {
  id: string;
  name: string;
  type: string;
  status: string;
  progress: number;
  start_date: string;
  estimated_end_date: string;
  actual_end_date?: string;
  budget: number;
  cost_to_date: number;
  client_id: string;
  address: string;
  is_delayed: boolean;
  delay_reason?: string;
  weather_impact?: string;
  length?: number;
  width?: number;
  height?: number;
  crew?: string[];
  notes?: string;
  created_at?: string;
  clients?: {
    name: string;
  };
}

const DEMO_USER_ID = "00000000-0000-0000-0000-000000000001";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          clients (name)
        `)
        .eq("user_id", DEMO_USER_ID)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = async (data: ProjectFormData) => {
    try {
      const { error } = await supabase.from("projects").insert([
        {
          user_id: DEMO_USER_ID,
          client_id: data.clientId,
          name: data.name,
          type: data.type,
          status: "planning",
          progress: 0,
          start_date: data.startDate,
          estimated_end_date: data.estimatedEndDate,
          budget: data.budget,
          cost_to_date: 0,
          length: data.length,
          width: data.width,
          height: data.height || null,
          address: data.address,
          notes: data.notes,
          is_delayed: false,
          weather_impact: "none",
        },
      ]);

      if (error) throw error;

      toast.success("Project added successfully!");
      fetchProjects();
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Failed to add project");
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || project.type === typeFilter;

    const matchesStatus = statusFilter === "all" ||
                          (statusFilter === "delayed" && project.is_delayed) ||
                          (!project.is_delayed && project.status === statusFilter);

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground">
              Manage your projects and track progress
            </p>
          </div>
          <Button size="sm" className="flex items-center gap-1 sm:self-start" onClick={() => setIsAddProjectOpen(true)}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Project Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="deck">Deck</SelectItem>
              <SelectItem value="pergola">Pergola</SelectItem>
              <SelectItem value="shed">Shed</SelectItem>
              <SelectItem value="fence">Fence</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="on_hold">On Hold</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="delayed">Delayed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
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

            {filteredProjects.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <p className="text-lg font-medium">No projects found</p>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <AddProjectForm
        open={isAddProjectOpen}
        onOpenChange={setIsAddProjectOpen}
        onSubmit={handleAddProject}
      />
    </DashboardLayout>
  );
};

export default Projects;
