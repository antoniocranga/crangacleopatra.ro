"use client"

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

const RadioGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) => (
  <RadioGroupPrimitive.Root className={cn("grid gap-3", className)} {...props} />
)

const RadioGroupItem = ({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) => (
  <RadioGroupPrimitive.Item
    className={cn(
      "size-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <span className="size-2 rounded-full bg-current" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
)

export { RadioGroup, RadioGroupItem }
