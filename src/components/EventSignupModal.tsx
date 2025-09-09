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
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EventSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventSignupModal = ({ isOpen, onClose }: EventSignupModalProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/mailing-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast({
          title: "Subscribed!",
          description: "You've been added to our mailing list.",
        });
        setEmail("");
        onClose();
      } else {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request. Please try again.",
          variant: "destructive",
        });
      }
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
            <Mail className="w-7 h-7 text-primary" />
          </div>
          <div className="space-y-2">
            <DialogTitle className="text-2xl font-bold text-foreground">
              Stay in the Loop!
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Sign up to receive the latest updates on residence events, news, and announcements.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="pt-6 space-y-4">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              className="flex-grow"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventSignupModal;
