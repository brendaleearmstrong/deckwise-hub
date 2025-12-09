
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import FooterNav from "./FooterNav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} />
        <main
          className="flex-1 transition-all duration-300 px-4 py-6 md:px-8 md:py-8 md:ml-64 pb-20 md:pb-8 max-w-[1600px]"
        >
          {children}
        </main>
      </div>
      <FooterNav />
    </div>
  );
};

export default DashboardLayout;
