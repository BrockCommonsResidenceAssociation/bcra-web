import { useState, useEffect } from "react";
import { fetchSheetData } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface TeamMember {
  name: string;
  position: string;
  email: string;
  bio: string;
  linkedin: string;
  photoUrl: string;
}

const ExecutiveTeam = () => {
  const [executiveTeam, setExecutiveTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await fetchSheetData("executive_team");
        const formattedTeam: TeamMember[] = data.map((row: Record<string, string>) => ({
          name: row.name,
          position: row.position,
          email: row.email,
          bio: row.bio,
          linkedin: row.linkedin,
          photoUrl: row.photoUrl,
        }));
        setExecutiveTeam(formattedTeam);
      } catch (error) {
        console.error("Failed to fetch executive team:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <Skeleton className="h-8 w-1/2 mx-auto" />
          <Skeleton className="h-6 w-3/4 mx-auto" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-6 flex flex-col items-center text-center">
              <Skeleton className="w-24 h-24 rounded-full mb-4" />
              <Skeleton className="h-6 w-1/2 mb-2" />
              <Skeleton className="h-4 w-1/4 mb-4" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <div className="flex items-center space-x-2 pt-4 mt-auto w-full">
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-10 w-1/2" />
              </div>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-primary">Meet Your Executive Team</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Dedicated students working hard to represent your interests and enhance residence life
        </p>
      </div>

      {executiveTeam.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {executiveTeam.map((member) => (
            <Card key={member.name} className="p-6 flex flex-col items-center text-center hover:shadow-medium transition-shadow duration-300 bg-gradient-card">
              <img src={member.photoUrl} alt={`Photo of ${member.name}`} className="w-24 h-24 rounded-full mb-4 object-cover" />
              <div className="flex flex-col flex-grow">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-card-foreground">{member.name}</h3>
                  <Badge variant="default" className="bg-primary/10 text-primary">
                    {member.position}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3 flex-grow">
                  {member.bio}
                </p>
              </div>
              <div className="flex items-center space-x-2 pt-4 mt-auto w-full">
                <Button asChild size="sm" variant="outline" className="flex-1" disabled={!member.email}>
                  <a href={`mailto:${member.email}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </a>
                </Button>
                <Button asChild size="sm" variant="default" disabled={member.linkedin === "#"}>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl text-muted-foreground">No executive team members found.</p>
        </div>
      )}
    </section>
  );
};

export default ExecutiveTeam;
