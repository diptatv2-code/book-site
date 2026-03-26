import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Feedback",
  description:
    "Get in touch with the author of A Short Journey Through The Quran. Share feedback, ask questions, or inquire about the book.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
