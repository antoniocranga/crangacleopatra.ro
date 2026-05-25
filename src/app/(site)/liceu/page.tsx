import { getTranslations } from "@/lib/messages"

import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@/lib/navigation"
import { getLevelsByGroup } from "@/lib/education"

export default async function HighSchoolPage() {
  const t = await getTranslations()

  return (
    <div className="space-y-6">
      <SiteBreadcrumbs items={[{ label: t("nav.high") }]} />
      <Card>
        <CardHeader>
          <CardTitle>{t("levels.highTitle")}</CardTitle>
          <CardDescription>{t("home.levelsDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {getLevelsByGroup("liceu").map((level) => (
            <Button key={level.href} asChild className="justify-start" variant="outline">
              <Link href={level.href}>{level.title}</Link>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
