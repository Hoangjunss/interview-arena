---
id: cach-fetch-async-data-dung-cach-trong-vue-3-composition-api
position: backend
technology: composition-api
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách fetch async data đúng cách trong Vue 3 Composition API?

## Question (EN)
How to properly fetch async data in Vue 3 Composition API?

## Đáp án chi tiết (VI)
Pattern chuẩn để fetch async data trong Vue 3 Composition API là dùng `onMounted` với try/catch/finally, hoặc trích xuất thành composable tái sử dụng.\
```vue\
\u003cscript setup\u003e\
import { ref, onMounted } from 'vue'\
\
const users = ref([])\
const loading = ref(true)\
const error = ref(null)\
\
// Pattern 1: onMounted (phổ biến nhất)\
onMounted(async () =\u003e {\
  try {\
    const res = await fetch('/api/users')\
    users.value = await res.json()\
  } catch (e) {\
    error.value = e.message\
  } finally {\
    loading.value = false\
  }\
})\
\
// Pattern 2: Composable reusable\
// useFetch.ts — tái sử dụng ở nhiều components\
\u003c/script\u003e\
\
\u003ctemplate\u003e\
  \u003cdiv v-if=\\"loading\\"\u003eLoading...\u003c/div\u003e\
  \u003cdiv v-else-if=\\"error\\"\u003eError: {{ error }}\u003c/div\u003e\
  \u003cul v-else\u003e\
    \u003cli v-for=\\"u in users\\" :key=\\"u.id\\"\u003e{{ u.name }}\u003c/li\u003e\
  \u003c/ul\u003e\
\u003c/template\u003e\
```\
Lưu ý: không gọi `async setup()` trực tiếp mà không có `\u003cSuspense\u003e` bọc ngoài — dùng `onMounted` hoặc composable thay. Với Nuxt: dùng `useFetch()` / `useAsyncData()` để SSR-compatible.

## Detailed Answer (EN)
The standard pattern for fetching async data in Vue 3 Composition API is to use `onMounted` with try/catch/finally, or extract it into a reusable composable.\
```vue\
\u003cscript setup\u003e\
import { ref, onMounted } from 'vue'\
\
const data = ref(null)\
const loading = ref(true)\
const error = ref(null)\
\
onMounted(async () =\u003e {\
  try {\
    const res = await fetch('/api/data')\
    data.value = await res.json()\
  } catch (e) {\
    error.value = e.message\
  } finally {\
    loading.value = false\
  }\
})\
\u003c/script\u003e\
\
\u003ctemplate\u003e\
  \u003cdiv v-if=\\"loading\\"\u003eLoading...\u003c/div\u003e\
  \u003cdiv v-else-if=\\"error\\"\u003e{{ error }}\u003c/div\u003e\
  \u003cdiv v-else\u003e{{ data }}\u003c/div\u003e\
\u003c/template\u003e\
```\
Pitfall: do not use `async setup()` without a `\u003cSuspense\u003e` wrapper — use `onMounted` or a composable instead. In Nuxt: use `useFetch()` / `useAsyncData()` for SSR compatibility.
