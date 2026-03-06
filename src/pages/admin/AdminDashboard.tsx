import { posts, categories, contactMessages, visitors, comments } from "@/data/mock";
import { FileText, CheckCircle, FileEdit, Folder, MessageSquare, TrendingUp, Eye, Users, Globe, MessageCircle } from "lucide-react";

const AdminDashboard = () => {
  const published = posts.filter((p) => p.status === "published").length;
  const drafts = posts.filter((p) => p.status === "draft").length;
  const unread = contactMessages.filter((m) => m.status === "unread").length;
  const pendingComments = comments.filter((c) => c.status === "pending").length;
  const totalViews = posts.reduce((acc, p) => acc + (p.viewCount || 0), 0);

  const stats = [
    { label: "Total Views", value: totalViews.toLocaleString(), icon: Eye, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Published", value: published, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
    { label: "Pending Comments", value: pendingComments, icon: MessageCircle, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Unique Visitors", value: visitors.length, icon: Users, color: "text-cyan-600", bg: "bg-cyan-50" },
    { label: "Unread Msg", value: unread, icon: MessageSquare, color: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Management Suite</h1>
        <p className="text-muted-foreground mt-1 text-sm font-medium">Performance analytics and content oversight.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="group p-6 rounded-2xl bg-white border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${s.bg} ${s.color} group-hover:scale-110 transition-transform`}>
                  <Icon size={20} strokeWidth={2.5} />
                </div>
                <TrendingUp size={16} className="text-muted-foreground/30" />
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{s.label}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-foreground tracking-tight">{s.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-foreground">Top Performing Content</h3>
            <button className="text-xs font-bold text-primary hover:underline">Full Analytics</button>
          </div>
          <div className="space-y-4">
            {posts.sort((a, b) => b.viewCount - a.viewCount).slice(0, 4).map((post) => (
              <div key={post.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 transition-colors border border-transparent hover:border-border">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                    {post.coverImage ? (
                      <img src={post.coverImage} className="w-full h-full object-cover" alt="" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                        <FileText size={18} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground line-clamp-1">{post.title}</p>
                    <p className="text-[11px] text-muted-foreground font-medium">{post.viewCount.toLocaleString()} views • {post.category.name}</p>
                  </div>
                </div>
                <div className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-tight bg-indigo-50 text-indigo-700 border border-indigo-100`}>
                  #{posts.indexOf(post) + 1} Trending
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-2">Audience Retention</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Your "Productivity Tools" post is gaining traction. Consider writing a follow-up to engagement 45% more visitors.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white w-[75%] shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground/60 text-right">75% Goal Reached</p>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-cyan-100 text-cyan-700">
            <Globe size={18} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Live Insights: Recent Visitors</h3>
            <p className="text-xs text-muted-foreground font-medium">Detailed tracking of user interactions on your blog.</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border text-[11px] font-bold uppercase text-muted-foreground tracking-wider">
                <th className="px-4 py-3">Visitor</th>
                <th className="px-4 py-3">Last Viewed Post</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Device/Browser</th>
                <th className="px-4 py-3 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visitors.map((v) => {
                const post = posts.find(p => p.id === v.viewedPostId);
                return (
                  <tr key={v.id} className="text-sm hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-xs shadow-sm">
                          {v.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-foreground">{v.name}</p>
                          <p className="text-[10px] text-muted-foreground">{v.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-medium text-foreground line-clamp-1">{post?.title || "Home Page"}</p>
                      <p className="text-[10px] text-primary font-bold uppercase tracking-tight">{post?.category.name}</p>
                    </td>
                    <td className="px-4 py-4 font-medium text-muted-foreground text-xs">{v.location}</td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-0.5 rounded bg-muted text-[10px] font-bold text-muted-foreground border border-border">{v.browser}</span>
                    </td>
                    <td className="px-4 py-4 text-right text-xs font-bold text-foreground">
                      {new Date(v.lastVisit).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
