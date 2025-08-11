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
  title: "JobFinder - Find Your Dream Career",
  description: "Discover amazing opportunities with our modern job search platform",
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
            accentColor="gray"
            grayColor="gray"
            radius="large"
            scaling="110%"
            className="w-full min-h-screen bg-black"
          >
          {children}
          </Theme>
      </body>
    </html>
  );
}
