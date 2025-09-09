import { useState, useEffect } from "react";
import { fetchSheetData } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

interface ClubInfo {
  name: string;
  description: string;
  activities: string;
  meeting_details: string;
}

const HealthAndFitnessClub = () => {
  const [clubInfo, setClubInfo] = useState<ClubInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubInfo = async () => {
      try {
        const data = await fetchSheetData("clubs");
        const clubData = data.find(
          (row: Record<string, string>) => row.name === "Health and Fitness Club"
        );
        if (clubData) {
          setClubInfo({
            name: clubData.name,
            description: clubData.description,
            activities: clubData.activities,
            meeting_details: clubData.meeting_details,
          });
        }
      } catch (error) {
        console.error("Failed to fetch club info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubInfo();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-12 w-1/2" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-8 w-1/4" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-2/3" />
        </div>
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (!clubInfo) {
    return <div>Nothing is found</div>;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">{clubInfo.name}</h2>
      <p>{clubInfo.description}</p>
      <h3 className="text-2xl font-semibold">Our Activities</h3>
      <ul className="list-disc list-inside space-y-2">
        {clubInfo.activities.split(',').map((activity, index) => (
          <li key={index}>{activity.trim()}</li>
        ))}
      </ul>
      <h3 className="text-2xl font-semibold">Join Us</h3>
      <p>{clubInfo.meeting_details}</p>
    </div>
  );
};

export default HealthAndFitnessClub;
