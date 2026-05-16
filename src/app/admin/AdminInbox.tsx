"use client";

import { useState, useTransition } from "react";
import { Trash2, Mail, Phone, Clock, MessageSquare, Loader2 } from "lucide-react";
import { deleteMessage } from "@/app/actions";
import { formatDistanceToNow } from "date-fns";

type Message = {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    body: string;
    createdAt: Date;
};

function MessageCard({ message, onDeleted }: { message: Message; onDeleted: (id: string) => void }) {
    const [isPending, startTransition] = useTransition();
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDelete = () => {
        startTransition(async () => {
            await deleteMessage(message.id);
            onDeleted(message.id);
        });
    };

    return (
        <div className={`bg-white/5 border rounded-2xl p-6 transition-all duration-300 ${confirmDelete ? "border-red-500/40 bg-red-500/5" : "border-white/10 hover:bg-white/8"}`}>
            {/* Header row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-white truncate">{message.name}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-400 mt-1">
                        {message.email && message.email !== "notprovided@dnet.studio" && (
                            <a href={`mailto:${message.email}`} className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                                <Mail className="w-3.5 h-3.5" /> {message.email}
                            </a>
                        )}
                        {message.phone && (
                            <a href={`tel:${message.phone}`} className="flex items-center gap-1 hover:text-green-400 transition-colors">
                                <Phone className="w-3.5 h-3.5" /> {message.phone}
                            </a>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="flex items-center gap-1 text-xs text-gray-500 bg-black/50 px-3 py-1.5 rounded-full border border-white/5">
                        <Clock className="w-3 h-3" />
                        {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                    </span>

                    {/* Delete button */}
                    {!confirmDelete ? (
                        <button
                            onClick={() => setConfirmDelete(true)}
                            className="p-2 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                            title="Delete message"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    ) : (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setConfirmDelete(false)}
                                className="text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isPending}
                                className="text-xs text-white bg-red-600 hover:bg-red-500 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all disabled:opacity-70"
                            >
                                {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Message body */}
            <div className="flex items-start gap-2.5 bg-black/50 p-4 rounded-xl border border-white/5 text-gray-300 text-sm leading-relaxed">
                <MessageSquare className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                <p className="whitespace-pre-wrap">{message.body}</p>
            </div>
        </div>
    );
}

export default function AdminInbox({ initialMessages }: { initialMessages: Message[] }) {
    const [messages, setMessages] = useState(initialMessages);

    const handleDeleted = (id: string) => {
        setMessages((prev) => prev.filter((m) => m.id !== id));
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                    Inbox
                    <span className="ml-2 text-base font-normal text-gray-500">({messages.length} message{messages.length !== 1 ? "s" : ""})</span>
                </h2>
            </div>

            {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-24 text-gray-600">
                    <MessageSquare className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-lg">No messages yet.</p>
                    <p className="text-sm mt-1">Submissions from your contact form will appear here.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {messages.map((message) => (
                        <MessageCard key={message.id} message={message} onDeleted={handleDeleted} />
                    ))}
                </div>
            )}
        </div>
    );
}
