import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import SiteLayout from "./components/SiteLayout";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Resources from "./pages/Resources";
import Scoreboard from "./pages/Scoreboard";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Volunteer from "./pages/Volunteer";
import GeneralDocuments from "./pages/GeneralDocuments";
import CouncilMeetingMinutes from "./pages/CouncilMeetingMinutes";
import MissionAndCommunity from "./pages/About/MissionAndCommunity";
import ExecutiveTeam from "./pages/About/ExecutiveTeam";
import GovernanceAndDocuments from "./pages/About/GovernanceAndDocuments";
import Clubs from "./pages/Clubs";
import ArtsAndMediaClub from "./pages/Clubs/ArtsAndMediaClub";
import HealthAndFitnessClub from "./pages/Clubs/HealthAndFitnessClub";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <div className="min-h-screen bg-background">
          <Navigation />
          <SiteLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/resources" element={<Resources />}>
                <Route index element={<Navigate to="documents" replace />} />
                <Route path="documents" element={<GeneralDocuments />} />
                <Route path="minutes" element={<CouncilMeetingMinutes />} />
              </Route>
              <Route path="/clubs" element={<Clubs />}>
                <Route index element={<Navigate to="arts-and-media" replace />} />
                <Route path="arts-and-media" element={<ArtsAndMediaClub />} />
                <Route path="health-and-fitness" element={<HealthAndFitnessClub />} />
              </Route>
              <Route path="/scoreboard" element={<Scoreboard />} />
              <Route path="/about" element={<AboutUs />}>
                <Route index element={<Navigate to="mission-and-community" replace />} />
                <Route path="mission-and-community" element={<MissionAndCommunity />} />
                <Route path="executive-team" element={<ExecutiveTeam />} />
                <Route path="governance-and-documents" element={<GovernanceAndDocuments />} />
              </Route>
              <Route path="/contact" element={<Contact />} />
              <Route path="/volunteer" element={<Volunteer />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SiteLayout>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
