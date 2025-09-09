 import { useState, useEffect } from "react";
 import { fetchSheetData } from "@/lib/api";
 import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Medal, Award, TrendingUp, Star, Users, Calendar, Target } from "lucide-react";

interface BuildingScore {
  id: string;
  name: string;
  color: string;
  totalPoints: number;
  monthlyPoints: number;
  position: number;
  previousPosition: number;
  residents: number;
  completedEvents: number;
}

interface Event {
  id: string;
  name: string;
  date: string;
  category: string;
  points: { [buildingId: string]: number };
}

const Scoreboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("overall");
  const [buildings, setBuildings] = useState<BuildingScore[]>([]);
  const [recentEvents, setRecentEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScoreboardData = async () => {
      try {
        const buildingsData = await fetchSheetData("buildings");
        const formattedBuildings: BuildingScore[] = buildingsData.map((row: Record<string, string>) => ({
          id: row.id,
          name: row.name,
          color: row.color,
          totalPoints: parseInt(row.totalPoints, 10),
          monthlyPoints: parseInt(row.monthlyPoints, 10),
          position: parseInt(row.position, 10),
          previousPosition: parseInt(row.previousPosition, 10),
          residents: parseInt(row.residents, 10),
          completedEvents: parseInt(row.completedEvents, 10),
        }));
        setBuildings(formattedBuildings);

        const eventsData = await fetchSheetData("recent_events_scoreboard");
        const formattedEvents: Event[] = eventsData.map((row: Record<string, string>) => ({
          id: row.id,
          name: row.name,
          date: row.date,
          category: row.category,
          points: {
            "building-a": parseInt(row.building_a_points, 10),
            "building-b": parseInt(row.building_b_points, 10),
            "building-c": parseInt(row.building_c_points, 10),
          },
        }));
        setRecentEvents(formattedEvents);
      } catch (error) {
        console.error("Failed to fetch scoreboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScoreboardData();
  }, []);

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <Star className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getPositionChange = (current: number, previous: number) => {
    if (current < previous) return { direction: "up", change: previous - current };
    if (current > previous) return { direction: "down", change: current - previous };
    return { direction: "same", change: 0 };
  };

  const getTrendingIcon = (current: number, previous: number) => {
    const change = getPositionChange(current, previous);
    if (change.direction === "up") return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change.direction === "down") return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
    return <div className="w-4 h-4 rounded-full bg-gray-400" />;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-32 w-full" />
        <div className="space-y-6">
          <Skeleton className="h-12 w-1/3" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (buildings.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">No Scoreboard Data Found</h2>
          <p className="text-muted-foreground">
            Check back later for updates on building scores and recent events.
          </p>
        </div>
      </div>
    );
  }

  const maxPoints = Math.max(...buildings.map(b => b.totalPoints));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Header */}
        <section className="relative text-center space-y-4 animate-fade-in bg-events-hero bg-cover bg-center rounded-lg p-12 md:p-20">
          <div className="absolute inset-0 bg-black/50 rounded-lg"></div>
          <div className="relative space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <Trophy className="w-8 h-8 text-white" />
              <h1 className="text-4xl lg:text-5xl font-bold text-white">Building Scoreboard</h1>
            </div>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              See how your building ranks in the inter-building competitions. Points are earned through event participation, community service, and achievements.
            </p>
          </div>
        </section>

        {/* Current Leader Banner */}
        <section className="relative overflow-hidden bg-gradient-hero rounded-2xl p-8 lg:p-12 text-center">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <Trophy className="w-8 h-8 text-primary-foreground" />
              <h2 className="text-2xl lg:text-3xl font-bold text-primary-foreground">Current Leader</h2>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl lg:text-5xl font-bold text-primary-foreground">
                {buildings[0].name}
              </h3>
              <p className="text-xl text-primary-foreground/90">
                {buildings[0].totalPoints} Total Points
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-primary-foreground/80">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{buildings[0].residents} residents</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{buildings[0].completedEvents} events completed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leaderboard */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-primary">Current Standings</h2>
            <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <TabsList>
                <TabsTrigger value="overall">Overall</TabsTrigger>
                <TabsTrigger value="monthly">This Month</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-6">
            {buildings.map((building, index) => {
              const pointsToShow = selectedPeriod === "monthly" ? building.monthlyPoints : building.totalPoints;
              const maxPointsToShow = selectedPeriod === "monthly" 
                ? Math.max(...buildings.map(b => b.monthlyPoints))
                : maxPoints;
              const progressPercentage = (pointsToShow / maxPointsToShow) * 100;

              return (
                <Card key={building.id} className="p-6 hover:shadow-medium transition-all duration-300 bg-card border">
                  <div className="flex items-center space-x-6">
                    {/* Position & Icon */}
                    <div className="flex flex-col items-center space-y-2">
                      <div className="text-2xl font-bold text-primary">#{building.position}</div>
                      {getPositionIcon(building.position)}
                      <div className="flex items-center space-x-1">
                        {getTrendingIcon(building.position, building.previousPosition)}
                      </div>
                    </div>

                    {/* Building Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${building.color}`} />
                          <h3 className="text-xl font-semibold text-card-foreground">
                            {building.name}
                          </h3>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            {pointsToShow.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">points</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="w-full bg-secondary rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-500 ${building.color}`}
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <div className="flex space-x-4">
                            <span>{building.residents} residents</span>
                            <span>{building.completedEvents} events</span>
                          </div>
                          <span>{progressPercentage.toFixed(1)}% of leader</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Recent Events */}
        <section className="space-y-8">
          <div className="flex items-center space-x-3">
            <Target className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-primary">Recent Events & Points</h2>
          </div>

          <div className="space-y-4">
            {recentEvents.map(event => (
              <Card key={event.id} className="p-6 bg-card border">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-card-foreground">{event.name}</h3>
                      <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                        <Badge variant="secondary">{event.category}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {buildings.map(building => (
                      <div key={building.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${building.color}`} />
                          <span className="font-medium text-sm">{building.name}</span>
                        </div>
                        <span className="font-bold text-primary">
                          +{event.points[building.id]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* How Points Work */}
        <section className="bg-card border rounded-2xl p-8 lg:p-12 space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary">How Points Are Earned</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Buildings earn points through various activities and competitions throughout the year.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-card-foreground">Sports Events</h3>
              <p className="text-sm text-muted-foreground">Tournaments, games, and athletic competitions</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-card-foreground">Participation</h3>
              <p className="text-sm text-muted-foreground">Event attendance and community involvement</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-primary-light/10 rounded-full flex items-center justify-center mx-auto">
                <Star className="w-6 h-6 text-primary-light" />
              </div>
              <h3 className="font-semibold text-card-foreground">Community Service</h3>
              <p className="text-sm text-muted-foreground">Volunteer work and campus contributions</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-primary-glow/10 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-6 h-6 text-primary-glow" />
              </div>
              <h3 className="font-semibold text-card-foreground">Special Achievements</h3>
              <p className="text-sm text-muted-foreground">Outstanding contributions and recognition</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Scoreboard;
