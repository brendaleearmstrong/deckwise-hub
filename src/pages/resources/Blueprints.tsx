
import ResourcesLayout from "@/components/layout/ResourcesLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Download, Eye, FileCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlueprintAnalyzer from "@/components/calculators/BlueprintAnalyzer";

const Blueprints = () => {
  return (
    <ResourcesLayout title="Blueprints">
      <Tabs defaultValue="your-blueprints" className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-transparent mb-6">
          <TabsTrigger value="your-blueprints" className="data-[state=active]:bg-slate data-[state=active]:text-white flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>Your Blueprints</span>
          </TabsTrigger>
          <TabsTrigger value="standard-blueprints" className="data-[state=active]:bg-slate data-[state=active]:text-white flex items-center gap-1">
            <FileCheck className="h-4 w-4" />
            <span>Armstrong Standard Blueprints</span>
          </TabsTrigger>
          <TabsTrigger value="analyzer" className="data-[state=active]:bg-slate data-[state=active]:text-white flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>Blueprint Analyzer</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="your-blueprints">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <p className="text-slate-600 max-w-full overflow-hidden">
              Manage your deck and structure blueprints. Upload new designs or access existing ones.
            </p>
            <Button className="bg-slate text-white hover:bg-slate/90 whitespace-nowrap">
              <Upload className="h-4 w-4 mr-2" /> Upload New
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {userBlueprints.map((blueprint, index) => (
              <Card key={index} className="flex flex-col h-full w-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-slate flex-shrink-0" />
                    <span className="truncate">{blueprint.name}</span>
                  </CardTitle>
                  <CardDescription>{blueprint.date}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2 flex-grow">
                  <div className="aspect-video bg-slate-100 rounded-md flex items-center justify-center mb-2">
                    <img 
                      src={blueprint.thumbnail} 
                      alt={blueprint.name}
                      className="h-full w-full object-cover rounded-md"
                    />
                  </div>
                  <p className="text-sm text-slate-600">{blueprint.description}</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="standard-blueprints">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <p className="text-slate-600 max-w-full overflow-hidden">
              Browse Armstrong's standard blueprint collection for decks, pergolas, and other outdoor structures.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {standardBlueprints.map((blueprint, index) => (
              <Card key={index} className="flex flex-col h-full w-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileCheck className="h-5 w-5 text-slate flex-shrink-0" />
                      <span className="truncate">{blueprint.name}</span>
                    </CardTitle>
                    <span className="bg-slate/10 text-slate text-xs px-2 py-1 rounded-full">
                      Armstrong
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pb-2 flex-grow">
                  <div className="aspect-video bg-slate-100 rounded-md flex items-center justify-center mb-2">
                    <img 
                      src={blueprint.thumbnail} 
                      alt={blueprint.name}
                      className="h-full w-full object-cover rounded-md"
                    />
                  </div>
                  <p className="text-sm text-slate-600">{blueprint.description}</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" /> Preview
                  </Button>
                  <Button className="flex-1 bg-slate hover:bg-slate/90">
                    <Download className="h-4 w-4 mr-1" /> Use This
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="analyzer">
          <BlueprintAnalyzer />
        </TabsContent>
      </Tabs>
    </ResourcesLayout>
  );
};

// Mock data - Your blueprints
const userBlueprints = [
  {
    name: "Standard Deck Design",
    description: "12' x 16' pressure-treated wood deck with railings",
    date: "Mar 12, 2025",
    thumbnail: "/images/blueprints/deck-blueprint.jpg"
  },
  {
    name: "Pergola Design v2",
    description: "10' x 12' cedar pergola with lattice",
    date: "Mar 05, 2025",
    thumbnail: "/images/blueprints/pergola-blueprint.jpg"
  },
  {
    name: "Premium Deck Plan",
    description: "20' x 24' composite deck with built-in seating",
    date: "Feb 28, 2025",
    thumbnail: "/images/blueprints/premium-deck-blueprint.jpg"
  },
  {
    name: "Garden Shed",
    description: "8' x 10' storage shed with gambrel roof",
    date: "Feb 15, 2025",
    thumbnail: "/images/blueprints/shed-blueprint.jpg"
  }
];

// Mock data - Armstrong standard blueprints
const standardBlueprints = [
  {
    name: "Armstrong Standard Deck",
    description: "16' x 20' pressure-treated deck with composite railing system",
    thumbnail: "/images/blueprints/deck-blueprint.jpg"
  },
  {
    name: "Armstrong Luxury Pergola",
    description: "14' x 16' cedar pergola with built-in lighting",
    thumbnail: "/images/blueprints/pergola-blueprint.jpg"
  },
  {
    name: "Armstrong Elevated Deck",
    description: "12' x 24' elevated deck with stairs and privacy screen",
    thumbnail: "/images/blueprints/premium-deck-blueprint.jpg"
  },
  {
    name: "Armstrong Garden Pavilion",
    description: "12' x 12' octagonal pavilion with custom roof",
    thumbnail: "/images/blueprints/shed-blueprint.jpg"
  },
  {
    name: "Armstrong Pool Deck",
    description: "20' x 30' composite pool surround with integrated storage",
    thumbnail: "/images/blueprints/deck-blueprint.jpg"
  },
  {
    name: "Armstrong Modular Deck System",
    description: "Configurable deck system with multiple layout options",
    thumbnail: "/images/blueprints/premium-deck-blueprint.jpg"
  }
];

export default Blueprints;
