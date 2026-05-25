"use client"

import { useTranslations } from "@/lib/messages"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const Rezolvare = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations()

  return (
    <Accordion type="single" collapsible className="rounded-xl border px-4">
      <AccordionItem value="rezolvare" className="border-none">
        <AccordionTrigger>{t("mdx.solution")}</AccordionTrigger>
        <AccordionContent>
          <div className="math-content">{children}</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export { Rezolvare }
