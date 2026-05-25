"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

const subscribe = () => () => {}

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = React.useSyncExternalStore(subscribe, () => true, () => false)
  const isDark = mounted && resolvedTheme === "dark"

  return (
    <Button
      aria-label="Schimba tema"
      size="icon"
      type="button"
      variant="outline"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}

export { ThemeToggle }
