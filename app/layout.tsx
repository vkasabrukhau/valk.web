import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto, Doto } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Valk | Personal Site",
  description: "Minimal personal website",
  icons: { icon: "/favicon.ico" },
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${doto.variable} font-[var(--font-doto)] antialiased bg-background text-foreground selection:bg-black/80 selection:text-white dark:selection:bg-white/80 dark:selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
