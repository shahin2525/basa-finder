import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";
import { Toaster } from "sonner";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "basa-finder",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster richColors position="top-center" />
          {/* Width container */}
          {/* <div className="max-w-screen-xl mx-auto px-5">
            <Navbar />
            {children}
            <Footer />
          </div> */}
          <div className="fixed top-0 left-0 right-0 z-50 bg-amber-200">
            <div className="max-w-screen-xl mx-auto px-5 w-full">
              <Navbar />
            </div>
          </div>

          {/* Main content with padding to account for fixed navbar */}
          <div className="max-w-screen-xl mx-auto px-5 pt-[72px] min-h-screen">
            {children}
            <Footer />
          </div>
        </body>
      </html>
    </Providers>
  );
}
