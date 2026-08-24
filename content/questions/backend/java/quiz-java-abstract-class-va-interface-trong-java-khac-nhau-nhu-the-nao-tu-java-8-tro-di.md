---
id: quiz-java-abstract-class-va-interface-trong-java-khac-nhau-nhu-the-nao-tu-java-8-tro-di
position: backend
technology: java
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Abstract class và interface trong Java khác nhau như thế nào (từ Java 8 trở đi)?

## Đáp án trắc nghiệm
- [x] Abstract class: extends một, có constructor và state; interface: implements nhiều, không state
- [ ] Một class có thể extends nhiều abstract class cùng lúc, nhưng chỉ implements được đúng một interface
- [ ] Từ Java 8, default method khiến interface tương đương hoàn toàn với abstract class — có thể khai báo cả instance field lẫn constructor
- [ ] Interface không thể chứa bất kỳ method nào có thân — mọi method đều bắt buộc abstract

## Giải thích (VI)
Khác biệt cốt lõi sau Java 8: abstract class extends được một, có constructor và instance field (state chung); interface implements được nhiều, không có constructor, field chỉ là hằng số public static final. Default/static method (Java 8+) cho interface chứa code nhưng không thêm state. Quy tắc chọn: mặc định ưu tiên interface; chỉ chọn abstract class khi cần state chung hoặc kiểm soát constructor.

### Giải thích các phương án:
- **Abstract class: extends một, có constructor và state; interface: implements nhiều, không state** (Đúng): Đúng: sau Java 8, khác biệt còn lại nằm ở state và constructor — default/static method chỉ thêm code chứ không thêm state, và field trong interface luôn là hằng số public static final.
- **Một class có thể extends nhiều abstract class cùng lúc, nhưng chỉ implements được đúng một interface** (Sai): Phát biểu đảo ngược: Java cấm đa kế thừa class (extends đúng một), nhưng cho phép implements nhiều interface — đó là lý do interface tồn tại.
- **Từ Java 8, default method khiến interface tương đương hoàn toàn với abstract class — có thể khai báo cả instance field lẫn constructor** (Sai): default method chỉ cung cấp code dùng chung; interface vẫn không có constructor và không giữ được trạng thái per-instance — đó là ranh giới chưa bị xoá.
- **Interface không thể chứa bất kỳ method nào có thân — mọi method đều bắt buộc abstract** (Sai): Đúng với trước Java 8; từ Java 8 interface có default và static method chứa thân, Java 9 thêm private method làm helper.
