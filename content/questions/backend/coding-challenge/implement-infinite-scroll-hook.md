---
id: implement-infinite-scroll-hook
position: backend
technology: coding-challenge
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Implement infinite scroll hook?

## Question (EN)
Implement an infinite scroll hook.

## Đáp án chi tiết (VI)
useInfiniteScroll trigger callback khi sentinel element xuất hiện trong viewport.\
\
```js\
function useInfiniteScroll(callback) {\
  const ref = useRef(null);\
  useEffect(() =\u003e {\
    const observer = new IntersectionObserver(([entry]) =\u003e {\
      if (entry.isIntersecting) callback();\
    });\
    if (ref.current) observer.observe(ref.current);\
    return () =\u003e observer.disconnect();\
  }, [callback]);\
  return ref;\
}\
```\
\
Gán ref cho sentinel element cuối danh sách.

## Detailed Answer (EN)
Using IntersectionObserver: `function useInfiniteScroll(callback) { const ref = useRef(null); useEffect(() =\u003e { const observer = new IntersectionObserver(([entry]) =\u003e { if (entry.isIntersecting) callback(); }); if (ref.current) observer.observe(ref.current); return () =\u003e observer.disconnect(); }, [callback]); return ref; }` Attach the returned ref to a sentinel element at the bottom of the list.
