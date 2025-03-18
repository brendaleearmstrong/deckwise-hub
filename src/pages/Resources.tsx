
import ResourcesLayout from "@/components/layout/ResourcesLayout";
import ResourceCard from "@/components/resources/ResourceCard";
import { FileText, Book, Wrench, ExternalLink } from "lucide-react";

const Resources = () => {
  return (
    <ResourcesLayout title="Resources Center">
      <p className="text-slate-600 mb-6">
        Access all your construction resources in one place. Find blueprints, guides, tool calculators, 
        and document templates to streamline your workflow.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResourceCard
          title="Blueprints"
          description="Access, upload, and manage your project blueprints and designs."
          icon={FileText}
          link="/resources/blueprints"
        />
        <ResourceCard
          title="Guides & Standards"
          description="Construction guides, building codes, and best practices."
          icon={Book}
          link="/resources/guides"
        />
        <ResourceCard
          title="Tools & Calculators"
          description="Material calculators, converters, and measurement tools."
          icon={Wrench}
          link="/resources/tools"
        />
        <ResourceCard
          title="Templates & Documents"
          description="Client contracts, invoices, and project documentation templates."
          icon={ExternalLink}
          link="/resources/templates"
        />
      </div>
    </ResourcesLayout>
  );
};

export default Resources;
