"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = ({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) => (
  <AccordionPrimitive.Item className={cn("border-b", className)} {...props} />
)

const AccordionTrigger = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-left text-sm font-medium transition-all hover:underline",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="size-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-180" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
)

const AccordionContent = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) => (
  <AccordionPrimitive.Content
    className={cn("overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down", className)}
    {...props}
  >
    <div className="pb-4">{children}</div>
  </AccordionPrimitive.Content>
)

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
