import { SiteShell } from "@/components/layout/site-shell"
import { ThemeProvider } from "@/components/theme-provider"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SiteShell>{children}</SiteShell>
    </ThemeProvider>
  )
}
