import { useState } from "react";
import { categories as initialCategories, type Category } from "@/data/mock";
import { Plus, Trash2, Edit, Check, X, FolderPlus } from "lucide-react";
import { toast } from "sonner";

const AdminCategoriesPage = () => {
  const [cats, setCats] = useState<Category[]>(initialCategories);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const addCategory = () => {
    if (!newName.trim()) return;
    const slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    setCats([...cats, { id: Date.now().toString(), name: newName.trim(), slug, postCount: 0 }]);
    setNewName("");
    toast.success("Category added!");
  };

  const deleteCategory = (id: string) => {
    if (confirm("Delete this category? Posts in this category might become uncategorized.")) {
      setCats(cats.filter((c) => c.id !== id));
      toast.error("Category removed");
    }
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  const saveEdit = () => {
    if (!editName.trim() || !editingId) return;
    setCats(cats.map((c) =>
      c.id === editingId
        ? { ...c, name: editName.trim(), slug: editName.toLowerCase().replace(/[^a-z0-9]+/g, "-") }
        : c
    ));
    setEditingId(null);
    toast.message("Category updated");
  };

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Categories</h1>
        <p className="text-muted-foreground mt-1 text-sm font-medium">Group your posts into logical topics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add new */}
        <div className="lg:col-span-1">
          <div className="p-6 bg-white border border-border shadow-sm rounded-2xl sticky top-10">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <FolderPlus size={20} strokeWidth={2.5} />
              <h3 className="font-bold">Quick Add</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Category Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Lifestyle"
                  className="w-full px-4 py-2.5 border border-border rounded-xl bg-muted/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  onKeyDown={(e) => e.key === "Enter" && addCategory()}
                />
              </div>
              <button
                onClick={addCategory}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Plus size={18} strokeWidth={3} /> Create Category
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-3">
          {cats.map((cat) => (
            <div key={cat.id} className="group flex items-center justify-between p-4 bg-white border border-border shadow-sm rounded-2xl hover:border-primary/20 hover:shadow-md transition-all">
              {editingId === cat.id ? (
                <div className="flex items-center gap-2 flex-1 animate-in zoom-in-95 duration-200">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 px-3 py-2 border border-primary/30 rounded-lg text-sm bg-primary/5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
                    onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                    autoFocus
                  />
                  <button onClick={saveEdit} className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"><Check size={18} strokeWidth={3} /></button>
                  <button onClick={() => setEditingId(null)} className="p-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted-foreground/10 transition-colors"><X size={18} strokeWidth={3} /></button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <span className="font-bold text-sm">{cat.name.charAt(0)}</span>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-foreground block">{cat.name}</span>
                      <span className="text-[11px] font-bold text-muted-foreground/60 tracking-tight uppercase">{cat.postCount} Published Posts</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => startEdit(cat)} className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-primary transition-colors" title="Rename"><Edit size={16} /></button>
                    <button onClick={() => deleteCategory(cat.id)} className="p-2 rounded-lg text-destructive/60 hover:bg-destructive/10 hover:text-destructive transition-colors" title="Delete"><Trash2 size={16} /></button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
