
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, TrendingUp, AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Insight {
  id: string;
  type: "suggestion" | "prediction" | "alert" | "efficiency";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
}

const MLInsights = () => {
  // Mock insights that would typically come from ML models
  const insights: Insight[] = [
    {
      id: "ins1",
      type: "prediction",
      title: "Weather Delay Predicted",
      description: "Our AI predicts a 70% chance of rain delays for the Johnson project next week. Consider rescheduling critical outdoor tasks.",
      impact: "high",
    },
    {
      id: "ins2",
      type: "efficiency",
      title: "Material Optimization",
      description: "Switching to 16ft boards on the Smith deck could reduce waste by 15% and save approximately $320.",
      impact: "medium",
    },
    {
      id: "ins3",
      type: "alert",
      title: "Budget Risk Detected",
      description: "The Wilson project is trending 8% over budget, primarily due to recent material price increases.",
      impact: "high",
    },
    {
      id: "ins4",
      type: "suggestion",
      title: "Schedule Optimization",
      description: "Reordering tasks for the Thomas pergola could reduce project duration by 2 days.",
      impact: "medium",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "prediction":
        return <TrendingUp className="h-4 w-4" />;
      case "efficiency":
        return <Lightbulb className="h-4 w-4" />;
      case "alert":
        return <AlertTriangle className="h-4 w-4" />;
      case "suggestion":
        return <Clock className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-destructive";
      case "medium":
        return "text-amber-500";
      case "low":
        return "text-green-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">ML Insights & Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className="border rounded-lg p-3 shadow-sm hover:shadow transition-all">
              <div className="flex justify-between items-start gap-2">
                <div className="flex gap-2 items-center">
                  <div className={cn("p-1.5 rounded-full bg-muted", getImpactColor(insight.impact))}>
                    {getIcon(insight.type)}
                  </div>
                  <h3 className="font-medium">{insight.title}</h3>
                </div>
                <div className={cn("text-xs px-2 py-1 rounded-full font-medium", 
                  insight.impact === "high" ? "bg-destructive/10 text-destructive" :
                  insight.impact === "medium" ? "bg-amber-500/10 text-amber-500" :
                  "bg-green-500/10 text-green-500"
                )}>
                  {insight.impact.charAt(0).toUpperCase() + insight.impact.slice(1)} Impact
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{insight.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MLInsights;
