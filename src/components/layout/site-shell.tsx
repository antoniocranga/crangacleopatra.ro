import { Sidebar, SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { SiteSidebar } from "@/components/layout/site-sidebar"
import { Link } from "@/lib/navigation"
import { SiteFooter } from "@/components/layout/site-footer"

const SiteShell = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <div className="flex min-h-svh">
      <Sidebar className="print:hidden">
        <SiteSidebar />
      </Sidebar>
      <SidebarInset className="print:m-0 print:p-0 print:w-full flex flex-col">
        <header className="shrink-0 sticky top-0 z-30 border-b bg-background/90 backdrop-blur print:hidden">
          <div className="content-shell flex h-16 items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <Link href="/" className="hover:opacity-80 transition-opacity">
                <p className="text-sm font-semibold">crangacleopatra.ro</p>
                <p className="text-xs text-muted-foreground">Matematică pe înțelesul tuturor</p>
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </header>
        <main className="content-shell py-8 flex-1 w-full">{children}</main>
        <SiteFooter />
      </SidebarInset>
    </div>
  </SidebarProvider>
)

export { SiteShell }
