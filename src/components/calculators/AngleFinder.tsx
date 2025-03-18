
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Info } from "lucide-react";

const AngleFinder = () => {
  const [calculationType, setCalculationType] = useState<string>("angle");
  const [sideA, setSideA] = useState<number>(3);
  const [sideB, setSideB] = useState<number>(4);
  const [angle, setAngle] = useState<number>(90);
  const [results, setResults] = useState<{ angle?: number; sideC?: number; miterAngle?: number } | null>(null);

  const calculateAngle = () => {
    if (calculationType === "angle") {
      // Using Law of Cosines to find angle C
      const sideC = Math.sqrt(sideA * sideA + sideB * sideB - 2 * sideA * sideB * Math.cos((angle * Math.PI) / 180));
      
      // Calculate the miter angle for cutting
      const angleC = Math.acos((sideA * sideA + sideB * sideB - sideC * sideC) / (2 * sideA * sideB)) * (180 / Math.PI);
      const miterAngle = 180 - angleC / 2;
      
      setResults({
        sideC: parseFloat(sideC.toFixed(3)),
        miterAngle: parseFloat(miterAngle.toFixed(2))
      });
    } else {
      // Using Law of Cosines to find angle C when we know all three sides
      const sideC = Math.sqrt(sideA * sideA + sideB * sideB);
      const angleC = Math.acos((sideA * sideA + sideB * sideB - sideC * sideC) / (2 * sideA * sideB)) * (180 / Math.PI);
      
      // Miter angle for 90 degree cut
      const miterAngle = 45;
      
      setResults({
        angle: parseFloat(angleC.toFixed(2)),
        sideC: parseFloat(sideC.toFixed(3)),
        miterAngle: miterAngle
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Angle Finder & Miter Cut Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Calculation Type</Label>
          <ToggleGroup type="single" value={calculationType} onValueChange={(value) => value && setCalculationType(value)}>
            <ToggleGroupItem value="angle" className="flex-1">Calculate Third Side & Miter Angle</ToggleGroupItem>
            <ToggleGroupItem value="rightAngle" className="flex-1">Right Angle (90°)</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sideA">Side A (meters)</Label>
            <Input
              id="sideA"
              type="number"
              value={sideA}
              onChange={(e) => setSideA(Number(e.target.value))}
              min={0.1}
              step={0.1}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sideB">Side B (meters)</Label>
            <Input
              id="sideB"
              type="number"
              value={sideB}
              onChange={(e) => setSideB(Number(e.target.value))}
              min={0.1}
              step={0.1}
            />
          </div>
        </div>

        {calculationType === "angle" && (
          <div className="space-y-2">
            <Label htmlFor="angle">Angle Between Sides (degrees)</Label>
            <Input
              id="angle"
              type="number"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              min={1}
              max={179}
            />
          </div>
        )}

        <Button className="w-full bg-forest hover:bg-forest/90" onClick={calculateAngle}>
          Calculate
        </Button>

        {results && (
          <div className="mt-4 p-4 bg-slate-50 rounded-md">
            <h3 className="font-medium mb-2">Results</h3>
            <div className="grid grid-cols-1 gap-2">
              {results.angle !== undefined && (
                <div className="flex justify-between">
                  <span>Angle Between Sides:</span>
                  <span className="font-medium">{results.angle}°</span>
                </div>
              )}
              {results.sideC !== undefined && (
                <div className="flex justify-between">
                  <span>Third Side Length:</span>
                  <span className="font-medium">{results.sideC} m</span>
                </div>
              )}
              {results.miterAngle !== undefined && (
                <div className="flex justify-between">
                  <span>Miter Saw Angle Setting:</span>
                  <span className="font-medium">{results.miterAngle}°</span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground flex gap-2">
        <Info className="h-4 w-4" />
        <span>For custom angled cuts in deck building using metric measurements</span>
      </CardFooter>
    </Card>
  );
};

export default AngleFinder;
