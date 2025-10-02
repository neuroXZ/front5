"use client"

import * as React from "react"
import {
  User,
  FileText,
  Calendar,
  Award,
  Settings,
  LogOut,
  Home
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/staff/dashboard",
      icon: Home,
      isActive: true,
    },
    {
      title: "My Profile",
      url: "/staff/profile",
      icon: User,
    },
    {
      title: "My Assessments",
      url: "/staff/assessments",
      icon: FileText,
    },
    {
      title: "Training Schedule",
      url: "/staff/training",
      icon: Calendar,
    },
    {
      title: "Certifications",
      url: "/staff/certifications",
      icon: Award,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/staff/settings",
      icon: Settings,
    },
  ],
}

export function StaffSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/staff/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <User className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">TNA Pro</span>
                  <span className="truncate text-xs">Staff Portal</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser 
          user={{
            name: "Staff User",
            email: "staff@company.com",
            avatar: "/avatar1.png",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}