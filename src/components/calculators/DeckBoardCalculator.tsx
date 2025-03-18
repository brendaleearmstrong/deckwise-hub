
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Info } from "lucide-react";

const DeckBoardCalculator = () => {
  const [length, setLength] = useState<number>(12);
  const [width, setWidth] = useState<number>(16);
  const [boardWidth, setBoardWidth] = useState<string>("140"); // 5.5" in mm
  const [boardSpacing, setBoardSpacing] = useState<number>(0.6); // cm
  const [results, setResults] = useState<{ boards: number; linearMeters: number; waste: number } | null>(null);

  const calculateBoards = () => {
    // Convert feet to meters for Canadian standards
    const lengthInMeters = length * 0.3048;
    const widthInMeters = width * 0.3048;
    const deckArea = lengthInMeters * widthInMeters;
    
    // Board width in meters
    const boardWidthInMeters = parseInt(boardWidth) / 100;
    
    // Spacing in meters
    const spacingInMeters = boardSpacing / 100;
    
    // Calculate number of boards
    const effectiveWidth = boardWidthInMeters + spacingInMeters;
    const numberOfBoards = Math.ceil(widthInMeters / effectiveWidth);
    
    // Calculate linear meters
    const linearMeters = numberOfBoards * lengthInMeters;
    
    // Add 10% for waste
    const wasteMeters = linearMeters * 0.1;
    
    setResults({
      boards: numberOfBoards,
      linearMeters: parseFloat(linearMeters.toFixed(2)),
      waste: parseFloat(wasteMeters.toFixed(2))
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Deck Board Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="length">Deck Length (ft)</Label>
            <Input
              id="length"
              type="number"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              min={1}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="width">Deck Width (ft)</Label>
            <Input
              id="width"
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              min={1}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="boardWidth">Board Width</Label>
          <Select
            value={boardWidth}
            onValueChange={(value) => setBoardWidth(value)}
          >
            <SelectTrigger id="boardWidth">
              <SelectValue placeholder="Select board width" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="89">89mm (3.5")</SelectItem>
              <SelectItem value="140">140mm (5.5")</SelectItem>
              <SelectItem value="184">184mm (7.25")</SelectItem>
              <SelectItem value="235">235mm (9.25")</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="boardSpacing">Board Spacing (cm)</Label>
            <span className="text-sm text-muted-foreground">{boardSpacing} cm</span>
          </div>
          <Slider
            id="boardSpacing"
            min={0}
            max={2}
            step={0.1}
            value={[boardSpacing]}
            onValueChange={(value) => setBoardSpacing(value[0])}
          />
        </div>

        <Button className="w-full bg-forest hover:bg-forest/90" onClick={calculateBoards}>
          Calculate
        </Button>

        {results && (
          <div className="mt-4 p-4 bg-slate-50 rounded-md">
            <h3 className="font-medium mb-2">Results (Canadian Standards)</h3>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-between">
                <span>Number of Boards:</span>
                <span className="font-medium">{results.boards}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Linear Meters:</span>
                <span className="font-medium">{results.linearMeters} m</span>
              </div>
              <div className="flex justify-between">
                <span>Additional for Waste (10%):</span>
                <span className="font-medium">{results.waste} m</span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-1">
                <span>Total Required:</span>
                <span className="font-medium">{results.linearMeters + results.waste} m</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground flex gap-2">
        <Info className="h-4 w-4" />
        <span>Based on Canadian standards using metric measurements</span>
      </CardFooter>
    </Card>
  );
};

export default DeckBoardCalculator;
