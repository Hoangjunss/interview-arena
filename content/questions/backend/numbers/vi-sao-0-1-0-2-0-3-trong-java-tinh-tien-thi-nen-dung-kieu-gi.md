---
id: vi-sao-0-1-0-2-0-3-trong-java-tinh-tien-thi-nen-dung-kieu-gi
position: backend
technology: numbers
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao `0.1 + 0.2 != 0.3` trong Java? Tính tiền thì nên dùng kiểu gì?

## Question (EN)
Why is `0.1 + 0.2 != 0.3` in Java? What type should you use for money?

## Đáp án chi tiết (VI)
`double`/`float` theo chuẩn **IEEE 754 nhị phân**. Số 0.1 và 0.2 là phân số tuần hoàn trong hệ nhị phân nên chỉ được lưu **xấp xỉ**; cộng lại ra 0.30000000000000004.\
\
```java\
System.out.println(0.1 + 0.2);            // 0.30000000000000004\
System.out.println(0.1 + 0.2 == 0.3);     // false\
```\
\
Với tiền, dùng một trong hai cách:\
\
1. **`BigDecimal`** khởi tạo bằng **chuỗi**, không bằng `double`:\
\
```java\
new BigDecimal(\\"0.1\\").add(new BigDecimal(\\"0.2\\"));   // 0.3\
new BigDecimal(0.1);                                 // 0.1000000000000000055511151231257827...\
```\
\
2. **Số nguyên đơn vị nhỏ nhất** (`long` lưu VND, hoặc cent) — nhanh và không có sai số.\
\
Hai lưu ý khi dùng `BigDecimal`:\
- `equals()` so cả **scale**: `new BigDecimal(\\"2.0\\").equals(new BigDecimal(\\"2.00\\"))` là false. So sánh giá trị phải dùng `compareTo(...) == 0`.\
- Phép chia không chia hết ném `ArithmeticException` nếu không truyền `RoundingMode` — luôn chỉ định `setScale(2, RoundingMode.HALF_UP)` hoặc tương đương.

## Detailed Answer (EN)
`double`/`float` follow the **IEEE 754 binary** standard. 0.1 and 0.2 are repeating fractions in binary, so they are stored only **approximately**; their sum is 0.30000000000000004.\
\
```java\
System.out.println(0.1 + 0.2);            // 0.30000000000000004\
System.out.println(0.1 + 0.2 == 0.3);     // false\
```\
\
For money, pick one of two options:\
\
1. **`BigDecimal`** constructed from a **String**, never from a `double`:\
\
```java\
new BigDecimal(\\"0.1\\").add(new BigDecimal(\\"0.2\\"));   // 0.3\
new BigDecimal(0.1);                                 // 0.1000000000000000055511151231257827...\
```\
\
2. **Integer minor units** (a `long` holding VND, or cents) — fast and exact.\
\
Two caveats with `BigDecimal`:\
- `equals()` also compares **scale**: `new BigDecimal(\\"2.0\\").equals(new BigDecimal(\\"2.00\\"))` is false. Compare values with `compareTo(...) == 0`.\
- Non-terminating division throws `ArithmeticException` unless you pass a `RoundingMode` — always specify `setScale(2, RoundingMode.HALF_UP)` or similar.
