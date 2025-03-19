
import ResourcesLayout from "@/components/layout/ResourcesLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import DeckBoardCalculator from "@/components/calculators/DeckBoardCalculator";
import JoistCalculator from "@/components/calculators/JoistCalculator";
import ProjectCostEstimator from "@/components/calculators/ProjectCostEstimator";
import MaterialsCostCalculator from "@/components/calculators/MaterialsCostCalculator";
import AreaCalculator from "@/components/calculators/AreaCalculator";
import AngleFinder from "@/components/calculators/AngleFinder";
import ProjectTimelineGenerator from "@/components/calculators/ProjectTimelineGenerator";
import WeatherImpactCalculator from "@/components/calculators/WeatherImpactCalculator";
import LoadCalculator from "@/components/calculators/LoadCalculator";
import SlopeDrainageCalculator from "@/components/calculators/SlopeDrainageCalculator";
import FastenerCalculator from "@/components/calculators/FastenerCalculator";

const Tools = () => {
  const isMobile = useIsMobile();
  
  return (
    <ResourcesLayout title="Tools & Calculators">
      <p className="text-slate-600 mb-6">
        Calculate materials, measurements, and costs for your decking and construction projects using Canadian standards.
      </p>
      
      <Tabs defaultValue="materials" className="w-full">
        <div className="max-w-full overflow-hidden">
          <ScrollArea className="w-full">
            <TabsList className="mb-4 h-auto w-auto inline-flex whitespace-nowrap py-1 px-1">
              <TabsTrigger value="materials" className="py-2">Material Calculators</TabsTrigger>
              <TabsTrigger value="cost" className="py-2">Cost Estimators</TabsTrigger>
              <TabsTrigger value="measurement" className="py-2">Measurement Tools</TabsTrigger>
              <TabsTrigger value="structural" className="py-2">Structural Tools</TabsTrigger>
              <TabsTrigger value="scheduling" className="py-2">Scheduling Tools</TabsTrigger>
            </TabsList>
          </ScrollArea>
        </div>
        
        {/* Material Calculators */}
        <TabsContent value="materials">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DeckBoardCalculator />
            <JoistCalculator />
            <FastenerCalculator />
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
            <SlopeDrainageCalculator />
          </div>
        </TabsContent>
        
        {/* Structural Tools */}
        <TabsContent value="structural">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LoadCalculator />
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
