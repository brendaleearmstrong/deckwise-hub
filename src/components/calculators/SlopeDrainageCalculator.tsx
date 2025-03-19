
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart2, Info, Droplets } from "lucide-react";
import { 
  ChartContainer, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, Tooltip } from "recharts";

const SlopeDrainageCalculator = () => {
  const [deckLength, setDeckLength] = useState<number>(20);
  const [elevation, setElevation] = useState<number>(2);
  const [rainfallIntensity, setRainfallIntensity] = useState<string>("medium");
  const [deckWidth, setDeckWidth] = useState<number>(10);
  const [results, setResults] = useState<{
    slopePercent: number;
    slopeRatio: string;
    slopeDegrees: number;
    drainageRate: number;
    recommendation: string;
    chartData: Array<{ position: number, height: number }>;
  } | null>(null);

  // Rainfall intensity in mm/hour based on Canadian climate data
  const rainfallRates = {
    light: 5, // Light rain - 5 mm/hr
    medium: 15, // Medium rain - 15 mm/hr
    heavy: 30, // Heavy rain - 30 mm/hr
    extreme: 50 // Extreme rain - 50 mm/hr
  };

  const calculateSlope = () => {
    // Calculate slope
    const slopePercent = (elevation / deckLength) * 100;
    const slopeDegrees = Math.atan(elevation / deckLength) * (180 / Math.PI);
    const slopeRatio = `1:${Math.round(deckLength / elevation)}`;
    
    // Generate chart data
    const chartData = [];
    const steps = 10;
    for (let i = 0; i <= steps; i++) {
      const position = (deckLength / steps) * i;
      const height = (elevation / deckLength) * position;
      chartData.push({ position, height });
    }
    
    // Calculate drainage rate
    // Based on the rational method Q = CIA
    // Where Q is flow rate, C is runoff coefficient, I is rainfall intensity, A is area
    
    // Runoff coefficient for wooden decks (approximation)
    const runoffCoefficient = 0.9; // Most water runs off
    
    // Rainfall intensity (converted from mm/hr to m³/s per m²)
    const intensity = rainfallRates[rainfallIntensity as keyof typeof rainfallRates] / (1000 * 3600);
    
    // Area in square meters
    const area = deckLength * deckWidth * 0.092903; // Convert sq ft to sq m
    
    // Calculate flow rate in cubic meters per second
    const flowRate = runoffCoefficient * intensity * area;
    
    // Convert to more readable units (liters per minute)
    const drainageRate = flowRate * 60000;
    
    // Determine recommendation
    let recommendation = "";
    if (slopePercent < 1) {
      recommendation = "Insufficient slope for proper drainage. Increase slope to at least 1%.";
    } else if (slopePercent >= 1 && slopePercent < 2) {
      recommendation = "Minimum acceptable slope. Consider additional drainage solutions for heavy rainfall areas.";
    } else if (slopePercent >= 2 && slopePercent <= 5) {
      recommendation = "Optimal slope for drainage while maintaining comfort.";
    } else {
      recommendation = "Slope exceeds recommended maximum. May cause comfort issues and accelerated water flow.";
    }
    
    setResults({
      slopePercent: parseFloat(slopePercent.toFixed(2)),
      slopeRatio,
      slopeDegrees: parseFloat(slopeDegrees.toFixed(2)),
      drainageRate: parseFloat(drainageRate.toFixed(2)),
      recommendation,
      chartData
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <Droplets className="h-5 w-5 mr-2 text-forest" />
          Slope & Drainage Calculator
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
          <Label htmlFor="elevation">Elevation Change (inches)</Label>
          <Input
            id="elevation"
            type="number"
            value={elevation}
            onChange={(e) => setElevation(Number(e.target.value))}
            min={0}
            step={0.25}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rainfallIntensity">Rainfall Intensity</Label>
          <Select
            value={rainfallIntensity}
            onValueChange={(value) => setRainfallIntensity(value)}
          >
            <SelectTrigger id="rainfallIntensity">
              <SelectValue placeholder="Select rainfall intensity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light (5 mm/hr)</SelectItem>
              <SelectItem value="medium">Medium (15 mm/hr)</SelectItem>
              <SelectItem value="heavy">Heavy (30 mm/hr)</SelectItem>
              <SelectItem value="extreme">Extreme (50 mm/hr)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full bg-forest hover:bg-forest/90" onClick={calculateSlope}>
          Calculate Slope & Drainage
        </Button>

        {results && (
          <div className="mt-4 p-4 bg-slate-50 rounded-md">
            <h3 className="font-medium mb-3">Slope & Drainage Results</h3>
            
            <div className="grid grid-cols-2 gap-1 mb-4">
              <div>Slope Percentage:</div>
              <div className="text-right">{results.slopePercent}%</div>
              <div>Slope Ratio:</div>
              <div className="text-right">{results.slopeRatio}</div>
              <div>Slope Angle:</div>
              <div className="text-right">{results.slopeDegrees}°</div>
              <div>Drainage Flow Rate:</div>
              <div className="text-right">{results.drainageRate} L/min</div>
            </div>
            
            <div className="h-[140px] w-full mt-4">
              <ChartContainer
                config={{
                  slope: {
                    label: "Slope",
                    theme: {
                      light: "#2E7D32",
                      dark: "#4CAF50"
                    }
                  }
                }}
              >
                <LineChart data={results.chartData}>
                  <XAxis 
                    dataKey="position" 
                    label={{ value: 'Length (ft)', position: 'insideBottom', offset: -5 }} 
                    tickFormatter={(value) => value.toFixed(0)}
                  />
                  <YAxis 
                    label={{ value: 'Height (in)', angle: -90, position: 'insideLeft' }} 
                    tickFormatter={(value) => value.toFixed(1)}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="height" 
                    name="slope" 
                    stroke="var(--color-slope, #2E7D32)" 
                    strokeWidth={2} 
                    dot={false}
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="custom-tooltip bg-white p-2 border border-gray-200 rounded shadow-sm">
                            <p className="text-xs">{`Length: ${payload[0].payload.position.toFixed(1)} ft`}</p>
                            <p className="text-xs">{`Height: ${payload[0].payload.height.toFixed(2)} in`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
            
            <div className="mt-4">
              <div className="font-medium">Recommendation:</div>
              <p className="text-sm mt-1">{results.recommendation}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground flex gap-2">
        <Info className="h-4 w-4" />
        <span>Based on Canadian drainage standards</span>
      </CardFooter>
    </Card>
  );
};

export default SlopeDrainageCalculator;
