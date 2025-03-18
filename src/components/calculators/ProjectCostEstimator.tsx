
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Info } from "lucide-react";

const ProjectCostEstimator = () => {
  const [area, setArea] = useState<number>(200);
  const [deckMaterial, setDeckMaterial] = useState<string>("pt");
  const [railingType, setRailingType] = useState<string>("wood");
  const [includeStairs, setIncludeStairs] = useState<boolean>(false);
  const [stairCount, setStairCount] = useState<number>(3);
  const [includeLighting, setIncludeLighting] = useState<boolean>(false);
  const [includeSealing, setIncludeSealing] = useState<boolean>(true);
  const [results, setResults] = useState<{
    materials: number;
    labor: number;
    total: number;
    breakdown: Record<string, number>;
  } | null>(null);

  // Canadian material costs per square foot (in CAD)
  const materialCosts = {
    pt: 8.50, // Pressure treated
    cedar: 15.75, // Cedar
    composite: 22.50, // Composite
    exotic: 28.00, // Exotic hardwood
  };

  const railingCosts = {
    none: 0,
    wood: 25, // Per linear foot
    metal: 45, // Per linear foot
    glass: 85, // Per linear foot
  };

  const calculateCost = () => {
    // Basic material cost
    const baseMaterialCost = area * materialCosts[deckMaterial as keyof typeof materialCosts];
    
    // Railing (perimeter × cost)
    const perimeter = Math.sqrt(area) * 4; // Approximation
    const railingCost = perimeter * railingCosts[railingType as keyof typeof railingCosts];
    
    // Stairs
    const stairCost = includeStairs ? stairCount * 150 : 0; // $150 per stair
    
    // Lighting
    const lightingCost = includeLighting ? area * 3.5 : 0; // $3.50 per sq ft
    
    // Sealing/Staining
    const sealingCost = includeSealing ? area * 2 : 0; // $2 per sq ft
    
    // Labor (estimated at 50% of material costs)
    const materialTotalCost = baseMaterialCost + railingCost + stairCost + lightingCost + sealingCost;
    const laborCost = materialTotalCost * 0.5;
    
    // Total cost
    const totalCost = materialTotalCost + laborCost;
    
    setResults({
      materials: parseFloat(materialTotalCost.toFixed(2)),
      labor: parseFloat(laborCost.toFixed(2)),
      total: parseFloat(totalCost.toFixed(2)),
      breakdown: {
        baseMaterials: parseFloat(baseMaterialCost.toFixed(2)),
        railing: parseFloat(railingCost.toFixed(2)),
        stairs: parseFloat(stairCost.toFixed(2)),
        lighting: parseFloat(lightingCost.toFixed(2)),
        sealing: parseFloat(sealingCost.toFixed(2))
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Project Cost Estimator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="area">Deck Area (sq ft)</Label>
          <Input
            id="area"
            type="number"
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            min={1}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="deckMaterial">Decking Material</Label>
          <Select
            value={deckMaterial}
            onValueChange={(value) => setDeckMaterial(value)}
          >
            <SelectTrigger id="deckMaterial">
              <SelectValue placeholder="Select decking material" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pt">Pressure Treated ($8.50/sq ft)</SelectItem>
              <SelectItem value="cedar">Cedar ($15.75/sq ft)</SelectItem>
              <SelectItem value="composite">Composite ($22.50/sq ft)</SelectItem>
              <SelectItem value="exotic">Exotic Hardwood ($28.00/sq ft)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="railingType">Railing Type</Label>
          <Select
            value={railingType}
            onValueChange={(value) => setRailingType(value)}
          >
            <SelectTrigger id="railingType">
              <SelectValue placeholder="Select railing type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Railing</SelectItem>
              <SelectItem value="wood">Wood ($25/linear ft)</SelectItem>
              <SelectItem value="metal">Metal ($45/linear ft)</SelectItem>
              <SelectItem value="glass">Glass ($85/linear ft)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="includeStairs" 
            checked={includeStairs}
            onCheckedChange={(checked) => setIncludeStairs(checked === true)}
          />
          <Label htmlFor="includeStairs" className="cursor-pointer">Include Stairs ($150 each)</Label>
        </div>

        {includeStairs && (
          <div className="space-y-2 pl-6">
            <Label htmlFor="stairCount">Number of Steps</Label>
            <Input
              id="stairCount"
              type="number"
              value={stairCount}
              onChange={(e) => setStairCount(Number(e.target.value))}
              min={1}
            />
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="includeLighting" 
            checked={includeLighting}
            onCheckedChange={(checked) => setIncludeLighting(checked === true)}
          />
          <Label htmlFor="includeLighting" className="cursor-pointer">Include Lighting ($3.50/sq ft)</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="includeSealing" 
            checked={includeSealing}
            onCheckedChange={(checked) => setIncludeSealing(checked === true)}
          />
          <Label htmlFor="includeSealing" className="cursor-pointer">Include Sealing/Staining ($2/sq ft)</Label>
        </div>

        <Button className="w-full bg-forest hover:bg-forest/90" onClick={calculateCost}>
          <DollarSign className="h-4 w-4 mr-2" />
          Estimate Cost
        </Button>

        {results && (
          <div className="mt-4 p-4 bg-slate-50 rounded-md">
            <h3 className="font-medium mb-2">Cost Estimate (CAD)</h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Material Breakdown:</div>
                <div className="pl-2 text-sm grid grid-cols-2 gap-1">
                  <div>Base Materials:</div>
                  <div className="text-right">${results.breakdown.baseMaterials}</div>
                  <div>Railing:</div>
                  <div className="text-right">${results.breakdown.railing}</div>
                  {results.breakdown.stairs > 0 && (
                    <>
                      <div>Stairs:</div>
                      <div className="text-right">${results.breakdown.stairs}</div>
                    </>
                  )}
                  {results.breakdown.lighting > 0 && (
                    <>
                      <div>Lighting:</div>
                      <div className="text-right">${results.breakdown.lighting}</div>
                    </>
                  )}
                  {results.breakdown.sealing > 0 && (
                    <>
                      <div>Sealing/Staining:</div>
                      <div className="text-right">${results.breakdown.sealing}</div>
                    </>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-1">
                <div>Materials Subtotal:</div>
                <div className="text-right font-medium">${results.materials}</div>
                <div>Labor Estimate:</div>
                <div className="text-right font-medium">${results.labor}</div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-1 text-lg">
                <div className="font-medium">Total Estimate:</div>
                <div className="text-right font-bold">${results.total}</div>
              </div>
              
              <div className="text-xs text-muted-foreground pt-2">
                *HST/GST/PST not included. Prices based on Canadian national averages as of 2023.
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground flex gap-2">
        <Info className="h-4 w-4" />
        <span>Based on Canadian market prices and standards</span>
      </CardFooter>
    </Card>
  );
};

export default ProjectCostEstimator;
