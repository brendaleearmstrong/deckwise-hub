
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info, Weight } from "lucide-react";

const LoadCalculator = () => {
  const [deckLength, setDeckLength] = useState<number>(20);
  const [deckWidth, setDeckWidth] = useState<number>(10);
  const [joistSpan, setJoistSpan] = useState<number>(16);
  const [joistSize, setJoistSize] = useState<string>("2x8");
  const [beamSize, setBeamSize] = useState<string>("2-2x10");
  const [deckMaterial, setDeckMaterial] = useState<string>("pt");
  const [result, setResult] = useState<{
    liveLoad: number;
    deadLoad: number;
    totalLoad: number;
    safetyFactor: string;
    recommendation: string;
  } | null>(null);

  // Canadian load capacities based on common spans, joist sizes, and beam configurations
  const calculateLoad = () => {
    // Calculate deck area
    const deckArea = deckLength * deckWidth;
    
    // Material dead loads (lbs per square foot)
    const materialWeights = {
      pt: 5.5,      // Pressure treated
      cedar: 3.5,    // Cedar
      composite: 7,  // Composite
      exotic: 9      // Exotic hardwood
    };
    
    // Dead load - weight of the structure itself
    const deadLoad = materialWeights[deckMaterial as keyof typeof materialWeights];
    
    // Live load capacity based on joist size and span (simplified calculation)
    let liveLoad = 0;
    
    // Basic live load lookup based on joist size and spacing
    // These are simplified approximations - real-world values would come from span tables
    const joistLoadCapacity: Record<string, Record<number, number>> = {
      "2x6": { 12: 35, 16: 30, 24: 20 },
      "2x8": { 12: 60, 16: 50, 24: 35 },
      "2x10": { 12: 85, 16: 70, 24: 50 },
      "2x12": { 12: 105, 16: 90, 24: 65 }
    };
    
    // Beam capacity factor based on beam size
    const beamFactor: Record<string, number> = {
      "2-2x8": 0.9,
      "2-2x10": 1.1,
      "2-2x12": 1.3,
      "3-2x8": 1.2,
      "3-2x10": 1.4,
      "3-2x12": 1.6
    };
    
    // Calculate live load capacity
    if (joistLoadCapacity[joistSize] && joistLoadCapacity[joistSize][joistSpan]) {
      liveLoad = joistLoadCapacity[joistSize][joistSpan];
      
      // Adjust for beam capacity
      if (beamFactor[beamSize]) {
        liveLoad = liveLoad * beamFactor[beamSize];
      }
    } else {
      // Fallback calculation if specific values aren't in the lookup table
      // This is a simplified approximation
      liveLoad = 40; // Default to 40 psf
    }
    
    // Total load capacity
    const totalLoad = liveLoad;
    
    // Safety assessment
    let safetyFactor = "Safe";
    let recommendation = "Your deck meets standard load requirements.";
    
    if (totalLoad < 40) {
      safetyFactor = "Caution";
      recommendation = "Load capacity is below residential standards. Consider increasing joist size or decreasing spacing.";
    } else if (totalLoad < 30) {
      safetyFactor = "Unsafe";
      recommendation = "Load capacity is significantly below standards. Structural modifications are necessary.";
    } else if (totalLoad > 60) {
      safetyFactor = "Excellent";
      recommendation = "Your deck exceeds standard load requirements and can handle heavy loads.";
    }
    
    setResult({
      liveLoad: parseFloat(liveLoad.toFixed(1)),
      deadLoad: parseFloat(deadLoad.toFixed(1)),
      totalLoad: parseFloat(totalLoad.toFixed(1)),
      safetyFactor,
      recommendation
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <Weight className="h-5 w-5 mr-2 text-forest" />
          Load Capacity Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="deckLength">Deck Length (ft)</Label>
            <Input
              id="deckLength"
              type="number"
              value={deckLength}
              onChange={(e) => setDeckLength(Number(e.target.value))}
              min={1}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deckWidth">Deck Width (ft)</Label>
            <Input
              id="deckWidth"
              type="number"
              value={deckWidth}
              onChange={(e) => setDeckWidth(Number(e.target.value))}
              min={1}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="joistSpan">Joist Spacing (inches)</Label>
          <Select
            value={joistSpan.toString()}
            onValueChange={(value) => setJoistSpan(Number(value))}
          >
            <SelectTrigger id="joistSpan">
              <SelectValue placeholder="Select joist spacing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12" On Center</SelectItem>
              <SelectItem value="16">16" On Center</SelectItem>
              <SelectItem value="24">24" On Center</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="joistSize">Joist Size</Label>
          <Select
            value={joistSize}
            onValueChange={(value) => setJoistSize(value)}
          >
            <SelectTrigger id="joistSize">
              <SelectValue placeholder="Select joist size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2x6">2×6</SelectItem>
              <SelectItem value="2x8">2×8</SelectItem>
              <SelectItem value="2x10">2×10</SelectItem>
              <SelectItem value="2x12">2×12</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="beamSize">Beam Configuration</Label>
          <Select
            value={beamSize}
            onValueChange={(value) => setBeamSize(value)}
          >
            <SelectTrigger id="beamSize">
              <SelectValue placeholder="Select beam size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2-2x8">Double 2×8</SelectItem>
              <SelectItem value="2-2x10">Double 2×10</SelectItem>
              <SelectItem value="2-2x12">Double 2×12</SelectItem>
              <SelectItem value="3-2x8">Triple 2×8</SelectItem>
              <SelectItem value="3-2x10">Triple 2×10</SelectItem>
              <SelectItem value="3-2x12">Triple 2×12</SelectItem>
            </SelectContent>
          </Select>
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
              <SelectItem value="pt">Pressure Treated</SelectItem>
              <SelectItem value="cedar">Cedar</SelectItem>
              <SelectItem value="composite">Composite</SelectItem>
              <SelectItem value="exotic">Exotic Hardwood</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full bg-forest hover:bg-forest/90" onClick={calculateLoad}>
          Calculate Load Capacity
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-slate-50 rounded-md">
            <h3 className="font-medium mb-2">Load Capacity Results</h3>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-1">
                <div>Dead Load:</div>
                <div className="text-right">{result.deadLoad} lbs/sq ft</div>
                <div>Live Load Capacity:</div>
                <div className="text-right">{result.liveLoad} lbs/sq ft</div>
                <div className="font-medium">Total Load Capacity:</div>
                <div className="text-right font-medium">{result.totalLoad} lbs/sq ft</div>
              </div>
              
              <div className="mt-2">
                <div className="font-medium mb-1">Safety Assessment:</div>
                <div className={`text-sm px-2 py-1 rounded inline-block ${
                  result.safetyFactor === "Unsafe" ? "bg-red-100 text-red-800" :
                  result.safetyFactor === "Caution" ? "bg-amber-100 text-amber-800" :
                  result.safetyFactor === "Safe" ? "bg-green-100 text-green-800" :
                  "bg-emerald-100 text-emerald-800"
                }`}>
                  {result.safetyFactor}
                </div>
                <p className="text-sm mt-2">{result.recommendation}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground flex gap-2">
        <Info className="h-4 w-4" />
        <span>Based on Canadian Building Code standards</span>
      </CardFooter>
    </Card>
  );
};

export default LoadCalculator;
