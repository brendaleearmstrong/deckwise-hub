
import ResourcesLayout from "@/components/layout/ResourcesLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Download, Eye } from "lucide-react";

const Blueprints = () => {
  return (
    <ResourcesLayout title="Blueprints">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <p className="text-slate-600 max-w-full overflow-hidden">
          Manage your deck and structure blueprints. Upload new designs or access existing ones.
        </p>
        <Button className="bg-forest text-white hover:bg-forest/90 whitespace-nowrap">
          <Upload className="h-4 w-4 mr-2" /> Upload New
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {blueprints.map((blueprint, index) => (
          <Card key={index} className="flex flex-col h-full w-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-forest flex-shrink-0" />
                <span className="truncate">{blueprint.name}</span>
              </CardTitle>
              <CardDescription>{blueprint.date}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
              <div className="aspect-video bg-slate-100 rounded-md flex items-center justify-center mb-2">
                <img 
                  src={blueprint.thumbnail} 
                  alt={blueprint.name}
                  className="h-full w-full object-cover rounded-md"
                />
              </div>
              <p className="text-sm text-slate-600">{blueprint.description}</p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Eye className="h-4 w-4 mr-1" /> View
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Download className="h-4 w-4 mr-1" /> Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </ResourcesLayout>
  );
};

// Mock data
const blueprints = [
  {
    name: "Standard Deck Design",
    description: "12' x 16' pressure-treated wood deck with railings",
    date: "Mar 12, 2025",
    thumbnail: "/images/blueprints/deck-blueprint.jpg"
  },
  {
    name: "Pergola Design v2",
    description: "10' x 12' cedar pergola with lattice",
    date: "Mar 05, 2025",
    thumbnail: "/images/blueprints/pergola-blueprint.jpg"
  },
  {
    name: "Premium Deck Plan",
    description: "20' x 24' composite deck with built-in seating",
    date: "Feb 28, 2025",
    thumbnail: "/images/blueprints/premium-deck-blueprint.jpg"
  },
  {
    name: "Garden Shed",
    description: "8' x 10' storage shed with gambrel roof",
    date: "Feb 15, 2025",
    thumbnail: "/images/blueprints/shed-blueprint.jpg"
  }
];

export default Blueprints;
