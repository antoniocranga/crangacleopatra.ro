# AGENTS.md — Quantum Composer

## Mission

You are a senior full-stack engineer on a teacher's presentation website built with Next.js 14+.

---

## Operating rules

### Before every task

1. Re-read `DESIGN.md` in full
2. Check `TODO.md` for what is in progress and what is next
3. Run `git status` and `git log --oneline -10` to orient yourself
4. Grep the codebase for existing patterns **before** inventing new ones:
   ```bash
   grep -r "pattern-name" src/ --include="*.tsx" --include="*.ts" -l
   ```
5. Never assume a file path — verify it exists first

### Code quality rules

- TypeScript strict mode — no `any`, no non-null assertions without an explanatory comment
- Co-locate: component + its types + its tests in the same folder
- Server components by default; add `"use client"` only when strictly necessary and comment why
- Use `zod` for all external data validation (API responses, form inputs, URL params)
- Named exports only — no default exports except for Next.js pages/layouts
- Prefer `const` arrow functions for components

### File and folder conventions

| Type                   | Path pattern                                       |
| ---------------------- | -------------------------------------------------- |
| UI components (shadcn) | `src/components/ui/` — DO NOT EDIT                 |
| Feature components     | `src/components/[domain]/ComponentName.tsx`        |
| Pages                  | `src/app/[locale]/[feature]/page.tsx`              |
| Layouts                | `src/app/[locale]/[feature]/layout.tsx`            |
| Hooks                  | `src/hooks/useFeatureName.ts`                      |
| Domain types           | `src/types/[domain].ts`                            |
| Utility libs           | `src/lib/[feature].ts`                             |
| Tests                  | `ComponentName.test.tsx` co-located with component |

### i18n rules

- All user-facing strings go through `useTranslations('namespace')`
- **Never hardcode English strings in components**
- Translation keys follow `namespace.component.element` pattern
  - Example: `editor.toolbar.save`, `project.card.visibility`
- Add keys to **all** locale files simultaneously — never leave a key missing in any locale
- Use `getTranslations()` in server components, `useTranslations()` in client components

### Git discipline

- Commit format: `type(scope): description`
  - Types: `feat`, `fix`, `refactor`, `style`, `test`, `chore`, `docs`
  - Example: `feat(editor): add gate palette sidebar`
- One logical change per commit
- Never commit to `main` directly
- Always run checks before committing:
  ```bash
  pnpm typecheck && pnpm lint && pnpm test
  ```

### Definition of done

A task is complete only when:

- [ ] Feature works as described
- [ ] TypeScript compiles with no errors (`pnpm typecheck`)
- [ ] Lint passes (`pnpm lint`)
- [ ] i18n keys added to all locale files
- [ ] No hardcoded strings in components
- [ ] Empty and error states handled
- [ ] Works in dark mode
- [ ] `TODO.md` updated to reflect progress

---

## What is implemented

- Project creation (CRUD)

## What is NOT yet implemented — do not build speculatively

---

## When in doubt

**Stop. Ask. Do not invent requirements.**

Log your uncertainty in a comment and surface it before proceeding.
