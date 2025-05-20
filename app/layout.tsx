import type { Metadata } from "next";
import { Geist, Geist_Mono, Josefin_Sans, Quicksand } from "next/font/google";
import "./globals.css";
import LenisProvider from "./components/LenisProvider";
import PageTransition from "./components/PageTransition";
import { ViewTransitions } from "next-view-transitions";

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
  keywords: [
    "Ayada Cliff",
    "Varkala Villa",
    "Luxury Stay Kerala",
    "Ocean View Villa",
    "Private Pool Varkala",
    "Beach Villa Kerala",
  ],
  authors: [{ name: "Deflated Pappadam", url: "https://deflatedpappadam.com" }],
  creator: "Ayada Cliff",
  metadataBase: new URL("https://ayadacliff.com"),
  // openGraph: {
  //   title: "AYADA CLIFF – Luxury Ocean View Pool Villa in Varkala",
  //   description: "Discover a luxurious escape at Ayada Cliff – an oceanfront private pool villa in the heart of Varkala, Kerala.",
  //   url: "https://ayadacliff.com",
  //   siteName: "AYADA CLIFF",
  //   images: [
  //     {
  //       url: "https://ayadacliff.com/og-image.jpg", // Replace with your actual image
  //       width: 1200,
  //       height: 630,
  //       alt: "AYADA CLIFF – Luxury Ocean View Villa",
  //     },
  //   ],
  //   locale: "en_US",
  //   type: "website",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "AYADA CLIFF – Luxury Ocean View Pool Villa in Varkala",
  //   description: "Indulge in luxury at AYADA CLIFF, a private oceanfront pool villa in Varkala, Kerala.",
  //   creator: "@your_twitter_handle", // Replace if applicable
  //   images: ["https://ayadacliff.com/og-image.jpg"],
  // },
  // icons: {
  //   icon: "/favicon.ico",
  //   apple: "/apple-touch-icon.png",
  //   shortcut: "/favicon.ico",
  // },
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
        className={`${geistSans.variable} ${geistMono.variable} ${josefinSans.variable} quicksand hide-scrollbar antialiased`}
      >
        <ViewTransitions>
          <PageTransition />
          <LenisProvider>{children}</LenisProvider>
        </ViewTransitions>
      </body>
    </html>
  );
}
