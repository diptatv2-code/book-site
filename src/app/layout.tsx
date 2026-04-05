import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { VisitorTracker } from "./visitor-tracker";
import { MobileMenu } from "./components/MobileMenu";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-ui",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://introducingthequran.com";

export const metadata: Metadata = {
  title: {
    default: "A Short Journey Through The Quran - An Introduction by Tanbirul Quadir Choudhury",
    template: "%s | A Short Journey Through The Quran",
  },
  description:
    "A Short Journey Through The Quran — discover scientific miracles, historical accounts, stories of the prophets (Abraham, Moses, Jesus, Joseph), and timeless Quranic guidance. An accessible introduction by Tanbirul Quadir Choudhury covering science, history, spirituality, and the relationship between the Torah, Gospel, and Quran.",
  keywords: [
    "Quran", "Quran introduction", "Quran for beginners", "understanding the Quran",
    "Quran and science", "Quran and modern science", "scientific miracles in the Quran",
    "Big Bang in the Quran", "embryology in the Quran", "Quran and astronomy",
    "scientific facts in Quran", "Quran and physics", "Quran and biology",
    "stories of the prophets in Quran", "prophets in Quran", "Quranic stories",
    "Story of Prophet Musa Moses in Quran", "Story of Prophet Isa Jesus in Quran",
    "Story of Prophet Ibrahim Abraham in Quran", "Story of Prophet Yusuf Joseph in Quran",
    "Quran history", "historical accuracy of the Quran", "preservation of the Quran",
    "Pharaoh in the Quran", "Quran and ancient civilizations",
    "Quranic guidance", "life lessons from Quran", "moral teachings of the Quran",
    "Quranic wisdom for daily life", "how to live by the Quran", "spiritual guidance",
    "Islam", "Islamic book", "Torah Gospel Quran", "Abrahamic faiths",
    "Tanbirul Quadir Choudhury", "A Short Journey Through The Quran",
    "Quran book", "modern Quran interpretation", "evidence for Quran",
    "Quran on forgiveness", "Quran on patience", "purpose of life in Quran",
    "religion and science", "faith and science", "Quranic science book",
  ],
  authors: [{ name: "Tanbirul Quadir Choudhury" }],
  creator: "Tanbirul Quadir Choudhury",
  publisher: "Tanbirul Quadir Choudhury",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "book",
    title: "A Short Journey Through The Quran - An Introduction",
    description:
      "Explore scientific miracles, stories of the prophets, historical accounts, and divine guidance in the Quran. A unique, accessible introduction for readers of all backgrounds.",
    url: siteUrl,
    siteName: "A Short Journey Through The Quran",
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "A Short Journey Through The Quran - Book Cover",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "A Short Journey Through The Quran - An Introduction",
    description:
      "Discover the Quran's scientific miracles, prophet stories, and timeless guidance. An accessible introduction by Tanbirul Quadir Choudhury.",
    images: ["/images/og-cover.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "A Short Journey Through The Quran",
  alternateName: "A Short Journey Through The Quran - An Introduction",
  author: {
    "@type": "Person",
    name: "Tanbirul Quadir Choudhury",
  },
  publisher: {
    "@type": "Organization",
    name: "DIPTAIT",
  },
  description:
    "A unique and accessible introduction to the Quran covering science, history, stories of the prophets, and timeless wisdom.",
  numberOfPages: 110,
  bookFormat: "https://schema.org/Paperback",
  inLanguage: "en",
  isbn: "",
  image: "https://introducingthequran.com/images/og-cover.jpg",
  url: "https://introducingthequran.com",
  genre: ["Religion", "Islam", "Quran Studies", "Science and Religion", "History", "Spirituality"],
  keywords: "Quran, science, prophets, history, Islam, guidance, Abraham, Moses, Jesus, Joseph, Torah, Gospel",
  audience: {
    "@type": "Audience",
    audienceType: "General readers, students, spiritual seekers",
  },
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/contents", label: "Book Contents" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sourceSerif.variable} ${inter.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2C2420]">
        <VisitorTracker />

        {/* Navbar */}
        <nav className="sticky top-0 z-50 border-b border-[#DDD5CC]/60 bg-[#FAF8F5]/95 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link
                href="/"
                className="font-heading text-lg font-bold text-[#2C2420] transition-colors hover:text-[#8B1A2B] sm:text-xl"
              >
                A Short Journey Through The Quran
              </Link>

              {/* Desktop nav */}
              <div className="hidden items-center gap-8 md:flex">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-ui text-sm font-medium text-[#6B5E56] transition-colors hover:text-[#8B1A2B]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile hamburger */}
              <MobileMenu navLinks={navLinks} />
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-[#1B2A4A]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              {/* Brand */}
              <div>
                <h3 className="font-heading text-lg font-bold text-[#FAF8F5]">
                  A Short Journey Through The Quran
                </h3>
                <p className="mt-2 font-body text-sm text-[#FAF8F5]/70">
                  An Introduction by Tanbirul Quadir Choudhury
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-ui text-sm font-semibold uppercase tracking-wider text-[#C9A84C]">
                  Quick Links
                </h4>
                <ul className="mt-3 space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-ui text-sm text-[#FAF8F5]/70 transition-colors hover:text-[#C9A84C]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-ui text-sm font-semibold uppercase tracking-wider text-[#C9A84C]">
                  Contact
                </h4>
                <ul className="mt-3 space-y-2 font-ui text-sm text-[#FAF8F5]/70">
                  <li>
                    <a
                      href="mailto:tquadirchoudhury@yahoo.com"
                      className="transition-colors hover:text-[#C9A84C]"
                    >
                      tquadirchoudhury@yahoo.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+8801552389972" className="transition-colors hover:text-[#C9A84C]">
                      +880 1552389972
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

            <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
              <p className="font-ui text-xs text-[#FAF8F5]/50">
                &copy; 2026 Tanbirul Quadir Choudhury. All rights reserved.
              </p>
              <p className="font-ui text-xs text-[#FAF8F5]/50">
                Website by{" "}
                <a
                  href="https://diptait.com.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C9A84C] transition-colors hover:text-[#E2D5A8]"
                >
                  DIPTAIT
                </a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

