---
id: paging-3-library-la-gi-va-tai-sao-nen-dung
position: backend
technology: data-\u0026-networking
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Paging 3 library là gì và tại sao nên dùng?

## Question (EN)
What is the Paging 3 library and why use it?

## Đáp án chi tiết (VI)
Paging 3 là thư viện phân trang được khuyến nghị, load hiệu quả dataset lớn từ nguồn local/remote. Bạn tạo `PagingSource` (hoặc `RemoteMediator` cho network+database), dùng `Pager` để tạo paginated stream, và collect `PagingData` trong UI với `collectAsLazyPagingItems()`. Nó xử lý tự động loading, appending, retry, và deduplication, loại bỏ lỗi phân trang thủ công.

## Detailed Answer (EN)
Paging 3 is the recommended pagination library that efficiently loads large datasets from local/remote sources. You create a `PagingSource` (or `RemoteMediator` for network+database), use `Pager` to create paginated streams, and collect `PagingData` in the UI with `collectAsLazyPagingItems()`. It handles loading, appending, retrying, and deduplication automatically.
