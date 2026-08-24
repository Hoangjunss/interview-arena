---
id: pointer-receiver-vs-value-receiver-khac-nhau
position: backend
technology: types-\u0026-interface
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pointer receiver vs value receiver khác nhau?

## Question (EN)
What is the difference between pointer receivers and value receivers?

## Đáp án chi tiết (VI)
Hai dạng receiver có ngữ nghĩa khác nhau về copy và mutation:\
\
- **Value receiver** `func (u User) Name()` — nhận một copy của struct, không thể modify giá trị gốc.\
- **Pointer receiver** `func (u *User) SetName(n string)` — modify trực tiếp struct gốc, không tốn chi phí copy.\
\
**Dùng pointer receiver khi:** cần mutate state, struct lớn (tránh copy), hoặc để giữ consistency — nếu một method dùng pointer thì tất cả method của type đó nên dùng pointer.

## Detailed Answer (EN)
The two receiver forms differ in copy and mutation semantics:\
\
- **Value receiver** `func (u User) Name()` — receives a copy of the struct; cannot modify the original.\
- **Pointer receiver** `func (u *User) SetName(n string)` — modifies the original struct directly; no copy cost.\
\
**Use pointer receivers when:** mutating state, working with large structs, or for consistency — if one method on a type uses a pointer receiver, all methods should.
