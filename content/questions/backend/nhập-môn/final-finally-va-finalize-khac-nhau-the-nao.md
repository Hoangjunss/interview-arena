---
id: final-finally-va-finalize-khac-nhau-the-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
final, finally và finalize khác nhau thế nào?

## Question (EN)
How do final, finally, and finalize differ?

## Đáp án chi tiết (VI)
Ba từ khóa **không liên quan nhau** dù tên giống — câu này kiểm tra độ nắm chắc khái niệm cơ bản.\
\
- **`final`** — *modifier*: biến không gán lại được, method không override được, class không kế thừa được (chi tiết xem câu keyword final).\
- **`finally`** — *block* trong try/catch, **luôn chạy** dù có exception hay `return` giữa chừng → chỗ dọn resource (đóng file, connection). Từ Java 7, ưu tiên **try-with-resources** thay cho finally thủ công.\
- **`finalize()`** — *method* của `Object`, được GC gọi trước khi thu hồi object. **Deprecated từ Java 9, đánh dấu xoá từ Java 18 (JEP 421)** — không đảm bảo được gọi hay gọi lúc nào → dọn resource bằng try-with-resources hoặc `java.lang.ref.Cleaner`.\
\
**Trả lời gọn khi phỏng vấn:** 3 khái niệm ở 3 phạm trù khác nhau — modifier / control flow / GC hook (đã khai tử).

## Detailed Answer (EN)
Three keywords that are **completely unrelated** despite similar names — this question tests how solid your fundamentals are.\
\
- **`final`** — a *modifier*: variables cannot be reassigned, methods cannot be overridden, classes cannot be extended (see the final keyword item).\
- **`finally`** — a *block* in try/catch that **always runs**, even with exceptions or an early `return` → the place to clean up resources (closing files, connections). Since Java 7, prefer **try-with-resources** over manual finally.\
- **`finalize()`** — a *method* on `Object`, called by the GC before reclaiming the object. **Deprecated since Java 9, marked for removal since Java 18 (JEP 421)** — no guarantee it runs or when → clean up with try-with-resources or `java.lang.ref.Cleaner`.\
\
**Concise interview answer:** three concepts in three different realms — modifier / control flow / GC hook (now retired).
