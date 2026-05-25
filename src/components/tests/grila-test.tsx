"use client"

import * as React from "react"
import { useTranslations } from "@/lib/messages"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { TestQuestion } from "@/types/content"

type IntrebareProps = Omit<TestQuestion, "intrebare"> & {
  children?: React.ReactNode
}

const Intrebare = () => null

type GrilaTestProps = {
  children: React.ReactNode
  titlu?: string
  descriere?: string
}

const normalizeAnswer = (value: string) => value.trim().toLowerCase()

const extractQuestions = (children: React.ReactNode): TestQuestion[] =>
  React.Children.toArray(children).flatMap((child) => {
    if (!React.isValidElement<IntrebareProps>(child)) {
      return []
    }

    return [
      {
        id: child.props.id,
        tip: child.props.tip,
        intrebare: child.props.children,
        raspunsCorect: child.props.raspunsCorect,
        explicatie: child.props.explicatie,
        optiuni: child.props.optiuni,
      },
    ]
  })

const GrilaTest = ({ children, titlu, descriere }: GrilaTestProps) => {
  const t = useTranslations()
  const questions = React.useMemo(() => extractQuestions(children), [children])
  const [answers, setAnswers] = React.useState<Record<string, string>>({})
  const [submitted, setSubmitted] = React.useState(false)

  const score = questions.reduce((total, question) => {
    const answer = answers[question.id]

    return total + Number(normalizeAnswer(answer ?? "") === normalizeAnswer(question.raspunsCorect))
  }, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{titlu ?? t("test.title")}</CardTitle>
        <CardDescription>{descriere ?? t("test.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((question, index) => {
          const isCorrect =
            normalizeAnswer(answers[question.id] ?? "") === normalizeAnswer(question.raspunsCorect)

          return (
            <div key={question.id} className="space-y-3 rounded-xl border p-4">
              <div className="space-y-1">
                <div className="text-sm font-semibold flex gap-1">
                  <span>{index + 1}.</span> 
                  <div>{question.intrebare || t("test.questionFallback")}</div>
                </div>
              </div>
              {question.tip === "grila" ? (
                <RadioGroup
                  value={answers[question.id] ?? ""}
                  onValueChange={(value) => setAnswers((current) => ({ ...current, [question.id]: value }))}
                >
                  {question.optiuni?.map((option) => (
                    <label
                      key={option.valoare}
                      className="flex items-center gap-3 rounded-md border px-3 py-2 text-sm"
                    >
                      <RadioGroupItem value={option.valoare} />
                      <span>{option.eticheta}</span>
                    </label>
                  ))}
                </RadioGroup>
              ) : (
                <Input
                  value={answers[question.id] ?? ""}
                  placeholder={t("test.inputPlaceholder")}
                  onChange={(event) =>
                    setAnswers((current) => ({ ...current, [question.id]: event.target.value }))
                  }
                />
              )}
              {submitted ? (
                <div className="space-y-1 text-sm">
                  <p className={isCorrect ? "text-primary" : "text-destructive"}>
                    {isCorrect ? t("test.correct") : t("test.incorrect")}
                  </p>
                  {question.explicatie ? <p className="text-muted-foreground">{question.explicatie}</p> : null}
                </div>
              ) : null}
            </div>
          )
        })}
        {submitted ? <p className="font-medium">{t("test.result", { score, total: questions.length })}</p> : null}
        <div className="flex gap-3 print:hidden">
          <Button type="button" onClick={() => setSubmitted(true)}>
            {t("test.submit")}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setAnswers({})
              setSubmitted(false)
            }}
          >
            {t("test.reset")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export { GrilaTest, Intrebare }
