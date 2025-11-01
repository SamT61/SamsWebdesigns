import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Calendar, Clock, CheckCircle } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    preferredDate: "",
    preferredTime: ""
  });

  const timeSlots = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Consultation booked:", formData);
    setStep("success");
    setTimeout(() => {
      setStep("form");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        preferredDate: "",
        preferredTime: ""
      });
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-background rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-border">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        {step === "form" ? (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2 text-foreground">Kostenlose Erstberatung</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Lass uns über dein Projekt sprechen und schauen, wie ich dir helfen kann
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1 text-foreground">Name *</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Dein Name"
                  required
                  className="bg-card border-border text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-foreground">Email *</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="deine@email.com"
                  required
                  className="bg-card border-border text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-foreground">Telefon</label>
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+49 123 456789"
                  className="bg-card border-border text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-foreground">Unternehmen</label>
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Dein Unternehmen"
                  className="bg-card border-border text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-foreground">Bevorzugtes Datum</label>
                <Input
                  name="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="bg-card border-border text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-foreground">Bevorzugte Uhrzeit</label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, preferredTime: e.target.value }))}
                  className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Wähle eine Uhrzeit</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-foreground">Kurze Beschreibung deines Projekts</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Worum geht es bei deinem Projekt?"
                  rows={3}
                  className="bg-card border-border text-sm"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-sm font-semibold"
              >
                Beratung vereinbaren
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Ich melde mich innerhalb von 24 Stunden bei dir
              </p>
            </form>
          </div>
        ) : (
          <div className="p-6 flex flex-col items-center justify-center min-h-80">
            <CheckCircle className="h-16 w-16 text-primary mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-foreground mb-2 text-center">Anfrage erhalten!</h3>
            <p className="text-sm text-muted-foreground text-center">
              Danke für deine Anfrage. Ich melde mich in Kürze bei dir, um deine kostenlose Erstberatung zu vereinbaren.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
