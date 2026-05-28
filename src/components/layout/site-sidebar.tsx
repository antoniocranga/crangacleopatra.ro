"use client"

import { ChevronRight } from "lucide-react"
import { useTranslations } from "@/lib/messages"

import { Link, usePathname } from "@/lib/navigation"
import { educationSections, getLevelsByGroup, siteIdentity } from "@/lib/education"
import { cn } from "@/lib/utils"

const SiteSidebar = () => {
  const t = useTranslations()
  const pathname = usePathname()
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-6">
        <div>
          <p className="font-semibold tracking-tight">{siteIdentity.title}</p>
          <p className="text-sm text-muted-foreground">{t("layout.sidebarDescription")}</p>
        </div>
      </div>
      <div className="flex-1 space-y-6 overflow-y-auto p-4">
        <div className="space-y-1">
          {[
            { href: "/", label: t("nav.home") },
            { href: "/resurse", label: t("nav.resources") },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === item.href && "bg-accent text-accent-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
        {educationSections.map((section) => {
          const levels = getLevelsByGroup(section.id)

          return (
            <div key={section.id} className="space-y-2">
              <Link
                href={section.href}
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === section.href && "bg-accent text-accent-foreground",
                )}
              >
                <span>{section.title}</span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
              <div className="space-y-1 pl-3">
                {levels.map((level) => (
                  <Link
                    key={level.href}
                    href={level.href}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                      pathname === level.href && "bg-accent text-accent-foreground",
                    )}
                  >
                    {level.title}
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { SiteSidebar }
