import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { User, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { submitRSVP } from "@/lib/api";

interface EventRSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  eventId: string;
}

const EventRSVPModal = ({
  isOpen,
  onClose,
  eventName,
  eventId,
}: EventRSVPModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitRSVP({ eventId, name, email });

      toast({
        title: "RSVP Successful!",
        description: `You have successfully RSVP'd for ${eventName}.`,
      });
      setName("");
      setEmail("");
      onClose();
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background border-2 border-primary/10 shadow-lg rounded-2xl p-8">
        <DialogHeader className="space-y-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-7 h-7 text-primary" />
          </div>
          <div className="space-y-2">
            <DialogTitle className="text-2xl font-bold text-foreground">
              RSVP for {eventName}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Please provide your name and email to RSVP for this event.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="pt-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="pl-10"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'RSVP Now'}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventRSVPModal;
