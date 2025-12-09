import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  Plus,
  Search,
  AlertTriangle,
  TrendingUp,
  Hammer,
  Layers
} from "lucide-react";
import { useState } from "react";

const Materials = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Materials Management</h1>
            <p className="text-slate-600 mt-2">Track inventory, manage orders, and monitor material costs</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Material
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-slate-600 mt-1">Active inventory items</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Low Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">8</div>
              <p className="text-xs text-slate-600 mt-1">Items need reordering</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$28,450</div>
              <p className="text-xs text-slate-600 mt-1">Current inventory value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-slate-600 mt-1">Orders in transit</p>
            </CardContent>
          </Card>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Materials</TabsTrigger>
            <TabsTrigger value="lumber">Lumber</TabsTrigger>
            <TabsTrigger value="fasteners">Fasteners</TabsTrigger>
            <TabsTrigger value="hardware">Hardware</TabsTrigger>
            <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {materials.map((material) => (
              <Card key={material.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{material.name}</h3>
                          {material.quantity <= material.reorderPoint && (
                            <Badge variant="destructive" className="flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              Low Stock
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{material.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <span className="text-slate-600">
                            <span className="font-medium">SKU:</span> {material.sku}
                          </span>
                          <span className="text-slate-600">
                            <span className="font-medium">Supplier:</span> {material.supplier}
                          </span>
                          <span className="text-slate-600">
                            <span className="font-medium">Unit Price:</span> ${material.unitPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end gap-2">
                      <div className="text-right">
                        <div className="text-2xl font-bold">{material.quantity}</div>
                        <div className="text-sm text-slate-600">{material.unit}</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="lumber">
            <Card>
              <CardContent className="p-6 text-center text-slate-600">
                Filter results by category: Lumber
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fasteners">
            <Card>
              <CardContent className="p-6 text-center text-slate-600">
                Filter results by category: Fasteners
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hardware">
            <Card>
              <CardContent className="p-6 text-center text-slate-600">
                Filter results by category: Hardware
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="low-stock">
            <Card>
              <CardContent className="p-6 text-center text-slate-600">
                Showing only materials at or below reorder point
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

const materials = [
  {
    id: 1,
    name: "Pressure-Treated 2x6 Deck Boards",
    description: "16 ft pressure-treated lumber for deck flooring",
    sku: "PT-2X6-16",
    category: "Lumber",
    quantity: 85,
    unit: "pieces",
    unitPrice: 18.99,
    reorderPoint: 20,
    supplier: "Lumber Depot"
  },
  {
    id: 2,
    name: "Composite Deck Screws",
    description: "#10 x 3\" stainless steel deck screws",
    sku: "CS-10-3",
    category: "Fasteners",
    quantity: 450,
    unit: "lbs",
    unitPrice: 12.50,
    reorderPoint: 100,
    supplier: "FastenerPro"
  },
  {
    id: 3,
    name: "4x4 Treated Posts",
    description: "8 ft pressure-treated posts for deck support",
    sku: "PT-4X4-8",
    category: "Lumber",
    quantity: 15,
    unit: "pieces",
    unitPrice: 24.99,
    reorderPoint: 20,
    supplier: "Lumber Depot"
  },
  {
    id: 4,
    name: "Deck Joist Hangers",
    description: "2x8 galvanized joist hangers",
    sku: "JH-2X8",
    category: "Hardware",
    quantity: 120,
    unit: "pieces",
    unitPrice: 2.49,
    reorderPoint: 50,
    supplier: "Hardware Plus"
  },
  {
    id: 5,
    name: "Concrete Mix",
    description: "80 lb bags of fast-setting concrete",
    sku: "CM-80",
    category: "Materials",
    quantity: 8,
    unit: "bags",
    unitPrice: 8.99,
    reorderPoint: 15,
    supplier: "Builder's Supply"
  }
];

export default Materials;
