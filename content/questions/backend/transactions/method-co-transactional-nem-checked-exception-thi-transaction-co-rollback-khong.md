---
id: method-co-transactional-nem-checked-exception-thi-transaction-co-rollback-khong
position: backend
technology: transactions
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Method có `@Transactional` ném checked exception thì transaction có rollback không?

## Question (EN)
If a `@Transactional` method throws a checked exception, does the transaction roll back?

## Đáp án chi tiết (VI)
**Không.** Mặc định Spring chỉ đánh dấu rollback khi method ném **`RuntimeException`** (unchecked) hoặc **`Error`**. Checked exception ném ra từ method transactional **vẫn commit** như thường.\
\
```java\
@Transactional\
public void transfer(Long from, Long to, long amount) throws InsufficientFundsException {\
    accountRepository.debit(from, amount);\
    if (balanceOf(from) \u003c 0) {\
        // checked exception -\u003e Spring COMMITS the debit above\
        throw new InsufficientFundsException();\
    }\
    accountRepository.credit(to, amount);\
}\
```\
\
Muốn rollback với checked exception thì khai báo tường minh:\
\
```java\
@Transactional(rollbackFor = InsufficientFundsException.class)\
```\
\
Ngược lại, `noRollbackFor` giữ commit cho một loại unchecked exception cụ thể. Quy tắc chọn theo **loại khớp gần nhất** trong cây kế thừa exception, không phải theo thứ tự khai báo.\
\
Trong dự án thực tế phổ biến nhất là để exception nghiệp vụ kế thừa `RuntimeException` để hành vi mặc định đã đúng, thay vì rải `rollbackFor` khắp nơi.

## Detailed Answer (EN)
$83
