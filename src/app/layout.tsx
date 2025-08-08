import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Theme } from "@radix-ui/themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Job Finder - Find Your Perfect Job",
  description: "Search and find the perfect job with our advanced filtering system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <Theme 
            appearance="dark"
            accentColor="blue"
            grayColor="slate"
            radius="medium"
            scaling="100%"
            className="w-full min-h-screen bg-gray-900"
          >
          {children}
          </Theme>
      </body>
    </html>
  );
}
