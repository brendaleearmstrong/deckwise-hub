
import ResourcesLayout from "@/components/layout/ResourcesLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, BookOpen, ExternalLink, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Guides = () => {
  return (
    <ResourcesLayout title="Guides & Standards">
      <p className="text-slate-600 mb-6">
        Access construction guides, building codes, and best practices to ensure high-quality work and code compliance.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {guides.map((guide, index) => (
          <Card key={index} className="flex flex-col h-full w-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Book className="h-5 w-5 text-forest flex-shrink-0" />
                  <span className="truncate">{guide.title}</span>
                </CardTitle>
                <Badge variant={guide.type === "Code" ? "destructive" : "default"} className="flex-shrink-0">
                  {guide.type}
                </Badge>
              </div>
              <CardDescription>{guide.lastUpdated}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-slate-600 mb-3">{guide.description}</p>
              <div className="flex flex-wrap gap-2">
                {guide.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm" className="flex-1 min-w-[100px]">
                <BookOpen className="h-4 w-4 mr-1" /> Read
              </Button>
              {guide.hasDownload && (
                <Button variant="outline" size="sm" className="flex-1 min-w-[100px]">
                  <FileText className="h-4 w-4 mr-1" /> PDF
                </Button>
              )}
              {guide.externalLink && (
                <Button variant="outline" size="sm" className="flex-1 min-w-[100px]">
                  <ExternalLink className="h-4 w-4 mr-1" /> Source
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </ResourcesLayout>
  );
};

// Mock data
const guides = [
  {
    title: "Deck Building Best Practices",
    description: "Comprehensive guide to building durable and safe decks with proper installation techniques.",
    lastUpdated: "Updated Mar 01, 2025",
    type: "Guide",
    tags: ["Deck", "Installation", "Safety"],
    hasDownload: true,
    externalLink: false
  },
  {
    title: "2025 Residential Building Code",
    description: "Latest building code regulations for residential deck and outdoor structure construction.",
    lastUpdated: "Published Jan 15, 2025",
    type: "Code",
    tags: ["Regulations", "Compliance", "Safety"],
    hasDownload: true,
    externalLink: true
  },
  {
    title: "Pressure-Treated Wood Handling",
    description: "Safety guidelines for working with pressure-treated lumber and proper disposal procedures.",
    lastUpdated: "Updated Feb 10, 2025",
    type: "Safety",
    tags: ["Materials", "Health", "Environment"],
    hasDownload: true,
    externalLink: false
  },
  {
    title: "Pergola Construction Manual",
    description: "Step-by-step instructions for building pergolas with various designs and material options.",
    lastUpdated: "Updated Feb 22, 2025",
    type: "Guide",
    tags: ["Pergola", "Installation", "Design"],
    hasDownload: true,
    externalLink: false
  }
];

export default Guides;
