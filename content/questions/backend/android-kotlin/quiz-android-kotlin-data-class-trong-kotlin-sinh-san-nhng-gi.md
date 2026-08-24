---
id: quiz-android-kotlin-data-class-trong-kotlin-sinh-san-nhng-gi
position: backend
technology: android-kotlin
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Data class trong Kotlin sinh sẵn những gì?

## Đáp án trắc nghiệm
- [ ] Cơ chế lưu đối tượng xuống cơ sở dữ liệu
- [ ] Khả năng chuyển đổi sang JSON tự động
- [x] So sánh bằng giá trị, sao chép, chuỗi mô tả
- [ ] Đảm bảo mọi trường đều bất biến

## Giải thích (VI)
Data class sinh sẵn equals và hashCode theo giá trị, toString, copy và các hàm tách thành phần. Nhờ đó hai đối tượng cùng nội dung được coi là bằng nhau, điều quyết định cho việc so sánh state trong giao diện.

### Giải thích các phương án:
- **Cơ chế lưu đối tượng xuống cơ sở dữ liệu** (Sai): Lưu trữ do thư viện cơ sở dữ liệu đảm nhiệm.
- **Khả năng chuyển đổi sang JSON tự động** (Sai): Chuyển đổi JSON cần thư viện riêng.
- **So sánh bằng giá trị, sao chép, chuỗi mô tả** (Đúng): Đây là bộ hàm mà mọi lớp chứa dữ liệu đều cần và viết tay rất dễ sót khi thêm trường.
- **Đảm bảo mọi trường đều bất biến** (Sai): Trường khai báo bằng var vẫn thay đổi được.
