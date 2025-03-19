
import ResourcesLayout from "@/components/layout/ResourcesLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import SlopeDrainageCalculator from "@/components/calculators/SlopeDrainageCalculator";
import AngleFinder from "@/components/calculators/AngleFinder";
import AreaCalculator from "@/components/calculators/AreaCalculator";
import DeckBoardCalculator from "@/components/calculators/DeckBoardCalculator";
import FastenerCalculator from "@/components/calculators/FastenerCalculator";
import JoistCalculator from "@/components/calculators/JoistCalculator";
import LoadCalculator from "@/components/calculators/LoadCalculator";
import MaterialsCostCalculator from "@/components/calculators/MaterialsCostCalculator";
import ProjectCostEstimator from "@/components/calculators/ProjectCostEstimator";
import ProjectTimelineGenerator from "@/components/calculators/ProjectTimelineGenerator";
import WeatherImpactCalculator from "@/components/calculators/WeatherImpactCalculator";
import BlueprintAnalyzer from "@/components/calculators/BlueprintAnalyzer";
import { 
  FileStack, 
  Droplets, 
  Weight, 
  Hammer, 
  SquareStack, 
  Screwdriver, 
  AreaChart, 
  Compass, 
  DollarSign, 
  Calculator, 
  CalendarDays, 
  CloudRain 
} from "lucide-react";

const Tools = () => {
  return (
    <ResourcesLayout title="Tools & Calculators">
      <p className="text-slate-600 mb-6">
        Use these tools and calculators to help plan and execute your construction projects efficiently.
      </p>
      
      <Tabs defaultValue="blueprint">
        <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-transparent">
          <TabsTrigger value="blueprint" className="data-[state=active]:bg-slate data-[state=active]:text-white flex items-center gap-1">
            <FileStack className="h-4 w-4" />
            <span>Blueprint Analyzer</span>
          </TabsTrigger>
          <TabsTrigger value="slope" className="data-[state=active]:bg-slate data-[state=active]:text-white flex items-center gap-1">
            <Droplets className="h-4 w-4" />
            <span>Slope & Drainage</span>
          </TabsTrigger>
          <TabsTrigger value="load" className="data-[state=active]:bg-slate data-[state=active]:text-white flex items-center gap-1">
            <Weight className="h-4 w-4" />
            <span>Load Calculator</span>
          </TabsTrigger>
          <TabsTrigger value="joist" className="data-[state=active]:bg-slate data-[state=active]:text-white flex items-center gap-1">
            <Hammer className="h-4 w-4" />
            <span>Joist Calculator</span>
          </TabsTrigger>
          <TabsTrigger value="deckboard" className="data-[state=active]:bg-slate data-[state=active]:text-white flex items-center gap-1">
            <SquareStack className="h-4 w-4" />
            <span>Deck Board</span>
          </TabsTrigger>
          <TabsTrigger value="fastener" className="data-[state=active]:bg-slate data-[state=active]:text-white flex items-center gap-1">
            <Screwdriver className="h-4 w-4" />
            <span>Fastener</span>
          </TabsTrigger>
          <TabsTrigger value="area" className="data-[state=active]:bg-slate data-[state=active]:text-white flex items-center gap-1">
            <AreaChart className="h-4 w-4" />
            <span>Area</span>
          </TabsTrigger>
          <TabsTrigger value="angle" className="data-[state=active]:bg-slate data-[state=active]:text-white flex items-center gap-1">
            <Compass className="h-4 w-4" />
            <span>Angle Finder</span>
          </TabsTrigger>
          <TabsTrigger value="materials" className="data-[state=active]:bg-slate data-[state=active]:text-white flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span>Materials Cost</span>
          </TabsTrigger>
          <TabsTrigger value="project" className="data-[state=active]:bg-slate data-[state=active]:text-white flex items-center gap-1">
            <Calculator className="h-4 w-4" />
            <span>Project Cost</span>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-slate data-[state=active]:text-white flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <span>Timeline</span>
          </TabsTrigger>
          <TabsTrigger value="weather" className="data-[state=active]:bg-slate data-[state=active]:text-white flex items-center gap-1">
            <CloudRain className="h-4 w-4" />
            <span>Weather Impact</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="blueprint">
            <BlueprintAnalyzer />
          </TabsContent>
          <TabsContent value="slope">
            <SlopeDrainageCalculator />
          </TabsContent>
          <TabsContent value="load">
            <LoadCalculator />
          </TabsContent>
          <TabsContent value="joist">
            <JoistCalculator />
          </TabsContent>
          <TabsContent value="deckboard">
            <DeckBoardCalculator />
          </TabsContent>
          <TabsContent value="fastener">
            <FastenerCalculator />
          </TabsContent>
          <TabsContent value="area">
            <AreaCalculator />
          </TabsContent>
          <TabsContent value="angle">
            <AngleFinder />
          </TabsContent>
          <TabsContent value="materials">
            <MaterialsCostCalculator />
          </TabsContent>
          <TabsContent value="project">
            <ProjectCostEstimator />
          </TabsContent>
          <TabsContent value="timeline">
            <ProjectTimelineGenerator />
          </TabsContent>
          <TabsContent value="weather">
            <WeatherImpactCalculator />
          </TabsContent>
        </div>
      </Tabs>
    </ResourcesLayout>
  );
};

export default Tools;
