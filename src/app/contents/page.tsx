import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Book Contents — 11 Chapters on Science, Prophets & History",
  description:
    "Explore all 11 chapters covering scientific references, stories of prophets (Moses, Jesus, Abraham, Joseph), historical accounts, and Quranic guidance. Plus 3 appendices.",
};

const chapters = [
  { number: 1, title: "The Quran, an Introduction", page: 4 },
  { number: 2, title: "The Quran - its Relation to Other Scriptures", page: 13 },
  { number: 3, title: "Starting The Journey: Oft Recited Verses from The Quran", page: 20 },
  { number: 4, title: "Scientific References in the Quran", page: 26 },
  { number: 5, title: "Historical References in the Quran: Predictions and History", page: 35 },
  { number: 6, title: "Marium (Mary) pbuh and Issa (Jesus) pbuh in the Quran", page: 54 },
  { number: 7, title: "Life Circumstances Mentioned: Guidance and Thoughts: Gems from the Quran", page: 61 },
  { number: 8, title: "Ibrahim (Abraham) and Yousuf (Joseph) (Peace be upon them all) in the Quran", page: 71 },
  { number: 9, title: "On His Creating, Creation and Guidance: Gems from the Quranic Suras", page: 79 },
  { number: 10, title: "Musa (Moses) (pbuh) in the Quran", page: 86 },
  { number: 11, title: "Etiquettes, Manners and Guidance in the Quran: Gems from the Quranic Suras", page: 93 },
];

const appendices = [
  { letter: "1", title: "Protection and Preservation of The Quran", page: 107 },
  { letter: "2", title: "Timeline of the Revelation of the Quran and Muhammad\u2019s (pbuh) birth and Prophethood.", page: 109 },
  { letter: "3", title: "The Continuity of Monotheistic faith leading to Muhammad (pbuh) and Islam. A brief Timeline.", page: 110 },
];

export default function ContentsPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F5F0E8] to-[#FAF8F5] py-6 sm:py-8 lg:py-10">
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
                <div className="mt-3 space-y-4 font-body text-base leading-relaxed text-[#6B5E56]">
                  <p>
                    Introducing the Quran is no easy task. Lives of messengers as related in the Quran are just not story told; they carry an underlying message, which must be related to our own lives.
                  </p>
                  <p>
                    Nuggets of divine instructions scattered all over Quran are given here as: Gems From The Quran. While most are relatively straightforward and easy to comprehend others may require reference to further explanation from tafseer/exegesis.
                  </p>
                  <p>
                    Suras revealed can be attributed to the Divine Will, while some are in answers to what Prophet Muhammad (pbuh) was at some point in his daily life, asked about.
                  </p>
                  <p>
                    If some passages seem to have double meanings, we have to know the context behind why it was revealed in order extract the correct meaning. Where deemed necessary explanations were given from well-known exegesis (tafseer) Ibne Kathir, or Maariful Quran.
                  </p>
                  <p>
                    In the end it must be emphasized that the Quran is a Divine Book, what we read and the meaning we try to bring out literally, is only a part of the effort. Quran itself exhorts us to ponder over it. This is what the Quran says about itself:
                  </p>
                  <blockquote className="mt-2 border-l-4 border-[#C9A84C]/60 pl-4 italic text-[#4A4440]">
                    In it are Verses that are entirely clear, they are the foundations of the Book [and these are the Verses (commandments), Al-Faraid (obligatory duties), and Al-Hudud (legal laws for the punishment)]; and others are not entirely clear. So as for those in whose heart there is a deviation (from the truth) they follow that which is not entirely clear thereof, seeking Al-Fitnah (polytheism and trials), and seeking its hidden meanings, but none knows its hidden meanings save Allah.
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="animate-fade-in-up font-heading text-2xl font-bold text-[#1B2A4A] sm:text-3xl">
            CONTENTS
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
