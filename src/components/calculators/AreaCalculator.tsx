
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info, Square, Triangle, Hexagon } from "lucide-react";

const AreaCalculator = () => {
  const [shape, setShape] = useState<string>("rectangle");
  const [length, setLength] = useState<number>(12);
  const [width, setWidth] = useState<number>(16);
  const [radius, setRadius] = useState<number>(10);
  const [result, setResult] = useState<{ area: number; perimeter: number } | null>(null);

  const calculateArea = () => {
    let area = 0;
    let perimeter = 0;
    
    // Convert feet to square meters for Canadian standards
    const lengthMeters = length * 0.3048;
    const widthMeters = width * 0.3048;
    const radiusMeters = radius * 0.3048;
    
    switch (shape) {
      case "rectangle":
        area = lengthMeters * widthMeters;
        perimeter = 2 * (lengthMeters + widthMeters);
        break;
      case "circle":
        area = Math.PI * radiusMeters * radiusMeters;
        perimeter = 2 * Math.PI * radiusMeters;
        break;
      case "triangle":
        // Assuming right-angled triangle
        area = 0.5 * lengthMeters * widthMeters;
        // Perimeter using Pythagorean theorem
        const hypotenuse = Math.sqrt(lengthMeters * lengthMeters + widthMeters * widthMeters);
        perimeter = lengthMeters + widthMeters + hypotenuse;
        break;
      case "octagon":
        // Approximation for regular octagon
        area = 2 * (1 + Math.sqrt(2)) * radiusMeters * radiusMeters;
        perimeter = 8 * radiusMeters * Math.sin(Math.PI / 8);
        break;
    }
    
    setResult({
      area: parseFloat(area.toFixed(2)),
      perimeter: parseFloat(perimeter.toFixed(2))
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Area Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="shape">Deck Shape</Label>
          <Select
            value={shape}
            onValueChange={(value) => setShape(value)}
          >
            <SelectTrigger id="shape">
              <SelectValue placeholder="Select deck shape" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rectangle">
                <div className="flex items-center gap-2">
                  <Square className="h-4 w-4" />
                  <span>Rectangle/Square</span>
                </div>
              </SelectItem>
              <SelectItem value="circle">
                <div className="flex items-center gap-2">
                  <Circle className="h-4 w-4" />
                  <span>Circle</span>
                </div>
              </SelectItem>
              <SelectItem value="triangle">
                <div className="flex items-center gap-2">
                  <Triangle className="h-4 w-4" />
                  <span>Triangle</span>
                </div>
              </SelectItem>
              <SelectItem value="octagon">
                <div className="flex items-center gap-2">
                  <Hexagon className="h-4 w-4" />
                  <span>Octagon</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(shape === "rectangle" || shape === "triangle") && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="length">{shape === "triangle" ? "Base" : "Length"} (ft)</Label>
              <Input
                id="length"
                type="number"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                min={0.1}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="width">{shape === "triangle" ? "Height" : "Width"} (ft)</Label>
              <Input
                id="width"
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                min={0.1}
              />
            </div>
          </div>
        )}

        {(shape === "circle" || shape === "octagon") && (
          <div className="space-y-2">
            <Label htmlFor="radius">{shape === "circle" ? "Radius" : "Side Length"} (ft)</Label>
            <Input
              id="radius"
              type="number"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              min={0.1}
            />
          </div>
        )}

        <Button className="w-full bg-forest hover:bg-forest/90" onClick={calculateArea}>
          Calculate
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-slate-50 rounded-md">
            <h3 className="font-medium mb-2">Results (Metric)</h3>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-between">
                <span>Area:</span>
                <span className="font-medium">{result.area} m²</span>
              </div>
              <div className="flex justify-between">
                <span>Perimeter:</span>
                <span className="font-medium">{result.perimeter} m</span>
              </div>
              <div className="flex justify-between pt-2">
                <span>Area (Imperial):</span>
                <span className="font-medium">{(result.area * 10.764).toFixed(2)} sq ft</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground flex gap-2">
        <Info className="h-4 w-4" />
        <span>Calculations provided in metric units (Canadian standard) with imperial conversion</span>
      </CardFooter>
    </Card>
  );
};

// Custom Circle icon since it's not in lucide-react by default
const Circle = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export default AreaCalculator;
