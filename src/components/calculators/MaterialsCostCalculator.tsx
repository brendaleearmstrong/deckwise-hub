
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash, Plus, DollarSign, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface MaterialItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  unit: string;
}

const MaterialsCostCalculator = () => {
  const [materials, setMaterials] = useState<MaterialItem[]>([
    { id: "1", name: "Pressure Treated Lumber", quantity: 100, unitPrice: 8.5, unit: "linear ft" },
    { id: "2", name: "Deck Screws", quantity: 5, unitPrice: 29.99, unit: "lbs" }
  ]);
  const [tax, setTax] = useState<number>(13); // Default to Ontario HST rate
  
  const addMaterial = () => {
    const newId = (materials.length + 1).toString();
    setMaterials([
      ...materials, 
      { id: newId, name: "", quantity: 0, unitPrice: 0, unit: "pcs" }
    ]);
  };
  
  const removeMaterial = (id: string) => {
    setMaterials(materials.filter(material => material.id !== id));
  };
  
  const updateMaterial = (id: string, field: keyof MaterialItem, value: string | number) => {
    setMaterials(materials.map(material => 
      material.id === id ? { ...material, [field]: value } : material
    ));
  };
  
  const calculateSubtotal = () => {
    return materials.reduce((total, material) => 
      total + (material.quantity * material.unitPrice), 0);
  };
  
  const calculateTax = () => {
    return calculateSubtotal() * (tax / 100);
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Materials Cost Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {materials.map((material) => (
            <div key={material.id} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-3 md:col-span-4">
                <Input
                  placeholder="Material name"
                  value={material.name}
                  onChange={(e) => updateMaterial(material.id, "name", e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  placeholder="Qty"
                  value={material.quantity || ""}
                  onChange={(e) => updateMaterial(material.id, "quantity", Number(e.target.value))}
                  min={0}
                />
              </div>
              <div className="col-span-2">
                <Input
                  placeholder="Unit"
                  value={material.unit}
                  onChange={(e) => updateMaterial(material.id, "unit", e.target.value)}
                />
              </div>
              <div className="col-span-3 md:col-span-3 flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="Price"
                  value={material.unitPrice || ""}
                  onChange={(e) => updateMaterial(material.id, "unitPrice", Number(e.target.value))}
                  min={0}
                  step={0.01}
                />
              </div>
              <div className="col-span-2 md:col-span-1 flex justify-end">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeMaterial(material.id)}
                >
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
          
          <Button 
            variant="outline" 
            className="w-full mt-2 border-dashed"
            onClick={addMaterial}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Material
          </Button>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="taxRate">Provincial Tax Rate (%)</Label>
          <Input
            id="taxRate"
            type="number"
            value={tax}
            onChange={(e) => setTax(Number(e.target.value))}
            min={0}
            max={20}
            step={0.1}
          />
          <div className="text-xs text-muted-foreground">
            Canadian Provincial Rates: BC (12%), AB (5%), ON (13%), QC (14.975%), etc.
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-1 pt-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax ({tax}%):</span>
            <span className="font-medium">${calculateTax().toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between text-lg">
            <span className="font-semibold">Total:</span>
            <span className="font-bold">${calculateTotal().toFixed(2)} CAD</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground flex gap-2">
        <Info className="h-4 w-4" />
        <span>Prices in Canadian Dollars (CAD). Save this estimate for your records.</span>
      </CardFooter>
    </Card>
  );
};

export default MaterialsCostCalculator;
