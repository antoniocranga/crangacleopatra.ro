import { collection, config, fields } from "@keystatic/core"
import { block, wrapper } from "@keystatic/core/content-components"

export const showAdminUI = process.env.NODE_ENV === "development"

const classOptions = Array.from({ length: 12 }, (_, index) => ({
  label: `Clasa ${index + 1}`,
  value: `clasa-${index + 1}`,
}))

const lessonTypeOptions = [
  { label: "Teorie", value: "teorie" },
  { label: "Exercitii", value: "exercitii" },
  { label: "Teste", value: "teste" },
]

const mdxComponents = {
  Atenție: wrapper({
    label: "Atenție",
    schema: {
      titlu: fields.text({ label: "Titlu" }),
    },
  }),
  Rezolvare: wrapper({
    label: "Rezolvare",
    schema: {},
  }),
  GrilaTest: wrapper({
    label: "Grila Test",
    schema: {
      titlu: fields.text({ label: "Titlu" }),
      descriere: fields.text({ label: "Descriere" }),
    },
  }),
  Intrebare: wrapper({
    label: "Intrebare",
    schema: {
      id: fields.text({ label: "ID" }),
      tip: fields.select({
        label: "Tip",
        options: [
          { label: "Grila", value: "grila" },
          { label: "Input", value: "input" },
        ],
        defaultValue: "grila",
      }),
      raspunsCorect: fields.text({ label: "Raspuns Corect" }),
      explicatie: fields.text({ label: "Explicatie" }),
      optiuni: fields.array(
        fields.object({
          eticheta: fields.text({ label: "Eticheta" }),
          valoare: fields.text({ label: "Valoare" }),
        }),
        { label: "Optiuni", itemLabel: (props) => props.fields.eticheta.value }
      ),
    },
  }),
}

export default config({
  storage: {
    kind: "local",
  },
  ui: {
    brand: {
      name: "crangacleopatra.ro",
    },
  },
  collections: {
    materialeDidactice: collection({
      label: "Materiale didactice",
      slugField: "slug",
      path: "src/content/materiale-didactice/*/",
      format: { data: "yaml" },
      schema: {
        slug: fields.slug({
          name: {
            label: "Identificator",
            validation: { isRequired: true },
          },
        }),
        titlu: fields.text({
          label: "Titlu",
          validation: { isRequired: true },
        }),
        nivel: fields.select({
          label: "Nivel",
          options: classOptions,
          defaultValue: "clasa-1",
        }),
        tip: fields.select({
          label: "Tip",
          options: lessonTypeOptions,
          defaultValue: "teorie",
        }),
        continut: fields.mdx({
          label: "Continut",
          options: {
            image: {
              directory: "public/images/materiale",
              publicPath: "/images/materiale/",
            },
          },
          components: mdxComponents,
        }),
      },
    }),
    provocareaZilei: collection({
      label: "Provocarea zilei",
      slugField: "slug",
      path: "src/content/provocarea-zilei/*/",
      format: { data: "yaml" },
      schema: {
        slug: fields.slug({
          name: {
            label: "Identificator",
            validation: { isRequired: true },
          },
        }),
        data: fields.text({
          label: "Data",
          validation: {
            isRequired: true,
            pattern: {
              regex: /^\d{4}-\d{2}-\d{2}$/,
              message: "Foloseste formatul YYYY-MM-DD.",
            },
          },
        }),
        intrebare: fields.text({
          label: "Intrebare",
          multiline: true,
          validation: { isRequired: true },
        }),
        raspunsCorect: fields.text({
          label: "Raspuns corect",
          validation: { isRequired: true },
        }),
        explicatie: fields.mdx({
          label: "Explicatie",
          components: mdxComponents,
        }),
      },
    }),
  },
})
