import { useState } from "react";
import { siteSettings } from "@/data/mock";

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({ ...siteSettings });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Site Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
        {(
          [
            { key: "siteTitle" as const, label: "Site Title" },
            { key: "tagline" as const, label: "Tagline" },
            { key: "logoText" as const, label: "Logo Text" },
            { key: "footerText" as const, label: "Footer Text" },
          ] as const
        ).map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
            <input
              type="text"
              value={settings[key]}
              onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
              className="w-full px-3 py-2.5 border border-border rounded-lg bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary"
            />
          </div>
        ))}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
          >
            Save Settings
          </button>
          {saved && <span className="text-sm text-success font-medium">Saved!</span>}
        </div>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
