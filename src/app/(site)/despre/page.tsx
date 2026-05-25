import { getTranslations } from "@/lib/messages"

import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function AboutPage() {
  const t = await getTranslations()

  return (
    <div className="space-y-8">
      <SiteBreadcrumbs items={[{ label: t("breadcrumbs.about") }]} />
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{t("about.title")}</CardTitle>
            <CardDescription className="text-base">{t("about.description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-muted-foreground">
            <p>{t("about.valueOne")}</p>
            <p>{t("about.valueTwo")}</p>
            <p>{t("about.valueThree")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("about.contactTitle")}</CardTitle>
            <CardDescription>{t("about.contactDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button asChild>
              <a href="mailto:contact@crangacleopatra.ro">{t("about.email")}</a>
            </Button>
            <Button asChild variant="outline">
              <a href="tel:+40700000000">{t("about.phone")}</a>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
