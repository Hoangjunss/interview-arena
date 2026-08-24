---
id: quiz-system-design-canary-release-khac-blue-green-o-diem-nao
position: system-design
technology: system-design
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Canary release khác blue-green ở điểm nào?

## Đáp án trắc nghiệm
- [ ] Canary không cần rollback vì lỗi được phát hiện sớm
- [x] Canary đẩy dần một phần traffic sang bản mới rồi tăng
- [ ] Blue-green chỉ dùng được cho ứng dụng không có cơ sở dữ liệu
- [ ] Canary chạy hai môi trường giống nhau cùng lúc

## Giải thích (VI)
Canary : chuyển dần traffic (1% → 10% → 50% → 100%), quan sát chỉ số ở từng mức. Blue-green : dựng môi trường mới song song rồi chuyển toàn bộ traffic một lần, rollback bằng cách trỏ lại môi trường cũ.

### Giải thích các phương án:
- **Canary không cần rollback vì lỗi được phát hiện sớm** (Sai): Vẫn cần rollback, chỉ là phạm vi ảnh hưởng nhỏ hơn.
- **Canary đẩy dần một phần traffic sang bản mới rồi tăng** (Đúng): Blue-green chuyển toàn bộ traffic một lần và rollback bằng cách chuyển ngược lại.
- **Blue-green chỉ dùng được cho ứng dụng không có cơ sở dữ liệu** (Sai): Dùng được, nhưng phải xử lý migration schema tương thích hai chiều.
- **Canary chạy hai môi trường giống nhau cùng lúc** (Sai): Đó là đặc điểm của blue-green.
