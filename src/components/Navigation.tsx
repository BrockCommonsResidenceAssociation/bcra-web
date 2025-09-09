import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Home, Calendar, FileText, Trophy, Users, Mail, Heart, Info } from "lucide-react";
import logo from "@/assets/logo.svg";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Events", path: "/events", icon: Calendar },
    { name: "Resources", path: "/resources", icon: FileText },
    { name: "Clubs", path: "/clubs", icon: Users },
    { name: "Scoreboard", path: "/scoreboard", icon: Trophy },
    { name: "About Us", path: "/about", icon: Info },
    { name: "Volunteer", path: "/volunteer", icon: Heart },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  const isActivePath = (path: string) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img src={logo} alt="Brock Commons Logo" className="w-10 h-10 group-hover:shadow-glow transition-shadow duration-300 rounded-lg" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-primary">Brock Commons</h1>
              <p className="text-xs text-muted-foreground -mt-1">Residence Association</p>
            </div>
          </Link>

          {isMobile ? (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-secondary"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs p-4">
                <div className="flex flex-col space-y-2 mt-6">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`
                          flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300
                          ${isActivePath(item.path)
                            ? "bg-primary text-primary-foreground shadow-medium"
                            : "hover:bg-secondary hover:text-secondary-foreground"
                          }
                        `}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.name} to={item.path}>
                    <Button
                      variant={isActivePath(item.path) ? "default" : "ghost"}
                      className={`
                        flex items-center space-x-2 transition-all duration-300
                        ${isActivePath(item.path) 
                          ? "bg-primary text-primary-foreground shadow-medium" 
                          : "hover:bg-secondary hover:text-secondary-foreground"
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
