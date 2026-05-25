import { BookOpen, Calculator, GraduationCap, Sigma } from "lucide-react"

import type { LucideIcon } from "lucide-react"

import type { NivelClasa, TipMaterial } from "@/types/content"

export type EducationGroup = "primar" | "gimnaziu" | "liceu"

export type EducationLevel = {
  group: EducationGroup
  href: string
  grade: NivelClasa
  title: string
}

export type EducationSection = {
  description: string
  href: string
  icon: LucideIcon
  id: EducationGroup
  title: string
}

export const educationSections: EducationSection[] = [
  {
    id: "primar",
    title: "Învățământ primar",
    description: "Bazele numerelor, operațiilor și ale gândirii matematice.",
    href: "/primar",
    icon: BookOpen,
  },
  {
    id: "gimnaziu",
    title: "Gimnaziu",
    description: "Fracții, ecuații, geometrie și consolidarea logicii matematice.",
    href: "/gimnaziu",
    icon: Calculator,
  },
  {
    id: "liceu",
    title: "Liceu",
    description: "Algebră, funcții, analiză și pregătire pentru examene.",
    href: "/liceu",
    icon: Sigma,
  },
]

export const educationLevels: EducationLevel[] = [
  { group: "primar", grade: "clasa-1", href: "/primar/clasa-1", title: "Clasa I" },
  { group: "primar", grade: "clasa-2", href: "/primar/clasa-2", title: "Clasa a II-a" },
  { group: "primar", grade: "clasa-3", href: "/primar/clasa-3", title: "Clasa a III-a" },
  { group: "primar", grade: "clasa-4", href: "/primar/clasa-4", title: "Clasa a IV-a" },
  { group: "gimnaziu", grade: "clasa-5", href: "/gimnaziu/clasa-5", title: "Clasa a V-a" },
  { group: "gimnaziu", grade: "clasa-6", href: "/gimnaziu/clasa-6", title: "Clasa a VI-a" },
  { group: "gimnaziu", grade: "clasa-7", href: "/gimnaziu/clasa-7", title: "Clasa a VII-a" },
  { group: "gimnaziu", grade: "clasa-8", href: "/gimnaziu/clasa-8", title: "Clasa a VIII-a" },
  { group: "liceu", grade: "clasa-9", href: "/liceu/clasa-9", title: "Clasa a IX-a" },
  { group: "liceu", grade: "clasa-10", href: "/liceu/clasa-10", title: "Clasa a X-a" },
  { group: "liceu", grade: "clasa-11", href: "/liceu/clasa-11", title: "Clasa a XI-a" },
  { group: "liceu", grade: "clasa-12", href: "/liceu/clasa-12", title: "Clasa a XII-a" },
]

export const materialTypeLabels: Record<TipMaterial, string> = {
  teorie: "Teorie",
  exercitii: "Exerciții",
  teste: "Teste",
}

export const getLevelByGrade = (grade: NivelClasa) =>
  educationLevels.find((level) => level.grade === grade) ?? null

export const getLevelsByGroup = (group: EducationGroup) =>
  educationLevels.filter((level) => level.group === group)

export const getSectionByGroup = (group: EducationGroup) =>
  educationSections.find((section) => section.id === group) ?? null

export const siteIdentity = {
  icon: Sigma,
  title: "Profesor Crangă Cleopatra",
}
