import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const Resources = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Header */}
        <section className="relative text-center space-y-4 animate-fade-in bg-events-hero bg-cover bg-center rounded-lg p-12 md:p-20">
          <div className="absolute inset-0 bg-black/50 rounded-lg"></div>
          <div className="relative space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">Resources & Documents</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Access important documents, policies, meeting minutes, and helpful resources for residence life.
            </p>
          </div>
        </section>

        <div className="flex gap-12">
          <Sidebar />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Resources;