
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AddLeadForm, { LeadFormData } from "@/components/forms/AddLeadForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { mockClients } from "@/data/mockData";
import { Plus, Search, Phone, Mail, AlertTriangle, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// We'll consider leads as clients with status "pending" or with a specific lead status
// For demonstration purposes, we'll filter the mock clients data
const mockLeads = mockClients.filter(client => 
  client.status === "pending" || client.notes?.includes("lead")
).map(client => ({
  ...client,
  leadStatus: Math.random() > 0.5 ? "hot" : Math.random() > 0.5 ? "warm" : "cold",
  followUpDate: new Date(Date.now() + Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString(),
  source: ["Referral", "Website", "Social Media", "Home Show", "Direct Mail"][Math.floor(Math.random() * 5)]
}));

const Leads = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);

  const handleAddLead = (data: LeadFormData) => {
    console.log("New lead:", data);
    toast.success("Lead added successfully!");
  };
  
  // Filter leads based on search query and filters
  const filteredLeads = mockLeads.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || lead.leadStatus === statusFilter;
    
    const matchesSource = sourceFilter === "all" || lead.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  const getLeadStatusIcon = (status: string) => {
    switch (status) {
      case "hot":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "warm":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "cold":
        return <Timer className="h-4 w-4 text-blue-500" />;
      default:
        return <Timer className="h-4 w-4 text-slate-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric", 
      year: "numeric"
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
            <p className="text-muted-foreground">
              Track and nurture potential clients
            </p>
          </div>
          <Button size="sm" className="flex items-center gap-1 sm:self-start" onClick={() => setIsAddLeadOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Lead
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Lead Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="hot">Hot</SelectItem>
              <SelectItem value="warm">Warm</SelectItem>
              <SelectItem value="cold">Cold</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="Referral">Referral</SelectItem>
              <SelectItem value="Website">Website</SelectItem>
              <SelectItem value="Social Media">Social Media</SelectItem>
              <SelectItem value="Home Show">Home Show</SelectItem>
              <SelectItem value="Direct Mail">Direct Mail</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {filteredLeads.map((lead) => (
            <Link key={lead.id} to={`/clients/${lead.id}`}>
              <Card className="card-hover h-full">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{lead.name}</h3>
                        <div className="flex items-center gap-1">
                          {getLeadStatusIcon(lead.leadStatus)}
                          <span className={cn(
                            "text-xs",
                            lead.leadStatus === "hot" ? "text-red-500" :
                            lead.leadStatus === "warm" ? "text-amber-500" :
                            "text-blue-500"
                          )}>
                            {lead.leadStatus.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="h-4 w-4 mr-2" />
                        <span className="truncate">{lead.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>{lead.phone}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1 sm:text-right">
                      <div className="text-sm font-medium">
                        Follow up: {formatDate(lead.followUpDate)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Source: {lead.source}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">${lead.totalBudget.toLocaleString()}</span>
                        <span className="text-muted-foreground"> estimated budget</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          
          {filteredLeads.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-lg font-medium">No leads found</p>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>

      <AddLeadForm
        open={isAddLeadOpen}
        onOpenChange={setIsAddLeadOpen}
        onSubmit={handleAddLead}
      />
    </DashboardLayout>
  );
};

export default Leads;
