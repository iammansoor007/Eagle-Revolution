import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Eagle Revolution | Soaring Beyond Expectations",
  description: "Aggressive roofing experts providing professional, high-quality roofing, solar, and home improvement solutions. Architectural-grade roof systems engineered for endurance, beauty, and structural integrity.",
  authors: [{ name: "Eagle Revolution" }],
  openGraph: {
    title: "Eagle Revolution — Soaring Beyond Expectations",
    description: "Architectural-grade roof systems engineered for endurance.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
