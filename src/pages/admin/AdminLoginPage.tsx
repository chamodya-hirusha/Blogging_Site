import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, setAuth } from "@/lib/auth";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      if (email === "admin@blog.com" && password === "admin123") {
        setAuth(true);
        navigate("/admin");
      } else {
        setError("Invalid credentials. Please try again.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-3xl" />

      <div className="w-full max-w-[440px] z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary shadow-xl shadow-primary/30 mb-6 animate-bounce-subtle">
            <span className="text-primary-foreground font-black text-3xl">S</span>
          </div>
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-2">Welcome Back</h1>
          <p className="text-muted-foreground font-medium">Access the StudentBlog Management Suite</p>
        </div>

        <div className="bg-white border border-border shadow-2xl rounded-[32px] p-10 backdrop-blur-sm bg-white/90">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-2xl bg-destructive/5 border border-destructive/20 text-destructive text-sm font-bold animate-in shake duration-500">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Work Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 border border-border rounded-2xl bg-muted/20 text-foreground text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all placeholder:text-muted-foreground/40"
                placeholder="admin@blog.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Security Key</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 border border-border rounded-2xl bg-muted/20 text-foreground text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all placeholder:text-muted-foreground/40"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full py-4 rounded-2xl bg-primary text-primary-foreground text-sm font-black shadow-lg shadow-primary/30 hover:shadow-xl hover:translate-y-[-2px] active:translate-y-[0px] transition-all overflow-hidden disabled:opacity-70 disabled:translate-y-0"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>Sign In to Dashboard</>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-border/50 text-center">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">
              Demo Environment Access<br />
              <span className="text-primary mt-1 inline-block">admin@blog.com / admin123</span>
            </p>
          </div>
        </div>

        <p className="text-center mt-8 text-xs font-bold text-muted-foreground/50 uppercase tracking-widest italic">
          Secure • Encrypted • High Performance
        </p>
      </div>

      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .group-hover\\:animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-in.shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
};

export default AdminLoginPage;
