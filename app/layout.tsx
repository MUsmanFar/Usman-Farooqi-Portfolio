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
  title: "Usman Farooqi | Project Manager & Digital Operations Lead",
  description:
    "Professional portfolio of Usman Farooqi, Web Development & Digital Operations Lead. Managing web projects, WordPress delivery, team leadership, and AI-assisted operations.",
  metadataBase: new URL("https://usman-farooqi.vercel.app"),
  openGraph: {
    title: "Usman Farooqi | Project Manager & Digital Operations Lead",
    description:
      "Professional portfolio of Usman Farooqi, Web Development & Digital Operations Lead. Managing web projects, WordPress delivery, team leadership, and AI-assisted operations.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Usman Farooqi | Project Manager & Digital Operations Lead",
    description:
      "Professional portfolio of Usman Farooqi, Web Development & Digital Operations Lead. Managing web projects, WordPress delivery, team leadership, and AI-assisted operations.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#04050f] text-slate-100">{children}</body>
    </html>
  );
}
