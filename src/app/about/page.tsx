import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about A Short Journey Through The Quran and its author Tanbirul Quadir Choudhury. A unique introduction to the Quran for modern readers.",
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden py-20">
        <div className="geometric-pattern absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="animate-fade-in-up font-heading text-4xl font-bold text-gold sm:text-5xl">
            About
          </h1>
          <div className="mx-auto mt-4 h-1 w-16 rounded bg-gold/40" />
        </div>
      </section>

      {/* About the Book */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-5">
            {/* Book Cover */}
            <div className="animate-slide-in-left lg:col-span-2">
              <div className="relative mx-auto max-w-sm">
                <div className="absolute -inset-2 rounded-xl bg-gradient-to-b from-gold/10 via-transparent to-gold/5 blur-sm" />
                <Image
                  src="/images/book-cover-front.jpg"
                  alt="A Short Journey Through The Quran - Front Cover"
                  width={500}
                  height={793}
                  className="relative rounded-lg shadow-2xl shadow-gold/10"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>

            {/* About the Book */}
            <div className="animate-slide-in-right lg:col-span-3">
              <h2 className="font-heading text-3xl font-bold text-gold sm:text-4xl">
                About the Book
              </h2>
              <div className="mt-3 h-1 w-16 rounded bg-gold/40" />

              <div className="mt-8 space-y-5">
                <p className="font-body text-lg leading-relaxed text-text-muted">
                  <span className="font-semibold text-text">A Short Journey Through The Quran</span>{" "}
                  is a thoughtfully crafted introduction to the Holy Quran, designed to be
                  accessible, engaging, and enlightening for readers of all backgrounds.
                </p>
                <p className="font-body text-lg leading-relaxed text-text-muted">
                  With a unique construct and presentation, this book is a short and interesting
                  read highlighting some of the major themes of the Quran. It introduces the reader
                  to the gems hidden within its verses -- from scientific references that predate
                  modern discoveries to the powerful stories of the prophets that continue to
                  resonate across generations.
                </p>
                <p className="font-body text-lg leading-relaxed text-text-muted">
                  Discover the foundational scripture that has shaped civilizations and inspired
                  billions. Learn about the stories of the great prophets -- Abraham (Ibrahim),
                  Moses (Musa), Jesus (Issa), and Joseph (Yousuf) -- and the divine books
                  including the Torah and the Gospel. Explore references to science, history, and
                  moral guidance that remain profoundly relevant today.
                </p>
                <p className="font-body text-lg leading-relaxed text-text-muted">
                  Ideal for students, curious minds, and anyone seeking to understand the essence
                  of the Quran without being overwhelmed. Written with clarity and care, it is
                  designed to be enjoyable for readers of all backgrounds -- whether you are
                  encountering the Quran for the first time or revisiting its wisdom with fresh
                  eyes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="section-divider" />
      </div>

      {/* About the Author */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <h2 className="font-heading text-3xl font-bold text-gold sm:text-4xl">
              About the Author
            </h2>
            <div className="mt-3 h-1 w-16 rounded bg-gold/40" />
          </div>

          <div className="animate-fade-in-up delay-200 mt-8 rounded-xl border border-border/50 bg-card/30 p-8 sm:p-10">
            <div className="flex items-start gap-6">
              <div className="hidden flex-shrink-0 sm:block">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
                  <svg
                    className="h-10 w-10 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-heading text-2xl font-bold text-text">
                  Tanbirul Quadir Choudhury
                </h3>
                <p className="font-body text-lg leading-relaxed text-text-muted">
                  Tanbirul Quadir Choudhury is a writer and researcher dedicated to making the
                  Quran accessible to modern readers. With a deep passion for bridging the gap
                  between classical Islamic scholarship and contemporary understanding, he has
                  spent years studying the Quran&apos;s themes, narratives, and their relevance to
                  the modern world.
                </p>
                <p className="font-body text-lg leading-relaxed text-text-muted">
                  His approach combines rigorous research with clear, engaging prose, making
                  complex topics approachable for readers of all backgrounds. Through this work,
                  he aims to inspire a new generation of readers to discover the beauty and
                  wisdom of the Quran.
                </p>
                <p className="font-body text-lg leading-relaxed text-text-muted">
                  Beyond writing, he is committed to fostering interfaith dialogue and promoting
                  a deeper understanding of Islamic heritage and its contributions to global
                  civilization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Cover Display */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up text-center">
            <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
              The Full Cover
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded bg-gold/40" />
          </div>
          <div className="animate-fade-in-up delay-200 mt-10">
            <div className="relative overflow-hidden rounded-xl">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-b from-gold/10 via-transparent to-gold/5 blur-sm" />
              <Image
                src="/images/book-cover-full.jpg"
                alt="A Short Journey Through The Quran - Full Book Cover Spread"
                width={3000}
                height={2000}
                className="relative rounded-xl shadow-2xl shadow-gold/10"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="section-divider mb-12" />
          <h2 className="animate-fade-in-up font-heading text-2xl font-bold sm:text-3xl">
            Interested in{" "}
            <span className="gold-shimmer">the Book</span>?
          </h2>
          <p className="animate-fade-in-up delay-200 mt-4 font-body text-base text-text-muted">
            Get your copy or reach out to the author directly.
          </p>
          <div className="animate-fade-in-up delay-300 mt-6 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/#where-to-buy"
              className="gold-glow inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 font-ui text-sm font-semibold text-[#0a0a0a] transition-all hover:bg-gold-light"
            >
              Buy Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-gold/40 px-8 py-3.5 font-ui text-sm font-semibold text-gold transition-all hover:border-gold hover:bg-gold/10"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
