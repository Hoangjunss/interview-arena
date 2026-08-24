---
id: directive-tra-du-lieu-theo-phan-giai-quyet-van-de-gi
position: backend
technology: hiệu-năng
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Directive trả dữ liệu theo phần giải quyết vấn đề gì?

## Question (EN)
What problem does incremental delivery solve?

## Đáp án chi tiết (VI)
Nó cho phép **trả phần `data` nhanh trước và phần chậm sau** trong cùng một yêu cầu. Màn hình hiển thị nội dung chính ngay, còn các khối phụ như gợi ý hay thống kê tới sau mà không chặn phần đầu.\
\
```graphql\
query {\
  post(id: \\"1\\") {\
    title                                   # arrives in the first chunk\
    ... on Post @defer { comments { body } } # slow part streams in later\
  }\
}\
```\
\
Trước khi có cơ chế này, cách xử lý thông thường là tách thành hai truy vấn — vẫn dùng được và đơn giản hơn, đổi lại tốn thêm một round trip.\
\
Điều kiện để dùng: cả server lẫn client library phải hỗ trợ, và tầng truyền tải phải cho phép trả về nhiều phần. Đây là lý do việc áp dụng còn hạn chế dù ý tưởng đã có từ lâu.\
\
Một lưu ý về thiết kế giao diện: nhận dữ liệu theo phần đòi hỏi giao diện có **trạng thái chờ cho từng khối** chứ không phải một trạng thái chờ chung, nếu không lợi ích về cảm nhận tốc độ gần như không còn.

## Detailed Answer (EN)
It allows **fast data to arrive first and slow parts later** within one request. The screen shows its main content immediately while secondary blocks such as recommendations or statistics arrive afterwards without blocking.\
\
```graphql\
query {\
  post(id: \\"1\\") {\
    title                                   # arrives in the first chunk\
    ... on Post @defer { comments { body } } # slow part streams in later\
  }\
}\
```\
\
Before this mechanism, the usual approach was splitting into two queries — still workable and simpler, at the cost of an extra round trip.\
\
Requirements: both server and client library must support it and the transport must allow multi-part responses. That is why adoption remains limited despite the long-standing idea.\
\
A UI design note: incremental data requires **per-block loading states** rather than one global spinner, otherwise the perceived speed benefit largely disappears.
