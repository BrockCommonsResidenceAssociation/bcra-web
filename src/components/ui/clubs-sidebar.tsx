import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Palette, HeartPulse } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";

export function ClubsSidebar() {
  const isMobile = useIsMobile();

  const navLinks = [
    { to: "/clubs/arts-and-media", text: "Arts and Media Club", icon: Palette },
    { to: "/clubs/health-and-fitness", text: "Health and Fitness Club", icon: HeartPulse },
  ];

  const navContent = (
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
  );

  if (isMobile) {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="clubs-menu">
          <AccordionTrigger className="text-lg font-semibold tracking-tight">Clubs Menu</AccordionTrigger>
          <AccordionContent>
            {navContent}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }

  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="sticky top-24 space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Clubs Menu</h2>
        {navContent}
      </div>
    </aside>
  );
}
