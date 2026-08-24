---
id: cac-access-modifier-trong-java-la-gi-giai-thich-tung-loai
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các access modifier trong Java là gì? Giải thích từng loại.

## Question (EN)
What are access modifiers in Java? Explain each one.

## Đáp án chi tiết (VI)
Bốn mức access, từ chặt nhất → rộng nhất:\
\
| Modifier | Cùng class | Cùng package | Subclass (khác package) | Mọi nơi |\
|---|---|---|---|---|\
| `private` | Có | Không | Không — | Không |\
| *default* (không có) | Có | Có — | Không | Không — |\
| `protected` | Có | Có — | Có | Không |\
| `public` | Có | Có — | Có | Có — |\
\
Top-level class chỉ dùng được `public` hoặc *default*. Field/method/nested class: cả 4.\
\
```java\
public class Account {\
  private final String id;            // ẩn hoàn toàn\
  protected BigDecimal balance;       // subclass dùng được\
  String accountType;                 // default — package-private\
  public String getId() { return id; }\
}\
```\
\
**Nguyên tắc:** chọn **modifier hạn chế nhất** đủ dùng — mở càng rộng càng khó refactor.\
\
**Java 9+ (JPMS):** \\"public\\" còn cần module `exports` package đó để cross-module visible.

## Detailed Answer (EN)
Four levels of access, strictest → widest:\
\
| Modifier | Same class | Same package | Subclass (other package) | Anywhere |\
|---|---|---|---|---|\
| `private` | Yes | No | No — | No |\
| *default* (none) | Yes | Yes — | No | No — |\
| `protected` | Yes | Yes — | Yes | No |\
| `public` | Yes | Yes — | Yes | Yes — |\
\
Top-level classes accept only `public` or *default*. Fields/methods/nested classes accept all four.\
\
```java\
public class Account {\
  private final String id;            // fully hidden\
  protected BigDecimal balance;       // subclasses can see it\
  String accountType;                 // default — package-private\
  public String getId() { return id; }\
}\
```\
\
**Rule:** pick the **most restrictive modifier** that still works — wider is harder to refactor later.\
\
**Java 9+ (JPMS):** even `public` requires the module to `exports` the package for cross-module visibility.
