import { getTranslations } from "@/lib/messages"
import { notFound } from "next/navigation"

import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs"
import { MaterialCard } from "@/components/materials/material-card"
import { PrintButton } from "@/components/materials/print-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@/lib/navigation"
import { getMaterialBySlug, getRelatedMaterials } from "@/lib/content"
import { getLevelByGrade, getSectionByGroup, materialTypeLabels } from "@/lib/education"
import { renderMdx } from "@/lib/mdx"

export default async function MaterialPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const t = await getTranslations()
  const material = await getMaterialBySlug(slug)

  if (!material) {
    notFound()
  }

  const level = getLevelByGrade(material.nivel)
  const section = level ? getSectionByGroup(level.group) : null
  const related = await getRelatedMaterials(material.slug, material.nivel)

  return (
    <div className="space-y-8">
      <div className="print:hidden">
        <SiteBreadcrumbs
          items={[
            { href: section?.href, label: section?.title ?? t("breadcrumbs.materials") },
            { href: level?.href, label: level?.title ?? material.nivel },
            { label: material.titlu },
          ]}
        />
      </div>
      <article className="space-y-6">
        <Card className="print:border-none print:shadow-none">
          <CardHeader className="print:hidden">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl">{material.titlu}</CardTitle>
                <CardDescription>{materialTypeLabels[material.tip]}</CardDescription>
              </div>
              <PrintButton />
            </div>
          </CardHeader>
          <CardContent className="math-content print:p-0">
            {/* Watermark that only appears when printing */}
            <div className="fixed inset-0 z-50 pointer-events-none hidden print:flex flex-col items-center justify-center opacity-10 mix-blend-multiply">
              <span className="text-[8rem] font-black tracking-tighter text-black -rotate-45 whitespace-nowrap uppercase">
                © Prof. Cranga Cleopatra
              </span>
            </div>
            
            {/* Print Title (since CardHeader is hidden on print to hide the button) */}
            <div className="hidden print:block mb-8 border-b pb-4">
              <h1 className="text-3xl font-bold text-black">{material.titlu}</h1>
              <p className="text-gray-500">{materialTypeLabels[material.tip]} • {level?.title ?? material.nivel}</p>
            </div>

            {await renderMdx(material.continut)}
          </CardContent>
        </Card>
      </article>
      {related.length ? (
        <section className="space-y-4 print:hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">{t("materials.relatedTitle")}</h2>
            {level ? (
              <Button asChild variant="outline">
                <Link href={level.href}>{t("materials.back")}</Link>
              </Button>
            ) : null}
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {related.map((relatedMaterial) => (
              <MaterialCard key={relatedMaterial.slug} material={relatedMaterial} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
