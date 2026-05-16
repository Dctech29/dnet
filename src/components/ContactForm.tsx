"use client";

import { useState } from "react";
import { PhoneCall, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitContactForm } from "@/app/actions";

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        setStatus("idle");
        setErrorMessage("");

        // Inject a dummy email so the server action doesn't break (email field still exists in DB)
        formData.set("email", "notprovided@dnet.studio");

        try {
            const result = await submitContactForm(formData);
            if (result?.success) {
                setStatus("success");
            } else {
                setStatus("error");
                setErrorMessage(result?.error || "Failed to send. Please try again.");
            }
        } catch {
            setStatus("error");
            setErrorMessage("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div id="contact-form" className="w-full max-w-xl mx-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden">
            {/* Glow accent */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />

            {status === "success" ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">We&apos;ll Call You Back!</h3>
                    <p className="text-gray-400">
                        Thanks! Deepak will reach out to you shortly on your mobile number.
                    </p>
                    <button
                        onClick={() => setStatus("idle")}
                        className="mt-8 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                    >
                        Submit another request
                    </button>
                </div>
            ) : (
                <form action={handleSubmit} className="flex flex-col gap-5 relative z-10">
                    <div className="mb-2">
                        <h3 className="text-xl font-bold text-white mb-1">Get a Free Callback</h3>
                        <p className="text-gray-400 text-sm">Leave your number — we&apos;ll call you within the hour.</p>
                    </div>

                    {/* Name */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-medium text-gray-300">
                            Full Name <span className="text-blue-400">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="Enter Your Full Name"
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                    </div>

                    {/* Mobile Number */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-sm font-medium text-gray-300">
                            Mobile Number <span className="text-blue-400">*</span>
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            pattern="[0-9+\s\-]{7,15}"
                            placeholder="Enter Your Mobile Number"
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                    </div>

                    {/* Message (Optional) */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="body" className="text-sm font-medium text-gray-300">
                            Message <span className="text-gray-500 text-xs">(Optional)</span>
                        </label>
                        <textarea
                            id="body"
                            name="body"
                            rows={3}
                            placeholder="Tell us about your project... (optional)"
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                        />
                    </div>

                    {status === "error" && (
                        <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl text-sm">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p>{errorMessage}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                        ) : (
                            <><PhoneCall className="w-5 h-5" /> Request a Callback</>
                        )}
                    </button>
                </form>
            )}
        </div>
    );
}
