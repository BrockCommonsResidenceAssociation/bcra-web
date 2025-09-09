import { useState, useEffect } from "react";
import { fetchSheetData } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Download, Search, BookOpen, Shield, GraduationCap } from "lucide-react";

interface Document {
  id: string;
  title: string;
  description: string;
  category: string;
  fileSize: string;
  uploadDate: string;
  downloadCount: number;
}

const GeneralDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await fetchSheetData("documents");
        const formattedDocuments: Document[] = data.map((row: Record<string, string>) => ({
          id: row.id,
          title: row.title,
          description: row.description,
          category: row.category,
          fileSize: row.fileSize,
          uploadDate: row.uploadDate,
          downloadCount: parseInt(row.downloadCount, 10),
        }));
        setDocuments(formattedDocuments);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Policies": return <Shield className="w-4 h-4" />;
      case "Safety": return <Shield className="w-4 h-4" />;
      case "Academic": return <GraduationCap className="w-4 h-4" />;
      case "Facilities": return <BookOpen className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Policies": "bg-blue-100 text-blue-800",
      "Safety": "bg-red-100 text-red-800",
      "Academic": "bg-green-100 text-green-800",
      "Facilities": "bg-purple-100 text-purple-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="space-y-12">
        <section className="space-y-8">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-1/3" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-2/3" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-12">

      <section className="space-y-8">
        <div className="flex items-center space-x-3">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-primary">General Documents</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map(doc => (
              <Card key={doc.id} className="p-6 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 bg-gradient-card">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(doc.category)}
                    <Badge className={getCategoryColor(doc.category)}>
                      {doc.category}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{doc.fileSize}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-card-foreground line-clamp-2 h-12">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {doc.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatDate(doc.uploadDate)}</span>
                  <span>{doc.downloadCount} downloads</span>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </Card>
            ))
          ) : (
            <div className="col-span-full py-8 text-center text-sm text-muted-foreground">
              No documents found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default GeneralDocuments;
