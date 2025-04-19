"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Menu, LogOut } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/authServices";
import { protectedRoutes } from "@/constants";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
// import Logo from "../../assets/svgs/logo.png";
import Logo from "@/assets/svgs/logo.png";
import Image from "next/image";
import { toast } from "sonner";

type NavLink = {
  name: string;
  href: string;
  onClick?: () => void;
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, refreshUser } = useUser();

  const handleLogOut = async () => {
    try {
      await logout();
      // Clear user context
      await refreshUser();
      toast.success("Logged out successfully");

      // Redirect if on protected route
      if (protectedRoutes.some((route) => pathname.match(route))) {
        router.push("/");
      }

      // Force a hard refresh to ensure all cookies are cleared
      window.location.href = "/";
    } catch (error) {
      toast.error("Failed to logout");
      console.error("Logout error:", error);
    }
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Common links for all users
  const commonLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "All Rental Listings", href: "/all-rental-listings" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  // Links for authenticated users
  const authLinks: NavLink[] = user
    ? [{ name: "Dashboard", href: `/dashboard/${user.role}` }]
    : [{ name: "Login", href: "/login" }];

  // Loading state
  if (isLoading) {
    return (
      <header className="w-full bg-background/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center justify-between py-3 px-4">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src={Logo}
                alt="App Logo"
                width={70}
                height={70}
                className="object-contain"
              />
            </Link>
          </div>
          <div className="animate-pulse bg-gray-200 h-8 w-24 rounded-md" />
        </div>
      </header>
    );
  }

  return (
    <header
      className={`w-full transition-all sticky top-0 z-50 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-sm shadow-sm"
          : "bg-background"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src={Logo}
              alt="App Logo"
              width={70}
              height={70}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation - Center */}
        <nav className="hidden md:flex items-center justify-center flex-1">
          <div className="flex space-x-6">
            {commonLinks.map((link) => (
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
          </div>
        </nav>

        {/* Desktop Navigation - Right */}
        <div className="hidden md:flex items-center space-x-4">
          {authLinks.map((link) => (
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

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                  aria-label="User menu"
                >
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage
                      src={user?.image || "https://github.com/shadcn.png"}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback>
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="
                  #"
                  >
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/${user?.role}`}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500 focus:text-red-500 cursor-pointer"
                  onClick={handleLogOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Mobile menu">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 mt-2 shadow-lg rounded-md bg-background"
            >
              {/* Common links */}
              {commonLinks.map((link) => (
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

              {/* Auth links */}
              {authLinks.map((link) => (
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

              {/* User profile for mobile */}
              {user && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="w-full">
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-500 focus:text-red-500 cursor-pointer"
                    onClick={handleLogOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
