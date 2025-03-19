
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Info, Wrench } from "lucide-react";

const FastenerCalculator = () => {
  const [deckLength, setDeckLength] = useState<number>(20);
  const [deckWidth, setDeckWidth] = useState<number>(10);
  const [joistSpacing, setJoistSpacing] = useState<number>(16);
  const [boardWidth, setBoardWidth] = useState<number>(5.5);
  const [fascia, setFascia] = useState<boolean>(true);
  const [stairs, setStairs] = useState<boolean>(false);
  const [stairSteps, setStairSteps] = useState<number>(5);
  const [stairWidth, setStairWidth] = useState<number>(4);
  const [deckFastenerType, setDeckFastenerType] = useState<string>("screws");
  const [joistFastenerType, setJoistFastenerType] = useState<string>("nails");
  const [results, setResults] = useState<{
    deckFasteners: number;
    joistHangers: number;
    joistFasteners: number;
    ledgerFasteners: number;
    stairFasteners: number;
    totalFasteners: number;
    breakdown: Record<string, number>;
  } | null>(null);

  const calculateFasteners = () => {
    // Calculate deck area (in square feet)
    const deckArea = deckLength * deckWidth;
    
    // Calculate number of joists
    const joistCount = Math.ceil(deckLength / (joistSpacing / 12)) + 1;
    
    // Calculate number of deck boards
    const boardCount = Math.ceil(deckWidth * 12 / boardWidth);
    
    // Calculate deck fasteners (2 per board per joist intersection for screws, more for hidden fasteners)
    let deckFastenersPerIntersection = 2; // Default for screws
    if (deckFastenerType === "hidden") {
      deckFastenersPerIntersection = 1.5; // Average for hidden fastener systems
    } else if (deckFastenerType === "nails") {
      deckFastenersPerIntersection = 3; // Usually 3 nails per intersection
    }
    
    const deckFasteners = Math.ceil(boardCount * joistCount * deckFastenersPerIntersection);
    
    // Calculate joist hangers
    const joistHangers = joistCount;
    
    // Calculate joist fasteners (8 per joist for connecting to beam/ledger/other structural elements)
    const joistFasteners = joistCount * 8;
    
    // Calculate ledger fasteners (about 1 per 16" for 1/2" lag screws)
    const ledgerFasteners = Math.ceil(deckWidth * 12 / 16);
    
    // Calculate stair fasteners
    let stairFasteners = 0;
    if (stairs) {
      // 5 treads per step, 2 fasteners per tread per stringer
      const stairStringers = Math.ceil(stairWidth / 2) + 1; // Typically stringers every 2 feet
      stairFasteners = stairSteps * 5 * 2 * stairStringers;
    }
    
    // Calculate fascia fasteners
    let fasciaFasteners = 0;
    if (fascia) {
      // Typically 1 fastener every 12" around perimeter
      const perimeter = 2 * (deckLength + deckWidth);
      fasciaFasteners = Math.ceil(perimeter * 12 / 12);
    }
    
    // Total fasteners
    const totalFasteners = deckFasteners + joistHangers + joistFasteners + ledgerFasteners + stairFasteners + fasciaFasteners;
    
    setResults({
      deckFasteners,
      joistHangers,
      joistFasteners,
      ledgerFasteners,
      stairFasteners,
      totalFasteners,
      breakdown: {
        deckFasteners,
        joistHangers,
        joistFasteners,
        ledgerFasteners,
        stairFasteners: stairs ? stairFasteners : 0,
        fasciaFasteners: fascia ? fasciaFasteners : 0
      }
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <Wrench className="h-5 w-5 mr-2 text-forest" />
          Fastener Calculator
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="joistSpacing">Joist Spacing (inches)</Label>
            <Select
              value={joistSpacing.toString()}
              onValueChange={(value) => setJoistSpacing(Number(value))}
            >
              <SelectTrigger id="joistSpacing">
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
            <Label htmlFor="boardWidth">Board Width (inches)</Label>
            <Select
              value={boardWidth.toString()}
              onValueChange={(value) => setBoardWidth(Number(value))}
            >
              <SelectTrigger id="boardWidth">
                <SelectValue placeholder="Select board width" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3.5">3.5" (1x4 Nominal)</SelectItem>
                <SelectItem value="5.5">5.5" (1x6 Nominal)</SelectItem>
                <SelectItem value="7.25">7.25" (1x8 Nominal)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="deckFastenerType">Deck Fastener Type</Label>
            <Select
              value={deckFastenerType}
              onValueChange={(value) => setDeckFastenerType(value)}
            >
              <SelectTrigger id="deckFastenerType">
                <SelectValue placeholder="Select fastener type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="screws">Deck Screws</SelectItem>
                <SelectItem value="nails">Nails</SelectItem>
                <SelectItem value="hidden">Hidden Fasteners</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="joistFastenerType">Joist Fastener Type</Label>
            <Select
              value={joistFastenerType}
              onValueChange={(value) => setJoistFastenerType(value)}
            >
              <SelectTrigger id="joistFastenerType">
                <SelectValue placeholder="Select joist fastener type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nails">Joist Nails</SelectItem>
                <SelectItem value="screws">Structural Screws</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="fascia" 
            checked={fascia}
            onCheckedChange={(checked) => setFascia(checked === true)}
          />
          <Label htmlFor="fascia" className="cursor-pointer">Include Fascia</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="stairs" 
            checked={stairs}
            onCheckedChange={(checked) => setStairs(checked === true)}
          />
          <Label htmlFor="stairs" className="cursor-pointer">Include Stairs</Label>
        </div>

        {stairs && (
          <div className="pl-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stairSteps">Number of Steps</Label>
                <Input
                  id="stairSteps"
                  type="number"
                  value={stairSteps}
                  onChange={(e) => setStairSteps(Number(e.target.value))}
                  min={1}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stairWidth">Stair Width (ft)</Label>
                <Input
                  id="stairWidth"
                  type="number"
                  value={stairWidth}
                  onChange={(e) => setStairWidth(Number(e.target.value))}
                  min={1}
                />
              </div>
            </div>
          </div>
        )}

        <Button className="w-full bg-forest hover:bg-forest/90" onClick={calculateFasteners}>
          Calculate Fasteners
        </Button>

        {results && (
          <div className="mt-4 p-4 bg-slate-50 rounded-md">
            <h3 className="font-medium mb-2">Fastener Requirements</h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Fastener Breakdown:</div>
                <div className="pl-2 text-sm grid grid-cols-2 gap-1">
                  <div>Deck Fasteners:</div>
                  <div className="text-right">{results.breakdown.deckFasteners}</div>
                  <div>Joist Hangers:</div>
                  <div className="text-right">{results.breakdown.joistHangers}</div>
                  <div>Joist Fasteners:</div>
                  <div className="text-right">{results.breakdown.joistFasteners}</div>
                  <div>Ledger Fasteners:</div>
                  <div className="text-right">{results.breakdown.ledgerFasteners}</div>
                  {fascia && (
                    <>
                      <div>Fascia Fasteners:</div>
                      <div className="text-right">{results.breakdown.fasciaFasteners}</div>
                    </>
                  )}
                  {stairs && (
                    <>
                      <div>Stair Fasteners:</div>
                      <div className="text-right">{results.breakdown.stairFasteners}</div>
                    </>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-1 text-lg">
                <div className="font-medium">Total Fasteners:</div>
                <div className="text-right font-bold">{results.totalFasteners}</div>
              </div>
              
              <div className="text-xs text-muted-foreground pt-2">
                *Estimates are approximate. We recommend purchasing 10-15% extra fasteners to account for waste and replacements.
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground flex gap-2">
        <Info className="h-4 w-4" />
        <span>Based on Canadian building standards</span>
      </CardFooter>
    </Card>
  );
};

export default FastenerCalculator;
