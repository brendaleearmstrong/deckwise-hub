
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileText, Upload, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Material = {
  name: string;
  quantity: number;
  unit: string;
};

type AnalysisResult = {
  dimensions: {
    length: number;
    width: number;
    height?: number;
  };
  materials: Material[];
  status: 'idle' | 'analyzing' | 'complete' | 'error';
  error?: string;
};

const BlueprintAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult>({
    dimensions: { length: 0, width: 0 },
    materials: [],
    status: 'idle'
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    
    // Reset results when a new file is selected
    setResult({
      dimensions: { length: 0, width: 0 },
      materials: [],
      status: 'idle'
    });
  };

  const analyzeBlueprint = () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please upload a blueprint to analyze",
        variant: "destructive",
      });
      return;
    }

    // Set status to analyzing
    setResult({
      ...result,
      status: 'analyzing'
    });

    // Simulate API call with a timeout
    setTimeout(() => {
      // Mock result - in a real app, this would come from an API
      const mockResult: AnalysisResult = {
        dimensions: {
          length: 16, 
          width: 12,
          height: 8
        },
        materials: [
          { name: "2x6 Pressure Treated", quantity: 42, unit: "boards" },
          { name: "2x8 Pressure Treated", quantity: 12, unit: "boards" },
          { name: "2x10 Pressure Treated", quantity: 10, unit: "boards" },
          { name: "4x4 Pressure Treated", quantity: 6, unit: "posts" },
          { name: "5/4 Deck Boards", quantity: 85, unit: "boards" },
          { name: "Concrete", quantity: 12, unit: "bags" },
          { name: "3\" Deck Screws", quantity: 500, unit: "pieces" }
        ],
        status: 'complete'
      };

      setResult(mockResult);
      
      toast({
        title: "Analysis Complete",
        description: "Blueprint successfully analyzed",
        variant: "default",
      });
    }, 2000);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <FileText className="h-5 w-5 mr-2 text-slate" />
          Blueprint Analyzer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center">
          <Input
            type="file"
            id="blueprint-upload"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
          <Label
            htmlFor="blueprint-upload"
            className="cursor-pointer flex flex-col items-center justify-center"
          >
            <Upload className="h-10 w-10 text-slate-400 mb-2" />
            <p className="text-sm font-medium">
              {file ? file.name : "Upload blueprint (PDF or image)"}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Click to browse files or drag and drop
            </p>
          </Label>
        </div>

        {file && (
          <Button
            className="w-full bg-slate hover:bg-slate/90"
            onClick={analyzeBlueprint}
            disabled={result.status === 'analyzing'}
          >
            {result.status === 'analyzing' ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-2" />
                Analyze Blueprint
              </>
            )}
          </Button>
        )}

        {result.status === 'complete' && (
          <div className="mt-6 space-y-4">
            <div className="bg-slate-50 rounded-md p-4">
              <h3 className="font-medium mb-2 flex items-center">
                <CheckCircle className="h-4 w-4 text-slate mr-2" />
                Dimensions
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-2 bg-white rounded border border-slate-100">
                  <p className="text-xs text-slate-500">Length</p>
                  <p className="font-medium">{result.dimensions.length} ft</p>
                </div>
                <div className="text-center p-2 bg-white rounded border border-slate-100">
                  <p className="text-xs text-slate-500">Width</p>
                  <p className="font-medium">{result.dimensions.width} ft</p>
                </div>
                {result.dimensions.height && (
                  <div className="text-center p-2 bg-white rounded border border-slate-100">
                    <p className="text-xs text-slate-500">Height</p>
                    <p className="font-medium">{result.dimensions.height} ft</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-50 rounded-md p-4">
              <h3 className="font-medium mb-2 flex items-center">
                <CheckCircle className="h-4 w-4 text-slate mr-2" />
                Materials Required
              </h3>
              <div className="overflow-y-auto max-h-60">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="text-left p-2 rounded-tl-md">Material</th>
                      <th className="text-right p-2">Quantity</th>
                      <th className="text-right p-2 rounded-tr-md">Unit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {result.materials.map((material, index) => (
                      <tr key={index} className="bg-white">
                        <td className="p-2">{material.name}</td>
                        <td className="p-2 text-right">{material.quantity}</td>
                        <td className="p-2 text-right">{material.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                Save Results
              </Button>
              <Button variant="outline" size="sm">
                Export PDF
              </Button>
            </div>
          </div>
        )}

        {result.status === 'error' && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mt-4 flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Analysis Failed</p>
              <p className="text-sm">{result.error || "Could not analyze blueprint. Please try again with a clearer image."}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <div className="w-full text-center">
          Supports PDF, JPG, and PNG formats up to 10MB
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlueprintAnalyzer;
