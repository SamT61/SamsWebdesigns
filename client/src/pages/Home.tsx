import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { ArrowRight, Code2, Palette, Smartphone, Star, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { data: projects = [] } = trpc.portfolio.list.useQuery();
  const { data: testimonials = [] } = trpc.testimonials.list.useQuery();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this to your backend
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="text-2xl font-bold gradient-text">Portfolio</div>
          <div className="flex items-center gap-4">
            <a href="#services" className="text-sm hover:text-primary transition-colors duration-300">Services</a>
            <a href="#projects" className="text-sm hover:text-primary transition-colors duration-300">Projects</a>
            <a href="#testimonials" className="text-sm hover:text-primary transition-colors duration-300">Testimonials</a>
            <a href="#contact" className="text-sm hover:text-primary transition-colors duration-300">Contact</a>
            {user && <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-50" />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="gradient-text">Web Design</span> That Converts
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                I create stunning, user-centric websites that help your business grow. From concept to launch, I deliver designs that inspire and convert.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  View My Work
                </Button>
              </div>
            </div>
            <div className="relative h-96 md:h-full animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 border border-primary/20 glow-effect">
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

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">My Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive web design solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Palette className="h-8 w-8" />,
                title: "UI/UX Design",
                description: "Beautiful, intuitive interfaces that users love to interact with"
              },
              {
                icon: <Code2 className="h-8 w-8" />,
                title: "Web Development",
                description: "Fast, responsive websites built with modern technologies"
              },
              {
                icon: <Smartphone className="h-8 w-8" />,
                title: "Mobile Design",
                description: "Seamless experiences across all devices and screen sizes"
              }
            ].map((service, idx) => (
              <Card key={idx} className="p-8 card-hover border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                <div className="text-primary mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="projects" className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Recent Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {projects.length > 0 ? "Explore my latest work" : "Add your first project to showcase your portfolio"}
            </p>
          </div>

          {projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden card-hover border-primary/20">
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="text-center">
                      <Code2 className="h-12 w-12 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Project Image</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
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
              <div className="bg-card p-12 rounded-lg border border-border">
                <Code2 className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground mb-4">No projects yet. Add your first project to get started!</p>
                {user?.role === "admin" && (
                  <Button variant="outline">Add Project</Button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 md:py-32 bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              What my clients say about working with me
            </p>
          </div>

          {testimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="p-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-bold">{testimonial.clientName}</p>
                    {testimonial.clientRole && (
                      <p className="text-sm text-muted-foreground">{testimonial.clientRole}</p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-background p-12 rounded-lg border border-border">
                <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground mb-4">No testimonials yet. Add your first testimonial!</p>
                {user?.role === "admin" && (
                  <Button variant="outline">Add Testimonial</Button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32">
        <div className="container max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-lg text-muted-foreground">
              Have a project in mind? Get in touch and let's create something amazing
            </p>
          </div>

          <Card className="p-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                Send Message
              </Button>
              {formSubmitted && (
                <div className="p-4 bg-secondary/20 text-secondary rounded-lg text-center">
                  Thanks for reaching out! I'll get back to you soon.
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
              <h3 className="font-bold mb-4">Portfolio</h3>
              <p className="text-sm text-muted-foreground">Creating beautiful web experiences</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#services" className="hover:text-primary">UI/UX Design</a></li>
                <li><a href="#services" className="hover:text-primary">Web Development</a></li>
                <li><a href="#services" className="hover:text-primary">Mobile Design</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#projects" className="hover:text-primary">Projects</a></li>
                <li><a href="#testimonials" className="hover:text-primary">Testimonials</a></li>
                <li><a href="#contact" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Twitter</a></li>
                <li><a href="#" className="hover:text-primary">LinkedIn</a></li>
                <li><a href="#" className="hover:text-primary">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Web Design Portfolio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
