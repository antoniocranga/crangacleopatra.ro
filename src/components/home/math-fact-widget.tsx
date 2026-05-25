"use client"

import { useState } from "react"
import { Lightbulb, RefreshCw } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const mathFacts = [
  "Zero a fost inventat în India, în jurul secolului al V-lea, revoluționând complet matematica.",
  "Teorema lui Pitagora are peste 370 de demonstrații cunoscute, inclusiv una realizată de Albert Einstein la 11 ani.",
  "Numărul Pi (π) este infinit și nu are un model repetitiv, fiind un număr irațional.",
  "Există mai multe moduri de a amesteca un pachet de cărți decât atomi pe Pământ (52 factorial).",
  "Semnul de egalitate (=) a fost inventat în 1557 de galezul Robert Recorde pentru a evita repetarea cuvintelor.",
  "Numărul de aur (Phi - 1.618) se găsește peste tot în natură, de la petalele florilor la galaxii.",
  "Dacă ai o sfoară suficient de lungă încât să înconjoare Pământul, și mai adaugi doar 1 metru, ea se va ridica cu 16 cm peste tot solul!"
]

export function MathFactWidget() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextFact = () => {
    let next = Math.floor(Math.random() * mathFacts.length)
    while (next === currentIndex) {
      next = Math.floor(Math.random() * mathFacts.length)
    }
    setCurrentIndex(next)
  }

  return (
    <Card className="w-full relative overflow-hidden group">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg text-primary">
          <Lightbulb className="size-5 text-amber-500 fill-amber-500/20" />
          Știai că?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="text-sm font-medium text-foreground min-h-[60px] flex items-center leading-relaxed">
          {mathFacts[currentIndex]}
        </CardDescription>
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={nextFact} className="h-8 gap-2 text-muted-foreground hover:text-foreground">
            <RefreshCw className="size-3.5" />
            Altă curiozitate
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
