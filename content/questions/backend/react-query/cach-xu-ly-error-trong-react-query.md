---
id: cach-xu-ly-error-trong-react-query
position: backend
technology: react-query
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách xử lý error trong React Query?

## Question (EN)
How do you handle errors in React Query?

## Đáp án chi tiết (VI)
React Query v5 thay đổi error handling so với v4: `onError` callback bị deprecated, thay bằng `throwOnError` hoặc `meta`. Retry strategies: mặc định retry 3 lần, exponential backoff — override: `retry: (failureCount, error) =\u003e error.status !== 401 \u0026\u0026 failureCount \u003c 3` để không retry auth errors. Global error handling với QueryCache observer: `new QueryClient({ queryCache: new QueryCache({ onError: (error, query) =\u003e { if (query.meta?.showErrorToast) toast.error(error.message) } }) })` — per-query opt-in: `useQuery({ ..., meta: { showErrorToast: true } })`. Error Boundary integration: `throwOnError: true` khiến query throw error lên Error Boundary thay vì return `isError`. Hoặc dùng `useSuspenseQuery` — tự động throw lên Error Boundary. `error.message` vs `error.response.data`: với fetch API, HTTP errors không tự throw — phải check `if (!res.ok) throw new Error(res.statusText)` tron"])</script><script>self.__next_f.push([1,"g queryFn. Lưu ý v5: `onError` ở useMutation vẫn hoạt động nhưng global `onError` trong defaultOptions đã bị xóa.

## Detailed Answer (EN)
$84
