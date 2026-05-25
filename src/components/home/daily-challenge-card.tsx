"use client"

import * as React from "react"
import confetti from "canvas-confetti"
import { useTranslations } from "@/lib/messages"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type DailyChallengeCardProps = {
  answer: string
  question: React.ReactNode
  children: React.ReactNode
}

const DailyChallengeCard = ({ answer, question, children }: DailyChallengeCardProps) => {
  const t = useTranslations()
  const [value, setValue] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle")

  const onSubmit = () => {
    if (!value.trim()) {
      setStatus("error")
      return
    }

    if (value.trim().toLowerCase() === answer.trim().toLowerCase()) {
      setStatus("success")
      void confetti({ particleCount: 120, spread: 70, origin: { y: 0.7 } })
      return
    }

    setStatus("error")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("home.challengeTitle")}</CardTitle>
        <CardDescription>{t("home.challengeDescription")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-base leading-7 math-content">{question}</div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="daily-answer">
            {t("challenge.inputLabel")}
          </label>
          <Input
            id="daily-answer"
            value={value}
            className={cn(status === "error" && "shake border-destructive")}
            placeholder={t("challenge.inputPlaceholder")}
            onChange={(event) => {
              setValue(event.target.value)
              if (status !== "idle") {
                setStatus("idle")
              }
            }}
          />
        </div>
        <Button type="button" onClick={onSubmit}>
          {t("challenge.submit")}
        </Button>
        {status === "success" ? <p className="text-sm text-primary">{t("challenge.success")}</p> : null}
        {status === "error" ? <p className="text-sm text-destructive">{t("challenge.error")}</p> : null}
        {status === "success" ? (
          <div className="rounded-xl border bg-muted/40 p-4">
            <p className="mb-3 text-sm font-semibold">{t("challenge.explanation")}</p>
            <div className="math-content text-sm">{children}</div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

export { DailyChallengeCard }
