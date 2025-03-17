
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project, Milestone } from "@/data/mockData";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProjectProgressProps {
  project: Project;
}

const ProjectProgress = ({ project }: ProjectProgressProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getMilestoneStatus = (milestone: Milestone) => {
    switch (milestone.status) {
      case "completed":
        return {
          icon: <CheckCircle2 className="h-5 w-5 text-success" />,
          textColor: "text-success"
        };
      case "in_progress":
        return {
          icon: <Clock className="h-5 w-5 text-info" />,
          textColor: "text-info"
        };
      case "not_started":
        return {
          icon: <Circle className="h-5 w-5 text-muted-foreground" />,
          textColor: "text-muted-foreground"
        };
      default:
        return {
          icon: <Circle className="h-5 w-5 text-muted-foreground" />,
          textColor: "text-muted-foreground"
        };
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Project Progress</CardTitle>
          <span className="text-lg font-bold">{project.progress}%</span>
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={project.progress} className="h-2 mb-6" />
        
        <div className="space-y-4">
          {project.milestones.map((milestone, index) => {
            const { icon, textColor } = getMilestoneStatus(milestone);
            
            return (
              <div key={milestone.id} className="relative pl-7">
                {/* Connector Line */}
                {index < project.milestones.length - 1 && (
                  <div className="absolute left-[9px] top-5 w-0.5 h-full -mt-1 bg-muted"></div>
                )}
                
                {/* Milestone Icon */}
                <div className="absolute left-0 top-0.5">
                  {icon}
                </div>
                
                {/* Milestone Content */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <h4 className={cn("font-medium", textColor)}>{milestone.name}</h4>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(milestone.plannedStartDate)} - {formatDate(milestone.plannedEndDate)}
                    </span>
                  </div>
                  
                  {milestone.description && (
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  )}
                  
                  {milestone.status === "in_progress" && milestone.actualStartDate && (
                    <div className="text-xs text-info">
                      Started {formatDate(milestone.actualStartDate)}
                    </div>
                  )}
                  
                  {milestone.status === "completed" && milestone.actualEndDate && (
                    <div className="text-xs text-success">
                      Completed {formatDate(milestone.actualEndDate)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectProgress;
