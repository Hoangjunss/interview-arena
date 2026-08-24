---
id: error-handling-trong-vue-errorcaptured-va-onerrorcaptured
position: backend
technology: chuyên-sâu
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Error handling trong Vue: errorCaptured và onErrorCaptured?

## Question (EN)
Error handling in Vue: errorCaptured and onErrorCaptured?

## Đáp án chi tiết (VI)
Vue cung cấp error boundary mechanism qua `errorCaptured` (Options API) / `onErrorCaptured` (Composition API):\
```javascript\
// App.vue — global error boundary\
import { onErrorCaptured } from 'vue'\
\
onErrorCaptured((err, instance, info) =\u003e {\
  console.error('Caught:', err, info)\
  // Return false để prevent propagation\
  return false\
})\
```\
Global handler: `app.config.errorHandler = (err, instance, info) =\u003e { ... }`. Error types caught: lifecycle hooks, event handlers, async errors trong setup, child component errors. Lưu ý: không catch errors trong async callbacks không thuộc Vue (setTimeout, fetch handlers) — cần try/catch thủ công.

## Detailed Answer (EN)
Vue provides an error boundary mechanism via `errorCaptured` (Options API) / `onErrorCaptured` (Composition API):\
```javascript\
// App.vue — global error boundary\
import { onErrorCaptured } from 'vue'\
\
onErrorCaptured((err, instance, info) =\u003e {\
  console.error('Caught:', err, info)\
  // Return false to prevent propagation\
  return false\
})\
```\
Global handler: `app.config.errorHandler = (err, instance, info) =\u003e { ... }`. Errors caught: lifecycle hooks, event handlers, async errors in setup, child component errors. Pitfall: does NOT catch errors in non-Vue async callbacks (setTimeout, fetch handlers) — need manual try/catch.
