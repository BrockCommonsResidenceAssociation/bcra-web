import { useState, useEffect } from "react";
import { fetchSheetData } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, Clock, Filter, Mail, Search, CalendarPlus, Check } from "lucide-react";
import { atcb_action } from "add-to-calendar-button";
import "@/assets/atcb.css";
import hockeyImage from "../assets/community-events.jpg";
import movieImage from "../assets/hero-residence.jpg";
import EventSignupModal from "@/components/EventSignupModal";
import EventRSVPModal from "@/components/EventRSVPModal";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  building: string;
  category: string;
  capacity: number;
  registered: number;
  image?: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEventsAndRSVPs = async () => {
      try {
        const [eventsData, rsvpData] = await Promise.all([
          fetchSheetData("events"),
          fetchSheetData("events_rsvp"),
        ]);

        const rsvpCounts = rsvpData.reduce((acc: Record<string, number>, rsvp: Record<string, string>) => {
          acc[rsvp.event_id] = (acc[rsvp.event_id] || 0) + 1;
          return acc;
        }, {});

        const formattedEvents: Event[] = eventsData.map((row: Record<string, string>) => ({
          id: row.id,
          title: row.title,
          description: row.description,
          date: row.date,
          startTime: row.start_time,
          endTime: row.end_time,
          location: row.location,
          building: row.building,
          category: row.category,
          capacity: parseInt(row.capacity, 10),
          registered: rsvpCounts[row.id] || 0,
          image: row.image || (row.category === 'Sports' ? hockeyImage : movieImage),
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEventsAndRSVPs();
  }, []);

  const buildings = ["All Buildings", "Brock Tallwood", "Brock North", "Brock South and Iona"];
  const categories = ["Sports", "Social", "Entertainment", "Educational", "Meeting"];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBuilding = selectedBuilding === "all" || event.building === selectedBuilding;
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    
    return matchesSearch && matchesBuilding && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Sports": "bg-red-100 text-red-800",
      "Social": "bg-blue-100 text-blue-800", 
      "Entertainment": "bg-purple-100 text-purple-800",
      "Educational": "bg-green-100 text-green-800",
      "Meeting": "bg-gray-100 text-gray-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatForCalendar = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleAddToCalendar = (event: Event) => {
    const { title, description, location, date, startTime, endTime } = event;

    const config: {
      name: string;
      description: string;
      startDate: string;
      endDate: string;
      startTime?: string;
      endTime?: string;
      location: string;
      options: ("Apple" | "Google" | "iCal" | "Microsoft365" | "Outlook.com" | "Yahoo")[];
      iCalFileName: string;
    } = {
      name: title,
      description: description,
      startDate: formatForCalendar(date),
      endDate: formatForCalendar(date),
      startTime: startTime,
      endTime: endTime,
      location: location,
      options: ["Apple", "Google", "iCal", "Microsoft365", "Outlook.com", "Yahoo"],
      iCalFileName: "reminder-event",
    };

    atcb_action(config);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header */}
        <section className="relative text-center space-y-4 animate-fade-in bg-events-hero bg-cover bg-center rounded-lg p-12 md:p-20">
          <div className="absolute inset-0 bg-black/50 rounded-lg"></div>
          <div className="relative space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">Upcoming Events</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join your community! From sports tournaments to study breaks, there's always something happening at Brock Commons.
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-3">
              <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Buildings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Buildings</SelectItem>
                  {buildings.filter(b => b !== "All Buildings").map(building => (
                    <SelectItem key={building} value={building}>{building}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button variant="default" className="gap-2" onClick={() => setIsModalOpen(true)}>
              <Mail className="w-4 h-4" />
              Get Updates
            </Button>
          </div>
        </section>

        {/* Events Grid */}
        <section className="space-y-6">
          {filteredEvents.length === 0 ? (
            <Card className="p-12 text-center space-y-4">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto" />
              <h3 className="text-xl font-semibold text-muted-foreground">No events found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map(event => (
                <Card key={event.id} className="overflow-hidden hover:shadow-medium transition-all duration-300 hover:-translate-y-1 bg-gradient-card">
                  {event.image && (
                    <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />
                  )}
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <Badge className={getCategoryColor(event.category)}>
                        {event.category}
                      </Badge>
                      <div className="text-right text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.registered}/{event.capacity}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-card-foreground line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {event.description}
                      </p>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {event.startTime} - {event.endTime}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    </div>

                    <div className="pt-4 space-y-3">
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          className="flex-1 gap-2"
                          size="sm"
                          onClick={() => {
                            setSelectedEvent(event);
                            setIsRSVPModalOpen(true);
                          }}
                          disabled
                        >
                          <Check className="w-4 h-4" />
                          RSVP
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => handleAddToCalendar(event)}
                        >
                          <CalendarPlus className="w-4 h-4" />
                          Add to Calendar
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
      <EventSignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {selectedEvent && (
        <EventRSVPModal
          isOpen={isRSVPModalOpen}
          onClose={() => {
            setIsRSVPModalOpen(false);
            // Refetch data to update RSVP count
            const fetchEventsAndRSVPs = async () => {
              try {
                const [eventsData, rsvpData] = await Promise.all([
                  fetchSheetData("events"),
                  fetchSheetData("events_rsvp"),
                ]);

                const rsvpCounts = rsvpData.reduce((acc: Record<string, number>, rsvp: Record<string, string>) => {
                  acc[rsvp.event_id] = (acc[rsvp.event_id] || 0) + 1;
                  return acc;
                }, {});

                const formattedEvents: Event[] = eventsData.map((row: Record<string, string>) => ({
                  id: row.id,
                  title: row.title,
                  description: row.description,
                  date: row.date,
                  startTime: row.start_time,
                  endTime: row.end_time,
                  location: row.location,
                  building: row.building,
                  category: row.category,
                  capacity: parseInt(row.capacity, 10),
                  registered: rsvpCounts[row.id] || 0,
                  image: row.image || (row.category === 'Sports' ? hockeyImage : movieImage),
                }));
                setEvents(formattedEvents);
              } catch (error) {
                console.error("Failed to fetch events:", error);
              }
            };
            fetchEventsAndRSVPs();
          }}
          eventName={selectedEvent.title}
          eventId={selectedEvent.id}
        />
      )}
    </div>
  );
};

export default Events;
