import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock auth context
let isAuthenticated = false;
export const getAuth = () => isAuthenticated;
export const setAuth = (v: boolean) => { isAuthenticated = v; };

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock credentials
    if (email === "admin@blog.com" && password === "admin123") {
      setAuth(true);
      navigate("/admin");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-foreground text-center mb-8">Admin Login</h1>
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 space-y-4">
          {error && <p className="text-destructive text-sm">{error}</p>}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary"
              placeholder="admin@blog.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
          >
            Sign In
          </button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Demo: admin@blog.com / admin123
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
