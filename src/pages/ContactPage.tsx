import { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.subject.trim()) errs.subject = "Subject is required";
    if (!form.message.trim()) errs.message = "Message is required";
    else if (form.message.length > 1000) errs.message = "Message too long (max 1000 chars)";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    // Mock submission
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-3">Message Sent!</h1>
        <p className="text-muted-foreground">Thank you for reaching out. We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">Contact Us</h1>
        <p className="text-muted-foreground mb-8">
          Have a question or want to get in touch? Fill out the form below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {(["name", "email", "subject"] as const).map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-foreground mb-1.5 capitalize">
                {field}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="w-full px-3 py-2.5 border border-border rounded-lg bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary"
              />
              {errors[field] && <p className="text-destructive text-xs mt-1">{errors[field]}</p>}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              className="w-full px-3 py-2.5 border border-border rounded-lg bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary resize-none"
            />
            {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
