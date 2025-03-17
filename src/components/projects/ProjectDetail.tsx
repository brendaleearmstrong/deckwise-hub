
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project, getClientById } from "@/data/mockData";
import { ArrowLeft, Calendar, AlertTriangle, Users, DollarSign, Ruler, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import ProjectProgress from "./ProjectProgress";

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail = ({ project }: ProjectDetailProps) => {
  const navigate = useNavigate();
  const client = getClientById(project.clientId);
  
  const getStatusBadge = () => {
    if (project.isDelayed) return "status-badge-danger";
    
    switch (project.status) {
      case "completed":
        return "status-badge-success";
      case "in_progress":
        return "status-badge-info";
      case "planning":
        return "status-badge-warning";
      case "on_hold":
        return "status-badge-muted";
      default:
        return "status-badge-info";
    }
  };

  const getStatusText = () => {
    if (project.isDelayed) return "Delayed";
    
    return project.status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate days remaining or overdue
  const currentDate = new Date();
  const endDate = new Date(project.estimatedEndDate);
  const daysRemaining = Math.ceil(
    (endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => navigate("/projects")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Edit Project
          </Button>
          <Button variant="default" size="sm">
            Update Status
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-2xl font-bold">{project.name}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <div className={cn("status-badge", getStatusBadge())}>
                    {getStatusText()}
                  </div>
                  {project.type && (
                    <div className="status-badge bg-secondary text-secondary-foreground">
                      {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">${project.budget.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Budget</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Start: {formatDate(project.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Est. Completion: {formatDate(project.estimatedEndDate)}</span>
                  </div>
                  {project.actualEndDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-success" />
                      <span>Completed: {formatDate(project.actualEndDate)}</span>
                    </div>
                  )}
                  {project.isDelayed && (
                    <div className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <span>{project.delayReason}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Client: {client?.name || "Unknown"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>Cost to Date: ${project.costToDate.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-muted-foreground" />
                    <span>Dimensions: {project.dimensions.length}' × {project.dimensions.width}'{project.dimensions.height ? ` × ${project.dimensions.height}'` : ''}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{project.address}</span>
                  </div>
                </div>
              </div>

              {project.notes && (
                <div className="mt-4 p-3 bg-muted rounded-md">
                  <h4 className="font-medium mb-1">Notes</h4>
                  <p className="text-sm">{project.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Project Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Progress:</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Budget Used:</span>
                  <span className="font-medium">{Math.round((project.costToDate / project.budget) * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Days Remaining:</span>
                  <span className={cn(
                    "font-medium",
                    daysRemaining < 0 ? "text-destructive" : 
                    daysRemaining <= 3 ? "text-warning" : ""
                  )}>
                    {project.status === "completed" ? "Completed" : 
                     daysRemaining > 0 ? daysRemaining : "Overdue"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Crew:</span>
                  <span className="font-medium">{project.crew.join(", ")}</span>
                </div>
                
                <div className="pt-4 mt-4 border-t space-y-2">
                  <Button variant="outline" className="w-full">View Materials</Button>
                  <Button variant="outline" className="w-full">View Blueprint</Button>
                  <Button className="w-full">Run Quality Check</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProjectProgress project={project} />
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.materials.map((material) => (
                <div key={material.id} className="flex justify-between items-center pb-2 border-b">
                  <div>
                    <div className="font-medium">{material.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {material.quantity} {material.unit} @ ${material.unitPrice.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${material.totalPrice.toLocaleString()}</div>
                    <div className={cn(
                      "text-xs uppercase font-medium",
                      material.status === "installed" ? "text-success" :
                      material.status === "received" ? "text-info" :
                      material.status === "ordered" ? "text-warning" :
                      "text-muted-foreground"
                    )}>
                      {material.status}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between pt-2">
                <span className="font-medium">Total Materials Cost:</span>
                <span className="font-bold">
                  ${project.materials.reduce((sum, material) => sum + material.totalPrice, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetail;
