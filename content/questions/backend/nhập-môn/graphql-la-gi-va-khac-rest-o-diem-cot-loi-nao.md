---
id: graphql-la-gi-va-khac-rest-o-diem-cot-loi-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
GraphQL là gì và khác REST ở điểm cốt lõi nào?

## Question (EN)
What is GraphQL and how does it fundamentally differ from REST?

## Đáp án chi tiết (VI)
GraphQL là ngôn ngữ truy vấn cho API, trong đó **client mô tả chính xác dữ liệu mình cần** và server trả về đúng shape đó. REST thì mỗi endpoint có response shape cố định, nên client hoặc bị over-fetching, hoặc phải gọi nhiều lần rồi tự ghép.\
\
Hai vấn đề GraphQL sinh ra để giải quyết là over-fetching và under-fetching. Với màn hình cần dữ liệu từ ba nguồn, REST thường tốn ba round trip còn GraphQL chỉ một.\
\
Trade-off cần nói rõ trong phỏng vấn: cache ở tầng HTTP khó hơn nhiều vì mọi truy vấn đi qua một địa chỉ; việc giới hạn chi phí truy vấn trở thành trách nhiệm của server; và execution layer phức tạp hơn. GraphQL không phải database và không thay thế database — nó là tầng contract giữa client và server.

## Detailed Answer (EN)
GraphQL is a query language for APIs where **the client describes exactly the data it needs** and the server returns that shape. In REST each endpoint has a fixed response shape, so clients either over-fetch or make several calls and stitch results together.\
\
The two problems it addresses are over-fetching and under-fetching. For a screen needing data from three sources, REST usually costs three round trips while GraphQL costs one.\
\
The trade-off worth stating in an interview: HTTP-level caching is much harder because everything goes through one endpoint; limiting query cost becomes the server responsibility; and the execution layer is more complex. GraphQL is not a database and does not replace one — it is a contract layer between client and server.
