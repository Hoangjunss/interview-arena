---
id: quiz-ci-cd-theo-semantic-versioning-sua-mot-bug-khong-doi-api-thi-tang-so-nao
position: backend
technology: ci-cd
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Theo semantic versioning, sửa một bug không đổi API thì tăng số nào?

## Đáp án trắc nghiệm
- [ ] Không tăng số nào cả, chỉ cần tạo một tag mới cho bản đó
- [ ] Số minor, tức số ở giữa
- [ ] Số major, tức số đầu tiên
- [x] Số patch, tức số cuối

## Giải thích (VI)
PATCH (số cuối): 1.4.2 → 1.4.3. Quy tắc: MAJOR khi phá tương thích, MINOR khi thêm tính năng vẫn tương thích, PATCH khi sửa lỗi mà không đổi hành vi công khai.

### Giải thích các phương án:
- **Không tăng số nào cả, chỉ cần tạo một tag mới cho bản đó** (Sai): Mọi bản phát hành đều cần một phiên bản riêng để phân biệt.
- **Số minor, tức số ở giữa** (Sai): Minor dành cho tính năng mới mà không phá tương thích.
- **Số major, tức số đầu tiên** (Sai): Major chỉ tăng khi có thay đổi phá vỡ tương thích.
- **Số patch, tức số cuối** (Đúng): MAJOR đổi khi phá tương thích, MINOR khi thêm tính năng tương thích.
