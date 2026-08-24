---
id: rate-limit-cho-api-graphql-nen-tinh-theo-gi
position: backend
technology: vận-hành
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Rate limit cho API GraphQL nên tính theo gì?

## Question (EN)
What should rate limiting for a GraphQL API be based on?

## Đáp án chi tiết (VI)
Tính theo **chi phí ước lượng của truy vấn**, không phải số yêu cầu. Một truy vấn lấy một record và một truy vấn lồng ba tầng qua danh sách nghìn phần tử là hai khối lượng công việc chênh nhau hàng nghìn lần.\
\
Cách tính chi phí thường dùng: gán điểm cho từng field, nhân với số record ước lượng từ tham số phân trang, cộng dồn theo cây truy vấn. Truy vấn vượt ngưỡng bị từ chối trước khi chạy, và điểm đã dùng được trừ vào hạn mức của client.\
\
Các biện pháp nên đi cùng: giới hạn Depth; bắt buộc tham số giới hạn trên mọi field trả về danh sách; đặt thời gian chờ; và giới hạn số alias trong một truy vấn, vì lặp cùng một field qua alias là cách nhân chi phí mà không tăng Depth.

## Detailed Answer (EN)
Base it on **estimated query cost**, not request count. A query fetching one record and a three-level nested query over thousand-item lists differ by orders of magnitude in work.\
\
A common cost model: assign points per field, multiply by record counts implied by pagination arguments, and sum across the query tree. Queries above the threshold are rejected before execution and consumed points are deducted from the client budget.\
\
Measures that belong alongside: depth limits; mandatory pagination arguments on every list field; execution timeouts; and an alias count limit, since repeating a field through aliases multiplies cost without adding depth.
