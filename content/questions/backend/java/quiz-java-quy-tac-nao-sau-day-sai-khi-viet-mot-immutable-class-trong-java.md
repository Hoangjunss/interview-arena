---
id: quiz-java-quy-tac-nao-sau-day-sai-khi-viet-mot-immutable-class-trong-java
position: backend
technology: java
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Quy tắc nào sau đây SAI khi viết một immutable class trong Java?

## Đáp án trắc nghiệm
- [ ] Mọi field private final, không có setter — state chỉ được gán một lần qua constructor
- [ ] Khai class final để subclass không override method làm lộ state
- [x] Chỉ cần khai mọi field là final là đủ, object bên trong tự bất biến theo
- [ ] Field mutable phải defensive copy cả khi nhận vào lẫn khi trả ra
- [ ] Record (Java 16+) chỉ bất biến ở mức tham chiếu component, không deep immutable

## Giải thích (VI)
Ba quy tắc cần thiết: class final (chặn subclass phá cam kết); mọi field private final và không setter; defensive copy hai chiều cho field mutable (copy khi nhận vào constructor, copy hoặc List.copyOf khi trả ra). Hai hiểu nhầm: final trên field chỉ khoá reference, không làm object bên trong bất biến; record cũng chỉ bất biến nông — component mutable vẫn phải tự defensive copy.

### Giải thích các phương án:
- **Mọi field private final, không có setter — state chỉ được gán một lần qua constructor** (Sai): Quy tắc đúng: không có đường thay đổi state sau khi tạo.
- **Khai class final để subclass không override method làm lộ state** (Sai): Quy tắc đúng: subclass có thể thêm state mutable hoặc override method, phá cam kết bất biến.
- **Chỉ cần khai mọi field là final là đủ, object bên trong tự bất biến theo** (Đúng): Đây là chỗ sai: final chỉ khoá tham chiếu — một List field vẫn add/remove được nếu không copy phòng vệ.
- **Field mutable phải defensive copy cả khi nhận vào lẫn khi trả ra** (Sai): Quy tắc đúng: thiếu defensive copy thì bên ngoài vẫn sửa được nội dung bên trong object.
- **Record (Java 16+) chỉ bất biến ở mức tham chiếu component, không deep immutable** (Sai): Phát biểu đúng: record có component là List hay mảng thì nội dung bên trong vẫn sửa được.
