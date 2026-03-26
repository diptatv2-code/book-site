import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { VisitorTracker } from "./visitor-tracker";

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

const siteUrl = "https://ashortjourneythroughthequran.com";

export const metadata: Metadata = {
  title: {
    default: "A Short Journey Through The Quran - An Introduction by Tanbirul Quadir Choudhury",
    template: "%s | A Short Journey Through The Quran",
  },
  description:
    "Discover the Quran like never before. A Short Journey Through The Quran offers a unique, accessible introduction covering science, history, stories of the prophets, and timeless wisdom from the Holy Quran.",
  keywords: [
    "Quran",
    "Islam",
    "Prophets",
    "Science in Quran",
    "History",
    "Abraham",
    "Moses",
    "Jesus",
    "Joseph",
    "Torah",
    "Gospel",
    "Islamic book",
    "Tanbirul Quadir Choudhury",
    "Introduction to Quran",
    "Quran for beginners",
  ],
  authors: [{ name: "Tanbirul Quadir Choudhury" }],
  creator: "Tanbirul Quadir Choudhury",
  publisher: "Tanbirul Quadir Choudhury",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "book",
    title: "A Short Journey Through The Quran - An Introduction",
    description:
      "A unique and accessible introduction to the Quran covering science, history, stories of the prophets, and timeless wisdom.",
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
      "Discover the Quran like never before. Science, history, prophets, and timeless wisdom in one accessible book.",
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
  description:
    "A unique and accessible introduction to the Quran covering science, history, stories of the prophets, and timeless wisdom.",
  numberOfPages: 110,
  bookFormat: "https://schema.org/Paperback",
  inLanguage: "en",
  image: `${siteUrl}/images/og-cover.jpg`,
  url: siteUrl,
  genre: ["Religion", "Islam", "Quran Studies"],
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/contents", label: "Contents" },
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
      <body className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#f5f5f5]">
        <VisitorTracker />

        {/* Navbar */}
        <nav className="sticky top-0 z-50 border-b border-border/50 bg-[#0a0a0a]/90 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link
                href="/"
                className="font-heading text-lg font-bold text-gold transition-colors hover:text-gold-light sm:text-xl"
              >
                A Short Journey Through The Quran
              </Link>

              {/* Desktop nav */}
              <div className="hidden items-center gap-8 md:flex">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-ui text-sm font-medium text-text-muted transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile hamburger */}
              <MobileMenu />
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-border/50 bg-[#060608]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              {/* Brand */}
              <div>
                <h3 className="font-heading text-lg font-bold text-gold">
                  A Short Journey Through The Quran
                </h3>
                <p className="mt-2 font-body text-sm text-text-muted">
                  An Introduction by Tanbirul Quadir Choudhury
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-ui text-sm font-semibold uppercase tracking-wider text-gold-light">
                  Quick Links
                </h4>
                <ul className="mt-3 space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-ui text-sm text-text-muted transition-colors hover:text-gold"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-ui text-sm font-semibold uppercase tracking-wider text-gold-light">
                  Contact
                </h4>
                <ul className="mt-3 space-y-2 font-ui text-sm text-text-muted">
                  <li>
                    <a
                      href="mailto:tquadirchoudhury@yahoo.com"
                      className="transition-colors hover:text-gold"
                    >
                      tquadirchoudhury@yahoo.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+8801552389972" className="transition-colors hover:text-gold">
                      +880 1552389972
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="section-divider mt-8" />

            <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
              <p className="font-ui text-xs text-text-muted">
                &copy; 2026 Tanbirul Quadir Choudhury. All rights reserved.
              </p>
              <p className="font-ui text-xs text-text-muted">
                Website by{" "}
                <a
                  href="https://diptait.com.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold transition-colors hover:text-gold-light"
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

function MobileMenu() {
  return (
    <div className="md:hidden">
      <input type="checkbox" id="mobile-menu-toggle" className="peer hidden" />
      <label
        htmlFor="mobile-menu-toggle"
        className="flex cursor-pointer flex-col gap-1.5 p-2"
        aria-label="Toggle navigation menu"
      >
        <span className="block h-0.5 w-6 bg-text-muted transition-all peer-checked:translate-y-2 peer-checked:rotate-45" />
        <span className="block h-0.5 w-6 bg-text-muted transition-all peer-checked:opacity-0" />
        <span className="block h-0.5 w-6 bg-text-muted transition-all peer-checked:-translate-y-2 peer-checked:-rotate-45" />
      </label>
      <div className="invisible absolute left-0 top-16 w-full border-b border-border/50 bg-[#0a0a0a]/95 opacity-0 backdrop-blur-md transition-all duration-300 peer-checked:visible peer-checked:opacity-100">
        <div className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-3 font-ui text-sm font-medium text-text-muted transition-colors hover:bg-card hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
