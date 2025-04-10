"use client";

import * as React from "react";
import { Bot, Settings, SquareTerminal } from "lucide-react";

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  let data = {};
  if (user?.role === "admin") {
    data = {
      navMain: [
        {
          title: "Dashboard",
          url: `/${user?.role}/dashboard`,
          icon: SquareTerminal,
          isActive: true,
        },
        {
          title: "Shop",
          url: `/${user?.role}/shop/products`,
          icon: Bot,
          items: [
            {
              title: "Manage Products",
              url: `/${user?.role}/shop/products`,
            },
            {
              title: "Manage Categories",
              url: `/${user?.role}/shop/category`,
            },
            {
              title: "Manage Brands",
              url: `/${user?.role}/shop/brand`,
            },
            {
              title: "Manage Coupon",
              url: `/${user?.role}/shop/manage-coupon`,
            },
          ],
        },
        {
          title: "Settings",
          url: "#",
          icon: Settings,
          items: [
            {
              title: "Profile",
              url: `/${user?.role}/profile`,
            },
          ],
        },
      ],
    };
  } else if (user?.role === "tenant") {
    data = {
      navMain: [
        {
          title: "Dashboard",
          url: `/${user?.role}/dashboard`,
          icon: SquareTerminal,
          isActive: true,
        },
        {
          title: "Shop",
          url: `/${user?.role}/shop/products`,
          icon: Bot,
          items: [
            {
              title: "Manage Products",
              url: `/${user?.role}/shop/products`,
            },
            {
              title: "Manage Categories",
              url: `/${user?.role}/shop/category`,
            },
            {
              title: "Manage Brands",
              url: `/${user?.role}/shop/brand`,
            },
            {
              title: "Manage Coupon",
              url: `/${user?.role}/shop/manage-coupon`,
            },
          ],
        },
        {
          title: "Settings",
          url: "#",
          icon: Settings,
          items: [
            {
              title: "Profile",
              url: `/${user?.role}/profile`,
            },
          ],
        },
      ],
    };
  } else if (user?.role === "landlord") {
    data = {
      navMain: [
        {
          title: "Dashboard",
          url: `/${user?.role}/dashboard`,
          icon: SquareTerminal,
          isActive: true,
        },
        {
          title: "Shop",
          url: `/${user?.role}/shop/products`,
          icon: Bot,
          items: [
            {
              title: "Manage Products",
              url: `/${user?.role}/shop/products`,
            },
            {
              title: "Manage Categories",
              url: `/${user?.role}/shop/category`,
            },
            {
              title: "Manage Brands",
              url: `/${user?.role}/shop/brand`,
            },
            {
              title: "Manage Coupon",
              url: `/${user?.role}/shop/manage-coupon`,
            },
          ],
        },
        {
          title: "Settings",
          url: "#",
          icon: Settings,
          items: [
            {
              title: "Profile",
              url: `/${user?.role}/profile`,
            },
          ],
        },
      ],
    };
  }

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
                  <h2 className="font-bold text-xl">BasaFinder</h2>
                </div>
              </Link>
              {/* <Link href="/">
                <div className="flex items-center justify-center">
                  <Image
                    src={Logo}
                    alt="App Logo"
                    width={70}
                    height={70}
                    className="object-contain"
                  />
                </div>
              </Link> */}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
