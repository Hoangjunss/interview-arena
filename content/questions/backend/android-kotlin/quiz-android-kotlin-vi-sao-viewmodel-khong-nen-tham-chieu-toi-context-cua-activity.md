---
id: quiz-android-kotlin-vi-sao-viewmodel-khong-nen-tham-chieu-toi-context-cua-activity
position: backend
technology: android-kotlin
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao ViewModel không nên tham chiếu tới Context của Activity?

## Đáp án trắc nghiệm
- [ ] Context không dùng được từ background thread
- [ ] Context không truyền được qua hàm dựng của ViewModel
- [x] ViewModel sống lâu hơn nên giữ luôn Activity cũ
- [ ] ViewModel chạy trên một tiến trình riêng biệt

## Giải thích (VI)
ViewModel sống qua các lần Activity bị tạo lại , nên giữ tham chiếu tới Activity sẽ giữ luôn Activity cũ trong bộ nhớ sau khi xoay màn hình. Khi cần Context thì dùng Context cấp ứng dụng.

### Giải thích các phương án:
- **Context không dùng được từ background thread** (Sai): Nhiều API dùng Context vẫn gọi được từ luồng nền.
- **Context không truyền được qua hàm dựng của ViewModel** (Sai): Về kỹ thuật vẫn truyền được, đó chính là vấn đề.
- **ViewModel sống lâu hơn nên giữ luôn Activity cũ** (Đúng): Activity bị tạo lại khi xoay màn hình, còn tham chiếu cũ vẫn nằm trong ViewModel gây rò bộ nhớ.
- **ViewModel chạy trên một tiến trình riêng biệt** (Sai): Nó chạy trong cùng tiến trình với ứng dụng.
