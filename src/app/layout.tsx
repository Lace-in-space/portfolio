import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lasse Müller — Portfolio",
  description: "Portfolio von Lasse Müller — Kreativ, Design & Kommunikation.",
  keywords: ["Lasse Müller", "Portfolio", "Kreativ", "Design", "Kommunikation"],
  authors: [{ name: "Lasse Müller" }],
  openGraph: {
    title: "Lasse Müller — Portfolio",
    description: "Kreativ | Design | Kommunikation",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: '#ffffff', color: '#1a1a1a' }}
      >
        {children}
      </body>
    </html>
  );
}
