
import ResourcesLayout from "@/components/layout/ResourcesLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Templates = () => {
  return (
    <ResourcesLayout title="Templates & Documents">
      <p className="text-slate-600 mb-6">
        Access professionally designed templates for contracts, invoices, proposals, and other project documentation.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-forest" />
                  {template.name}
                </CardTitle>
                <Badge>{template.format}</Badge>
              </div>
              <CardDescription>{template.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-3">{template.description}</p>
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" /> Preview
              </Button>
              <Button className="bg-forest text-white hover:bg-forest/90" size="sm">
                <Download className="h-4 w-4 mr-1" /> Download
              </Button>
              {template.editable && (
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" /> Edit
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
const templates = [
  {
    name: "Client Contract",
    description: "Comprehensive construction contract template with customizable terms and conditions.",
    category: "Legal Documents",
    format: "DOCX",
    tags: ["Contract", "Legal", "Client"],
    editable: true
  },
  {
    name: "Project Estimate",
    description: "Detailed estimate template with line items for materials, labor, and additional costs.",
    category: "Financial",
    format: "XLSX",
    tags: ["Estimate", "Pricing", "Proposal"],
    editable: true
  },
  {
    name: "Project Timeline",
    description: "Visual project timeline template with milestones and dependencies for client presentations.",
    category: "Project Management",
    format: "PPTX",
    tags: ["Timeline", "Schedule", "Planning"],
    editable: true
  },
  {
    name: "Final Invoice",
    description: "Professional invoice template with payment terms and itemized billing for completed work.",
    category: "Financial",
    format: "PDF",
    tags: ["Invoice", "Billing", "Payment"],
    editable: false
  },
  {
    name: "Quality Inspection Form",
    description: "Comprehensive checklist for quality control inspections during and after construction.",
    category: "Quality Assurance",
    format: "PDF",
    tags: ["Inspection", "Quality", "Compliance"],
    editable: false
  },
  {
    name: "Change Order Form",
    description: "Template for documenting and approving changes to the original project scope.",
    category: "Project Management",
    format: "DOCX",
    tags: ["Change Order", "Modification", "Approval"],
    editable: true
  }
];

export default Templates;
