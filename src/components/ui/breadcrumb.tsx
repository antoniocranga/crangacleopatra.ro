import * as React from "react"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

const Breadcrumb = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav aria-label="breadcrumb" className={cn("text-sm text-muted-foreground", className)} {...props} />
)

const BreadcrumbList = ({ className, ...props }: React.ComponentProps<"ol">) => (
  <ol className={cn("flex flex-wrap items-center gap-2", className)} {...props} />
)

const BreadcrumbItem = ({ className, ...props }: React.ComponentProps<"li">) => (
  <li className={cn("inline-flex items-center gap-2", className)} {...props} />
)

const BreadcrumbPage = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span className={cn("font-medium text-foreground", className)} {...props} />
)

const BreadcrumbSeparator = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span className={cn("text-muted-foreground", className)} {...props}>
    <ChevronRight className="size-4" />
  </span>
)

export { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator }
