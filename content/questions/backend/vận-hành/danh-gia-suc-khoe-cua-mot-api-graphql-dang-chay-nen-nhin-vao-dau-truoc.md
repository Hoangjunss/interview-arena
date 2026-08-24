---
id: danh-gia-suc-khoe-cua-mot-api-graphql-dang-chay-nen-nhin-vao-dau-truoc
position: backend
technology: vận-hành
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đánh giá sức khoẻ của một API GraphQL đang chạy nên nhìn vào đâu trước?

## Question (EN)
What do you look at first to judge the health of a running GraphQL API?

## Đáp án chi tiết (VI)
Nhìn vào **số liệu sử dụng theo từng field và từng truy vấn có tên**. Không có nó thì không gỡ được field cũ một cách an toàn, không biết tối ưu chỗ nào, và mọi thay đổi schema đều là phỏng đoán về rủi ro.\
\
Các tín hiệu tiếp theo: thời gian thực thi ở nhóm phần trăm cao theo từng truy vấn; số lời gọi data source trên mỗi truy vấn để phát hiện N+1; tỉ lệ lỗi theo field; và số field đã đánh dấu bỏ dần nhưng vẫn có lưu lượng.\
\
Một dấu hiệu cảnh báo về tổ chức: schema chỉ tăng mà chưa bao giờ có field nào được gỡ — thường có nghĩa là đội không có số liệu sử dụng nên không ai dám xoá gì.\
\
Một dấu hiệu tích cực: mọi truy vấn từ client đều có tên và đăng ký được, giới hạn chi phí đã bật, và có kiểm tra breaking change trong CI.

## Detailed Answer (EN)
Look at **per-field and per-operation usage data**. Without it, old fields cannot be removed safely, optimisation targets are unknown, and every schema change is a guess about risk.\
\
Next signals: execution time at high percentiles per operation; data source calls per query to spot N plus one; error rate per field; and deprecated fields still receiving traffic.\
\
An organisational warning sign: a schema that only grows and from which nothing is ever removed — usually meaning there is no usage data so nobody dares delete anything.\
\
A positive sign: all client operations are named and registerable, cost limits are enabled, and breaking-change checks run in CI.
