import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getAuth, setAuth } from "./AdminLoginPage";
import { LayoutDashboard, FileText, FolderOpen, MessageSquare, Settings, LogOut } from "lucide-react";

const sidebarLinks = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/posts", label: "Posts", icon: FileText },
  { to: "/admin/categories", label: "Categories", icon: FolderOpen },
  { to: "/admin/messages", label: "Messages", icon: MessageSquare },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!getAuth()) {
    navigate("/admin/login");
    return null;
  }

  const handleLogout = () => {
    setAuth(false);
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-60 border-r border-border bg-card hidden md:flex flex-col">
        <div className="p-4 border-b border-border">
          <Link to="/" className="text-lg font-bold text-primary">StudentBlog</Link>
          <p className="text-xs text-muted-foreground">Admin Panel</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground w-full"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Top bar (mobile) */}
        <header className="md:hidden border-b border-border bg-card p-4 flex items-center justify-between">
          <Link to="/admin" className="font-bold text-primary">Admin</Link>
          <button onClick={handleLogout} className="text-sm text-muted-foreground">Logout</button>
        </header>
        {/* Mobile nav */}
        <nav className="md:hidden border-b border-border bg-card flex overflow-x-auto">
          {sidebarLinks.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-3 text-xs font-medium whitespace-nowrap ${
                  active ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
