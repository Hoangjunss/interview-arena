---
id: truong-hop-nao-graphql-khong-phai-lua-chon-phu-hop
position: backend
technology: quyết-định-công-nghệ
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trường hợp nào GraphQL không phải lựa chọn phù hợp?

## Question (EN)
When is GraphQL not a good fit?

## Đáp án chi tiết (VI)
GraphQL không đáng dùng cho **API đơn giản, ít client, nhu cầu dữ liệu cố định**. Chi phí về execution layer, cache, giới hạn truy vấn và quan sát vận hành khi đó không được bù lại bằng lợi ích nào rõ rệt.\
\
Các trường hợp khác nên cân nhắc kỹ: API công khai cho bên thứ ba, vì kiểm soát chi phí truy vấn và ngăn lạm dụng khó hơn hẳn; API chủ yếu tải tệp hoặc luồng nhị phân; và hệ thống mà cache ở tầng mạng là yếu tố quyết định.\
\
Ngược lại, GraphQL mạnh khi có nhiều loại client với nhu cầu khác nhau, khi màn hình phải gộp dữ liệu từ nhiều nguồn, và khi đội client muốn giảm phụ thuộc vào việc đội server tạo endpoint mới cho từng màn hình.\
\
Điều làm nên câu trả lời tốt là nêu tiêu chí quyết định: số lượng và mức độ khác biệt của client, độ ổn định của nhu cầu dữ liệu, tầm quan trọng của cache tầng mạng, và năng lực vận hành của đội.

## Detailed Answer (EN)
GraphQL is not worth it for a **simple API with few clients and stable data needs**. The cost of the execution layer, caching, query limits and observability is not repaid by any clear benefit.\
\
Other cases to weigh carefully: public APIs for third parties, where controlling query cost and abuse is much harder; APIs dominated by file or binary streaming; and systems where network-layer caching is decisive.\
\
Conversely, GraphQL is strong with many client types having different needs, screens combining data from several sources, and client teams wanting less dependence on backend teams creating an endpoint per screen.\
\
What makes a good answer is naming decision criteria: how many clients and how different they are, how stable data needs are, how much network caching matters, and the operational capacity of the team.
