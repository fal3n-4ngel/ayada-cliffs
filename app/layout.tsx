import type { Metadata } from "next";
import { Geist, Geist_Mono, Josefin_Sans, Quicksand } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AYADA CLIFF",
  description: "Luxury Ocean View Pool Villa in Varkala, Kerala",
};

export const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${josefinSans.variable}  antialiased quicksand`}
      >
        {children}
      </body>
    </html>
  );
}
