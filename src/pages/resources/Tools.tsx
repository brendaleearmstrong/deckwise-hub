
import ResourcesLayout from "@/components/layout/ResourcesLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Calculator, Ruler, SquareGantt } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Tools = () => {
  return (
    <ResourcesLayout title="Tools & Calculators">
      <p className="text-slate-600 mb-6">
        Access tools and calculators to help plan your projects, estimate materials, and convert measurements.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg flex items-center gap-2">
                  {getToolIcon(tool.icon)}
                  {tool.name}
                </CardTitle>
                <Badge variant={tool.premium ? "secondary" : "outline"}>
                  {tool.premium ? "Premium" : "Free"}
                </Badge>
              </div>
              <CardDescription>{tool.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">{tool.description}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-forest text-white hover:bg-forest/90">
                Open Tool
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </ResourcesLayout>
  );
};

// Helper function to get the appropriate icon
const getToolIcon = (iconName: string) => {
  switch (iconName) {
    case "calculator":
      return <Calculator className="h-5 w-5 text-forest" />;
    case "ruler":
      return <Ruler className="h-5 w-5 text-forest" />;
    case "wrench":
      return <Wrench className="h-5 w-5 text-forest" />;
    case "gantt":
      return <SquareGantt className="h-5 w-5 text-forest" />;
    default:
      return <Wrench className="h-5 w-5 text-forest" />;
  }
};

// Mock data
const tools = [
  {
    name: "Deck Material Calculator",
    description: "Calculate exact lumber, fasteners, and hardware needed for your deck project.",
    category: "Material Estimation",
    icon: "calculator",
    premium: false
  },
  {
    name: "Board Foot Calculator",
    description: "Convert between linear feet, board feet, and get pricing estimates.",
    category: "Measurement",
    icon: "ruler",
    premium: false
  },
  {
    name: "Joist Spacing Tool",
    description: "Calculate optimal joist spacing based on deck dimensions and load requirements.",
    category: "Structural",
    icon: "wrench",
    premium: false
  },
  {
    name: "Project Timeline Generator",
    description: "Create detailed project timelines with task dependencies and resource allocation.",
    category: "Project Management",
    icon: "gantt",
    premium: true
  },
  {
    name: "Deck Cost Estimator",
    description: "Generate detailed cost breakdowns for deck projects based on materials and labor.",
    category: "Estimation",
    icon: "calculator",
    premium: true
  },
  {
    name: "Lumber Cut Optimizer",
    description: "Minimize waste by calculating the most efficient cutting patterns for lumber.",
    category: "Optimization",
    icon: "wrench",
    premium: false
  }
];

export default Tools;
