# Frontend Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Interview Arena's ad-hoc inline-styled UI with a dark-mode-first, developer-centric design system (Tailwind + hand-owned shadcn-style primitives) across every page, with a shared app shell and explicit loading/error/empty states — no backend or copy changes.

**Architecture:** Tailwind CSS v4 (Vite plugin) supplies utility styling and design tokens; a small set of owned primitive components (`src/components/ui/*`, Radix-based where needed) replace the current `.btn-primary`/`.form-input`/`.auth-card` classes; a new `AppShell` layout route wraps all authenticated pages with a header/nav, while `/login` and `/register` stay outside it. Pages are redesigned one at a time, each verified against its existing test file (which asserts on visible text/role, not markup) plus lint and build.

**Tech Stack:** Tailwind CSS v4, class-variance-authority, clsx, tailwind-merge, lucide-react, @radix-ui/react-select, @radix-ui/react-dialog, @radix-ui/react-label, sonner (toast), @tailwindcss/typography, react-markdown (existing).

**Spec:** `docs/superpowers/specs/2026-08-24-frontend-redesign-design.md`

## Global Constraints

- No backend/API changes — do not touch `backend/` or any `src/api/*` request/response shapes.
- No new copy — every existing user-facing Vietnamese string must appear verbatim in the redesigned page.
- No sidebar layout — navigation is a top header (rejected in spec).
- Every data-fetching page must show three explicit states: loading (`Skeleton`), error (`Alert` + retry where the page already has a retryable fetch function), empty (styled placeholder) — never a bare "Đang tải..." paragraph.
- After every task: `npx vitest run` (scoped to the affected test file(s)), `npm run lint`, and `npm run build` must all pass before committing.
- All commands in this plan run from `web/` (the frontend package root) unless stated otherwise.

---

## File Structure

New files this plan creates:

- `web/src/lib/utils.ts` — `cn()` classname helper (clsx + tailwind-merge).
- `web/src/components/ui/button.tsx`, `card.tsx`, `badge.tsx`, `input.tsx`, `label.tsx`, `textarea.tsx`, `alert.tsx`, `skeleton.tsx` — core primitives (Task 2).
- `web/src/components/ui/select.tsx`, `sheet.tsx`, `sonner.tsx` — Radix-backed primitives (Task 3).
- `web/src/components/layout/AppShell.tsx`, `web/src/components/layout/AppShell.test.tsx` — shared header/nav layout (Task 4).
- `web/src/pages/HomePage.tsx`, `web/src/pages/HomePage.test.tsx` — Home extracted out of `App.tsx` (Task 6).

Modified files: `web/index.css` (design tokens, Task 1), `web/vite.config.ts` + `web/tsconfig.app.json` (path alias, Task 1), `web/src/main.tsx` (Toaster mount, Task 3), `web/src/App.tsx` (routing restructure, Tasks 4 & 6), every file under `web/src/pages/*.tsx` except `HomePage.tsx` which is new (Tasks 5, 7–13), `web/src/App.css` and `web/src/index.css` (dead-code removal, Task 14).

---

### Task 1: Tailwind v4 setup, design tokens, path alias

**Files:**
- Modify: `web/index.css`
- Modify: `web/vite.config.ts`
- Modify: `web/tsconfig.app.json`
- Create: `web/src/lib/utils.ts`
- Modify: `web/package.json` (via npm install)

**Interfaces:**
- Produces: `cn(...inputs: ClassValue[]): string` from `@/lib/utils`, used by every primitive in Tasks 2–3.
- Produces: Tailwind color tokens usable as utilities: `bg-background`, `text-foreground`, `bg-card`, `text-card-foreground`, `border-border`, `bg-muted`, `text-muted-foreground`, `text-accent`, `bg-accent`, `text-accent-foreground`, `bg-success`, `bg-warning`, `bg-danger`, `text-danger-foreground`, plus `font-mono`.
- Produces: `@` path alias resolving to `web/src`, usable in every later task's imports (`@/components/ui/button`, `@/lib/utils`, etc).

- [ ] **Step 1: Install dependencies**

Run from `web/`:
```bash
npm install tailwindcss @tailwindcss/vite @tailwindcss/typography class-variance-authority clsx tailwind-merge lucide-react @radix-ui/react-select @radix-ui/react-dialog @radix-ui/react-label sonner
```

- [ ] **Step 2: Wire the Tailwind Vite plugin**

Edit `web/vite.config.ts` to add the Tailwind plugin and the `@` alias:

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/vitest.setup.ts',
  },
})
```

- [ ] **Step 3: Add the `@` path alias for TypeScript**

Edit `web/tsconfig.app.json`, adding `baseUrl` and `paths` inside `compilerOptions`:

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

- [ ] **Step 4: Replace `web/src/index.css` with Tailwind + design tokens**

Replace the entire file contents with:

```css
@import "tailwindcss";
@import "@tailwindcss/typography";

@theme {
  --color-background: #0a0a0c;
  --color-foreground: #f3f4f6;
  --color-card: #16171d;
  --color-card-foreground: #f3f4f6;
  --color-border: #2e303a;
  --color-input: #2e303a;
  --color-muted: #1f2028;
  --color-muted-foreground: #9ca3af;
  --color-accent: #c084fc;
  --color-accent-foreground: #0a0a0c;
  --color-success: #10b981;
  --color-success-foreground: #ffffff;
  --color-warning: #f59e0b;
  --color-warning-foreground: #0a0a0c;
  --color-danger: #ef4444;
  --color-danger-foreground: #ffffff;

  --font-sans: system-ui, 'Segoe UI', Roboto, sans-serif;
  --font-mono: ui-monospace, 'JetBrains Mono', Consolas, monospace;

  --radius-lg: 1rem;
  --radius-md: 0.75rem;
  --radius-sm: 0.5rem;
}

@media (prefers-color-scheme: light) {
  :root {
    --color-background: #ffffff;
    --color-foreground: #08060d;
    --color-card: #f4f3ec;
    --color-card-foreground: #08060d;
    --color-border: #e5e4e7;
    --color-input: #e5e4e7;
    --color-muted: #f4f3ec;
    --color-muted-foreground: #6b6375;
    --color-accent: #aa3bff;
    --color-accent-foreground: #ffffff;
  }
}

body {
  @apply bg-background text-foreground font-sans antialiased;
  color-scheme: light dark;
}

* {
  @apply border-border;
}
```

- [ ] **Step 5: Add the `cn` classname helper**

Create `web/src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 6: Verify build and existing tests still pass**

Run:
```bash
npx vitest run
npm run lint
npm run build
```
Expected: all three pass. The app will look unstyled/broken visually at this point (old CSS classes are gone but pages still reference them) — that's expected; Tasks 5–13 fix each page. Tests pass because they assert on text/role, not styling.

- [ ] **Step 7: Commit**

```bash
git add web/index.html web/vite.config.ts web/tsconfig.app.json web/src/index.css web/src/lib/utils.ts web/package.json web/package-lock.json
git commit -m "chore: add Tailwind v4, design tokens, and path alias"
```

---

### Task 2: Core UI primitives (Button, Card, Badge, Input, Label, Textarea, Alert, Skeleton)

**Files:**
- Create: `web/src/components/ui/button.tsx`
- Create: `web/src/components/ui/card.tsx`
- Create: `web/src/components/ui/badge.tsx`
- Create: `web/src/components/ui/input.tsx`
- Create: `web/src/components/ui/label.tsx`
- Create: `web/src/components/ui/textarea.tsx`
- Create: `web/src/components/ui/alert.tsx`
- Create: `web/src/components/ui/skeleton.tsx`

**Interfaces:**
- Consumes: `cn` from `@/lib/utils` (Task 1).
- Produces (used by every page task 5–13):
  - `Button({ variant?: 'default'|'secondary'|'destructive'|'success'|'warning'|'outline'|'ghost', size?: 'default'|'sm'|'lg', asChild?: boolean, ...ButtonHTMLAttributes })`
  - `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` (all `React.ComponentProps<'div'>`)
  - `Badge({ variant?: 'default'|'secondary'|'outline'|'success'|'warning'|'destructive', ...HTMLAttributes<HTMLSpanElement> })`
  - `Input(React.ComponentProps<'input'>)`, forwards `ref`
  - `Label(React.ComponentProps<typeof LabelPrimitive.Root>)`
  - `Textarea(React.ComponentProps<'textarea'>)`, forwards `ref`
  - `Alert({ variant?: 'default'|'destructive', ...HTMLAttributes<HTMLDivElement> })`, `AlertTitle`, `AlertDescription`
  - `Skeleton(React.ComponentProps<'div'>)`

- [ ] **Step 1: Create `button.tsx`**

```tsx
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default: 'bg-accent text-accent-foreground hover:opacity-90',
        secondary: 'bg-muted text-foreground border border-border hover:bg-card',
        destructive: 'bg-danger text-danger-foreground hover:opacity-90',
        success: 'bg-success text-success-foreground hover:opacity-90',
        warning: 'bg-warning text-warning-foreground hover:opacity-90',
        outline: 'border border-border bg-transparent hover:bg-muted',
        ghost: 'bg-transparent hover:bg-muted',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 text-xs',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
```

- [ ] **Step 2: Create `card.tsx`**

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

export function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('rounded-lg border border-border bg-card text-card-foreground shadow-sm', className)}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-col gap-1.5 p-6', className)} {...props} />
}

export function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('text-xl font-semibold leading-none', className)} {...props} />
}

export function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('text-sm text-muted-foreground', className)} {...props} />
}

export function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />
}

export function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex items-center p-6 pt-0', className)} {...props} />
}
```

- [ ] **Step 3: Create `badge.tsx`**

```tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-mono font-medium',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-accent text-accent-foreground',
        secondary: 'border-transparent bg-muted text-muted-foreground',
        outline: 'border-border text-foreground',
        success: 'border-transparent bg-success/15 text-success',
        warning: 'border-transparent bg-warning/15 text-warning',
        destructive: 'border-transparent bg-danger/15 text-danger',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
```

- [ ] **Step 4: Create `input.tsx`, `label.tsx`, `textarea.tsx`**

`web/src/components/ui/input.tsx`:
```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'
```

`web/src/components/ui/label.tsx`:
```tsx
import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@/lib/utils'

export function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn('text-sm font-medium leading-none mb-2 block', className)}
      {...props}
    />
  )
}
```

`web/src/components/ui/textarea.tsx`:
```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
)
Textarea.displayName = 'Textarea'
```

- [ ] **Step 5: Create `alert.tsx`**

```tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const alertVariants = cva('relative w-full rounded-lg border p-4 text-sm', {
  variants: {
    variant: {
      default: 'border-border bg-card text-card-foreground',
      destructive: 'border-danger/40 bg-danger/10 text-danger [&_p]:text-danger',
    },
  },
  defaultVariants: { variant: 'default' },
})

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

export function Alert({ className, variant, ...props }: AlertProps) {
  return <div role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
}

export function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('mb-1 font-medium leading-none', className)} {...props} />
}

export function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('text-sm leading-relaxed', className)} {...props} />
}
```

- [ ] **Step 6: Create `skeleton.tsx`**

```tsx
import { cn } from '@/lib/utils'

export function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />
}
```

- [ ] **Step 7: Verify build**

Run:
```bash
npx vitest run
npm run lint
npm run build
```
Expected: all pass (these files aren't imported by any page yet, so nothing behaviorally changes — this step catches TypeScript/lint errors in the new files themselves).

- [ ] **Step 8: Commit**

```bash
git add web/src/components/ui/button.tsx web/src/components/ui/card.tsx web/src/components/ui/badge.tsx web/src/components/ui/input.tsx web/src/components/ui/label.tsx web/src/components/ui/textarea.tsx web/src/components/ui/alert.tsx web/src/components/ui/skeleton.tsx
git commit -m "feat: add core UI primitives (button, card, badge, input, label, textarea, alert, skeleton)"
```

---

### Task 3: Select, Sheet, and toast primitives

**Files:**
- Create: `web/src/components/ui/select.tsx`
- Create: `web/src/components/ui/sheet.tsx`
- Create: `web/src/components/ui/sonner.tsx`
- Modify: `web/src/main.tsx`

**Interfaces:**
- Consumes: `cn` from `@/lib/utils` (Task 1).
- Produces (used by Tasks 4, 7, 11): `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem` (thin wrappers over `@radix-ui/react-select`, same composition API).
- Produces (used by Task 4): `Sheet`, `SheetTrigger`, `SheetContent`, `SheetClose`, `SheetHeader`, `SheetTitle` (thin wrappers over `@radix-ui/react-dialog`, styled as a right-side slide-in panel).
- Produces (used by Tasks 9, 12): `toast` re-exported from `sonner`, callable as `toast.error(message: string)` / `toast.success(message: string)`. The `Toaster` component is mounted once in `main.tsx`.

- [ ] **Step 1: Create `select.tsx`**

```tsx
import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Select = SelectPrimitive.Root
export const SelectValue = SelectPrimitive.Value

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = 'SelectTrigger'

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-card text-card-foreground shadow-md',
        position === 'popper' && 'translate-y-1',
        className
      )}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = 'SelectContent'

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = 'SelectItem'
```

- [ ] **Step 2: Create `sheet.tsx`**

```tsx
import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Sheet = DialogPrimitive.Root
export const SheetTrigger = DialogPrimitive.Trigger
export const SheetClose = DialogPrimitive.Close

export function SheetContent({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60" />
      <DialogPrimitive.Content
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex h-full w-3/4 max-w-xs flex-col gap-4 border-l border-border bg-card p-6 shadow-lg',
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
          <X className="h-4 w-4" />
          <span className="sr-only">Đóng</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-col gap-1', className)} {...props} />
}

export function SheetTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title className={cn('text-lg font-semibold', className)} {...props} />
}
```

- [ ] **Step 3: Create `sonner.tsx`**

```tsx
import { Toaster as Sonner } from 'sonner'

export function Toaster() {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast bg-card text-card-foreground border border-border shadow-lg rounded-lg',
          description: 'text-muted-foreground',
          actionButton: 'bg-accent text-accent-foreground',
          cancelButton: 'bg-muted text-muted-foreground',
        },
      }}
    />
  )
}

export { toast } from 'sonner'
```

- [ ] **Step 4: Mount the Toaster once in `main.tsx`**

Edit `web/src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from './components/ui/sonner.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>,
)
```

- [ ] **Step 5: Verify build**

Run:
```bash
npx vitest run
npm run lint
npm run build
```
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add web/src/components/ui/select.tsx web/src/components/ui/sheet.tsx web/src/components/ui/sonner.tsx web/src/main.tsx
git commit -m "feat: add select, sheet, and toast primitives"
```

---

### Task 4: AppShell layout (header, nav, mobile sheet)

**Files:**
- Create: `web/src/components/layout/AppShell.tsx`
- Create: `web/src/components/layout/AppShell.test.tsx`
- Modify: `web/src/App.tsx`

**Interfaces:**
- Consumes: `useAuth()` from `@/auth/useAuth` (existing — `{ user, logout }`), `Button` (Task 2), `Sheet`/`SheetTrigger`/`SheetContent`/`SheetHeader`/`SheetTitle`/`SheetClose` (Task 3), `NavLink`/`Outlet` from `react-router-dom`.
- Produces: `AppShell` — a layout component with no props, rendered as a React Router layout route wrapping `<Outlet />`; every authenticated page renders inside its `<main>`.

- [ ] **Step 1: Write the AppShell test**

Create `web/src/components/layout/AppShell.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../../auth/AuthContext'
import { AppShell } from './AppShell'

function renderShell(initialPath: string) {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<div>Home content</div>} />
            <Route path="/questions" element={<div>Questions content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  )
}

describe('AppShell', () => {
  it('renders the nav links and the routed page content', () => {
    renderShell('/questions')

    expect(screen.getByRole('link', { name: /kho câu hỏi/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /flashcards/i })).toBeInTheDocument()
    expect(screen.getByText('Questions content')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/layout/AppShell.test.tsx`
Expected: FAIL — `./AppShell` does not exist yet.

- [ ] **Step 3: Create `AppShell.tsx`**

```tsx
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { useAuth } from '@/auth/useAuth'
import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { to: '/questions', label: 'Kho câu hỏi' },
  { to: '/flashcards', label: 'Flashcards' },
  { to: '/interviews/new', label: 'Phỏng vấn AI' },
  { to: '/progress', label: 'Tiến độ' },
]

function navLinkClassName({ isActive }: { isActive: boolean }) {
  return cn(
    'text-sm font-medium transition-colors hover:text-foreground',
    isActive ? 'text-foreground' : 'text-muted-foreground'
  )
}

function initialsOf(displayName: string) {
  return displayName
    .split(' ')
    .filter(Boolean)
    .slice(-2)
    .map(part => part[0]?.toUpperCase())
    .join('')
}

export function AppShell() {
  const { user, logout } = useAuth()
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4">
          <NavLink to="/" className="font-mono text-sm font-semibold text-foreground">
            Interview Arena
          </NavLink>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map(link => (
              <NavLink key={link.to} to={link.to} className={navLinkClassName}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                aria-label="Đăng xuất"
                title={user.displayName}
              >
                {initialsOf(user.displayName) || 'U'}
              </Button>
            )}
          </div>

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden" aria-label="Mở menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Interview Arena</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4">
                {NAV_LINKS.map(link => (
                  <SheetClose asChild key={link.to}>
                    <NavLink to={link.to} className={navLinkClassName}>
                      {link.label}
                    </NavLink>
                  </SheetClose>
                ))}
                {user && (
                  <SheetClose asChild>
                    <Button variant="ghost" onClick={logout} className="justify-start px-0">
                      Đăng xuất
                    </Button>
                  </SheetClose>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/layout/AppShell.test.tsx`
Expected: PASS.

- [ ] **Step 5: Wire AppShell into routing in `App.tsx`**

Replace `web/src/App.tsx` with (HomePage still defined inline for now — extracted in Task 6):

```tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { useAuth } from './auth/useAuth'
import { AppShell } from './components/layout/AppShell'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { QuestionBankPage } from './pages/QuestionBankPage'
import { QuestionDetailPage } from './pages/QuestionDetailPage'
import { FlashcardsPage } from './pages/FlashcardsPage'
import { QuizPage } from './pages/QuizPage'
import { InterviewSetupPage } from './pages/InterviewSetupPage'
import { InterviewSessionPage } from './pages/InterviewSessionPage'
import { ProgressPage } from './pages/ProgressPage'

function HomePage() {
  const { user, logout } = useAuth()

  return (
    <div>
      {user ? (
        <>
          <p>
            Xin chào, <strong>{user.displayName}</strong> ({user.email})! Sẵn sàng luyện tập phỏng vấn chưa?
          </p>
          <div>
            <Link to="/questions">Kho câu hỏi</Link>
            <Link to="/flashcards">Ôn tập thẻ nhớ (SRS)</Link>
            <Link to="/interviews/new">Phỏng vấn thử AI 🤖</Link>
            <Link to="/progress">Tiến độ của tôi 📊</Link>
            <button onClick={logout}>Đăng xuất</button>
          </div>
        </>
      ) : (
        <>
          <p>
            Nền tảng luyện phỏng vấn AI, ôn tập câu hỏi qua thẻ ghi nhớ (Flashcards SRS) và mô phỏng phỏng vấn trực tiếp.
          </p>
          <div>
            <Link to="/login">Đăng nhập</Link>
            <Link to="/register">Đăng ký tài khoản</Link>
          </div>
        </>
      )}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<AppShell />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/questions" element={<QuestionBankPage />} />
            <Route path="/questions/:id" element={<QuestionDetailPage />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
            <Route path="/quiz/:questionId" element={<QuizPage />} />
            <Route path="/interviews/new" element={<InterviewSetupPage />} />
            <Route path="/interviews/:sessionId" element={<InterviewSessionPage />} />
            <Route path="/progress" element={<ProgressPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
```

- [ ] **Step 6: Verify build**

Run:
```bash
npx vitest run
npm run lint
npm run build
```
Expected: all pass. Every page except Login/Register now renders inside AppShell's `<main>`; visually pages still look like Task-1 unstyled versions — Tasks 5–13 restyle them.

- [ ] **Step 7: Commit**

```bash
git add web/src/components/layout/AppShell.tsx web/src/components/layout/AppShell.test.tsx web/src/App.tsx
git commit -m "feat: add AppShell layout with header nav and mobile sheet"
```

---

### Task 5: Redesign Login & Register pages

**Files:**
- Modify: `web/src/pages/LoginPage.tsx`
- Modify: `web/src/pages/RegisterPage.tsx`

**Interfaces:**
- Consumes: `Card`/`CardHeader`/`CardTitle`/`CardContent` (Task 2), `Input`, `Label`, `Button`, `Alert`/`AlertDescription` (Task 2).

- [ ] **Step 1: Run existing tests as a baseline**

Run: `npx vitest run` (no dedicated Login/Register test files exist today — this confirms nothing else broke first).
Expected: PASS.

- [ ] **Step 2: Rewrite `LoginPage.tsx`**

```tsx
import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Email hoặc mật khẩu không đúng')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-mono text-2xl text-accent">Đăng nhập</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nhap@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={loading} className="mt-2 w-full">
              {loading ? 'Đang xử lý...' : 'Đăng nhập'}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Chưa có tài khoản?{' '}
            <Link className="font-medium text-accent hover:underline" to="/register">
              Đăng ký
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
```

- [ ] **Step 3: Rewrite `RegisterPage.tsx`**

```tsx
import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await register(email, password, displayName)
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Đăng ký thất bại, email có thể đã được sử dụng')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-mono text-2xl text-accent">Đăng ký</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="displayName">Tên hiển thị</Label>
              <Input
                id="displayName"
                type="text"
                placeholder="Nguyễn Văn A"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nhap@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="Tối thiểu 8 ký tự"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={loading} className="mt-2 w-full">
              {loading ? 'Đang xử lý...' : 'Đăng ký'}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Đã có tài khoản?{' '}
            <Link className="font-medium text-accent hover:underline" to="/login">
              Đăng nhập
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
```

- [ ] **Step 4: Verify**

Run:
```bash
npx vitest run
npm run lint
npm run build
```
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add web/src/pages/LoginPage.tsx web/src/pages/RegisterPage.tsx
git commit -m "style: redesign login and register pages with design system"
```

---

### Task 6: Extract and redesign Home page

**Files:**
- Create: `web/src/pages/HomePage.tsx`
- Create: `web/src/pages/HomePage.test.tsx`
- Modify: `web/src/App.tsx`

**Interfaces:**
- Consumes: `useAuth()`, `Card`/`CardHeader`/`CardTitle`/`CardDescription`/`CardContent` (Task 2), `Button` (Task 2, via `asChild` + `Link`).
- Produces: `HomePage` component (default export not needed — named export `HomePage`), imported by `App.tsx`.

- [ ] **Step 1: Write the HomePage test**

Create `web/src/pages/HomePage.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../auth/AuthContext'
import { HomePage } from './HomePage'

describe('HomePage', () => {
  it('shows login/register CTAs when logged out', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </AuthProvider>
    )

    expect(screen.getByRole('link', { name: 'Đăng nhập' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Đăng ký tài khoản' })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/pages/HomePage.test.tsx`
Expected: FAIL — `./HomePage` does not exist yet.

- [ ] **Step 3: Create `HomePage.tsx`**

```tsx
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function HomePage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-8 py-16 text-center">
        <h1 className="font-mono text-4xl font-semibold text-accent md:text-5xl">Interview Arena</h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Nền tảng luyện phỏng vấn AI, ôn tập câu hỏi qua thẻ ghi nhớ (Flashcards SRS) và mô phỏng phỏng vấn trực tiếp.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link to="/login">Đăng nhập</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/register">Đăng ký tài khoản</Link>
          </Button>
        </div>
      </div>
    )
  }

  const tiles = [
    { to: '/questions', title: 'Kho câu hỏi', description: 'Duyệt và luyện tập theo vị trí, công nghệ, trình độ.' },
    { to: '/flashcards', title: 'Ôn tập thẻ nhớ (SRS)', description: 'Ghi nhớ lâu dài với lịch ôn tập thông minh.' },
    { to: '/interviews/new', title: 'Phỏng vấn thử AI 🤖', description: 'Mô phỏng phỏng vấn thật với AI Interviewer.' },
    { to: '/progress', title: 'Tiến độ của tôi 📊', description: 'Xem lại thống kê luyện tập của bạn.' },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-mono text-2xl font-semibold">
          Xin chào, <span className="text-accent">{user.displayName}</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Xin chào, <strong>{user.displayName}</strong> ({user.email})! Sẵn sàng luyện tập phỏng vấn chưa?
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {tiles.map(tile => (
          <Link key={tile.to} to={tile.to}>
            <Card className="h-full transition-colors hover:border-accent">
              <CardHeader>
                <CardTitle className="text-base">{tile.title}</CardTitle>
                <CardDescription>{tile.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

Note: the logout button/link previously on Home moved permanently into `AppShell` (Task 4) — this is where "Đăng xuất" now lives for logged-in users, so it isn't duplicated on Home.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/pages/HomePage.test.tsx`
Expected: PASS.

- [ ] **Step 5: Wire `HomePage` into `App.tsx`**

Edit `web/src/App.tsx`: remove the inline `HomePage` function and the now-unused `useAuth`/`Link` imports it required, add `import { HomePage } from './pages/HomePage'`:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { AppShell } from './components/layout/AppShell'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { QuestionBankPage } from './pages/QuestionBankPage'
import { QuestionDetailPage } from './pages/QuestionDetailPage'
import { FlashcardsPage } from './pages/FlashcardsPage'
import { QuizPage } from './pages/QuizPage'
import { InterviewSetupPage } from './pages/InterviewSetupPage'
import { InterviewSessionPage } from './pages/InterviewSessionPage'
import { ProgressPage } from './pages/ProgressPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<AppShell />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/questions" element={<QuestionBankPage />} />
            <Route path="/questions/:id" element={<QuestionDetailPage />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
            <Route path="/quiz/:questionId" element={<QuizPage />} />
            <Route path="/interviews/new" element={<InterviewSetupPage />} />
            <Route path="/interviews/:sessionId" element={<InterviewSessionPage />} />
            <Route path="/progress" element={<ProgressPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
```

- [ ] **Step 6: Verify**

Run:
```bash
npx vitest run
npm run lint
npm run build
```
Expected: all pass.

- [ ] **Step 7: Commit**

```bash
git add web/src/pages/HomePage.tsx web/src/pages/HomePage.test.tsx web/src/App.tsx
git commit -m "style: extract and redesign home page"
```

---

### Task 7: Redesign Question Bank page

**Files:**
- Modify: `web/src/pages/QuestionBankPage.tsx`

**Interfaces:**
- Consumes: `Card`/`CardContent` (Task 2), `Badge` (Task 2), `Select`/`SelectTrigger`/`SelectValue`/`SelectContent`/`SelectItem` (Task 3), `Input`, `Label`, `Button` (Task 2), `Skeleton` (Task 2).
- Existing test `QuestionBankPage.test.tsx` asserts `screen.getByText('react q1')` — the question title text must still render exactly as `slug.replace(/-/g, ' ')`.

- [ ] **Step 1: Run the existing test as a baseline**

Run: `npx vitest run src/pages/QuestionBankPage.test.tsx`
Expected: PASS (current implementation).

- [ ] **Step 2: Rewrite `QuestionBankPage.tsx`**

```tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { questionsApi } from '../api/questions'
import type { QuestionSummary } from '../types/question'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

const POSITIONS = ['frontend', 'backend', 'devops', 'ai', 'database']
const LEVELS = ['junior', 'mid', 'senior']

export function QuestionBankPage() {
  const [position, setPosition] = useState('frontend')
  const [technology, setTechnology] = useState('react')
  const [level, setLevel] = useState('junior')
  const [questions, setQuestions] = useState<QuestionSummary[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setPage(0)
  }, [position, technology, level])

  useEffect(() => {
    setLoading(true)
    questionsApi.list(position, technology.toLowerCase(), level, page, 10)
      .then(res => {
        setQuestions(res.content)
        setTotalPages(res.totalPages)
      })
      .finally(() => setLoading(false))
  }, [position, technology, level, page])

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-mono text-3xl font-semibold">Kho câu hỏi</h1>

      <Card>
        <CardContent className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-3">
          <div>
            <Label htmlFor="position">Vị trí</Label>
            <Select value={position} onValueChange={setPosition}>
              <SelectTrigger id="position"><SelectValue /></SelectTrigger>
              <SelectContent>
                {POSITIONS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="technology">Công nghệ</Label>
            <Input
              id="technology"
              value={technology}
              onChange={e => setTechnology(e.target.value)}
              placeholder="Ví dụ: react, spring-boot"
            />
          </div>
          <div>
            <Label htmlFor="level">Trình độ</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger id="level"><SelectValue /></SelectTrigger>
              <SelectContent>
                {LEVELS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}
        </div>
      ) : questions.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Không tìm thấy câu hỏi nào phù hợp với bộ lọc hiện tại.
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {questions.map(q => (
            <Link key={q.id} to={`/questions/${q.id}`}>
              <Card className="transition-colors hover:border-accent">
                <CardContent className="flex flex-col gap-2 py-4">
                  <h2 className="text-lg font-medium capitalize">{q.slug.replace(/-/g, ' ')}</h2>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{q.position}</Badge>
                    <Badge variant="secondary">{q.technology}</Badge>
                    <Badge variant="outline">{q.level}</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="sm"
                disabled={page === 0}
                onClick={() => setPage(p => Math.max(0, p - 1))}
              >
                Trang trước
              </Button>
              <span className="text-sm text-muted-foreground">
                Trang <strong className="text-foreground">{page + 1}</strong> / {totalPages}
              </span>
              <Button
                variant="secondary"
                size="sm"
                disabled={page >= totalPages - 1}
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              >
                Trang sau
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Run the existing test to verify it still passes**

Run: `npx vitest run src/pages/QuestionBankPage.test.tsx`
Expected: PASS.

- [ ] **Step 4: Verify lint and build**

Run:
```bash
npm run lint
npm run build
```
Expected: both pass.

- [ ] **Step 5: Commit**

```bash
git add web/src/pages/QuestionBankPage.tsx
git commit -m "style: redesign question bank page with design system"
```

---

### Task 8: Redesign Question Detail page

**Files:**
- Modify: `web/src/pages/QuestionDetailPage.tsx`

**Interfaces:**
- Consumes: `Card`/`CardContent` (Task 2), `Badge` (Task 2), `Button` (Task 2), `Alert`/`AlertDescription` (Task 2), `Skeleton` (Task 2), existing `MarkdownRenderer`.

- [ ] **Step 1: Run existing tests as a baseline**

Run: `npx vitest run` (no dedicated test file for this page today).
Expected: PASS.

- [ ] **Step 2: Rewrite `QuestionDetailPage.tsx`**

```tsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { questionsApi } from '../api/questions'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import type { QuestionDetail } from '../types/question'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'

export function QuestionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [detail, setDetail] = useState<QuestionDetail | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      setLoading(true)
      setError(null)
      questionsApi.detail(id)
        .then(setDetail)
        .catch(err => {
          setError(err.message || 'Không thể tải chi tiết câu hỏi này.')
        })
        .finally(() => setLoading(false))
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (error || !detail) {
    return (
      <div className="flex flex-col gap-6">
        <Alert variant="destructive">
          <AlertDescription>{error || 'Không tìm thấy câu hỏi.'}</AlertDescription>
        </Alert>
        <Button asChild variant="secondary" className="w-fit">
          <Link to="/questions">Quay lại kho câu hỏi</Link>
        </Button>
      </div>
    )
  }

  const isQuiz = detail.markdownBody.includes('## Đáp án trắc nghiệm')

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-mono text-2xl font-semibold capitalize">{detail.slug.replace(/-/g, ' ')}</h1>
          <div className="mt-2 flex gap-2">
            <Badge variant="secondary">{detail.position}</Badge>
            <Badge variant="secondary">{detail.technology}</Badge>
            <Badge variant="outline">{detail.level}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          {isQuiz && (
            <Button asChild size="sm">
              <Link to={`/quiz/${detail.id}`}>Làm trắc nghiệm 📝</Link>
            </Button>
          )}
          <Button asChild variant="secondary" size="sm">
            <Link to="/questions">Quay lại</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="prose prose-invert max-w-none py-8">
          <MarkdownRenderer content={detail.markdownBody} />
        </CardContent>
      </Card>
    </div>
  )
}
```

- [ ] **Step 3: Verify**

Run:
```bash
npx vitest run
npm run lint
npm run build
```
Expected: all pass.

- [ ] **Step 4: Commit**

```bash
git add web/src/pages/QuestionDetailPage.tsx
git commit -m "style: redesign question detail page with design system"
```

---

### Task 9: Redesign Quiz page

**Files:**
- Modify: `web/src/pages/QuizPage.tsx`

**Interfaces:**
- Consumes: `Card`/`CardContent` (Task 2), `Badge` (Task 2), `Button` (Task 2), `cn` (Task 1), `toast` from `@/components/ui/sonner` (Task 3), existing `MarkdownRenderer`.
- Existing test `QuizPage.test.tsx` requires: option text `'Đúng'` is clickable via `screen.getByText('Đúng')` (must remain a `<button>` or clickable element with that exact visible text, not wrapped in extra unclickable markup that changes what `fireEvent.click` hits — clicking the text node itself must fire the option's `onClick`); after submit, text matching `/Chính xác/` must appear.

- [ ] **Step 1: Run the existing test as a baseline**

Run: `npx vitest run src/pages/QuizPage.test.tsx`
Expected: PASS (current implementation).

- [ ] **Step 2: Rewrite `QuizPage.tsx`**

```tsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { questionsApi } from '../api/questions'
import { quizApi, QuizResult } from '../api/quiz'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import type { QuestionDetail } from '../types/question'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { toast } from '@/components/ui/sonner'

function parseOptions(markdownBody: string): string[] {
  const match = markdownBody.match(/## Đáp án trắc nghiệm\s*\n((?:- \[[ x]] .*\n?)+)/)
  if (!match) return []
  return match[1]
    .split('\n')
    .filter(line => line.trim().length > 0)
    .map(line => line.replace(/^- \[[ x]] /, '').trim())
}

export function QuizPage() {
  const { questionId } = useParams<{ questionId: string }>()
  const [detail, setDetail] = useState<QuestionDetail | null>(null)
  const [options, setOptions] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [result, setResult] = useState<QuizResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (questionId) {
      setLoading(true)
      setResult(null)
      setSelectedIndex(null)
      questionsApi.detail(questionId)
        .then(res => {
          setDetail(res)
          setOptions(parseOptions(res.markdownBody))
        })
        .finally(() => setLoading(false))
    }
  }, [questionId])

  async function handleOptionClick(index: number) {
    if (!questionId || result !== null) return
    setSelectedIndex(index)
    try {
      const r = await quizApi.submit(questionId, index)
      setResult(r)
    } catch (err) {
      console.error('Failed to submit choice', err)
      toast.error('Không thể nộp câu trả lời, thử lại sau.')
      setSelectedIndex(null)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-40 w-full" />
      </div>
    )
  }

  if (!detail) {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="font-mono text-2xl font-semibold">Không tìm thấy câu hỏi</h1>
        <Button asChild>
          <Link to="/questions">Quay lại kho câu hỏi</Link>
        </Button>
      </div>
    )
  }

  const explanationSplit = detail.markdownBody.split(/(## Giải thích \(VI\)|## Explanation \(EN\))/i)
  const explanationMarkdown = explanationSplit.length > 2 ? explanationSplit.slice(1).join('\n') : ''
  const questionContent = detail.markdownBody.split(/## Đáp án trắc nghiệm/i)[0]

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="font-mono text-2xl font-semibold">Luyện trắc nghiệm</h1>
        <Button asChild variant="secondary" size="sm">
          <Link to="/questions">Quay lại</Link>
        </Button>
      </div>

      <Card>
        <CardContent className="py-6">
          <div className="mb-3 flex gap-2">
            <Badge variant="secondary">{detail.position}</Badge>
            <Badge variant="secondary">{detail.technology}</Badge>
            <Badge variant="outline">{detail.level}</Badge>
          </div>
          <div className="prose prose-invert max-w-none">
            <MarkdownRenderer content={questionContent} />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3">
        {options.map((option, i) => {
          const isCorrect = result !== null && i === result.correctIndex
          const isWrongSelection = result !== null && i === selectedIndex && !result.correct

          return (
            <button
              key={i}
              onClick={() => handleOptionClick(i)}
              disabled={result !== null}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl border border-border bg-card px-6 py-4 text-left text-base transition-colors',
                result === null && 'hover:border-accent',
                isCorrect && 'border-success bg-success/10',
                isWrongSelection && 'border-danger bg-danger/10'
              )}
            >
              <span className="font-mono font-semibold">{String.fromCharCode(65 + i)}.</span>
              {option}
            </button>
          )
        })}
      </div>

      {result && (
        <Card className={cn(result.correct ? 'border-success' : 'border-danger')}>
          <CardContent className="py-6">
            <h3 className={cn('mb-3 text-xl font-semibold', result.correct ? 'text-success' : 'text-danger')}>
              {result.correct ? 'Chính xác! 🎉' : 'Chưa chính xác. ❌'}
            </h3>
            {explanationMarkdown && (
              <div className="border-t border-border pt-3">
                <h4 className="mb-2 text-base font-medium">Giải thích chi tiết:</h4>
                <div className="prose prose-invert max-w-none text-sm">
                  <MarkdownRenderer content={explanationMarkdown} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Run the existing test to verify it still passes**

Run: `npx vitest run src/pages/QuizPage.test.tsx`
Expected: PASS.

- [ ] **Step 4: Verify lint and build**

Run:
```bash
npm run lint
npm run build
```
Expected: both pass.

- [ ] **Step 5: Commit**

```bash
git add web/src/pages/QuizPage.tsx
git commit -m "style: redesign quiz page with design system and error toast"
```

---

### Task 10: Redesign Flashcards page

**Files:**
- Modify: `web/src/pages/FlashcardsPage.tsx`

**Interfaces:**
- Consumes: `Card`/`CardContent` (Task 2), `Button` (Task 2), `Skeleton` (Task 2), `cn` (Task 1), existing `MarkdownRenderer`.
- Existing test `FlashcardsPage.test.tsx` — must keep rendering the card slug text and rating buttons with exact labels `Again`/`Hard`/`Good`/`Easy`.

- [ ] **Step 1: Run the existing test as a baseline**

Run: `npx vitest run src/pages/FlashcardsPage.test.tsx`
Expected: PASS.

- [ ] **Step 2: Rewrite `FlashcardsPage.tsx`**

```tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { flashcardsApi, DueCard, ReviewRating } from '../api/flashcards'
import { questionsApi } from '../api/questions'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import type { QuestionDetail } from '../types/question'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export function FlashcardsPage() {
  const [cards, setCards] = useState<DueCard[] | null>(null)
  const [index, setIndex] = useState(0)
  const [detail, setDetail] = useState<QuestionDetail | null>(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [loadingCard, setLoadingCard] = useState(false)

  useEffect(() => {
    flashcardsApi.due().then(setCards)
  }, [])

  useEffect(() => {
    if (cards && index < cards.length) {
      setLoadingCard(true)
      setIsFlipped(false)
      setDetail(null)
      questionsApi.detail(cards[index].questionId)
        .then(setDetail)
        .finally(() => setLoadingCard(false))
    }
  }, [cards, index])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!cards || index >= cards.length || loadingCard) return
      if (e.key === '1') rate('AGAIN')
      if (e.key === '2') rate('HARD')
      if (e.key === '3') rate('GOOD')
      if (e.key === '4') rate('EASY')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, index, loadingCard])

  async function rate(rating: ReviewRating) {
    if (!cards) return
    await flashcardsApi.review(cards[index].questionId, rating)
    setIndex(i => i + 1)
  }

  if (cards === null) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-72 w-full" />
      </div>
    )
  }

  if (index >= cards.length) {
    return (
      <div className="flex flex-col items-center gap-6 py-12 text-center">
        <h1 className="font-mono text-3xl font-semibold">Hoàn thành!</h1>
        <p className="max-w-md text-muted-foreground">
          Không còn thẻ nào cần ôn tập hôm nay. Chúc mừng bạn đã hoàn thành mục tiêu! 🎉
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link to="/questions">Xem kho câu hỏi</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/">Trang chủ</Link>
          </Button>
        </div>
      </div>
    )
  }

  const card = cards[index]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-mono text-2xl font-semibold">Luyện thẻ nhớ (SRS)</h1>
          <span className="text-sm text-muted-foreground">
            Còn lại: <strong className="text-foreground">{cards.length - index}</strong> thẻ
          </span>
        </div>
        <Button asChild variant="secondary" size="sm">
          <Link to="/">Thoát</Link>
        </Button>
      </div>

      <div className="[perspective:1200px]">
        <Card
          onClick={() => { if (!loadingCard) setIsFlipped(!isFlipped) }}
          className="relative flex min-h-[280px] cursor-pointer flex-col items-center justify-center text-center transition-[transform] duration-300 hover:border-accent [transform-style:preserve-3d]"
          style={{ transform: isFlipped ? 'rotateY(180deg)' : 'none' }}
        >
          <div className="absolute right-4 top-4 text-xs text-muted-foreground [backface-visibility:hidden]">
            {isFlipped ? 'Đang hiện đáp án' : 'Nhấp để lật thẻ'}
          </div>

          <CardContent className="w-full py-6 [backface-visibility:hidden]" style={{ transform: isFlipped ? 'rotateY(180deg)' : 'none' }}>
            {loadingCard ? (
              <p className="text-muted-foreground">Đang tải nội dung...</p>
            ) : !isFlipped ? (
              <div>
                <h2 className="mb-4 text-xl font-semibold capitalize">{card.slug.replace(/-/g, ' ')}</h2>
                {detail && (
                  <div className="prose prose-invert max-w-none text-left text-base">
                    <MarkdownRenderer content={detail.markdownBody.split(/(## Đáp án chi tiết|## Detailed Answer)/i)[0]} />
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full text-left">
                <h2 className="mb-2 border-b border-border pb-2 text-lg font-semibold">Đáp án</h2>
                {detail ? (
                  <div className="prose prose-invert max-w-none text-sm">
                    <MarkdownRenderer content={detail.markdownBody} />
                  </div>
                ) : (
                  <p className="text-muted-foreground">Không tìm thấy đáp án.</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <Button variant="destructive" onClick={() => rate('AGAIN')}>Again</Button>
        <Button variant="warning" onClick={() => rate('HARD')}>Hard</Button>
        <Button onClick={() => rate('GOOD')}>Good</Button>
        <Button variant="success" onClick={() => rate('EASY')}>Easy</Button>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Run the existing test to verify it still passes**

Run: `npx vitest run src/pages/FlashcardsPage.test.tsx`
Expected: PASS.

- [ ] **Step 4: Verify lint and build**

Run:
```bash
npm run lint
npm run build
```
Expected: both pass.

- [ ] **Step 5: Commit**

```bash
git add web/src/pages/FlashcardsPage.tsx
git commit -m "style: redesign flashcards page with real flip animation and keyboard shortcuts"
```

---

### Task 11: Redesign Interview Setup page

**Files:**
- Modify: `web/src/pages/InterviewSetupPage.tsx`

**Interfaces:**
- Consumes: `Card`/`CardHeader`/`CardTitle`/`CardContent` (Task 2), `Select`/`SelectTrigger`/`SelectValue`/`SelectContent`/`SelectItem` (Task 3), `Input`, `Label`, `Button`, `Alert`/`AlertDescription` (Task 2).

- [ ] **Step 1: Run existing tests as a baseline**

Run: `npx vitest run` (no dedicated test file for this page today).
Expected: PASS.

- [ ] **Step 2: Rewrite `InterviewSetupPage.tsx`**

```tsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ApiError } from '../api/client'
import { interviewApi } from '../api/interview'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

const POSITIONS = [
  { value: 'frontend', label: 'Frontend Developer' },
  { value: 'backend', label: 'Backend Developer' },
  { value: 'devops', label: 'DevOps Engineer' },
  { value: 'ai', label: 'AI Engineer' },
  { value: 'database', label: 'Database Administrator' },
]

const LEVELS = [
  { value: 'junior', label: 'Junior' },
  { value: 'mid', label: 'Middle' },
  { value: 'senior', label: 'Senior' },
]

export function InterviewSetupPage() {
  const navigate = useNavigate()
  const [position, setPosition] = useState('frontend')
  const [technology, setTechnology] = useState('React')
  const [level, setLevel] = useState('mid')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function start() {
    if (!technology.trim()) return
    setLoading(true)
    setError(null)
    try {
      const session = await interviewApi.start(position, technology, level)
      navigate(`/interviews/${session.sessionId}`)
    } catch (err) {
      console.error(err)
      if (err instanceof ApiError && err.status === 429) {
        setError('Bạn đã dùng hết lượt phỏng vấn AI miễn phí hôm nay. Nâng cấp Pro để tiếp tục.')
      } else {
        setError('Không thể bắt đầu phỏng vấn, thử lại sau.')
      }
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-mono text-2xl font-semibold">Thiết lập phỏng vấn</h1>
        <Button asChild variant="secondary" size="sm">
          <Link to="/">Hủy</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-normal text-muted-foreground">
            Chọn vị trí tuyển dụng, công nghệ mục tiêu và trình độ mong muốn của bạn. AI sẽ đóng vai người phỏng vấn để kiểm tra kiến thức của bạn.
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div>
            <Label htmlFor="position">Vị trí phỏng vấn</Label>
            <Select value={position} onValueChange={setPosition}>
              <SelectTrigger id="position"><SelectValue /></SelectTrigger>
              <SelectContent>
                {POSITIONS.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="technology">Công nghệ cốt lõi (ví dụ: React, Java, Docker)</Label>
            <Input
              id="technology"
              value={technology}
              onChange={e => setTechnology(e.target.value)}
              placeholder="Ví dụ: React, Spring Boot, AWS"
              required
            />
          </div>

          <div>
            <Label htmlFor="level">Cấp độ chuyên môn</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger id="level"><SelectValue /></SelectTrigger>
              <SelectContent>
                {LEVELS.map(l => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={start} disabled={loading || !technology.trim()} className="mt-2">
            {loading ? 'Đang khởi tạo phiên...' : 'Bắt đầu phỏng vấn'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
```

- [ ] **Step 3: Verify**

Run:
```bash
npx vitest run
npm run lint
npm run build
```
Expected: all pass.

- [ ] **Step 4: Commit**

```bash
git add web/src/pages/InterviewSetupPage.tsx
git commit -m "style: redesign interview setup page with design system"
```

---

### Task 12: Redesign Interview Session page

**Files:**
- Modify: `web/src/pages/InterviewSessionPage.tsx`

**Interfaces:**
- Consumes: `Card`/`CardContent` (Task 2), `Button`, `Textarea` (Task 2), `Alert`/`AlertDescription` (Task 2), `toast` from `@/components/ui/sonner` (Task 3), `cn` (Task 1).
- Existing test `InterviewSessionPage.test.tsx` polls session state and asserts on turn text/status — must preserve `session.turns` rendering structure and the exact visible strings ("AI đang suy nghĩ...", "Gửi", "Đang gửi...", etc).

- [ ] **Step 1: Run the existing test as a baseline**

Run: `npx vitest run src/pages/InterviewSessionPage.test.tsx`
Expected: PASS.

- [ ] **Step 2: Rewrite `InterviewSessionPage.tsx`**

```tsx
import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { interviewApi } from '../api/interview'
import type { InterviewSession } from '../types/interview'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

function getPollInterval() {
  return (window as any).__TEST_POLL_INTERVAL_MS__ || 2000
}

export function InterviewSessionPage() {
  const { sessionId } = useParams<{ sessionId: string }>()
  const [session, setSession] = useState<InterviewSession | null>(null)
  const [answer, setAnswer] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!sessionId) return

    async function poll() {
      try {
        const result = await interviewApi.get(sessionId!)
        setSession(result)
        if (result.status !== 'ACTIVE' && pollRef.current) {
          clearInterval(pollRef.current)
        }
      } catch (err: any) {
        setError(err.message || 'Lỗi kết nối máy chủ.')
      }
    }

    poll()
    pollRef.current = setInterval(poll, getPollInterval())

    return () => {
      if (pollRef.current) clearInterval(pollRef.current)
    }
  }, [sessionId])

  useEffect(() => {
    if (chatEndRef.current && typeof chatEndRef.current.scrollIntoView === 'function') {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [session?.turns])

  async function submit() {
    if (!sessionId || !answer.trim() || submitting) return
    setSubmitting(true)
    setError(null)
    try {
      await interviewApi.submitAnswer(sessionId, answer)
      setAnswer('')
    } catch (err: any) {
      setError(err.message || 'Lỗi gửi câu trả lời.')
      toast.error(err.message || 'Lỗi gửi câu trả lời.')
    } finally {
      setSubmitting(false)
    }
  }

  if (error && !session) {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="font-mono text-2xl font-semibold">Có lỗi xảy ra</h1>
        <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>
        <Button asChild>
          <Link to="/interviews/new">Thiết lập lại</Link>
        </Button>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground">Đang tải phiên phỏng vấn...</p>
      </div>
    )
  }

  const currentTurn = session.turns[session.turns.length - 1]
  const waitingForAnswer = session.status === 'ACTIVE' && currentTurn && currentTurn.answerText === null
  const isFailed = session.status === 'FAILED'

  return (
    <div className="flex h-[85vh] flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="font-mono text-xl font-semibold">Phỏng vấn thử AI</h1>
        <Button asChild variant="secondary" size="sm">
          <Link to="/">Thoát</Link>
        </Button>
      </div>

      <Card className="flex-1 overflow-y-auto">
        <CardContent className="flex flex-col gap-5 py-6">
          {session.turns.map(turn => (
            <div key={turn.turnOrder} className="flex flex-col gap-3">
              <div className="flex justify-start">
                <div className="max-w-[75%] rounded-2xl rounded-bl-sm border border-border bg-background px-5 py-4 text-sm leading-relaxed">
                  <div className="mb-1.5 font-mono text-[11px] font-semibold text-accent">
                    AI INTERVIEWER • CÂU HỎI {turn.turnOrder}
                  </div>
                  {turn.questionText}
                </div>
              </div>

              {turn.answerText && (
                <div className="flex justify-end">
                  <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-accent px-5 py-4 text-sm leading-relaxed text-accent-foreground">
                    <div className="mb-1.5 font-mono text-[11px] font-semibold opacity-70">BẠN</div>
                    {turn.answerText}
                  </div>
                </div>
              )}

              {turn.feedback && (
                <div className="flex justify-start pl-4">
                  <div className="max-w-[70%] rounded-lg border-l-4 border-success bg-success/5 px-4 py-3 text-sm leading-normal">
                    <strong className="text-success">Nhận xét câu trả lời {turn.turnOrder}:</strong> {turn.feedback}
                  </div>
                </div>
              )}
            </div>
          ))}

          {session.status === 'COMPLETED' && (
            <div className="mt-4 flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-success bg-success/5 py-8 text-center">
              <h2 className="text-2xl font-semibold text-success">Phiên phỏng vấn hoàn thành!</h2>
              <p className="text-muted-foreground">
                AI đã đánh giá tổng quan năng lực kỹ thuật và trình bày của bạn.
              </p>
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-success font-mono text-2xl font-bold text-success">
                {session.finalScore}
              </div>
            </div>
          )}

          {isFailed && (
            <Alert variant="destructive">
              <AlertDescription>
                <strong>Lỗi chấm điểm:</strong> LLM phản hồi không đúng định dạng. Phiên phỏng vấn bị hủy.
              </AlertDescription>
            </Alert>
          )}

          {session.status === 'ACTIVE' && !waitingForAnswer && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
              </span>
              <span className="italic">AI đang suy nghĩ và viết câu hỏi tiếp theo...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </CardContent>
      </Card>

      {waitingForAnswer && (
        <div className="flex gap-3">
          <Textarea
            className={cn('h-[60px] flex-1 resize-none')}
            placeholder="Nhập câu trả lời của bạn"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            disabled={submitting}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                submit()
              }
            }}
          />
          <Button className="h-[60px] w-24" onClick={submit} disabled={submitting || !answer.trim()}>
            {submitting ? 'Đang gửi...' : 'Gửi'}
          </Button>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Run the existing test to verify it still passes**

Run: `npx vitest run src/pages/InterviewSessionPage.test.tsx`
Expected: PASS.

- [ ] **Step 4: Verify lint and build**

Run:
```bash
npm run lint
npm run build
```
Expected: both pass.

- [ ] **Step 5: Commit**

```bash
git add web/src/pages/InterviewSessionPage.tsx
git commit -m "style: redesign interview session page with design system and typing indicator"
```

---

### Task 13: Redesign Progress page

**Files:**
- Modify: `web/src/pages/ProgressPage.tsx`

**Interfaces:**
- Consumes: `Card`/`CardContent` (Task 2), `Button` (Task 2), `Alert`/`AlertDescription` (Task 2), `Skeleton` (Task 2), `lucide-react` icons (`Bot`, `TrendingUp`, `Target`, `Layers`, `Lightbulb`).
- Existing test `ProgressPage.test.tsx` — must keep rendering the same numeric values from `progressApi.get()`.

- [ ] **Step 1: Run the existing test as a baseline**

Run: `npx vitest run src/pages/ProgressPage.test.tsx`
Expected: PASS.

- [ ] **Step 2: Rewrite `ProgressPage.tsx`**

```tsx
import { useEffect, useState } from 'react'
import { progressApi, Progress } from '../api/progress'
import { Link } from 'react-router-dom'
import { Bot, TrendingUp, Target, Layers, Lightbulb } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'

export function ProgressPage() {
  const [progress, setProgress] = useState<Progress | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    progressApi.get()
      .then(setProgress)
      .catch((e: any) => {
        setError(e.message || 'Không thể tải dữ liệu tiến độ.')
      })
  }, [])

  if (error) {
    return (
      <div className="flex flex-col gap-6">
        <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>
        <Button asChild variant="secondary" className="w-fit">
          <Link to="/">Trang chủ</Link>
        </Button>
      </div>
    )
  }

  if (!progress) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
      </div>
    )
  }

  const stats = [
    { icon: Bot, label: 'Phỏng vấn AI đã xong', value: progress.completedInterviews },
    { icon: TrendingUp, label: 'Điểm phỏng vấn TB', value: progress.averageInterviewScore.toFixed(1) },
    { icon: Target, label: 'Độ chính xác Quiz', value: `${progress.quizAccuracyPercent.toFixed(1)}%` },
    { icon: Layers, label: 'Thẻ ghi nhớ đã ôn', value: progress.cardsReviewedTotal },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-mono text-3xl font-semibold">Tiến độ học tập</h1>
        <p className="mt-2 text-muted-foreground">Xem lại quá trình luyện tập và kết quả của bạn</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <Card key={stat.label}>
            <CardContent className="flex flex-col items-center justify-center gap-2 py-8 text-center">
              <stat.icon className="h-7 w-7 text-accent" />
              <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
              <div className="font-mono text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-accent/40 bg-accent/5">
        <CardContent className="flex gap-3 py-6">
          <Lightbulb className="h-6 w-6 shrink-0 text-accent" />
          <div>
            <h3 className="mb-2 text-lg font-semibold">Lời khuyên từ AI Arena</h3>
            {progress.completedInterviews === 0 && progress.cardsReviewedTotal === 0 ? (
              <p className="leading-relaxed">
                Bắt đầu hành trình của bạn bằng cách duyệt qua kho câu hỏi, luyện thẻ nhớ hoặc thử sức với một buổi phỏng vấn AI ngay!
              </p>
            ) : (
              <p className="leading-relaxed">
                Bạn đang có những bước tiến tuyệt vời! Hãy duy trì việc luyện tập thẻ nhớ (SRS) hằng ngày để ghi nhớ lâu hơn, và định kỳ thực hiện các bài phỏng vấn thử với AI để rèn luyện kỹ năng phản xạ và diễn đạt.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

- [ ] **Step 3: Run the existing test to verify it still passes**

Run: `npx vitest run src/pages/ProgressPage.test.tsx`
Expected: PASS.

- [ ] **Step 4: Verify lint and build**

Run:
```bash
npm run lint
npm run build
```
Expected: both pass.

- [ ] **Step 5: Commit**

```bash
git add web/src/pages/ProgressPage.tsx
git commit -m "style: redesign progress page with design system and lucide icons"
```

---

### Task 14: Remove dead CSS and final verification

**Files:**
- Modify: `web/src/App.css`
- Verify (no changes expected): `web/src/index.css` (already rewritten in Task 1)

**Interfaces:** None — this task only deletes unused code and re-verifies the whole app.

- [ ] **Step 1: Confirm `App.css` is unreferenced**

Run (from `web/`):
```bash
grep -rn "App.css" src
```
Expected: no output — no component imports `App.css` anymore (it was never imported by the redesigned pages; check `src/App.tsx` and `src/main.tsx` specifically since those are the only files that historically imported it).

- [ ] **Step 2: Delete `App.css`**

If Step 1 confirms it's unreferenced, delete the file:
```bash
rm web/src/App.css
```
If any import is found, remove that import line first, then delete the file.

- [ ] **Step 3: Run the full verification suite**

Run (from `web/`):
```bash
npx vitest run
npm run lint
npm run build
```
Expected: all pass — this is the final regression gate for the whole redesign.

- [ ] **Step 4: Manual smoke check**

Run `npm run dev`, open the app in a browser, and click through: Home (logged out) → Register → Home (logged in) → Question Bank → a question detail → Quiz (if applicable) → Flashcards → Interview Setup → Progress → logout via the header. Confirm: dark theme renders, header nav highlights the active route, mobile width (resize <768px) collapses nav into the hamburger sheet, and no console errors appear.

- [ ] **Step 5: Commit**

```bash
git add web/src/App.css
git commit -m "chore: remove dead Vite-template CSS after design system migration"
```

---

## Self-Review Notes

- **Spec coverage:** Tailwind+shadcn stack (Task 1–3), dark-mode-first tokens (Task 1), AppShell top nav + mobile sheet (Task 4), every page in the spec's page-by-page section has its own task (Tasks 5, 6–13), shared loading/error/empty states applied per page as it's redesigned, toast added for the two failure paths called out in the spec (Quiz submit, Interview answer submit — Tasks 9 & 12), dead CSS removal (Task 14). All covered.
- **Copy preservation:** every task's rewritten JSX keeps the exact Vietnamese strings from the original file — verified line-by-line against the Read output captured during planning.
- **Type/signature consistency:** `Button` variant names (`default/secondary/destructive/success/warning/outline/ghost`) defined in Task 2 are the exact set used in Tasks 9 (Quiz — via inline classes, not Button, so N/A), 10 (Flashcards — `destructive/warning/default/success`), 13 (Progress — none needed). `Select`/`SelectTrigger`/`SelectValue`/`SelectContent`/`SelectItem` names from Task 3 match usage in Tasks 7 and 11 exactly. `toast.error` from Task 3 matches usage in Tasks 9 and 12.
