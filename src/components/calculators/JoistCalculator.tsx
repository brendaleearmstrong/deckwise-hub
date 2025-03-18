
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";

const JoistCalculator = () => {
  const [length, setLength] = useState<number>(16);
  const [width, setWidth] = useState<number>(12);
  const [joistSize, setJoistSize] = useState<string>("2x8");
  const [loadType, setLoadType] = useState<string>("residential");
  const [results, setResults] = useState<{ spacing: number; quantity: number; totalLength: number } | null>(null);

  // Canadian National Building Code spacing recommendations
  const getRecommendedSpacing = () => {
    const spacingMap: Record<string, Record<string, number>> = {
      "2x6": { "residential": 12, "commercial": 8 },
      "2x8": { "residential": 16, "commercial": 12 },
      "2x10": { "residential": 24, "commercial": 16 },
      "2x12": { "residential": 24, "commercial": 24 }
    };
    
    return spacingMap[joistSize]?.[loadType] || 16;
  };

  const calculateJoists = () => {
    // Convert feet to inches for calculations
    const lengthInches = length * 12;
    const widthInches = width * 12;
    
    // Get recommended spacing based on Canadian standards
    const spacing = getRecommendedSpacing();
    
    // Calculate number of joists (perpendicular to length)
    const numberOfJoists = Math.ceil(lengthInches / spacing) + 1; // +1 for the end joist
    
    // Total linear feet of joists
    const totalLengthFeet = (numberOfJoists * width);
    
    setResults({
      spacing,
      quantity: numberOfJoists,
      totalLength: parseFloat(totalLengthFeet.toFixed(2))
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Joist Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="joist-length">Deck Length (ft)</Label>
            <Input
              id="joist-length"
              type="number"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              min={1}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="joist-width">Deck Width (ft)</Label>
            <Input
              id="joist-width"
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              min={1}
            />
          </div>
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
              <SelectItem value="2x6">2x6</SelectItem>
              <SelectItem value="2x8">2x8</SelectItem>
              <SelectItem value="2x10">2x10</SelectItem>
              <SelectItem value="2x12">2x12</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="loadType">Deck Type</Label>
          <Select
            value={loadType}
            onValueChange={(value) => setLoadType(value)}
          >
            <SelectTrigger id="loadType">
              <SelectValue placeholder="Select load type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential (40 psf)</SelectItem>
              <SelectItem value="commercial">Commercial/High Traffic (60 psf)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full bg-forest hover:bg-forest/90" onClick={calculateJoists}>
          Calculate
        </Button>

        {results && (
          <div className="mt-4 p-4 bg-slate-50 rounded-md">
            <h3 className="font-medium mb-2">Results (Canadian Standards)</h3>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-between">
                <span>Recommended Joist Spacing:</span>
                <span className="font-medium">{results.spacing}" on center</span>
              </div>
              <div className="flex justify-between">
                <span>Number of Joists Required:</span>
                <span className="font-medium">{results.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Linear Feet:</span>
                <span className="font-medium">{results.totalLength} ft</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground flex gap-2">
        <Info className="h-4 w-4" />
        <span>Based on the Canadian National Building Code requirements</span>
      </CardFooter>
    </Card>
  );
};

export default JoistCalculator;
