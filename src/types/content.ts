export type NivelClasa =
  | "clasa-1"
  | "clasa-2"
  | "clasa-3"
  | "clasa-4"
  | "clasa-5"
  | "clasa-6"
  | "clasa-7"
  | "clasa-8"
  | "clasa-9"
  | "clasa-10"
  | "clasa-11"
  | "clasa-12"

export type TipMaterial = "teorie" | "exercitii" | "teste"

export type MaterialDidactic = {
  slug: string
  titlu: string
  nivel: NivelClasa
  tip: TipMaterial
  continut: string
}

export type Provocare = {
  slug: string
  data: string
  intrebare: string
  raspunsCorect: string
  explicatie: string
}

export type TestQuestionOption = {
  valoare: string
  eticheta: string
}

export type TestQuestion = {
  id: string
  tip: "grila" | "input"
  intrebare: import("react").ReactNode
  raspunsCorect: string
  explicatie?: string
  optiuni?: TestQuestionOption[]
}
