import { getTranslations } from "@/lib/messages"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link } from "@/lib/navigation"

type BreadcrumbEntry = {
  href?: string
  label: string
}

const SiteBreadcrumbs = async ({ items }: { items: BreadcrumbEntry[] }) => {
  const t = await getTranslations()

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/" className="hover:text-foreground">
            {t("layout.breadcrumbHome")}
          </Link>
        </BreadcrumbItem>
        {items.map((item) => (
          <BreadcrumbItem key={`${item.label}-${item.href ?? "current"}`}>
            <BreadcrumbSeparator />
            {item.href ? (
              <Link href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export { SiteBreadcrumbs }
