---
id: quiz-linux-os-tien-trinh-o-trang-thai-z-zombie-nghia-la-gi
position: backend
technology: linux-os
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tiến trình ở trạng thái Z (zombie) nghĩa là gì?

## Đáp án trắc nghiệm
- [x] Đã kết thúc nhưng cha chưa đọc exit status
- [ ] Đang treo và không phản hồi signal nào cả
- [ ] Bị mất tiến trình cha nên phải chạy độc lập
- [ ] Đang chiếm CPU liên tục mà không làm việc gì

## Giải thích (VI)
Tiến trình đã kết thúc nhưng cha chưa gọi wait() để đọc exit status, nên kernel giữ lại một entry trong bảng tiến trình. Nó không dùng CPU hay bộ nhớ — chỉ chiếm một chỗ trong bảng.

### Giải thích các phương án:
- **Đã kết thúc nhưng cha chưa đọc exit status** (Đúng): Zombie không chiếm tài nguyên ngoài một entry trong bảng tiến trình.
- **Đang treo và không phản hồi signal nào cả** (Sai): Đó gần với trạng thái D, chờ I/O không ngắt được.
- **Bị mất tiến trình cha nên phải chạy độc lập** (Sai): Đó là tiến trình mồ côi, và nó được init nhận làm cha.
- **Đang chiếm CPU liên tục mà không làm việc gì** (Sai): Zombie không chạy nữa nên không dùng CPU.
