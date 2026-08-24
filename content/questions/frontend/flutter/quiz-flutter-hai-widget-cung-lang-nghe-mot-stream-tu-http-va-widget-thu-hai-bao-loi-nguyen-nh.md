---
id: quiz-flutter-hai-widget-cung-lang-nghe-mot-stream-tu-http-va-widget-thu-hai-bao-loi-nguyen-nh
position: frontend
technology: flutter
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hai widget cùng lắng nghe một Stream từ http và widget thứ hai báo lỗi. Nguyên nhân?

## Đáp án trắc nghiệm
- [ ] Vì mỗi widget cần một BuildContext riêng để lắng nghe
- [ ] Vì StreamBuilder tự động huỷ đăng ký của widget trước
- [ ] Vì stream đã phát hết dữ liệu trước khi widget thứ hai gắn vào
- [x] Stream single-subscription chỉ cho một người nghe

## Giải thích (VI)
Stream mặc định là single-subscription , chỉ chấp nhận một người nghe trong suốt vòng đời. Nghe lần thứ hai ném lỗi ngay. Dùng asBroadcastStream(), một StreamController.broadcast, hoặc tốt hơn là để một lớp repository giữ dữ liệu và phát lại cho các widget.

### Giải thích các phương án:
- **Vì mỗi widget cần một BuildContext riêng để lắng nghe** (Sai): Lắng nghe stream không liên quan tới context.
- **Vì StreamBuilder tự động huỷ đăng ký của widget trước** (Sai): StreamBuilder không đụng tới đăng ký của widget khác.
- **Vì stream đã phát hết dữ liệu trước khi widget thứ hai gắn vào** (Sai): Trường hợp đó chỉ khiến không nhận được dữ liệu chứ không ném lỗi đăng ký.
- **Stream single-subscription chỉ cho một người nghe** (Đúng): Muốn nhiều nơi cùng nghe thì phải chuyển sang broadcast hoặc chia sẻ kết quả qua lớp trung gian.
