import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BookOpen, Archive } from "lucide-react";

export function Sidebar() {
  const navLinks = [
    { to: "/resources/documents", text: "General Documents", icon: BookOpen },
    { to: "/resources/minutes", text: "Council Meeting Minutes", icon: Archive },
  ];

  return (
    <aside className="w-64 flex-shrink-0">
      <div className="sticky top-24 space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Resources Menu</h2>
        <nav className="flex flex-col space-y-1">
          {navLinks.map(({ to, text, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  isActive && "bg-muted text-primary"
                )
              }
            >
              <Icon className="h-4 w-4" />
              {text}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
