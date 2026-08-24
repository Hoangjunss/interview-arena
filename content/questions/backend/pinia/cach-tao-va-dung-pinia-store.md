---
id: cach-tao-va-dung-pinia-store
position: backend
technology: pinia
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách tạo và dùng Pinia store?

## Question (EN)
How to create and use a Pinia store?

## Đáp án chi tiết (VI)
Pinia stores được tạo với `defineStore()` dùng setup-store syntax (khuyến nghị), trả về refs cho state, computed getters, và action functions.\
```javascript\
// stores/counter.ts\
import { defineStore } from 'pinia'\
import { ref, computed } from 'vue'\
\
export const useCounterStore = defineStore('counter', () =\u003e {\
  const count = ref(0)\
  const double = computed(() =\u003e count.value * 2)\
\
  function increment() { count.value++ }\
  function reset() { count.value = 0 }\
\
  return { count, double, increment, reset }\
})\
```\
```javascript\
// Trong component\
import { useCounterStore } from '@/stores/counter'\
const store = useCounterStore()\
store.increment()\
console.log(store.count, store.double)\
```\
Lưu ý: destructure store mất reactivity — dùng `storeToRefs`: `const { count, double } = storeToRefs(store)` (methods thì destructure thường).

## Detailed Answer (EN)
Use `defineStore()` with setup-store syntax (recommended) — refs become state, computed values become getters, functions become actions.\
```javascript\
// stores/counter.ts\
import { defineStore } from 'pinia'\
import { ref, computed } from 'vue'\
\
export const useCounterStore = defineStore('counter', () =\u003e {\
  const count = ref(0)\
  const double = computed(() =\u003e count.value * 2)\
\
  function increment() { count.value++ }\
  function reset() { count.value = 0 }\
\
  return { count, double, increment, reset }\
})\
```\
```javascript\
// In component\
import { useCounterStore } from '@/stores/counter'\
const store = useCounterStore()\
store.increment()\
console.log(store.count, store.double)\
```\
Pitfall: destructuring store loses reactivity — use `storeToRefs`: `const { count, double } = storeToRefs(store)` (methods can be destructured normally).
