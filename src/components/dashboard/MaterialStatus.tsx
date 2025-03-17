
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project, Material } from "@/data/mockData";
import { CheckCircle2, Clock, ShoppingCart, Hammer } from "lucide-react";
import { cn } from "@/lib/utils";

interface MaterialStatusProps {
  projects: Project[];
}

const MaterialStatus = ({ projects }: MaterialStatusProps) => {
  // Flatten all materials from all projects
  const allMaterials = projects.flatMap(project => project.materials);
  
  // Count materials by status
  const statusCounts = {
    ordered: allMaterials.filter(m => m.status === "ordered").length,
    received: allMaterials.filter(m => m.status === "received").length,
    installed: allMaterials.filter(m => m.status === "installed").length,
    needed: allMaterials.filter(m => m.status === "needed").length,
  };
  
  // Calculate total cost for each status
  const calculateTotalCost = (status: string) => {
    return allMaterials
      .filter(m => m.status === status)
      .reduce((sum, material) => sum + material.totalPrice, 0);
  };
  
  const statusData = [
    {
      status: "needed",
      label: "Needed",
      count: statusCounts.needed,
      icon: <ShoppingCart className="h-4 w-4" />,
      color: "text-warning",
      cost: calculateTotalCost("needed"),
    },
    {
      status: "ordered",
      label: "Ordered",
      count: statusCounts.ordered,
      icon: <Clock className="h-4 w-4" />,
      color: "text-info",
      cost: calculateTotalCost("ordered"),
    },
    {
      status: "received",
      label: "Received",
      count: statusCounts.received,
      icon: <CheckCircle2 className="h-4 w-4" />,
      color: "text-success",
      cost: calculateTotalCost("received"),
    },
    {
      status: "installed",
      label: "Installed",
      count: statusCounts.installed,
      icon: <Hammer className="h-4 w-4" />,
      color: "text-primary",
      cost: calculateTotalCost("installed"),
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Material Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {statusData.map((item) => (
            <div key={item.status} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={cn("mr-2", item.color)}>{item.icon}</div>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{item.count}</span>
                <span className="text-xs text-muted-foreground">${item.cost.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialStatus;
