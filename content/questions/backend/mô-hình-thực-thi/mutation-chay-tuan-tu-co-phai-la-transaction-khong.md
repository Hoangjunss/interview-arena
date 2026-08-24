---
id: mutation-chay-tuan-tu-co-phai-la-transaction-khong
position: backend
technology: mô-hình-thực-thi
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mutation chạy tuần tự có phải là transaction không?

## Question (EN)
Does serial mutation execution mean transactionality?

## Đáp án chi tiết (VI)
Không. Tính tuần tự chỉ bảo đảm **thứ tự** các top-level field, chứ không phải tính atomic. Nếu mutation thứ hai lỗi, mutation thứ nhất đã áp dụng và không được hoàn tác.\
\
```graphql\
mutation {\
  a: charge(orderId: \\"1\\") { ok }\
  b: ship(orderId: \\"1\\")   { ok }\
}\
# b starts only after a finishes — but if b fails, a is NOT rolled back\
```\
\
Muốn tất cả hoặc không gì cả thì phải mở transaction ở business logic. Pattern tốt hơn là **gộp thành một mutation duy nhất mô tả đúng ý định nghiệp vụ**, thay vì để client gửi ba mutation trong một document rồi hy vọng chúng cùng thành công.\
\
Một chi tiết về phần đọc: các field trong kiểu trả về của mutation được giải quyết như truy vấn thường nên đọc dữ liệu ngay sau khi ghi. Với database có bản sao đọc, dữ liệu vừa ghi có thể chưa lan tới bản sao — đây là nguồn của lỗi đọc ra dữ liệu cũ ngay sau khi cập nhật.

## Detailed Answer (EN)
No. Serial execution only guarantees **ordering** of top-level fields, not atomicity. If the second mutation fails, the first has already applied and is not rolled back.\
\
```graphql\
mutation {\
  a: charge(orderId: \\"1\\") { ok }\
  b: ship(orderId: \\"1\\")   { ok }\
}\
# b starts only after a finishes — but if b fails, a is NOT rolled back\
```\
\
All-or-nothing behaviour requires a transaction in the business layer. The better design is **one mutation expressing the business intent** instead of clients sending three mutations in one document and hoping they all succeed.\
\
A read-side detail: fields in the mutation payload resolve like a normal query, reading data right after the write. With read replicas the fresh data may not have propagated yet — the source of stale reads immediately after an update.
