---
id: quiz-react-native-vi-sao-cac-du-an-react-native-thuong-thay-panresponder-bang-thu-vien-cu-chi-chuy
position: frontend
technology: react-native
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao các dự án React Native thường thay PanResponder bằng thư viện cử chỉ chuyên dụng?

## Đáp án trắc nghiệm
- [x] Cử chỉ nhận dạng ở native, không phụ thuộc JavaScript
- [ ] PanResponder không nhận được cử chỉ nhiều ngón tay
- [ ] PanResponder đã bị gỡ khỏi React Native
- [ ] Thư viện chuyên dụng tự sinh hoạt ảnh cho mọi cử chỉ

## Giải thích (VI)
Thư viện cử chỉ chuyên dụng nhận dạng cử chỉ ở tầng native , nên phản hồi không bị trễ khi JS thread đang bận. Chúng cũng có sẵn cơ chế phối hợp giữa các cử chỉ đồng thời hoặc loại trừ nhau, thứ phải tự viết với PanResponder.

### Giải thích các phương án:
- **Cử chỉ nhận dạng ở native, không phụ thuộc JavaScript** (Đúng): Luồng JavaScript bận sẽ làm PanResponder phản hồi trễ, còn nhận dạng ở native thì không.
- **PanResponder không nhận được cử chỉ nhiều ngón tay** (Sai): Nó nhận được, chỉ là viết thủ công phức tạp hơn.
- **PanResponder đã bị gỡ khỏi React Native** (Sai): Nó vẫn có trong thư viện chuẩn.
- **Thư viện chuyên dụng tự sinh hoạt ảnh cho mọi cử chỉ** (Sai): Hoạt ảnh vẫn phải tự viết, thường kết hợp với thư viện hoạt ảnh.
