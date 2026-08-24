---
id: quiz-react-native-vi-sao-nen-dung-pressable-thay-cho-touchableopacity-trong-ma-moi
position: frontend
technology: react-native
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao nên dùng Pressable thay cho TouchableOpacity trong mã mới?

## Đáp án trắc nghiệm
- [ ] Nó là component duy nhất nhận sự kiện nhấn giữ
- [ ] Nó xử lý cử chỉ nhanh hơn nhờ chạy ở tầng native
- [ ] Nó tự thêm nhãn cho trình đọc màn hình
- [x] Nó cho phép tự định nghĩa phản hồi khi nhấn

## Giải thích (VI)
Pressable là API mới thay cho họ Touchable. Nó cho style và children nhận trạng thái nhấn, hỗ trợ vùng chạm mở rộng qua hitSlop, khoảng trễ nhấn giữ và ngưỡng huỷ khi kéo ra ngoài.

### Giải thích các phương án:
- **Nó là component duy nhất nhận sự kiện nhấn giữ** (Sai): Các component Touchable cũ cũng nhận nhấn giữ.
- **Nó xử lý cử chỉ nhanh hơn nhờ chạy ở tầng native** (Sai): Cả hai đều dựa trên cùng hệ thống phản hồi cử chỉ.
- **Nó tự thêm nhãn cho trình đọc màn hình** (Sai): Nhãn vẫn phải tự cung cấp qua các props về khả năng tiếp cận.
- **Nó cho phép tự định nghĩa phản hồi khi nhấn** (Đúng): Hàm style nhận trạng thái nhấn nên mỗi thiết kế tự quyết định phản hồi thị giác.
