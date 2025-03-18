
import ResourcesLayout from "@/components/layout/ResourcesLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Ruler, Scale, Calendar } from "lucide-react";
import DeckBoardCalculator from "@/components/calculators/DeckBoardCalculator";
import JoistCalculator from "@/components/calculators/JoistCalculator";
import ProjectCostEstimator from "@/components/calculators/ProjectCostEstimator";
import MaterialsCostCalculator from "@/components/calculators/MaterialsCostCalculator";
import AreaCalculator from "@/components/calculators/AreaCalculator";
import AngleFinder from "@/components/calculators/AngleFinder";
import ProjectTimelineGenerator from "@/components/calculators/ProjectTimelineGenerator";
import WeatherImpactCalculator from "@/components/calculators/WeatherImpactCalculator";

const Tools = () => {
  return (
    <ResourcesLayout title="Tools & Calculators">
      <p className="text-slate-600 mb-6">
        Calculate materials, measurements, and costs for your decking and construction projects using Canadian standards.
      </p>
      
      <Tabs defaultValue="materials">
        <TabsList className="mb-4">
          <TabsTrigger value="materials">Material Calculators</TabsTrigger>
          <TabsTrigger value="cost">Cost Estimators</TabsTrigger>
          <TabsTrigger value="measurement">Measurement Tools</TabsTrigger>
          <TabsTrigger value="scheduling">Scheduling Tools</TabsTrigger>
        </TabsList>
        
        {/* Material Calculators */}
        <TabsContent value="materials">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DeckBoardCalculator />
            <JoistCalculator />
          </div>
        </TabsContent>
        
        {/* Cost Estimators */}
        <TabsContent value="cost">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProjectCostEstimator />
            <MaterialsCostCalculator />
          </div>
        </TabsContent>
        
        {/* Measurement Tools */}
        <TabsContent value="measurement">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AreaCalculator />
            <AngleFinder />
          </div>
        </TabsContent>
        
        {/* Scheduling Tools */}
        <TabsContent value="scheduling">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProjectTimelineGenerator />
            <WeatherImpactCalculator />
          </div>
        </TabsContent>
      </Tabs>
    </ResourcesLayout>
  );
};

export default Tools;
