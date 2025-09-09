import { useState, useEffect } from "react";
import { fetchSheetData } from "@/lib/api";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Download, Calendar, Archive } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MeetingMinute {
  id: string;
  title: string;
  date: string;
  year: string;
  fileSize: string;
  session: "S" | "W1" | "W2";
}

type MeetingMinutesByYear = { [year: string]: { [session: string]: MeetingMinute[] } };

const CouncilMeetingMinutes = () => {
  const [meetingMinutes, setMeetingMinutes] = useState<MeetingMinutesByYear>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMinutes = async () => {
      try {
        const data: MeetingMinute[] = await fetchSheetData("meeting_minutes");
        const formattedMinutes = data.reduce<MeetingMinutesByYear>((acc, row) => {
          const year = row.year;
          const session = row.session as "S" | "W1" | "W2";
          if (!acc[year]) {
            acc[year] = { "W1": [], "W2": [], "S": [] };
          }
          acc[year][session].push({
            id: row.id,
            title: row.title,
            date: row.date,
            year: year,
            fileSize: row.fileSize,
            session: session,
          });
          return acc;
        }, {});
        setMeetingMinutes(formattedMinutes);
      } catch (error) {
        console.error("Failed to fetch meeting minutes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMinutes();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <section className="space-y-8">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-1/3" />
        </div>
        <Card className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-8">
        <div className="flex items-center space-x-3">
        <Archive className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-primary">Council Meeting Minutes</h2>
        </div>

        <Card className="p-6 bg-gradient-card">
        {Object.keys(meetingMinutes).length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {Object.entries(meetingMinutes).map(([year, sessions]) => (
              <AccordionItem key={year} value={year}>
                <AccordionTrigger className="text-lg font-semibold text-primary">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5" />
                    <span>{year} Meeting Minutes</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Tabs defaultValue="W1" className="w-full pt-4">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="W1">Winter Term 1</TabsTrigger>
                      <TabsTrigger value="W2">Winter Term 2</TabsTrigger>
                      <TabsTrigger value="S">Summer</TabsTrigger>
                    </TabsList>
                    {Object.entries(sessions).map(([session, minutes]) => (
                      <TabsContent key={session} value={session}>
                        {minutes.length > 0 ? (
                          <div className="space-y-3 pt-4">
                            {minutes.map(minute => (
                              <div key={minute.id} className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
                                <div className="flex items-center space-x-3">
                                  <FileText className="w-4 h-4 text-muted-foreground" />
                                  <div>
                                    <h4 className="font-medium text-card-foreground">{minute.title}</h4>
                                    <p className="text-sm text-muted-foreground">{formatDate(minute.date)}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <span className="text-xs text-muted-foreground">{minute.fileSize}</span>
                                  <div className="flex space-x-2">
                                    <Button size="sm" variant="outline">
                                      View
                                    </Button>
                                    <Button size="sm">
                                      <Download className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="py-8 text-center text-sm text-muted-foreground">
                            No meetings for this session.
                          </div>
                        )}
                      </TabsContent>
                    ))}
                  </Tabs>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No meeting minutes found.
          </div>
        )}
        </Card>
    </section>
  );
};

export default CouncilMeetingMinutes;
