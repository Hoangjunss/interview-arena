---
id: quiz-terraform-iac-vi-sao-trang-thai-terraform-nen-duoc-luu-o-kho-tu-xa-thay-vi-tren-may-ca-nhan
position: backend
technology: terraform-iac
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao trạng thái Terraform nên được lưu ở kho từ xa thay vì trên máy cá nhân?

## Đáp án trắc nghiệm
- [ ] Terraform chạy nhanh hơn khi trạng thái ở xa
- [ ] Trạng thái được nén lại nên tốn ít dung lượng hơn
- [ ] Trạng thái từ xa không chứa dữ liệu nhạy cảm
- [x] Cả đội dùng chung trạng thái và có khoá

## Giải thích (VI)
Để cả đội dùng chung một trạng thái và có cơ chế khoá ngăn hai người áp dụng cùng lúc. Trạng thái nằm trên máy cá nhân là mất khi máy hỏng, và không ai khác chạy được nếu người đó nghỉ.

### Giải thích các phương án:
- **Terraform chạy nhanh hơn khi trạng thái ở xa** (Sai): Đọc qua mạng thường chậm hơn đọc tệp cục bộ.
- **Trạng thái được nén lại nên tốn ít dung lượng hơn** (Sai): Dung lượng không phải lý do.
- **Trạng thái từ xa không chứa dữ liệu nhạy cảm** (Sai): Nó vẫn chứa mọi thuộc tính như bản cục bộ.
- **Cả đội dùng chung trạng thái và có khoá** (Đúng): Hai người chạy cùng lúc trên hai bản trạng thái khác nhau sẽ tạo ra hạ tầng lệch nhau.
