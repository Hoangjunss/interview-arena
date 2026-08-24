---
id: cach-cancel-queries-trong-react-query-khi-component-unmount
position: backend
technology: react-query
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách cancel queries trong React Query khi component unmount?

## Question (EN)
How do you cancel a query in React Query?

## Đáp án chi tiết (VI)
$83

## Detailed Answer (EN)
React Query v5 automatically cancels in-flight queries when: the component unmounts, the query key changes, or a new fetch is triggered while one is already running. Manual cancellation is achieved via AbortSignal: the queryFn receives a signal in its context object that fires when React Query cancels the query. In the fetch API: queryFn: ({ signal }) =\u003e fetch(url, { signal }). In axios: queryFn: ({ signal }) =\u003e axios.get(url, { signal }). React Query v5 uses AbortController internally and passes the signal automatically. For imperative cancellation: queryClient.cancelQueries({ queryKey: ['todos'] }) — cancels all ongoing fetches for matching queries and removes them from the in-flight state. Proper cancellation prevents race conditions and unnecessary network requests when users navigate quickly.
