"use client"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const titleMap: Record<string, string> = {
  "": "Home",
  "application": "Building Your Application",
  "data-fetching": "Data Fetching",
  // tambah mapping lain jika perlu
}

export default function AutoBreadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((seg, idx) => {
          const href = "/" + segments.slice(0, idx + 1).join("/")
          const isLast = idx === segments.length - 1
          const title = titleMap[seg] || seg.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())

          return (
            <span key={href} className="flex items-center">
              <BreadcrumbItem className={idx === 0 ? "hidden md:block" : ""}>
                {isLast ? (
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className={idx === 0 ? "hidden md:block" : ""} />}
            </span>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}