import fs from "fs/promises"
import path from "path"
import { getTranslations } from "@/lib/messages"
import { SiteBreadcrumbs } from "@/components/layout/site-breadcrumbs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"

export default async function ResursePage() {
  const t = await getTranslations()
  const resurseDir = path.join(process.cwd(), "public", "resurse")
  
  let files: string[] = []
  try {
    const allFiles = await fs.readdir(resurseDir)
    files = allFiles.filter(file => file.endsWith('.pdf'))
  } catch (error) {
    console.error("Failed to read resurse directory:", error)
  }

  return (
    <div className="space-y-8">
      <SiteBreadcrumbs 
        items={[
          { label: t("nav.resources") }
        ]} 
      />
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight">{t("resources.title")}</h1>
        <p className="text-muted-foreground text-lg">
          {t("resources.description")}
        </p>
      </div>

      {files.length === 0 ? (
        <Card className="border-dashed bg-muted/50 text-center py-12">
          <CardHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <CardTitle className="mt-4">{t("resources.emptyTitle")}</CardTitle>
            <CardDescription>{t("resources.emptyDescription")}</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {files.map((file) => (
            <Card key={file} className="flex flex-col h-full">
              <CardHeader className="flex-1">
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg border bg-primary/10">
                  <FileText className="size-6 text-primary" />
                </div>
                <CardTitle className="text-lg line-clamp-3">{file.replace('.pdf', '')}</CardTitle>
              </CardHeader>
              <CardContent className="mt-auto border-t pt-4">
                <Button asChild variant="outline" className="w-full gap-2">
                  <a href={`/resurse/${file}`} target="_blank" rel="noopener noreferrer">
                    <Download className="size-4" />
                    Deschide PDF
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
