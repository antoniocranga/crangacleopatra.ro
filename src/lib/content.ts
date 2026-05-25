import { createReader } from "@keystatic/core/reader"
import { z } from "zod"

import keystaticConfig from "../../keystatic.config"
import { educationLevels } from "@/lib/education"
import type { MaterialDidactic, NivelClasa, Provocare, TipMaterial } from "@/types/content"

const reader = createReader(process.cwd(), keystaticConfig)

const nivelSchema = z.enum(
  educationLevels.map((level) => level.grade) as [NivelClasa, ...NivelClasa[]],
)

const materialSchema = z.object({
  titlu: z.string().min(1),
  nivel: nivelSchema,
  tip: z.enum(["teorie", "exercitii", "teste"] satisfies [TipMaterial, ...TipMaterial[]]),
  continut: z.string().min(1),
})

const provocareSchema = z.object({
  data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  intrebare: z.string().min(1),
  raspunsCorect: z.string().min(1),
  explicatie: z.string().min(1),
})

const parseMaterial = (slug: string, entry: unknown): MaterialDidactic => ({
  slug,
  ...materialSchema.parse(entry),
})

const parseProvocare = (slug: string, entry: unknown): Provocare => ({
  slug,
  ...provocareSchema.parse(entry),
})

export const getAllMaterials = async () => {
  const entries = await reader.collections.materialeDidactice.all({ resolveLinkedFiles: true })

  return entries.map(({ slug, entry }) => parseMaterial(slug, entry))
}

export const getFeaturedMaterials = async (limit = 3) => {
  const materials = await getAllMaterials()

  return materials.slice(0, limit)
}

export const getMaterialBySlug = async (slug: string) => {
  const entry = await reader.collections.materialeDidactice.read(slug, { resolveLinkedFiles: true })

  return entry ? parseMaterial(slug, entry) : null
}

export const getMaterialsByLevel = async (nivel: NivelClasa) => {
  const materials = await getAllMaterials()

  return materials.filter((material) => material.nivel === nivel)
}

export const getRelatedMaterials = async (slug: string, nivel: NivelClasa) => {
  const materials = await getMaterialsByLevel(nivel)

  return materials.filter((material) => material.slug !== slug).slice(0, 3)
}

export const getDailyChallengeByDate = async (date: string) => {
  const entry = await reader.collections.provocareaZilei.read(`provocarea-${date}`, {
    resolveLinkedFiles: true,
  })

  if (entry) {
    return parseProvocare(`provocarea-${date}`, entry)
  }

  const allEntries = await reader.collections.provocareaZilei.all({ resolveLinkedFiles: true })
  const match = allEntries.find(({ entry: challengeEntry }) => challengeEntry.data === date)

  return match ? parseProvocare(match.slug, match.entry) : null
}
