
import ResourcesLayout from "@/components/layout/ResourcesLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Ruler, Scale, Calendar } from "lucide-react";

const Tools = () => {
  return (
    <ResourcesLayout title="Tools & Calculators">
      <p className="text-slate-600 mb-6">
        Calculate materials, measurements, and costs for your decking and construction projects.
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Calculator className="h-8 w-8 text-forest" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Deck Board Calculator</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Calculate how many deck boards you'll need based on your deck dimensions.
                    </p>
                    <button className="text-sm text-forest hover:underline">
                      Open Calculator →
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Calculator className="h-8 w-8 text-forest" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Joist Calculator</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Determine joist spacing and quantity based on deck size and loading requirements.
                    </p>
                    <button className="text-sm text-forest hover:underline">
                      Open Calculator →
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Cost Estimators */}
        <TabsContent value="cost">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Scale className="h-8 w-8 text-forest" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Project Cost Estimator</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Get a comprehensive cost breakdown for your entire deck project.
                    </p>
                    <button className="text-sm text-forest hover:underline">
                      Open Estimator →
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Scale className="h-8 w-8 text-forest" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Materials Cost Calculator</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Calculate the cost of materials based on current market prices and your quantities.
                    </p>
                    <button className="text-sm text-forest hover:underline">
                      Open Calculator →
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Measurement Tools */}
        <TabsContent value="measurement">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Ruler className="h-8 w-8 text-forest" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Area Calculator</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Calculate the square footage of irregular deck shapes and spaces.
                    </p>
                    <button className="text-sm text-forest hover:underline">
                      Open Calculator →
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Ruler className="h-8 w-8 text-forest" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Angle Finder</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Calculate angles for custom deck designs and miter cuts.
                    </p>
                    <button className="text-sm text-forest hover:underline">
                      Open Tool →
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Scheduling Tools */}
        <TabsContent value="scheduling">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Calendar className="h-8 w-8 text-forest" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Project Timeline Generator</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Create a realistic timeline for your deck construction project based on size and complexity.
                    </p>
                    <button className="text-sm text-forest hover:underline">
                      Open Generator →
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Calendar className="h-8 w-8 text-forest" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Weather Impact Calculator</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Estimate how weather conditions might affect your project timeline.
                    </p>
                    <button className="text-sm text-forest hover:underline">
                      Open Calculator →
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </ResourcesLayout>
  );
};

export default Tools;
