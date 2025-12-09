
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import AIAssistant from "@/components/dashboard/AIAssistant";
import MLInsights from "@/components/dashboard/MLInsights";
import { currentUser } from "@/data/mockData";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to DeckWise, {currentUser.name}. Managing {currentUser.company.name} has never been easier.
          </p>
        </div>
        <DashboardOverview />
        <MLInsights />
        <AIAssistant />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
