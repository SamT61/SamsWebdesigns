import { Card } from "@/components/ui/card";
import { Award, Briefcase, Rocket, Star, Trophy, Target } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  type: "project" | "milestone" | "achievement";
}

interface TimelineProps {
  items?: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  const defaultItems: TimelineItem[] = [
    {
      year: "2019",
      title: "Karrierestart",
      description: "Beginn meiner Reise als Web Designer mit erstem großen Projekt für lokales Startup",
      icon: <Rocket className="h-6 w-6" />,
      type: "milestone"
    },
    {
      year: "2020",
      title: "Erste 10 Projekte",
      description: "Erfolgreiche Umsetzung von 10+ Webdesign-Projekten für verschiedene Branchen",
      icon: <Trophy className="h-6 w-6" />,
      type: "achievement"
    },
    {
      year: "2021",
      title: "Spezialisierung auf React",
      description: "Tiefgehendes Studium und Spezialisierung auf React & TypeScript Entwicklung",
      icon: <Briefcase className="h-6 w-6" />,
      type: "project"
    },
    {
      year: "2022",
      title: "30+ erfolgreiche Projekte",
      description: "Durchbruch mit über 30 abgeschlossenen Projekten und 5-Sterne-Bewertungen",
      icon: <Star className="h-6 w-6" />,
      type: "achievement"
    },
    {
      year: "2023",
      title: "Full-Stack Expertise",
      description: "Entwicklung von komplexen Web Apps mit vollständigem Tech-Stack",
      icon: <Award className="h-6 w-6" />,
      type: "achievement"
    },
    {
      year: "2024",
      title: "50+ Projekte & Consulting",
      description: "Expansion ins Consulting und Mentoring für andere Designer und Developer",
      icon: <Target className="h-6 w-6" />,
      type: "milestone"
    }
  ];

  const timelineItems = items || defaultItems;

  return (
    <div className="w-full py-8">
      {/* Desktop Timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineItems.map((item, idx) => (
              <div
                key={idx}
                className={`flex ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"} gap-8 items-center`}
              >
                {/* Content */}
                <div className="w-1/2">
                  <Card
                    className={`p-5 border-primary/30 hover:border-primary transition-all duration-300 hover:shadow-lg ${
                      item.type === "achievement"
                        ? "bg-gradient-to-br from-primary/10 to-secondary/10"
                        : "bg-background"
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="text-primary flex-shrink-0 mt-1">{item.icon}</div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-primary mb-1">{item.year}</p>
                        <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </Card>
                </div>

                {/* Center Dot */}
                <div className="w-auto flex justify-center">
                  <div className="relative">
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />
                    <div className="absolute inset-0 w-4 h-4 bg-primary rounded-full animate-ping opacity-75" />
                  </div>
                </div>

                {/* Empty Space */}
                <div className="w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Timeline */}
      <div className="md:hidden">
        <div className="relative pl-8">
          {/* Vertical Line */}
          <div className="absolute left-1.5 top-0 w-0.5 h-full bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20" />

          {/* Timeline Items */}
          <div className="space-y-6">
            {timelineItems.map((item, idx) => (
              <div key={idx} className="relative">
                {/* Dot */}
                <div className="absolute -left-6 top-2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />

                {/* Card */}
                <Card
                  className={`p-4 border-primary/30 hover:border-primary transition-all duration-300 ${
                    item.type === "achievement"
                      ? "bg-gradient-to-br from-primary/10 to-secondary/10"
                      : "bg-background"
                  }`}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <div className="text-primary flex-shrink-0 mt-0.5">{item.icon}</div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-primary mb-0.5">{item.year}</p>
                      <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="mt-12 grid grid-cols-3 gap-4">
        <Card className="p-4 text-center border-primary/20 bg-gradient-to-br from-primary/10 to-transparent">
          <p className="text-2xl font-bold text-primary mb-1">50+</p>
          <p className="text-xs text-muted-foreground">Projekte</p>
        </Card>
        <Card className="p-4 text-center border-primary/20 bg-gradient-to-br from-primary/10 to-transparent">
          <p className="text-2xl font-bold text-primary mb-1">5+</p>
          <p className="text-xs text-muted-foreground">Jahre Erfahrung</p>
        </Card>
        <Card className="p-4 text-center border-primary/20 bg-gradient-to-br from-primary/10 to-transparent">
          <p className="text-2xl font-bold text-primary mb-1">100%</p>
          <p className="text-xs text-muted-foreground">Kundenzufriedenheit</p>
        </Card>
      </div>
    </div>
  );
}
