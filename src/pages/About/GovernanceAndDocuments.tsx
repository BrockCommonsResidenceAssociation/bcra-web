import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const GovernanceAndDocuments = () => {
  const governanceDocs = [
    { name: "Constitution", description: "Our founding principles and governance structure" },
    { name: "Bylaws", description: "Operating procedures and policies" },
    { name: "Code of Conduct", description: "Community standards and expectations" },
    { name: "Financial Policy", description: "Budget allocation and spending guidelines" }
  ];

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-primary">Governance & Documents</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Transparency is important to us. Access our governing documents and learn how we operate.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {governanceDocs.map((doc) => (
          <Card key={doc.name} className="p-6 hover:shadow-medium transition-shadow duration-300 bg-gradient-card group cursor-pointer">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  {doc.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {doc.description}
                </p>
                <Button variant="ghost" className="text-xs p-0 h-auto text-primary">
                  Download PDF →
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default GovernanceAndDocuments;