import { useState } from "react";
import { categories as initialCategories, type Category } from "@/data/mock";
import { Plus, Trash2, Edit, Check, X } from "lucide-react";

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
  };

  const deleteCategory = (id: string) => {
    if (confirm("Delete this category?")) {
      setCats(cats.filter((c) => c.id !== id));
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
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Categories</h1>

      {/* Add new */}
      <div className="flex gap-2 mb-6 max-w-md">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New category name"
          className="flex-1 px-3 py-2.5 border border-border rounded-lg bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary"
          onKeyDown={(e) => e.key === "Enter" && addCategory()}
        />
        <button
          onClick={addCategory}
          className="flex items-center gap-1 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
        >
          <Plus size={16} /> Add
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden max-w-md">
        {cats.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between px-4 py-3 border-b border-border last:border-0">
            {editingId === cat.id ? (
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 px-2 py-1 border border-border rounded text-sm bg-background text-foreground focus:outline-none"
                  onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                  autoFocus
                />
                <button onClick={saveEdit} className="p-1 text-success"><Check size={16} /></button>
                <button onClick={() => setEditingId(null)} className="p-1 text-muted-foreground"><X size={16} /></button>
              </div>
            ) : (
              <>
                <div>
                  <span className="text-sm font-medium text-foreground">{cat.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">({cat.postCount} posts)</span>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => startEdit(cat)} className="p-1.5 rounded text-muted-foreground hover:bg-muted"><Edit size={14} /></button>
                  <button onClick={() => deleteCategory(cat.id)} className="p-1.5 rounded text-destructive hover:bg-destructive/10"><Trash2 size={14} /></button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
