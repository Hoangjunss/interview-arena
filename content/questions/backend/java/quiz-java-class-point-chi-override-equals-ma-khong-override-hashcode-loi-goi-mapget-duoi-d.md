---
id: quiz-java-class-point-chi-override-equals-ma-khong-override-hashcode-loi-goi-mapget-duoi-d
position: backend
technology: java
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Class Point chỉ override equals() mà không override hashCode(). Lời gọi map.get() dưới đây cho kết quả gì?

## Đáp án trắc nghiệm
- [ ] Ném ClassCastException lúc runtime vì Point không implement Comparable
- [ ] "A" — equals() đã trả true cho hai Point cùng toạ độ nên HashMap tìm được entry
- [x] null — hai object equals nhưng hashCode() khác nên tìm ở bucket khác
- [ ] Lỗi biên dịch — Java bắt buộc override hashCode() khi đã override equals()

## Giải thích (VI)
Kết quả là null. HashMap định vị bucket bằng hashCode() trước, rồi mới so equals() trong bucket đó. Vì Point không override hashCode(), hai object dùng hashCode mặc định theo identity — khác nhau — nên get() tìm ở bucket khác với bucket đã put. equals() trả true cũng vô nghĩa khi không bao giờ được gọi tới. Luôn override cả hai method cùng nhau.

### Giải thích các phương án:
- **Ném ClassCastException lúc runtime vì Point không implement Comparable** (Sai): HashMap không yêu cầu key implement Comparable (chỉ TreeMap cần); không có exception nào ở đây — chỉ là lookup thất bại trả null.
- **"A" — equals() đã trả true cho hai Point cùng toạ độ nên HashMap tìm được entry** (Sai): equals() chỉ được dùng SAU khi đã định vị đúng bucket bằng hashCode(); thiếu hashCode() nhất quán thì HashMap không bao giờ tới được bước so equals().
- **null — hai object equals nhưng hashCode() khác nên tìm ở bucket khác** (Đúng): Đúng: HashMap định vị bucket bằng hashCode() TRƯỚC rồi mới so equals(); hashCode mặc định theo identity nên khác nhau, và equals() không bao giờ được gọi tới.
- **Lỗi biên dịch — Java bắt buộc override hashCode() khi đã override equals()** (Sai): Compiler không ép buộc — contract equals/hashCode chỉ là quy định trong javadoc của Object; vi phạm gây bug runtime âm thầm, không phải lỗi biên dịch.
