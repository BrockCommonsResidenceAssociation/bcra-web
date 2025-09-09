import { useState, useEffect } from "react";
import { fetchSheetData } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Position {
  title: string;
  description: string;
  commitment: string;
}

const Volunteer = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const data = await fetchSheetData("volunteer_positions");
        const formattedPositions: Position[] = data.map((row: Record<string, string>) => ({
          title: row.title,
          description: row.description,
          commitment: row.commitment,
        }));
        setPositions(formattedPositions);
      } catch (error) {
        console.error("Failed to fetch positions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <Skeleton className="h-48 w-full" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <Skeleton className="h-10 w-full" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <section className="relative text-center space-y-4 animate-fade-in bg-events-hero bg-cover bg-center rounded-lg p-12 md:p-20">
          <div className="absolute inset-0 bg-black/50 rounded-lg"></div>
          <div className="relative space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Volunteer with Us
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Make a difference in your community by volunteering for one of our open positions. Your contribution helps make Brock Commons a better place to live.
            </p>
          </div>
        </section>

        <section className="space-y-8">
          {positions.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {positions.map((position) => (
                <Card key={position.title} className="p-6 bg-card border flex flex-col">
                  <div className="space-y-4 flex-grow">
                    <h3 className="text-xl font-semibold text-card-foreground">{position.title}</h3>
                    <p className="text-muted-foreground">{position.description}</p>
                    <p className="text-sm text-primary font-medium">Commitment: {position.commitment}</p>
                  </div>
                  <div className="mt-6">
                    <Button className="w-full group">
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-xl text-muted-foreground">No volunteer positions available at this time.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Volunteer;
