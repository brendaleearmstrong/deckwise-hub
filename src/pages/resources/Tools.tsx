
import ResourcesLayout from "@/components/layout/ResourcesLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      
      <Tabs defaultValue="materials" className="w-full">
        <TabsList className="mb-4 w-full overflow-x-auto flex whitespace-nowrap h-auto py-1 px-1 justify-start md:justify-center">
          <TabsTrigger value="materials" className="flex-shrink-0 py-2">Material Calculators</TabsTrigger>
          <TabsTrigger value="cost" className="flex-shrink-0 py-2">Cost Estimators</TabsTrigger>
          <TabsTrigger value="measurement" className="flex-shrink-0 py-2">Measurement Tools</TabsTrigger>
          <TabsTrigger value="scheduling" className="flex-shrink-0 py-2">Scheduling Tools</TabsTrigger>
        </TabsList>
        
        {/* Material Calculators */}
        <TabsContent value="materials">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DeckBoardCalculator />
            <JoistCalculator />
          </div>
        </TabsContent>
        
        {/* Cost Estimators */}
        <TabsContent value="cost">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCostEstimator />
            <MaterialsCostCalculator />
          </div>
        </TabsContent>
        
        {/* Measurement Tools */}
        <TabsContent value="measurement">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AreaCalculator />
            <AngleFinder />
          </div>
        </TabsContent>
        
        {/* Scheduling Tools */}
        <TabsContent value="scheduling">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectTimelineGenerator />
            <WeatherImpactCalculator />
          </div>
        </TabsContent>
      </Tabs>
    </ResourcesLayout>
  );
};

export default Tools;
