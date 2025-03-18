
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Clients from "./pages/Clients";
import ClientDetail from "./pages/ClientDetail";
import Leads from "./pages/Leads";
import NotFound from "./pages/NotFound";
import Resources from "./pages/Resources";
import Blueprints from "./pages/resources/Blueprints";
import Guides from "./pages/resources/Guides";
import Tools from "./pages/resources/Tools";
import Templates from "./pages/resources/Templates";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/:id" element={<ClientDetail />} />
          <Route path="/leads" element={<Leads />} />
          
          {/* Resources Section */}
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/blueprints" element={<Blueprints />} />
          <Route path="/resources/guides" element={<Guides />} />
          <Route path="/resources/tools" element={<Tools />} />
          <Route path="/resources/templates" element={<Templates />} />
          
          {/* These routes are placeholders for future implementation */}
          <Route path="/materials" element={<Dashboard />} />
          <Route path="/scheduler" element={<Dashboard />} />
          <Route path="/quality-checker" element={<Dashboard />} />
          <Route path="/settings" element={<Dashboard />} />
          <Route path="/help" element={<Dashboard />} />
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
