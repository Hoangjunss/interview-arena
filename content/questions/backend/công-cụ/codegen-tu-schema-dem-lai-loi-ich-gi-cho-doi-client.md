---
id: codegen-tu-schema-dem-lai-loi-ich-gi-cho-doi-client
position: backend
technology: công-cụ
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Codegen từ schema đem lại lợi ích gì cho đội client?

## Question (EN)
What does schema-driven code generation give client teams?

## Đáp án chi tiết (VI)
Codegen tạo ra **kiểu chính xác cho từng truy vấn**, nên gõ sai tên field hay dùng sai kiểu bị bắt lúc biên dịch. Kết hợp với kiểm tra schema trong CI, một breaking change sẽ làm hỏng build thay vì hỏng ứng dụng của người dùng.\
\
Quy trình thường dùng: lấy schema từ tệp đã cam kết trong kho mã; chạy công cụ sinh kiểu cho mọi truy vấn; và chạy lại trong CI để phát hiện lệch.\
\
Một quyết định cần chốt: lấy schema động từ server đang chạy hay từ tệp trong kho. Tệp trong kho cho kết quả tái lập được và không phụ thuộc môi trường, đổi lại phải nhớ cập nhật.\
\
Lợi ích phụ đáng kể: kiểu sinh ra cho biết chính xác field nào có thể null theo schema, buộc client xử lý các nhánh đó — chỗ nhiều lỗi giao diện xuất phát khi viết tay.

## Detailed Answer (EN)
It produces **exact types per query**, so wrong field names or types fail at compile time. Combined with schema checks in CI, a breaking change fails the build rather than the users application.\
\
The usual workflow: read the schema from a file committed in the repository; run a generator for every query; and rerun it in CI to detect drift.\
\
One decision to settle: fetching the schema live from a server or reading a committed file. The committed file gives reproducible results independent of environment, at the cost of remembering to update it.\
\
A notable side benefit: generated types state exactly which fields are nullable, forcing clients to handle those branches — where many UI bugs originate in hand-written queries.
