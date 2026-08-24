---
id: refetchonwindowfocus-trong-react-query-la-gi-khi-nao-nen-tat-no
position: backend
technology: react-query
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
refetchOnWindowFocus trong React Query là gì? Khi nào nên tắt nó?

## Question (EN)
What is refetchOnWindowFocus in React Query? When should you disable it?

## Đáp án chi tiết (VI)
refetchOnWindowFocus (mặc định bật) refetch tất cả stale queries khi user quay lại tab — tắt khi data ít thay đổi hoặc refetch gây UX kém. refetchOnWindowFocus là behavior mặc định: khi user chuyển tab rồi quay lại, React Query tự động refetch tất cả stale queries. Mục đích: đảm bảo data luôn fresh — ví dụ user đang xem dashboard, chuyển qua Slack 5 phút, quay lại thì data cập nhật mới nhất. Nên tắt (`refetchOnWindowFocus: false`) khi: (1) data ít thay đổi (config, static content), (2) refetch gây UX tệ (reset scroll, flash loading), (3) API có rate limit. Có thể set global qua `defaultOptions` hoặc per-query. Tương tự có `refetchOnReconnect` (khi mạng khôi phục) và `refetchInterval` (polling định kỳ).

## Detailed Answer (EN)
refetchOnWindowFocus (on by default) refetches all stale queries when the user returns to the tab — disable when data rarely changes or refetch causes poor UX. refetchOnWindowFocus is a default behavior: when the user switches tabs and comes back, React Query automatically refetches all stale queries. Purpose: ensures data stays fresh — e.g., user is viewing a dashboard, switches to Slack for 5 minutes, comes back, and sees the latest data. Disable it (`refetchOnWindowFocus: false`) when: (1) data rarely changes (config, static content), (2) refetching causes poor UX (scroll reset, loading flash), (3) the API has rate limits. Can be set globally via `defaultOptions` or per-query. Similarly, `refetchOnReconnect` (when network recovers) and `refetchInterval` (polling) follow the same pattern.
