---
id: quiz-flutter-man-hinh-dung-animationcontroller-va-scrollcontroller-bi-ro-bo-nho-thieu-buoc-na
position: frontend
technology: flutter
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Màn hình dùng AnimationController và ScrollController bị rò bộ nhớ. Thiếu bước nào?

## Đáp án trắc nghiệm
- [x] Gọi dispose cho các controller trong State
- [ ] Gọi setState một lần cuối trước khi rời màn hình
- [ ] Khai báo controller là late final thay vì final
- [ ] Bọc màn hình trong AutomaticKeepAliveClientMixin

## Giải thích (VI)
Thiếu dispose(). Controller, StreamSubscription, FocusNode, TextEditingController đều giữ tham chiếu và listener; không huỷ thì chúng vẫn sống sau khi màn hình đóng, giữ luôn cả cây widget cũ trong bộ nhớ.

### Giải thích các phương án:
- **Gọi dispose cho các controller trong State** (Đúng): Controller giữ listener và ticker, không huỷ thì chúng sống tiếp sau khi màn hình đóng.
- **Gọi setState một lần cuối trước khi rời màn hình** (Sai): setState không giải phóng tài nguyên nào cả.
- **Khai báo controller là late final thay vì final** (Sai): Cách khai báo không ảnh hưởng tới việc giải phóng tài nguyên.
- **Bọc màn hình trong AutomaticKeepAliveClientMixin** (Sai): Mixin đó giữ state sống lâu hơn, tức là làm vấn đề nặng thêm.
