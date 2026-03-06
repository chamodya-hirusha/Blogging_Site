import { useState } from "react";
import { contactMessages as initialMessages, type ContactMessage } from "@/data/mock";

const AdminMessagesPage = () => {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  const markAsRead = (id: string) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, status: "read" } : m)));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Messages</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          {messages.map((msg) => (
            <button
              key={msg.id}
              onClick={() => { setSelected(msg); markAsRead(msg.id); }}
              className={`w-full text-left px-4 py-4 border-b border-border last:border-0 ${
                selected?.id === msg.id ? "bg-accent" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-sm font-medium ${msg.status === "unread" ? "text-foreground" : "text-muted-foreground"}`}>
                  {msg.name}
                </span>
                {msg.status === "unread" && (
                  <span className="w-2 h-2 rounded-full bg-primary" />
                )}
              </div>
              <p className="text-sm text-foreground truncate">{msg.subject}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(msg.createdAt).toLocaleDateString()}
              </p>
            </button>
          ))}
        </div>

        {/* Detail */}
        {selected ? (
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-1">{selected.subject}</h3>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <span>{selected.name}</span>
              <span>·</span>
              <span>{selected.email}</span>
              <span>·</span>
              <span>{new Date(selected.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{selected.message}</p>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg p-6 flex items-center justify-center text-muted-foreground text-sm">
            Select a message to read
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessagesPage;
