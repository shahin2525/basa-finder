"use client";

import * as React from "react";
import {
  SquareTerminal,
  ShoppingCart,
  Settings,
  Package,
  Tag,
  Shield,
  Gift,
  User,
  Home,
  Building,
  ClipboardList,
  Plus,
  Eye,
  type LucideIcon,
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
import { usePathname } from "next/navigation";

type UserRole = "admin" | "tenant" | "landlord";

type SidebarSubItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
};

type SidebarItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: SidebarSubItem[];
};

type BaseNavItem = {
  title: string;
  url: string;
  isActive?: boolean;
  items?: Omit<SidebarSubItem, "icon">[];
};

type BaseNavItems = Record<UserRole, BaseNavItem[]>;

const baseNavItems: BaseNavItems = {
  admin: [
    {
      title: "Admin Dashboard",
      url: "/dashboard/admin",
      items: [
        { title: "Manage-Users", url: "/dashboard/admin/manage-users" },
        {
          title: "Manage-Listings",
          url: "/dashboard/admin/manage-rental-listings",
        },
        {
          title: "profile",
          url: "/profile",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      items: [
        { title: "Update-Profile", url: "/dashboard/admin/profileUpdate" },
        { title: "Change-Password", url: "/dashboard/admin/change-password" },
      ],
    },
  ],
  tenant: [
    {
      title: "Tenant Dashboard",
      url: "/dashboard/tenant",
      items: [
        { title: "Mange-Request", url: "/dashboard/tenant/requests" },
        { title: "Profile", url: "/profile" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      items: [
        { title: "Update-Profile", url: "/dashboard/tenant/profile" },
        { title: "Change Password", url: "/dashboard/tenant/change-password" },
      ],
    },
  ],
  landlord: [
    {
      title: "Landlord Dashboard",
      url: "/dashboard/landlord",
      items: [
        // { title: "Add-Listings", url: "/dashboard/landlord/create-listing" },
        {
          title: "Manage-Rental-House",
          url: "/dashboard/landlord/all-listing",
        },
        {
          title: "Manage-Rental-Request",
          url: "/dashboard/landlord/view-rental-listings",
        },
        {
          title: "Profile",
          url: "/profile",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      items: [
        { title: "Update-Profile", url: "/dashboard/landlord/profile" },
        {
          title: "Change Password",
          url: "/dashboard/landlord/change-password",
        },
      ],
    },
  ],
};

const getIcon = (title: string, role?: UserRole): LucideIcon => {
  const exactMatches: Record<string, LucideIcon> = {
    "Admin Dashboard": SquareTerminal,
    "Tenant Dashboard": Home,
    Dashboard: Building,
    Shop: ShoppingCart,
    Products: Package,
    Categories: Tag,
    Brands: Shield,
    Coupons: Gift,
    Profile: User,
    Settings: Settings,
    "Admin Settings": Settings,
    "Property Settings": Settings,
    "Create-Rental-Request": ClipboardList,
    "View-All-Rental": Eye,
    "Admin-Activity": ShoppingCart,
    "Tenant-Activity": Home,
  };

  if (exactMatches[title]) {
    return exactMatches[title];
  }

  const partialMatches: [string, LucideIcon][] = [
    ["Admin", Settings],
    ["Tenant", Home],
    ["Activity", ShoppingCart],
    ["Rental", ClipboardList],
    ["Request", Plus],
    ["Create", Plus],
    ["View", Eye],
    ["Profile", User],
    ["Setting", Settings],
  ];

  for (const [keyword, icon] of partialMatches) {
    if (title.includes(keyword)) {
      return icon;
    }
  }

  switch (role) {
    case "admin":
      return Settings;
    case "tenant":
      return Home;
    case "landlord":
      return Building;
    default:
      return Settings;
  }
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const pathname = usePathname();

  const getNavItems = (): SidebarItem[] => {
    if (!user?.role) return [];

    const isValidRole = (role: string): role is UserRole => {
      return Object.keys(baseNavItems).includes(role);
    };

    if (!isValidRole(user.role)) return [];

    const items = baseNavItems[user.role];

    return items.map((item) => ({
      ...item,
      icon: getIcon(item.title, user.role as UserRole),
      isActive: pathname === item.url || pathname.startsWith(item.url + "/"),
      items: item.items?.map((subItem) => ({
        ...subItem,
        icon: getIcon(subItem.title, user.role as UserRole),
        isActive:
          pathname === subItem.url || pathname.startsWith(subItem.url + "/"),
      })),
    }));
  };

  const navItems = getNavItems();

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
                    priority
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
