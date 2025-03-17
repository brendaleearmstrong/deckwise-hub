
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CalendarClock, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const getStatusColor = () => {
    if (project.isDelayed) return "bg-destructive";
    switch (project.status) {
      case "completed":
        return "bg-success";
      case "in_progress":
        return "bg-info";
      case "planning":
        return "bg-warning";
      case "on_hold":
        return "bg-steel";
      default:
        return "bg-muted";
    }
  };

  const getStatusText = () => {
    if (project.isDelayed) return "Delayed";
    return project.status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Calculate days left until estimated completion
  const currentDate = new Date();
  const endDate = new Date(project.estimatedEndDate);
  const daysLeft = Math.ceil((endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <Link to={`/projects/${project.id}`}>
      <Card className="card-hover h-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-medium">{project.name}</CardTitle>
              <div className="text-sm text-muted-foreground">{`${project.dimensions.length}' × ${project.dimensions.width}'`}</div>
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
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Progress</div>
              <div className="text-sm">{project.progress}%</div>
            </div>
            <Progress value={project.progress} className="h-2" />
            
            <div className="flex justify-between text-sm mt-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>
                  {project.status === "completed" 
                    ? "Completed" 
                    : daysLeft > 0 
                      ? `${daysLeft} days left` 
                      : "Due today"}
                </span>
              </div>
              <div 
                className={cn(
                  "status-badge",
                  project.isDelayed 
                    ? "status-badge-danger" 
                    : project.status === "completed" 
                      ? "status-badge-success"
                      : project.status === "in_progress"
                        ? "status-badge-info"
                        : "status-badge-warning"
                )}
              >
                {getStatusText()}
              </div>
            </div>
            
            {project.isDelayed && (
              <div className="flex items-center mt-2 text-destructive text-sm">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span>{project.delayReason}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProjectCard;
