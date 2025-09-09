import { Link } from "react-router-dom";
import { MapPin, Mail, Instagram, Twitter, Facebook } from "lucide-react";
import logo from "@/assets/logo.svg";

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Brock Commons Logo" className="w-12 h-12 rounded-lg" />
              <div>
                <h3 className="text-xl font-bold text-primary">Brock Commons</h3>
                <p className="text-xs text-muted-foreground">Residence Association</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Enhancing the residence experience at the University of British Columbia.
            </p>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 mr-2" />
              <span>University of British Columbia, Vancouver</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary">Home</Link></li>
                <li><Link to="/events" className="text-sm text-muted-foreground hover:text-primary">Events</Link></li>
                <li><Link to="/resources" className="text-sm text-muted-foreground hover:text-primary">Resources</Link></li>
                <li><Link to="/scoreboard" className="text-sm text-muted-foreground hover:text-primary">Scoreboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">About</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
                <li><Link to="/about/executive-team" className="text-sm text-muted-foreground hover:text-primary">Executive Team</Link></li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/ubcbcra/" className="text-muted-foreground hover:text-primary"><Instagram className="h-6 w-6" /></a>
              {/* <a href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-6 w-6" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-6 w-6" /></a> */}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Brock Commons Residence Association.
          </p>
          <div className="flex items-center text-sm text-muted-foreground mt-4 sm:mt-0">
            <Mail className="h-4 w-4 mr-2" />
            <a href="mailto:bcra@ubcrha.ca" className="hover:text-primary">bcra@ubcrha.ca</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
