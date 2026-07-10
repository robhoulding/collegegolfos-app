import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: {
    default: "CollegeGolfOS — College coach recruiting hub",
    template: "%s · CollegeGolfOS",
  },
  description:
    "The college coach side of the GolfCoachOS ecosystem — transparent player views, verified development data, and recruiting workflows.",
  metadataBase: new URL("https://collegegolfos.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
