
import ResourcesLayout from "@/components/layout/ResourcesLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Download, Eye } from "lucide-react";

const Blueprints = () => {
  return (
    <ResourcesLayout title="Blueprints">
      <div className="flex justify-between items-center mb-6">
        <p className="text-slate-600">
          Manage your deck and structure blueprints. Upload new designs or access existing ones.
        </p>
        <Button className="bg-forest text-white hover:bg-forest/90">
          <Upload className="h-4 w-4 mr-2" /> Upload New
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blueprints.map((blueprint, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-forest" />
                {blueprint.name}
              </CardTitle>
              <CardDescription>{blueprint.date}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
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
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" /> View
              </Button>
              <Button variant="outline" size="sm">
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
    thumbnail: "https://placehold.co/400x300/e2e8f0/475569?text=Deck+Blueprint"
  },
  {
    name: "Pergola Design v2",
    description: "10' x 12' cedar pergola with lattice",
    date: "Mar 05, 2025",
    thumbnail: "https://placehold.co/400x300/e2e8f0/475569?text=Pergola+Blueprint"
  },
  {
    name: "Premium Deck Plan",
    description: "20' x 24' composite deck with built-in seating",
    date: "Feb 28, 2025",
    thumbnail: "https://placehold.co/400x300/e2e8f0/475569?text=Premium+Deck"
  },
  {
    name: "Garden Shed",
    description: "8' x 10' storage shed with gambrel roof",
    date: "Feb 15, 2025",
    thumbnail: "https://placehold.co/400x300/e2e8f0/475569?text=Garden+Shed"
  }
];

export default Blueprints;
