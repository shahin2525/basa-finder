import Link from "next/link";

import { Home, Contact, Hand, ReceiptCent } from "lucide-react";
import { Button } from "../ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F5F5F5] border-t">
      <div className="max-w-screen-xl mx-auto px-5 w-full">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-muted-foreground">Email:</span>
                <Link
                  href="mailto:contact@example.com"
                  className="hover:underline"
                >
                  contact@example.com
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-muted-foreground">Phone:</span>
                <Link href="tel:+1234567890" className="hover:underline">
                  +1 (234) 567-890
                </Link>
              </li>
            </ul>

            {/* Social Media Links */}
            <div className="flex space-x-4 pt-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <Home className="h-4 w-4" />
                  <span className="sr-only">Home</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/contact-us">
                  <Contact className="h-4 w-4" />
                  <span className="sr-only">Contact Us</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/about-us">
                  <Hand className="h-4 w-4" />
                  <span className="sr-only">About Us</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/all-rental-listings">
                  <ReceiptCent className="h-4 w-4" />
                  <span className="sr-only">All Rental Listing</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Additional Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:underline hover:text-foreground"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/rent-calculator"
                  className="text-muted-foreground hover:underline hover:text-foreground"
                >
                  Rent Calculation Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/all-rental-listings"
                  className="text-muted-foreground hover:underline hover:text-foreground"
                >
                  All Rental Listing
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="text-muted-foreground hover:underline hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter or Additional Content */}
          {/* <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-muted-foreground text-sm">
              Subscribe to our newsletter for the latest updates.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 space-x-2 gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <Button type="submit" variant="default" size="sm">
                Subscribe
              </Button>
            </div>
          </div> */}
        </div>

        {/* Copyright Section */}
        <div className="border-t py-6 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Basa Finder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
