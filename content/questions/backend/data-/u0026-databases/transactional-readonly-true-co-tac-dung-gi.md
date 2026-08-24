---
id: transactional-readonly-true-co-tac-dung-gi
position: backend
technology: data-\u0026-databases
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@Transactional(readOnly=true) có tác dụng gì?

## Question (EN)
What is the purpose of @Transactional(readOnly=true)?

## Đáp án chi tiết (VI)
**`readOnly = true`** là **hint** cho transaction, không phải enforcement cứng.\
\
**Tác dụng:**\
1. Hibernate **tắt dirty checking** — không snapshot entity → giảm memory + CPU.\
2. Flush mode = MANUAL — không auto-flush.\
3. DB có thể optimize — route sang **read replica**, dùng read-only transaction (Postgres: `SET TRANSACTION READ ONLY`).\
\
**Lưu ý:** không chặn write — code vẫn `setX()` được, chỉ là Hibernate không flush; vài driver ignore hint nếu không support.\
\
**Best practice:** đặt ở **class level**, override cho method ghi:\
```java\
@Service\
@Transactional(readOnly = true)     // default mọi method\
class UserService {\
  public User findById(Long id) { ... }\
\
  @Transactional                     // override cho write\
  public User create(User u) { ... }\
}\
```

## Detailed Answer (EN)
**`readOnly = true`** is a **hint** for the transaction, not hard enforcement.\
\
**Effects:**\
1. Hibernate **disables dirty checking** — no entity snapshot → less memory + CPU.\
2. Flush mode = MANUAL — no auto-flush.\
3. DB may optimise — routing to a **read replica**, using a read-only transaction (Postgres: `SET TRANSACTION READ ONLY`).\
\
**Caveats:** does not block writes — code can still call `setX()`, Hibernate just won't flush; some drivers ignore the hint if unsupported.\
\
**Best practice:** put it at **class level**, override on write methods:\
```java\
@Service\
@Transactional(readOnly = true)     // default for all methods\
class UserService {\
  public User findById(Long id) { ... }\
\
  @Transactional                     // override for writes\
  public User create(User u) { ... }\
}\
```
