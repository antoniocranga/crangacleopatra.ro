import { IBM_Plex_Sans, Geist_Mono } from "next/font/google"

import "@/app/globals.css"

import { getTranslations, messages } from "@/lib/messages"
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
    metadataBase: new URL("https://crangacleopatra.ro"),
    title: t("metadata.siteTitle"),
    description: t("metadata.siteDescription"),
    keywords: messages.metadata.keywords,
    authors: [{ name: "Profesor Crangă Cleopatra" }],
    creator: "Profesor Crangă Cleopatra",
    openGraph: {
      type: "website",
      locale: "ro_RO",
      url: "https://crangacleopatra.ro",
      title: t("metadata.siteTitle"),
      description: t("metadata.siteDescription"),
      siteName: t("metadata.siteTitle"),
      images: [
        {
          url: "/og-image.png",
          width: 1024,
          height: 1024,
          alt: t("metadata.siteTitle"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metadata.siteTitle"),
      description: t("metadata.siteDescription"),
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
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
