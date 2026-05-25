import { ReactNode } from "react"
import { notFound } from "next/navigation"

import KeystaticApp from "@/app/keystatic/keystatic"
import { showAdminUI } from "../../../keystatic.config"

export default function KeystaticLayout({ children }: { children: ReactNode }) {
  if (!showAdminUI) {
    notFound()
  }

  return (
    <>
      <KeystaticApp />
      {children}
    </>
  )
}
