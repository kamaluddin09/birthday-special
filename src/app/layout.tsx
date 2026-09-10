import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Happy Birthday Seema ❤️ | A Special Surprise Just For You",
  description:
    "A cinematic, personalized celebration filled with our five years of memories, love, and sweetest moments.",
  openGraph: {
    title: "Happy Birthday Seema ❤️",
    description: "A special birthday surprise celebration crafted just for you.",
    type: "website",
    siteName: "Happy Birthday Seema ❤️",
    images: [
      {
        url: "/gallery/IMG-20220126-WA0064.jpg",
        width: 1200,
        height: 630,
        alt: "Happy Birthday Seema ❤️",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy Birthday Seema ❤️",
    description: "A special birthday surprise celebration crafted just for you.",
    images: ["/gallery/IMG-20220126-WA0064.jpg"],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💖</text></svg>",
  },
};

export const viewport: Viewport = {
  themeColor: "#14030B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#14030B] text-[#FFF8F5] selection:bg-[#FF4F8B]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
