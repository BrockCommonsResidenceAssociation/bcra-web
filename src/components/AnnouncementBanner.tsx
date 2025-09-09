import { useState, useEffect } from "react";
import { fetchSheetData } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Bell, Calendar, AlertCircle } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: "urgent" | "event" | "info";
  date: string;
  dismissible?: boolean;
}

const AnnouncementBanner = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await fetchSheetData("announcements");
        const formattedAnnouncements: Announcement[] = data.map((row: Record<string, string>) => ({
          id: row.id,
          title: row.title,
          message: row.message,
          type: row.type as "urgent" | "event" | "info",
          date: row.date,
          dismissible: row.dismissible === "TRUE",
        }));
        setAnnouncements(formattedAnnouncements);
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const dismissAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(ann => ann.id !== id));
  };

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case "urgent": return <AlertCircle className="w-5 h-5" />;
      case "event": return <Calendar className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getAnnouncementVariant = (type: string): "destructive" | "default" | "secondary" => {
    switch (type) {
      case "urgent": return "destructive";
      case "event": return "default";
      default: return "secondary";
    }
  };

  if (announcements.length === 0) return null;

  return (
    <section className="space-y-4 animate-fade-in">
      <div className="flex items-center space-x-2">
        <Bell className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold text-primary">Latest Announcements</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="p-4 hover:shadow-medium transition-shadow duration-300 bg-gradient-card border-l-4 border-l-primary">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getAnnouncementIcon(announcement.type)}
                <Badge variant={getAnnouncementVariant(announcement.type)}>
                  {announcement.type.toUpperCase()}
                </Badge>
              </div>
              {announcement.dismissible && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dismissAnnouncement(announcement.id)}
                  className="h-6 w-6 p-0 hover:bg-secondary/50"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <h3 className="font-semibold text-card-foreground mb-2">
              {announcement.title}
            </h3>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
              {announcement.message}
            </p>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {new Date(announcement.date).toLocaleDateString()}
              </span>
              <span></span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default AnnouncementBanner;
