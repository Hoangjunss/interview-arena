---
id: quiz-flutter-navigatorpush-va-navigatorpushreplacement-khac-nhau-o-dau
position: frontend
technology: flutter
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Navigator.push và Navigator.pushReplacement khác nhau ở đâu?

## Đáp án trắc nghiệm
- [ ] pushReplacement không chạy hiệu ứng chuyển màn hình
- [x] pushReplacement bỏ màn hình hiện tại khỏi stack
- [ ] push mở màn hình mới còn pushReplacement mở hộp thoại
- [ ] pushReplacement xoá sạch mọi màn hình trong stack

## Giải thích (VI)
push chồng màn hình mới lên trên, còn pushReplacement thay thế màn hình hiện tại nên nó biến mất khỏi stack. Dùng cho màn hình chờ hoặc màn hình đăng nhập, nơi người dùng không nên quay lại được bằng nút back.

### Giải thích các phương án:
- **pushReplacement không chạy hiệu ứng chuyển màn hình** (Sai): Hiệu ứng chuyển vẫn chạy bình thường như push.
- **pushReplacement bỏ màn hình hiện tại khỏi stack** (Đúng): Nhờ vậy nút quay lại không đưa người dùng về màn hình vừa rời đi, hợp cho luồng đăng nhập.
- **push mở màn hình mới còn pushReplacement mở hộp thoại** (Sai): Cả hai đều mở route đầy đủ, hộp thoại là API khác.
- **pushReplacement xoá sạch mọi màn hình trong stack** (Sai): Xoá sạch là việc của pushAndRemoveUntil, pushReplacement chỉ bỏ đúng màn hình hiện tại.
