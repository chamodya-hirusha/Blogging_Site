import { posts, categories, contactMessages } from "@/data/mock";

const AdminDashboard = () => {
  const published = posts.filter((p) => p.status === "published").length;
  const drafts = posts.filter((p) => p.status === "draft").length;
  const unread = contactMessages.filter((m) => m.status === "unread").length;

  const stats = [
    { label: "Total Posts", value: posts.length, color: "bg-primary/10 text-primary" },
    { label: "Published", value: published, color: "bg-success/10 text-success" },
    { label: "Drafts", value: drafts, color: "bg-warning/10 text-warning" },
    { label: "Categories", value: categories.length, color: "bg-accent text-accent-foreground" },
    { label: "Unread Messages", value: unread, color: "bg-destructive/10 text-destructive" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-5">
            <p className="text-sm text-muted-foreground mb-1">{s.label}</p>
            <p className={`text-2xl font-bold`}>{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
