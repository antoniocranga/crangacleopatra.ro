import { getTranslations } from "@/lib/messages"

import { DailyChallengeCard } from "@/components/home/daily-challenge-card"
import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs"
import { MaterialCard } from "@/components/materials/material-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@/lib/navigation"
import { getDailyChallengeByDate, getFeaturedMaterials } from "@/lib/content"
import { educationSections, getLevelsByGroup } from "@/lib/education"
import { renderMdx } from "@/lib/mdx"
import { MathFactWidget } from "@/components/home/math-fact-widget"

import { InteractiveWidgets } from "@/components/home/interactive-widgets"

export default async function HomePage() {
  const t = await getTranslations()
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Bucharest",
  }).format(new Date())
  const [challenge, featuredMaterials] = await Promise.all([
    getDailyChallengeByDate(today),
    getFeaturedMaterials(),
  ])

  return (
    <div className="space-y-8 relative">
      <div className="absolute inset-x-0 top-0 -z-10 h-[800px] w-full bg-math-paper pointer-events-none" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10 max-w-7xl mx-auto">
        <span className="absolute top-10 left-4 lg:left-10 text-4xl opacity-10 dark:opacity-20 font-serif">∑</span>
        <span className="absolute top-40 right-4 lg:right-20 text-5xl opacity-10 dark:opacity-20 font-serif">∫</span>
        <span className="absolute top-[300px] left-10 lg:left-32 text-6xl opacity-10 dark:opacity-20 font-serif">π</span>
        <span className="absolute top-[400px] right-10 lg:right-1/4 text-5xl opacity-10 dark:opacity-20 font-serif">∞</span>
        <span className="absolute top-20 right-1/3 text-4xl opacity-10 dark:opacity-20 font-serif">√</span>
        <span className="absolute top-60 left-1/4 text-3xl opacity-10 dark:opacity-20 font-serif">Δ</span>
      </div>

      <section className="flex flex-col lg:flex-row gap-8 items-center text-center lg:items-start lg:text-left pt-6 pb-12 lg:pt-10 lg:pb-16">
        <div className="space-y-6 flex-1 max-w-3xl">
          <p className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-widest">{t("home.heroEyebrow")}</p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {t("home.heroTitle")}
          </h1>
          <p className="text-lg text-muted-foreground mx-auto lg:mx-0 max-w-2xl leading-8">
            {t("home.heroDescription")}
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
            <Button asChild size="lg" className="px-8">
              <Link href="/primar">{t("home.heroPrimaryCta")}</Link>
            </Button>
          </div>
        </div>
        
        <div className="w-full lg:w-[350px] shrink-0 mt-4 lg:mt-12 lg:ml-8">
          <MathFactWidget />
        </div>
      </section>
      
      {challenge ? (
        <section className="flex justify-center lg:justify-start -mt-4 pb-8">
          <div className="w-full max-w-2xl">
            <DailyChallengeCard answer={challenge.raspunsCorect} question={await renderMdx(challenge.intrebare)}>
              {await renderMdx(challenge.explicatie)}
            </DailyChallengeCard>
          </div>
        </section>
      ) : null}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">{t("home.levelsTitle")}</h2>
          <p className="text-muted-foreground">{t("home.levelsDescription")}</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {educationSections.map((section) => {
            const Icon = section.icon

            return (
              <Card key={section.id}>
                <CardHeader>
                  <div className="mb-3 flex size-10 items-center justify-center rounded-lg border bg-muted">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {getLevelsByGroup(section.id).map((level) => (
                    <Button key={level.href} asChild className="w-full justify-start" variant="outline">
                      <Link href={level.href}>{level.title}</Link>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">{t("home.featuredTitle")}</h2>
          <p className="text-muted-foreground">{t("home.featuredDescription")}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredMaterials.map((material) => (
            <MaterialCard key={material.slug} material={material} />
          ))}
        </div>
      </section>
      <section className="space-y-4 pb-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Explorator Matematic</h2>
          <p className="text-muted-foreground">Joacă-te cu matematica folosind aceste mini-aplicații interactive.</p>
        </div>
        <InteractiveWidgets />
      </section>
    </div>
  )
}
