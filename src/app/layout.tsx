import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ivan Kolesnikov — Creative Director & Designer",
  description: "Portfolio of Ivan Kolesnikov — Creative Director, Designer, and Visual Storyteller based in Berlin.",
  keywords: ["Ivan Kolesnikov", "Creative Director", "Designer", "Portfolio", "Berlin", "Communication Design"],
  authors: [{ name: "Ivan Kolesnikov" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Ivan Kolesnikov — Portfolio",
    description: "Creative Director & Designer based in Berlin",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
