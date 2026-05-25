import { FileText } from "lucide-react"
import { getTranslations } from "@/lib/messages"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@/lib/navigation"
import { getLevelByGrade, materialTypeLabels } from "@/lib/education"
import type { MaterialDidactic } from "@/types/content"

const MaterialCard = async ({ material }: { material: MaterialDidactic }) => {
  const t = await getTranslations()
  const level = getLevelByGrade(material.nivel)

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle>{material.titlu}</CardTitle>
          <Badge>{materialTypeLabels[material.tip]}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("materials.cardLevel")}: {level?.title ?? material.nivel}
        </p>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="size-4" />
          {t("materials.cardType")}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/materiale/${material.slug}`}>{t("materials.cardOpen")}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export { MaterialCard }
