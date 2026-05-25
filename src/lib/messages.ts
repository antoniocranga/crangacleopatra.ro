import * as React from "react"

const messages = {
  metadata: {
    siteTitle: "Profesor Crangă Cleopatra",
    siteDescription:
      "Platforma educațională modernă pentru lecții, teste și provocări matematice.",
  },
  nav: {
    home: "Acasă",
    primary: "Învățământ primar",
    middle: "Gimnaziu",
    high: "Liceu",
    about: "Despre mine",
    dailyChallenge: "Provocarea zilei",
    materials: "Materiale didactice",
    theory: "Teorie",
    exercises: "Exerciții",
    tests: "Teste",
  },
  layout: {
    sidebarTitle: "Matematica pe înțelesul elevilor",
    sidebarDescription: "Lecții clare, fișe, teste și exerciții pentru clasele I-XII.",
    breadcrumbHome: "Acasă",
    footerCopyright: "Profesor Crangă Cleopatra. Toate drepturile rezervate.",
  },
  home: {
    heroEyebrow: "Educație, Matematică Interactivă",
    heroTitle: "Lecții structurate pentru fiecare etapă de învățare",
    heroDescription:
      "Resurse în limba română pentru ciclul primar, gimnazial și liceal, cu explicații, PDF-uri și teste interactive.",
    heroPrimaryCta: "Vezi materialele",
    heroSecondaryCta: "Despre mine",
    challengeTitle: "Provocarea zilei",
    challengeDescription:
      "Rezolvă enunțul de astăzi și verifică instant dacă răspunsul tău este corect.",
    challengeMissing: "Nu există încă o provocare publicată pentru astăzi.",
    levelsTitle: "Navigare rapidă pe niveluri",
    levelsDescription:
      "Fiecare nivel grupează lecții, exerciții și teste adaptate vârstei elevilor.",
    featuredTitle: "Materiale recomandate",
    featuredDescription: "Exemple de lecții, fișe și teste interactive.",
    aboutTitle: "Despre profesoară",
    aboutDescription:
      "O prezență calmă și riguroasă, orientată către explicații pas cu pas și progres real.",
  },
  levels: {
    primaryTitle: "Învățământ primar",
    middleTitle: "Gimnaziu",
    highTitle: "Liceu",
    openClass: "Deschide clasa {grade}",
    emptyTitle: "Conținutul este în pregătire",
    emptyDescription: "Vor fi adăugate în curând lecții și fișe pentru această clasă.",
  },
  materials: {
    cardLevel: "Nivel",
    cardType: "Tip",
    cardPdf: "Fișă PDF",
    cardOpen: "Deschide materialul",
    back: "Înapoi la materiale",
    relatedTitle: "Alte materiale din același nivel",
    emptyTitle: "Nu există materiale disponibile",
    emptyDescription: "Revino curând pentru lecții și exerciții noi.",
  },
  challenge: {
    inputLabel: "Răspunsul tău",
    inputPlaceholder: "Scrie rezultatul aici",
    submit: "Verifică răspunsul",
    success: "Bravo! Răspunsul este corect.",
    error: "Răspunsul nu este corect. Mai încearcă.",
    explanation: "Explicație",
    reveal: "Vezi rezolvarea",
    answerMissing: "Introdu un răspuns înainte de verificare.",
  },
  test: {
    title: "Testează-te",
    description: "Răspunde la întrebări și vezi imediat explicațiile.",
    submit: "Trimite răspunsurile",
    reset: "Reîncearcă",
    result: "Ai obținut {score} din {total} puncte.",
    correct: "Corect",
    incorrect: "Incorect",
    questionFallback: "Întrebare",
    inputPlaceholder: "Completează răspunsul",
  },
  mdx: {
    solution: "Vezi rezolvarea",
    downloadPdf: "Descarcă PDF-ul",
    warningTitle: "Atenție",
  },
  about: {
    title: "Despre mine",
    description:
      "Construiesc experiențe de învățare clare, disciplinate și prietenoase pentru elevi și părinți.",
    contactTitle: "Contact",
    contactDescription: "Pentru colaborări, pregătire suplimentară sau întrebări despre materiale.",
    email: "Trimite email",
    phone: "Sună",
    valuesTitle: "Cum lucrez cu elevii",
    valueOne: "Explicații pas cu pas, cu accent pe înțelegere.",
    valueTwo: "Exerciții gradate, de la bază la performanță.",
    valueThree: "Feedback imediat prin fișe și teste interactive.",
  },
  breadcrumbs: {
    materials: "Materiale",
    about: "Despre mine",
  },
} as const

type Messages = typeof messages
type Primitive = string | number

const resolveMessage = (key: string) =>
  key.split(".").reduce<unknown>((current, part) => {
    if (current && typeof current === "object" && part in current) {
      return current[part as keyof typeof current]
    }

    return undefined
  }, messages)

const interpolate = (template: string, values?: Record<string, Primitive>) => {
  if (!values) {
    return template
  }

  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`))
}

type Translator = (key: string, values?: Record<string, Primitive>) => string

const createTranslator = (): Translator => (key, values) => {
  const resolved = resolveMessage(key)

  if (typeof resolved !== "string") {
    throw new Error(`Missing message: ${key}`)
  }

  return interpolate(resolved, values)
}

const useTranslations = () => React.useMemo(() => createTranslator(), [])

const getTranslations = async () => createTranslator()

export { getTranslations, messages, useTranslations }
export type { Messages, Translator }
