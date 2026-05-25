import { getTranslations } from "@/lib/messages"

export async function SiteFooter() {
  const t = await getTranslations()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background/90 py-6 md:py-0 print:hidden mt-auto">
      <div className="content-shell flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm leading-loose text-muted-foreground text-center md:text-left">
          &copy; {currentYear} {t("layout.footerCopyright")}
        </p>
      </div>
    </footer>
  )
}
