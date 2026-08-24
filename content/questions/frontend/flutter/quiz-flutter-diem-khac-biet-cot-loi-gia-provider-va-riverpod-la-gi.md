---
id: quiz-flutter-diem-khac-biet-cot-loi-gia-provider-va-riverpod-la-gi
position: frontend
technology: flutter
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Điểm khác biệt cốt lõi giữa Provider và Riverpod là gì?

## Đáp án trắc nghiệm
- [ ] Riverpod thay thế hoàn toàn cơ chế InheritedWidget của Flutter
- [ ] Provider chạy đồng bộ còn Riverpod chạy bất đồng bộ
- [x] Riverpod không phụ thuộc BuildContext để tra cứu
- [ ] Riverpod chỉ hỗ trợ state bất biến còn Provider thì không

## Giải thích (VI)
Riverpod không tra cứu qua BuildContext . Provider tìm dữ liệu bằng cách đi ngược lên cây widget nên đặt sai chỗ sẽ ném lỗi lúc chạy, còn provider của Riverpod là biến toàn cục có kiểu rõ ràng nên sai sót lộ ra sớm hơn.

### Giải thích các phương án:
- **Riverpod thay thế hoàn toàn cơ chế InheritedWidget của Flutter** (Sai): Riverpod vẫn dùng một widget gốc để cung cấp container cho cây bên dưới.
- **Provider chạy đồng bộ còn Riverpod chạy bất đồng bộ** (Sai): Cả hai đều xử lý được dữ liệu đồng bộ lẫn bất đồng bộ.
- **Riverpod không phụ thuộc BuildContext để tra cứu** (Đúng): Nhờ tách khỏi cây widget, lỗi không tìm thấy provider bị bắt ngay lúc biên dịch thay vì lúc chạy.
- **Riverpod chỉ hỗ trợ state bất biến còn Provider thì không** (Sai): Cả hai đều làm việc được với state bất biến hay có thể thay đổi.
