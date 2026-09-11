"use client"

import {
  BookOpen,
  Bot,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/stores/auth"

// This is sample data.
const data = {
  // user: {
  //   name: "Kyoko Kinata",
  //   email: "KyokoKinata@example.com",
  //   avatar: "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/386094032/original/ad390babdfc1e9440f2c71370f70157b66d45c7f/draw-pfp-avatar-icon-album-cover-portrait-of-your-oc-vtuber-anime-character.png",
  // },
  navMain: [
    {
      title: "Anime",
      url: "#",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Add",
          url: "#",
        },
        {
          title: "...",
          url: "#",
        },
        {
          title: "......",
          url: "#",
        },
      ],
    },
    {
      title: "Channel",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Add",
          url: "#",
        },
        {
          title: "...",
          url: "#",
        },
        {
          title: "......",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Batch",
          url: "#",
        },
        {
          title: "Genres",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthStore((state) => state.user);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <a href="#" className="flex gap-3 items-center">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col ">
                  <span className="font-bold">Douji Shichou Pedia</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
