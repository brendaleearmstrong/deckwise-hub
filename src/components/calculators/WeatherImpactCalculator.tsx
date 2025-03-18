
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  Calendar as CalendarIcon, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Thermometer,
  Info
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays, addBusinessDays } from "date-fns";
import { cn } from "@/lib/utils";

interface WeatherImpact {
  additionalDays: number;
  reason: string;
}

const WeatherImpactCalculator = () => {
  const today = new Date();
  const [projectDuration, setProjectDuration] = useState<number>(14);
  const [startDate, setStartDate] = useState<Date>(today);
  const [region, setRegion] = useState<string>("ontario");
  const [season, setSeason] = useState<string>("summer");
  const [impacts, setImpacts] = useState<WeatherImpact[]>([]);

  const calculateImpact = () => {
    const weatherImpacts: WeatherImpact[] = [];
    let totalAdditionalDays = 0;
    
    // Base seasonal impacts based on Canadian weather patterns
    switch (season) {
      case "winter":
        weatherImpacts.push({
          additionalDays: Math.ceil(projectDuration * 0.4), // 40% delay in winter
          reason: "Snow, frost, and cold temperatures"
        });
        totalAdditionalDays += Math.ceil(projectDuration * 0.4);
        break;
      case "spring":
        weatherImpacts.push({
          additionalDays: Math.ceil(projectDuration * 0.25), // 25% delay in spring
          reason: "Rain and wet conditions"
        });
        totalAdditionalDays += Math.ceil(projectDuration * 0.25);
        break;
      case "fall":
        weatherImpacts.push({
          additionalDays: Math.ceil(projectDuration * 0.2), // 20% delay in fall
          reason: "Rain and early frost"
        });
        totalAdditionalDays += Math.ceil(projectDuration * 0.2);
        break;
      case "summer":
        weatherImpacts.push({
          additionalDays: Math.ceil(projectDuration * 0.1), // 10% delay in summer
          reason: "Occasional thunderstorms and heat warnings"
        });
        totalAdditionalDays += Math.ceil(projectDuration * 0.1);
        break;
    }
    
    // Regional factors
    switch (region) {
      case "bc":
        if (season === "winter" || season === "fall") {
          weatherImpacts.push({
            additionalDays: Math.ceil(projectDuration * 0.15),
            reason: "Heavy rainfall in coastal BC"
          });
          totalAdditionalDays += Math.ceil(projectDuration * 0.15);
        }
        break;
      case "prairies":
        if (season === "winter") {
          weatherImpacts.push({
            additionalDays: Math.ceil(projectDuration * 0.2),
            reason: "Extreme cold temperatures in the Prairies"
          });
          totalAdditionalDays += Math.ceil(projectDuration * 0.2);
        }
        break;
      case "atlantic":
        if (season === "fall" || season === "winter") {
          weatherImpacts.push({
            additionalDays: Math.ceil(projectDuration * 0.25),
            reason: "Coastal storms and high winds"
          });
          totalAdditionalDays += Math.ceil(projectDuration * 0.25);
        }
        break;
      case "northern":
        if (season === "winter") {
          weatherImpacts.push({
            additionalDays: Math.ceil(projectDuration * 0.5),
            reason: "Extreme cold and short daylight hours"
          });
          totalAdditionalDays += Math.ceil(projectDuration * 0.5);
        }
        break;
    }
    
    setImpacts(weatherImpacts);
  };

  // Calculate estimated completion dates
  const getCompletionDate = (withWeather: boolean) => {
    if (!startDate) return null;
    
    // Base completion without weather
    const baseCompletion = addBusinessDays(startDate, projectDuration);
    
    if (!withWeather) return baseCompletion;
    
    // Total additional days from weather impacts
    const additionalDays = impacts.reduce((total, impact) => total + impact.additionalDays, 0);
    
    // Completion with weather delays
    return addBusinessDays(baseCompletion, additionalDays);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Weather Impact Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Project Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                id="startDate"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => date && setStartDate(date)}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Project Duration (working days)</Label>
          <Input
            id="duration"
            type="number"
            value={projectDuration}
            onChange={(e) => setProjectDuration(Number(e.target.value))}
            min={1}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="region">Canadian Region</Label>
          <Select
            value={region}
            onValueChange={(value) => setRegion(value)}
          >
            <SelectTrigger id="region">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bc">British Columbia</SelectItem>
              <SelectItem value="prairies">Prairies (AB, SK, MB)</SelectItem>
              <SelectItem value="ontario">Ontario</SelectItem>
              <SelectItem value="quebec">Quebec</SelectItem>
              <SelectItem value="atlantic">Atlantic Canada</SelectItem>
              <SelectItem value="northern">Northern Territories</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Construction Season</Label>
          <ToggleGroup type="single" value={season} onValueChange={(value) => value && setSeason(value)}>
            <ToggleGroupItem value="winter" className="flex-1">
              <CloudSnow className="h-4 w-4 mr-2" />
              Winter
            </ToggleGroupItem>
            <ToggleGroupItem value="spring" className="flex-1">
              <CloudRain className="h-4 w-4 mr-2" />
              Spring
            </ToggleGroupItem>
            <ToggleGroupItem value="summer" className="flex-1">
              <Thermometer className="h-4 w-4 mr-2" />
              Summer
            </ToggleGroupItem>
            <ToggleGroupItem value="fall" className="flex-1">
              <Cloud className="h-4 w-4 mr-2" />
              Fall
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <Button className="w-full bg-forest hover:bg-forest/90" onClick={calculateImpact}>
          Calculate Weather Impact
        </Button>

        {impacts.length > 0 && (
          <div className="mt-4 p-4 bg-slate-50 rounded-md">
            <h3 className="font-medium mb-2">Weather Impact Analysis</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>Base Completion:</div>
                  <div className="font-medium">
                    {getCompletionDate(false) && format(getCompletionDate(false)!, "MMM d, yyyy")}
                  </div>
                  <div>Estimated Completion:</div>
                  <div className="font-medium text-amber-600">
                    {getCompletionDate(true) && format(getCompletionDate(true)!, "MMM d, yyyy")}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Possible Weather Delays:</h4>
                <ul className="space-y-2">
                  {impacts.map((impact, index) => (
                    <li key={index} className="text-sm">
                      <div className="flex justify-between">
                        <span>{impact.reason}:</span>
                        <span className="font-medium">+{impact.additionalDays} days</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-sm">
                <strong>Note:</strong> Allow for these additional days in your project timeline and client expectations. Consider scheduling buffer days or indoor work during periods of expected weather disruption.
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground flex gap-2">
        <Info className="h-4 w-4" />
        <span>Based on historical Canadian weather patterns and regional climate data</span>
      </CardFooter>
    </Card>
  );
};

export default WeatherImpactCalculator;
