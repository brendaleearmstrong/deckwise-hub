import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ClipboardCheck,
  Plus,
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Camera,
  Download
} from "lucide-react";
import { useState } from "react";

const QualityChecker = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Quality Checker</h1>
            <p className="text-slate-600 mt-2">Perform inspections, track compliance, and ensure quality standards</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            New Inspection
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Inspections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <p className="text-xs text-slate-600 mt-1">All time inspections</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Passed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">112</div>
              <p className="text-xs text-slate-600 mt-1">90% pass rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Issues Found</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">8</div>
              <p className="text-xs text-slate-600 mt-1">Need correction</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-slate-600 mt-1">Awaiting inspection</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="checklist" className="w-full">
          <TabsList>
            <TabsTrigger value="checklist">Inspection Checklist</TabsTrigger>
            <TabsTrigger value="history">Inspection History</TabsTrigger>
            <TabsTrigger value="standards">Quality Standards</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="checklist" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Deck Construction Inspection</CardTitle>
                    <CardDescription>Standard quality checklist for deck projects</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Add Photo
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {inspectionSections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      {section.icon}
                      {section.title}
                    </h3>
                    <div className="space-y-2 pl-8">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50">
                          <Checkbox id={`${sectionIndex}-${itemIndex}`} />
                          <label
                            htmlFor={`${sectionIndex}-${itemIndex}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                          >
                            {item.text}
                            {item.critical && (
                              <Badge variant="destructive" className="ml-2">Critical</Badge>
                            )}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex gap-3 pt-4">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Pass Inspection
                  </Button>
                  <Button variant="destructive">
                    <XCircle className="h-4 w-4 mr-2" />
                    Fail Inspection
                  </Button>
                  <Button variant="outline">
                    Save Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {inspectionHistory.map((inspection) => (
              <Card key={inspection.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 rounded-lg ${
                        inspection.status === "passed" ? "bg-green-100" :
                        inspection.status === "failed" ? "bg-red-100" : "bg-yellow-100"
                      }`}>
                        {inspection.status === "passed" && <CheckCircle2 className="h-6 w-6 text-green-600" />}
                        {inspection.status === "failed" && <XCircle className="h-6 w-6 text-red-600" />}
                        {inspection.status === "pending" && <AlertTriangle className="h-6 w-6 text-yellow-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{inspection.project}</h3>
                          <Badge variant={
                            inspection.status === "passed" ? "default" :
                            inspection.status === "failed" ? "destructive" : "secondary"
                          }>
                            {inspection.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{inspection.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <span className="text-slate-600">
                            <span className="font-medium">Inspector:</span> {inspection.inspector}
                          </span>
                          <span className="text-slate-600">
                            <span className="font-medium">Date:</span> {inspection.date}
                          </span>
                          {inspection.issuesFound > 0 && (
                            <span className="text-orange-600 font-medium">
                              {inspection.issuesFound} issues found
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        View Report
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="standards" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quality Standards & Guidelines</CardTitle>
                <CardDescription>Industry standards and company quality requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {qualityStandards.map((standard, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">{standard.title}</h4>
                    <p className="text-sm text-slate-600 mb-3">{standard.description}</p>
                    <div className="flex gap-2">
                      <Badge>{standard.category}</Badge>
                      <Badge variant="outline">{standard.source}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quality Reports</CardTitle>
                <CardDescription>Generate and download quality inspection reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-24 flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    Monthly Quality Report
                  </Button>
                  <Button variant="outline" className="h-24 flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    Project Compliance Report
                  </Button>
                  <Button variant="outline" className="h-24 flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    Issues & Corrections Report
                  </Button>
                  <Button variant="outline" className="h-24 flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    Inspector Performance Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

const inspectionSections = [
  {
    title: "Foundation & Support",
    icon: <ClipboardCheck className="h-5 w-5 text-primary" />,
    items: [
      { text: "Footings are properly sized and level", critical: true },
      { text: "Posts are plumb and securely anchored", critical: true },
      { text: "Concrete has cured for minimum 7 days", critical: false },
      { text: "Beam connections are secure and level", critical: true }
    ]
  },
  {
    title: "Framing & Structure",
    icon: <ClipboardCheck className="h-5 w-5 text-primary" />,
    items: [
      { text: "Joists are properly spaced (16\" or 24\" on center)", critical: true },
      { text: "Joist hangers installed correctly with proper fasteners", critical: true },
      { text: "Rim joist securely attached to ledger board", critical: true },
      { text: "Cross-bracing installed where required", critical: false }
    ]
  },
  {
    title: "Decking & Surface",
    icon: <ClipboardCheck className="h-5 w-5 text-primary" />,
    items: [
      { text: "Deck boards have proper spacing for drainage", critical: false },
      { text: "All fasteners are countersunk and properly sealed", critical: false },
      { text: "No sharp edges or splinters present", critical: true },
      { text: "Surface is level with proper slope for drainage", critical: true }
    ]
  },
  {
    title: "Safety & Code Compliance",
    icon: <ClipboardCheck className="h-5 w-5 text-primary" />,
    items: [
      { text: "Railings meet height requirements (36\" minimum)", critical: true },
      { text: "Baluster spacing is 4\" or less", critical: true },
      { text: "Stairs meet code for rise and run", critical: true },
      { text: "All required permits and inspections completed", critical: true }
    ]
  }
];

const inspectionHistory = [
  {
    id: 1,
    project: "Johnson Deck - Foundation",
    description: "Initial foundation and post inspection",
    inspector: "Lisa Chen",
    date: "Dec 5, 2025",
    status: "passed",
    issuesFound: 0
  },
  {
    id: 2,
    project: "Martinez Pergola - Final",
    description: "Final inspection before client handoff",
    inspector: "Tom Wilson",
    date: "Dec 3, 2025",
    status: "passed",
    issuesFound: 0
  },
  {
    id: 3,
    project: "Lee Deck - Framing",
    description: "Framing and structural inspection",
    inspector: "Lisa Chen",
    date: "Dec 1, 2025",
    status: "failed",
    issuesFound: 3
  },
  {
    id: 4,
    project: "Thompson Deck - Pre-final",
    description: "Pre-final inspection before completion",
    inspector: "Tom Wilson",
    date: "Nov 28, 2025",
    status: "pending",
    issuesFound: 0
  }
];

const qualityStandards = [
  {
    title: "IRC R507 - Deck Structural Requirements",
    description: "International Residential Code standards for deck construction including footings, beams, joists, and connections.",
    category: "Structural",
    source: "IRC 2021"
  },
  {
    title: "Deck Railing Safety Standards",
    description: "Minimum height of 36 inches, maximum baluster spacing of 4 inches, and load requirements of 200 lbs.",
    category: "Safety",
    source: "Building Code"
  },
  {
    title: "Treated Lumber Installation",
    description: "Proper installation techniques for pressure-treated lumber including fastener types and drainage requirements.",
    category: "Materials",
    source: "Industry Best Practice"
  },
  {
    title: "Waterproofing & Flashing",
    description: "Requirements for ledger board flashing, proper drainage, and moisture protection.",
    category: "Weatherproofing",
    source: "Building Code"
  }
];

export default QualityChecker;
