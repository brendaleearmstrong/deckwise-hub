
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import AIAssistant from "@/components/dashboard/AIAssistant";
import MLInsights from "@/components/dashboard/MLInsights";
import { currentUser } from "@/data/mockData";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-base text-muted-foreground">
            Welcome to DeckWise, {currentUser.name}. Managing Outdoor Living Structures has never been easier.
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
