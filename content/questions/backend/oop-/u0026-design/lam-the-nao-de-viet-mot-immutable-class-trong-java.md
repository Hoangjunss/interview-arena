---
id: lam-the-nao-de-viet-mot-immutable-class-trong-java
position: backend
technology: oop-\u0026-design
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để viết một immutable class trong Java?

## Question (EN)
How do you write an immutable class in Java?

## Đáp án chi tiết (VI)
Immutable class = object **không đổi trạng thái sau khi tạo**. Quy tắc viết:\
\
1. Class khai báo **`final`** — chặn subclass override method làm lộ/đổi state.\
2. Mọi field **`private final`**.\
3. **Không có setter** — state chỉ gán 1 lần qua constructor.\
4. Field là mutable object (List, Date, mảng...) → **defensive copy** cả 2 chiều: copy khi nhận vào constructor, copy (hoặc bọc `List.copyOf()`/unmodifiable) khi trả ra từ getter — nếu không, bên ngoài giữ reference gốc vẫn sửa được.\
5. Muốn \\"sửa\\" → trả **object mới** (kiểu `String.replace()`, `LocalDate.plusDays()`).\
\
**Lợi ích:** thread-safe tự nhiên (không cần lock), an toàn làm key `HashMap`/element của `Set`, dễ reason và cache.\
\
**Có sẵn trong JDK:** String, wrapper (Integer, Long...), BigDecimal, LocalDate/LocalDateTime.\
\
**Java 16+:** dùng **record** — immutable gọn nhất (tự sinh constructor, accessor, equals/hashCode) — nhưng vẫn phải tự lo defensive copy nếu component là mutable.

## Detailed Answer (EN)
$84
