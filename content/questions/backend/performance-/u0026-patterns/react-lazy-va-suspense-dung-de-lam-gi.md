---
id: react-lazy-va-suspense-dung-de-lam-gi
position: backend
technology: performance-\u0026-patterns
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
React.lazy và Suspense dùng để làm gì?

## Question (EN)
What are React.lazy and Suspense used for?

## Đáp án chi tiết (VI)
React.lazy cho phép lazy load component, chỉ download JavaScript khi component cần render. Suspense hiển thị fallback UI trong khi component đang load. Giúp code splitting, giảm initial bundle size.\
```tsx\
import { lazy, Suspense } from 'react'\
\
// Bundle của HeavyChart chỉ download khi cần\
const HeavyChart = lazy(() =\u003e import('./HeavyChart'))\
\
const Dashboard = () =\u003e {\
  const [showChart, setShowChart] = useState(false)\
\
  return (\
    \u003cdiv\u003e\
      \u003cbutton onClick={() =\u003e setShowChart(true)}\u003eLoad Chart\u003c/button\u003e\
      {showChart \u0026\u0026 (\
        \u003cSuspense fallback={\u003cdiv\u003eLoading chart...\u003c/div\u003e}\u003e\
          \u003cHeavyChart /\u003e\
        \u003c/Suspense\u003e\
      )}\
    \u003c/div\u003e\
  )\
}\
```

## Detailed Answer (EN)
React.lazy enables lazy loading of a component — its JavaScript is only downloaded when the component needs to render. Suspense shows a fallback UI while the component loads. Together they enable code splitting and reduce initial bundle size.\
```tsx\
import { lazy, Suspense } from 'react'\
\
// HeavyChart bundle is only downloaded when needed\
const HeavyChart = lazy(() =\u003e import('./HeavyChart'))\
\
const Dashboard = () =\u003e {\
  const [showChart, setShowChart] = useState(false)\
\
  return (\
    \u003cdiv\u003e\
      \u003cbutton onClick={() =\u003e setShowChart(true)}\u003eLoad Chart\u003c/button\u003e\
      {showChart \u0026\u0026 (\
        \u003cSuspense fallback={\u003cdiv\u003eLoading chart...\u003c/div\u003e}\u003e\
          \u003cHeavyChart /\u003e\
        \u003c/Suspense\u003e\
      )}\
    \u003c/div\u003e\
  )\
}\
```
