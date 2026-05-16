"use client";

import { useState, useTransition } from "react";
import { Trash2, Plus, Star, Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";
import { addTestimonial, deleteTestimonial } from "@/app/actions";

type Testimonial = {
    id: string;
    personName: string;
    personImage: string;
    projectName: string;
    siteImage: string;
    rating: number;
    review: string;
};

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} type="button" onClick={() => onChange(s)}>
                    <Star className={`w-6 h-6 transition-colors ${s <= value ? "fill-amber-400 text-amber-400" : "text-gray-600 hover:text-amber-300"}`} />
                </button>
            ))}
        </div>
    );
}

function TestimonialRow({ t, onDeleted }: { t: Testimonial; onDeleted: (id: string) => void }) {
    const [isPending, startTransition] = useTransition();
    const [confirm, setConfirm] = useState(false);

    const handleDelete = () => startTransition(async () => {
        await deleteTestimonial(t.id);
        onDeleted(t.id);
    });

    return (
        <div className={`flex gap-4 items-start bg-white/5 border rounded-2xl p-5 transition-all ${confirm ? "border-red-500/40 bg-red-500/5" : "border-white/10"}`}>
            {/* Site thumbnail */}
            <img src={t.siteImage || "https://picsum.photos/seed/default/200/150"} alt={t.projectName}
                className="w-20 h-14 object-cover rounded-lg flex-shrink-0 border border-white/10" />

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                    <img src={t.personImage || "https://i.pravatar.cc/150?img=1"} alt={t.personName}
                        className="w-7 h-7 rounded-full border border-white/10 object-cover" />
                    <span className="text-white font-semibold text-sm">{t.personName}</span>
                    <span className="text-gray-500 text-xs">•</span>
                    <span className="text-purple-400 text-xs font-medium">{t.projectName}</span>
                    <div className="flex gap-0.5 ml-1">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className={`w-3 h-3 ${s <= t.rating ? "fill-amber-400 text-amber-400" : "text-gray-700"}`} />)}
                    </div>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{t.review}</p>
            </div>

            {/* Delete */}
            <div className="flex-shrink-0">
                {!confirm ? (
                    <button onClick={() => setConfirm(true)} className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
                        <Trash2 className="w-4 h-4" />
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button onClick={() => setConfirm(false)} className="text-xs text-gray-400 px-2 py-1.5 rounded-lg border border-white/10 hover:text-white transition-all">
                            <X className="w-3 h-3" />
                        </button>
                        <button onClick={handleDelete} disabled={isPending}
                            className="text-xs text-white bg-red-600 hover:bg-red-500 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all disabled:opacity-70">
                            {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function AdminTestimonials({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
    const [testimonials, setTestimonials] = useState(initialTestimonials);
    const [showForm, setShowForm] = useState(false);
    const [rating, setRating] = useState(5);
    const [isPending, startTransition] = useTransition();
    const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
    const [formError, setFormError] = useState("");

    const handleDeleted = (id: string) => setTestimonials(prev => prev.filter(t => t.id !== id));

    const handleAdd = (formData: FormData) => {
        formData.set("rating", String(rating));
        startTransition(async () => {
            const result = await addTestimonial(formData);
            if (result.success) {
                setFormStatus("success");
                setShowForm(false);
                setRating(5);
                // Refresh list
                const { getTestimonials } = await import("@/app/actions");
                const res = await getTestimonials();
                setTestimonials(res.testimonials || []);
            } else {
                setFormStatus("error");
                setFormError(result.error || "Failed.");
            }
        });
    };

    const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm";

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                    Testimonials
                    <span className="ml-2 text-base font-normal text-gray-500">({testimonials.length})</span>
                </h2>
                <button onClick={() => { setShowForm(!showForm); setFormStatus("idle"); }}
                    className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/20 px-4 py-2 rounded-xl text-sm font-medium transition-all">
                    <Plus className="w-4 h-4" /> Add Testimonial
                </button>
            </div>

            {/* Add form */}
            {showForm && (
                <form action={handleAdd} className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-400 font-medium">Person Name *</label>
                        <input name="personName" required placeholder="Rahul Sharma" className={inputCls} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-400 font-medium">Person Image URL</label>
                        <input name="personImage" placeholder="https://i.pravatar.cc/150?img=1" className={inputCls} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-400 font-medium">Project Name *</label>
                        <input name="projectName" required placeholder="My Awesome Website" className={inputCls} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-400 font-medium">Site Screenshot URL</label>
                        <input name="siteImage" placeholder="https://picsum.photos/seed/example/600/400" className={inputCls} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-400 font-medium">Rating</label>
                        <StarPicker value={rating} onChange={setRating} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-400 font-medium">Display Order</label>
                        <input name="order" type="number" defaultValue={testimonials.length + 1} className={inputCls} />
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-1">
                        <label className="text-xs text-gray-400 font-medium">Review *</label>
                        <textarea name="review" required rows={3} placeholder="Write the client's testimonial here..." className={`${inputCls} resize-none`} />
                    </div>

                    {formStatus === "error" && (
                        <div className="md:col-span-2 flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-xl text-sm">
                            <AlertCircle className="w-4 h-4" /> {formError}
                        </div>
                    )}

                    <div className="md:col-span-2 flex gap-3">
                        <button type="submit" disabled={isPending}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-6 py-3 rounded-xl text-sm hover:opacity-90 transition-all disabled:opacity-60">
                            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                            Save Testimonial
                        </button>
                        <button type="button" onClick={() => setShowForm(false)}
                            className="px-6 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white text-sm transition-all">
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {formStatus === "success" && !showForm && (
                <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-3 rounded-xl text-sm mb-4">
                    <CheckCircle2 className="w-4 h-4" /> Testimonial added successfully!
                </div>
            )}

            {/* List */}
            {testimonials.length === 0 ? (
                <div className="text-center py-20 text-gray-600">
                    <Star className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>No testimonials yet. Add your first one above!</p>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {testimonials.map((t) => (
                        <TestimonialRow key={t.id} t={t} onDeleted={handleDeleted} />
                    ))}
                </div>
            )}
        </div>
    );
}
