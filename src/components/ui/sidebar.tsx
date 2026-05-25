"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const SidebarContext = React.createContext<{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

const useSidebar = () => {
  const context = React.useContext(SidebarContext)

  if (!context) {
    throw new Error("Sidebar components must be used within SidebarProvider.")
  }

  return context
}

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false)

  return <SidebarContext.Provider value={{ open, setOpen }}>{children}</SidebarContext.Provider>
}

const SidebarInset = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("min-w-0 flex-1", className)} {...props} />
)

const SidebarTrigger = ({ className, ...props }: React.ComponentProps<typeof Button>) => {
  const { open, setOpen } = useSidebar()

  return (
    <Button
      aria-label="Deschide meniul"
      className={cn("md:hidden", className)}
      size="icon"
      type="button"
      variant="outline"
      onClick={() => setOpen((current) => !current)}
      {...props}
    >
      <Menu className="size-4" />
      <span className="sr-only">{open ? "Închide meniul" : "Deschide meniul"}</span>
    </Button>
  )
}

const Sidebar = ({ className, ...props }: React.ComponentProps<"aside">) => {
  const { open } = useSidebar()

  return (
    <CollapsiblePrimitive.Root open={open} className="contents">
      <aside
        className={cn(
          "hidden w-full max-w-xs shrink-0 border-r bg-sidebar text-sidebar-foreground md:block",
          "md:sticky md:top-0 md:h-svh",
          className,
        )}
        {...props}
      />
      <CollapsiblePrimitive.Content forceMount className="md:hidden data-[state=closed]:hidden">
        <aside
          className={cn(
            "fixed inset-x-0 top-16 z-40 border-b border-border bg-sidebar text-sidebar-foreground",
            className,
          )}
          {...props}
        />
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  )
}

const SidebarHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("border-b p-6", className)} {...props} />
)

const SidebarContent = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("space-y-6 p-4", className)} {...props} />
)

export { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarProvider, SidebarTrigger }
