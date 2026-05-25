# DESIGN.md — UI/UX system

## Philosophy

Minimalist, functional, Vercel-adjacent. Every UI decision should feel like it
belongs in the shadcn component gallery or the Vercel dashboard.

**Three tests before shipping any UI change:**

1. Does it look correct in dark mode?
2. Is there an empty state?
3. Is there a loading state?

---

## Core principles

1. **Content first** — chrome, decoration, and gradients are the enemy
2. **Monochrome base** — color carries meaning, not aesthetics
3. **Sharp hierarchy** — one primary action per screen, everything else secondary or tertiary
4. **Keyboard-first** — power users must never need a mouse for core flows

---

## Color

Use only shadcn semantic tokens — never raw hex values or arbitrary Tailwind colors.

| Purpose          | Token                                        | Usage                              |
| ---------------- | -------------------------------------------- | ---------------------------------- |
| Primary actions  | `bg-primary text-primary-foreground`         | Save, Create, Submit               |
| Destructive      | `bg-destructive text-destructive-foreground` | Delete, Remove — irreversible only |
| Muted content    | `text-muted-foreground`                      | Labels, metadata, timestamps       |
| Borders          | `border` / `border-border`                   | Dividers, card edges               |
| Accent / active  | `bg-accent text-accent-foreground`           | Hover states, selected items       |
| Cards / surfaces | `bg-card text-card-foreground`               | Content containers                 |

**Do not use** custom brand colors unless they are defined in `tailwind.config.ts` as CSS variables.

---

## Typography

- Headings: `font-semibold tracking-tight`
- Page titles: `text-2xl font-semibold tracking-tight` or `text-3xl`
- Section headings: `text-lg font-semibold`
- Body text: default — do not override `font-size` or `line-height` globally
- Monospace (circuit code, `.ket` content): `font-mono text-sm`
- Labels and metadata: `text-sm text-muted-foreground`
- Captions: `text-xs text-muted-foreground`

---

## Spacing and layout

- App shell: sidebar nav + main content area (verify exact implementation)
- Main content max-width: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Section spacing: `space-y-6` or `space-y-8` between major sections
- Card internal padding: use shadcn `<CardHeader>`, `<CardContent>`, `<CardFooter>` defaults — do not override

---

## Component patterns

### Buttons

```tsx
// Primary action — one per screen
<Button>Create project</Button>

// Secondary / outline
<Button variant="outline">Cancel</Button>

// Destructive — only for irreversible actions
<Button variant="destructive">Delete project</Button>

// Ghost — for icon-only toolbar actions
<Button variant="ghost" size="icon">
  <Settings className="h-4 w-4" />
</Button>
```

### Cards

- Use `<Card>` from shadcn for all contained content blocks
- No card-within-card nesting beyond 2 levels
- Project cards must show: name, file count, last modified, visibility badge

### Badges

```tsx
// Public project
<Badge variant="outline">Public</Badge>

// Private project
<Badge>Private</Badge>

// Status indicators
<Badge variant="secondary">Draft</Badge>
```

### Modals and dialogs

- Use `<Dialog>` for informational modals and forms
- Use `<AlertDialog>` for all destructive confirmations — never `<Dialog>`
- Dialog titles must be action-oriented: "Delete project" not "Confirm"

### Forms

- Every form field needs a `<Label>` — never unlabeled inputs
- Validation messages: `text-sm text-destructive` below the field
- Submit button disabled while loading, with a spinner inside
- Use react-hook-form + zod schema validation (verify if already in use)

---

## Empty states

Every list, grid, or table must have an empty state. Pattern:

```tsx
<div className="flex flex-col items-center justify-center py-12 text-center">
  <FolderOpen className="h-12 w-12 text-muted-foreground/40 mb-4" />
  <h3 className="text-lg font-semibold">No projects yet</h3>
  <p className="text-sm text-muted-foreground mt-1">
    Create your first project to get started.
  </p>
  <Button className="mt-4">Create project</Button>
</div>
```

---

## Loading states

- Content areas: `<Skeleton>` from shadcn matching the shape of the loaded content
- Button actions: disable the button and show a `<Loader2 className="animate-spin" />` inside
- Full page: use Next.js `loading.tsx` with skeleton layout
- Never show a raw spinner in a content area — always use skeletons

---

## Quantum-specific UI patterns

### .ket file display

- Monospace font: `font-mono text-sm`
- Syntax highlighting: use the editor's built-in theme — do not add a separate highlighter
- File tab: show filename with `.ket` extension, unsaved indicator dot if modified

### Project card

```
┌─────────────────────────────────┐
│ Bell State Experiments    [Priv]│
│ ─────────────────────────────── │
│ 3 files  ·  Modified 2h ago     │
└─────────────────────────────────┘
```

- Title: `font-semibold`
- Metadata row: `text-sm text-muted-foreground`
- Visibility badge: top-right corner

### Circuit gate palette (future)

- Icon grid layout, 32×32px touch targets
- Lucide icons or custom SVG only — no emoji, no external icon fonts
- Group gates by type: Single-qubit / Two-qubit / Measurement

### Circuit renderer (future — await spec)

- Output: inline SVG
- Qubit wires: horizontal lines
- Gates: rectangles with label centered
- Measurement: meter icon at wire end
- Color: monochrome with `text-foreground` — no gate-specific colors unless spec says otherwise

---

## Do NOT

- Add gradients to any background or card
- Use `drop-shadow` or `box-shadow` on cards (border is sufficient)
- Mix icon libraries — Lucide only
- Add animations beyond what shadcn provides (no framer-motion unless already in `package.json`)
- Build responsive tables — use card lists on mobile instead
- Use `z-index` values above 50 without a documented reason
- Add `overflow: hidden` to page-level containers
