import { useState } from "react";
import { comments as initialComments, posts, type Comment } from "@/data/mock";
import { MessageCircle, CheckCircle, XCircle, Trash2, Search, Filter, User } from "lucide-react";
import { toast } from "sonner";

const AdminCommentsPage = () => {
    const [commentsList, setCommentsList] = useState<Comment[]>(initialComments);
    const [search, setSearch] = useState("");

    const updateStatus = (id: string, status: "approved" | "pending" | "spam") => {
        setCommentsList((prev) =>
            prev.map((c) => (c.id === id ? { ...c, status } : c))
        );
        toast.success(`Comment marked as ${status}`);
    };

    const deleteComment = (id: string) => {
        if (confirm("Permanently delete this comment?")) {
            setCommentsList((prev) => prev.filter((c) => c.id !== id));
            toast.error("Comment deleted");
        }
    };

    const filteredComments = commentsList.filter(
        (c) =>
            c.author.toLowerCase().includes(search.toLowerCase()) ||
            c.content.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="animate-in fade-in duration-500">
            <div className="mb-8">
                <h1 className="text-3xl font-black tracking-tight text-foreground">Community Discussion</h1>
                <p className="text-muted-foreground mt-1 text-base font-medium">Moderate and manage reader comments across your blog.</p>
            </div>

            <div className="bg-white border border-border shadow-sm rounded-3xl overflow-hidden mb-6">
                <div className="p-6 border-b border-border bg-muted/10 flex flex-col md:flex-row gap-4 md:items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            type="text"
                            placeholder="Search comments or authors..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-xs font-black text-foreground hover:bg-muted transition-all">
                            <Filter size={16} /> Filter Status
                        </button>
                    </div>
                </div>

                <div className="divide-y divide-border">
                    {filteredComments.map((comment) => {
                        const post = posts.find((p) => p.id === comment.postId);
                        return (
                            <div key={comment.id} className="p-8 hover:bg-muted/5 transition-colors group">
                                <div className="flex flex-col lg:flex-row gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-14 h-14 rounded-2xl bg-secondary/50 flex items-center justify-center text-muted-foreground shadow-inner">
                                            <User size={28} />
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                            <div>
                                                <h3 className="font-black text-foreground text-lg">{comment.author}</h3>
                                                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{comment.email}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${comment.status === "approved" ? "bg-green-50 text-green-700 border-green-100" :
                                                        comment.status === "spam" ? "bg-red-50 text-red-700 border-red-100" :
                                                            "bg-amber-50 text-amber-700 border-amber-100"
                                                    }`}>
                                                    {comment.status}
                                                </span>
                                                <span className="text-[10px] font-bold text-muted-foreground/40">{new Date(comment.createdAt).toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className="p-5 rounded-2xl bg-muted/20 border border-border/50">
                                            <p className="text-foreground font-medium leading-relaxed">{comment.content}</p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <p className="text-xs font-bold text-primary italic">
                                                On: <span className="hover:underline cursor-pointer">{post?.title || "Unknown Post"}</span>
                                            </p>

                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {comment.status !== "approved" && (
                                                    <button
                                                        onClick={() => updateStatus(comment.id, "approved")}
                                                        className="p-2.5 rounded-xl text-green-600 hover:bg-green-50 transition-all"
                                                        title="Approve"
                                                    >
                                                        <CheckCircle size={20} />
                                                    </button>
                                                )}
                                                {comment.status !== "spam" && (
                                                    <button
                                                        onClick={() => updateStatus(comment.id, "spam")}
                                                        className="p-2.5 rounded-xl text-amber-600 hover:bg-amber-50 transition-all"
                                                        title="Mark as Spam"
                                                    >
                                                        <XCircle size={20} />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteComment(comment.id)}
                                                    className="p-2.5 rounded-xl text-destructive hover:bg-destructive/5 transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredComments.length === 0 && (
                    <div className="py-24 text-center">
                        <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6 text-muted-foreground">
                            <MessageCircle size={40} opacity={0.2} />
                        </div>
                        <p className="text-muted-foreground text-lg font-bold">No comments found to moderate.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCommentsPage;
