import { AlertTriangle } from "lucide-react"
import { getTranslations } from "@/lib/messages"

const AlertBox = async ({
  children,
  titlu,
}: {
  children: React.ReactNode
  titlu?: string
}) => {
  const t = await getTranslations()

  return (
    <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-destructive">
        <AlertTriangle className="size-4" />
        {titlu ?? t("mdx.warningTitle")}
      </div>
      <div className="math-content text-sm">{children}</div>
    </div>
  )
}

export { AlertBox }
