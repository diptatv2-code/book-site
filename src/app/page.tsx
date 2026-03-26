import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
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
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
            {/* Book Cover with 3D effect */}
            <div className="animate-fade-in-up book-3d flex-shrink-0">
              <div className="book-3d-inner relative">
                {/* Book shadow */}
                <div className="absolute -bottom-6 left-4 right-4 h-8 rounded-full bg-[#2C2420]/10 blur-2xl" />
                {/* Book glow */}
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-b from-[#C9A84C]/15 via-transparent to-[#8B1A2B]/10 blur-sm" />
                <Image
                  src="/images/book-cover-front.jpg"
                  alt="A Short Journey Through The Quran - Book Cover"
                  width={400}
                  height={635}
                  priority
                  className="relative rounded-lg shadow-2xl shadow-[#2C2420]/20"
                  style={{ width: "auto", height: "auto", maxWidth: "400px" }}
                />
              </div>
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

              <p className="animate-fade-in-up delay-400 mt-6 max-w-lg font-body text-lg leading-relaxed text-[#6B5E56]">
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
      <section className="relative py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="section-divider mb-16" />
          <div className="animate-fade-in-up text-center">
            <h2 className="font-heading text-3xl font-bold text-[#8B1A2B] sm:text-4xl">
              About This Book
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded bg-[#C9A84C]/60" />
          </div>
          <div className="animate-fade-in-up delay-200 mt-12">
            <div className="warm-card accent-left p-8 sm:p-10">
              <div className="space-y-6">
                <p className="font-body text-lg leading-relaxed text-[#6B5E56]">
                  With a unique construct and presentation, this book is a short and interesting read
                  highlighting some of the major themes of the Quran. It introduces the reader to the
                  gems hidden within its verses -- from scientific references that predate modern
                  discoveries to the powerful stories of the prophets that continue to resonate across
                  generations.
                </p>
                <p className="font-body text-lg leading-relaxed text-[#6B5E56]">
                  Written with clarity and care, it is designed to be accessible and enjoyable for
                  readers of all backgrounds -- whether you are encountering the Quran for the first
                  time or revisiting its wisdom with fresh eyes. A readable, enriching journey awaits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back Cover / Detailed Description */}
      <section className="relative bg-[#EDE8E0] py-24">
        <div className="geometric-pattern absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-slide-in-left">
              <Image
                src="/images/book-cover-back.jpg"
                alt="A Short Journey Through The Quran - Back Cover"
                width={480}
                height={800}
                className="mx-auto rounded-lg shadow-2xl shadow-[#2C2420]/15"
                style={{ width: "auto", height: "auto", maxWidth: "480px" }}
              />
            </div>
            <div className="animate-slide-in-right space-y-6">
              <h2 className="font-heading text-3xl font-bold text-[#1B2A4A] sm:text-4xl">
                Discover the Quran
              </h2>
              <div className="h-1 w-16 rounded bg-[#C9A84C]/60" />
              <p className="font-body text-lg leading-relaxed text-[#6B5E56]">
                Discover the foundational scripture that has shaped civilizations and inspired
                billions. This book introduces you to the major themes and narratives of the
                Holy Quran in an accessible, engaging format.
              </p>
              <p className="font-body text-lg leading-relaxed text-[#6B5E56]">
                Learn about the stories of the great prophets -- Abraham (Ibrahim), Moses (Musa),
                Jesus (Issa), and Joseph (Yousuf) -- and the divine books including the Torah and
                the Gospel. Explore references to science, history, and moral guidance that remain
                profoundly relevant today.
              </p>
              <p className="font-body text-lg leading-relaxed text-[#6B5E56]">
                Ideal for students, curious minds, and anyone seeking to understand the essence
                of the Quran without being overwhelmed. Begin your journey here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up text-center">
            <h2 className="font-heading text-3xl font-bold text-[#8B1A2B] sm:text-4xl">
              Key Highlights
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded bg-[#C9A84C]/60" />
            <p className="mt-4 font-body text-lg text-[#6B5E56]">
              What makes this book a must-read
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item, i) => (
              <div
                key={item.title}
                className={`animate-fade-in-up delay-${(i + 1) * 100} warm-card group p-8`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#8B1A2B]/10 text-2xl transition-colors group-hover:bg-[#8B1A2B]/15">
                  {item.icon}
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-[#2C2420]">
                  {item.title}
                </h3>
                <div className="mt-2 h-0.5 w-8 rounded bg-[#C9A84C]/40" />
                <p className="mt-3 font-body text-sm leading-relaxed text-[#6B5E56]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where to Buy */}
      <section id="where-to-buy" className="bg-[#EDE8E0] py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up text-center">
            <h2 className="font-heading text-3xl font-bold text-[#1B2A4A] sm:text-4xl">
              Where to Buy
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded bg-[#C9A84C]/60" />
            <p className="mt-4 font-body text-lg text-[#6B5E56]">
              Get your copy today from these retailers
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {retailers.map((retailer, i) => (
              <a
                key={retailer.name}
                href={retailer.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`animate-fade-in-up delay-${(i + 1) * 100} warm-card group flex flex-col items-center p-8 text-center`}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#8B1A2B]/10 text-3xl transition-colors group-hover:bg-[#8B1A2B]/15">
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
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up text-center">
            <h2 className="font-heading text-3xl font-bold text-[#8B1A2B] sm:text-4xl">
              Book Details
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded bg-[#C9A84C]/60" />
          </div>

          <div className="animate-fade-in-up delay-200 mt-12 warm-card overflow-hidden">
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
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#EDE8E0] via-[#F5F0E8] to-[#FAF8F5]" />
        <div className="geometric-pattern absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="animate-fade-in-up font-heading text-3xl font-bold sm:text-4xl">
            Begin Your{" "}
            <span className="text-[#8B1A2B]">Journey</span>
          </h2>
          <p className="animate-fade-in-up delay-200 mt-4 font-body text-lg text-[#6B5E56]">
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
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: "11 Chapters",
    description:
      "Carefully structured chapters covering the major themes and narratives of the Quran in a logical progression.",
  },
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
    url: "https://www.amazon.com",
    note: "Paperback & Kindle",
    icon: (
      <svg className="h-8 w-8 text-[#8B1A2B]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.045 18.02c.07-.116.36-.31.77-.58 3.02-2.01 6.61-3.19 10.44-3.19 2.79 0 5.67.59 8.4 1.83.27.12.5.27.67.46.17.19.26.42.26.66 0 .3-.13.53-.4.67-.26.15-.6.12-.96-.08a21.77 21.77 0 00-7.97-1.79c-3.63 0-7.05 1.12-9.83 3.04-.21.14-.4.17-.55.1a.46.46 0 01-.26-.42c0-.08.02-.18.07-.29zm22.03-2.54c-.34-.42-1.12-.63-2.19-.63-.83 0-1.8.16-2.7.41-.24.07-.42.02-.5-.12-.08-.14-.02-.33.19-.46.91-.54 2.71-.76 3.87-.76 1.45 0 2.3.39 2.72.92.42.53.22 1.21-.42 2.05-.12.16-.3.19-.46.1-.16-.1-.2-.27-.1-.44.5-.86.64-1.48.36-1.88z" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" opacity="0" />
      </svg>
    ),
  },
  {
    name: "Barnes & Noble",
    url: "https://www.barnesandnoble.com",
    note: "Paperback & Nook",
    icon: (
      <svg className="h-8 w-8 text-[#8B1A2B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
  },
  {
    name: "Book Depository",
    url: "https://www.bookdepository.com",
    note: "Free worldwide shipping",
    icon: (
      <svg className="h-8 w-8 text-[#8B1A2B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
      </svg>
    ),
  },
  {
    name: "Publisher Direct",
    url: "#",
    note: "Signed copies available",
    icon: (
      <svg className="h-8 w-8 text-[#8B1A2B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

const bookDetails = [
  { icon: <span className="text-[#8B1A2B]">&#x1D54B;</span>, label: "Title", value: "A Short Journey Through The Quran" },
  { icon: <span className="text-[#8B1A2B]">&#x270D;</span>, label: "Author", value: "Tanbirul Quadir Choudhury" },
  { icon: <span className="text-[#8B1A2B]">&#x1F4C4;</span>, label: "Pages", value: "~110" },
  { icon: <span className="text-[#8B1A2B]">&#x1F4D6;</span>, label: "Format", value: "Paperback / eBook" },
  { icon: <span className="text-[#8B1A2B]">&#x1F310;</span>, label: "Language", value: "English" },
  { icon: <span className="text-[#8B1A2B]">&#x2B50;</span>, label: "Chapters", value: "11 + 3 Appendices" },
];
