import { Download } from "lucide-react"
import { getTranslations } from "@/lib/messages"

import { Button } from "@/components/ui/button"

const PDFViewer = async ({ src }: { src: string }) => {
  const t = await getTranslations()

  return (
    <div className="space-y-3 rounded-xl border p-4">
      <iframe
        title={src}
        src={src}
        className="h-[420px] w-full rounded-lg border bg-muted"
      />
      <Button asChild variant="outline">
        <a href={src} download>
          <Download className="size-4" />
          {t("mdx.downloadPdf")}
        </a>
      </Button>
    </div>
  )
}

export { PDFViewer }
