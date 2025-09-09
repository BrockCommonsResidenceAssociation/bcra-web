import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Send, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: ""
  });

  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "Thank you for contacting us. We'll get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", subject: "", message: "", category: "" });
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      primary: "bcra@ubcrha.ca",
      secondary: "For general inquiries and support",
      color: "text-primary"
    },
  ];

  const socialLinks = [
    { icon: Instagram, name: "Instagram", handle: "@ubcbcra", href: "https://www.instagram.com/ubcbcra/" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Header */}
        <section className="relative text-center space-y-4 animate-fade-in bg-events-hero bg-cover bg-center rounded-lg p-12 md:p-20">
          <div className="absolute inset-0 bg-black/50 rounded-lg"></div>
          <div className="relative space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">Contact Us</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Have questions, suggestions, or need help? We're here to listen and support our community.
            </p>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <section className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Send us a Message</h2>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <Card className="p-6 bg-gradient-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="bcra@ubcrha.ca"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="event">Event Suggestion</SelectItem>
                      <SelectItem value="complaint">Complaint</SelectItem>
                      <SelectItem value="compliment">Compliment</SelectItem>
                      <SelectItem value="suggestion">Suggestion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="Brief description of your message"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </section>

          {/* Contact Information */}
          <section className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Get in Touch</h2>
              <p className="text-muted-foreground">
                Reach out to us through any of these channels. We're always happy to help!
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid gap-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index} className="p-4 hover:shadow-medium transition-shadow duration-300 bg-gradient-card">
                    <div className="flex items-start space-x-4">
                      <div className={`w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${info.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-card-foreground">{info.title}</h3>
                        <p className="text-primary font-medium">{info.primary}</p>
                        <p className="text-sm text-muted-foreground">{info.secondary}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Follow Us</h3>
              <div className="flex">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Button key={index} variant="outline" asChild>
                      <a href={social.href} className="group flex items-center p-2">
                        <Icon className="w-5 h-5 mr-2 text-muted-foreground transition-transform group-hover:scale-110 group-hover:text-primary" />
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-primary">{social.handle}</span>
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contact;
