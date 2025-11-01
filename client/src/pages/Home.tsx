import { useAuth } from "@/_core/hooks/useAuth";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { ArrowRight, Code2, Palette, Smartphone, Star, ExternalLink, ChevronDown, ChevronUp, Sun, Moon } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const { data: projects = [] } = trpc.portfolio.list.useQuery();
  const { data: testimonials = [] } = trpc.testimonials.list.useQuery();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const faqItems = [
    {
      question: "Wie lange dauert ein typisches Webdesign-Projekt?",
      answer: "Die Dauer hängt vom Umfang ab. Ein einfaches Website-Redesign dauert 2-4 Wochen, während komplexere Projekte mit Custom-Features 6-12 Wochen benötigen können."
    },
    {
      question: "Welche Technologien nutzt du?",
      answer: "Ich arbeite mit modernen Technologien wie React, TypeScript, Tailwind CSS, Node.js und verschiedenen Datenbanken. Die Wahl hängt von den Anforderungen deines Projekts ab."
    },
    {
      question: "Bietet ihr auch Wartung und Support an?",
      answer: "Ja, ich biete Wartungs- und Support-Pakete an. Nach dem Launch unterstütze ich dich bei Updates, Bug-Fixes und neuen Features."
    },
    {
      question: "Wie läuft der Designprozess ab?",
      answer: "1. Beratung & Anforderungsanalyse, 2. Wireframes & Konzept, 3. Design-Mockups, 4. Feedback & Überarbeitungen, 5. Entwicklung, 6. Testing & Launch"
    },
    {
      question: "Kann ich meine Website später selbst anpassen?",
      answer: "Ja! Ich erstelle Websites, die leicht zu verwalten sind. Du erhältst Dokumentation und Zugang zu einem Admin-Panel, um Inhalte selbst zu aktualisieren."
    },
    {
      question: "Wie viel kostet eine Website?",
      answer: "Die Preise variieren je nach Komplexität. Schau dir meine Pricing-Tabelle an oder kontaktiere mich für ein individuelles Angebot."
    }
  ];

  const skills = [
    "UI/UX Design", "Web Development", "Responsive Design",
    "Frontend (React, TypeScript)", "Backend (Node.js, Express)",
    "Database Design", "Mobile Optimization", "Performance Optimization",
    "SEO Basics", "Figma Design", "Webflow", "WordPress"
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "€1,500",
      description: "Perfekt für kleine Projekte",
      features: [
        "5-8 Seiten Website",
        "Responsive Design",
        "Basic SEO",
        "Kontaktformular",
        "3 Überarbeitungsrunden",
        "2 Wochen Support"
      ]
    },
    {
      name: "Professional",
      price: "€3,500",
      description: "Für wachsende Unternehmen",
      features: [
        "10-15 Seiten Website",
        "Custom Design",
        "CMS Integration",
        "E-Commerce Grundlagen",
        "Unbegrenzte Überarbeitungen",
        "1 Monat Support",
        "Analytics Setup"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "€7,500+",
      description: "Für komplexe Anforderungen",
      features: [
        "Unbegrenzte Seiten",
        "Custom Web App",
        "Datenbank Integration",
        "Advanced Features",
        "Dedicated Support",
        "3 Monate Support",
        "Performance Optimization"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="text-2xl font-bold text-primary">Design Studio</div>
          <div className="flex items-center gap-6">
            <a href="#work" className="text-sm hover:text-primary transition-colors">Work</a>
            <a href="#about" className="text-sm hover:text-primary transition-colors">About</a>
            <a href="#pricing" className="text-sm hover:text-primary transition-colors">Pricing</a>
            <a href="#faq" className="text-sm hover:text-primary transition-colors">FAQ</a>
            <a href="#contact" className="text-sm hover:text-primary transition-colors">Contact</a>
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-50" />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
                Webdesign, das <span className="text-primary">wirklich funktioniert</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Ich erstelle moderne, benutzerfreundliche Websites, die dein Business voranbringen. Von der Idee bis zum Launch – mit Leidenschaft und Expertise.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Projekt starten <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Portfolio ansehen
                </Button>
              </div>
            </div>
            <div className="relative h-96 md:h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 border border-primary/20 shadow-lg">
                <div className="space-y-4">
                  <div className="h-32 bg-primary/10 rounded-lg animate-pulse" />
                  <div className="h-24 bg-secondary/10 rounded-lg animate-pulse" />
                  <div className="h-20 bg-primary/10 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 md:py-32 bg-card border-y border-border">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Ausgewählte Arbeiten</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Projekte, die zeigen, was ich kann
            </p>
          </div>

          {projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 border-border">
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Code2 className="h-12 w-12 text-primary opacity-50" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-foreground">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                      {project.projectUrl && (
                        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 text-primary hover:text-primary/80" />
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-background p-12 rounded-lg border border-border">
                <Code2 className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Projekte werden in Kürze hinzugefügt</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Über mich</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Hallo! Ich bin ein leidenschaftlicher Webdesigner und Entwickler mit über 5 Jahren Erfahrung. Meine Mission ist es, Websites zu schaffen, die nicht nur schön aussehen, sondern auch messbare Ergebnisse liefern.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Ich glaube an einen ganzheitlichen Ansatz: Großartige Websites entstehen durch die Kombination von kreativem Design, technischer Exzellenz und tiefem Verständnis für deine Zielgruppe.
              </p>
              <div className="flex gap-4">
                <Button variant="outline">Mehr erfahren</Button>
              </div>
            </div>
            <div className="relative h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 border border-primary/20 shadow-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">5+</div>
                  <p className="text-muted-foreground">Jahre Erfahrung</p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-card rounded-lg p-8 border border-border">
            <h3 className="text-2xl font-bold mb-8 text-foreground">Meine Fähigkeiten</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.map((skill, idx) => (
                <div key={idx} className="bg-background p-4 rounded-lg border border-border hover:border-primary transition-colors">
                  <p className="text-sm font-medium text-foreground">{skill}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 bg-card border-y border-border">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Transparente Preise</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Für jedes Budget die richtige Lösung
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, idx) => (
              <Card
                key={idx}
                className={`p-8 border transition-all ${
                  plan.highlighted
                    ? "border-primary bg-gradient-to-br from-primary/10 to-secondary/10 shadow-lg scale-105"
                    : "border-border"
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    BELIEBT
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2 text-foreground">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="text-primary">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.highlighted ? "bg-primary hover:bg-primary/90" : ""}`}
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  Anfragen
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Was Kunden sagen</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Echte Bewertungen von echten Kunden
            </p>
          </div>

          {testimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="p-8 border-border bg-card">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-bold text-foreground">{testimonial.clientName}</p>
                    {testimonial.clientRole && (
                      <p className="text-sm text-muted-foreground">{testimonial.clientRole}</p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Testimonials werden in Kürze hinzugefügt</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-32 bg-card border-y border-border">
        <div className="container max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Häufig gestellte Fragen</h2>
            <p className="text-lg text-muted-foreground">
              Antworten auf die wichtigsten Fragen
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <Card
                key={idx}
                className="border-border cursor-pointer hover:border-primary transition-colors"
                onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
              >
                <div className="p-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">{item.question}</h3>
                  {expandedFAQ === idx ? (
                    <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
                {expandedFAQ === idx && (
                  <div className="px-6 pb-6 border-t border-border pt-4">
                    <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32">
        <div className="container max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Lass uns zusammenarbeiten</h2>
            <p className="text-lg text-muted-foreground">
              Hast du ein Projekt im Kopf? Kontaktiere mich und lass uns etwas Großartiges schaffen
            </p>
          </div>

          <Card className="p-8 border-border bg-card">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Dein Name"
                  required
                  className="bg-background border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="deine@email.com"
                  required
                  className="bg-background border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Nachricht</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Erzähl mir von deinem Projekt..."
                  rows={5}
                  required
                  className="bg-background border-border"
                />
              </div>
              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                Nachricht senden
              </Button>
              {formSubmitted && (
                <div className="p-4 bg-secondary/20 text-secondary rounded-lg text-center text-sm">
                  Danke für deine Nachricht! Ich melde mich in Kürze.
                </div>
              )}
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 text-foreground">Design Studio</h3>
              <p className="text-sm text-muted-foreground">Webdesign mit Leidenschaft und Expertise</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#work" className="hover:text-primary transition-colors">Web Design</a></li>
                <li><a href="#work" className="hover:text-primary transition-colors">Development</a></li>
                <li><a href="#work" className="hover:text-primary transition-colors">Consulting</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Social</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Design Studio. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
