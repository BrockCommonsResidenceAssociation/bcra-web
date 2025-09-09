import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import { Calendar, Mail, FileText, Users, ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import EventSignupModal from "@/components/EventSignupModal";
import heroImage from "@/assets/hero-residence.jpg";
import communityImage from "@/assets/community-events.jpg";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const quickActions = [
    {
      title: "Upcoming Events",
      description: "View and RSVP to take part in residence events",
      icon: Calendar,
      path: "/events",
      color: "bg-accent text-accent-foreground border-1"
    },
    {
      title: "Event Updates",
      description: "Sign up for the latest event news and updates",
      icon: Mail,
      action: () => setIsModalOpen(true),
      color: "bg-primary text-primary-foreground"
    },
    {
      title: "Resources & Documents",
      description: "Access policies, guides, and meeting minutes", 
      icon: FileText,
      path: "/resources",
      color: "bg-secondary text-secondary-foreground"
    },
    {
      title: "Meet the Team",
      description: "Learn about your residence association",
      icon: Users,
      path: "/about",
      color: "bg-muted text-muted-foreground"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero rounded-2xl">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Brock Commons Residence" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                  Welcome to<br />
                  <span className="bg-gradient-to-r from-primary-glow to-accent bg-clip-text text-transparent">
                    Brock Commons
                  </span>
                </h1>
                <p className="text-xl text-primary-foreground/90 max-w-lg">
                  Your home away from home. Connect with your community, participate in events, and make the most of your residence experience.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/events">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto group">
                    View Events
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-background/10 border-primary-foreground/30 text-primary-foreground hover:bg-background/20" onClick={() => setIsModalOpen(true)}>
                  Get Updates
                </Button>
              </div>
              
              <div className="flex items-center space-x-2 text-primary-foreground/80">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">University of British Columbia, Vancouver</span>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <img 
                src={communityImage} 
                alt="Community Events" 
                className="rounded-2xl shadow-strong w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="py-24 space-y-24">
        {/* Announcements Section */}
        <AnnouncementBanner />

        {/* Quick Actions */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-primary">Quick Actions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to stay connected with your residence community
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              const CardContent = (
                <Card className="p-6 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 group cursor-pointer bg-card border h-full">
                  <div className="space-y-4">
                    <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                    <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-medium">Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              );

              if (action.path) {
                return (
                  <Link key={action.title} to={action.path}>
                    {CardContent}
                  </Link>
                );
              }

              return (
                <div key={action.title} onClick={action.action}>
                  {CardContent}
                </div>
              );
            })}
          </div>
        </section>

        {/* Community Stats */}
        <section className="bg-card border rounded-2xl p-8 lg:p-12">
          <div className="text-center space-y-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary">Our Community</h2>
            
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-bold text-primary">4</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">Buildings</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-bold text-accent">1200+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">Residents</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-bold text-primary-light">30+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">Events Annually</div>
              </div>
            </div>
          </div>
        </section>

        {/* Get Involved Section */}
        <section className="text-center space-y-8 bg-muted/40 rounded-2xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-primary">Get Involved</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Be a part of what makes our community great. Volunteer, join a committee, or run for a position on the council.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/volunteer">
              <Button size="lg">View Open Positions</Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-primary">What Our Residents Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from members of the Brock Commons community.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-card border">
              <p className="text-muted-foreground mb-4">"Living here has been an amazing experience. The events are fun and it's easy to meet new people."</p>
              <p className="font-semibold text-card-foreground">- Deep Shah</p>
            </Card>
            <Card className="p-6 bg-card border">
              <p className="text-muted-foreground mb-4">"The sense of community is strong. I've made lifelong friends and feel supported by my neighbors."</p>
              <p className="font-semibold text-card-foreground">- Dhruva Devaraj</p>
            </Card>
            <Card className="p-6 bg-card border">
              <p className="text-muted-foreground mb-4">"I love the amenities and how responsive the residence association is. It truly feels like home."</p>
              <p className="font-semibold text-card-foreground">- Sean </p>
            </Card>
          </div>
        </section>
      </div>
      <EventSignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Home;
