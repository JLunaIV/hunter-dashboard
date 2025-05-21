import { useState } from 'react';
import { useAuth } from '@/lib/auth-provider';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  BarChart,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react';

export function DashboardLayout() {
  const { signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-16'
        } relative flex flex-col border-r bg-card transition-all duration-300`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-4 z-50 hidden rounded-full border bg-background md:flex"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-4 w-4" />
        </Button>

        <div className="flex h-14 items-center border-b px-4">
          <span className={`font-semibold ${!sidebarOpen && 'hidden'}`}>
            Hunter Master Ops
          </span>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          <Button variant="ghost" className="w-full justify-start">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span className={!sidebarOpen ? 'hidden' : ''}>Dashboard</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            <span className={!sidebarOpen ? 'hidden' : ''}>Team</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <BarChart className="mr-2 h-4 w-4" />
            <span className={!sidebarOpen ? 'hidden' : ''}>Analytics</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            <span className={!sidebarOpen ? 'hidden' : ''}>Settings</span>
          </Button>
        </nav>

        <div className="border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span className={!sidebarOpen ? 'hidden' : ''}>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-bold">Welcome to Hunter Master Ops</h1>
        {/* Dashboard content will go here */}
      </main>
    </div>
  );
}