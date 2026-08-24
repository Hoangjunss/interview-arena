---
id: quiz-design-patterns-nguyen-tac-thay-the-liskov-lsp-bi-vi-pham-khi-nao
position: backend
technology: design-patterns
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nguyên tắc thay thế Liskov (LSP) bị vi phạm khi nào?

## Đáp án trắc nghiệm
- [ ] Lớp cha là abstract nên không thể khởi tạo được
- [x] Lớp con làm nơi gọi vỡ khi thay lớp cha
- [ ] Lớp con thêm phương thức mới không có ở lớp cha
- [ ] Lớp con ghi đè phương thức của lớp cha

## Giải thích (VI)
Khi thay lớp cha bằng lớp con làm code đang chạy vỡ : lớp con thu hẹp điều kiện chấp nhận, throw ở nơi cha không throw, hay trả về thứ khác hợp đồng. Ví dụ kinh điển: Square extends Rectangle rồi đặt chiều rộng cũng đổi chiều cao.

### Giải thích các phương án:
- **Lớp cha là abstract nên không thể khởi tạo được** (Sai): Không liên quan tới nguyên tắc thay thế.
- **Lớp con làm nơi gọi vỡ khi thay lớp cha** (Đúng): Ví dụ lớp con throw ở phương thức mà lớp cha khai là luôn hoạt động.
- **Lớp con thêm phương thức mới không có ở lớp cha** (Sai): Thêm phương thức là bình thường và không phá vỡ việc thay thế.
- **Lớp con ghi đè phương thức của lớp cha** (Sai): Ghi đè là mục đích của thừa kế, miễn giữ đúng hợp đồng.
