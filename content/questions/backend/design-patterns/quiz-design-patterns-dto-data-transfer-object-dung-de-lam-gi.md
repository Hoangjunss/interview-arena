---
id: quiz-design-patterns-dto-data-transfer-object-dung-de-lam-gi
position: backend
technology: design-patterns
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
DTO (data transfer object) dùng để làm gì?

## Đáp án trắc nghiệm
- [ ] Kiểm tra tính hợp lệ của dữ liệu đầu vào
- [ ] Tăng tốc truyền dữ liệu giữa các service
- [ ] Lưu dữ liệu tạm trong bộ nhớ giữa các bước xử lý với nhau
- [x] Định hình dữ liệu qua biên, tách khỏi model nội bộ

## Giải thích (VI)
Định hình dữ liệu đi qua biên (API trả về, payload nhận vào), tách khỏi entity nội bộ. Nhờ đó thêm một cột trong DB không tự động lộ ra API, và đổi API không buộc phải đổi model.

### Giải thích các phương án:
- **Kiểm tra tính hợp lệ của dữ liệu đầu vào** (Sai): Validate là việc riêng, dù thường làm cùng chỗ với DTO.
- **Tăng tốc truyền dữ liệu giữa các service** (Sai): Không liên quan tới hiệu năng truyền tải.
- **Lưu dữ liệu tạm trong bộ nhớ giữa các bước xử lý với nhau** (Sai): Không phải mục đích của DTO.
- **Định hình dữ liệu qua biên, tách khỏi model nội bộ** (Đúng): Trả thẳng entity ra API sẽ lộ trường nội bộ và khoá API vào schema DB.
