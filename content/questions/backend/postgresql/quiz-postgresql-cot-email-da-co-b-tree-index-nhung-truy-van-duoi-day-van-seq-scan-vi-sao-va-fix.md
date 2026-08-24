---
id: quiz-postgresql-cot-email-da-co-b-tree-index-nhung-truy-van-duoi-day-van-seq-scan-vi-sao-va-fix
position: backend
technology: postgresql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cột email đã có B-tree index nhưng truy vấn dưới đây vẫn Seq Scan. Vì sao và fix đúng là gì?

## Đáp án trắc nghiệm
- [ ] Bảng chưa được VACUUM nên index tạm thời không dùng được cho truy vấn
- [ ] B-tree không hỗ trợ kiểu text — đổi sang Hash index thì hàm lower sẽ hoạt động
- [ ] Thiếu dấu nháy kép quanh tên hàm nên planner bỏ qua index đã có
- [x] Index lưu giá trị email gốc, không khớp biểu thức lower(email) — tạo expression index trên lower(email)

## Giải thích (VI)
Index lập trên giá trị email gốc, còn truy vấn lọc theo lower(email) — hai thứ khác nhau, planner không tự suy ra được. Fix: CREATE INDEX ON users (lower(email)). Đây là lý do chung cho quy tắc "đừng bọc cột trong hàm ở mệnh đề WHERE" — mọi hàm bao ngoài cột (date_trunc, ép kiểu, phép toán) đều vô hiệu hoá index thường theo cùng cơ chế.

### Giải thích các phương án:
- **Bảng chưa được VACUUM nên index tạm thời không dùng được cho truy vấn** (Sai): VACUUM ảnh hưởng bloat và visibility, không quyết định việc khớp biểu thức index.
- **B-tree không hỗ trợ kiểu text — đổi sang Hash index thì hàm lower sẽ hoạt động** (Sai): B-tree hỗ trợ text bình thường; vấn đề nằm ở biểu thức bao ngoài cột, không ở loại index.
- **Thiếu dấu nháy kép quanh tên hàm nên planner bỏ qua index đã có** (Sai): Cú pháp truy vấn hoàn toàn hợp lệ, không liên quan tới cách viết tên hàm.
- **Index lưu giá trị email gốc, không khớp biểu thức lower(email) — tạo expression index trên lower(email)** (Đúng): Index chỉ dùng được khi biểu thức truy vấn khớp đúng biểu thức được lập chỉ mục.
