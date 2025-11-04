import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { mockClients } from "@/data/mockData";

interface AddProjectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: ProjectFormData) => void;
  preselectedClientId?: string;
}

export interface ProjectFormData {
  name: string;
  clientId: string;
  type: "deck" | "pergola" | "shed" | "fence" | "other";
  startDate: string;
  estimatedEndDate: string;
  budget: number;
  length: number;
  width: number;
  height?: number;
  address: string;
  notes: string;
}

export default function AddProjectForm({
  open,
  onOpenChange,
  onSubmit,
  preselectedClientId
}: AddProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: "",
    clientId: preselectedClientId || "",
    type: "deck",
    startDate: new Date().toISOString().split("T")[0],
    estimatedEndDate: "",
    budget: 0,
    length: 0,
    width: 0,
    height: 0,
    address: "",
    notes: "",
  });

  useEffect(() => {
    if (preselectedClientId && formData.clientId !== preselectedClientId) {
      setFormData(prev => ({ ...prev, clientId: preselectedClientId }));
    }
  }, [preselectedClientId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    setFormData({
      name: "",
      clientId: "",
      type: "deck",
      startDate: new Date().toISOString().split("T")[0],
      estimatedEndDate: "",
      budget: 0,
      length: 0,
      width: 0,
      height: 0,
      address: "",
      notes: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>
            Enter the project details to add it to your database.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="client">Client *</Label>
              <Select
                value={formData.clientId}
                onValueChange={(value) => setFormData({ ...formData, clientId: value })}
                required
              >
                <SelectTrigger id="client">
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  {mockClients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Project Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: ProjectFormData["type"]) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deck">Deck</SelectItem>
                  <SelectItem value="pergola">Pergola</SelectItem>
                  <SelectItem value="shed">Shed</SelectItem>
                  <SelectItem value="fence">Fence</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedEndDate">Estimated End Date *</Label>
              <Input
                id="estimatedEndDate"
                type="date"
                value={formData.estimatedEndDate}
                onChange={(e) => setFormData({ ...formData, estimatedEndDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget *</Label>
              <Input
                id="budget"
                type="number"
                min="0"
                step="100"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Dimensions (feet)</Label>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="length" className="text-sm text-muted-foreground">
                  Length *
                </Label>
                <Input
                  id="length"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.length}
                  onChange={(e) => setFormData({ ...formData, length: parseFloat(e.target.value) || 0 })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="width" className="text-sm text-muted-foreground">
                  Width *
                </Label>
                <Input
                  id="width"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.width}
                  onChange={(e) => setFormData({ ...formData, width: parseFloat(e.target.value) || 0 })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height" className="text-sm text-muted-foreground">
                  Height
                </Label>
                <Input
                  id="height"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Project Address *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Project</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
