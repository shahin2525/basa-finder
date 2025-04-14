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
    },
    {
      title: "Admin-Activity",
      url: "/admin/shop/products",
      items: [
        { title: "Products", url: "/admin/shop/products" },
        { title: "Categories", url: "/admin/shop/category" },
        { title: "Brands", url: "/admin/shop/brand" },
        { title: "Coupons", url: "/admin/shop/manage-coupon" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      items: [
        { title: "Profile", url: "/admin/profile" },
        { title: "Admin Settings", url: "/admin/admin-settings" },
      ],
    },
  ],
  tenant: [
    {
      title: "Tenant Dashboard",
      url: "/dashboard/tenant",
    },
    {
      title: "Tenant-Activity",
      url: "/tenant/shop/products",
      items: [
        {
          title: "Create-Rental-Request",
          url: "/dashboard/tenant/create-rental-request",
        },
        { title: "All-Rental-Requests", url: "/dashboard/tenant/requests" },

        // { title: "My Coupons", url: "/tenant/shop/manage-coupon" },
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
      title: "Dashboard",
      url: "/dashboard/landlord",
    },
    {
      title: "Listings", // Changed from "Shop"
      url: "/landlord/shop/products",
      items: [
        { title: "Create-Listings", url: "/dashboard/landlord/create-listing" },
        {
          title: "View-All-Listings",
          url: "/dashboard/landlord/view-all-listings",
        },
        {
          title: "View-Rental-Listings",
          url: "/dashboard/landlord/view-rental-listings",
        },
        { title: "Brands", url: "/landlord/shop/brand" },
        { title: "Property Coupons", url: "/landlord/shop/manage-coupon" },
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
