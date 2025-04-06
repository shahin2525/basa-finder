"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Menu } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/authServices";
import { protectedRoutes } from "@/constants";
// import { useSession } from "next-auth/react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  // const { data: session, status } = useSession();

  //
  const { user, setIsLoading } = useUser();

  const router = useRouter();

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };
  //

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Listings", href: "/listings" },
    { name: "About Us", href: "/about" },
    ...(status === "authenticated"
      ? [
          { name: "Dashboard", href: "/dashboard" },
          { name: "My Profile", href: "/profile" },
        ]
      : []),
    ...(status !== "authenticated" ? [{ name: "Login", href: "/login" }] : []),
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all ${
        isScrolled
          ? "bg-background/80 backdrop-blur-sm shadow-sm"
          : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo on the left */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">YourLogo</span>
        </Link>

        {/* Desktop Navigation - Right side */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href ? "text-primary" : "text-foreground/60"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <DropdownMenu onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 mt-2 shadow-lg rounded-md bg-background"
            >
              {navLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link
                    href={link.href}
                    className={`w-full ${
                      pathname === link.href ? "bg-accent" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
