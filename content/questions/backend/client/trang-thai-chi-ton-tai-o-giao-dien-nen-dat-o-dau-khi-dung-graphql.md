---
id: trang-thai-chi-ton-tai-o-giao-dien-nen-dat-o-dau-khi-dung-graphql
position: backend
technology: client
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trạng thái chỉ tồn tại ở giao diện nên đặt ở đâu khi dùng GraphQL?

## Question (EN)
Where should purely UI state live when using GraphQL?

## Đáp án chi tiết (VI)
Đặt ở **state của ứng dụng** chứ không nhét vào cache GraphQL. Cache được thiết kế cho dữ liệu server với cơ chế làm mới và hết hạn riêng, còn trạng thái giao diện có vòng đời hoàn toàn khác.\
\
Ranh giới nên giữ: dữ liệu server thuộc về thư viện dữ liệu với cache, làm mới và thử lại; trạng thái giao diện như bộ lọc, tab đang chọn, biểu mẫu đang nhập thuộc về state ứng dụng; và một số trạng thái nên nằm trong địa chỉ trang để chia sẻ và quay lại được.\
\
Một cách nghĩ hữu ích: nếu tải lại trang mà mất thì đó là trạng thái giao diện; nếu vẫn còn vì server giữ thì đó là dữ liệu server; nếu cần chia sẻ bằng liên kết thì nên nằm trong địa chỉ.\
\
Lỗi hay gặp khi trộn: bộ lọc đặt trong cache bị xoá khi cache được dọn sau một thao tác ghi, khiến giao diện tự đặt lại về mặc định mà người dùng không hiểu vì sao.

## Detailed Answer (EN)
Keep it in **application state** rather than the GraphQL cache. The cache is designed for server data with its own refetch and expiry behaviour, while UI state has a completely different lifecycle.\
\
The boundary: server data belongs to the data library with caching, refetching and retries; UI state such as filters, selected tabs and in-progress forms belongs to application state; and some state belongs in the URL so it can be shared and restored.\
\
A useful test: if reloading loses it, it is UI state; if it survives because the server holds it, it is server data; if it must be shareable by link, it belongs in the URL.\
\
A common bug from mixing: a filter stored in the cache is cleared when the cache is evicted after a write, so the UI silently resets and users cannot tell why.
