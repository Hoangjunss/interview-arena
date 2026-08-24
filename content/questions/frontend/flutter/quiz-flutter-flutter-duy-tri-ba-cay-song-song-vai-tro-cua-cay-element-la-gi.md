---
id: quiz-flutter-flutter-duy-tri-ba-cay-song-song-vai-tro-cua-cay-element-la-gi
position: frontend
technology: flutter
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Flutter duy trì ba cây song song. Vai trò của cây element là gì?

## Đáp án trắc nghiệm
- [ ] Chứa mô tả bất biến về giao diện mong muốn
- [x] Giữ trạng thái và nối widget với render object
- [ ] Lưu ảnh đã vẽ để khung hình sau dùng lại
- [ ] Tính toán kích thước và vị trí khi bố cục

## Giải thích (VI)
Cây element là tầng sống lâu ở giữa: widget là bản mô tả bất biến bị vứt đi liên tục, render object lo đo và vẽ, còn element giữ vị trí, giữ State và quyết định lần rebuild này nên dùng lại hay tạo mới render object.

### Giải thích các phương án:
- **Chứa mô tả bất biến về giao diện mong muốn** (Sai): Mô tả bất biến chính là widget, còn element là thể hiện đang sống của nó.
- **Giữ trạng thái và nối widget với render object** (Đúng): Element sống lâu qua nhiều lần rebuild nên nó là nơi neo State và quyết định cần dựng lại gì.
- **Lưu ảnh đã vẽ để khung hình sau dùng lại** (Sai): Việc lưu lớp ảnh đã vẽ thuộc về tầng layer, không phải element.
- **Tính toán kích thước và vị trí khi bố cục** (Sai): Đo đạc và vẽ là việc của render object.
