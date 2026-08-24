---
id: su-khac-biet-giua-isloading-va-isfetching-trong-usequery
position: backend
technology: react-query
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa isLoading và isFetching trong useQuery?

## Question (EN)
What is the difference between isLoading and isFetching in React Query?

## Đáp án chi tiết (VI)
isLoading = true chỉ lần fetch đầu chưa có cache (show skeleton toàn trang); isFetching = true MỌI KHI đang fetch kể cả background refetch (show subtle indicator). Đây là câu phỏng vấn rất phổ biến. **isLoading** (hay `status === 'pending'`): true CHỈ khi fetch lần đầu VÀ chưa có cached data — dùng để show loading skeleton/spinner toàn trang. **isFetching**: true MỌI KHI đang fetch, kể cả background refetch khi đã có cached data — dùng để show subtle indicator (spinning icon nhỏ, progress bar mờ). Ví dụ thực tế: user vào trang Products lần đầu → isLoading=true, show skeleton. User navigate đi rồi quay lại → có cached data nên isLoading=false (show data cũ ngay), nhưng isFetching=true (đang refetch background). Thêm `isRefetching` = isFetching \u0026\u0026 !isLoading (đang refetch có data cũ).

## Detailed Answer (EN)
$83
