
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ClientDetail from "@/components/clients/ClientDetail";
import { getClientById } from "@/data/mockData";

const ClientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const client = getClientById(id || "");

  if (!client) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <h1 className="text-2xl font-bold mb-2">Client Not Found</h1>
          <p className="text-muted-foreground">
            The client you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ClientDetail client={client} />
    </DashboardLayout>
  );
};

export default ClientDetailPage;
