---
id: theo-doi-hieu-nang-server-graphql-nen-do-o-muc-nao
position: backend
technology: vận-hành
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Theo dõi hiệu năng server GraphQL nên đo ở mức nào?

## Question (EN)
At what level should GraphQL server performance be measured?

## Đáp án chi tiết (VI)
Đo theo **tên truy vấn** và theo **thời gian giải quyết từng field**. Đo ở mức endpoint là vô nghĩa vì mọi truy vấn dùng chung một địa chỉ, và status code thường là 200 kể cả khi phản hồi chứa lỗi.\
\
Các số liệu đáng theo dõi: thời gian thực thi theo từng truy vấn có tên ở nhóm phần trăm cao; **số lời gọi tới data source cho mỗi truy vấn**, vì đây là chỗ vấn đề N+1 lộ ra; tỉ lệ lỗi theo field; và các field đã đánh dấu bỏ dần mà vẫn có lưu lượng.\
\
Số liệu cuối cùng đặc biệt giá trị vì nó là điều kiện để gỡ field cũ một cách an toàn.\
\
Một yêu cầu thực dụng đi kèm: bắt buộc mọi truy vấn từ client phải có tên. Truy vấn không tên làm mọi số liệu gộp lại thành một nhóm vô danh.

## Detailed Answer (EN)
Measure by **operation name** and by **per-field resolution time**. Endpoint-level metrics are meaningless since everything shares one URL, and the status code is usually 200 even when the response contains errors.\
\
Metrics worth tracking: execution time per named operation at high percentiles; **data source calls per query**, where N plus one becomes visible; error rate per field; and deprecated fields still receiving traffic.\
\
That last metric is especially valuable because it is the precondition for removing old fields safely.\
\
A practical requirement alongside: make named operations mandatory. Anonymous queries collapse every metric into one nameless bucket.
