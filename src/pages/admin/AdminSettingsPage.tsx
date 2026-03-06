import { useState } from "react";
import { siteSettings } from "@/data/mock";
import { toast } from "sonner";
import { Settings as SettingsIcon, Save } from "lucide-react";

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({ ...siteSettings });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm font-medium">Configure your blog's global identity and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="bg-white border border-border shadow-sm rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border bg-muted/20 flex items-center gap-2 text-primary">
              <SettingsIcon size={18} strokeWidth={2.5} />
              <h3 className="font-bold text-sm uppercase tracking-wider">General Configuration</h3>
            </div>
            <div className="p-8 space-y-6">
              {(
                [
                  { key: "siteTitle" as const, label: "Site Title", placeholder: "e.g. My Awesome Blog" },
                  { key: "tagline" as const, label: "Tagline", placeholder: "e.g. Ideas and stories" },
                  { key: "logoText" as const, label: "Logo Text", placeholder: "e.g. LEARN" },
                  { key: "footerText" as const, label: "Footer Text", placeholder: "e.g. © 2026 My Blog" },
                ] as const
              ).map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="text-xs font-bold text-foreground mb-2 block uppercase tracking-tight">{label}</label>
                  <input
                    type="text"
                    value={settings[key]}
                    placeholder={placeholder}
                    onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-xl bg-muted/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  />
                </div>
              ))}

              <div className="pt-4 border-t border-border mt-8 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Save size={18} strokeWidth={3} /> Save Configuration
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-accent/30 border border-accent rounded-2xl">
            <h4 className="font-bold text-accent-foreground mb-2 text-sm">Pro Tip</h4>
            <p className="text-xs text-accent-foreground/80 leading-relaxed font-medium">
              Changing your site title helps search engines identify your blog better. Keep it concise yet descriptive!
            </p>
          </div>

          <div className="p-6 bg-muted/30 border border-border rounded-2xl">
            <h4 className="font-bold text-foreground mb-2 text-sm">Public Preview</h4>
            <div className="p-4 bg-white rounded-xl border border-border shadow-sm">
              <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Header Logo</p>
              <p className="text-lg font-extrabold text-primary">{settings.logoText}</p>
              <div className="h-px bg-border my-3" />
              <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Footer</p>
              <p className="text-[11px] text-foreground font-medium">{settings.footerText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
