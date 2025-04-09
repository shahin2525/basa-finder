// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { Button } from "../ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import { Menu } from "lucide-react";
// import { useUser } from "@/context/UserContext";
// import { logout } from "@/services/authServices";
// import { protectedRoutes } from "@/constants";

// type NavLink = {
//   name: string;
//   href: string;
//   onClick?: () => void;
// };

// export default function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const pathname = usePathname();
//   const { user, setIsLoading } = useUser();
//   const router = useRouter();

//   const handleLogOut = () => {
//     logout();
//     setIsLoading(true);
//     if (protectedRoutes.some((route) => pathname.match(route))) {
//       router.push("/");
//     }
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Common links for all users (centered links)
//   const commonLinks: NavLink[] = [
//     { name: "Home", href: "/" },
//     { name: "All Listings", href: "/listings" },
//     { name: "About Us", href: "/about" },
//     { name: "Contact Us", href: "/contact" },
//   ];

//   // Links for authenticated users (right side links)
//   const authLinks: NavLink[] = user?.email
//     ? [
//         { name: "Dashboard", href: `/dashboard/${user.role}` },
//         { name: "My Profile", href: "/profile" },
//         { name: "Logout", href: "#", onClick: handleLogOut },
//       ]
//     : [{ name: "Login", href: "/login" }];

//   return (
//     // <header
//     //   className={`fixed top-0 w-full z-50 transition-all  ${
//     //     isScrolled
//     //       ? "bg-background/80 backdrop-blur-sm shadow-sm"
//     //       : "bg-background"
//     //   }`}
//     // >
//     //   <div className="max-w-screen-xl mx-auto px-4 py-3">
//     //     <div className="flex items-center justify-between">
//     //       {/* Logo on the left */}
//     //       <div className="flex-shrink-0">
//     //         <Link href="/" className="flex items-center gap-2">
//     //           <span className="text-xl font-bold">YourLogo</span>
//     //         </Link>
//     //       </div>

//     //       {/* Centered navigation links (hidden on mobile) */}
//     //       <nav className="hidden md:flex items-center justify-center flex-1">
//     //         <div className="flex space-x-6">
//     //           {commonLinks.map((link) => (
//     //             <Link
//     //               key={link.href}
//     //               href={link.href}
//     //               className={`text-sm font-medium transition-colors hover:text-primary ${
//     //                 pathname === link.href
//     //                   ? "text-primary"
//     //                   : "text-foreground/60"
//     //               }`}
//     //             >
//     //               {link.name}
//     //             </Link>
//     //           ))}
//     //         </div>
//     //       </nav>

//     //       {/* Right side auth links */}
//     //       <div className="flex items-center space-x-4">
//     //         {/* Desktop auth links */}
//     //         <div className="hidden md:flex items-center space-x-4">
//     //           {authLinks.map((link) => (
//     //             <Link
//     //               key={link.href}
//     //               href={link.href}
//     //               onClick={(e) => {
//     //                 if (link.onClick) {
//     //                   e.preventDefault();
//     //                   link.onClick();
//     //                 }
//     //               }}
//     //               className={`text-sm font-medium transition-colors hover:text-primary ${
//     //                 pathname === link.href
//     //                   ? "text-primary"
//     //                   : "text-foreground/60"
//     //               }`}
//     //             >
//     //               {link.name}
//     //             </Link>
//     //           ))}
//     //         </div>

//     //         {/* Mobile menu button */}
//     //         <div className="md:hidden">
//     //           <DropdownMenu onOpenChange={setIsMenuOpen}>
//     //             <DropdownMenuTrigger asChild>
//     //               <Button variant="ghost" size="icon">
//     //                 <Menu className="h-5 w-5" />
//     //                 <span className="sr-only">Toggle menu</span>
//     //               </Button>
//     //             </DropdownMenuTrigger>
//     //             <DropdownMenuContent
//     //               align="end"
//     //               className="w-56 mt-2 shadow-lg rounded-md bg-background"
//     //             >
//     //               {/* Combine all links for mobile menu */}
//     //               {[...commonLinks, ...authLinks].map((link) => (
//     //                 <DropdownMenuItem key={link.href} asChild>
//     //                   <Link
//     //                     href={link.href}
//     //                     onClick={(e) => {
//     //                       if (link.onClick) {
//     //                         e.preventDefault();
//     //                         link.onClick();
//     //                       }
//     //                     }}
//     //                     className={`w-full ${
//     //                       pathname === link.href ? "bg-accent" : ""
//     //                     }`}
//     //                   >
//     //                     {link.name}
//     //                   </Link>
//     //                 </DropdownMenuItem>
//     //               ))}
//     //             </DropdownMenuContent>
//     //           </DropdownMenu>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </header>

//     <header
//       className={`w-full transition-all ${
//         isScrolled
//           ? "bg-background/80 backdrop-blur-sm shadow-sm"
//           : "bg-background"
//       }`}
//     >
//       <div className="flex items-center justify-between py-3">
//         {/* Logo - Left */}
//         <div className="flex-shrink-0 pl-2">
//           <Link href="/" className="flex items-center gap-2">
//             <span className="text-xl font-bold">YourLogo</span>
//           </Link>
//         </div>

//         {/* Center nav - Hidden on mobile */}
//         <nav className="hidden md:flex items-center justify-center flex-1">
//           <div className="flex space-x-6">
//             {commonLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`text-sm font-medium transition-colors hover:text-primary ${
//                   pathname === link.href ? "text-primary" : "text-foreground/60"
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>
//         </nav>

//         {/* Right side auth links */}
//         <div className="flex items-center space-x-4">
//           {/* Desktop links */}
//           <div className="hidden md:flex items-center space-x-4">
//             {authLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 onClick={(e) => {
//                   if (link.onClick) {
//                     e.preventDefault();
//                     link.onClick();
//                   }
//                 }}
//                 className={`text-sm font-medium transition-colors hover:text-primary ${
//                   pathname === link.href ? "text-primary" : "text-foreground/60"
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             {/* ... your existing mobile menu code ... */}
//             <DropdownMenu onOpenChange={setIsMenuOpen}>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="icon">
//                   <Menu className="h-5 w-5" />
//                   <span className="sr-only">Toggle menu</span>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent
//                 align="end"
//                 className="w-56 mt-2 shadow-lg rounded-md bg-background"
//               >
//                 {/* Combine all links for mobile menu */}
//                 {[...commonLinks, ...authLinks].map((link) => (
//                   <DropdownMenuItem key={link.href} asChild>
//                     <Link
//                       href={link.href}
//                       onClick={(e) => {
//                         if (link.onClick) {
//                           e.preventDefault();
//                           link.onClick();
//                         }
//                       }}
//                       className={`w-full ${
//                         pathname === link.href ? "bg-accent" : ""
//                       }`}
//                     >
//                       {link.name}
//                     </Link>
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
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
import Logo from "../../assets/svgs/logo.png";
import Image from "next/image";
type NavLink = {
  name: string;
  href: string;
  onClick?: () => void;
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, setIsLoading } = useUser();
  const router = useRouter();

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Common links for all users (centered links)
  const commonLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "All Listings", href: "/listings" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  // Links for authenticated users (right side links)
  const authLinks: NavLink[] = user?.email
    ? [
        { name: "Dashboard", href: `/dashboard/${user.role}` },
        // Remove "My Profile" from main links since we'll use the avatar dropdown
      ]
    : [{ name: "Login", href: "/login" }];

  return (
    <header
      className={`w-full transition-all ${
        isScrolled
          ? "bg-background/80 backdrop-blur-sm shadow-sm"
          : "bg-background"
      }`}
    >
      <div className="flex items-center justify-between py-3">
        {/* Logo - Left */}
        <div className="flex-shrink-0 pl-2">
          <Link href="/" className="flex items-center gap-2">
            {/* <span className="text-xl font-bold">Logo</span> */}

            <Image
              src={Logo}
              alt="basaFinder Logo"
              width={70} // 👈 Adjust width/height as needed
              height={70}
              className="object-contain" // 👈 Ensures proper scaling
            />
          </Link>
        </div>

        {/* Center nav - Hidden on mobile */}
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

        {/* Right side auth links */}
        <div className="flex items-center space-x-4 pr-2">
          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-4">
            {authLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-foreground/60"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Avatar dropdown for logged in users */}
            {user?.email && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
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
                        {user?.role || "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
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
                {/* Combine all links for mobile menu */}
                {[...commonLinks, ...authLinks].map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        if (link.onClick) {
                          e.preventDefault();
                          link.onClick();
                        }
                      }}
                      className={`w-full ${
                        pathname === link.href ? "bg-accent" : ""
                      }`}
                    >
                      {link.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
                {/* Add profile link for mobile */}
                {user?.email && (
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
      </div>
    </header>
  );
}
