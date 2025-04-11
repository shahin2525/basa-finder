// "use client";

// import { ChevronRight, type LucideIcon } from "lucide-react";

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   SidebarGroup,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "@/components/ui/sidebar";

// export function NavMain({
//   items,
// }: {
//   items: {
//     title: string;
//     url: string;
//     icon?: LucideIcon;
//     isActive?: boolean;
//     items?: {
//       title: string;
//       url: string;
//     }[];
//   }[];
// }) {
//   return (
//     <SidebarGroup>
//       <SidebarMenu>
//         {items.map((item) => (
//           <Collapsible
//             key={item.title}
//             asChild
//             defaultOpen={item.isActive}
//             className="group/collapsible"
//           >
//             <SidebarMenuItem>
//               <CollapsibleTrigger asChild>
//                 <SidebarMenuButton tooltip={item.title}>
//                   {item.icon && <item.icon />}
//                   <span>{item.title}</span>
//                   <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                 </SidebarMenuButton>
//               </CollapsibleTrigger>
//               <CollapsibleContent>
//                 <SidebarMenuSub>
//                   {item.items?.map((subItem) => (
//                     <SidebarMenuSubItem key={subItem.title}>
//                       <SidebarMenuSubButton asChild>
//                         <a href={subItem.url}>
//                           <span>{subItem.title}</span>
//                         </a>
//                       </SidebarMenuSubButton>
//                     </SidebarMenuSubItem>
//                   ))}
//                 </SidebarMenuSub>
//               </CollapsibleContent>
//             </SidebarMenuItem>
//           </Collapsible>
//         ))}
//       </SidebarMenu>
//     </SidebarGroup>
//   );
// }
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
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

export function NavMain({ items }: { items: SidebarItem[] }) {
  return (
    <div className="flex flex-col space-y-1">
      {items.map((item) => (
        <div key={item.title}>
          <Link
            href={item.url}
            className={cn(
              "flex items-center p-2 rounded hover:bg-gray-100 transition-colors duration-200",
              item.isActive
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-700"
            )}
          >
            <item.icon
              className={cn(
                "h-5 w-5 mr-3",
                item.isActive ? "text-blue-600" : "text-gray-500"
              )}
            />
            <span>{item.title}</span>
          </Link>
          {item.items && (
            <div className="ml-8 mt-1 space-y-1">
              {item.items.map((subItem) => (
                <Link
                  key={subItem.title}
                  href={subItem.url}
                  className={cn(
                    "flex items-center p-2 rounded hover:bg-gray-100 transition-colors duration-200",
                    subItem.isActive
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700"
                  )}
                >
                  {subItem.icon && (
                    <subItem.icon
                      className={cn(
                        "h-4 w-4 mr-3",
                        subItem.isActive ? "text-blue-600" : "text-gray-500"
                      )}
                    />
                  )}
                  <span>{subItem.title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
