---
id: base-la-gi-va-khac-acid-the-nao
position: backend
technology: distributed-systems
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
BASE là gì và khác ACID thế nào?

## Question (EN)
What is BASE and how does it differ from ACID?

## Đáp án chi tiết (VI)
BASE là triết lý nhất quán của nhiều hệ NoSQL/phân tán, đặt cạnh **ACID** của DB quan hệ như một sự đánh đổi. BASE viết tắt:\
\
- **Basically Available**: hệ luôn **phản hồi** cho request (ưu tiên khả dụng), dù có thể là dữ liệu cũ.\
- **Soft state**: trạng thái hệ có thể **thay đổi theo thời gian** ngay cả khi không có input mới (do đồng bộ nền giữa các node).\
- **Eventually consistent**: các bản sao **cuối cùng sẽ hội tụ**, không nhất quán tức thời.\
\
So với **ACID** (Atomicity, Consistency, Isolation, Durability — ưu tiên **đúng đắn và nhất quán mạnh**):\
- ACID chọn **nhất quán** hơn khả dụng khi có sự cố; BASE chọn **khả dụng** và scale hơn nhất quán tức thời.\
- Đây chính là hai đầu của đánh đổi trong **CAP theorem** (CP vs AP).\
\
Khi nào hợp BASE: hệ cần **scale ngang** và luôn phục vụ (mạng xã hội, catalog, đếm view) và chịu được dữ liệu trễ. Khi nào cần ACID: tiền bạc, tồn kho, đặt chỗ. Thực tế nhiều hệ pha trộn — một số DB NoSQL nay hỗ trợ giao dịch ACID ở phạm vi hẹp.

## Detailed Answer (EN)
$83
