import { useState } from "react";
import { 
  Home, 
  Users, 
  UserCheck, 
  Bed, 
  Calendar, 
  DollarSign, 
  BarChart3, 
  Settings,
  Globe,
  Crown
} from "lucide-react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Dashboard } from "./components/Dashboard";
import { FrontDesk } from "./components/FrontDesk";
import { GuestProfile } from "./components/GuestProfile";
import { RoomManagement } from "./components/RoomManagement";

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [userRole, setUserRole] = useState("manager"); // manager, front-desk, housekeeping, marketing

  const menuItems = [
    { 
      id: "dashboard", 
      label: "Dashboard", 
      icon: Home, 
      roles: ["manager", "front-desk"] 
    },
    { 
      id: "front-desk", 
      label: "Front Desk", 
      icon: UserCheck, 
      roles: ["manager", "front-desk"] 
    },
    { 
      id: "guest-profile", 
      label: "Guest CRM", 
      icon: Users, 
      roles: ["manager", "marketing", "front-desk"] 
    },
    { 
      id: "rooms", 
      label: "Room Management", 
      icon: Bed, 
      roles: ["manager", "housekeeping"] 
    },
    { 
      id: "events", 
      label: "Events", 
      icon: Calendar, 
      roles: ["manager", "front-desk"] 
    },
    { 
      id: "billing", 
      label: "Billing & POS", 
      icon: DollarSign, 
      roles: ["manager", "front-desk"] 
    },
    { 
      id: "channels", 
      label: "Channel Manager", 
      icon: Globe, 
      roles: ["manager", "marketing"] 
    },
    { 
      id: "analytics", 
      label: "Analytics", 
      icon: BarChart3, 
      roles: ["manager"] 
    }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  );

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "front-desk":
        return <FrontDesk />;
      case "guest-profile":
        return <GuestProfile />;
      case "rooms":
        return <RoomManagement />;
      case "events":
        return <EventManagement />;
      case "billing":
        return <BillingPOS />;
      case "channels":
        return <ChannelManager />;
      case "analytics":
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r border-border">
          <SidebarHeader className="border-b border-border bg-hotel-navy text-white">
            <div className="flex items-center space-x-3 px-6 py-4">
              <div className="w-8 h-8 bg-hotel-gold rounded-lg flex items-center justify-center">
                <Crown className="h-5 w-5 text-hotel-navy" />
              </div>
              <div>
                <h2 className="font-semibold">Core 1</h2>
                <p className="text-sm text-white/70">Management System</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="bg-hotel-navy">
            <div className="p-4">
              <div className="mb-4">
                <label className="text-xs text-white/70 uppercase tracking-wide">Role</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {["manager", "front-desk", "housekeeping", "marketing"].map((role) => (
                    <Button
                      key={role}
                      size="sm"
                      variant={userRole === role ? "default" : "outline"}
                      className={`text-xs ${
                        userRole === role 
                          ? "bg-hotel-gold text-hotel-navy hover:bg-hotel-gold/90" 
                          : "border-white/20 text-white/70 hover:bg-white/10"
                      }`}
                      onClick={() => setUserRole(role)}
                    >
                      {role.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Button>
                  ))}
                </div>
              </div>
              
              <SidebarMenu>
                {filteredMenuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveView(item.id)}
                      className={`w-full justify-start text-white hover:bg-white/10 ${
                        activeView === item.id ? "bg-hotel-gold text-hotel-navy hover:bg-hotel-gold/90" : ""
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                      {item.id === "front-desk" && (
                        <Badge variant="secondary" className="ml-auto bg-red-500 text-white">
                          3
                        </Badge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                
                <SidebarMenuItem className="mt-auto">
                  <SidebarMenuButton className="text-white hover:bg-white/10">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="border-b border-border bg-white/50 backdrop-blur supports-[backdrop-filter]:bg-white/80">
            <div className="flex items-center justify-between px-6 py-3">
              <SidebarTrigger className="lg:hidden" />
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="text-hotel-navy border-hotel-navy">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Badge>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  System Online
                </Badge>
              </div>
            </div>
          </header>
          
          <div className="flex-1 p-6 overflow-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

// Placeholder components for remaining screens
function EventManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Event & Conference Management</h1>
        <p className="text-muted-foreground">Manage events, conferences, and venue bookings</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
          <Calendar className="h-12 w-12 mx-auto mb-4" />
          <h3>Event Calendar</h3>
          <p className="text-sm">View and manage upcoming events</p>
        </div>
        <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
          <Users className="h-12 w-12 mx-auto mb-4" />
          <h3>Venue Management</h3>
          <p className="text-sm">Configure event spaces and capacity</p>
        </div>
        <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
          <DollarSign className="h-12 w-12 mx-auto mb-4" />
          <h3>Event Billing</h3>
          <p className="text-sm">Manage event pricing and invoices</p>
        </div>
      </div>
    </div>
  );
}

function BillingPOS() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Billing & Point of Sale</h1>
        <p className="text-muted-foreground">Unified billing system for rooms, restaurants, and services</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
          <DollarSign className="h-12 w-12 mx-auto mb-4" />
          <h3>Guest Billing</h3>
          <p className="text-sm">Manage room charges and guest bills</p>
        </div>
        <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
          <Home className="h-12 w-12 mx-auto mb-4" />
          <h3>Restaurant POS</h3>
          <p className="text-sm">Process restaurant and bar orders</p>
        </div>
        <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
          <Settings className="h-12 w-12 mx-auto mb-4" />
          <h3>Payment Processing</h3>
          <p className="text-sm">Handle various payment methods</p>
        </div>
      </div>
    </div>
  );
}

function ChannelManager() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Channel Management</h1>
        <p className="text-muted-foreground">Manage OTA integrations and distribution channels</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
          <Globe className="h-12 w-12 mx-auto mb-4" />
          <h3>OTA Integration</h3>
          <p className="text-sm">Connect with Booking.com, Expedia, Agoda</p>
        </div>
        <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
          <Settings className="h-12 w-12 mx-auto mb-4" />
          <h3>Rate Management</h3>
          <p className="text-sm">Sync pricing across all channels</p>
        </div>
        <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
          <BarChart3 className="h-12 w-12 mx-auto mb-4" />
          <h3>Availability Sync</h3>
          <p className="text-sm">Real-time inventory updates</p>
        </div>
      </div>
    </div>
  );
}

function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Analytics & Reporting</h1>
        <p className="text-muted-foreground">Comprehensive business intelligence and reports</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
          <BarChart3 className="h-12 w-12 mx-auto mb-4" />
          <h3>Revenue Analytics</h3>
          <p className="text-sm">Track revenue trends and forecasts</p>
        </div>
        <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
          <Users className="h-12 w-12 mx-auto mb-4" />
          <h3>Guest Demographics</h3>
          <p className="text-sm">Analyze guest patterns and preferences</p>
        </div>
        <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
          <Home className="h-12 w-12 mx-auto mb-4" />
          <h3>Occupancy Reports</h3>
          <p className="text-sm">Monitor room utilization and trends</p>
        </div>
      </div>
    </div>
  );
}