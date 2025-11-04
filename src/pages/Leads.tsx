
import { useState, useEffect } from "react";
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
import { Plus, Search, Phone, Mail, AlertTriangle, Timer, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  total_budget: number;
  lead_status?: string;
  source?: string;
  follow_up_date?: string;
  notes?: string;
  created_at?: string;
}

const DEMO_USER_ID = "00000000-0000-0000-0000-000000000001";

const Leads = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("user_id", DEMO_USER_ID)
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleAddLead = async (data: LeadFormData) => {
    try {
      const { error } = await supabase.from("clients").insert([
        {
          user_id: DEMO_USER_ID,
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address || "",
          status: "pending",
          payment_status: "unpaid",
          total_budget: data.totalBudget,
          amount_paid: 0,
          notes: data.notes,
          last_contact: new Date().toISOString().split("T")[0],
          priority: "medium",
          lead_status: data.leadStatus,
          source: data.source,
          follow_up_date: data.followUpDate,
        },
      ]);

      if (error) throw error;

      toast.success("Lead added successfully!");
      fetchLeads();
    } catch (error) {
      console.error("Error adding lead:", error);
      toast.error("Failed to add lead");
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || lead.lead_status === statusFilter;

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
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredLeads.map((lead) => (
              <Link key={lead.id} to={`/clients/${lead.id}`}>
                <Card className="card-hover h-full">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{lead.name}</h3>
                          {lead.lead_status && (
                            <div className="flex items-center gap-1">
                              {getLeadStatusIcon(lead.lead_status)}
                              <span className={cn(
                                "text-xs",
                                lead.lead_status === "hot" ? "text-red-500" :
                                lead.lead_status === "warm" ? "text-amber-500" :
                                "text-blue-500"
                              )}>
                                {lead.lead_status.toUpperCase()}
                              </span>
                            </div>
                          )}
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
                        {lead.follow_up_date && (
                          <div className="text-sm font-medium">
                            Follow up: {formatDate(lead.follow_up_date)}
                          </div>
                        )}
                        {lead.source && (
                          <div className="text-sm text-muted-foreground">
                            Source: {lead.source}
                          </div>
                        )}
                        <div className="text-sm">
                          <span className="font-medium">${lead.total_budget.toLocaleString()}</span>
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
        )}
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
