---
id: persist-pinia-store-voi-localstorage
position: backend
technology: pinia
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Persist Pinia store với localStorage?

## Question (EN)
How to persist Pinia store with localStorage?

## Đáp án chi tiết (VI)
Dùng plugin `pinia-plugin-persistedstate`:\
```javascript\
// main.ts\
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'\
const pinia = createPinia()\
pinia.use(piniaPluginPersistedstate)\
\
// store\
export const useAuthStore = defineStore('auth', () =\u003e {\
  const token = ref('')\
  return { token }\
}, {\
  persist: {\
    storage: localStorage,\
    pick: ['token'],  // chỉ persist token\
  }\
})\
```\
Lưu ý: không persist sensitive data trong localStorage (dễ bị XSS đọc). Dùng `sessionStorage` hoặc HTTP-only cookies cho auth tokens.

## Detailed Answer (EN)
Use `pinia-plugin-persistedstate`:\
```javascript\
// main.ts\
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'\
const pinia = createPinia()\
pinia.use(piniaPluginPersistedstate)\
\
// store\
export const useAuthStore = defineStore('auth', () =\u003e {\
  const token = ref('')\
  return { token }\
}, {\
  persist: {\
    storage: localStorage,\
    pick: ['token'],  // only persist token\
  }\
})\
```\
Pitfall: do not persist sensitive data in localStorage (easily read via XSS). Use `sessionStorage` for session-scoped tokens, or HTTP-only cookies (set via server `Set-Cookie` header — cannot be set from client-side JS) for auth tokens.
