import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import SiteLayout from "@/components/SiteLayout";

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
  description: "Aggressive roofing experts providing professional, high-quality roofing, solar, and home improvement solutions.",
  authors: [{ name: "Eagle Revolution" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}>
        <Providers>
          <div className="relative min-h-screen flex flex-col">
            {/* Common background grid for all pages */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #2563eb 1px, transparent 1px),
                    linear-gradient(to bottom, #2563eb 1px, transparent 1px)
                  `,
                  backgroundSize: '80px 80px',
                }}
              />
            </div>
            
            <SiteLayout>{children}</SiteLayout>
          </div>
        </Providers>
      </body>
    </html>
  );
}
