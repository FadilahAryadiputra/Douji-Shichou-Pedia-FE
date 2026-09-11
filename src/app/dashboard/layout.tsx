"use client";

import { AppBreadcrumb } from "@/components/app-breadcrumb";
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex justify-between px-4 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <AppBreadcrumb />
          </div>
          <div className="flex items-center justify-center">
            <Button variant="outline" size="icon" onClick={toggleTheme}>
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </header>
        { children }
      </SidebarInset>
    </SidebarProvider>
  )
}
