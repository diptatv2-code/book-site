import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] sm:min-h-[75vh] items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-[#F5F0E8] to-[#EDE8E0]" />
        <div className="geometric-pattern absolute inset-0 opacity-60" />

        {/* Decorative Islamic geometric SVG */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]">
          <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#8B1A2B" strokeWidth="1">
              {/* Outer octagon */}
              <polygon points="400,50 634,166 716,400 634,634 400,750 166,634 84,400 166,166" />
              {/* Inner octagon */}
              <polygon points="400,150 564,226 616,400 564,574 400,650 236,574 184,400 236,226" />
              {/* Star pattern */}
              <line x1="400" y1="50" x2="400" y2="750" />
              <line x1="84" y1="400" x2="716" y2="400" />
              <line x1="166" y1="166" x2="634" y2="634" />
              <line x1="634" y1="166" x2="166" y2="634" />
              {/* Inner star */}
              <polygon points="400,150 450,300 564,226 500,350 616,400 500,450 564,574 450,500 400,650 350,500 236,574 300,450 184,400 300,350 236,226 350,300" />
              {/* Center circle */}
              <circle cx="400" cy="400" r="100" />
              <circle cx="400" cy="400" r="50" />
            </g>
          </svg>
        </div>

        {/* Subtle accent lines */}
        <div className="absolute left-0 top-1/4 h-px w-32 bg-gradient-to-r from-transparent to-[#C9A84C]/20" />
        <div className="absolute right-0 top-1/3 h-px w-32 bg-gradient-to-l from-transparent to-[#C9A84C]/20" />
        <div className="absolute bottom-1/4 left-0 h-px w-48 bg-gradient-to-r from-transparent to-[#8B1A2B]/15" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-14">
            {/* Book Cover — clean, image only */}
            <div className="animate-fade-in-up flex-shrink-0">
              <Image
                src="/images/book-cover-front.jpg"
                alt="A Short Journey Through The Quran - Book Cover"
                width={380}
                height={600}
                priority
                className="book-cover-clean max-h-[400px] sm:max-h-none w-auto"
                style={{ height: "auto", maxWidth: "380px" }}
              />
            </div>

            {/* Hero Text */}
            <div className="text-center lg:text-left">
              <div className="animate-fade-in-up delay-100">
                <p className="font-ui text-sm font-medium uppercase tracking-[0.3em] text-[#C9A84C]">
                  A Book by Tanbirul Quadir Choudhury
                </p>
              </div>

              <h1 className="animate-fade-in-up delay-200 mt-6 font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                <span className="text-[#8B1A2B]">A Short Journey</span>
                <br />
                <span className="text-[#2C2420]">Through The Quran</span>
              </h1>

              <p className="animate-fade-in-up delay-300 mt-4 font-heading text-xl font-light italic text-[#1B2A4A] sm:text-2xl">
                An Introduction
              </p>

              <p className="animate-fade-in-up delay-400 mt-6 max-w-lg font-body text-base sm:text-lg leading-relaxed text-[#6B5E56]">
                Embark on an enlightening journey through the Holy Quran. Discover its timeless
                wisdom, scientific wonders, and the captivating stories of the prophets.
              </p>

              <div className="animate-fade-in-up delay-500 mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  href="/contents"
                  className="inline-flex items-center justify-center rounded-full bg-[#8B1A2B] px-8 py-3.5 font-ui text-sm font-semibold text-white shadow-lg shadow-[#8B1A2B]/20 transition-all hover:bg-[#A63244] hover:shadow-xl hover:shadow-[#8B1A2B]/25"
                >
                  Explore Contents
                </Link>
                <a
                  href="#where-to-buy"
                  className="inline-flex items-center justify-center rounded-full border-2 border-[#C9A84C] px-8 py-3.5 font-ui text-sm font-semibold text-[#C9A84C] transition-all hover:bg-[#C9A84C] hover:text-white"
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAF8F5] to-transparent" />
      </section>

      {/* Book Blurb Section */}
      <section className="relative py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="section-divider mb-6" />
          <div className="animate-fade-in-up text-center">
            <h2 className="font-heading text-2xl font-bold text-[#8B1A2B] sm:text-3xl lg:text-4xl">
              About This Book
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded bg-[#C9A84C]/60" />
          </div>
          <div className="animate-fade-in-up delay-200 mt-8">
            <div className="warm-card accent-left p-5 sm:p-8 lg:p-10">
              <div className="space-y-6">
                <p className="font-body text-base sm:text-lg leading-relaxed text-[#6B5E56]">
                  This book has a unique construct in the way it introduces the Quran. It is not a list of do&apos;s and don&apos;ts. It mentions the Quranic guidance to lead our lives, the text, extracted from all over the Scripture as Gems from the Quran. It introduces you to the history of the Prophets, Musa (Moses), Ibrahim(Abraham), Issa (Jesus) and Muhammad, and the lessons we derive from their lives. You will see the reference to the packets of scientific information that predate modern discoveries and dotted all over the Quran. The historic accounts of the past and the predictions of the future. It will be enjoyable for readers of all backgrounds — whether you are encountering the Quran for the first time or revisiting its wisdom with fresh eyes.
                </p>
                <p className="font-body text-base sm:text-lg leading-relaxed text-[#6B5E56]">
                  Discover your own faith through Islam, and see the striking similarity between Islam and other Abrahamic faiths. Quran is the last of the revealed books, and has been preserved with Divine intervention and care, such is the declaration in the Quran itself. Readable, with many extracts from the Quran. A short journey of a profound Scripture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back Cover / Detailed Description */}
      <section className="relative bg-[#EDE8E0] py-6 sm:py-8 lg:py-10">
        <div className="geometric-pattern absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-6 lg:gap-12 lg:grid-cols-2">
            <div className="animate-slide-in-left">
              <Image
                src="/images/book-cover-back.jpg"
                alt="A Short Journey Through The Quran - Back Cover"
                width={480}
                height={800}
                className="book-cover-clean mx-auto max-h-[300px] sm:max-h-none w-auto sm:w-full"
                style={{ height: "auto", maxWidth: "420px" }}
              />
            </div>
            <div className="animate-slide-in-right space-y-6">
              <h2 className="font-heading text-2xl font-bold text-[#1B2A4A] sm:text-3xl lg:text-4xl">
                Discover the Quran
              </h2>
              <div className="h-1 w-16 rounded bg-[#C9A84C]/60" />
              <p className="font-body text-base sm:text-lg leading-relaxed text-[#6B5E56]">
                Discover the foundational scripture of Islam, a book revered by nearly two billion people worldwide. This accessible guide opens the door to understanding the Quran, not as an isolated text, but as the final chapter in a universal story of divine guidance. Within its pages, you will encounter familiar figures cherished in other faiths, such as the unwavering monotheist Abraham/Ibrahim, the law-bearing Moses/Musa, and the compassionate Jesus/Issa, son of Mary/Marium — all of whom are honored as prophetic predecessors to Muhammad. The Quran&apos;s poignant narrative of Joseph/Yousuf, a tale of betrayal and ultimate triumph, is recounted.
              </p>
              <p className="font-body text-base sm:text-lg leading-relaxed text-[#6B5E56]">
                A central tenet explored in this introduction is the Islamic belief in all earlier revealed books, like the Torah and the Gospel. The Quran presents itself as a confirming culmination and a protective guardian of the original message brought by these prophets. This book will illuminate how Muslims view divine revelation as a continuous thread, weaving through history and connecting humanity to the one God. Nuggets of guidance for living a life, and given throughout the Quran, are also presented here.
              </p>
              <p className="font-body text-base sm:text-lg leading-relaxed text-[#6B5E56]">
                Perfect for students and curious minds, this volume provides the essential context to appreciate the Quran&apos;s timeless message of faith, justice, and compassion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up text-center">
            <h2 className="font-heading text-2xl font-bold text-[#8B1A2B] sm:text-3xl lg:text-4xl">
              Key Highlights
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded bg-[#C9A84C]/60" />
            <p className="mt-4 font-body text-base sm:text-lg text-[#6B5E56]">
              What makes this book a must-read
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {highlights.map((item, i) => (
              <div
                key={item.title}
                className={`animate-fade-in-up delay-${(i + 1) * 100} warm-card group p-4 sm:p-6`}
              >
                <div className="flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-lg bg-[#8B1A2B]/10 text-2xl transition-colors group-hover:bg-[#8B1A2B]/15">
                  {item.icon}
                </div>
                <h3 className="mt-3 sm:mt-5 font-heading text-base sm:text-xl font-bold text-[#2C2420]">
                  {item.title}
                </h3>
                <div className="mt-2 h-0.5 w-8 rounded bg-[#C9A84C]/40" />
                <p className="mt-2 sm:mt-3 font-body text-xs sm:text-sm leading-relaxed text-[#6B5E56]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where to Buy */}
      <section id="where-to-buy" className="bg-[#EDE8E0] py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up text-center">
            <h2 className="font-heading text-2xl font-bold text-[#1B2A4A] sm:text-3xl lg:text-4xl">
              Where to Buy
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded bg-[#C9A84C]/60" />
            <p className="mt-4 font-body text-base sm:text-lg text-[#6B5E56]">
              Get your copy today
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            {retailers.map((retailer, i) => (
              <a
                key={retailer.name}
                href={retailer.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`animate-fade-in-up delay-${(i + 1) * 100} warm-card group flex max-w-sm flex-col items-center p-4 sm:p-6 text-center`}
              >
                <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#8B1A2B]/10 text-3xl transition-colors group-hover:bg-[#8B1A2B]/15">
                  {retailer.icon}
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-[#2C2420]">
                  {retailer.name}
                </h3>
                <p className="mt-1 font-ui text-xs text-[#8A7E76]">{retailer.note}</p>
                <span className="mt-4 inline-flex items-center justify-center rounded-full bg-[#8B1A2B] px-5 py-2 font-ui text-sm font-medium text-white transition-colors group-hover:bg-[#A63244]">
                  Buy &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Book Details */}
      <section className="py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up text-center">
            <h2 className="font-heading text-2xl font-bold text-[#8B1A2B] sm:text-3xl lg:text-4xl">
              Book Details
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded bg-[#C9A84C]/60" />
          </div>

          <div className="animate-fade-in-up delay-200 mt-8 warm-card overflow-hidden">
            <div className="grid divide-y divide-[#EBE6E0] sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              {bookDetails.map((detail) => (
                <div key={detail.label} className="flex items-center gap-4 p-6">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#8B1A2B]/10 text-lg">
                    {detail.icon}
                  </div>
                  <div>
                    <p className="font-ui text-xs font-medium uppercase tracking-wider text-[#8A7E76]">
                      {detail.label}
                    </p>
                    <p className="mt-0.5 font-heading text-lg font-semibold text-[#2C2420]">
                      {detail.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-6 sm:py-8 lg:py-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#EDE8E0] via-[#F5F0E8] to-[#FAF8F5]" />
        <div className="geometric-pattern absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="animate-fade-in-up font-heading text-2xl font-bold sm:text-3xl lg:text-4xl">
            Begin Your{" "}
            <span className="text-[#8B1A2B]">Journey</span>
          </h2>
          <p className="animate-fade-in-up delay-200 mt-4 font-body text-base sm:text-lg text-[#6B5E56]">
            Open the pages and discover the wisdom, beauty, and guidance of the Holy Quran.
          </p>
          <div className="animate-fade-in-up delay-300 mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#where-to-buy"
              className="inline-flex items-center justify-center rounded-full bg-[#8B1A2B] px-10 py-4 font-ui text-sm font-semibold text-white shadow-lg shadow-[#8B1A2B]/20 transition-all hover:bg-[#A63244] hover:shadow-xl"
            >
              Get Your Copy
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#C9A84C] px-10 py-4 font-ui text-sm font-semibold text-[#C9A84C] transition-all hover:bg-[#C9A84C] hover:text-white"
            >
              Contact the Author
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

const highlights = [
  {
    icon: (
      <svg className="h-7 w-7 text-[#8B1A2B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: "Scientific References",
    description:
      "Explore Quranic verses that reference natural phenomena, embryology, astronomy, and more -- centuries ahead of their time.",
  },
  {
    icon: (
      <svg className="h-7 w-7 text-[#8B1A2B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Historical Accounts",
    description:
      "Journey through the historical events and civilizations mentioned in the Quran, from ancient empires to pivotal moments.",
  },
  {
    icon: (
      <svg className="h-7 w-7 text-[#8B1A2B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Stories of Prophets",
    description:
      "Relive the inspiring stories of Abraham, Moses, Jesus, Joseph, and other prophets as told in the Quran.",
  },
  {
    icon: (
      <svg className="h-7 w-7 text-[#8B1A2B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: "Gems from the Quran",
    description:
      "Uncover the hidden treasures and profound insights woven throughout the verses of the Holy Quran.",
  },
  {
    icon: (
      <svg className="h-7 w-7 text-[#8B1A2B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: "3 Appendices",
    description:
      "Supplementary materials providing additional context, references, and resources for deeper exploration.",
  },
];

const retailers = [
  {
    name: "Amazon",
    url: "https://www.amazon.com/dp/B0F2NLP67Q",
    note: "Hardcover, Paperback & Kindle",
    icon: (
      <svg className="h-8 w-8 text-[#8B1A2B]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.045 18.02c.07-.116.36-.31.77-.58 3.02-2.01 6.61-3.19 10.44-3.19 2.79 0 5.67.59 8.4 1.83.27.12.5.27.67.46.17.19.26.42.26.66 0 .3-.13.53-.4.67-.26.15-.6.12-.96-.08a21.77 21.77 0 00-7.97-1.79c-3.63 0-7.05 1.12-9.83 3.04-.21.14-.4.17-.55.1a.46.46 0 01-.26-.42c0-.08.02-.18.07-.29zm22.03-2.54c-.34-.42-1.12-.63-2.19-.63-.83 0-1.8.16-2.7.41-.24.07-.42.02-.5-.12-.08-.14-.02-.33.19-.46.91-.54 2.71-.76 3.87-.76 1.45 0 2.3.39 2.72.92.42.53.22 1.21-.42 2.05-.12.16-.3.19-.46.1-.16-.1-.2-.27-.1-.44.5-.86.64-1.48.36-1.88z" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" opacity="0" />
      </svg>
    ),
  },
];

const bookDetails = [
  { icon: <span className="text-[#8B1A2B]">&#x1D54B;</span>, label: "Title", value: "A Short Journey Through The Quran" },
  { icon: <span className="text-[#8B1A2B]">&#x270D;</span>, label: "Author", value: "Tanbirul Quadir Choudhury" },
  { icon: <span className="text-[#8B1A2B]">&#x1F4C4;</span>, label: "Pages", value: "~110" },
  { icon: <span className="text-[#8B1A2B]">&#x1F4D6;</span>, label: "Format", value: "Hardcover / Paperback / Kindle" },
  { icon: <span className="text-[#8B1A2B]">&#x1F310;</span>, label: "Language", value: "English" },
  { icon: <span className="text-[#8B1A2B]">&#x2B50;</span>, label: "Chapters", value: "11 + 3 Appendices" },
];
