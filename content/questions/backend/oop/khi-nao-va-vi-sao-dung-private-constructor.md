---
id: khi-nao-va-vi-sao-dung-private-constructor
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào và vì sao dùng private constructor?

## Question (EN)
When and why do you use a private constructor?

## Đáp án chi tiết (VI)
Đặt constructor `private` để **cấm bên ngoài `new`** trực tiếp, giành lại quyền kiểm soát cách tạo object. Các trường hợp dùng:\
\
- **Utility class** toàn `static` (như `Math`, `Collections`): private constructor để không ai lỡ `new`.\
- **Singleton:** chỉ một instance, lấy qua `getInstance()`.\
- **Static factory method:** `User.of(...)` thay `new User(...)` — tên rõ nghĩa, có thể cache hoặc trả subtype (Effective Java Item 1).\
- **Builder pattern:** ép người dùng đi qua builder.\
\
```java\
public final class Math {\
  private Math() {}          // không cho khởi tạo\
  public static int abs(int a) { /* ... */ }\
}\
```\
\
Bản chất: private constructor = \\"class này tự quyết định vòng đời object của chính nó\\

## Detailed Answer (EN)
Make a constructor `private` to **forbid outside `new`** and take back control over how objects are created. Common cases:\
\
- **Utility class** with only `static` members (like `Math`, `Collections`): a private constructor stops anyone accidentally calling `new`.\
- **Singleton:** a single instance obtained via `getInstance()`.\
- **Static factory method:** `User.of(...)` instead of `new User(...)` — a meaningful name, and it can cache or return a subtype (Effective Java Item 1).\
- **Builder pattern:** forces users through the builder.\
\
```java\
public final class Math {\
  private Math() {}          // no instantiation\
  public static int abs(int a) { /* ... */ }\
}\
```\
\
In essence: a private constructor means \\"this class decides its own object lifecycle\\" rather than handing it to callers. For utility classes, add `throw new AssertionError()` in the constructor to block even reflection.
