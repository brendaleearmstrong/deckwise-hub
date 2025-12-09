
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Bell, User, X, Calendar, Hammer, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUnreadAlerts, currentUser } from "@/data/mockData";

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Navbar = ({ sidebarOpen, setSidebarOpen }: NavbarProps) => {
  const unreadAlerts = getUnreadAlerts();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Get user's initials for the avatar
  const getInitials = (name: string) => {
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`;
    }
    return name.substring(0, 2);
  };

  const userInitials = getInitials(currentUser.name);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Link to="/" className="flex items-center">
            <span className="font-roboto font-bold text-3xl text-primary tracking-tight">
              DeckWise
            </span>
          </Link>
        </div>

        <div className="hidden md:flex md:items-center md:gap-6">
          <nav className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              to="/projects"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Projects
            </Link>
            <Link
              to="/clients"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Clients
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 h-8 px-2">
                  More <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/resources/blueprints">Blueprints</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/materials">Materials</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/scheduler">Scheduler</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/quality-checker">Quality Checker</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-xs text-white flex items-center justify-center">
                {unreadAlerts.length}
              </span>
            )}
          </Button>
          <Button variant="outline" size="icon" className="hidden md:flex">
            <Calendar className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-forest text-white">{userInitials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{currentUser.name}</DropdownMenuLabel>
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">{currentUser.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden border-b">
          <nav className="flex flex-col p-4 space-y-3">
            <Link
              to="/dashboard"
              className="text-sm font-medium transition-colors hover:text-primary p-2"
            >
              Dashboard
            </Link>
            <Link
              to="/projects"
              className="text-sm font-medium transition-colors hover:text-primary p-2"
            >
              Projects
            </Link>
            <Link
              to="/clients"
              className="text-sm font-medium transition-colors hover:text-primary p-2"
            >
              Clients
            </Link>
            <Link
              to="/resources/blueprints"
              className="text-sm font-medium transition-colors hover:text-primary p-2"
            >
              Blueprints
            </Link>
            <Link
              to="/materials"
              className="text-sm font-medium transition-colors hover:text-primary p-2"
            >
              Materials
            </Link>
            <Link
              to="/scheduler"
              className="text-sm font-medium transition-colors hover:text-primary p-2"
            >
              Scheduler
            </Link>
            <Link
              to="/quality-checker"
              className="text-sm font-medium transition-colors hover:text-primary p-2"
            >
              Quality Checker
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
