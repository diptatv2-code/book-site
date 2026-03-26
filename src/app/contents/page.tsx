import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Table of Contents",
  description:
    "Explore the chapters and appendices of A Short Journey Through The Quran. 11 chapters covering science, history, prophets, and the wisdom of the Quran.",
};

const chapters = [
  {
    number: 1,
    title: "Introduction to the Quran",
    page: 1,
    description:
      "An overview of the Quran's origins, structure, and its enduring significance as a guide for humanity.",
  },
  {
    number: 2,
    title: "The Quran and Science",
    page: 9,
    description:
      "Remarkable scientific references in the Quran, from embryology to the expanding universe, revealed centuries before modern discovery.",
  },
  {
    number: 3,
    title: "Stories of the Prophets",
    page: 19,
    description:
      "The timeless narratives of the prophets and messengers sent to guide humanity across the ages.",
  },
  {
    number: 4,
    title: "Abraham (Ibrahim) - The Friend of God",
    page: 27,
    description:
      "The story of Prophet Abraham, his unwavering faith, his trials, and his legacy as the patriarch of monotheism.",
  },
  {
    number: 5,
    title: "Moses (Musa) - The Liberator",
    page: 35,
    description:
      "Prophet Moses and the exodus from Egypt -- miracles, the Torah, and the covenant with the Children of Israel.",
  },
  {
    number: 6,
    title: "Jesus (Issa) - The Messiah",
    page: 45,
    description:
      "The Quranic account of Prophet Jesus, his miraculous birth, his teachings, and the Gospel he brought.",
  },
  {
    number: 7,
    title: "Joseph (Yousuf) - The Best of Stories",
    page: 53,
    description:
      "An extraordinary tale of jealousy, patience, and divine wisdom -- called the best of stories in the Quran itself.",
  },
  {
    number: 8,
    title: "The Torah, the Gospel, and the Quran",
    page: 61,
    description:
      "Understanding the relationship between the three great scriptures and their shared message of divine guidance.",
  },
  {
    number: 9,
    title: "Historical Accounts in the Quran",
    page: 69,
    description:
      "Civilizations and events recorded in the Quran -- from ancient Egypt to the people of Ad and Thamud.",
  },
  {
    number: 10,
    title: "Gems from the Quran",
    page: 79,
    description:
      "Profound verses of wisdom, moral guidance, and spiritual insight that illuminate the path for seekers.",
  },
  {
    number: 11,
    title: "Reflections and Conclusion",
    page: 89,
    description:
      "A synthesis of the journey -- reflecting on the Quran's relevance and call to thoughtful exploration.",
  },
];

const appendices = [
  {
    letter: "A",
    title: "Timeline of the Prophets",
    page: 95,
    description: "A chronological overview of the prophets mentioned in the Quran and their historical context.",
  },
  {
    letter: "B",
    title: "Scientific References Index",
    page: 100,
    description: "A curated index of verses with scientific references, organized by topic for easy reference.",
  },
  {
    letter: "C",
    title: "Glossary of Arabic Terms",
    page: 105,
    description: "Key Arabic terms and their meanings to aid understanding throughout the book.",
  },
];

export default function ContentsPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F5F0E8] to-[#FAF8F5] py-14">
        <div className="geometric-pattern absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="animate-fade-in-up font-heading text-4xl font-bold text-[#8B1A2B] sm:text-5xl">
            Table of Contents
          </h1>
          <div className="mx-auto mt-4 h-1 w-16 rounded bg-[#C9A84C]/60" />
          <p className="animate-fade-in-up delay-200 mt-6 font-body text-lg text-[#6B5E56]">
            Explore the chapters and discover what awaits inside this remarkable journey through
            the Quran.
          </p>
        </div>
      </section>

      {/* Preview Blurb */}
      <section className="bg-[#EDE8E0] py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up warm-card p-8 sm:p-10">
            <div className="flex items-start gap-6">
              <div className="hidden flex-shrink-0 sm:block">
                <Image
                  src="/images/book-cover-front.jpg"
                  alt="Book cover"
                  width={100}
                  height={159}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-[#1B2A4A]">From the Introduction</h2>
                <div className="mt-2 h-0.5 w-10 rounded bg-[#C9A84C]/50" />
                <p className="mt-3 font-body text-base leading-relaxed text-[#6B5E56]">
                  With a unique construct and presentation, this book is a short and interesting
                  read highlighting some of the major themes of the Quran. It introduces the
                  reader to the gems hidden within its verses -- from scientific references that
                  predate modern discoveries to the powerful stories of the prophets that continue
                  to resonate across generations. Written with clarity and care, it is designed to
                  be accessible and enjoyable for readers of all backgrounds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="animate-fade-in-up font-heading text-2xl font-bold text-[#1B2A4A] sm:text-3xl">
            Chapters
          </h2>
          <div className="mt-2 h-0.5 w-12 rounded bg-[#C9A84C]/60" />

          <div className="mt-8 space-y-4">
            {chapters.map((chapter, i) => (
              <div
                key={chapter.number}
                className={`animate-fade-in-up delay-${Math.min((i + 1) * 100, 800)} warm-card group p-6`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#8B1A2B]/10 font-heading text-lg font-bold text-[#8B1A2B] transition-colors group-hover:bg-[#8B1A2B]/15">
                      {chapter.number}
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-[#1B2A4A] transition-colors group-hover:text-[#8B1A2B]">
                        {chapter.title}
                      </h3>
                      <div className="mt-1.5 mb-1.5 h-px w-8 bg-[#C9A84C]/40" />
                      <p className="font-body text-sm leading-relaxed text-[#6B5E56]">
                        {chapter.description}
                      </p>
                    </div>
                  </div>
                  <span className="flex-shrink-0 rounded-full bg-[#EDE8E0] px-3 py-1 font-ui text-xs tabular-nums text-[#8A7E76]">
                    p. {chapter.page}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appendices */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="animate-fade-in-up font-heading text-2xl font-bold text-[#1B2A4A] sm:text-3xl">
            Appendices
          </h2>
          <div className="mt-2 h-0.5 w-12 rounded bg-[#C9A84C]/60" />

          <div className="mt-8 space-y-4">
            {appendices.map((appendix, i) => (
              <div
                key={appendix.letter}
                className={`animate-fade-in-up delay-${Math.min((i + 1) * 100, 800)} warm-card group p-6`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#8B1A2B]/10 font-heading text-lg font-bold text-[#8B1A2B] transition-colors group-hover:bg-[#8B1A2B]/15">
                      {appendix.letter}
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-[#1B2A4A] transition-colors group-hover:text-[#8B1A2B]">
                        {appendix.title}
                      </h3>
                      <div className="mt-1.5 mb-1.5 h-px w-8 bg-[#C9A84C]/40" />
                      <p className="font-body text-sm leading-relaxed text-[#6B5E56]">
                        {appendix.description}
                      </p>
                    </div>
                  </div>
                  <span className="flex-shrink-0 rounded-full bg-[#EDE8E0] px-3 py-1 font-ui text-xs tabular-nums text-[#8A7E76]">
                    p. {appendix.page}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="section-divider mb-12" />
          <h2 className="animate-fade-in-up font-heading text-2xl font-bold text-[#8B1A2B] sm:text-3xl">
            Ready to Begin?
          </h2>
          <p className="animate-fade-in-up delay-200 mt-4 font-body text-base text-[#6B5E56]">
            Get your copy and embark on this enlightening journey through the Quran.
          </p>
          <div className="animate-fade-in-up delay-300 mt-6 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/#where-to-buy"
              className="inline-flex items-center justify-center rounded-full bg-[#8B1A2B] px-8 py-3.5 font-ui text-sm font-semibold text-white shadow-lg shadow-[#8B1A2B]/20 transition-all hover:bg-[#A63244] hover:shadow-xl"
            >
              Buy Now
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#C9A84C] px-8 py-3.5 font-ui text-sm font-semibold text-[#C9A84C] transition-all hover:bg-[#C9A84C] hover:text-white"
            >
              About the Author
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
