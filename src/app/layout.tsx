import { IBM_Plex_Sans, Geist_Mono } from "next/font/google"

import "@/app/globals.css"

import { getTranslations } from "@/lib/messages"
import { cn } from "@/lib/utils"

const fontHeading = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
})

const fontSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export async function generateMetadata() {
  const t = await getTranslations()

  return {
    title: t("metadata.siteTitle"),
    description: t("metadata.siteDescription"),
  }
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      suppressHydrationWarning
      lang="ro"
      className={cn(fontHeading.variable, fontSans.variable, fontMono.variable)}
    >
      <body>
        {children}
      </body>
    </html>
  )
}
