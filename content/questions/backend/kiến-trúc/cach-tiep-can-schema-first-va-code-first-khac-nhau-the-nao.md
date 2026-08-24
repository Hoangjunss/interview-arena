---
id: cach-tiep-can-schema-first-va-code-first-khac-nhau-the-nao
position: backend
technology: kiến-trúc
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách tiếp cận schema-first và code-first khác nhau thế nào?

## Question (EN)
How do schema-first and code-first approaches differ?

## Đáp án chi tiết (VI)
**Schema-first**: viết schema bằng SDL rồi cài đặt resolver theo nó. **Code-first**: định nghĩa kiểu bằng mã và schema được sinh ra. Khác biệt thật nằm ở nguồn sự thật của contract và cách các đội phối hợp.\
\
Schema trước hợp khi contract cần bàn bạc trước giữa đội client và đội server, vì tệp schema là thứ cụ thể để cùng xem. Rủi ro là mã cài đặt và schema có thể lệch nhau nếu không có kiểm tra tự động.\
\
Mã trước hợp khi một đội sở hữu cả hai phía, vì kiểu trong mã và schema không thể lệch. Rủi ro là schema dễ bị định hình theo cấu trúc lưu trữ vì người viết nhìn từ phía mã ra.\
\
Dù chọn cách nào, hai thực hành nên có: cam kết tệp schema vào kho mã; và chạy kiểm tra breaking change trong CI.

## Detailed Answer (EN)
**Schema-first**: write the schema in the definition language then implement resolvers against it. **Code-first**: define types in code and generate the schema. The real difference is where the contract source of truth lives and how teams collaborate.\
\
Schema-first suits contracts negotiated between client and server teams, since the schema file is a concrete artefact to review. The risk is implementation drifting without automated checks.\
\
Code-first suits one team owning both sides, since code types and schema cannot diverge. The risk is a schema shaped by storage structure because the author looks outward from the code.\
\
Either way, two practices belong: commit the schema file; and run breaking-change checks in CI.
