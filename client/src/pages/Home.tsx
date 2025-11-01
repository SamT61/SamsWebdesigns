import { useAuth } from "@/_core/hooks/useAuth";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { ArrowRight, Code2, Palette, Smartphone, Star, ExternalLink, ChevronDown, ChevronUp, Sun, Moon, Check, Zap, Globe, Users, TrendingUp, Layers, Phone, Sparkles } from "lucide-react";
import { useState } from "react";
import ConsultationModal from "@/components/ConsultationModal";
import Timeline from "@/components/Timeline";

export default function Home() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

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
    "React & TypeScript", "Node.js & Express",
    "Database Design", "Mobile Optimization", "Performance",
    "SEO Basics", "Figma", "Webflow", "WordPress"
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "€1.500",
      description: "Für Anfänger und kleine Projekte",
      features: [
        { text: "5-8 Seiten Website", icon: <Globe className="h-4 w-4" /> },
        { text: "Responsive Design", icon: <Smartphone className="h-4 w-4" /> },
        { text: "Basic SEO Optimierung", icon: <TrendingUp className="h-4 w-4" /> },
        { text: "Kontaktformular", icon: <Users className="h-4 w-4" /> },
        { text: "3 Überarbeitungsrunden", icon: <Layers className="h-4 w-4" /> },
        { text: "2 Wochen kostenlosen Support", icon: <Zap className="h-4 w-4" /> }
      ]
    },
    {
      name: "Professional",
      price: "€3.500",
      description: "Für wachsende Unternehmen",
      features: [
        { text: "10-15 Seiten Website", icon: <Globe className="h-4 w-4" /> },
        { text: "Custom Design & Branding", icon: <Palette className="h-4 w-4" /> },
        { text: "CMS Integration (einfache Verwaltung)", icon: <Layers className="h-4 w-4" /> },
        { text: "E-Commerce Grundlagen", icon: <TrendingUp className="h-4 w-4" /> },
        { text: "Unbegrenzte Überarbeitungen", icon: <Check className="h-4 w-4" /> },
        { text: "1 Monat kostenlosen Support", icon: <Zap className="h-4 w-4" /> },
        { text: "Google Analytics Setup", icon: <TrendingUp className="h-4 w-4" /> }
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "€7.500+",
      description: "Für komplexe & maßgeschneiderte Lösungen",
      features: [
        { text: "Unbegrenzte Seiten & Features", icon: <Globe className="h-4 w-4" /> },
        { text: "Custom Web App Entwicklung", icon: <Code2 className="h-4 w-4" /> },
        { text: "Datenbank Integration", icon: <Layers className="h-4 w-4" /> },
        { text: "Advanced Features & Automationen", icon: <Zap className="h-4 w-4" /> },
        { text: "Dedicated Support & Consulting", icon: <Users className="h-4 w-4" /> },
        { text: "3 Monate kostenlosen Support", icon: <Zap className="h-4 w-4" /> },
        { text: "Performance Optimization", icon: <TrendingUp className="h-4 w-4" /> }
      ]
    }
  ];

  const services = [
    {
      icon: <Palette className="h-8 w-8" />,
      title: "UI/UX Design",
      description: "Ich erstelle benutzerfreundliche Interfaces, die nicht nur schön aussehen, sondern auch intuitiv zu bedienen sind. Jedes Design wird basierend auf User Research und Best Practices entwickelt, um maximale Conversion zu erreichen."
    },
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "Web Development",
      description: "Moderne, schnelle und sichere Websites mit den neuesten Technologien. Von Frontend bis Backend - ich baue Websites, die performant sind und dein Business unterstützen. Responsive, SEO-optimiert und zukunftssicher."
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Optimization",
      description: "Deine Website muss auf allen Geräten perfekt aussehen. Ich optimiere jede Website für Mobile, Tablet und Desktop, damit deine Kunden überall eine großartige Erfahrung haben."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Performance & SEO",
      description: "Eine schnelle Website ist eine erfolgreiche Website. Ich optimiere Ladezeiten, Suchmaschinen-Rankings und User Experience, damit deine Website mehr Traffic und Conversions bringt."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Web Apps & Systeme",
      description: "Komplexe Webanwendungen, die dein Business automatisieren und effizienter machen. Von Dashboards bis zu Custom-Lösungen - ich baue Tools, die wirklich funktionieren."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Consulting & Support",
      description: "Du brauchst Rat? Ich biete umfassende Beratung zu Webdesign, Strategie und Technologie. Langfristiger Support nach dem Launch ist selbstverständlich."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-14">
          <div className="text-xl font-bold text-primary">Abdulsamed Temel</div>
          <div className="flex items-center gap-4">
            <a href="#work" className="text-xs md:text-sm hover:text-primary transition-colors">Arbeiten</a>
            <a href="#services" className="text-xs md:text-sm hover:text-primary transition-colors">Services</a>
            <a href="#pricing" className="text-xs md:text-sm hover:text-primary transition-colors">Preise</a>
            <a href="#faq" className="text-xs md:text-sm hover:text-primary transition-colors">FAQ</a>
            <a href="#contact" className="text-xs md:text-sm hover:text-primary transition-colors">Kontakt</a>
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-muted rounded-lg transition-all duration-300 ease-out"
              title={theme === 'light' ? 'Dunkler Modus' : 'Heller Modus'}
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4 transition-transform duration-300" />
              ) : (
                <Sun className="h-4 w-4 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-50" />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-slide-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-foreground">
                Webdesign, das <span className="text-primary">dein Business voranbringt</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-2 leading-relaxed font-semibold">
                Ich bin Abdulsamed Temel - Web Designer & Developer
              </p>
              <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">
                Moderne Websites, die nicht nur schön aussehen, sondern auch Ergebnisse liefern. Ich kombiniere kreatives Design mit technischer Exzellenz, um dein Unternehmen online erfolgreich zu machen.
              </p>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
                <p className="text-sm md:text-base text-foreground font-semibold">
                  💡 <span className="text-primary">Mein Versprechen:</span> Jede Website ist eine Investition in dein Geschäft - mit messbaren Ergebnissen und langfristiger Unterstützung.
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Button 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90 text-sm font-semibold animate-pulse shadow-lg hover:shadow-xl transition-all"
                  onClick={() => setIsConsultationOpen(true)}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Kostenlose Beratung
                </Button>
                <Button size="sm" variant="outline" className="text-sm">
                  Portfolio ansehen
                </Button>
              </div>
            </div>
            <div className="relative h-64 md:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20 shadow-lg">
                <div className="space-y-3">
                  <div className="h-20 bg-primary/10 rounded-lg animate-pulse" />
                  <div className="h-16 bg-secondary/10 rounded-lg animate-pulse" />
                  <div className="h-14 bg-primary/10 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-20 bg-card border-y border-border">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Was ich anbiete</h2>
            <p className="text-sm md:text-base text-muted-foreground">Umfassende Lösungen für dein Online-Erfolg</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, idx) => (
              <Card key={idx} className="p-5 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent hover:shadow-md transition-shadow">
                <div className="text-primary mb-3">{service.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{service.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-16 md:py-20">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Ausgewählte Arbeiten</h2>
            <p className="text-sm md:text-base text-muted-foreground">Projekte, die zeigen, was ich kann</p>
          </div>

          {projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 border-border">
                  <div className="h-32 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Code2 className="h-10 w-10 text-primary opacity-50" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-bold mb-1 text-foreground">{project.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
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
            <div className="text-center py-8">
              <div className="bg-background p-8 rounded-lg border border-border">
                <Code2 className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-sm text-muted-foreground">Projekte werden in Kürze hinzugefügt</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-20 bg-card border-y border-border">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Über mich</h2>
              <p className="text-sm md:text-base text-muted-foreground mb-3 leading-relaxed">
                Ich bin Abdulsamed Temel, ein leidenschaftlicher Web Designer und Developer mit über 5 Jahren Erfahrung. Meine Mission ist es, Websites zu schaffen, die nicht nur beeindruckend aussehen, sondern auch messbare Ergebnisse für dein Business liefern.
              </p>
              <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
                Ich glaube an einen ganzheitlichen Ansatz: Großartige Websites entstehen durch die Kombination von kreativem Design, technischer Exzellenz und tiefem Verständnis für deine Zielgruppe. Jedes Projekt ist eine Partnerschaft, und dein Erfolg ist mein Erfolg.
              </p>
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-sm font-semibold"
                onClick={() => setIsConsultationOpen(true)}
              >
                <Phone className="mr-2 h-4 w-4" />
                Jetzt beraten lassen
              </Button>
            </div>
            <div className="relative h-64">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20 shadow-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-1">5+</div>
                  <p className="text-xs md:text-sm text-muted-foreground">Jahre Erfahrung</p>
                  <div className="mt-4 pt-4 border-t border-primary/20">
                    <p className="text-xs text-muted-foreground">50+ erfolgreiche Projekte</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-12 bg-background rounded-lg p-6 border border-border">
            <h3 className="text-xl font-bold mb-6 text-foreground">Meine Karriere-Highlights</h3>
            <Timeline />
          </div>

          {/* Skills */}
          <div className="mt-12 bg-background rounded-lg p-6 border border-border">
            <h3 className="text-xl font-bold mb-4 text-foreground">Meine Fähigkeiten</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {skills.map((skill, idx) => (
                <div key={idx} className="bg-card p-3 rounded-lg border border-border hover:border-primary transition-colors text-center">
                  <p className="text-xs font-medium text-foreground">{skill}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-20">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Transparente Preise</h2>
            <p className="text-sm md:text-base text-muted-foreground">Für jedes Budget die richtige Lösung</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {pricingPlans.map((plan, idx) => (
              <Card
                key={idx}
                className={`p-5 border transition-all ${
                  plan.highlighted
                    ? "border-primary bg-gradient-to-br from-primary/10 to-secondary/10 shadow-lg md:scale-105"
                    : "border-border"
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full inline-block mb-3">
                    BELIEBT
                  </div>
                )}
                <h3 className="text-lg font-bold mb-1 text-foreground">{plan.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-primary">{plan.price}</span>
                </div>
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex gap-2 text-xs text-muted-foreground items-start">
                      <span className="text-primary flex-shrink-0 mt-0.5">{feature.icon}</span>
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full font-semibold ${plan.highlighted ? "bg-primary hover:bg-primary/90 shadow-lg" : ""}`}
                  variant={plan.highlighted ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsConsultationOpen(true)}
                >
                  {plan.highlighted ? "Jetzt buchen" : "Anfragen"}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-card border-y border-border">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Was Kunden sagen</h2>
            <p className="text-sm md:text-base text-muted-foreground">Echte Bewertungen von echten Kunden</p>
          </div>

          {testimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="p-5 border-border bg-background">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="text-sm font-bold text-foreground">{testimonial.clientName}</p>
                    {testimonial.clientRole && (
                      <p className="text-xs text-muted-foreground">{testimonial.clientRole}</p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">Testimonials werden in Kürze hinzugefügt</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-20">
        <div className="container max-w-2xl">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Häufig gestellte Fragen</h2>
            <p className="text-sm md:text-base text-muted-foreground">Antworten auf die wichtigsten Fragen</p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, idx) => (
              <Card
                key={idx}
                className="border-border cursor-pointer hover:border-primary transition-colors"
                onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
              >
                <div className="p-4 flex items-center justify-between">
                  <h3 className="text-sm md:text-base font-semibold text-foreground">{item.question}</h3>
                  {expandedFAQ === idx ? (
                    <ChevronUp className="h-4 w-4 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
                {expandedFAQ === idx && (
                  <div className="px-4 pb-4 border-t border-border pt-3">
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-20 bg-card border-y border-border">
        <div className="container max-w-2xl">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Lass uns zusammenarbeiten</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Hast du ein Projekt im Kopf? Kontaktiere mich und lass uns etwas Großartiges schaffen
            </p>
          </div>

          <Card className="p-5 border-border bg-background">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-medium mb-1 text-foreground">Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Dein Name"
                  required
                  className="bg-card border-border text-sm"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium mb-1 text-foreground">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="deine@email.com"
                  required
                  className="bg-card border-border text-sm"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium mb-1 text-foreground">Nachricht</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Erzähl mir von deinem Projekt..."
                  rows={4}
                  required
                  className="bg-card border-border text-sm"
                />
              </div>
              <Button type="submit" size="sm" className="w-full bg-primary hover:bg-primary/90 text-sm">
                Nachricht senden
              </Button>
              {formSubmitted && (
                <div className="p-3 bg-secondary/20 text-secondary rounded-lg text-center text-xs">
                  Danke für deine Nachricht! Ich melde mich in Kürze.
                </div>
              )}
            </form>
          </Card>
        </div>
      </section>

      {/* Floating CTA Button */}
      <button
        onClick={() => setIsConsultationOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 animate-bounce"
        title="Kostenlose Beratung"
      >
        <Phone className="h-6 w-6" />
      </button>

      {/* Consultation Modal */}
      <ConsultationModal 
        isOpen={isConsultationOpen} 
        onClose={() => setIsConsultationOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <h3 className="font-bold mb-2 text-sm text-foreground">Abdulsamed Temel</h3>
              <p className="text-xs text-muted-foreground">Web Designer & Developer</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-xs text-foreground">Services</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li><a href="#services" className="hover:text-primary transition-colors">Web Design</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Development</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Consulting</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-xs text-foreground">Links</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">Preise</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Kontakt</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-xs text-foreground">Social</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
            <p>&copy; 2024 Abdulsamed Temel. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
