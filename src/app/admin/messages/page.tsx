"use client";

import { useState } from "react";
import { contactMessages as initialMessages, type ContactMessage } from "@/data/mock";
import { toast } from "sonner";
import { Mail, Clock, Reply, Trash2, CheckCircle2 } from "lucide-react";

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
    const [selected, setSelected] = useState<ContactMessage | null>(null);

    const markAsRead = (id: string) => {
        setMessages(messages.map((m) => (m.id === id ? { ...m, status: "read" } : m)));
    };

    const deleteMessage = (id: string) => {
        if (confirm("Delete this message?")) {
            setMessages(messages.filter(m => m.id !== id));
            if (selected?.id === id) setSelected(null);
            toast.error("Message deleted");
        }
    };

    return (
        <div className="animate-in fade-in duration-500">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Inbox</h1>
                <p className="text-muted-foreground mt-1 text-sm font-medium">Reader questions and collaboration requests.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5 bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-sans">Recent Messages</span>
                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">{messages.filter(m => m.status === 'unread').length} Unread</span>
                    </div>
                    <div className="divide-y divide-border h-[600px] overflow-y-auto custom-scrollbar">
                        {messages.map((msg) => (
                            <button
                                key={msg.id}
                                onClick={() => { setSelected(msg); markAsRead(msg.id); }}
                                className={`w-full text-left p-5 transition-all outline-none ${selected?.id === msg.id ? "bg-primary/5 border-l-4 border-l-primary" : "hover:bg-muted/30 border-l-4 border-l-transparent"
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-sm font-bold ${msg.status === "unread" ? "text-foreground" : "text-muted-foreground"}`}>
                                        {msg.name}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground font-medium">
                                        {new Date(msg.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className={`text-sm mb-1 line-clamp-1 ${msg.status === 'unread' ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>{msg.subject}</p>
                                <p className="text-xs text-muted-foreground line-clamp-1">{msg.message}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-7">
                    {selected ? (
                        <div className="bg-white border border-border rounded-2xl p-8 shadow-sm animate-in fade-in zoom-in-95 duration-300">
                            <div className="flex items-start justify-between mb-8 pb-8 border-b border-border">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-lg">
                                        {selected.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground leading-tight">{selected.subject}</h3>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium mt-1">
                                            <span className="text-foreground font-bold">{selected.name}</span>
                                            <span>&lt;{selected.email}&gt;</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2.5 rounded-xl border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-all" title="Reply"><Reply size={18} /></button>
                                    <button onClick={() => deleteMessage(selected.id)} className="p-2.5 rounded-xl border border-border text-destructive/60 hover:bg-destructive/5 hover:text-destructive transition-all" title="Delete"><Trash2 size={18} /></button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 font-medium">
                                <Clock size={14} />
                                <span>Received on {new Date(selected.createdAt).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' })}</span>
                            </div>

                            <div className="text-base text-foreground/80 leading-relaxed font-sans whitespace-pre-wrap">
                                {selected.message}
                            </div>

                            <div className="mt-12 p-6 rounded-2xl bg-muted/30 border border-border">
                                <p className="text-sm font-bold text-foreground mb-3">Quick Actions</p>
                                <div className="flex flex-wrap gap-2">
                                    <button className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-lg shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2">
                                        <Reply size={14} /> Send Reply
                                    </button>
                                    <button onClick={() => { markAsRead(selected.id); toast.success("Marked as read"); }} className="px-4 py-2 bg-white border border-border text-foreground text-xs font-bold rounded-lg shadow-sm hover:bg-muted transition-colors flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-green-500" /> Mark as Read
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white border-2 border-dashed border-border rounded-2xl p-20 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-4">
                                <Mail size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-1">No Message Selected</h3>
                            <p className="text-sm text-muted-foreground max-w-[240px]">Select a message from the list on the left to read its content.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
