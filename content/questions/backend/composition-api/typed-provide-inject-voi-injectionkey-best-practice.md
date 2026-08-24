---
id: typed-provide-inject-voi-injectionkey-best-practice
position: backend
technology: composition-api
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Typed `provide` / `inject` với InjectionKey — best practice?

## Question (EN)
Typed `provide` / `inject` with InjectionKey — best practice?

## Đáp án chi tiết (VI)
$79

## Detailed Answer (EN)
Use `InjectionKey` for type-safe provide/inject with no string collision:\
\
```typescript\
// keys.ts\
import type { InjectionKey, Ref } from 'vue'\
\
export const themeKey: InjectionKey\u003cRef\u003c'light' | 'dark'\u003e\u003e = Symbol('theme')\
export const userKey: InjectionKey\u003cUserContext\u003e = Symbol('user')\
\
// Parent\
const theme = ref\u003c'light' | 'dark'\u003e('dark')\
provide(themeKey, theme)\
\
// Child — fully typed, no string guessing\
const theme = inject(themeKey)          // Ref\u003c'light'|'dark'\u003e | undefined\
const theme = inject(themeKey, ref('light'))  // With default — no undefined\
```\
\
Use `Symbol` keys instead of strings to avoid naming collisions in large apps or libraries.
