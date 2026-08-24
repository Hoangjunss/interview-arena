---
id: quiz-android-kotlin-xoay-man-hinh-khien-activity-bi-tao-lai-va-mat-d-lieu-cach-xu-ly-dung
position: backend
technology: android-kotlin
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Xoay màn hình khiến Activity bị tạo lại và mất dữ liệu. Cách xử lý đúng?

## Đáp án trắc nghiệm
- [x] Giữ dữ liệu trong ViewModel sống qua lần tạo lại
- [ ] Lưu dữ liệu vào biến tĩnh của lớp
- [ ] Khoá hướng màn hình để Activity không bị tạo lại
- [ ] Đọc lại toàn bộ dữ liệu từ server sau khi xoay

## Giải thích (VI)
Dùng ViewModel: nó sống qua các lần Activity bị tạo lại do thay đổi cấu hình, nên dữ liệu và trạng thái màn hình còn nguyên. Khoá hướng màn hình chỉ né được một trường hợp trong nhiều trường hợp cấu hình thay đổi.

### Giải thích các phương án:
- **Giữ dữ liệu trong ViewModel sống qua lần tạo lại** (Đúng): ViewModel gắn với phạm vi sống lâu hơn Activity nên dữ liệu không mất khi cấu hình đổi.
- **Lưu dữ liệu vào biến tĩnh của lớp** (Sai): Biến tĩnh giữ tham chiếu ngoài vòng đời và dễ gây rò bộ nhớ.
- **Khoá hướng màn hình để Activity không bị tạo lại** (Sai): Né vấn đề và vẫn hỏng khi có thay đổi cấu hình khác như đổi ngôn ngữ hoặc chế độ tối.
- **Đọc lại toàn bộ dữ liệu từ server sau khi xoay** (Sai): Tốn dữ liệu và tạo độ trễ cho một thao tác lẽ ra tức thì.
