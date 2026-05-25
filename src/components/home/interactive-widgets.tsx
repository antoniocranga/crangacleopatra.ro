"use client"

import { useState, useEffect } from "react"
import { Calculator, TrendingUp, Circle, CheckCircle2, XCircle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function InteractiveWidgets() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <MentalMathWidget />
      <FibonacciWidget />
      <GeometryWidget />
    </div>
  )
}

function MentalMathWidget() {
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [operation, setOperation] = useState<"+" | "*">("+")
  const [answer, setAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle")

  const generateQuestion = () => {
    const ops: ("+" | "*")[] = ["+", "*"]
    const nextOp = ops[Math.floor(Math.random() * ops.length)]
    setOperation(nextOp)
    if (nextOp === "+") {
      setNum1(Math.floor(Math.random() * 50) + 10)
      setNum2(Math.floor(Math.random() * 50) + 10)
    } else {
      setNum1(Math.floor(Math.random() * 10) + 2)
      setNum2(Math.floor(Math.random() * 10) + 2)
    }
    setAnswer("")
    setStatus("idle")
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generateQuestion()
  }, [])

  const checkAnswer = (e: React.FormEvent) => {
    e.preventDefault()
    const correctAnswer = operation === "+" ? num1 + num2 : num1 * num2
    if (parseInt(answer) === correctAnswer) {
      setScore(s => s + 1)
      setStatus("correct")
      setTimeout(() => generateQuestion(), 1000)
    } else {
      setStatus("wrong")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="size-5 text-primary" />
          Calcul Mental
        </CardTitle>
        <CardDescription>Rezolvă rapid! Scor: {score}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={checkAnswer} className="space-y-4">
          <div className="flex items-center justify-between text-2xl font-bold bg-muted/50 p-4 rounded-lg">
            <span>{num1} {operation === "*" ? "×" : "+"} {num2} = </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-20 text-center border-b-2 border-primary bg-transparent outline-none focus:border-primary/50"
                autoFocus
              />
              {status === "correct" && <CheckCircle2 className="size-6 text-green-500 animate-in fade-in zoom-in" />}
              {status === "wrong" && <XCircle className="size-6 text-red-500 animate-in fade-in zoom-in" />}
            </div>
          </div>
          <Button type="submit" className="w-full" variant={status === "wrong" ? "destructive" : "default"}>
            {status === "wrong" ? "Mai încearcă!" : "Verifică"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function FibonacciWidget() {
  const [sequence, setSequence] = useState<number[]>([1, 1])

  const nextNumber = () => {
    setSequence(prev => {
      if (prev.length > 15) return prev // limit to prevent huge numbers
      const next = prev[prev.length - 1] + prev[prev.length - 2]
      return [...prev, next]
    })
  }

  const reset = () => setSequence([1, 1])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="size-5 text-primary" />
          Șirul lui Fibonacci
        </CardTitle>
        <CardDescription>Fiecare număr e suma celor două dinainte.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 min-h-[64px] items-center">
          {sequence.map((num, idx) => (
            <span key={idx} className="inline-flex items-center justify-center min-w-[32px] px-2 py-1 rounded-md bg-primary/10 text-primary font-mono font-medium animate-in fade-in slide-in-from-bottom-2">
              {num}
            </span>
          ))}
          {sequence.length > 15 && <span className="text-muted-foreground">...</span>}
        </div>
        <div className="flex gap-2">
          <Button onClick={nextNumber} className="flex-1" disabled={sequence.length > 15}>Adaugă număr</Button>
          <Button onClick={reset} variant="outline">Resetează</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function GeometryWidget() {
  const [radius, setRadius] = useState(5)
  const PI = 3.14159

  const area = (PI * radius * radius).toFixed(2)
  const perimeter = (2 * PI * radius).toFixed(2)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Circle className="size-5 text-primary" />
          Cercul Interactiv
        </CardTitle>
        <CardDescription>Modifică raza pentru a vedea aria și perimetrul.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center py-4">
          <div
            className="rounded-full bg-primary/10 border-2 border-primary border-dashed flex items-center justify-center transition-all duration-300"
            style={{ width: `${Math.max(40, radius * 8)}px`, height: `${Math.max(40, radius * 8)}px` }}
          >
            <span className="text-xs font-medium text-primary">r={radius}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Raza (r): {radius} cm</span>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 text-center text-sm pt-2 border-t">
          <div className="bg-muted/50 p-2 rounded-md">
            <p className="text-muted-foreground mb-1 text-xs uppercase tracking-wider">Arie (πr²)</p>
            <p className="font-mono font-medium">{area}</p>
          </div>
          <div className="bg-muted/50 p-2 rounded-md">
            <p className="text-muted-foreground mb-1 text-xs uppercase tracking-wider">Perimetru</p>
            <p className="font-mono font-medium">{perimeter}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
