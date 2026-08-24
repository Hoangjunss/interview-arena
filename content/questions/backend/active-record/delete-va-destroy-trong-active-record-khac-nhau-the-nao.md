---
id: delete-va-destroy-trong-active-record-khac-nhau-the-nao
position: backend
technology: active-record
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`delete` và `destroy` trong Active Record khác nhau thế nào?

## Question (EN)
How do `delete` and `destroy` differ in Active Record?

## Đáp án chi tiết (VI)
Cả hai đều xóa bản ghi, nhưng đi qua hai đường khác nhau:\
\
- **`destroy`:** nạp object lên, **chạy callbacks** (`before_destroy`, `after_destroy`, `after_commit`) và **xử lý association** khai báo `dependent: :destroy`. Đây là đường \\"an toàn\\" khi có logic phụ thuộc.\
- **`delete`:** bắn thẳng **một câu SQL `DELETE`**, **bỏ qua callbacks lẫn validations**, không đụng tới bản ghi liên quan. Nhanh hơn nhưng nguy hiểm nếu model dựa vào callback để dọn dẹp.\
\
```ruby\
user.destroy   # chạy callback + xóa comment con (dependent: :destroy)\
user.delete    # chỉ 1 câu DELETE, không callback\
\
User.where(active: false).destroy_all  # nạp từng record, chạy callback\
User.where(active: false).delete_all   # 1 câu DELETE hàng loạt, bỏ callback\
```\
\
**Quy tắc:** cần callback/dọn dữ liệu liên quan → `destroy`. Xóa số lượng lớn không có side-effect → `delete`/`delete_all` để tránh nạp N object.

## Detailed Answer (EN)
Both remove a record but take different paths:\
\
- **`destroy`:** loads the object, **runs callbacks** (`before_destroy`, `after_destroy`, `after_commit`) and **handles associations** declared with `dependent: :destroy`. This is the \\"safe\\" path when dependent logic exists.\
- **`delete`:** issues a **single SQL `DELETE`**, **skips callbacks and validations**, and ignores related records. Faster but risky if the model relies on callbacks for cleanup.\
\
```ruby\
user.destroy   # runs callbacks + removes child comments (dependent: :destroy)\
user.delete    # just one DELETE, no callbacks\
\
User.where(active: false).destroy_all  # loads each record, runs callbacks\
User.where(active: false).delete_all   # one bulk DELETE, skips callbacks\
```\
\
**Rule of thumb:** need callbacks / dependent cleanup → `destroy`. Bulk-remove with no side effects → `delete`/`delete_all` to avoid instantiating N objects.
