import { Link } from "react-router-dom";
import { Bot, Hammer } from "lucide-react";

interface SiteFooterProps {
  onOpenAssistant: () => void;
}

const workLinks = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Projects", to: "/projects" },
  { label: "Clients", to: "/clients" },
  { label: "Leads", to: "/leads" },
];

const toolLinks = [
  { label: "Materials", to: "/materials" },
  { label: "Scheduler", to: "/scheduler" },
  { label: "Quality Checker", to: "/quality-checker" },
];

const resourceLinks = [
  { label: "Blueprints", to: "/resources/blueprints" },
  { label: "Guides & Standards", to: "/resources/guides" },
  { label: "Tools & Calculators", to: "/resources/tools" },
  { label: "Templates & Documents", to: "/resources/templates" },
];

const linkClass = "text-sm text-slate-600 transition-colors hover:text-primary";

const FooterColumn = ({ title, links }: { title: string; links: { label: string; to: string }[] }) => (
  <div className="space-y-3">
    <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.to}>
          <Link to={link.to} className={linkClass}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SiteFooter = ({ onOpenAssistant }: SiteFooterProps) => {
  return (
    <footer className="border-t bg-white pb-20 md:ml-64 md:pb-0">
      <div className="px-4 py-10 md:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <FooterColumn title="Work" links={workLinks} />
          <FooterColumn title="Tools" links={toolLinks} />
          <FooterColumn title="Resources" links={resourceLinks} />
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-800">Help</h3>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={onOpenAssistant}
                  className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-primary"
                >
                  <Bot className="h-4 w-4" />
                  DeckWise Assistant
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 font-semibold text-slate-700 hover:text-primary">
            <Hammer className="h-4 w-4 text-forest" />
            DeckWise
          </Link>
          <p>&copy; {new Date().getFullYear()} DeckWise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
