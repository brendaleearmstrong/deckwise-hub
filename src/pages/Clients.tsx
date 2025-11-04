
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ClientCard from "@/components/clients/ClientCard";
import AddClientForm, { ClientFormData } from "@/components/forms/AddClientForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Plus, Search, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  payment_status: string;
  total_budget: number;
  amount_paid: number;
  notes: string;
  last_contact: string;
  priority: string;
  created_at?: string;
}

const DEMO_USER_ID = "00000000-0000-0000-0000-000000000001";

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("user_id", DEMO_USER_ID)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast.error("Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAddClient = async (data: ClientFormData) => {
    try {
      const { error } = await supabase.from("clients").insert([
        {
          user_id: DEMO_USER_ID,
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          status: "pending",
          payment_status: "unpaid",
          total_budget: data.totalBudget,
          amount_paid: 0,
          notes: data.notes,
          last_contact: new Date().toISOString().split("T")[0],
          priority: data.priority,
        },
      ]);

      if (error) throw error;

      toast.success("Client added successfully!");
      fetchClients();
    } catch (error) {
      console.error("Error adding client:", error);
      toast.error("Failed to add client");
    }
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          client.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || client.status === statusFilter;

    const matchesPayment = paymentFilter === "all" || client.payment_status === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
            <p className="text-muted-foreground">
              Manage your clients and their projects
            </p>
          </div>
          <Button size="sm" className="flex items-center gap-1 sm:self-start" onClick={() => setIsAddClientOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Client
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Payment Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="partial">Partial</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredClients.map((client) => (
              <ClientCard
                key={client.id}
                client={{
                  id: client.id,
                  name: client.name,
                  email: client.email,
                  phone: client.phone,
                  address: client.address,
                  status: client.status as "active" | "pending" | "completed",
                  paymentStatus: client.payment_status as "paid" | "partial" | "unpaid",
                  totalBudget: client.total_budget,
                  amountPaid: client.amount_paid,
                  notes: client.notes,
                  lastContact: client.last_contact,
                  priority: client.priority as "high" | "medium" | "low",
                }}
              />
            ))}

            {filteredClients.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <p className="text-lg font-medium">No clients found</p>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <AddClientForm
        open={isAddClientOpen}
        onOpenChange={setIsAddClientOpen}
        onSubmit={handleAddClient}
      />
    </DashboardLayout>
  );
};

export default Clients;
