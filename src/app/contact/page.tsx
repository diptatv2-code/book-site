"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [toast, setToast] = useState("");

  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(""), 4000);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      showToast("Thank you! Your message has been sent successfully.");
    } catch {
      setStatus("error");
      showToast("Something went wrong. Please try again or email us directly.");
    }
  }

  return (
    <div className="bg-cream">
      {/* Toast */}
      {toast && (
        <div className="fixed right-4 top-20 z-50 animate-fade-in-up">
          <div
            className={`rounded-lg border px-6 py-4 font-ui text-sm shadow-lg ${
              status === "success"
                ? "border-green-300 bg-green-50 text-green-800"
                : "border-red-300 bg-red-50 text-red-800"
            }`}
          >
            <div className="flex items-center gap-3">
              {status === "success" ? (
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              )}
              <span>{toast}</span>
              <button
                onClick={() => setToast("")}
                className="ml-2 opacity-60 transition-opacity hover:opacity-100"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="relative overflow-hidden py-8 sm:py-10">
        <div className="geometric-pattern absolute inset-0 opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-transparent to-cream" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="animate-fade-in-up font-heading text-4xl font-bold text-burgundy sm:text-5xl">
            Contact & Feedback
          </h1>
          <div className="mx-auto mt-4 h-1 w-16 rounded bg-gold" />
          <p className="animate-fade-in-up delay-200 mt-6 font-body text-lg text-text-muted">
            We would love to hear from you. Share your thoughts, ask questions, or provide
            feedback about the book.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Info */}
            <div className="animate-slide-in-left lg:col-span-2">
              <h2 className="font-heading text-2xl font-bold text-navy">Get in Touch</h2>
              <div className="mt-2 h-0.5 w-12 rounded bg-gold" />

              <div className="mt-8 space-y-6">
                {/* Email Card */}
                <div className="warm-card flex items-start gap-4 p-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-navy/10">
                    <svg
                      className="h-6 w-6 text-navy"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-ui text-sm font-semibold text-text">Email</p>
                    <a
                      href="mailto:tquadirchoudhury@yahoo.com"
                      className="mt-1 block font-body text-base text-text-muted transition-colors hover:text-burgundy"
                    >
                      tquadirchoudhury@yahoo.com
                    </a>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="warm-card flex items-start gap-4 p-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-navy/10">
                    <svg
                      className="h-6 w-6 text-navy"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-ui text-sm font-semibold text-text">Phone</p>
                    <a
                      href="tel:+8801552389972"
                      className="mt-1 block font-body text-base text-text-muted transition-colors hover:text-burgundy"
                    >
                      +880 1552389972
                    </a>
                  </div>
                </div>

                {/* Note */}
                <div className="rounded-lg border border-gold/30 bg-parchment/50 p-5">
                  <p className="font-body text-sm leading-relaxed text-text-muted">
                    Your feedback helps us improve. Whether you have questions about the book,
                    want to arrange a speaking event, or simply want to share how the book has
                    impacted you -- we are here to listen.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="animate-slide-in-right lg:col-span-3">
              <div className="warm-card p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block font-ui text-sm font-medium text-text"
                      >
                        Name <span className="text-burgundy">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="mt-2 block w-full rounded-lg border border-border-light bg-white px-4 py-3 font-body text-base text-text placeholder-text-light outline-none transition-all focus:border-burgundy/40 focus:ring-2 focus:ring-burgundy/20"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block font-ui text-sm font-medium text-text"
                      >
                        Email <span className="text-burgundy">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="mt-2 block w-full rounded-lg border border-border-light bg-white px-4 py-3 font-body text-base text-text placeholder-text-light outline-none transition-all focus:border-burgundy/40 focus:ring-2 focus:ring-burgundy/20"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block font-ui text-sm font-medium text-text"
                    >
                      Subject <span className="text-burgundy">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="mt-2 block w-full rounded-lg border border-border-light bg-white px-4 py-3 font-body text-base text-text placeholder-text-light outline-none transition-all focus:border-burgundy/40 focus:ring-2 focus:ring-burgundy/20"
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-ui text-sm font-medium text-text"
                    >
                      Message <span className="text-burgundy">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="mt-2 block w-full resize-none rounded-lg border border-border-light bg-white px-4 py-3 font-body text-base text-text placeholder-text-light outline-none transition-all focus:border-burgundy/40 focus:ring-2 focus:ring-burgundy/20"
                      placeholder="Share your thoughts, feedback, or questions..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex w-full items-center justify-center rounded-lg bg-burgundy px-8 py-3.5 font-ui text-sm font-semibold text-white shadow-md transition-all hover:bg-burgundy-light hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {status === "loading" ? (
                      <>
                        <svg
                          className="-ml-1 mr-2 h-4 w-4 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
