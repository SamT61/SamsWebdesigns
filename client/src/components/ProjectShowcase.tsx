import { Card } from "@/components/ui/card";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { Star } from "lucide-react";

interface ProjectShowcaseItem {
  id: string;
  title: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  improvements: string[];
  rating?: number;
}

interface ProjectShowcaseProps {
  projects?: ProjectShowcaseItem[];
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const defaultProjects: ProjectShowcaseItem[] = [
    {
      id: "1",
      title: "E-Commerce Redesign",
      beforeImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect fill='%23e0e0e0' width='800' height='400'/%3E%3Ctext x='50%' y='50%' font-size='24' fill='%23999' text-anchor='middle' dominant-baseline='middle'%3EVorher: Veraltetes Design%3C/text%3E%3C/svg%3E",
      afterImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect fill='%230066cc' width='800' height='400'/%3E%3Ctext x='50%' y='50%' font-size='24' fill='%23fff' text-anchor='middle' dominant-baseline='middle'%3ENachher: Modernes Design%3C/text%3E%3C/svg%3E",
      description: "Komplettes Redesign einer E-Commerce-Plattform mit verbesserter Benutzerfreundlichkeit",
      improvements: [
        "Conversion Rate um 45% erhöht",
        "Mobile Traffic um 60% gesteigert",
        "Ladezeit um 70% reduziert"
      ],
      rating: 5
    },
    {
      id: "2",
      title: "Corporate Website Modernisierung",
      beforeImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect fill='%23d0d0d0' width='800' height='400'/%3E%3Ctext x='50%' y='50%' font-size='24' fill='%23666' text-anchor='middle' dominant-baseline='middle'%3EVorher: Statische Website%3C/text%3E%3C/svg%3E",
      afterImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect fill='%2300cc88' width='800' height='400'/%3E%3Ctext x='50%' y='50%' font-size='24' fill='%23fff' text-anchor='middle' dominant-baseline='middle'%3ENachher: Interaktive Website%3C/text%3E%3C/svg%3E",
      description: "Modernisierung einer Corporate-Website mit neuen Features und besserer Performance",
      improvements: [
        "SEO Ranking von Platz 15 auf Platz 3",
        "Leads um 80% erhöht",
        "Bounce Rate um 35% gesenkt"
      ],
      rating: 5
    },
    {
      id: "3",
      title: "SaaS Dashboard Entwicklung",
      beforeImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect fill='%23e8e8e8' width='800' height='400'/%3E%3Ctext x='50%' y='50%' font-size='24' fill='%23777' text-anchor='middle' dominant-baseline='middle'%3EVorher: Einfaches Interface%3C/text%3E%3C/svg%3E",
      afterImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect fill='%23ff6600' width='800' height='400'/%3E%3Ctext x='50%' y='50%' font-size='24' fill='%23fff' text-anchor='middle' dominant-baseline='middle'%3ENachher: Professionelles Dashboard%3C/text%3E%3C/svg%3E",
      description: "Entwicklung eines modernen SaaS-Dashboards mit erweiterten Analysefunktionen",
      improvements: [
        "User Retention um 55% verbessert",
        "Durchschnittliche Sitzungsdauer +120%",
        "Feature-Adoption Rate 90%"
      ],
      rating: 5
    }
  ];

  const showcaseProjects = projects || defaultProjects;

  return (
    <div className="w-full space-y-8">
      {showcaseProjects.map((project) => (
        <Card key={project.id} className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="p-6">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                {project.rating && (
                  <div className="flex gap-0.5">
                    {[...Array(project.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </div>

            {/* Before-After Slider */}
            <div className="mb-6 rounded-lg overflow-hidden">
              <BeforeAfterSlider
                beforeImage={project.beforeImage}
                afterImage={project.afterImage}
                beforeLabel="Vorher"
                afterLabel="Nachher"
                height="350px"
              />
            </div>

            {/* Improvements */}
            <div className="grid md:grid-cols-3 gap-3">
              {project.improvements.map((improvement, idx) => (
                <div
                  key={idx}
                  className="bg-background p-3 rounded-lg border border-primary/20 hover:border-primary transition-colors"
                >
                  <p className="text-xs md:text-sm font-semibold text-primary mb-1">
                    ✓ Verbesserung {idx + 1}
                  </p>
                  <p className="text-xs text-muted-foreground">{improvement}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
