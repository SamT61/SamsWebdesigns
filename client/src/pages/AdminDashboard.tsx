import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Plus, Trash2, Edit2, LogOut } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"projects" | "testimonials">("projects");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Projects
  const { data: projects = [] } = trpc.portfolio.list.useQuery();
  const createProject = trpc.portfolio.create.useMutation();
  const updateProject = trpc.portfolio.update.useMutation();
  const deleteProject = trpc.portfolio.delete.useMutation();

  // Testimonials
  const { data: testimonials = [] } = trpc.testimonials.list.useQuery();
  const createTestimonial = trpc.testimonials.create.useMutation();
  const updateTestimonial = trpc.testimonials.update.useMutation();
  const deleteTestimonial = trpc.testimonials.delete.useMutation();

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    projectUrl: "",
    technologies: "",
  });

  const [testimonialForm, setTestimonialForm] = useState({
    clientName: "",
    clientRole: "",
    clientImage: "",
    content: "",
    rating: 5,
  });

  // Redirect if not admin
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You need to be an admin to access this page.
          </p>
          <Button onClick={() => setLocation("/")} className="w-full">
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  // Project handlers
  const handleAddProject = async () => {
    if (!projectForm.title || !projectForm.category) {
      alert("Please fill in title and category");
      return;
    }
    await createProject.mutateAsync({ ...projectForm, order: projects.length });
    setProjectForm({
      title: "",
      description: "",
      category: "",
      imageUrl: "",
      projectUrl: "",
      technologies: "",
    });
  };

  const handleDeleteProject = async (id: number) => {
    if (confirm("Are you sure?")) {
      await deleteProject.mutateAsync(id);
    }
  };

  // Testimonial handlers
  const handleAddTestimonial = async () => {
    if (!testimonialForm.clientName || !testimonialForm.content) {
      alert("Please fill in client name and content");
      return;
    }
    await createTestimonial.mutateAsync({ ...testimonialForm, order: testimonials.length });
    setTestimonialForm({
      clientName: "",
      clientRole: "",
      clientImage: "",
      content: "",
      rating: 5,
    });
  };

  const handleDeleteTestimonial = async (id: number) => {
    if (confirm("Are you sure?")) {
      await deleteTestimonial.mutateAsync(id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <div>
            <h1 className="text-2xl font-bold gradient-text">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome, {user.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setLocation("/")}
            >
              Back to Site
            </Button>
            <Button
              variant="ghost"
              onClick={() => logout()}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === "projects"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab("testimonials")}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === "testimonials"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Testimonials
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-8">
            {/* Add Project Form */}
            <Card className="p-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <h2 className="text-2xl font-bold mb-6">Add New Project</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    value={projectForm.title}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, title: e.target.value })
                    }
                    placeholder="Project title"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Input
                      value={projectForm.category}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, category: e.target.value })
                      }
                      placeholder="e.g., E-commerce, Corporate"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Technologies</label>
                    <Input
                      value={projectForm.technologies}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, technologies: e.target.value })
                      }
                      placeholder="React, Tailwind, Node.js"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={projectForm.description}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, description: e.target.value })
                    }
                    placeholder="Project description"
                    rows={3}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Image URL</label>
                    <Input
                      value={projectForm.imageUrl}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, imageUrl: e.target.value })
                      }
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Project URL</label>
                    <Input
                      value={projectForm.projectUrl}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, projectUrl: e.target.value })
                      }
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <Button
                  onClick={handleAddProject}
                  disabled={createProject.isPending}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </div>
            </Card>

            {/* Projects List */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Projects</h2>
              {projects.length > 0 ? (
                <div className="grid gap-4">
                  {projects.map((project) => (
                    <Card key={project.id} className="p-6 border-primary/20">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {project.description}
                          </p>
                          <div className="flex gap-2 flex-wrap">
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              {project.category}
                            </span>
                            {project.technologies && (
                              <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">
                                {project.technologies}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingId(project.id)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProject(project.id)}
                            disabled={deleteProject.isPending}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center border-border">
                  <p className="text-muted-foreground">No projects yet. Add your first one!</p>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === "testimonials" && (
          <div className="space-y-8">
            {/* Add Testimonial Form */}
            <Card className="p-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <h2 className="text-2xl font-bold mb-6">Add New Testimonial</h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Client Name</label>
                    <Input
                      value={testimonialForm.clientName}
                      onChange={(e) =>
                        setTestimonialForm({
                          ...testimonialForm,
                          clientName: e.target.value,
                        })
                      }
                      placeholder="Client name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Client Role</label>
                    <Input
                      value={testimonialForm.clientRole}
                      onChange={(e) =>
                        setTestimonialForm({
                          ...testimonialForm,
                          clientRole: e.target.value,
                        })
                      }
                      placeholder="CEO, Manager, etc."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Testimonial</label>
                  <Textarea
                    value={testimonialForm.content}
                    onChange={(e) =>
                      setTestimonialForm({
                        ...testimonialForm,
                        content: e.target.value,
                      })
                    }
                    placeholder="What did the client say?"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Rating (1-5)</label>
                  <select
                    value={testimonialForm.rating}
                    onChange={(e) =>
                      setTestimonialForm({
                        ...testimonialForm,
                        rating: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} Star{num !== 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <Button
                  onClick={handleAddTestimonial}
                  disabled={createTestimonial.isPending}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Testimonial
                </Button>
              </div>
            </Card>

            {/* Testimonials List */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Testimonials</h2>
              {testimonials.length > 0 ? (
                <div className="grid gap-4">
                  {testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="p-6 border-primary/20">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex gap-1 mb-2">
                            {[...Array(testimonial.rating || 5)].map((_, i) => (
                              <span key={i} className="text-secondary">★</span>
                            ))}
                          </div>
                          <p className="text-muted-foreground mb-3 italic">
                            "{testimonial.content}"
                          </p>
                          <div>
                            <p className="font-bold">{testimonial.clientName}</p>
                            {testimonial.clientRole && (
                              <p className="text-sm text-muted-foreground">
                                {testimonial.clientRole}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingId(testimonial.id)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTestimonial(testimonial.id)}
                            disabled={deleteTestimonial.isPending}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center border-border">
                  <p className="text-muted-foreground">No testimonials yet. Add your first one!</p>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
