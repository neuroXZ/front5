"use client"

import * as React from "react"
import {
  MonitorCog,
  Command,
  Database,
  LayoutDashboard,
  BookMarked,
  Building,
  ChartColumn,
} from "lucide-react"

import { NavPlatform } from "@/components/nav/nav-platform"
import { NavStatistic } from "@/components/nav/nav-statistic"
import { NavSecondary } from "@/components/nav/nav-secondary"
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
  user: {
    name: "admin",
    email: "admin@sample.com",
    avatar: "/avatar1.png",
  },
  navPlatform: [
    {
      title: "Organization",
      url: "/admin/organization",
      icon: Building,
      items: [
        {
          title: "Unit Type",
          url: "/admin/unit-type",
        },
        {
          title: "Department",
          url: "/admin/department",
        },
        {
          title: "Job Profile",
          url: "/admin/position",
        },
        {
          title: "Employee",
          url: "/admin/staff",
        },
        
      ],
    },
    {
      title: "Database",
      url: "",
      icon: Database,
       items: [
        {
          title: "Competency",
          url: "/admin/competency",
        },
        {
          title: "Training",
          url: "/admin/training",
        },
        
      ],
    },
    {
      title: "Action",
      url: "",
      icon: MonitorCog,
      items: [
        {
          title: "Mapping",
          url: "/admin/position-competency",
        },
        {
          title: "Assessment",
          url: "/admin/assessment",
        },
        
      ],
    },
    
    
  ],
  navStatistic: [
    {
      title: "Stat",
      url: "#",
      icon: ChartColumn,
      items: [
        {
          title: "IDP",
          url: "/admin/idp",
        },
        {
          title: "Report & Analytics",
          url: "/admin/report-analytics",
        },
        
      ],
    },
  ],
  navSecondary: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Documentation",
      url: "/admin/documentation",
      icon: BookMarked,
    },
    
  ],
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Tna Pro</span>
                  <span className="truncate text-xs">Administrator</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary items={data.navSecondary} />
        <NavPlatform items={data.navPlatform} />
        <NavStatistic items={data.navStatistic} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
