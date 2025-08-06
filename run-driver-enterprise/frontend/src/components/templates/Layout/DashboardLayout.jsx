import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { 
  Home, 
  User, 
  Wallet, 
  MapPin, 
  Users, 
  Trophy,
  Settings,
  Bell,
  Search,
  Menu
} from 'lucide-react';

const DashboardLayout = ({ 
  children, 
  title = "Dashboard",
  showHeader = true,
  showSidebar = true,
  showStats = true,
  stats = []
}) => {
  const navigationItems = [
    { icon: Home, label: "Dashboard", href: "/", active: true },
    { icon: MapPin, label: "Viagens", href: "/trips", active: false },
    { icon: Wallet, label: "Carteira", href: "/wallet", active: false },
    { icon: Users, label: "Social", href: "/social", active: false },
    { icon: Trophy, label: "Gamificação", href: "/gamification", active: false },
    { icon: User, label: "Perfil", href: "/profile", active: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {showHeader && (
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Button variant="ghost" size="sm" className="mr-4">
                  <Menu className="w-5 h-5" />
                </Button>
                <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Search className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Bell className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>
      )}

      <div className="flex">
        {/* Sidebar */}
        {showSidebar && (
          <aside className="w-64 bg-white shadow-sm border-r min-h-screen">
            <div className="p-4">
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900">Run Driver</h2>
                <p className="text-sm text-gray-600">Enterprise</p>
              </div>
              
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <Button
                    key={item.label}
                    variant={item.active ? "default" : "ghost"}
                    className="w-full justify-start"
                    size="sm"
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                ))}
              </nav>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1">
          {/* Stats Cards */}
          {showStats && stats.length > 0 && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">{stat.label}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                        <div className={`p-2 rounded-full ${stat.color}`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Page Content */}
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;