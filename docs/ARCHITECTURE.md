# Architecture & Educational Model

## 1. Engineering Architecture

This platform is a server-rendered, static-hybrid web application designed for high performance, accessibility, and ease of content authoring.

### Frontend Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS v4 alongside `shadcn/ui` components
- **Icons:** Lucide React
- **Theming:** `next-themes` (Dark/Light mode support)

### Content Management System (CMS)
- **Tool:** Keystatic
- **Storage:** Local file system (`kind: "local"`), serializing to YAML and MDX.
- **Collections:**
  - `materialeDidactice`: Core educational content (Math lessons, theory, exercises).
  - `provocareaZilei`: Daily math challenges.

### MDX Integration
We leverage `@mdx-js/mdx` and `@next/mdx` for writing content that seamlessly blends Markdown with React components.
- **Math Rendering:** `remark-math` (parsing) and `rehype-katex` (rendering).
- **Custom Components:** Mapped globally via `src/lib/mdx.tsx`.

## 2. Educational / Content Architecture

The platform targets Romanian mathematics education for grades 4–12.

### Taxonomy
- **Clasa (Grade):** Grades 1–12 (focused on Gimnaziu: IV-VIII, Liceu: IX-XII)
- **Tip (Content Type):**
  - *Teorie:* Explanations, definitions, theorems.
  - *Exerciții:* Practice problems with step-by-step solutions.
  - *Teste:* Evaluative forms with immediate feedback.

### Interactive Components
Content authors use custom React components inside MDX files to create an engaging learning experience:
- `<Atenție>`: For highlighting critical rules, exceptions, or definitions.
- `<Rezolvare>`: Collapsible component showing step-by-step solutions to problems.
- `<GrilaTest>` & `<Intrebare>`: Client-side interactive testing blocks that validate answers (both multiple-choice and text-input) and provide explanatory feedback.

### Flow & Navigation
- **Students** navigate through grade-specific hubs to find relevant topics.
- **Content Authors** use the Keystatic Admin UI (available locally) to draft `.mdx` files without needing to write code.
- **Evaluations** are currently self-paced and client-validated, ideal for independent practice.
