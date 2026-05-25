import { getTranslations } from "@/lib/messages"
import { notFound } from "next/navigation"

import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs"
import { MaterialCard } from "@/components/materials/material-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getMaterialsByLevel } from "@/lib/content"
import { getLevelByGrade, getSectionByGroup, getLevelsByGroup } from "@/lib/education"
import type { NivelClasa } from "@/types/content"

export function generateStaticParams() {
  return getLevelsByGroup("primar").map((level) => ({ nivel: level.grade }))
}

export default async function PrimaryLevelPage({
  params,
}: {
  params: Promise<{ nivel: NivelClasa }>
}) {
  const { nivel } = await params
  const t = await getTranslations()
  const level = getLevelByGrade(nivel)
  const section = getSectionByGroup("primar")

  if (!level || level.group !== "primar") {
    notFound()
  }

  const materials = await getMaterialsByLevel(nivel)

  return (
    <div className="space-y-6">
      <SiteBreadcrumbs items={[{ href: section?.href, label: section?.title ?? t("nav.primary") }, { label: level.title }]} />
      <Card>
        <CardHeader>
          <CardTitle>{level.title}</CardTitle>
          <CardDescription>{section?.description}</CardDescription>
        </CardHeader>
      </Card>
      {materials.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {materials.map((material) => (
            <MaterialCard key={material.slug} material={material} />
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{t("levels.emptyTitle")}</CardTitle>
            <CardDescription>{t("levels.emptyDescription")}</CardDescription>
          </CardHeader>
          <CardContent />
        </Card>
      )}
    </div>
  )
}
