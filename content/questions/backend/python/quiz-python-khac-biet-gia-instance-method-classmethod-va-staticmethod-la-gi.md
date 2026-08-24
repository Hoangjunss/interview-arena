---
id: quiz-python-khac-biet-gia-instance-method-classmethod-va-staticmethod-la-gi
position: backend
technology: python
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khác biệt giữa instance method, @classmethod và @staticmethod là gì?

## Đáp án trắc nghiệm
- [x] Instance method nhận self (thao tác trên instance)
- [ ] @classmethod và @staticmethod hoàn toàn giống nhau, chỉ khác tên
- [ ] @staticmethod tự động nhận self, còn @classmethod thì không nhận gì
- [ ] Instance method không thể truy cập thuộc tính của class, chỉ classmethod mới truy cập được

## Giải thích (VI)
Ba loại khác nhau ở tham số đầu ngầm định: instance method nhận self (làm việc với một instance cụ thể); @classmethod nhận cls là chính class (hay dùng làm constructor thay thế, tôn trọng kế thừa); @staticmethod không nhận self lẫn cls — chỉ là một hàm thường được đặt trong namespace của class cho gọn nhóm logic.

### Giải thích các phương án:
- **Instance method nhận self (thao tác trên instance)** (Đúng): Classmethod nhận cls (thao tác trên class, hay dùng làm factory/constructor thay thế); staticmethod không nhận tự động self lẫn cls (chỉ là hàm gom vào namespace của class. Đây là mô tả đúng: khác biệt nằm ở tham số đầu ngầm định — instance (self), class (cls), hoặc không có.
- **@classmethod và @staticmethod hoàn toàn giống nhau, chỉ khác tên** (Sai): Khác nhau: classmethod nhận cls (biết class đang gọi, tôn trọng kế thừa), staticmethod thì không.
- **@staticmethod tự động nhận self, còn @classmethod thì không nhận gì** (Sai): Sai cả hai: staticmethod KHÔNG nhận self; classmethod nhận cls (chính là class).
- **Instance method không thể truy cập thuộc tính của class, chỉ classmethod mới truy cập được** (Sai): Instance method vẫn truy cập class attribute qua self (theo MRO) hoặc type(self); không bị giới hạn như vậy.
