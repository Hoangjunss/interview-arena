---
id: save-saveandflush-va-flush-trong-jpa-khac-nhau-the-nao
position: backend
technology: data-\u0026-databases
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
save(), saveAndFlush() và flush() trong JPA khác nhau thế nào?

## Question (EN)
How do save(), saveAndFlush(), and flush() differ in JPA?

## Đáp án chi tiết (VI)
Ba method liên quan **Persistence Context** (first-level cache của Hibernate).\
\
- **`save(entity)`** — đưa entity vào Persistence Context; **chưa chắc execute SQL ngay** — đợi flush (lúc commit, hoặc trước query cần data mới).\
- **`flush()`** — ép Persistence Context **sync xuống DB** (execute SQL pending) nhưng **chưa commit** — có lỗi sau đó vẫn rollback được.\
- **`saveAndFlush(entity)`** — `save()` + `flush()` ngay lập tức: data xuống DB liền, transaction vẫn chưa commit.\
\
**Khi dùng `saveAndFlush`:**\
- Cần **ID/column DB-generated ngay** trong cùng transaction: `saveAndFlush(user).getId()` chắc chắn có (với `save()` thuần, IDENTITY thường cũng flush sớm để lấy ID, nhưng các giá trị DB sinh khác như default/trigger thì phải flush mới thấy).\
- **Native query** phía sau cần thấy data vừa save — native query không đi qua Persistence Context; hoặc dùng `save()` + `flush()` trước query.\
\
**Mặc định cứ dùng `save()`** — Hibernate tự chọn thời điểm flush tối ưu (batch được nhiều statement).

## Detailed Answer (EN)
$87
