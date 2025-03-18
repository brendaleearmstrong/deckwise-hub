
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, addBusinessDays, addDays, isWeekend, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";

interface ProjectTask {
  name: string;
  duration: number;
  startDate?: Date;
  endDate?: Date;
}

const ProjectTimelineGenerator = () => {
  const today = new Date();
  const [deckSize, setDeckSize] = useState<number>(200);
  const [complexity, setComplexity] = useState<string>("medium");
  const [includePermit, setIncludePermit] = useState<boolean>(true);
  const [includeDemo, setIncludeDemo] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(today);
  const [timeline, setTimeline] = useState<ProjectTask[]>([]);

  const calculateTimeline = () => {
    const tasks: ProjectTask[] = [];
    let currentStartDate = new Date(startDate);
    
    // Permit process
    if (includePermit) {
      const permitTask: ProjectTask = {
        name: "Permit Application & Approval",
        duration: 10, // 10 business days for permit approvals in Canada
        startDate: new Date(currentStartDate)
      };
      currentStartDate = addBusinessDays(currentStartDate, permitTask.duration);
      permitTask.endDate = new Date(currentStartDate);
      tasks.push(permitTask);
    }
    
    // Site preparation
    const siteTask: ProjectTask = {
      name: "Site Preparation & Layout",
      duration: 1, // 1-2 days
      startDate: new Date(currentStartDate)
    };
    currentStartDate = addBusinessDays(currentStartDate, siteTask.duration);
    siteTask.endDate = new Date(currentStartDate);
    tasks.push(siteTask);
    
    // Demolition if needed
    if (includeDemo) {
      const demoTask: ProjectTask = {
        name: "Demolition of Existing Deck",
        duration: 2, // 1-2 days
        startDate: new Date(currentStartDate)
      };
      currentStartDate = addBusinessDays(currentStartDate, demoTask.duration);
      demoTask.endDate = new Date(currentStartDate);
      tasks.push(demoTask);
    }
    
    // Foundation work
    const foundationTask: ProjectTask = {
      name: "Foundation & Footings",
      duration: 2, // 2-3 days
      startDate: new Date(currentStartDate)
    };
    currentStartDate = addBusinessDays(currentStartDate, foundationTask.duration);
    foundationTask.endDate = new Date(currentStartDate);
    tasks.push(foundationTask);
    
    // Framing
    let framingDuration = 2; // Base duration
    if (deckSize > 300) framingDuration += 1;
    if (complexity === "high") framingDuration += 1;
    
    const framingTask: ProjectTask = {
      name: "Framing & Support Structure",
      duration: framingDuration,
      startDate: new Date(currentStartDate)
    };
    currentStartDate = addBusinessDays(currentStartDate, framingTask.duration);
    framingTask.endDate = new Date(currentStartDate);
    tasks.push(framingTask);
    
    // Decking
    let deckingDuration = 2; // Base duration
    if (deckSize > 300) deckingDuration += 1;
    if (complexity === "high") deckingDuration += 1;
    
    const deckingTask: ProjectTask = {
      name: "Decking Installation",
      duration: deckingDuration,
      startDate: new Date(currentStartDate)
    };
    currentStartDate = addBusinessDays(currentStartDate, deckingTask.duration);
    deckingTask.endDate = new Date(currentStartDate);
    tasks.push(deckingTask);
    
    // Railings and stairs
    let railingDuration = 1; // Base duration
    if (complexity === "high") railingDuration += 1;
    
    const railingTask: ProjectTask = {
      name: "Railings & Stairs",
      duration: railingDuration,
      startDate: new Date(currentStartDate)
    };
    currentStartDate = addBusinessDays(currentStartDate, railingTask.duration);
    railingTask.endDate = new Date(currentStartDate);
    tasks.push(railingTask);
    
    // Finishing
    const finishingTask: ProjectTask = {
      name: "Finishing & Clean-up",
      duration: 1,
      startDate: new Date(currentStartDate)
    };
    currentStartDate = addBusinessDays(currentStartDate, finishingTask.duration);
    finishingTask.endDate = new Date(currentStartDate);
    tasks.push(finishingTask);
    
    // Inspection
    const inspectionTask: ProjectTask = {
      name: "Final Inspection",
      duration: 1,
      startDate: new Date(currentStartDate)
    };
    currentStartDate = addBusinessDays(currentStartDate, inspectionTask.duration);
    inspectionTask.endDate = new Date(currentStartDate);
    tasks.push(inspectionTask);
    
    setTimeline(tasks);
  };

  // Helper function to calculate total project duration in days
  const getTotalDuration = () => {
    if (timeline.length === 0) return 0;
    
    const start = timeline[0].startDate;
    const end = timeline[timeline.length - 1].endDate;
    
    if (!start || !end) return 0;
    
    // Calculate difference in days
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Project Timeline Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="deckSize">Deck Size (sq ft)</Label>
            <Input
              id="deckSize"
              type="number"
              value={deckSize}
              onChange={(e) => setDeckSize(Number(e.target.value))}
              min={1}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="complexity">Project Complexity</Label>
            <Select
              value={complexity}
              onValueChange={(value) => setComplexity(value)}
            >
              <SelectTrigger id="complexity">
                <SelectValue placeholder="Select complexity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low (Simple, Ground-level)</SelectItem>
                <SelectItem value="medium">Medium (Standard Design)</SelectItem>
                <SelectItem value="high">High (Multi-level, Custom Features)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="includePermit"
              checked={includePermit}
              onCheckedChange={(checked) => setIncludePermit(checked === true)}
            />
            <Label htmlFor="includePermit" className="cursor-pointer">Include Permit Process</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="includeDemo"
              checked={includeDemo}
              onCheckedChange={(checked) => setIncludeDemo(checked === true)}
            />
            <Label htmlFor="includeDemo" className="cursor-pointer">Include Demolition of Existing Deck</Label>
          </div>
        </div>

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

        <Button className="w-full bg-forest hover:bg-forest/90" onClick={calculateTimeline}>
          Generate Timeline
        </Button>

        {timeline.length > 0 && (
          <div className="mt-4 space-y-4">
            <div className="p-4 bg-slate-50 rounded-md">
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">Project Timeline</h3>
                <span className="text-sm text-muted-foreground">Total: {getTotalDuration()} days</span>
              </div>
              <Separator className="mb-3" />
              <div className="space-y-3">
                {timeline.map((task, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 text-sm">
                    <div className="col-span-5 font-medium">{task.name}</div>
                    <div className="col-span-3 text-center">{task.duration} day{task.duration > 1 ? 's' : ''}</div>
                    <div className="col-span-4 text-right">
                      {task.startDate && task.endDate && (
                        <>
                          {format(task.startDate, "MMM d")} - {format(task.endDate, "MMM d")}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              * Timeline is an estimate based on a standard Canadian construction schedule. Actual times may vary based on weather, material availability, crew size, and local regulations.
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground flex gap-2">
        <Info className="h-4 w-4" />
        <span>Timeline follows Canadian construction standards and permit requirements</span>
      </CardFooter>
    </Card>
  );
};

export default ProjectTimelineGenerator;
