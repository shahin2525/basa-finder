// "use client";

// import * as React from "react";
// import { Bot, Settings, SquareTerminal } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import { NavMain } from "./nav-main";
// import { NavUser } from "./nav-user";
// import Link from "next/link";
// import Logo from "@/assets/svgs/logo.png";
// import { useUser } from "@/context/UserContext";
// import Image from "next/image";
// type SidebarItem = {
//   title: string;
//   url: string;
//   icon: React.ComponentType<{ className?: string }>;
//   isActive?: boolean;
//   items?: {
//     title: string;
//     url: string;
//   }[];
// };

// type SidebarData = {
//   navMain: SidebarItem[];
// };

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   const { user } = useUser();
//   let data = {};
//   if (user?.role === "admin") {
//     data = {
//       navMain: [
//         {
//           title: "Dashboard",
//           url: `/${user?.role}/dashboard`,
//           icon: SquareTerminal,
//           isActive: true,
//         },
//         {
//           title: "Shop",
//           url: `/${user?.role}/shop/products`,
//           icon: Bot,
//           items: [
//             {
//               title: "Manage Products",
//               url: `/${user?.role}/shop/products`,
//             },
//             {
//               title: "Manage Categories",
//               url: `/${user?.role}/shop/category`,
//             },
//             {
//               title: "Manage Brands",
//               url: `/${user?.role}/shop/brand`,
//             },
//             {
//               title: "Manage Coupon",
//               url: `/${user?.role}/shop/manage-coupon`,
//             },
//           ],
//         },
//         {
//           title: "Settings",
//           url: "#",
//           icon: Settings,
//           items: [
//             {
//               title: "Profile",
//               url: `/${user?.role}/profile`,
//             },
//           ],
//         },
//       ],
//     };
//   } else if (user?.role === "tenant") {
//     data = {
//       navMain: [
//         {
//           title: "Dashboard",
//           url: `/${user?.role}/dashboard`,
//           icon: SquareTerminal,
//           isActive: true,
//         },
//         {
//           title: "Shop",
//           url: `/${user?.role}/shop/products`,
//           icon: Bot,
//           items: [
//             {
//               title: "Manage Products",
//               url: `/${user?.role}/shop/products`,
//             },
//             {
//               title: "Manage Categories",
//               url: `/${user?.role}/shop/category`,
//             },
//             {
//               title: "Manage Brands",
//               url: `/${user?.role}/shop/brand`,
//             },
//             {
//               title: "Manage Coupon",
//               url: `/${user?.role}/shop/manage-coupon`,
//             },
//           ],
//         },
//         {
//           title: "Settings",
//           url: "#",
//           icon: Settings,
//           items: [
//             {
//               title: "Profile",
//               url: `/${user?.role}/profile`,
//             },
//           ],
//         },
//       ],
//     };
//   } else if (user?.role === "landlord") {
//     data = {
//       navMain: [
//         {
//           title: "Dashboard",
//           url: `/${user?.role}/dashboard`,
//           icon: SquareTerminal,
//           isActive: true,
//         },
//         {
//           title: "Shop",
//           url: `/${user?.role}/shop/products`,
//           icon: Bot,
//           items: [
//             {
//               title: "Manage Products",
//               url: `/${user?.role}/shop/products`,
//             },
//             {
//               title: "Manage Categories",
//               url: `/${user?.role}/shop/category`,
//             },
//             {
//               title: "Manage Brands",
//               url: `/${user?.role}/shop/brand`,
//             },
//             {
//               title: "Manage Coupon",
//               url: `/${user?.role}/shop/manage-coupon`,
//             },
//           ],
//         },
//         {
//           title: "Settings",
//           url: "#",
//           icon: Settings,
//           items: [
//             {
//               title: "Profile",
//               url: `/${user?.role}/profile`,
//             },
//           ],
//         },
//       ],
//     };
//   }

//   return (
//     <Sidebar collapsible="icon" {...props}>
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton size="lg" asChild>
//               <Link href="/">
//                 <div className="flex items-center justify-center">
//                   <Image
//                     src={Logo}
//                     alt="App Logo"
//                     width={70}
//                     height={70}
//                     className="object-contain"
//                   />
//                 </div>
//                 <div className="grid flex-1 text-left text-sm leading-tight">
//                   <h2 className="font-bold text-xl">BasaFinder</h2>
//                 </div>
//               </Link>
//               {/* <Link href="/">
//                 <div className="flex items-center justify-center">
//                   <Image
//                     src={Logo}
//                     alt="App Logo"
//                     width={70}
//                     height={70}
//                     className="object-contain"
//                   />
//                 </div>
//               </Link> */}
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>
//       <SidebarContent>
//         <NavMain items={data.navMain} />
//       </SidebarContent>
//       <SidebarFooter>
//         <NavUser />
//       </SidebarFooter>
//     </Sidebar>
//   );
// }
"use client";

import * as React from "react";
import {
  Bot,
  Settings,
  SquareTerminal,
  Users,
  Home,
  ClipboardList,
  ShoppingCart,
  Building,
  Cog,
  LucideIcon, // Import LucideIcon type
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import Logo from "@/assets/svgs/logo.png";
import { useUser } from "@/context/UserContext";
import Image from "next/image";

// Use LucideIcon for the icon type
type SidebarItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  // Dynamic title generator
  const getTitle = (baseTitle: string) => {
    switch (user?.role) {
      case "admin":
        return `${baseTitle} (Admin)`;
      case "tenant":
        return `${baseTitle} (Tenant)`;
      case "landlord":
        return `${baseTitle} (Landlord)`;
      default:
        return baseTitle;
    }
  };

  // Dynamic submenu title generator
  const getSubTitle = (baseTitle: string) => {
    switch (user?.role) {
      case "admin":
        return `Admin ${baseTitle}`;
      case "tenant":
        return `My ${baseTitle}`;
      case "landlord":
        return `Property ${baseTitle}`;
      default:
        return baseTitle;
    }
  };

  // Get role-specific icon - must return LucideIcon
  const getIcon = (defaultIcon: LucideIcon): LucideIcon => {
    switch (user?.role) {
      case "admin":
        return Users;
      case "tenant":
        return ClipboardList;
      case "landlord":
        return Building;
      default:
        return defaultIcon;
    }
  };

  const navItems: SidebarItem[] = [
    {
      title: getTitle("Dashboard"),
      url: `/${user?.role}/dashboard`,
      icon: getIcon(SquareTerminal),
      isActive: true,
    },
    {
      title: getTitle("Shop"),
      url: `/${user?.role}/shop/products`,
      icon: getIcon(ShoppingCart),
      items: [
        {
          title: getSubTitle("Products"),
          url: `/${user?.role}/shop/products`,
        },
        {
          title: getSubTitle("Categories"),
          url: `/${user?.role}/shop/category`,
        },
        {
          title: getSubTitle("Brands"),
          url: `/${user?.role}/shop/brand`,
        },
        {
          title: getSubTitle("Coupons"),
          url: `/${user?.role}/shop/manage-coupon`,
        },
      ],
    },
    {
      title: getTitle("Settings"),
      url: "#",
      icon: getIcon(Cog),
      items: [
        {
          title: getSubTitle("Profile"),
          url: `/${user?.role}/profile`,
        },
        ...(user?.role === "admin"
          ? [
              {
                title: "Admin Settings",
                url: `/${user.role}/admin-settings`,
              },
            ]
          : []),
      ],
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center">
                  <Image
                    src={Logo}
                    alt="App Logo"
                    width={70}
                    height={70}
                    className="object-contain"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h2 className="font-bold text-xl">
                    {user?.role
                      ? `${
                          user.role.charAt(0).toUpperCase() + user.role.slice(1)
                        } Portal`
                      : "BasaFinder"}
                  </h2>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
