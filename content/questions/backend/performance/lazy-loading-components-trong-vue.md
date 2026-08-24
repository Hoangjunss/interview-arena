---
id: lazy-loading-components-trong-vue
position: backend
technology: performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lazy loading components trong Vue?

## Question (EN)
Lazy loading components in Vue?

## Đáp án chi tiết (VI)
Dùng dynamic import để lazy load component — chỉ download khi cần:\
```javascript\
import { defineAsyncComponent } from 'vue'\
\
// Basic\
const HeavyChart = defineAsyncComponent(() =\u003e\
  import('./components/HeavyChart.vue')\
)\
\
// Với loading/error states\
const AsyncComp = defineAsyncComponent({\
  loader: () =\u003e import('./HeavyComponent.vue'),\
  loadingComponent: LoadingSpinner,\
  errorComponent: ErrorDisplay,\
  delay: 200,      // delay trước khi show loading\
  timeout: 3000,   // timeout sau 3s\
})\
```\
Kết hợp với `\u003cSuspense\u003e` để handle loading state elegantly.

## Detailed Answer (EN)
Use dynamic import to lazy load components — only download when needed:\
```javascript\
import { defineAsyncComponent } from 'vue'\
\
// Basic\
const HeavyChart = defineAsyncComponent(() =\u003e\
  import('./components/HeavyChart.vue')\
)\
\
// With loading/error states\
const AsyncComp = defineAsyncComponent({\
  loader: () =\u003e import('./HeavyComponent.vue'),\
  loadingComponent: LoadingSpinner,\
  errorComponent: ErrorDisplay,\
  delay: 200,      // delay before showing loading\
  timeout: 3000,   // timeout after 3s\
})\
```\
Combine with `\u003cSuspense\u003e` to handle loading state elegantly.
