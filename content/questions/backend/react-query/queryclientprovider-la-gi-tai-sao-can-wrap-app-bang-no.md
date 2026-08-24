---
id: queryclientprovider-la-gi-tai-sao-can-wrap-app-bang-no
position: backend
technology: react-query
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
QueryClientProvider là gì? Tại sao cần wrap app bằng nó?

## Question (EN)
What is QueryClientProvider and how is it configured in React Query?

## Đáp án chi tiết (VI)
QueryClientProvider là Context Provider bắt buộc — tạo QueryClient BÊN NGOÀI component, wrap app để mọi useQuery/useMutation đều access được cache. QueryClientProvider là React Context Provider cung cấp QueryClient instance cho toàn bộ component tree. QueryClient là 'bộ não' quản lý cache, chứa tất cả cached data, query states, và config. Mọi `useQuery`/`useMutation` bên trong đều cần access QueryClient. Setup: tạo `const queryClient = new QueryClient()` BÊN NGOÀI component (tránh re-create mỗi render), wrap app bằng `\u003cQueryClientProvider client={queryClient}\u003e`. Có thể cấu hình defaultOptions cho tất cả queries: `new QueryClient({ defaultOptions: { queries: { staleTime: 60_000, retry: 2 } } })`. Trong Next.js App Router, đặt ở root layout nhưng cần 'use client' wrapper.

## Detailed Answer (EN)
QueryClientProvider is the mandatory Context Provider — create QueryClient OUTSIDE the component and wrap the app so all useQuery/useMutation hooks can access the cache. QueryClientProvider is the React context provider that makes the QueryClient instance available to all components in the tree. Setup: create a QueryClient instance (configure defaultOptions like staleTime, gcTime, retry behavior); wrap the root component with \u003cQueryClientProvider client={queryClient}\u003e. The QueryClient manages the query cache, default options, and global state. In Next.js App Router: create the QueryClient inside a Client Component ('use client') to avoid sharing state between requests on the server — a common mistake is creating QueryClient at module level. Best practice: use useState or useRef to ensure the QueryClient is only created once per component lifecycle, not recreated on every render. Each user session should have its own QueryClient instance for proper isolation.
