import { Outlet } from "react-router-dom";
import { AboutSidebar } from "@/components/ui/about-sidebar";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Header */}
        <section className="relative text-center space-y-6 animate-fade-in bg-events-hero bg-cover bg-center rounded-lg p-12 md:p-20">
          <div className="absolute inset-0 bg-black/50 rounded-lg"></div>
          <div className="relative space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">About Us</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              The Brock Commons Residence Association represents all residents across our four buildings,
              fostering community, organizing events, and advocating for student needs.
            </p>
          </div>
        </section>

        <div className="flex flex-col md:flex-row gap-12">
          <AboutSidebar />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
