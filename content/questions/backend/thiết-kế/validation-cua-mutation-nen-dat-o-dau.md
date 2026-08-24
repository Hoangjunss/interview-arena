---
id: validation-cua-mutation-nen-dat-o-dau
position: backend
technology: thiết-kế
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Validation của mutation nên đặt ở đâu?

## Question (EN)
Where should mutation input validation live?

## Đáp án chi tiết (VI)
Schema lo phần **kiểu và tính bắt buộc**, còn luật nghiệp vụ nằm ở **business logic**. Hệ kiểu không diễn tả được các luật như số tiền phải dương, mã giảm giá còn hiệu lực, hay ngày kết thúc phải sau ngày bắt đầu.\
\
Cách trả lỗi cũng là quyết định thiết kế: trả trong mảng `errors` kỹ thuật thì client khó xử lý theo từng field; trả trong kiểu payload với mảng `errors` có mã và tên field thì client hiển thị được lỗi ngay cạnh ô nhập tương ứng.\
\
Nguyên tắc nên giữ: kiểm tra ở client là để giúp người dùng sửa nhanh, còn **server vẫn phải kiểm tra lại toàn bộ** vì client có thể bị bỏ qua bằng cách gọi API trực tiếp.

## Detailed Answer (EN)
The schema handles **types and requiredness**, while business rules live in the **business layer**. The type system cannot express rules such as an amount being positive, a coupon still being valid, or an end date following a start date.\
\
How errors are returned is also a design decision: in the technical errors list, per-field handling is awkward; in the mutation payload with coded errors and field names, the client can display each error beside the matching input.\
\
A principle worth keeping: client-side validation helps users correct input quickly, while **the server must revalidate everything** because the client can be bypassed by calling the API directly.
