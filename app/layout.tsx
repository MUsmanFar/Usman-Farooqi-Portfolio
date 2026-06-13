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
  title: "Usman Farooqi | Technology & Business Growth Specialist",
  description:
    "Premium digital growth systems for businesses — AI, SEO, Google Ads, CRM, automation, and full stack development.",
  metadataBase: new URL("https://your-domain.com"),
  openGraph: {
    title: "Usman Farooqi | Technology & Business Growth Specialist",
    description:
      "Premium digital growth systems for businesses — AI, SEO, Google Ads, CRM, automation, and full stack development.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Usman Farooqi | Technology & Business Growth Specialist",
    description:
      "Premium digital growth systems for businesses — AI, SEO, Google Ads, CRM, automation, and full stack development.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#04040b] text-slate-100">{children}</body>
    </html>
  );
}
