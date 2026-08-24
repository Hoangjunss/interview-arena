---
id: quiz-terraform-iac-tach-moi-truong-thu-nghiem-va-san-pham-trong-terraform-nen-lam-the-nao
position: backend
technology: terraform-iac
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tách môi trường thử nghiệm và sản phẩm trong Terraform nên làm thế nào?

## Đáp án trắc nghiệm
- [ ] Dùng cùng trạng thái nhưng khác thông tin đăng nhập
- [x] Trạng thái riêng cho mỗi môi trường, dùng chung module
- [ ] Một trạng thái duy nhất và phân biệt bằng tên tài nguyên
- [ ] Chép toàn bộ mã sang thư mục riêng cho mỗi môi trường

## Giải thích (VI)
Mỗi môi trường có trạng thái riêng để giới hạn phạm vi ảnh hưởng, nhưng dùng chung module để hai bên giống nhau về cấu trúc và chỉ khác ở các giá trị được khai báo rõ.

### Giải thích các phương án:
- **Dùng cùng trạng thái nhưng khác thông tin đăng nhập** (Sai): Trạng thái chung vẫn là điểm hỏng chung.
- **Trạng thái riêng cho mỗi môi trường, dùng chung module** (Đúng): Trạng thái riêng giới hạn phạm vi ảnh hưởng, còn mô đun chung giữ hai môi trường giống nhau.
- **Một trạng thái duy nhất và phân biệt bằng tên tài nguyên** (Sai): Một sai sót sẽ ảnh hưởng cả hai môi trường cùng lúc.
- **Chép toàn bộ mã sang thư mục riêng cho mỗi môi trường** (Sai): Hai bản mã sẽ lệch nhau dần và mất ý nghĩa của môi trường thử nghiệm.
