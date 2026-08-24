---
id: quiz-design-patterns-observer-pattern-giai-quyet-van-de-gi
position: backend
technology: design-patterns
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Observer pattern giải quyết vấn đề gì?

## Đáp án trắc nghiệm
- [ ] Theo dõi hiệu năng của các thành phần trong hệ thống
- [x] Nhiều bên cần biết khi một thứ thay đổi, nguồn không cần biết ai
- [ ] Giới hạn số lượng thành phần được truy cập một đối tượng
- [ ] Ghi lại toàn bộ lịch sử thay đổi của một đối tượng theo thời gian

## Giải thích (VI)
Khi nhiều bên cần phản ứng với một thay đổi mà bên phát không cần biết họ là ai: nguồn phát sự kiện, các bên đăng ký nghe. Thêm một bên nghe mới không phải sửa nguồn.

### Giải thích các phương án:
- **Theo dõi hiệu năng của các thành phần trong hệ thống** (Sai): Tên gọi dễ gây nhầm nhưng nó không liên quan tới giám sát.
- **Nhiều bên cần biết khi một thứ thay đổi, nguồn không cần biết ai** (Đúng): Thêm người nghe mới không phải sửa chỗ phát ra thay đổi.
- **Giới hạn số lượng thành phần được truy cập một đối tượng** (Sai): Đó là kiểm soát truy cập, thuộc về proxy.
- **Ghi lại toàn bộ lịch sử thay đổi của một đối tượng theo thời gian** (Sai): Đó gần với event sourcing hoặc memento.
