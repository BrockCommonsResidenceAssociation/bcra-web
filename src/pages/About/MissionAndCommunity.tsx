import { Card } from "@/components/ui/card";
import { Users, Target, Heart } from "lucide-react";

const MissionAndCommunity = () => {
  return (
    <section className="space-y-8">
      <Card className="p-6 text-center space-y-4 bg-gradient-card hover:shadow-medium transition-shadow duration-300">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Target className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-primary">Our Mission</h3>
        <p className="text-muted-foreground">
          To create an inclusive, vibrant residential community that supports academic success, 
          personal growth, and lifelong friendships.
        </p>
      </Card>

      <Card className="p-6 text-center space-y-4 bg-gradient-card hover:shadow-medium transition-shadow duration-300">
        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
          <Heart className="w-6 h-6 text-accent" />
        </div>
        <h3 className="text-xl font-semibold text-primary">Our Values</h3>
        <p className="text-muted-foreground">
          Respect, inclusivity, collaboration, and fun guide everything we do. 
          We celebrate diversity and create spaces where everyone belongs.
        </p>
      </Card>

      <Card className="p-6 text-center space-y-4 bg-gradient-card hover:shadow-medium transition-shadow duration-300">
        <div className="w-12 h-12 bg-primary-light/10 rounded-full flex items-center justify-center mx-auto">
          <Users className="w-6 h-6 text-primary-light" />
        </div>
        <h3 className="text-xl font-semibold text-primary">Our Community</h3>
        <p className="text-muted-foreground">
          Over 1200 residents call Brock Commons home. Together, we build traditions, 
          support each other, and make university life unforgettable.
        </p>
      </Card>
    </section>
  );
};

export default MissionAndCommunity;